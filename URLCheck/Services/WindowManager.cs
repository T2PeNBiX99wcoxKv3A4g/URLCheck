using System.Drawing;
using JetBrains.Annotations;
using Photino.NET;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Platform;
using PhotinoNetUtils.Utils;
using URLCheck.Inspect;
using URLCheck.Messaging;
using URLCheck.Models;
using URLCheck.Platform;
using URLCheck.Scripting;

namespace URLCheck.Services;

/// <summary>
///     Owns the Photino windows: a hidden "host" window that keeps the message loop alive while the
///     app sits in the tray, and an on-demand borderless popup used to inspect a URL.
/// </summary>
internal sealed class WindowManager : Singleton<WindowManager>
{
    /// <summary>
    ///     Side of the floating button's square window, in physical pixels. It is a little larger than
    ///     the button itself so the button's shadow has room inside the window's round clip.
    /// </summary>
    private const int ButtonSize = 52;

    /// <summary>Offset from the pointer, so the button does not sit under the cursor.</summary>
    private const int ButtonOffset = 16;

    /// <summary>Slack around the button, so a press on its edge still counts as a click on it.</summary>
    private const int ButtonPressMargin = 8;

    /// <summary>Longer than any sane URL; a clipboard value this big is never one.</summary>
    private const int MaxUrlLength = 2048;

    /// <summary>
    ///     Photino.Native copies a window's start URL into a fixed 2048-byte buffer with a plain
    ///     <c>strcpy</c>, so a longer one aborts the process (first seen on Linux). Anything that would
    ///     not fit is sent to the page once it reports ready instead; this leaves room for the prefix.
    /// </summary>
    private const int MaxStartUrlLength = 1800;

    /// <summary>
    ///     How many listed hosts a link may be followed through. Every hop has to be on the auto-redirect
    ///     list by itself; this is only a guard against a loop between two listed hosts.
    /// </summary>
    private const int MaxAutoRedirects = 10;

