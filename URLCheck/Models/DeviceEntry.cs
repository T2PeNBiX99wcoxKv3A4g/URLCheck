namespace URLCheck.Models;

/// <summary>
///     A peer device that URLs can be forwarded to. It is located by host and port; the shared pairing
///     code authenticates the two ends to each other.
/// </summary>
internal sealed class DeviceEntry
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");

    public string Name { get; set; } = string.Empty;

    /// <summary>Host name or IP address of the peer on the local network.</summary>
    public string Host { get; set; } = string.Empty;

    /// <summary>Port the peer's forwarding listener is bound to.</summary>
    public int Port { get; set; } = AppSettings.DefaultForwardPort;
}
