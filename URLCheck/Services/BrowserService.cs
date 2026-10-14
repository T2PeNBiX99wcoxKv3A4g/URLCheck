using System.Diagnostics;
using URLCheck.Messaging;
using URLCheck.Models;
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

    /// <summary>Starts <paramref name="browser" /> with <paramref name="url" />, honouring its extra arguments.</summary>
    public static void Launch(BrowserEntry browser, string url, bool privateMode = false)
    {
        if (string.IsNullOrWhiteSpace(browser.ExecutablePath))
            throw new ArgumentException("A browser executable path is required.", nameof(browser));

        var flag = privateMode ? PrivateModeFlag(browser.ExecutablePath) : null;
        var arguments = string.Join(' ',
            new[] { flag, $"\"{url}\"", browser.Arguments }.Where(part => !string.IsNullOrWhiteSpace(part)));

        Process.Start(new ProcessStartInfo
        {
            FileName = browser.ExecutablePath,
            Arguments = arguments,
            UseShellExecute = false
        });
    }

    /// <summary>The private/incognito switch for a known browser, or null when it is unknown.</summary>
    private static string? PrivateModeFlag(string executablePath)
    {
        var name = Path.GetFileName(executablePath).ToLowerInvariant();
        if (name.EndsWith(".exe", StringComparison.Ordinal))
            name = name[..^4];

        return name switch
        {
            "chrome" or "google-chrome" or "google-chrome-stable" or "chromium" or "chromium-browser"
                or "msedge" or "brave" or "brave-browser" or "vivaldi" or "thorium" => "--incognito",
            "firefox" or "waterfox" or "librewolf" => "-private-window",
            "opera" or "launcher" => "--private",
            "iexplore" => "-private",
            _ => null
        };
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
