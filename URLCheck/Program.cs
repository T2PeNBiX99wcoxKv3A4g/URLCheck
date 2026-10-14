using System.Diagnostics.CodeAnalysis;
using Photino.NET;
using URLCheck.Messaging;
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
#if !DEBUG
        PhotinoServer
            .CreateStaticFileServer(args, out var baseUrl)
            .RunAsync();

        var appUrl = $"{baseUrl}/index.html";
#else
        const string appUrl = "http://localhost:3000";
#endif

        Console.WriteLine($"Serving React app at {appUrl}");

        // The bridge owns the settings and translates JSON messages to/from the React front-end.
        var bridge = new NativeBridge(new());

        var window = new PhotinoWindow()
            .SetTitle(Constants.WindowTitle)
            .SetUseOsDefaultSize(false)
            .SetSize(new(800, 600))
            .Center()
            .SetResizable(true)
            .RegisterWebMessageReceivedHandler((sender, message) =>
                bridge.HandleMessage(sender as PhotinoWindow, message))
            .Load(appUrl);

        window.WaitForClose();
    }
}