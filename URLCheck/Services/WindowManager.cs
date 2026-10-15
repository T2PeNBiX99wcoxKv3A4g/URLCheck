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
    ///     Per-app web view data folder. On Windows, Photino defaults to a WebView2 folder shared by
    ///     every Photino app, which breaks when another app holds it, so keep URLCheck's separate.
    /// </summary>
    private static readonly string WebViewDataPath = Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), Constants.Name, "webview");

    private readonly string _appUrl;
    private readonly IWindowPlatform _platform;
    private readonly SettingsService _settings;
    private readonly HistoryService _history;
    private bool _allowClose;

    private PhotinoWindow? _mainWindow;
    private PhotinoWindow? _popupWindow;

    public WindowManager(string appUrl, IWindowPlatform platform, SettingsService settings, HistoryService history)
    {
        _appUrl = appUrl;
        _platform = platform;
        _settings = settings;
        _history = history;

        SettingsService.Changed += payload => BroadcastEvent("settings.changed", payload);
        NativeBridge.MessageReceived += HandleMessageAsync;
    }

    /// <summary>When true the host window is shown at startup instead of hiding to the tray.</summary>
    public bool ShowMainWindowOnStartup { get; init; }

    /// <summary>
    ///     Whether closing the host window hides it. Set once the tray reports whether it was really
    ///     created, so a missing tray can never leave the window hidden with no way back.
    /// </summary>
    public bool CloseToTray { get; set; }

    /// <summary>Path to the extracted <c>.ico</c> for the window icons, or null to keep the default.</summary>
    public string? IconPath { get; init; }

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
                    return context.Fail("popup.show.result", "error.missingUrl");

                ShowPopup(payload.Url);
                return context.Reply("popup.show.result", new OkPayload());
            }

            case "popup.open":
            {
                var payload = context.Payload<PopupOpenRequest>();
                if (string.IsNullOrWhiteSpace(payload?.Url))
                    return context.Fail("popup.open.result", "error.missingUrl");

                var settings = await _settings.GetAsync();
                var browser = ResolveBrowser(settings, payload.BrowserId);
                if (browser is null)
                    return context.Fail("popup.open.result", "error.noBrowser");

                // Track usage so the most-used browser becomes the default entry.
                browser.UseCount++;
                await _settings.SaveAsync(settings);

                BrowserService.Launch(browser, payload.Url, payload.Private);
                return context.Reply("popup.open.result", new BrowserOpenPayload(true, browser.Name));
            }

            case "popup.close":
                CloseWindow(context.Window);
                return null;

            case "popup.resize":
            {
                var height = context.Payload<PopupResizeRequest>()?.Height ?? 0;
                if (height > 0)
                    Invoke(context.Window, window => _platform.Resize(window, window.Width, height));

                return null;
            }

            default:
                return null;
        }
    }

    public void CreateMainWindow()
    {
        var window = new PhotinoWindow()
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
                if (_allowClose || !CloseToTray)
                {
                    Log.Information("Main window closing (allowed)");
                    return false;
                }

                Log.Information("Main window closing -> hiding to the tray");
                HideMainWindow();
                return true;
            });

        ApplyIcon(window);
        window.Load(_appUrl);
        _mainWindow = window;
    }

    /// <summary>Starts the message loop; blocks until the host window is closed for real.</summary>
    public void Run() => _mainWindow?.WaitForClose();

    /// <summary>Runs an action on the UI thread, once the message loop is running.</summary>
    public void RunOnMainWindow(Action action) => Invoke(_mainWindow, _ => action());

    [PublicAPI]
    public void HideMainWindow()
    {
        Log.Information("Hiding the main window");
        Invoke(_mainWindow, _platform.Hide);
    }

    public void ShowMainWindow(string? tab = null)
    {
        Log.Information("Showing the main window");
        Invoke(_mainWindow, _platform.Show);

        if (tab is { Length: > 0 })
            _mainWindow?.SendWebMessage(NativeProtocol.SerializeEvent("app.navigate", new NavigatePayload(tab)));
    }

    /// <summary>Opens a popup for <paramref name="url" />, or navigates the existing popup to it.</summary>
    public void ShowPopup(string url)
    {
        if (string.IsNullOrWhiteSpace(url))
            return;

        // History keeps the URL that was clicked, not whatever the popup later edits it into.
        _history.Record(url);

        _mainWindow?.Invoke(() =>
        {
            if (_popupWindow is not null)
                try
                {
                    _popupWindow.SendWebMessage(NativeProtocol.SerializeEvent("popup.navigate",
                        new PopupNavigatePayload(url)));
                    _platform.Show(_popupWindow);
                    _platform.KeepOnTop(_popupWindow);
                    return;
                }
                catch
                {
                    _popupWindow = null;
                }

            // Top-level on Win32, a transient child of the host on GTK (see CreatePopupWindow).
            var popup = _platform.CreatePopupWindow(_mainWindow)
                .SetTitle(Constants.PopupTitle)
                .SetTemporaryFilesPath(WebViewDataPath)
                .RegisterWebMessageReceivedHandler((sender, message) =>
                    _ = NativeBridge.HandleMessageAsync(sender as PhotinoWindow, message))
                .RegisterWindowCreatedHandler((_, _) => Log.Information("Popup window created"))
                .RegisterWindowClosingHandler((_, _) =>
                {
                    _popupWindow = null;
                    return false;
                });

            _platform.ConfigurePopup(popup, _settings.Current?.TransparentPopup ?? true);
            ApplyIcon(popup);
            popup.Load($"{_appUrl}#popup?url={Uri.EscapeDataString(url)}");
            _popupWindow = popup;

            try
            {
                popup.WaitForClose();

                _platform.KeepOnTop(popup);
                _platform.RoundCorners(popup);

                // The native show/center runs after the created callback and clears the style,
                // so re-assert it once the window has settled.
                _ = Task.Delay(700).ContinueWith(_ => ReassertTopMost(popup));
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Failed to create popup");
                _popupWindow = null;
            }

            Log.Information("Popup message loop returned");
        });
    }

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

    /// <summary>Gives the window the app icon, when one was extracted.</summary>
    private void ApplyIcon(PhotinoWindow window)
    {
        if (IconPath is { Length: > 0 })
            window.SetIconFile(IconPath);
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