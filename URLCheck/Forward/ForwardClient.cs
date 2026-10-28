using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization.Metadata;
using PhotinoNetUtils.Extensions;
using URLCheck.Messaging;
using URLCheck.Models;
using PhotinoNetUtils.Utils;

namespace URLCheck.Forward;

/// <summary>
///     Raised when the peer refused or could not complete a request. The message is a translation key,
///     so the popup can show the exact reason instead of a generic failure.
/// </summary>
internal sealed class ForwardException(string message) : Exception(message);

/// <summary>The initiating half of the protocol: pairing with a device and forwarding a URL to it.</summary>
internal static class ForwardClient
{
    /// <summary>
    ///     Pairs with the device listening at <paramref name="host" />:<paramref name="port" />. The
    ///     callback runs as soon as the peer introduces itself, so the user can compare the code while
    ///     the other side is still deciding.
    /// </summary>
    public static async Task<DeviceEntry> PairAsync(string host, int port, AppSettings settings, DeviceIdentity identity,
        Func<string, DeviceEntry, Task> onChallenge, CancellationToken token)
    {
        using var client = new TcpClient();
        client.NoDelay = true;
        await client.ConnectAsync(host, port, token);
        var stream = client.GetStream();

        var nonce = ForwardCrypto.RandomBytes(ForwardCrypto.HandshakeNonceSize);
        var requestSignature = ForwardCrypto.Sign(identity.PrivateKey, ForwardCrypto.Transcript(
            "URLCheck.Pair.Request.v1", identity.PublicKey, Utf8(settings.DeviceId), nonce));

        await WriteAsync(stream, new PairRequestMessage(ForwardProtocol.PairRequest, settings.DeviceId,
            settings.DeviceName, settings.ForwardPort, identity.PublicKeyBase64,
            ForwardCrypto.ToBase64(nonce), ForwardCrypto.ToBase64(requestSignature)), token);

        var reply = await ReadAsync(stream, token) ?? throw new ForwardException("error.forwardFailed");

        if (reply is StatusMessage { Ok: false } status)
            throw new ForwardException(status.Error ?? "error.forwardFailed");

        if (reply is not PairChallengeMessage challenge)
            throw new ForwardException("error.forwardFailed");

        var peerPublicKey = ForwardCrypto.FromBase64(challenge.PublicKey);
        if (peerPublicKey is not { Length: 32 })
            throw new ForwardException("error.forwardFailed");

        // Both devices hash the same transcript, so a matching code means nobody sits in the middle.
        var transcript = ForwardCrypto.Transcript("URLCheck.Pair.v1",
            identity.PublicKey, Utf8(settings.DeviceId), peerPublicKey, Utf8(challenge.DeviceId), nonce);

        var peer = new DeviceEntry
        {
            Id = challenge.DeviceId,
            Name = challenge.DeviceName,
            Host = host,
            Port = challenge.Port,
            PublicKey = challenge.PublicKey
        };

        await onChallenge(ForwardCrypto.PairingCode(transcript), peer);

        var decision = await ReadAsync(stream, token) ?? throw new ForwardException("error.forwardFailed");
        switch (decision)
        {
            case PairRejectMessage:
                throw new ForwardException("error.forwardPairRejected");
            case StatusMessage { Ok: false } failure:
                throw new ForwardException(failure.Error ?? "error.forwardFailed");
            case PairAcceptMessage accept:
            {
                var signature = ForwardCrypto.FromBase64(accept.Signature);
                var expected = ForwardCrypto.Transcript("URLCheck.Pair.Accept.v1", transcript);
                if (signature is null || !ForwardCrypto.Verify(peerPublicKey, expected, signature))
                    throw new ForwardException("error.forwardPairRejected");

                return peer;
            }
            default:
                throw new ForwardException("error.forwardFailed");
        }
    }

