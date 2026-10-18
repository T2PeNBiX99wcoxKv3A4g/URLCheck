namespace URLCheck.Forward;

/// <summary>
///     The JSON body a forwarded URL travels in. It is serialized, then encrypted as a whole, so the
///     URL and the sender never appear in clear text on the wire.
/// </summary>
internal sealed record ForwardEnvelope(int Version, string DeviceId, string DeviceName, string Url, long SentAt);

/// <summary>Single-byte answer the receiver sends back once it has looked at the frame.</summary>
internal enum ForwardStatus : byte
{
    /// <summary>The URL was accepted and is opening in the popup.</summary>
    Accepted = 0,

    /// <summary>The frame did not decrypt, which almost always means the pairing codes differ.</summary>
    Unauthorized = 1,

    /// <summary>The frame was not a valid envelope, or carried no http(s) URL.</summary>
    Malformed = 2,

    /// <summary>The envelope was outside the accepted time window, so a replay is refused.</summary>
    Stale = 3
}
