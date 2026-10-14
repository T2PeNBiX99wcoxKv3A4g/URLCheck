using System.Diagnostics;
using URLCheck.Messaging;
using URLCheck.Platform;

namespace URLCheck.Services;

/// <summary>Lists browsers through the platform locator and launches them with a URL.</summary>
internal sealed class BrowserService
{
    private readonly IBrowserLocator _locator;

    public BrowserService(IBrowserLocator locator)
    {
        _locator = locator;
        NativeBridge.MessageReceived += HandleMessageAsync;
    }

    /// <summary>Starts <paramref name="executablePath" /> with <paramref name="url" /> as its argument.</summary>
    public static void Launch(string executablePath, string url)
    {
        if (string.IsNullOrWhiteSpace(executablePath))
            throw new ArgumentException("A browser executable path is required.", nameof(executablePath));

        Process.Start(new ProcessStartInfo
        {
            FileName = executablePath,
            Arguments = $"\"{url}\"",
            UseShellExecute = false
        });
    }

    /// <summary>Handles the <c>browsers.*</c> messages.</summary>
    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) =>
        context.Request.Type == "browsers.detect"
            ? Task.FromResult<NativeResponse?>(context.Reply("browsers.detect.result", new
            {
                Browsers = _locator.Detect()
            }))
            : Task.FromResult<NativeResponse?>(null);
}
