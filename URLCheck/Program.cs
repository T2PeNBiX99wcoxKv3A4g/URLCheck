using System.Diagnostics.CodeAnalysis;
using System.Runtime.Versioning;
using PhotinoNetUtils;
using PhotinoNetUtils.Hosting;
using PhotinoNetUtils.Interop;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Platform;
using PhotinoNetUtils.Services;
using Serilog;
using URLCheck.Filters;
using URLCheck.Forward;
using URLCheck.Inspect;
using URLCheck.Messaging;
using URLCheck.Platform;
using URLCheck.Services;

namespace URLCheck;
//NOTE: To hide the console window, go to the project properties and change the Output Type to Windows Application.
// Or edit the .csproj file and change the <OutputType> tag from "WinExe" to "Exe".

internal static class Program
{
    [STAThread]
    [SuppressMessage("ReSharper", "HeuristicUnreachableCode")]
    private static void Main(string[] args)
    {
        if (!OperatingSystem.IsWindows() && !OperatingSystem.IsLinux())
            throw new PlatformNotSupportedException("URLCheck supports Windows and Linux.");

        // Main must stay synchronous: [STAThread] is ignored for an async entry point, and the
        // Photino message loop / WebView2 require an STA thread.
        Logging.Initialize(Constants.Name, "urlcheck");

        // The bridge serializes through this context; it has to know it before the interface speaks.
        NativeBridge.Initialize(AppJsonContext.Default);

        if (OperatingSystem.IsLinux())
        {
            LinuxDiagnostics.Write();

            // The Wayland app id must match the desktop entry's file name, or the compositor will not
            // associate our windows with our icon.
            LinuxGtk.SetProgramName(LinuxProtocolRegistrar.ProcessName);
        }

        try
        {
            foreach (var arg in args)
                Log.Information("arg: {Arg}", arg);

            var startupUrls = ExtractUrls(args);

            // Without a tray the window is the only way back into the app, so always show it there.
            var hasTray = OperatingSystem.IsWindows() ||
                          OperatingSystem.IsLinux() && LinuxDiagnostics.AppIndicatorLibrary is not null;

            // Only one instance may run; later launches hand their URLs to it and exit.
            using var singleInstance = new SingleInstance(Constants.Name);
            if (!singleInstance.IsFirstInstance)
            {
                // Blocking here is fine: this process only forwards its args and exits.
                singleInstance.ForwardAsync(args).GetAwaiter().GetResult();
                return;
            }

#if !DEBUG
            // Kestrel binds to an OS-assigned port, so several Photino apps can run side by side
            // without racing for the default 8000. The content root is a folder we own, which keeps
            // the web root out of the executable's directory.
            using var staticServer = StaticServer.Start(Constants.DataDirectory);
            var appUrl = $"{staticServer.BaseUrl}/index.html?v={AppInfoService.BuildToken}";
#else
            const string appUrl = "http://127.0.0.1:3000";
#endif

            Log.Information("Serving React app at {AppUrl}", appUrl);

            // Touching each singleton constructs it, which is what registers its message handlers.
            var settings = SettingsService.Instance;
            _ = settings.GetAsync().GetAwaiter().GetResult(); // know the language before the tray is built

            // Show the management window unless we were launched to stay in the tray or the settings
            // say to start hidden. A link launch does not hide it by itself: the setting is the only
            // thing that decides. Without a tray there is no way back to the window, so it always
            // shows. The popup is its own window and is never affected.
            var startHidden = args.Contains("--tray") || (settings.Current?.HideOnLaunch ?? false);
            var showMainWindow = !hasTray || !startHidden;

            _ = LocalizationService.Instance;
            _ = HistoryService.Instance;
            var iconPath = AppIcon.EnsureExtracted(typeof(Program).Assembly, Constants.Name);
            _ = AppInfoService.Instance;
            _ = UpdateService.Instance;
            _ = BrowserService.Instance;
            _ = ProtocolRegistrationService.Instance;
            _ = StartupService.Instance;
            _ = InspectService.Instance;
            _ = FilterService.Instance;

            var manager = WindowManager.Instance;
            manager.AppUrl = appUrl;
            manager.ShowMainWindowOnStartup = showMainWindow;
            manager.IconPath = iconPath;

            using var tray = CreateTray(iconPath);

            manager.MainWindowCreated += [SuppressMessage("ReSharper", "AccessToDisposedClosure")]() =>
            {
                // The message loop is about to start, so windows can now be created safely.
                singleInstance.StartServer(DispatchUrls);

                if (startupUrls.Count > 0)
                    _ = Task.Run(() => Task.WhenAll(startupUrls.Select(manager.ShowPopupAsync)));
            };

            manager.CreateMainWindow();

            // Needs the window manager: a forwarded URL is opened in the inspection popup.
            _ = ForwardService.Instance;

            StartTray(tray);

            manager.Run();

            Log.Information("Exiting");
        }
        finally
        {
            Logging.Shutdown();
        }
    }

    private static void DispatchUrls(IReadOnlyList<string> args)
    {
        foreach (var url in ExtractUrls(args))
            _ = WindowManager.Instance.ShowPopupAsync(url);
    }

    /// <summary>
    ///     Starts the tray icon and records whether it exists, so closing the window only hides it when
    ///     there is really something to restore it from.
    /// </summary>
    private static void StartTray(ITrayIcon tray)
    {
        if (!OperatingSystem.IsLinux())
        {
            WindowManager.Instance.CloseToTray = tray.Start();
            return;
        }

        StartLinuxTrayWhenReady(tray);
    }

    /// <summary>
    ///     On GTK the tray can only be built on the UI thread and only once the toolkit has a display
    ///     connection, which appears when the message loop starts. libayatana-appindicator aborts the
    ///     process if it is asked any earlier, so it waits for the toolkit to report ready.
    /// </summary>
    [SupportedOSPlatform("linux")]
    private static void StartLinuxTrayWhenReady(ITrayIcon tray) =>
        _ = Task.Run(async () =>
        {
            for (var attempt = 0; attempt < 100 && !TrayIconFactory.IsToolkitReady; attempt++)
                await Task.Delay(100);

            WindowManager.Instance.RunOnMainWindow(() => { WindowManager.Instance.CloseToTray = tray.Start(); });
        });

    /// <summary>The platform's tray icon, or a no-op stand-in when there is none.</summary>
    private static ITrayIcon CreateTray(string? iconPath)
    {
        var localization = LocalizationService.Instance;
        var manager = WindowManager.Instance;

        return TrayIconFactory.Create(
            Constants.Name,
            Constants.WindowTitle,
            iconPath,
            () => manager.ShowMainWindow(),
            [
                new TrayMenuItem(localization.Get("tray.open"), () => manager.ShowMainWindow()),
                new TrayMenuItem(localization.Get("tray.settings"), () => manager.ShowMainWindow("settings")),
                new TrayMenuItem(localization.Get("tray.exit"), manager.Exit, SeparatorBefore: true)
            ]);
    }

    /// <summary>Pulls the http/https/urlcheck URLs out of a raw argument list.</summary>
    private static List<string> ExtractUrls(IEnumerable<string> args) =>
    [
        .. args.Where(arg =>
            Uri.TryCreate(arg, UriKind.Absolute, out var uri) &&
            uri.Scheme is "http" or "https" or "urlcheck")
    ];
}