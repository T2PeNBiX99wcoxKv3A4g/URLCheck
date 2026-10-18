using System.Buffers.Binary;
using System.Net;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Text.Json;
using Serilog;
using URLCheck.Messaging;
using URLCheck.Models;
using URLCheck.Services;

namespace URLCheck.Forward;

/// <summary>
///     Handles the <c>forward.*</c> messages and runs the listener that accepts forwarded URLs. A URL
///     that arrives opens in the inspection popup, so the receiving side still checks it first.
/// </summary>
internal sealed class ForwardService
{
    /// <summary>Largest encrypted frame accepted; a URL is bounded well below this.</summary>
    private const int MaxFrame = 64 * 1024;

    /// <summary>How long a forwarded URL stays valid, which makes a captured frame useless to replay.</summary>
    private static readonly TimeSpan MaxAge = TimeSpan.FromMinutes(5);

    private readonly SemaphoreSlim _gate = new(1, 1);
    private readonly SettingsService _settings;
    private readonly WindowManager _windows;

    private TcpListener? _listener;
    private CancellationTokenSource? _listenerCts;

    /// <summary>Pairing code + port the running listener was built for, so it only restarts on a real change.</summary>
    private string _signature = "";

    public ForwardService(SettingsService settings, WindowManager windows)
    {
        _settings = settings;
        _windows = windows;

        NativeBridge.MessageReceived += HandleMessageAsync;
        SettingsService.Changed += payload => _ = RestartListenerAsync();
        _ = RestartListenerAsync();
    }

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "forward.send" => SendAsync(context),
        "forward.info" => InfoAsync(context),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    private async Task<NativeResponse?> InfoAsync(NativeContext context)
    {
        var settings = await _settings.GetAsync();

        // Read under the same gate the listener restarts under, so the answer reflects the state
        // right after a settings change rather than the one before it.
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

        return context.Reply("forward.info.result",
            new ForwardInfoPayload(settings.DeviceId, settings.DeviceName, settings.ForwardPort,
                LocalAddresses(), listening));
    }

    private async Task<NativeResponse?> SendAsync(NativeContext context)
    {
        if (context.Payload<ForwardSendRequest>() is not { Url: { Length: > 0 } url } payload)
            return context.Fail("forward.send.result", "error.missingUrl");

        var settings = await _settings.GetAsync();
        if (string.IsNullOrEmpty(settings.PairingCode))
            return context.Fail("forward.send.result", "error.forwardNoCode");

        var device = settings.Devices.FirstOrDefault(candidate => candidate.Id == payload.DeviceId)
                     ?? settings.Devices.FirstOrDefault();
        if (device is null)
            return context.Fail("forward.send.result", "error.forwardNoDevice");

        try
        {
            using var cts = new CancellationTokenSource(settings.RequestTimeoutMs);
            await ForwardClient.SendAsync(device, settings, url, cts.Token);
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

    /// <summary>Brings the listener in line with the settings: it only runs while a pairing code is set.</summary>
    private async Task RestartListenerAsync()
    {
        var settings = await _settings.GetAsync();
        var signature = $"{settings.PairingCode}\u0000{settings.ForwardPort}";

        await _gate.WaitAsync();
        try
        {
            if (signature == _signature)
                return;

            StopListener();
            _signature = signature;

            if (string.IsNullOrEmpty(settings.PairingCode))
                return;

            var listener = new TcpListener(IPAddress.Any, settings.ForwardPort);
            listener.Start();

            var cts = new CancellationTokenSource();
            _listener = listener;
            _listenerCts = cts;

            var key = ForwardCrypto.DeriveKey(settings.PairingCode);
            _ = Task.Run(() => AcceptLoopAsync(listener, key, cts.Token));
            Log.Information("Forwarding listener started on port {Port}", settings.ForwardPort);
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

    private async Task AcceptLoopAsync(TcpListener listener, byte[] key, CancellationToken token)
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

            _ = HandleClientAsync(client, key);
        }
    }

    private async Task HandleClientAsync(TcpClient client, byte[] key)
    {
        using (client)
        using (var cts = new CancellationTokenSource(TimeSpan.FromSeconds(10)))
        {
            client.NoDelay = true;
            var stream = client.GetStream();
            try
            {
                var frame = await ReadFrameAsync(stream, cts.Token);
                if (frame is null)
                {
                    await WriteStatusAsync(stream, ForwardStatus.Malformed, cts.Token);
                    return;
                }

                if (ForwardCrypto.TryDecrypt(key, frame) is not { } plaintext)
                {
                    await WriteStatusAsync(stream, ForwardStatus.Unauthorized, cts.Token);
                    return;
                }

                var envelope = JsonSerializer.Deserialize(plaintext, AppJsonContext.Default.ForwardEnvelope);
                if (envelope is null || !IsHttpUrl(envelope.Url))
                {
                    await WriteStatusAsync(stream, ForwardStatus.Malformed, cts.Token);
                    return;
                }

                var age = DateTimeOffset.UtcNow - DateTimeOffset.FromUnixTimeMilliseconds(envelope.SentAt);
                if (age > MaxAge || age < -MaxAge)
                {
                    await WriteStatusAsync(stream, ForwardStatus.Stale, cts.Token);
                    return;
                }

                await WriteStatusAsync(stream, ForwardStatus.Accepted, cts.Token);
                Log.Information("Received a forwarded URL from {Device} ({Id})", envelope.DeviceName, envelope.DeviceId);
                _windows.ShowPopup(envelope.Url);
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Failed to handle a forwarded URL");
            }
        }
    }

    private static async Task<byte[]?> ReadFrameAsync(NetworkStream stream, CancellationToken token)
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

    private static async Task WriteStatusAsync(NetworkStream stream, ForwardStatus status, CancellationToken token)
    {
        var buffer = new byte[] { (byte)status };
        await stream.WriteAsync(buffer, token);
        await stream.FlushAsync(token);
    }

    private static bool IsHttpUrl(string url) =>
        Uri.TryCreate(url, UriKind.Absolute, out var uri) && uri.Scheme is "http" or "https";

    /// <summary>The IPv4 addresses this device can be reached at on the local network.</summary>
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
                    .Where(address => address.Address.AddressFamily == AddressFamily.InterNetwork)
                    .Select(address => address.Address.ToString())
                    .Distinct()
            ];
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "Failed to list the local addresses");
            return [];
        }
    }
}
