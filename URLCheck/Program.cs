using System.Diagnostics.CodeAnalysis;
using Serilog;
using URLCheck.Interop;
using URLCheck.Messaging;
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
    private static async Task Main(string[] args)
    {
        Logging.Initialize();

        try
        {
            foreach (var arg in args)
                Log.Information("arg: {Arg}", arg);

            var startupUrls = ExtractUrls(args);

            // Show the management window unless we were launched to handle a link, or asked to stay in the tray.
            var showMainWindow = !args.Contains("--tray") && startupUrls.Count == 0;

            // Only one instance may run; later launches hand their URLs to it and exit.
            using var singleInstance = new SingleInstance();
            if (!singleInstance.IsFirstInstance)
            {
                await SingleInstance.ForwardAsync(args);
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

            var bridge = new NativeBridge();
            var settings = new SettingsService();
            var protocols = new ProtocolRegistrationService();
            var manager = new WindowManager(appUrl, bridge, settings)
            {
                ShowMainWindowOnStartup = showMainWindow,
            };

            // Each service handles the message types it owns.
            bridge.MessageReceived += settings.HandleMessageAsync;
            bridge.MessageReceived += manager.HandleMessageAsync;
            bridge.MessageReceived += protocols.HandleMessageAsync;

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

                if (startupUrls.Count > 0)
                    _ = Task.Run(() => startupUrls.ForEach(manager.ShowPopup));
            };

            manager.CreateMainWindow();
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

    /// <summary>Pulls the http/https/urlcheck URLs out of a raw argument list.</summary>
    private static List<string> ExtractUrls(IEnumerable<string> args) =>
    [
        .. args.Where(arg =>
            Uri.TryCreate(arg, UriKind.Absolute, out var uri) &&
            uri.Scheme is "http" or "https" or "urlcheck")
    ];
}