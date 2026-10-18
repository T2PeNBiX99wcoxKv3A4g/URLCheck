using System.Net;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization.Metadata;
using Serilog;
using URLCheck.Messaging;
using URLCheck.Models;
using URLCheck.Services;

namespace URLCheck.Forward;

/// <summary>
///     Handles the <c>forward.*</c> messages, answers discovery queries, and runs the listener that
///     accepts pairing requests and forwarded URLs. A URL that arrives opens in the inspection popup,
///     so the receiving side still checks it first.
/// </summary>
internal sealed class ForwardService
{
    private readonly ForwardDiscovery _discovery;
    private readonly SemaphoreSlim _gate = new(1, 1);
    private readonly DeviceIdentity _identity;

    /// <summary>The one pairing request currently waiting for the user to accept or reject it.</summary>
    private readonly Lock _incomingLock = new();

    private readonly SettingsService _settings;
    private readonly WindowManager _windows;

    private IncomingPairing? _incoming;
    private TcpListener? _listener;
    private CancellationTokenSource? _listenerCts;

    /// <summary>The port the running listener was built for, so it only restarts on a real change.</summary>
    private string _signature = "";

    public ForwardService(SettingsService settings, WindowManager windows, DeviceIdentity identity)
    {
        _settings = settings;
        _windows = windows;
        _identity = identity;

        _discovery = new ForwardDiscovery(devices => _windows.RunOnMainWindow(() =>
            _windows.BroadcastEvent("forward.discovered", new ForwardDiscoveredPayload(devices))));

        NativeBridge.MessageReceived += HandleMessageAsync;
        SettingsService.Changed += payload => _ = ApplyAsync(payload.Settings);
        _ = ApplyAsync(null);
    }

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "forward.send" => SendAsync(context),
        "forward.info" => InfoAsync(context),
        "forward.pair" => StartPairingAsync(context),
        "forward.pairRespond" => RespondToPairingAsync(context),
        "forward.pendingPairing" => PendingPairingAsync(context),
        "forward.remove" => RemoveAsync(context),
        "forward.discoverStart" => DiscoverAsync(context, true),
        "forward.discoverStop" => DiscoverAsync(context, false),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    /* ------------------------------------------------------------------ native messages */

    private async Task<NativeResponse?> SendAsync(NativeContext context)
    {
        if (context.Payload<ForwardSendRequest>() is not { Url: { Length: > 0 } url } payload)
            return context.Fail("forward.send.result", "error.missingUrl");

        var settings = await _settings.GetAsync();
        var device = settings.Devices.FirstOrDefault(candidate => candidate.Id == payload.DeviceId)
                     ?? settings.Devices.FirstOrDefault();
        if (device is null)
            return context.Fail("forward.send.result", "error.forwardNoDevice");

        try
        {
            using var cts = new CancellationTokenSource(ForwardProtocol.ConnectionTimeout);
            await ForwardClient.SendAsync(device, settings, _identity, url, cts.Token);
            Log.Information("Forwarded a URL to {Device}", device.Name);
            return context.Reply("forward.send.result", new ForwardSendPayload(true, device.Name));
        }
        catch (ForwardException ex)
        {
            Log.Information("Device {Device} refused a forwarded URL: {Reason}", device.Name, ex.Message);
            return context.Fail("forward.send.result", ex.Message);
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to forward a URL to {Device}", device.Name);
            return context.Fail("forward.send.result", "error.forwardFailed");
        }
    }

    private async Task<NativeResponse?> InfoAsync(NativeContext context)
    {
        var settings = await _settings.GetAsync();

        await _gate.WaitAsync();
        bool listening;
        try
        {
            listening = _listener is not null;
        }
        finally
        {
            _gate.Release();
        }

        return context.Reply("forward.info.result", new ForwardInfoPayload(settings.DeviceId, settings.DeviceName,
            settings.ForwardPort, LocalAddresses(), settings.ForwardingEnabled, listening, _identity.PublicKeyBase64));
    }

    /// <summary>Starts a pairing in the background; progress arrives as <c>forward.pairState</c> events.</summary>
    private Task<NativeResponse?> StartPairingAsync(NativeContext context)
    {
        if (context.Payload<ForwardPairStartRequest>() is { Host.Length: > 0 } request)
            _ = Task.Run(() => RunPairingAsync(request));

        return Task.FromResult<NativeResponse?>(null);
    }

