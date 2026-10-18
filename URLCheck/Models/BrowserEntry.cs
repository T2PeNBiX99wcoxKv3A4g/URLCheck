namespace URLCheck.Models;

/// <summary>
///     A browser the user can open inspected URLs with. The first entry in
///     <see cref="AppSettings.Browsers" /> acts as the default.
/// </summary>
internal sealed class BrowserEntry
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");

    public string Name { get; set; } = string.Empty;

    public string ExecutablePath { get; set; } = string.Empty;

    /// <summary>Extra command-line arguments appended after the URL when launching this browser.</summary>
    public string Arguments { get; set; } = string.Empty;

    /// <summary>How often this browser was opened with; the most-used one becomes the default.</summary>
    public int UseCount { get; set; }
}