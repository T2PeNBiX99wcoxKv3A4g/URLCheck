using System.Diagnostics.CodeAnalysis;
using System.Runtime.Versioning;
using Serilog;
using URLCheck.Filters;
using URLCheck.Inspect;
using URLCheck.Interop;
using URLCheck.Platform;
using URLCheck.Services;
#if !DEBUG
using Photino.NET.Server;
#endif

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
        Logging.Initialize();

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
                          (OperatingSystem.IsLinux() && LinuxDiagnostics.AppIndicatorLibrary is not null);

            // Only one instance may run; later launches hand their URLs to it and exit.
            using var singleInstance = new SingleInstance();
            if (!singleInstance.IsFirstInstance)
            {
                // Blocking here is fine: this process only forwards its args and exits.
                SingleInstance.ForwardAsync(args).GetAwaiter().GetResult();
                return;
            }

#if !DEBUG
            // The static server insists on a web root and creates it when missing, which would drop an
            // empty wwwroot next to the executable on every start. Giving the host a content root we own
            // keeps that out of the way — the front-end is served from the embedded manifest either way.
            _ = PhotinoServer
                .CreateStaticFileServer(["--contentRoot", DataDirectory], out var baseUrl)
                .RunAsync();

            // The version query is what keeps an upgrade from showing the previous interface: the
            // served page is always at the same address, so without it the web view would keep
            // returning its cached copy — along with the old asset names inside it.
            var appUrl = $"{baseUrl}/index.html?v={BuildToken()}";
#else
            const string appUrl = "http://127.0.0.1:3000";