    private Task<NativeResponse?> RespondToPairingAsync(NativeContext context)
    {
        if (context.Payload<ForwardPairRespondRequest>() is { RequestId.Length: > 0 } request)
        {
            IncomingPairing? incoming;
            lock (_incomingLock)
                incoming = _incoming?.RequestId == request.RequestId ? _incoming : null;

            incoming?.Decision.TrySetResult(request.Accept);
        }

        return Task.FromResult<NativeResponse?>(null);
    }

    /// <summary>
    ///     Reports a pairing request that is still waiting, so a settings page that mounts after the
    ///     event was pushed can still show it.
    /// </summary>
    private Task<NativeResponse?> PendingPairingAsync(NativeContext context)
    {
        IncomingPairing? incoming;
        lock (_incomingLock)
            incoming = _incoming;

        ForwardPairRequestPayload? payload = incoming is null
            ? null
            : new(incoming.RequestId, incoming.DeviceId, incoming.DeviceName, incoming.Code);

        return Task.FromResult<NativeResponse?>(context.Reply("forward.pendingPairing.result", payload));
    }

    private async Task<NativeResponse?> RemoveAsync(NativeContext context)
    {
        var id = context.Payload<ForwardRemoveRequest>()?.DeviceId;
        var settings = await _settings.GetAsync();
        if (settings.Devices.RemoveAll(device => device.Id == id) > 0)
            await _settings.SaveAndPublishAsync(settings);

        return context.Reply("forward.remove.result", new OkPayload());
    }

    private Task<NativeResponse?> DiscoverAsync(NativeContext context, bool start)
    {
        if (start)
            _discovery.BeginSearch();
        else
            _discovery.EndSearch();

        return Task.FromResult<NativeResponse?>(null);
    }

    /* ------------------------------------------------------------------ pairing (initiator) */

    private async Task RunPairingAsync(ForwardPairStartRequest request)
    {
        var settings = await _settings.GetAsync();
        try
        {
            using var cts = new CancellationTokenSource(ForwardProtocol.PairTimeout + ForwardProtocol.ConnectionTimeout);
            var peer = await ForwardClient.PairAsync(request.Host, request.Port, settings, _identity,
                (code, device) =>
                {
                    Push("forward.pairState", new ForwardPairStatePayload("code", code, device, null));
                    return Task.CompletedTask;
                }, cts.Token);

            await SaveDeviceAsync(peer);
            Push("forward.pairState", new ForwardPairStatePayload("accepted", null, peer, null));
        }
        catch (ForwardException ex)
        {
            Push("forward.pairState", new ForwardPairStatePayload("rejected", null, null, ex.Message));
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Pairing failed");
            Push("forward.pairState", new ForwardPairStatePayload("failed", null, null, "error.forwardFailed"));
        }
    }

    /* ------------------------------------------------------------------ listener */

    /// <summary>Brings the listener in line with the settings: it only runs while forwarding is on.</summary>
    private async Task ApplyAsync(AppSettings? settings)
    {
        settings ??= await _settings.GetAsync();
        _discovery.Apply(settings, _identity);

        var signature = settings.ForwardingEnabled ? settings.ForwardPort.ToString() : "";

        await _gate.WaitAsync();
        try
        {
            if (signature == _signature)
                return;

            StopListener();
            _signature = signature;

            if (!settings.ForwardingEnabled)
                return;

            var listener = StartListener(settings.ForwardPort);
            var cts = new CancellationTokenSource();
            _listener = listener;
            _listenerCts = cts;
            _ = Task.Run(() => AcceptLoopAsync(listener, cts.Token));
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to start the forwarding listener on port {Port}", settings.ForwardPort);
        }
        finally
        {
            _gate.Release();
        }
    }

