using System.Diagnostics;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Platform;
using PhotinoNetUtils.Utils;
using URLCheck.Messaging;
using URLCheck.Models;
using URLCheck.Platform;

namespace URLCheck.Services;

/// <summary>Lists browsers through the platform locator and launches them with a URL.</summary>
internal sealed class BrowserService : Singleton<BrowserService>
{
    private readonly IBrowserLocator _locator = PlatformServices.BrowserLocator;

    public BrowserService() => NativeBridge.MessageReceived += HandleMessageAsync;

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

    /// <summary>
    ///     Opens a URL with whatever the system has registered for http/https, instead of one of the
    ///     configured browsers. When this app is the default handler the system starts it again, and
    ///     the URL comes back as a forwarded argument that opens the inspection popup.
    /// </summary>
    public static void OpenWithDefaultHandler(string url) => SystemLauncher.Open(url);

    /// <summary>Handles the <c>browsers.*</c> messages.</summary>
    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => Task.FromResult(
        context.Request.Type switch
        {
            "browsers.detect" => context.Reply("browsers.detect.result", new BrowsersPayload(_locator.Detect())),
            "browsers.openDefault" => OpenDefaultReply(context),
            _ => null
        });

    private static NativeResponse OpenDefaultReply(NativeContext context)
    {
        if (context.Payload<OpenUrlRequest>() is not { Url.Length: > 0 } request ||
            !Uri.TryCreate(request.Url, UriKind.Absolute, out var uri) ||
            uri.Scheme is not ("http" or "https"))
            return context.Fail("browsers.openDefault.result", "error.missingUrl");

        var started = Try.Run(() => OpenWithDefaultHandler(uri.AbsoluteUri));
        if (started.Exception is not { } exception)
            return context.Reply("browsers.openDefault.result", new OkPayload());

        Constants.Logger.Warning(exception, "Failed to open {Url} with the system handler", uri);
        return context.Fail("browsers.openDefault.result", "error.openFailed");
    }
}