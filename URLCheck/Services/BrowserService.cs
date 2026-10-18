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
            new[]
            {
                flag, $"\"{url}\"", browser.Arguments
            }.Where(part => !string.IsNullOrWhiteSpace(part)));

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

        // Match by family so variants like firefox-nightly or google-chrome-beta are covered too.
        if (Starts(name, "chrome", "chromium", "brave", "vivaldi", "thorium", "google-chrome")
            || name == "msedge")
            return "--incognito";

        if (Starts(name, "firefox", "waterfox", "librewolf"))
            return "-private-window";

        if (Starts(name, "opera") || name == "launcher")
            return "--private";

        return Starts(name, "iexplore") ? "-private" : null;
    }

    private static bool Starts(string name, params string[] prefixes) =>
        prefixes.Any(prefix => name.StartsWith(prefix, StringComparison.Ordinal));

    /// <summary>Handles the <c>browsers.*</c> messages.</summary>
    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) =>
        context.Request.Type == "browsers.detect"
            ? Task.FromResult<NativeResponse?>(context.Reply("browsers.detect.result",
                new BrowsersPayload(_locator.Detect())))
            : Task.FromResult<NativeResponse?>(null);
}