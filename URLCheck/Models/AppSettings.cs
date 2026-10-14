using System.Diagnostics.CodeAnalysis;

namespace URLCheck.Models;

/// <summary>
///     User-configurable settings. Instances are serialized to JSON on disk and exchanged with the
///     React front-end through the native message bridge, so the property names map 1:1 to the
///     TypeScript <c>AppSettings</c> interface.
/// </summary>
[SuppressMessage("ReSharper", "PropertyCanBeMadeInitOnly.Global")]
internal sealed class AppSettings
{
    public const int TimeoutMinMs = 1_000;
    public const int TimeoutMaxMs = 15_000;

    /// <summary>Maximum milliseconds to wait for a single URL response.</summary>
    public int RequestTimeoutMs { get; set; } = 5_000;

    /// <summary>User-Agent headers offered in the settings. The first entry is the default.</summary>
    public List<UserAgentEntry> UserAgents { get; set; } = [];

    /// <summary>Browsers offered in the popup. The first entry is used as the default.</summary>
    public List<BrowserEntry> Browsers { get; set; } = [];

    public AppSettings Clone() => (AppSettings)MemberwiseClone();

    /// <summary>Clamps values into their supported ranges so invalid input can never be persisted.</summary>
    public void Normalize()
    {
        RequestTimeoutMs = Math.Clamp(RequestTimeoutMs, TimeoutMinMs, TimeoutMaxMs);

        UserAgents ??= [];

        if (UserAgents.Count == 0)
            UserAgents = DefaultUserAgents();

        foreach (var agent in UserAgents)
        {
            if (string.IsNullOrWhiteSpace(agent.Id))
                agent.Id = Guid.NewGuid().ToString("N");

            if (string.IsNullOrWhiteSpace(agent.Name))
                agent.Name = "Custom";
        }

        foreach (var browser in Browsers)
        {
            if (string.IsNullOrWhiteSpace(browser.Id))
                browser.Id = Guid.NewGuid().ToString("N");

            if (string.IsNullOrWhiteSpace(browser.Name))
                browser.Name = Path.GetFileNameWithoutExtension(browser.ExecutablePath);
        }
    }

    private static List<UserAgentEntry> DefaultUserAgents() =>
    [
        new()
        {
            Name = "Default (URLCheck)",
            Value = "URLCheck Desktop Agent/1.0"
        },
        new()
        {
            Name = "Chrome (Windows)",
            Value =
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
        },
        new()
        {
            Name = "Safari (macOS)",
            Value =
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15"
        },
        new()
        {
            Name = "cURL",
            Value = "curl/8.4.0"
        },
        new()
        {
            Name = "Googlebot",
            Value = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
        }
    ];
}