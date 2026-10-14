using Photino.NET;
using Serilog;
using URLCheck.Interop;
using URLCheck.Messaging;
using URLCheck.Models;

namespace URLCheck.Services;

/// <summary>
/// Owns the Photino windows: a hidden "host" window that keeps the message loop alive while the
/// app sits in the tray, and an on-demand borderless popup used to inspect a URL.
/// </summary>
internal sealed class WindowManager
{
    private readonly string _appUrl;
    private readonly NativeBridge _bridge;
    private readonly SettingsService _settings;
    private bool _allowClose;

    private PhotinoWindow? _mainWindow;
    private PhotinoWindow? _popupWindow;

    /// <summary>
    /// Per-app WebView2 data folder. Photino defaults to a folder shared by every Photino app,
    /// which breaks when another app holds it, so keep URLCheck's separate.
    /// </summary>
    private static readonly string WebViewDataPath = Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "URLCheck", "webview");

    public WindowManager(string appUrl, NativeBridge bridge, SettingsService settings)
    {
        _appUrl = appUrl;
        _bridge = bridge;
        _settings = settings;

        _settings.Changed += payload => BroadcastEvent("settings.changed", payload);
    }

    /// <summary>When true the host window is shown at startup instead of hiding to the tray.</summary>
    public bool ShowMainWindowOnStartup { get; init; }

    /// <summary>Raised once the host window's native handle exists (message loop is about to start).</summary>
    public event Action? MainWindowCreated;

    /// <summary>Handles the <c>popup.*</c> and <c>window.*</c> messages.</summary>
    public async Task<NativeResponse?> HandleMessageAsync(NativeContext context)
    {
        switch (context.Request.Type)
        {
            case "popup.show":
            {
                var payload = context.Payload<PopupShowRequest>();
                if (string.IsNullOrWhiteSpace(payload?.Url))
                    return context.Fail("popup.show.result", "Missing URL.");

                ShowPopup(payload.Url);
                return context.Reply("popup.show.result", new
                {
                    Ok = true
                });
            }

            case "popup.open":
            {
                var payload = context.Payload<PopupOpenRequest>();
                if (string.IsNullOrWhiteSpace(payload?.Url))
                    return context.Fail("popup.open.result", "Missing URL.");

                var browser = ResolveBrowser(await _settings.GetAsync(), payload.BrowserId);
                if (browser is null)
                    return context.Fail("popup.open.result", "No browser configured. Add one in Settings.");

                BrowserService.Launch(browser.ExecutablePath, payload.Url);
                return context.Reply("popup.open.result", new
                {
                    Ok = true,
                    Browser = browser.Name
                });
            }

            case "popup.close":
                CloseWindow(context.Window);
                return null;

            case "window.drag":
                StartDrag(context.Window);
                return null;

            default:
                return null;
        }
    }

    public void CreateMainWindow()
    {
        _mainWindow = new PhotinoWindow()
            .SetTitle(Constants.WindowTitle)
            .SetTemporaryFilesPath(WebViewDataPath)
            .SetUseOsDefaultSize(false)
            .SetSize(new(1024, 720))
            .SetMinSize(720, 480)
            .SetMinimized(!ShowMainWindowOnStartup)
            .RegisterWebMessageReceivedHandler((sender, message) =>
                _ = _bridge.HandleMessageAsync(sender as PhotinoWindow, message))
            .RegisterWindowCreatedHandler((_, _) => MainWindowCreated?.Invoke())
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

    public void HideMainWindow() => Invoke(_mainWindow, HideHandle);

    public void ShowMainWindow(string? tab = null)
    {
        Invoke(_mainWindow, ShowHandle);

        if (tab is { Length: > 0 })
            _mainWindow?.SendWebMessage(NativeProtocol.SerializeEvent("app.navigate", new
            {
                tab
            }));
    }

    /// <summary>Opens a popup for <paramref name="url"/>, or navigates the existing popup to it.</summary>
    public void ShowPopup(string url)
    {
        if (string.IsNullOrWhiteSpace(url))
            return;

        _mainWindow?.Invoke(() =>
        {
            if (_popupWindow is not null)
            {
                try
                {
                    _popupWindow.SendWebMessage(NativeProtocol.SerializeEvent("popup.navigate", new
                    {
                        url
                    }));
                    ShowHandle(_popupWindow);
                    return;
                }
                catch
                {
                    _popupWindow = null;
                }
            }

            // Top-level (not owned): an owned window would be hidden together with the hidden host.
            var popup = new PhotinoWindow()
                .SetTitle(Constants.WindowTitle)
                .SetTemporaryFilesPath(WebViewDataPath)
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
    public static void StartDrag(PhotinoWindow? window) => Invoke(window, target =>
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
        _allowClose = true;
        CloseWindow(_mainWindow);
    }

    private static BrowserEntry? ResolveBrowser(AppSettings current, string? browserId) =>
        current.Browsers.Count == 0
            ? null
            : current.Browsers.FirstOrDefault(browser => browser.Id == browserId) ?? current.Browsers[0];

    private static void Invoke(PhotinoWindow? window, Action<PhotinoWindow> action)
    {
        window?.Invoke(() => action(window));
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