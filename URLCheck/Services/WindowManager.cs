using Photino.NET;
using Serilog;
using URLCheck.Interop;
using URLCheck.Messaging;

namespace URLCheck.Services;

/// <summary>
/// Owns the Photino windows: a hidden "host" window that keeps the message loop alive while the
/// app sits in the tray, and an on-demand borderless popup used to inspect a URL.
/// </summary>
internal sealed class WindowManager
{
    private readonly string _appUrl;
    private readonly NativeBridge _bridge;

    private PhotinoWindow? _mainWindow;
    private PhotinoWindow? _popupWindow;
    private bool _allowClose;

    public WindowManager(string appUrl, SettingsService settings, ProtocolRegistrationService protocols)
    {
        _appUrl = appUrl;
        _bridge = new NativeBridge(this, settings, protocols);
    }

    /// <summary>When true the host window is shown at startup instead of hiding to the tray.</summary>
    public bool ShowMainWindowOnStartup { get; init; }

    /// <summary>Raised once the host window's native handle exists (message loop is about to start).</summary>
    public event Action? MainWindowCreated;

    public void CreateMainWindow()
    {
        _mainWindow = new PhotinoWindow()
            .SetTitle(Constants.WindowTitle)
            .SetUseOsDefaultSize(false)
            .SetSize(new(1024, 720))
            .SetMinSize(720, 480)
            .RegisterWebMessageReceivedHandler((sender, message) =>
                _ = _bridge.HandleMessageAsync(sender as PhotinoWindow, message))
            .RegisterWindowCreatedHandler((_, _) =>
            {
                if (!ShowMainWindowOnStartup)
                    HideMainWindow();

                MainWindowCreated?.Invoke();
            })
            .RegisterWindowClosingHandler((_, _) =>
            {
                // Stay resident: closing the host window hides it instead of shutting down.
                if (_allowClose)
                    return false;

                HideMainWindow();
                return true;
            })
            .Load(_appUrl);
    }

    /// <summary>Starts the message loop; blocks until the host window is closed for real.</summary>
    public void Run() => _mainWindow?.WaitForClose();

    public void HideMainWindow() => Invoke(_mainWindow, window => HideHandle(window));

    public void ShowMainWindow(string? tab = null)
    {
        var window = _mainWindow;
        if (window is null)
            return;

        window.Invoke(() => ShowHandle(window));

        if (!string.IsNullOrEmpty(tab))
            window.SendWebMessage(NativeProtocol.SerializeEvent("app.navigate", new { tab }));
    }

    /// <summary>Opens a popup for <paramref name="url"/>, or navigates the existing popup to it.</summary>
    public void ShowPopup(string url)
    {
        if (_mainWindow is null || string.IsNullOrWhiteSpace(url))
            return;

        Invoke(_mainWindow, main =>
        {
            if (_popupWindow is not null)
            {
                try
                {
                    _popupWindow.SendWebMessage(NativeProtocol.SerializeEvent("popup.navigate", new { url }));
                    ShowHandle(_popupWindow);
                    return;
                }
                catch
                {
                    _popupWindow = null;
                }
            }

            var popup = new PhotinoWindow(main)
                .SetTitle(Constants.WindowTitle)
                .SetUseOsDefaultSize(false)
                .SetUseOsDefaultLocation(false)
                .SetSize(new(560, 640))
                .SetResizable(false)
                .SetChromeless(true)
                .SetTopMost(true)
                .Center()
                .RegisterWebMessageReceivedHandler((sender, message) =>
                    _ = _bridge.HandleMessageAsync(sender as PhotinoWindow, message))
                .RegisterWindowClosingHandler((_, _) =>
                {
                    _popupWindow = null;
                    return false;
                })
                .Load($"{_appUrl}#popup?url={Uri.EscapeDataString(url)}");

            _popupWindow = popup;

            try
            {
                popup.WaitForClose();
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Failed to create popup");
                _popupWindow = null;
            }
        });
    }

    /// <summary>Lets the OS move a borderless window when the user drags its header.</summary>
    public void StartDrag(PhotinoWindow? window) => Invoke(window, target =>
    {
        var handle = target.WindowHandle;
        if (handle == IntPtr.Zero)
            return;

        NativeMethods.ReleaseCapture();
        NativeMethods.SendMessage(handle, NativeMethods.WmNcLButtonDown, (IntPtr)NativeMethods.HtCaption, IntPtr.Zero);
    });

    public void CloseWindow(PhotinoWindow? window)
    {
        if (window is null)
            return;

        if (ReferenceEquals(window, _popupWindow))
            _popupWindow = null;

        Invoke(window, target =>
        {
            try
            {
                target.Close();
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Failed to close window");
            }
        });
    }

    /// <summary>Pushes an event to every open window.</summary>
    public void BroadcastEvent(string type, object? data)
    {
        var json = NativeProtocol.SerializeEvent(type, data);
        TrySend(_mainWindow, json);
        TrySend(_popupWindow, json);
    }

    public void Exit()
    {
        if (_mainWindow is null)
            return;

        _allowClose = true;
        CloseWindow(_mainWindow);
    }

    private static void Invoke(PhotinoWindow? window, Action<PhotinoWindow> action)
    {
        if (window is null)
            return;

        window.Invoke(() => action(window));
    }

    private static void ShowHandle(PhotinoWindow window)
    {
        var handle = window.WindowHandle;
        if (handle == IntPtr.Zero)
            return;

        NativeMethods.ShowWindow(handle, NativeMethods.SwRestore);
        NativeMethods.SetForegroundWindow(handle);
    }

    private static void HideHandle(PhotinoWindow window)
    {
        var handle = window.WindowHandle;
        if (handle != IntPtr.Zero)
            NativeMethods.ShowWindow(handle, NativeMethods.SwHide);
    }

    private static void TrySend(PhotinoWindow? window, string json)
    {
        try
        {
            window?.SendWebMessage(json);
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to send event");
        }
    }
}
