namespace URLCheck.Models;

/// <summary>A URL that was intercepted (clicked) and recorded — like a browser history entry.</summary>
internal sealed class HistoryEntry
{
    public int Id { get; set; }

    public string Url { get; set; } = string.Empty;

    /// <summary>UTC timestamp as Unix epoch milliseconds, stored as a SQLite INTEGER.</summary>
    public long Timestamp { get; set; } = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
}
