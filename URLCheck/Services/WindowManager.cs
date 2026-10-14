using JetBrains.Annotations;
using Photino.NET;
using Serilog;
using URLCheck.Messaging;
using URLCheck.Models;
using URLCheck.Platform;

namespace URLCheck.Services;

/// <summary>
///     Owns the Photino windows: a hidden "host" window that keeps the message loop alive while the
///     app sits in the tray, and an on-demand borderless popup used to inspect a URL.
/// </summary>
internal sealed class WindowManager
{
    /// <summary>
    ///     Per-app WebView2 data folder. Photino defaults to a folder shared by every Photino app,
    ///     which breaks when another app holds it, so keep URLCheck's separate.
    /// </summary>
    private static readonly string WebViewDataPath = Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), Constants.Name, "webview");

    private readonly string _appUrl;
    private readonly IWindowPlatform _platform;
    private readonly SettingsService _settings;
    private bool _allowClose;

    private PhotinoWindow? _mainWindow;
    private PhotinoWindow? _popupWindow;
    private bool _popupCentered;

    public WindowManager(string appUrl, IWindowPlatform platform, SettingsService settings)
    {
        _appUrl = appUrl;
        _platform = platform;
        _settings = settings;

        SettingsService.Changed += payload => BroadcastEvent("settings.changed", payload);
        NativeBridge.MessageReceived += HandleMessageAsync;
    }

    /// <summary>When true the host window is shown at startup instead of hiding to the tray.</summary>
    public bool ShowMainWindowOnStartup { get; init; }

    /// <summary>Raised once the host window's native handle exists (message loop is about to start).</summary>
    public event Action? MainWindowCreated;

    /// <summary>Handles the <c>popup.*</c> and <c>window.*</c> messages.</summary>
    private async Task<NativeResponse?> HandleMessageAsync(NativeContext context)
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

                BrowserService.Launch(browser.ExecutablePath, payload.Url, payload.Private);
                return context.Reply("popup.open.result", new
                {
                    Ok = true,
                    Browser = browser.Name
                });
            }

            case "popup.close":
                CloseWindow(context.Window);
                return null;

            case "popup.resize":
            {
                var height = context.Payload<PopupResizeRequest>()?.Height ?? 0;
                if (height > 0)
                {
                    // The first fit also re-centers; later fits keep wherever the user moved it.
                    var center = !_popupCentered;
                    _popupCentered = true;
                    Invoke(context.Window, window => _platform.Resize(window, window.Width, height, center));
                }

                return null;
            }

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
                _ = NativeBridge.HandleMessageAsync(sender as PhotinoWindow, message))
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

    [PublicAPI]
    public void HideMainWindow() => Invoke(_mainWindow, _platform.Hide);

    public void ShowMainWindow(string? tab = null)
    {
        Invoke(_mainWindow, _platform.Show);

        if (tab is { Length: > 0 })
            _mainWindow?.SendWebMessage(NativeProtocol.SerializeEvent("app.navigate", new
            {
                tab
            }));
    }

    /// <summary>Opens a popup for <paramref name="url" />, or navigates the existing popup to it.</summary>
    public void ShowPopup(string url)
    {
        if (string.IsNullOrWhiteSpace(url))
            return;

        _mainWindow?.Invoke(() =>
        {
            if (_popupWindow is not null)
                try
                {
                    _popupWindow.SendWebMessage(NativeProtocol.SerializeEvent("popup.navigate", new
                    {
                        url
                    }));
                    _platform.Show(_popupWindow);
                    _platform.KeepOnTop(_popupWindow);
                    return;
                }
                catch
                {
                    _popupWindow = null;
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
                    _ = NativeBridge.HandleMessageAsync(sender as PhotinoWindow, message))
                .RegisterWindowClosingHandler((_, _) =>
                {
                    _popupWindow = null;
                    return false;
                })
                .Load($"{_appUrl}#popup?url={Uri.EscapeDataString(url)}");

            _popupWindow = popup;
            _popupCentered = false;

            try
            {
                popup.WaitForClose();
                _platform.KeepOnTop(popup);

                // The native show/center runs after the created callback and clears the style,
                // so re-assert it once the window has settled.
                _ = Task.Delay(700).ContinueWith(_ => ReassertTopMost(popup));
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Failed to create popup");
                _popupWindow = null;
            }
        });
    }

    /// <summary>Lets the OS move a borderless window when the user drags its header.</summary>
    [PublicAPI]
    public void StartDrag(PhotinoWindow? window) => Invoke(window, _platform.StartDrag);

    [PublicAPI]
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
    [PublicAPI]
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

    private void ReassertTopMost(PhotinoWindow popup)
    {
        try
        {
            if (ReferenceEquals(_popupWindow, popup))
                popup.Invoke(() => _platform.KeepOnTop(popup));
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "Failed to re-assert topmost");
        }
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