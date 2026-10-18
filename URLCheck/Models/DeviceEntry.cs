namespace URLCheck.Models;

/// <summary>
///     A device that has been paired with this one. The public key is pinned when the pairing is
///     confirmed, and every handshake from then on is verified against it.
/// </summary>
internal sealed class DeviceEntry
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");

    public string Name { get; set; } = string.Empty;

    /// <summary>Host name or IP address of the peer on the local network.</summary>
    public string Host { get; set; } = string.Empty;

    /// <summary>Port the peer's listener is bound to.</summary>
    public int Port { get; set; } = AppSettings.DefaultForwardPort;

    /// <summary>The peer's Ed25519 public key, base64. Empty until the device has been paired.</summary>
    public string PublicKey { get; set; } = string.Empty;

    /// <summary>
    ///     Extra addresses (host names or IPs) to try when the primary <see cref="Host" /> cannot be
    ///     reached — e.g. a private <c>.lan</c> name that survives an address change. All share
    ///     <see cref="Port" />. The primary address is never listed here.
    /// </summary>
    public List<string> Addresses { get; set; } = [];

    /// <summary>The primary <see cref="Host" /> followed by every extra <see cref="Addresses" /> entry.</summary>
    public IEnumerable<string> AllAddresses()
    {
        if (!string.IsNullOrWhiteSpace(Host))
            yield return Host.Trim();

        foreach (var address in Addresses)
            if (!string.IsNullOrWhiteSpace(address))
                yield return address.Trim();
    }
}