#endif

            Log.Information("Serving React app at {AppUrl}", appUrl);

            var (browserLocator, windowPlatform, protocolRegistrar) = CreatePlatformServices();

            var settings = new SettingsService(browserLocator);
            _ = settings.GetAsync().GetAwaiter().GetResult(); // know the language before the tray is built

            // Show the management window unless we were launched to stay in the tray or the settings
            // say to start hidden. A link launch does not hide it by itself: the setting is the only
            // thing that decides. Without a tray there is no way back to the window, so it always
            // shows. The popup is its own window and is never affected.
            var startHidden = args.Contains("--tray") || (settings.Current?.HideOnLaunch ?? false);
            var showMainWindow = !hasTray || !startHidden;

            var localization = new LocalizationService(settings);
            var history = new HistoryService();
            var iconPath = AppIcon.EnsureExtracted();
            _ = new AppInfoService();
            _ = new BrowserService(browserLocator);
            _ = new ProtocolRegistrationService(protocolRegistrar);
            _ = new StartupService();
            _ = new InspectService(settings);
            _ = new FilterService();
            var manager = new WindowManager(appUrl, windowPlatform, settings, history, CreateClipboardWatcher())
            {
                ShowMainWindowOnStartup = showMainWindow,
                IconPath = iconPath
            };

            using var tray = CreateTray(localization, manager, iconPath);

            manager.MainWindowCreated += [SuppressMessage("ReSharper", "AccessToDisposedClosure")]() =>
            {
                // The message loop is about to start, so windows can now be created safely.
                singleInstance.StartServer(forwarded => DispatchUrls(manager, forwarded));

                if (startupUrls.Count > 0)
                    _ = Task.Run(() => startupUrls.ForEach(manager.ShowPopup));
            };

            manager.CreateMainWindow();
            StartTray(tray, manager);

            manager.Run();

            Log.Information("Exiting");
        }
        finally
        {
            Logging.Shutdown();
        }
    }

    /// <summary>
    ///     A token that changes whenever this build does. The interface is always served from the same
    ///     address, so without it the web view keeps showing its cached copy after an upgrade — and
    ///     the old asset names that copy refers to.
    /// </summary>
    private static string BuildToken()
    {
        var executable = Environment.ProcessPath;
        return string.IsNullOrEmpty(executable)
            ? Constants.Name
            : File.GetLastWriteTimeUtc(executable).Ticks.ToString();
    }

    private static void DispatchUrls(WindowManager manager, IReadOnlyList<string> args)
    {
        foreach (var url in ExtractUrls(args))
            manager.ShowPopup(url);
    }

    /// <summary>Creates the platform-specific services for the OS we are running on.</summary>
    private static (IBrowserLocator Browsers, IWindowPlatform Window, IProtocolRegistrar Protocols)
        CreatePlatformServices()
    {
        if (OperatingSystem.IsWindows())
            return (new WindowsBrowserLocator(), new WindowsWindowPlatform(), new WindowsProtocolRegistrar());

        if (OperatingSystem.IsLinux())
            return (new LinuxBrowserLocator(), new LinuxWindowPlatform(), new LinuxProtocolRegistrar());

        throw new PlatformNotSupportedException("URLCheck supports Windows and Linux.");
    }

    /// <summary>Creates the clipboard watcher for the OS we are running on.</summary>
    private static IClipboardWatcher CreateClipboardWatcher()
    {
        if (OperatingSystem.IsWindows())
            return new WindowsClipboardWatcher();

        if (OperatingSystem.IsLinux())
            return new LinuxClipboardWatcher();

        throw new PlatformNotSupportedException("URLCheck supports Windows and Linux.");
    }

    /// <summary>
    ///     Starts the tray icon and records whether it exists, so closing the window only hides it when
    ///     there is really something to restore it from.
    /// </summary>
    private static void StartTray(ITrayIcon tray, WindowManager manager)
    {
        if (!OperatingSystem.IsLinux())
        {
            manager.CloseToTray = tray.Start();
            return;
        }

        StartLinuxTrayWhenReady(tray, manager);
    }

    /// <summary>
    ///     On GTK the tray can only be built on the UI thread and only once the toolkit has a display
    ///     connection, which appears when the message loop starts. libayatana-appindicator aborts the
    ///     process if it is asked any earlier, so it waits for the toolkit to report ready.
    /// </summary>
    [SupportedOSPlatform("linux")]
    private static void StartLinuxTrayWhenReady(ITrayIcon tray, WindowManager manager) =>
        _ = Task.Run(async () =>
        {
            for (var attempt = 0; attempt < 100 && !LinuxTrayIcon.IsToolkitReady; attempt++)
                await Task.Delay(100);

            manager.RunOnMainWindow(() => { manager.CloseToTray = tray.Start(); });
        });

    /// <summary>The tray icon, or a no-op stand-in on platforms that have none.</summary>
    private static ITrayIcon CreateTray(LocalizationService localization, WindowManager manager, string? iconPath)
    {
        if (OperatingSystem.IsWindows())
            return new TrayIcon(
                Constants.WindowTitle,
                iconPath,
                localization.Get,
                () => manager.ShowMainWindow(),
                () => manager.ShowMainWindow("settings"),
                manager.Exit);

        if (OperatingSystem.IsLinux() && LinuxDiagnostics.AppIndicatorLibrary is not null)
            return new LinuxTrayIcon(
                Constants.WindowTitle,
                iconPath,
                localization.Get,
                () => manager.ShowMainWindow(),
                () => manager.ShowMainWindow("settings"),
                manager.Exit);

        return new NullTrayIcon();
    }

    /// <summary>
    ///     A directory we own, used as the host's content root. The static server creates a <c>wwwroot</c>
    ///     web root under it when missing, which without this would land next to the executable.
    /// </summary>
    private static string DataDirectory
    {
        get
        {
            var path = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), Constants.Name);
            Directory.CreateDirectory(path);
            return path;
        }
    }

    /// <summary>Pulls the http/https/urlcheck URLs out of a raw argument list.</summary>
    private static List<string> ExtractUrls(IEnumerable<string> args) =>    [
        .. args.Where(arg =>
            Uri.TryCreate(arg, UriKind.Absolute, out var uri) &&
            uri.Scheme is "http" or "https" or "urlcheck")
    ];
}