    /// <summary>
    ///     Per-app web view data folder. On Windows, Photino defaults to a WebView2 folder shared by
    ///     every Photino app, which breaks when another app holds it, so keep URLCheck's separate.
    /// </summary>
    private static readonly string WebViewDataPath = Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), Constants.Name, "webview");

    /// <summary>How often the pointer is checked while the button is visible.</summary>
    private static readonly TimeSpan PointerPollInterval = TimeSpan.FromMilliseconds(90);

    /// <summary>How long the interface is given to paint its first frame before the window is hidden.</summary>
    private static readonly TimeSpan FirstRenderDelay = TimeSpan.FromMilliseconds(750);

    /// <summary>How long a hidden start waits for the interface to report in before hiding anyway.</summary>
    private static readonly TimeSpan StartupHideTimeout = TimeSpan.FromSeconds(10);

    /// <summary>How long after showing the button its position is re-asserted, once everything settled.</summary>
    private static readonly TimeSpan PositionNudgeDelay = TimeSpan.FromMilliseconds(400);

    private readonly IClipboardWatcher _clipboard = PlatformServices.Clipboard;
    private readonly HistoryService _history = HistoryService.Instance;
    private readonly IWindowPlatform _platform = PlatformServices.Window;
    private readonly Timer _pointerTimer;
    private readonly SettingsService _settings = SettingsService.Instance;
    private bool _allowClose;

    /// <summary>Where the button was really placed, so a press on it is told apart from a press away.</summary>
    private Point? _buttonAt;

    private PhotinoWindow? _buttonWindow;

    /// <summary>Set while a hidden start is still waiting for the interface's first render.</summary>
    private bool _hideWhenRendered;

    private PhotinoWindow? _mainWindow;

    /// <summary>Whether the host window's interface has reported in; before that, messages crash.</summary>
    private bool _mainWindowReady;

    /// <summary>The popup's URL when it was too long to travel in the start URL; null once delivered.</summary>
    private string? _pendingPopupUrl;

    /// <summary>The button's URL when it did not fit in the start URL, or arrived before it was ready.</summary>
    private string? _pendingSelectionUrl;

    /// <summary>Whether the popup's page is listening for <c>popup.navigate</c> yet.</summary>
    private bool _popupReady;

    private PhotinoWindow? _popupWindow;

    /// <summary>Whether the button's page is listening for <c>selection.show</c> yet.</summary>
    private bool _selectionReady;

    public WindowManager()
    {
        _clipboard.TextCopied += OnTextCopied;
        _pointerTimer = new(_ => PollPointer(), null, Timeout.Infinite, Timeout.Infinite);

        SettingsService.Changed += payload =>
        {
            BroadcastEvent("settings.changed", payload);
            ApplyClipboardWatching();
        };
        NativeBridge.MessageReceived += HandleMessageAsync;
    }

    /// <summary>Address the windows load the interface from, set before the host window is created.</summary>
    public string AppUrl { get; set; } = "";

    /// <summary>When true the host window is shown at startup instead of hiding to the tray.</summary>
    public bool ShowMainWindowOnStartup { get; set; }

    /// <summary>
    ///     Whether closing the host window hides it. Set once the tray reports whether it was really
    ///     created, so a missing tray can never leave the window hidden with no way back.
    /// </summary>
    public bool CloseToTray { get; set; }

    /// <summary>Path to the extracted <c>.ico</c> for the window icons, or null to keep the default.</summary>
    public string? IconPath { get; set; }

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

                await ShowPopupAsync(payload.Url);
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

            case "app.ready":
                _mainWindowReady = true;
                HideWhenRendered();
                return null;

            case "popup.ready":
                _popupReady = true;
                FlushPendingPopupUrl(context.Window);
                return null;

            case "selection.ready":
                _selectionReady = true;
                FlushPendingSelectionUrl(context.Window);
                return null;

            case "clipboard.read":
                return context.Reply("clipboard.read.result", new ClipboardTextPayload(_clipboard.ReadText()));

            case "popup.resize":
            {
                var height = context.Payload<PopupResizeRequest>()?.Height ?? 0;
                if (height > 0)
                    Invoke(context.Window, window => _platform.Resize(window, window.Width, height));

                return null;
            }

            case "window.minimize":
                Invoke(context.Window ?? _mainWindow, window => window.SetMinimized(true));
                return null;

            case "window.toggleMaximize":
                Invoke(context.Window ?? _mainWindow, ToggleMaximize);
                return null;

            case "window.close":
                CloseWindow(context.Window ?? _mainWindow);
                return null;

            case "window.drag":
                Invoke(context.Window ?? _mainWindow, BeginWindowDrag);
                return null;

            case "window.resize":
            {
                var direction = context.Payload<WindowResizeRequest>()?.Direction ?? "";
                Invoke(context.Window ?? _mainWindow, window => BeginWindowResize(window, direction));

                return null;
            }

            default:
                return null;
        }
    }

    public void CreateMainWindow()
    {
        PrepareWebViewData();

        var window = new PhotinoWindow()
            .SetTitle(Constants.WindowTitle)
            .SetTemporaryFilesPath(WebViewDataPath)
            .SetUseOsDefaultSize(false)
            .SetSize(new(1024, 720))
            .SetMinSize(720, 480)
            .SetContextMenuEnabled(false)
            // Only here so that nothing flashes: the native show skips a minimised window, and the
            // window is hidden outright below either way.
            .SetMinimized(!ShowMainWindowOnStartup)
            .RegisterWebMessageReceivedHandler((sender, message) =>
                _ = NativeBridge.HandleMessageAsync(sender as PhotinoWindow, message))
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
        _platform.ConfigureMainWindow(window);

        window.Load(AppUrl);
        _mainWindow = window;

        window.RegisterWindowCreatedHandler((_, _) =>
        {
            _platform.OnMainWindowCreated(window);

            ApplyClipboardWatching();

            // Photino drops a Start Menu shortcut for the toast registration and never revisits it,
            // so a build that moved would keep one pointing at the old copy.
            if (OperatingSystem.IsWindows())
                StartMenuShortcut.Refresh(Constants.WindowTitle);

            // Starting hidden keeps the window minimised for now. Hiding a window while its web view
            // is still starting up leaves that web view permanently blank, so the window stays
            // minimised — which it renders fine from — until the interface has really rendered, and
            // only then is hidden the way the close button hides it.
            if (ShowMainWindowOnStartup)
            {
                MainWindowCreated?.Invoke();
                return;
            }

            _hideWhenRendered = true;
            Log.Information("Starting hidden; the window stays minimised until its interface has rendered");

            // The interface is expected to report in; this makes sure the window still ends up hidden
            // when it cannot (a broken bundle, for instance) instead of sitting in the taskbar.
            _ = Task.Delay(StartupHideTimeout).ContinueWith(_ => HideWhenRendered());
            MainWindowCreated?.Invoke();
        });
    }

    /// <summary>Starts the message loop; blocks until the host window is closed for real.</summary>
    public void Run() => _mainWindow?.WaitForClose();

    /// <summary>
    ///     Drops the web view's data folder when this build is not the one that filled it. The static
    ///     server advertises no caching policy, so a web view may keep serving the previous interface
    ///     from its own cache — indefinitely on some engines — and that cache would otherwise grow
    ///     with every upgrade. Only the profile folder goes; the marker that records the build lives
    ///     beside it.
    /// </summary>
    private void PrepareWebViewData()
    {
        var marker = Path.Combine(Path.GetDirectoryName(WebViewDataPath)!, "webview.build");

        Try.Run(() =>
        {
            if (File.Exists(marker) && File.ReadAllText(marker) != AppInfoService.BuildToken)
            {
                Log.Information("This is a different build; clearing the web view's cache");
                Directory.Delete(WebViewDataPath, true);
            }

            File.WriteAllText(marker, AppInfoService.BuildToken);
        }).OnFailure(ex => Log.Warning(ex, "Failed to prepare the web view's data folder"));
    }

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

    /// <summary>
    ///     Hides the main window the way the close button does, but only once the interface has really
    ///     rendered. Hiding it any earlier — while the web view is still starting up — leaves that view
    ///     blank for good, so a hidden start keeps the window minimised until then.
    /// </summary>
    private void HideWhenRendered()
    {
        if (!_hideWhenRendered)
            return;

        _hideWhenRendered = false;
        Log.Information("The interface has rendered; hiding the main window to the tray");

        _ = Task.Delay(FirstRenderDelay).ContinueWith(_ => HideMainWindow());
    }

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
            Log.Debug("Copied text is not a URL; hiding the button");
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
            // Wayland hides the global pointer, so the compositor places the window instead.
            _platform.TryGetCursorPosition(out var cursorX, out var cursorY);
            var x = cursorX + ButtonOffset;
            var y = cursorY + ButtonOffset;

            // The first show loads the page with the URL in its fragment; later shows reuse the
            // already loaded page and push the new URL through an event.
            var created = _buttonWindow is null;
            if (EnsureButtonWindow(url, x, y) is not { } button)
                return;

            // A fresh window carries the URL in its fragment, or collects it from the pending field
            // once the page reports ready. A reused one gets the event, or replaces the pending URL.
            if (!created && _selectionReady)
                TrySend(button, NativeBridge.SerializeEvent("selection.show", new SelectionShowPayload(url)));
            else if (!created)
                _pendingSelectionUrl = url;

            _buttonAt = _platform.ShowSelectionButton(button, x, y, ButtonSize);

            // Wayland hides the pointer from clients, so the compositor is the only one that can put
            // the button next to it.
            if (OperatingSystem.IsLinux())
                LinuxOverlay.MoveToCursor(Constants.SelectionButtonTitle, ButtonOffset);

            // Placing it again shortly after gives anything that resized or moved the window while it
            // was coming back — a window manager, say — a chance to settle, so the button still ends
            // up the right size under the pointer.
            _ = Task.Delay(PositionNudgeDelay).ContinueWith(_ => ReassertButtonPosition(button, x, y));

            _pointerTimer.Change(PointerPollInterval, PointerPollInterval);
        });
    }

    /// <summary>Re-places the button, unless it has been dismissed in the meantime.</summary>
    private void ReassertButtonPosition(PhotinoWindow button, int x, int y)
    {
        if (_buttonAt is null || !ReferenceEquals(_buttonWindow, button))
            return;

        RunOnMainWindow(() =>
        {
            if (_buttonAt is not null && ReferenceEquals(_buttonWindow, button))
                _platform.ShowSelectionButton(button, x, y, ButtonSize);
        });
    }

    /// <summary>
    ///     Hides the button as soon as a mouse button goes down away from it, which is what clicking any
    ///     other window looks like from here. The button itself acts on mouse-down, so its own click is
    ///     never lost to this.
    /// </summary>
    private void PollPointer()
    {
        if (!_platform.PointerButtonPressed())
            return;

        // Without a pointer position (Wayland) any press counts, since the button cannot be located.
        if (_buttonAt is { } at &&
            _platform.TryGetCursorPosition(out var x, out var y) &&
            x >= at.X - ButtonPressMargin && x <= at.X + ButtonSize + ButtonPressMargin &&
            y >= at.Y - ButtonPressMargin && y <= at.Y + ButtonSize + ButtonPressMargin)
            return;

        Log.Debug("Mouse pressed away from the button; hiding it");
        HideSelectionButton();
    }

    private void HideSelectionButton()
    {
        _pointerTimer.Change(Timeout.Infinite, Timeout.Infinite);

        var button = _buttonWindow;
        if (button is null)
            return;

        _buttonAt = null;
        RunOnMainWindow(() => _platform.Hide(button));
    }

    /// <summary>
    ///     Builds the button window on first use, already at the place it belongs. It is created hidden
    ///     and then reused, so copying a URL does not pay for a fresh WebView every time. The URL
    ///     travels in the fragment because the page is not listening for events yet while it loads.
    /// </summary>
    private PhotinoWindow? EnsureButtonWindow(string url, int x, int y)
    {
        if (_buttonWindow is { } current)
        {
            // Normally the button is only hidden and can be reused. If something destroyed it anyway,
            // handing back the stale reference is exactly what makes the button never appear again, so
            // rebuild it instead.
            if (_platform.IsAlive(current))
                return current;

            Log.Warning("The selection button window is gone; recreating it");
            _buttonWindow = null;
        }

        return Try.Run<PhotinoWindow?>(() =>
        {
            var button = _platform.CreateSelectionButtonWindow(_mainWindow)
                .SetTitle(Constants.SelectionButtonTitle)
                .SetTemporaryFilesPath(WebViewDataPath)
                .SetContextMenuEnabled(false)
                .SetUseOsDefaultSize(false)
                .SetUseOsDefaultLocation(false)
                .SetLocation(new(x, y))
                .SetSize(new(ButtonSize, ButtonSize))
                .SetMinSize(ButtonSize, ButtonSize)
                .SetMaxSize(ButtonSize, ButtonSize)
                .SetChromeless(true)
                .SetTransparent(true)
                .SetTopMost(true)
                // Registering for notifications would drop a Start Menu shortcut named after the button.
                .SetNotificationsEnabled(false)
                // The button is only ever hidden, never closed. An OS-initiated close — the taskbar's
                // close button, for instance — would destroy the native window while this reference
                // lives on, and the button would then never appear again.
                .RegisterWindowClosingHandler((_, _) => true)
                .RegisterWebMessageReceivedHandler((sender, message) =>
                    _ = NativeBridge.HandleMessageAsync(sender as PhotinoWindow, message));

            // The window exists from here on, which is when the platform can still shape it.
            button.RegisterWindowCreatedHandler((_, _) =>
            {
                _platform.ConfigureSelectionButtonWindow(button);
                _platform.Hide(button);
            });

            // Same fixed-buffer limit as the popup: the URL travels in the fragment only when it fits.
            var startUrl = $"{AppUrl}#selection";
            _selectionReady = false;
            _pendingSelectionUrl = FitsInStartUrl(startUrl, url) ? null : url;
            if (_pendingSelectionUrl is null)
                startUrl += $"?url={Uri.EscapeDataString(url)}";

            ApplyIcon(button);
            button.Load(startUrl);
            button.WaitForClose();

            _buttonWindow = button;
            return button;
        }).GetOrElse(ex =>
        {
            Log.Warning(ex, "Failed to create the selection button window");
            return null;
        });
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
            _mainWindow?.SendWebMessage(NativeBridge.SerializeEvent("app.navigate", new NavigatePayload(tab)));
    }

    /// <summary>
    ///     Opens the popup for a URL, first following its redirects when its host is on the auto-redirect
    ///     list. The history then records the destination instead of the short link.
    /// </summary>
    public async Task ShowPopupAsync(string url)
    {
        if (string.IsNullOrWhiteSpace(url))
            return;

        // The scripts only see the URL the popup will really open: after the redirects are followed.
        var resolved = await ResolveAutoRedirectAsync(url);
        var outcome = await ScriptEngine.Instance.ProcessAsync(resolved, AppInfoService.Version);

        ShowPopup(outcome.Url, outcome.Error);
    }

    /// <summary>Asks the user for script files; empty when they cancel or there is no window yet.</summary>
    public Task<string[]> PickFilesAsync() =>
        _mainWindow is { } window
            ? window.ShowOpenFileAsync("Choose a script", null, true, [
                ("Lua script", new[]
                {
                    "lua"
                })
            ])
            : Task.FromResult(Array.Empty<string>());

    /// <summary>
    ///     Follows a short link through its redirects. Each hop is only followed when its own host is
    ///     also on the list, so a chain cannot drag the app somewhere unexpected.
    /// </summary>
    private async Task<string> ResolveAutoRedirectAsync(string url)
    {
        var settings = await _settings.GetAsync();
        var current = url;

        for (var hop = 0; hop < MaxAutoRedirects; hop++)
        {
            if (!Uri.TryCreate(current, UriKind.Absolute, out var uri) ||
                uri.Scheme is not ("http" or "https") ||
                !settings.ShouldAutoRedirect(uri))
                break;

            var attempt = await Try.Run(() => InspectService.Instance.ResolveRedirectAsync(current));
            if (attempt.Exception is { } exception)
            {
                Log.Warning(exception, "Failed to follow {Url} through its redirect", current);
                break;
            }

            if (attempt.Value is not { } next)
                break;

            Log.Information("Auto-redirected {From} to {To}", current, next);
            current = next;
        }

        return current;
    }

    /// <summary>Opens a popup for <paramref name="url" />, or navigates the existing popup to it.</summary>
    public void ShowPopup(string url, string? scriptError = null)
    {
        if (string.IsNullOrWhiteSpace(url))
            return;

        // The popup replaces the button, so the button never lingers on top of it.
        HideSelectionButton();

        // History keeps the URL that was clicked, not whatever the popup later edits it into.
        _history.Record(url);

        _mainWindow?.Invoke(() =>
        {
            var existing = _popupWindow;
            if (existing is not null)
            {
                if (!_popupReady)
                {
                    // Still loading: it collects the URL when it reports ready.
                    _pendingPopupUrl = url;
                    _platform.Show(existing);
                    _platform.KeepOnTop(existing);
                    return;
                }

                if (Try.Run(() =>
                    {
                        existing.SendWebMessage(NativeBridge.SerializeEvent("popup.navigate",
                            new PopupNavigatePayload(url, scriptError)));
                        _platform.Show(existing);
                        _platform.KeepOnTop(existing);
                    }))
                    return;

                _popupWindow = null;
            }

            // Top-level on Win32, a transient child of the host on GTK (see CreatePopupWindow).
            var popup = _platform.CreatePopupWindow(_mainWindow)
                .SetTitle(Constants.PopupTitle)
                .SetTemporaryFilesPath(WebViewDataPath)
                .SetContextMenuEnabled(false)
                .RegisterWebMessageReceivedHandler((sender, message) =>
                    _ = NativeBridge.HandleMessageAsync(sender as PhotinoWindow, message))
                .RegisterWindowClosingHandler((_, _) =>
                {
                    _popupWindow = null;
                    _popupReady = false;
                    _pendingPopupUrl = null;
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

            // Keep the start URL short enough for Photino's fixed buffer; a long one travels as an event.
            var startUrl = $"{AppUrl}#popup?borderless={(borderless ? 1 : 0)}&strip={(stripTracking ? 1 : 0)}";
            _popupReady = false;
            _pendingPopupUrl = FitsInStartUrl(startUrl, url) ? null : url;
            if (_pendingPopupUrl is null)
                startUrl += $"&url={Uri.EscapeDataString(url)}";

            // The popup says so when a script could not handle the URL, instead of silently showing
            // the URL the script meant to change.
            if (scriptError is { Length: > 0 })
                startUrl +=
                    $"&scriptError={Uri.EscapeDataString(scriptError.Length > 300 ? scriptError[..300] : scriptError)}";

            ApplyIcon(popup);
            popup.Load(startUrl);
            _popupWindow = popup;

            Try.Run(() =>
            {
                popup.WaitForClose();

                _platform.KeepOnTop(popup);
                _platform.RoundCorners(popup);

                // The native show/center runs after the created callback and clears the style,
                // so re-assert it once the window has settled.
                _ = Task.Delay(700).ContinueWith(_ => ReassertTopMost(popup));
            }).OnFailure(ex =>
            {
                Log.Warning(ex, "Failed to create popup");
                _popupWindow = null;
                _popupReady = false;
                _pendingPopupUrl = null;
            });

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
            Try.Run(target.Close).OnFailure(ex => Log.Warning(ex, "Failed to close window")));
    }

    /// <summary>Pushes an event to every open window.</summary>
    [PublicAPI]
    public void BroadcastEvent(string type, object? data)
    {
        var json = NativeBridge.SerializeEvent(type, data);
        TrySend(_mainWindow, json);
        TrySend(_popupWindow, json);
    }

    /// <summary>Sends an event to the host window only; views that live there are the only listeners.</summary>
    public void NotifyMainWindow(string type, object? data)
    {
        // Sending to a web view that is still loading aborts the process; the page loads the current
        // data itself when it mounts, so nothing is lost by waiting.
        if (!_mainWindowReady)
            return;

        TrySend(_mainWindow, NativeBridge.SerializeEvent(type, data));
    }

    /// <summary>
    ///     Pushes an event to every window that has reported in. A web view that is still loading
    ///     aborts the process when it is sent to, and it loads its own state when it mounts anyway.
    /// </summary>
    public void BroadcastEventIfReady(string type, object? data)
    {
        var json = NativeBridge.SerializeEvent(type, data);
        if (_mainWindowReady)
            TrySend(_mainWindow, json);
        if (_popupReady)
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

    /// <summary>Starts a native move from the interface's own title bar.</summary>
    private static void BeginWindowDrag(PhotinoWindow window)
    {
        if (OperatingSystem.IsWindows())
            WindowDrag.Begin(window.WindowHandle);
        else if (OperatingSystem.IsLinux())
            LinuxWindow.BeginDrag(window.Title);
    }

    /// <summary>Starts a native resize from one of the interface's edge grips.</summary>
    private static void BeginWindowResize(PhotinoWindow window, string direction)
    {
        if (OperatingSystem.IsWindows())
            WindowResize.Begin(window.WindowHandle, direction);
        else if (OperatingSystem.IsLinux())
            LinuxWindow.BeginResize(window.Title, direction);
    }

    /// <summary>Maximizes or restores through the platform, then tells the interface which it did.</summary>
    private void ToggleMaximize(PhotinoWindow window)
    {
        if (OperatingSystem.IsWindows())
        {
            if (window.WindowHandle != IntPtr.Zero)
                NotifyWindowState(WindowZoom.Toggle(window.WindowHandle));

            return;
        }

        if (OperatingSystem.IsLinux())
        {
            NotifyWindowState(LinuxWindow.ToggleMaximize(window.Title));
            return;
        }

        var maximized = !window.Maximized;
        window.SetMaximized(maximized);
        NotifyWindowState(maximized);
    }

    private void NotifyWindowState(bool maximized) =>
        NotifyMainWindow("window.state", new WindowStatePayload(maximized));

    private void ReassertTopMost(PhotinoWindow popup) =>
        Try.Run(() =>
        {
            if (ReferenceEquals(_popupWindow, popup))
                popup.Invoke(() => _platform.KeepOnTop(popup));
        }).OnFailure(ex => Log.Debug(ex, "Failed to re-assert topmost"));

    private void TrySend(PhotinoWindow? window, string json) =>
        Try.Run(() => window?.SendWebMessage(json)).OnFailure(ex => Log.Warning(ex, "Failed to send event"));

    /// <summary>Hands over a URL that was too long to travel in the popup's start URL.</summary>
    private void FlushPendingPopupUrl(PhotinoWindow? window)
    {
        if (_pendingPopupUrl is not { } url)
            return;

        _pendingPopupUrl = null;
        TrySend(window, NativeBridge.SerializeEvent("popup.navigate", new PopupNavigatePayload(url, null)));
    }

    /// <summary>Hands over a URL that was too long to travel in the button's start URL.</summary>
    private void FlushPendingSelectionUrl(PhotinoWindow? window)
    {
        if (_pendingSelectionUrl is not { } url)
            return;

        _pendingSelectionUrl = null;
        TrySend(window, NativeBridge.SerializeEvent("selection.show", new SelectionShowPayload(url)));
    }

    /// <summary>
    ///     Whether a URL can travel in a window's start URL without overflowing Photino's fixed buffer.
    ///     The extra five characters cover the <c>?url=</c> / <c>&amp;url=</c> that introduces it.
    /// </summary>
    private static bool FitsInStartUrl(string startUrl, string url) =>
        startUrl.Length + Uri.EscapeDataString(url).Length + 5 <= MaxStartUrlLength;
}