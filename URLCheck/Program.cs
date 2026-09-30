using System.Diagnostics.CodeAnalysis;
using System.Text;
using Photino.NET;
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

        var window = new PhotinoWindow()
            .SetTitle(Constants.WindowTitle)
            .SetUseOsDefaultSize(false)
            .SetSize(new(2048, 1024))
            // Resize to a percentage of the main monitor work area
            //.Resize(50, 50, "%")
            .SetUseOsDefaultSize(false)
            .SetSize(new(800, 600))
            .Center()
            .SetResizable(true)
            .RegisterCustomSchemeHandler("app", (sender, scheme, url, out contentType) =>
            {
                Console.WriteLine($"CUSTOM SCHEME: {scheme} {url}");

                contentType = "text/javascript";

                const string script = """
                                      console.log("Photino bridge loaded!");
                                      window.__URLCHECK__ = {
                                          isPhotino: true
                                      };
                                      alert("bridge loaded");
                                      """;

                return new MemoryStream(Encoding.UTF8.GetBytes(script));
            })
            .RegisterWebMessageReceivedHandler((sender, message) =>
            {
                var window = (PhotinoWindow?)sender;
                var response = $"Received message: \"{message}\"";
                Console.WriteLine($"ReceivedHandler: {sender} {message}");
                window?.SendWebMessage(response);
            })
            .Load(appUrl);

        window.WaitForClose();
    }
}