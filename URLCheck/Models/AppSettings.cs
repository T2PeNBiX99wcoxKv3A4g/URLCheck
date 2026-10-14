using System.Diagnostics.CodeAnalysis;

namespace URLCheck.Models;

/// <summary>
/// User-configurable settings. Instances are serialized to JSON on disk and exchanged with the
/// React front-end through the native message bridge, so the property names map 1:1 to the
/// TypeScript <c>AppSettings</c> interface.
/// </summary>
[SuppressMessage("ReSharper", "PropertyCanBeMadeInitOnly.Global")]
internal sealed class AppSettings
{
    public const int TimeoutMinMs = 1_000;
    public const int TimeoutMaxMs = 15_000;
    public const int ConcurrencyMin = 1;
    public const int ConcurrencyMax = 20;

    /// <summary>Maximum milliseconds to wait for a single URL response.</summary>
    public int RequestTimeoutMs { get; set; } = 5_000;

    /// <summary>Automatically follow 301/302 redirects.</summary>
    public bool FollowRedirects { get; set; } = true;

    /// <summary>Verify SSL/TLS certificate validity for target hosts.</summary>
    public bool VerifySsl { get; set; } = true;

    /// <summary>Preset key of the outbound User-Agent header.</summary>
    public string UserAgent { get; set; } = "default";

    /// <summary>Maximum number of requests executed simultaneously.</summary>
    public int MaxConcurrency { get; set; } = 5;

    /// <summary>Browsers offered in the popup. The first entry is used as the default.</summary>
    public List<BrowserEntry> Browsers { get; set; } = new();

    public AppSettings Clone() => (AppSettings)MemberwiseClone();

    /// <summary>Clamps values into their supported ranges so invalid input can never be persisted.</summary>
    public void Normalize()
    {
        RequestTimeoutMs = Math.Clamp(RequestTimeoutMs, TimeoutMinMs, TimeoutMaxMs);
        MaxConcurrency = Math.Clamp(MaxConcurrency, ConcurrencyMin, ConcurrencyMax);

        if (string.IsNullOrWhiteSpace(UserAgent))
            UserAgent = "default";

        if (Browsers is null)
            Browsers = new List<BrowserEntry>();

        foreach (var browser in Browsers)
        {
            if (string.IsNullOrWhiteSpace(browser.Id))
                browser.Id = Guid.NewGuid().ToString("N");

            if (string.IsNullOrWhiteSpace(browser.Name))
                browser.Name = Path.GetFileNameWithoutExtension(browser.ExecutablePath);
        }
    }
}