    /// <summary>
    ///     Binds the listener on every interface. A dual-stack IPv6 socket serves IPv4 and IPv6 alike,
    ///     so one listener covers both; platforms without an IPv6 stack fall back to IPv4 only.
    /// </summary>
    private static TcpListener StartListener(int port)
    {
        try
        {
            var dual = new TcpListener(IPAddress.IPv6Any, port);
            dual.Server.DualMode = true;
            dual.Start();

            Log.Information("Forwarding listener bound to IPv4 and IPv6 on port {Port}", port);
            return dual;
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "A dual-stack forwarding listener is unavailable; binding IPv4 only");

            var ipv4 = new TcpListener(IPAddress.Any, port);
            ipv4.Start();

            Log.Information("Forwarding listener bound to IPv4 on port {Port}", port);
            return ipv4;
        }
    }

    private void StopListener()
    {
        _listenerCts?.Cancel();
        _listenerCts?.Dispose();
        _listenerCts = null;

        try
        {
            _listener?.Stop();
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "Failed to stop the forwarding listener");
        }

        _listener = null;
    }

    private async Task AcceptLoopAsync(TcpListener listener, CancellationToken token)
    {
        while (!token.IsCancellationRequested)
        {
            TcpClient client;
            try
            {
                client = await listener.AcceptTcpClientAsync(token);
            }
            catch (OperationCanceledException)
            {
                break;
            }
            catch (ObjectDisposedException)
            {
                break;
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "The forwarding listener failed to accept a connection");
                continue;
            }

            _ = HandleClientAsync(client, token);
        }
    }

    private async Task HandleClientAsync(TcpClient client, CancellationToken token)
    {
        using (client)
        using (var cts = CancellationTokenSource.CreateLinkedTokenSource(token))
        {
            cts.CancelAfter(ForwardProtocol.PairTimeout + ForwardProtocol.ConnectionTimeout);
            client.NoDelay = true;

            var stream = client.GetStream();
            try
            {
                var frame = await ForwardProtocol.ReadFrameAsync(stream, cts.Token);
                if (frame is null)
                    return;

                switch (ForwardProtocol.ReadType(frame))
                {
                    case ForwardProtocol.PairRequest:
                        await HandlePairRequestAsync(stream, frame, client, cts.Token);
                        break;

                    case ForwardProtocol.ForwardHello:
                        await HandleForwardHelloAsync(stream, frame, cts.Token);
                        break;

                    default:
                        await WriteStatusAsync(stream, false, "error.forwardFailed", cts.Token);
                        break;
                }
            }
            catch (Exception ex)
            {
                Log.Debug(ex, "Failed to handle a forwarding connection");
            }
        }
    }

    private async Task HandlePairRequestAsync(NetworkStream stream, byte[] frame, TcpClient client, CancellationToken token)
    {
        var request = Deserialize<PairRequestMessage>(frame);
        var peerKey = ForwardCrypto.FromBase64(request?.PublicKey);
        var nonce = ForwardCrypto.FromBase64(request?.Nonce);
        var signature = ForwardCrypto.FromBase64(request?.Signature);

        if (request is null || peerKey is not { Length: 32 } || nonce is null || signature is null)
        {
            await WriteStatusAsync(stream, false, "error.forwardFailed", token);
            return;
        }

        // The signature proves the peer really holds the key it claims; without it, anyone could ask.
        var requestTranscript = ForwardCrypto.Transcript("URLCheck.Pair.Request.v1",
            peerKey, Utf8(request.DeviceId), nonce);
        if (!ForwardCrypto.Verify(peerKey, requestTranscript, signature))
        {
            await WriteStatusAsync(stream, false, "error.forwardPairRejected", token);
            return;
        }

        var settings = await _settings.GetAsync();
        var transcript = ForwardCrypto.Transcript("URLCheck.Pair.v1",
            peerKey, Utf8(request.DeviceId), _identity.PublicKey, Utf8(settings.DeviceId), nonce);

        var requestId = Guid.NewGuid().ToString("N");
        var incoming = new IncomingPairing(requestId, request.DeviceId, request.DeviceName,
            ForwardCrypto.PairingCode(transcript),
            new TaskCompletionSource<bool>(TaskCreationOptions.RunContinuationsAsynchronously));

        // Only one request is offered at a time, so the confirmation screen never has to choose.
        bool busy;
        lock (_incomingLock)
        {
            busy = _incoming is not null;
            if (!busy)
                _incoming = incoming;
        }

        if (busy)
        {
            await WriteStatusAsync(stream, false, "error.forwardBusy", token);
            return;
        }

        try
        {
            await WriteMessageAsync(stream, new PairChallengeMessage(ForwardProtocol.PairChallenge, settings.DeviceId,
                settings.DeviceName, settings.ForwardPort, _identity.PublicKeyBase64), token);

            _windows.RunOnMainWindow(() =>
            {
                _windows.ShowMainWindow("settings");
                _windows.BroadcastEvent("forward.pairRequest", new ForwardPairRequestPayload(
                    requestId, request.DeviceId, request.DeviceName, incoming.Code));
            });

            bool accepted;
            try
            {
                accepted = await incoming.Decision.Task.WaitAsync(ForwardProtocol.PairTimeout, token);
            }
            catch (Exception)
            {
                accepted = false;
            }

            if (!accepted)
            {
                await WriteMessageAsync(stream,
                    new PairRejectMessage(ForwardProtocol.PairReject, "error.forwardPairRejected"), token);
                return;
            }

            await SaveDeviceAsync(new()
            {
                Id = request.DeviceId,
                Name = request.DeviceName,
                Host = HostOf(client),
                Port = request.Port,
                PublicKey = request.PublicKey
            });

            var accept = ForwardCrypto.Sign(_identity.PrivateKey,
                ForwardCrypto.Transcript("URLCheck.Pair.Accept.v1", transcript));
            await WriteMessageAsync(stream,
                new PairAcceptMessage(ForwardProtocol.PairAccept, ForwardCrypto.ToBase64(accept)), token);
        }
        finally
        {
            lock (_incomingLock)
                if (_incoming?.RequestId == requestId)
                    _incoming = null;
        }
    }

    private async Task HandleForwardHelloAsync(NetworkStream stream, byte[] frame, CancellationToken token)
    {
        var hello = Deserialize<ForwardHelloMessage>(frame);
        var ephemeral = ForwardCrypto.FromBase64(hello?.EphemeralKey);
        var nonce = ForwardCrypto.FromBase64(hello?.Nonce);
        var signature = ForwardCrypto.FromBase64(hello?.Signature);

        var settings = await _settings.GetAsync();
        var device = settings.Devices.FirstOrDefault(candidate => candidate.Id == hello?.DeviceId);
        var peerKey = ForwardCrypto.FromBase64(device?.PublicKey);

        if (hello is null || device is null || peerKey is not { Length: 32 } ||
            ephemeral is not { Length: 32 } || nonce is not { Length: ForwardCrypto.HandshakeNonceSize } ||
            signature is null)
        {
            await WriteStatusAsync(stream, false, "error.forwardUnpaired", token);
            return;
        }

        var expected = ForwardCrypto.Transcript("URLCheck.Forward.Hello.v1", peerKey, Utf8(device.Id),
            _identity.PublicKey, Utf8(settings.DeviceId), ephemeral, nonce);
        if (!ForwardCrypto.Verify(peerKey, expected, signature))
        {
            await WriteStatusAsync(stream, false, "error.forwardRejected", token);
            return;
        }

        // A fresh ephemeral key per connection: even a recorded session cannot be decrypted later.
        var (replyPrivate, replyPublic) = ForwardCrypto.GenerateEphemeralKeyPair();
        var replyNonce = ForwardCrypto.RandomBytes(ForwardCrypto.HandshakeNonceSize);
        var replySignature = ForwardCrypto.Sign(_identity.PrivateKey, ForwardCrypto.Transcript(
            "URLCheck.Forward.Reply.v1", _identity.PublicKey, Utf8(settings.DeviceId), peerKey, Utf8(device.Id),
            ephemeral, replyPublic, nonce, replyNonce));

        await WriteMessageAsync(stream, new ForwardReplyMessage(ForwardProtocol.ForwardReply,
            ForwardCrypto.ToBase64(replyPublic), ForwardCrypto.ToBase64(replyNonce),
            ForwardCrypto.ToBase64(replySignature)), token);

        var dataFrame = await ForwardProtocol.ReadFrameAsync(stream, token);
        var data = dataFrame is null ? null : Deserialize<ForwardDataMessage>(dataFrame);
        var frameNonce = ForwardCrypto.FromBase64(data?.Nonce);
        var ciphertext = ForwardCrypto.FromBase64(data?.Ciphertext);

        if (data is null || ForwardProtocol.ReadType(dataFrame!) != ForwardProtocol.ForwardData ||
            frameNonce is not { Length: ForwardCrypto.NonceSize } || ciphertext is null)
        {
            await WriteStatusAsync(stream, false, "error.forwardFailed", token);
            return;
        }

        var shared = ForwardCrypto.SharedSecret(replyPrivate, ephemeral);
        var sessionKey = ForwardCrypto.DeriveKey(shared, [.. nonce, .. replyNonce], "URLCheck.Forward.v1");
        var associatedData = ForwardCrypto.Transcript("URLCheck.Forward.Data.v1",
            ephemeral, replyPublic, nonce, replyNonce);

        var plaintext = ForwardCrypto.TryDecrypt(sessionKey, frameNonce, ciphertext, associatedData);
        var payload = plaintext is null ? null : Deserialize<ForwardPayload>(plaintext);

        if (payload is null || !IsHttpUrl(payload.Url))
        {
            await WriteStatusAsync(stream, false, "error.forwardRejected", token);
            return;
        }

        var age = DateTimeOffset.UtcNow - DateTimeOffset.FromUnixTimeMilliseconds(payload.SentAt);
        if (age > ForwardProtocol.MaxMessageAge || age < -ForwardProtocol.MaxMessageAge)
        {
            await WriteStatusAsync(stream, false, "error.forwardStale", token);
            return;
        }

        await WriteStatusAsync(stream, true, null, token);
        Log.Information("Received a forwarded URL from {Device} ({Id})", device.Name, device.Id);
        _windows.ShowPopup(payload.Url);
    }

    /* ------------------------------------------------------------------ helpers */

    /// <summary>Adds a newly paired device, or refreshes the address of one that was already known.</summary>
    private async Task SaveDeviceAsync(DeviceEntry peer)
    {
        var settings = await _settings.GetAsync();
        var existing = settings.Devices.FirstOrDefault(device => device.Id == peer.Id);

        if (existing is null)
        {
            settings.Devices.Add(peer);
        }
        else
        {
            existing.Name = peer.Name;
            existing.Host = peer.Host;
            existing.Port = peer.Port;
            existing.PublicKey = peer.PublicKey;
        }

        await _settings.SaveAndPublishAsync(settings);
    }

    private void Push(string type, object payload) =>
        _windows.RunOnMainWindow(() => _windows.BroadcastEvent(type, payload));

    private static async Task WriteMessageAsync<T>(NetworkStream stream, T message, CancellationToken token)
        where T : class
    {
        var frame = JsonSerializer.SerializeToUtf8Bytes(message, (JsonTypeInfo<T>)NativeJson.TypeInfo(typeof(T)));
        await ForwardProtocol.WriteFrameAsync(stream, frame, token);
    }

    private static Task WriteStatusAsync(NetworkStream stream, bool ok, string? error, CancellationToken token) =>
        WriteMessageAsync(stream, new StatusMessage(ForwardProtocol.Status, ok, error), token);

    private static T? Deserialize<T>(byte[] frame) where T : class =>
        JsonSerializer.Deserialize(frame, (JsonTypeInfo<T>)NativeJson.TypeInfo(typeof(T)));

    private static string HostOf(TcpClient client)
    {
        var address = (client.Client.RemoteEndPoint as IPEndPoint)?.Address ?? IPAddress.None;
        if (address.IsIPv4MappedToIPv6)
            address = address.MapToIPv4();

        return address.ToString();
    }

    private static byte[] Utf8(string value) => Encoding.UTF8.GetBytes(value);

    private static bool IsHttpUrl(string url) =>
        Uri.TryCreate(url, UriKind.Absolute, out var uri) && uri.Scheme is "http" or "https";

    /// <summary>
    ///     The addresses this device can be reached at on the local network. Loopback and IPv6
    ///     link-local addresses are left out: the latter need a scope id that only means something on
    ///     the machine that owns the interface, so it cannot be typed into the other device.
    /// </summary>
    private static List<string> LocalAddresses()
    {
        try
        {
            return
            [
                .. NetworkInterface.GetAllNetworkInterfaces()
                    .Where(nic => nic.OperationalStatus == OperationalStatus.Up &&
                                  nic.NetworkInterfaceType != NetworkInterfaceType.Loopback)
                    .SelectMany(nic => nic.GetIPProperties().UnicastAddresses)
                    .Select(address => address.Address)
                    .Where(IsReachableAddress)
                    // IPv4 first, so the familiar address stays at the front of the list.
                    .OrderBy(address => address.AddressFamily == AddressFamily.InterNetwork ? 0 : 1)
                    .Select(address => address.ToString())
                    .Distinct()
            ];
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "Failed to list the local addresses");
            return [];
        }
    }

    private static bool IsReachableAddress(IPAddress address) =>
        address.AddressFamily is AddressFamily.InterNetwork or AddressFamily.InterNetworkV6 &&
        !IPAddress.IsLoopback(address) &&
        !address.IsIPv6LinkLocal;

    /// <summary>A pairing request waiting for the local user to accept or reject it.</summary>
    private sealed record IncomingPairing(
        string RequestId,
        string DeviceId,
        string DeviceName,
        string Code,
        TaskCompletionSource<bool> Decision);
}
