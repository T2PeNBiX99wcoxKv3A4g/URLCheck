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

    /// <summary>Number of parameter-removal rules parsed from the last download.</summary>
    public int RuleCount { get; set; }

    /// <summary>Lower-case SHA-256 of the downloaded file, so identical content is never re-stored.</summary>
    public string Hash { get; set; } = "";

    /// <summary>ETag of the last download, sent back as <c>If-None-Match</c> to skip the body.</summary>
    public string? ETag { get; set; }

    /// <summary>Last-Modified of the last download, sent back as <c>If-Modified-Since</c>.</summary>
    public string? LastModified { get; set; }

    /// <summary>Last download/parse error, cleared by a successful update.</summary>
    public string? Error { get; set; }
}
