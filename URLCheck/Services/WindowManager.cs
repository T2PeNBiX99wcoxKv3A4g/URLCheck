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

    /// <summary>Size of the floating button's window, in physical pixels.</summary>
    private const int ButtonWidth = 176;
    private const int ButtonHeight = 44;

    /// <summary>Offset from the pointer, so the button does not sit under the cursor.</summary>
    private const int ButtonOffset = 18;

    /// <summary>How long the button stays on screen before it hides itself again.</summary>
    private static readonly TimeSpan ButtonLifetime = TimeSpan.FromSeconds(8);

    /// <summary>Longer than any sane URL; a clipboard value this big is never one.</summary>
    private const int MaxUrlLength = 2048;

    private readonly string _appUrl;
    private readonly IWindowPlatform _platform;
    private readonly SettingsService _settings;
    private readonly HistoryService _history;
    private readonly IClipboardWatcher _clipboard;
    private readonly Timer _buttonTimer;
    private bool _allowClose;

    private PhotinoWindow? _mainWindow;
    private PhotinoWindow? _popupWindow;
    private PhotinoWindow? _buttonWindow;

    public WindowManager(string appUrl, IWindowPlatform platform, SettingsService settings, HistoryService history,
        IClipboardWatcher clipboard)
    {
        _appUrl = appUrl;
        _platform = platform;
        _settings = settings;
        _history = history;
        _clipboard = clipboard;

        _clipboard.TextCopied += OnTextCopied;
        _buttonTimer = new(_ => HideSelectionButton(), null, Timeout.Infinite, Timeout.Infinite);

        SettingsService.Changed += payload =>
        {
            BroadcastEvent("settings.changed", payload);
            ApplyClipboardWatching();
        };
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

            case "selection.hide":
                HideSelectionButton();
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
            .RegisterWindowCreatedHandler((_, _) =>
            {
                ApplyClipboardWatching();
                MainWindowCreated?.Invoke();
            })
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

    /// <summary>
    ///     Records that the platform could not deliver a borderless popup, so the setting stops claiming
    ///     something the window does not actually do.
    /// </summary>
    private void RecordBorderlessFallback()
    {
        if (_settings.Current is not { BorderlessPopup: true } current)
            return;

        current.BorderlessPopup = false;
        _ = _settings.SaveAndPublishAsync(current);
    }

    /// <summary>Runs an action on the UI thread, once the message loop is running.</summary>
    public void RunOnMainWindow(Action action) => Invoke(_mainWindow, _ => action());

    /// <summary>Starts or stops clipboard watching so it always matches the setting.</summary>
    private void ApplyClipboardWatching() => RunOnMainWindow(() =>
    {
        if (_settings.Current?.ShowUrlButton ?? false)
        {
            _clipboard.Start();
            return;
        }

        _clipboard.Stop();
        HideSelectionButton();
    });

    /// <summary>Shows the floating button when a copied text is a lone http(s) URL.</summary>
    private void OnTextCopied(string text)
    {
        if ((_settings.Current?.ShowUrlButton ?? false) is false)
            return;

        if (UrlFromText(text) is not { } url)
        {
            HideSelectionButton();
            return;
        }

        ShowSelectionButton(url);
    }

    /// <summary>The trimmed clipboard text when it is a lone http(s) URL; anything else is not a link.</summary>
    private static string? UrlFromText(string text)
    {
        var value = text.Trim().Trim('<', '>', '"', '\'');
        if (value.Length is 0 or > MaxUrlLength)
            return null;

        return Uri.TryCreate(value, UriKind.Absolute, out var uri) && uri.Scheme is "http" or "https"
            ? uri.ToString()
            : null;
    }

    private void ShowSelectionButton(string url)
    {
        RunOnMainWindow(() =>
        {
            // The first show loads the page with the URL in its fragment; later shows reuse the
            // already loaded page and push the new URL through an event.
            var created = _buttonWindow is null;
            if (EnsureButtonWindow(url) is not { } button)
                return;

            if (!created)
                button.SendWebMessage(NativeProtocol.SerializeEvent("selection.show", new SelectionShowPayload(url)));

            // Wayland hides the global pointer, so the compositor places the window there instead.
            _platform.TryGetCursorPosition(out var x, out var y);
            _platform.ShowSelectionButton(button, x + ButtonOffset, y + ButtonOffset);

            _buttonTimer.Change(ButtonLifetime, Timeout.InfiniteTimeSpan);
        });
    }

    private void HideSelectionButton()
    {
        _buttonTimer.Change(Timeout.Infinite, Timeout.Infinite);

        var button = _buttonWindow;
        if (button is not null)
            RunOnMainWindow(() => _platform.Hide(button));
    }

    /// <summary>
    ///     Builds the button window on first use. It is created hidden and then reused, so copying a
    ///     URL does not pay for a fresh WebView every time. The URL travels in the fragment because the
    ///     page is not listening for events yet while it loads.
    /// </summary>
    private PhotinoWindow? EnsureButtonWindow(string url)
    {
        if (_buttonWindow is not null)
            return _buttonWindow;

        try
        {
            var button = _platform.CreateSelectionButtonWindow(_mainWindow)
                .SetTitle(Constants.SelectionButtonTitle)
                .SetTemporaryFilesPath(WebViewDataPath)
                .SetUseOsDefaultSize(false)
                .SetUseOsDefaultLocation(false)
                // Created off-screen and hidden at once, so the very first copy does not flash a window
                // at whatever place the OS would have picked.
                .SetLocation(new System.Drawing.Point(-32000, -32000))
                .SetSize(new(ButtonWidth, ButtonHeight))
                .SetMinSize(ButtonWidth, ButtonHeight)
                .SetMaxSize(ButtonWidth, ButtonHeight)
                .SetResizable(false)
                .SetChromeless(true)
                .SetTransparent(true)
                .SetTopMost(true)
                // Registering for notifications would drop a Start Menu shortcut named after the button.
                .SetNotificationsEnabled(false)
                .RegisterWebMessageReceivedHandler((sender, message) =>
                    _ = NativeBridge.HandleMessageAsync(sender as PhotinoWindow, message));

            // The window exists from here on, which is when the platform can still shape it.
            button.RegisterWindowCreatedHandler((_, _) =>
            {
                _platform.ConfigureSelectionButtonWindow(button);
                _platform.Hide(button);
            });

            ApplyIcon(button);
            button.Load($"{_appUrl}#selection?url={Uri.EscapeDataString(url)}");
            button.WaitForClose();

            _buttonWindow = button;
            return button;
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to create the selection button window");
            return null;
        }
    }

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

        // The popup replaces the button, so the button never lingers on top of it.
        HideSelectionButton();

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
                .RegisterWindowClosingHandler((_, _) =>
                {
                    _popupWindow = null;
                    return false;
                });

            var requested = _settings.Current?.BorderlessPopup ?? true;
            var borderless = _platform.ConfigurePopup(popup, requested);
            if (borderless != requested)
                RecordBorderlessFallback();

            // The window only exists from here on, which is when a platform can still shape it.
            popup.RegisterWindowCreatedHandler((_, _) =>
            {
                Log.Information("Popup window created");
                _platform.OnPopupCreated(popup, borderless);
            });

            var stripTracking = _settings.Current?.AutoStripTrackingParams ?? true;

            ApplyIcon(popup);
            popup.Load(
                $"{_appUrl}#popup?url={Uri.EscapeDataString(url)}&borderless={(borderless ? 1 : 0)}&strip={(stripTracking ? 1 : 0)}");
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
        _clipboard.Stop();
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