    /// <summary>
    ///     Forwards one URL to a paired device over a fresh, authenticated session. Every address the
    ///     device has is tried in turn, so a stale primary address does not stop a name that still
    ///     resolves from working.
    /// </summary>
    public static async Task SendAsync(DeviceEntry device, AppSettings settings, DeviceIdentity identity, string url,
        CancellationToken token)
    {
        var peerPublicKey = ForwardCrypto.FromBase64(device.PublicKey);
        if (peerPublicKey is not { Length: 32 })
            throw new ForwardException("error.forwardUnpaired");

        ForwardException? failure = null;

        foreach (var address in device.AllAddresses().Distinct(StringComparer.OrdinalIgnoreCase))
        {
            // Each address gets its own budget, so an unreachable one is left behind instead of using
            // up the whole request before the fallback addresses are even tried.
            using var attempt = CancellationTokenSource.CreateLinkedTokenSource(token);
            attempt.CancelAfter(ForwardProtocol.AttemptTimeout);

            try
            {
                await SendAttemptAsync(address, device, peerPublicKey, settings, identity, url, attempt.Token);
                return;
            }
            catch (OperationCanceledException) when (token.IsCancellationRequested)
            {
                throw;
            }
            catch (ForwardException ex)
            {
                // A stale address can now belong to another device, which answers with the wrong
                // identity; keep the first answer and still try the remaining addresses.
                failure ??= ex;
            }
            catch (Exception)
            {
                // DNS, connection or handshake failure: fall through to the next address.
            }
        }

        throw failure ?? new ForwardException("error.forwardFailed");
    }

    /// <summary>
    ///     Checks whether a paired device answers right now. The reply has to name the paired device and
    ///     carry its pinned key, so an address that now belongs to something else counts as offline
    ///     rather than being mistaken for the device. Every address is tried, like a real send.
    /// </summary>
    public static async Task<bool> IsAliveAsync(DeviceEntry device, CancellationToken token)
    {
        foreach (var address in device.AllAddresses().Distinct(StringComparer.OrdinalIgnoreCase))
        {
            using var attempt = CancellationTokenSource.CreateLinkedTokenSource(token);
            attempt.CancelAfter(ForwardProtocol.ProbeTimeout);

            var alive = (await Try.Run(async () =>
            {
                using var client = new TcpClient();
                client.NoDelay = true;
                await client.ConnectAsync(address, device.Port, attempt.Token);

                var stream = client.GetStream();
                var query = JsonSerializer.SerializeToUtf8Bytes(new(ForwardProtocol.Discover),
                    AppJsonContext.Default.DiscoverMessage);
                await ForwardProtocol.WriteFrameAsync(stream, query, attempt.Token);

                var reply = await ForwardProtocol.ReadFrameAsync(stream, attempt.Token);
                if (reply is null || ForwardProtocol.ReadType(reply) != ForwardProtocol.Announce)
                    return false;

                var announce = JsonSerializer.Deserialize(reply, AppJsonContext.Default.AnnounceMessage);
                return announce is not null && announce.DeviceId == device.Id && announce.PublicKey == device.PublicKey;
            })).GetOrElse(_ => false);

            if (alive)
                return true;
        }

        return false;
    }

