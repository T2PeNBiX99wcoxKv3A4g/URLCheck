using URLCheck.Models;

namespace URLCheck.Platform;

/// <summary>Enumerates the browsers installed on the current platform.</summary>
internal interface IBrowserLocator
{
    IReadOnlyList<BrowserEntry> Detect();
}