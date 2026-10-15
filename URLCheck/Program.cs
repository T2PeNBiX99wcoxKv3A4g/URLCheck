using System.Diagnostics.CodeAnalysis;
using Serilog;
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
            LinuxDiagnostics.Write();

        try
        {
            foreach (var arg in args)
                Log.Information("arg: {Arg}", arg);

            var startupUrls = ExtractUrls(args);

            // Without a tray the window is the only way back into the app, so always show it there.
            var hasTray = OperatingSystem.IsWindows() ||
                          (OperatingSystem.IsLinux() && LinuxDiagnostics.AppIndicatorLibrary is not null);

            // Show the management window unless we were launched to handle a link, or asked to stay in the tray.
            var showMainWindow = !hasTray || (!args.Contains("--tray") && startupUrls.Count == 0);

            // Only one instance may run; later launches hand their URLs to it and exit.
            using var singleInstance = new SingleInstance();
            if (!singleInstance.IsFirstInstance)
            {
                // Blocking here is fine: this process only forwards its args and exits.
                SingleInstance.ForwardAsync(args).GetAwaiter().GetResult();
                return;
            }

#if !DEBUG
            _ = PhotinoServer
                .CreateStaticFileServer([], out var baseUrl)
                .RunAsync();

            var appUrl = $"{baseUrl}/index.html";
#else
            const string appUrl = "http://127.0.0.1:3000";
#endif

            Log.Information("Serving React app at {AppUrl}", appUrl);

            var (browserLocator, windowPlatform, protocolRegistrar) = CreatePlatformServices();

            var settings = new SettingsService(browserLocator);
            _ = settings.GetAsync().GetAwaiter().GetResult(); // know the language before the tray is built

            var localization = new LocalizationService(settings);
            var history = new HistoryService();
            var iconPath = AppIcon.EnsureExtracted();
            _ = new AppInfoService();
            _ = new BrowserService(browserLocator);
            _ = new ProtocolRegistrationService(protocolRegistrar);
            _ = new InspectService(settings);
            var manager = new WindowManager(appUrl, windowPlatform, settings, history)
            {
                ShowMainWindowOnStartup = showMainWindow,
                CloseToTray = hasTray,
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

            // The GTK tray has to be built on the GTK thread, so a window must exist first.
            tray.Start();

            manager.Run();

            Log.Information("Exiting");
        }
        finally
        {
            Logging.Shutdown();
        }
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

    /// <summary>Pulls the http/https/urlcheck URLs out of a raw argument list.</summary>
    private static List<string> ExtractUrls(IEnumerable<string> args) =>
    [
        .. args.Where(arg =>
            Uri.TryCreate(arg, UriKind.Absolute, out var uri) &&
            uri.Scheme is "http" or "https" or "urlcheck")
    ];
}