    private static async Task SendAttemptAsync(string host, DeviceEntry device, byte[] peerPublicKey,
        AppSettings settings, DeviceIdentity identity, string url, CancellationToken token)
    {
        using var client = new TcpClient();
        client.NoDelay = true;
        await client.ConnectAsync(host, device.Port, token);
        var stream = client.GetStream();

        var (ephemeralPrivate, ephemeralPublic) = ForwardCrypto.GenerateEphemeralKeyPair();
        var nonce = ForwardCrypto.RandomBytes(ForwardCrypto.HandshakeNonceSize);

        var helloSignature = ForwardCrypto.Sign(identity.PrivateKey, ForwardCrypto.Transcript(
            "URLCheck.Forward.Hello.v1", identity.PublicKey, Utf8(settings.DeviceId), peerPublicKey,
            Utf8(device.Id), ephemeralPublic, nonce));

        await WriteAsync(stream, new ForwardHelloMessage(ForwardProtocol.ForwardHello, settings.DeviceId,
            ForwardCrypto.ToBase64(ephemeralPublic), ForwardCrypto.ToBase64(nonce),
            ForwardCrypto.ToBase64(helloSignature)), token);

        var reply = await ReadAsync(stream, token) ?? throw new ForwardException("error.forwardFailed");
        if (reply is StatusMessage { Ok: false } failure)
            throw new ForwardException(failure.Error ?? "error.forwardFailed");
        if (reply is not ForwardReplyMessage handshake)
            throw new ForwardException("error.forwardFailed");

        var peerEphemeral = ForwardCrypto.FromBase64(handshake.EphemeralKey);
        var peerNonce = ForwardCrypto.FromBase64(handshake.Nonce);
        var peerSignature = ForwardCrypto.FromBase64(handshake.Signature);
        if (peerEphemeral is not { Length: 32 } || peerNonce is not { Length: ForwardCrypto.HandshakeNonceSize } ||
            peerSignature is null)
            throw new ForwardException("error.forwardFailed");

        var expected = ForwardCrypto.Transcript("URLCheck.Forward.Reply.v1", peerPublicKey, Utf8(device.Id),
            identity.PublicKey, Utf8(settings.DeviceId), ephemeralPublic, peerEphemeral, nonce, peerNonce);
        if (!ForwardCrypto.Verify(peerPublicKey, expected, peerSignature))
            throw new ForwardException("error.forwardRejected");

        var shared = ForwardCrypto.SharedSecret(ephemeralPrivate, peerEphemeral);
        var sessionKey = ForwardCrypto.DeriveKey(shared, [.. nonce, .. peerNonce], "URLCheck.Forward.v1");

        var payload = JsonSerializer.SerializeToUtf8Bytes(
            new(url, DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()),
            AppJsonContext.Default.ForwardPayload);

        var frameNonce = ForwardCrypto.RandomBytes(ForwardCrypto.NonceSize);
        var associatedData = ForwardCrypto.Transcript("URLCheck.Forward.Data.v1",
            ephemeralPublic, peerEphemeral, nonce, peerNonce);
        var ciphertext = ForwardCrypto.Encrypt(sessionKey, frameNonce, payload, associatedData);

        await WriteAsync(stream, new ForwardDataMessage(ForwardProtocol.ForwardData,
            ForwardCrypto.ToBase64(frameNonce), ForwardCrypto.ToBase64(ciphertext)), token);

        var status = await ReadAsync(stream, token);
        if (status is StatusMessage { Ok: false } refused)
            throw new ForwardException(refused.Error ?? "error.forwardFailed");
    }

    private static byte[] Utf8(string value) => Encoding.UTF8.GetBytes(value);

    private static async Task WriteAsync<T>(NetworkStream stream, T message, CancellationToken token)
        where T : class
    {
        var typeInfo = (JsonTypeInfo<T>)NativeJson.TypeInfo(typeof(T));
        var frame = JsonSerializer.SerializeToUtf8Bytes(message, typeInfo);
        await ForwardProtocol.WriteFrameAsync(stream, frame, token);
    }

    private static async Task<object?> ReadAsync(NetworkStream stream, CancellationToken token)
    {
        var frame = await ForwardProtocol.ReadFrameAsync(stream, token);
        var type = frame is null ? null : ForwardProtocol.ReadType(frame);

        return type switch
        {
            ForwardProtocol.PairChallenge => Deserialize<PairChallengeMessage>(frame),
            ForwardProtocol.PairAccept => Deserialize<PairAcceptMessage>(frame),
            ForwardProtocol.PairReject => Deserialize<PairRejectMessage>(frame),
            ForwardProtocol.ForwardReply => Deserialize<ForwardReplyMessage>(frame),
            ForwardProtocol.Status => Deserialize<StatusMessage>(frame),
            _ => null
        };
    }

    private static T? Deserialize<T>(byte[]? frame) where T : class =>
        frame is null ? null : JsonSerializer.Deserialize(frame, (JsonTypeInfo<T>)NativeJson.TypeInfo(typeof(T)));
}