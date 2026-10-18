using System.Buffers.Binary;
using System.Net.Sockets;
using System.Text.Json;
using URLCheck.Messaging;
using URLCheck.Models;

namespace URLCheck.Forward;

/// <summary>
///     Raised when the peer refused the URL. The message is a translation key, so the popup can show
///     the exact reason instead of a generic failure.
/// </summary>
internal sealed class ForwardException(string message) : Exception(message);

/// <summary>Sends one encrypted URL to a peer device over a short-lived TCP connection.</summary>
internal static class ForwardClient
{
    public static async Task SendAsync(DeviceEntry device, AppSettings settings, string url, CancellationToken token)
    {
        var envelope = new ForwardEnvelope(1, settings.DeviceId, settings.DeviceName, url,
            DateTimeOffset.UtcNow.ToUnixTimeMilliseconds());

        var plaintext = JsonSerializer.SerializeToUtf8Bytes(envelope, AppJsonContext.Default.ForwardEnvelope);
        var frame = ForwardCrypto.Encrypt(ForwardCrypto.DeriveKey(settings.PairingCode), plaintext);

        using var client = new TcpClient();
        client.NoDelay = true;
        await client.ConnectAsync(device.Host, device.Port, token);

        var stream = client.GetStream();

        var header = new byte[4];
        BinaryPrimitives.WriteUInt32BigEndian(header, (uint)frame.Length);
        await stream.WriteAsync(header, token);
        await stream.WriteAsync(frame, token);
        await stream.FlushAsync(token);

        var status = new byte[1];
        await stream.ReadExactlyAsync(status, token);

        if (status[0] != (byte)ForwardStatus.Accepted)
            throw new ForwardException(status[0] switch
            {
                (byte)ForwardStatus.Unauthorized => "error.forwardRejected",
                (byte)ForwardStatus.Stale => "error.forwardStale",
                _ => "error.forwardFailed"
            });
    }
}
