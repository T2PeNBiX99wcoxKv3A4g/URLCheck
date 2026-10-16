namespace URLCheck.Models;

/// <summary>
///     One filter list the user installed from the settings. The built-in rules are not represented
///     here: they live in the embedded <c>Resources/filters/builtin.txt</c> and are always active.
/// </summary>
internal sealed class FilterListEntry
{
    public string Id { get; set; } = "";

    public string Name { get; set; } = "";

    /// <summary>Direct download URL of the rule file.</summary>
    public string Url { get; set; } = "";

    public bool Enabled { get; set; } = true;

    /// <summary>Unix epoch milliseconds of the last successful download, or 0 when never fetched.</summary>
    public long LastUpdated { get; set; }

    /// <summary>Number of <c>$removeparam</c> rules parsed from the last download.</summary>
    public int RuleCount { get; set; }

    /// <summary>Last download/parse error, cleared by a successful update.</summary>
    public string? Error { get; set; }
}
