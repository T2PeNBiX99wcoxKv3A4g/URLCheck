using Photino.NET;
using URLCheck.Interop;
using URLCheck.Messaging;

namespace URLCheck.Services;

/// <summary>
/// Owns the Photino windows: a hidden "host" window that keeps the message loop alive while the
/// app sits in the tray, and an on-demand popup window used to inspect a URL.
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
    public bool ShowMainWindowOnStartup { get; set; }

    /// <summary>Raised once the host window's native handle exists (message loop is about to start).</summary>
    public event Action? MainWindowCreated;

    public void CreateMainWindow()
    {
        _mainWindow = new PhotinoWindow()
            .SetTitle(Constants.WindowTitle)
            .SetUseOsDefaultSize(false)
            .SetSize(new(1024, 720))
            .SetMinSize(720, 480)
            .SetResizable(true)
            .RegisterWebMessageReceivedHandler((sender, message) => _bridge.HandleMessage(sender as PhotinoWindow, message))
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
    public void Run()
    {
        _mainWindow?.WaitForClose();
    }

    public void HideMainWindow()
    {
        var window = _mainWindow;
        if (window is null)
            return;

        window.Invoke(() => HideHandle(window));
    }

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
        var main = _mainWindow;
        if (main is null || string.IsNullOrWhiteSpace(url))
            return;

        main.Invoke(() =>
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
                .SetSize(new(560, 660))
                .SetMinSize(420, 420)
                .SetResizable(true)
                .SetTopMost(true)
                .Center()
                .RegisterWebMessageReceivedHandler((sender, message) => _bridge.HandleMessage(sender as PhotinoWindow, message))
                .RegisterWindowClosingHandler((_, _) =>
                {
                    _popupWindow = null;
                    return false;
                })
                .Load($"{_appUrl}#popup?url={Uri.EscapeDataString(url)}");

            _popupWindow = popup;
            popup.WaitForClose();
        });
    }

    public void CloseWindow(PhotinoWindow? window)
    {
        if (window is null)
            return;

        if (ReferenceEquals(window, _popupWindow))
            _popupWindow = null;

        window.Invoke(() =>
        {
            try
            {
                window.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[windows] Failed to close window: {ex.Message}");
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
        var main = _mainWindow;
        if (main is null)
            return;

        _allowClose = true;

        main.Invoke(() =>
        {
            try
            {
                main.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[windows] Failed to exit: {ex.Message}");
            }
        });
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
        if (handle == IntPtr.Zero)
            return;

        NativeMethods.ShowWindow(handle, NativeMethods.SwHide);
    }

    private static void TrySend(PhotinoWindow? window, string json)
    {
        if (window is null)
            return;

        try
        {
            window.SendWebMessage(json);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[windows] Failed to send event: {ex.Message}");
        }
    }
}
