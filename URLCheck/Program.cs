using System.Diagnostics.CodeAnalysis;
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
                contentType = "text/javascript";
                return new MemoryStream([
                    .. @"
                        (() =>{
                            window.setTimeout(() => {
                                alert(`🎉 Dynamically inserted JavaScript.`);
                            }, 1000);
                        })();
                    "u8
                ]);
            })
            .RegisterWebMessageReceivedHandler((sender, message) =>
            {
                var window = (PhotinoWindow?)sender;
                var response = $"Received message: \"{message}\"";
                window?.SendWebMessage(response);
            })
            .Load(appUrl);

        window.WaitForClose();
    }
}