namespace URLCheck.Models;

/// <summary>A URL that was intercepted (clicked) and recorded — like a browser history entry.</summary>
internal sealed class HistoryEntry
{
    public int Id { get; set; }

    public string Url { get; set; } = string.Empty;

    /// <summary>UTC timestamp; SQLite cannot order by <see cref="DateTimeOffset" />.</summary>
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
