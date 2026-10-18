using System.Buffers.Binary;
using System.Text.Json;
using JetBrains.Annotations;

namespace URLCheck.Forward;

/// <summary>
///     The wire contract between two devices. Every frame is a 4-byte big-endian length followed by a
///     UTF-8 JSON message; the first field of each message says which kind it is.
/// </summary>
internal static class ForwardProtocol
{
    /// <summary>Fixed UDP port every device listens on for discovery.</summary>
    public const int DiscoveryPort = 45_455;

    /// <summary>Largest frame accepted; a forwarded URL is bounded well below this.</summary>
    [PublicAPI] public const int MaxFrame = 64 * 1024;

    public const string Discover = "discover";
    public const string Announce = "announce";
    public const string PairRequest = "pair.request";
    public const string PairChallenge = "pair.challenge";
    public const string PairAccept = "pair.accept";
    public const string PairReject = "pair.reject";
    public const string ForwardHello = "forward.hello";
    public const string ForwardReply = "forward.reply";
    public const string ForwardData = "forward.data";
    public const string Status = "status";

    /// <summary>How long a pairing request waits for the user to confirm it.</summary>
    public static readonly TimeSpan PairTimeout = TimeSpan.FromMinutes(2);

    /// <summary>How long a single connection may take before it is abandoned.</summary>
    public static readonly TimeSpan ConnectionTimeout = TimeSpan.FromSeconds(15);

    /// <summary>How long a forwarded URL stays valid, as a second line of defence against replay.</summary>
    public static readonly TimeSpan MaxMessageAge = TimeSpan.FromMinutes(5);

    /// <summary>Reads one length-prefixed frame, or returns <c>null</c> when it is missing or too large.</summary>
    public static async Task<byte[]?> ReadFrameAsync(Stream stream, CancellationToken token)
    {
        var header = new byte[4];
        await stream.ReadExactlyAsync(header, token);

        var length = BinaryPrimitives.ReadUInt32BigEndian(header);
        if (length is 0 or > MaxFrame)
            return null;

        var frame = new byte[(int)length];
        await stream.ReadExactlyAsync(frame, token);
        return frame;
    }

    public static async Task WriteFrameAsync(Stream stream, byte[] frame, CancellationToken token)
    {
        var header = new byte[4];
        BinaryPrimitives.WriteUInt32BigEndian(header, (uint)frame.Length);

        await stream.WriteAsync(header, token);
        await stream.WriteAsync(frame, token);
        await stream.FlushAsync(token);
    }

    /// <summary>Reads the <c>type</c> discriminator from a frame without committing to a message shape.</summary>
    public static string? ReadType(byte[] frame)
    {
        try
        {
            using var document = JsonDocument.Parse(frame);

            // Case-insensitive: the writer uses camelCase, but a hand-written frame need not.
            foreach (var property in document.RootElement.EnumerateObject())
                if (string.Equals(property.Name, "type", StringComparison.OrdinalIgnoreCase))
                    return property.Value.GetString();

            return null;
        }
        catch (JsonException)
        {
            return null;
        }
    }
}

/* --------------------------------------------------------------- wire messages */

/// <summary>A discovery query broadcast by a device that is searching.</summary>
internal sealed record DiscoverMessage(string Type);

/// <summary>A device's reply to a query, and the identity a peer pins when it pairs.</summary>
internal sealed record AnnounceMessage(string Type, string DeviceId, string DeviceName, int Port, string PublicKey);

/// <summary>Opens a pairing: the initiator's identity and proof that it owns its key.</summary>
internal sealed record PairRequestMessage(
    string Type,
    string DeviceId,
    string DeviceName,
    int Port,
    string PublicKey,
    string Nonce,
    string Signature);

/// <summary>Sent back before the user decides, so both sides can show the same verification code.</summary>
internal sealed record PairChallengeMessage(string Type, string DeviceId, string DeviceName, int Port, string PublicKey);

/// <summary>The target agreed to pair; the signature binds it to the whole transcript.</summary>
internal sealed record PairAcceptMessage(string Type, string Signature);

internal sealed record PairRejectMessage(string Type, string Reason);

/// <summary>Opens a forwarding connection: the sender's identity plus an ephemeral X25519 key.</summary>
internal sealed record ForwardHelloMessage(
    string Type,
    string DeviceId,
    string EphemeralKey,
    string Nonce,
    string Signature);

/// <summary>The receiver's ephemeral key and signature over the whole handshake.</summary>
internal sealed record ForwardReplyMessage(string Type, string EphemeralKey, string Nonce, string Signature);

/// <summary>The forwarded URL, encrypted with the session key the handshake produced.</summary>
internal sealed record ForwardDataMessage(string Type, string Nonce, string Ciphertext);

/// <summary>A plain acknowledgement; failures carry a translation key.</summary>
internal sealed record StatusMessage(string Type, bool Ok, string? Error);

/// <summary>The encrypted body of a forwarded URL.</summary>
internal sealed record ForwardPayload(string Url, long SentAt);