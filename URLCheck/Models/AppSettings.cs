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
    public const string DefaultLanguage = "en";

    /// <summary>Maximum milliseconds to wait for a single URL response.</summary>
    public int RequestTimeoutMs { get; set; } = 5_000;

    /// <summary>User-Agent headers offered in the settings. The first entry is the default.</summary>
    public List<UserAgentEntry> UserAgents { get; set; } = [];

    /// <summary>UI language, e.g. <c>en</c>, <c>zh-TW</c>.</summary>
    public string Language { get; set; } = DefaultLanguage;

    /// <summary>Browsers offered in the popup. The first entry is used as the default.</summary>
    public List<BrowserEntry> Browsers { get; set; } = [];

    /// <summary>
    ///     Show the inspection popup without window decorations, with the UI drawing its own rounded
    ///     frame. On Linux the window is also made transparent so those corners are not filled in; when
    ///     this is off the window keeps its normal frame and the UI draws no border of its own.
    /// </summary>
    public bool BorderlessPopup { get; set; } = true;

    public AppSettings Clone() => (AppSettings)MemberwiseClone();

    /// <summary>Clamps values into their supported ranges so invalid input can never be persisted.</summary>
    public void Normalize()
    {
        RequestTimeoutMs = Math.Clamp(RequestTimeoutMs, TimeoutMinMs, TimeoutMaxMs);

        if (string.IsNullOrWhiteSpace(Language))
            Language = DefaultLanguage;

        if (UserAgents.Count == 0)
            UserAgents = DefaultUserAgents();

        foreach (var agent in UserAgents)
        {
            if (string.IsNullOrWhiteSpace(agent.Id))
                agent.Id = Guid.NewGuid().ToString("N");

            if (string.IsNullOrWhiteSpace(agent.Name))
                agent.Name = "Custom";
        }

        // Most-used browser first, so the popup's main button follows your habits.
        Browsers = [.. Browsers.OrderByDescending(browser => browser.UseCount)];

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
            Name = "Firefox (Windows)",
            Value = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0"
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