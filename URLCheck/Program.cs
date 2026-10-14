using System.Diagnostics.CodeAnalysis;
using URLCheck.Interop;
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
        foreach (var arg in args)
            Console.WriteLine("arg: {0}", arg);

        var startupUrls = ExtractUrls(args);
        var showMainWindow = args.Any(arg => arg is "--show" or "-s");

        // Only one instance may run; later launches hand their URLs to it and exit.
        using var singleInstance = new SingleInstance();
        if (!singleInstance.IsFirstInstance)
        {
            singleInstance.TryForwardToExistingInstance(args);
            return;
        }

#if !DEBUG
        PhotinoServer
            .CreateStaticFileServer(Array.Empty<string>(), out var baseUrl)
            .RunAsync();

        var appUrl = $"{baseUrl}/index.html";
#else
        const string appUrl = "http://localhost:3000";
#endif

        Console.WriteLine($"Serving React app at {appUrl}");

        var settings = new SettingsService();
        var protocols = new ProtocolRegistrationService();
        var manager = new WindowManager(appUrl, settings, protocols)
        {
            ShowMainWindowOnStartup = showMainWindow,
        };

        using var tray = new TrayIcon(
            tooltip: Constants.WindowTitle,
            onOpen: () => manager.ShowMainWindow(),
            onSettings: () => manager.ShowMainWindow("settings"),
            onExit: manager.Exit);
        tray.Start();

        manager.MainWindowCreated += () =>
        {
            // The message loop is about to start, so windows can now be created safely.
            singleInstance.StartServer(forwarded => DispatchUrls(manager, forwarded));

            if (startupUrls.Count <= 0) return;
            var urls = startupUrls.ToList();
            Task.Run(() =>
            {
                foreach (var url in urls)
                    manager.ShowPopup(url);
            });
        };

        manager.CreateMainWindow();
        manager.Run();

        Console.WriteLine("[app] Exiting.");
    }

    private static void DispatchUrls(WindowManager manager, IReadOnlyList<string> args)
    {
        foreach (var url in ExtractUrls(args))
            manager.ShowPopup(url);
    }

    /// <summary>Pulls the http/https/urlcheck URLs out of a raw argument list.</summary>
    private static List<string> ExtractUrls(IEnumerable<string> args)
    {
        return
        [
            .. args.Where(arg => !string.IsNullOrWhiteSpace(arg) && !arg.StartsWith('-')).Where(arg =>
                arg.StartsWith("http://", StringComparison.OrdinalIgnoreCase) ||
                arg.StartsWith("https://", StringComparison.OrdinalIgnoreCase) ||
                arg.StartsWith("urlcheck://", StringComparison.OrdinalIgnoreCase))
        ];
    }
}