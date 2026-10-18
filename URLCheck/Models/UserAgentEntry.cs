namespace URLCheck.Models;

/// <summary>
///     A named User-Agent header the user can pick from. The first entry in
///     <see cref="AppSettings.UserAgents" /> is used for outbound requests.
/// </summary>
internal sealed class UserAgentEntry
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");

    public string Name { get; set; } = string.Empty;

    public string Value { get; set; } = string.Empty;
}