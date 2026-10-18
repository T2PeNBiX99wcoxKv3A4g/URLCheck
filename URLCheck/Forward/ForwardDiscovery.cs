using System.Collections.Concurrent;
using System.Net;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Text.Json;
using Serilog;
using URLCheck.Messaging;
using URLCheck.Models;

namespace URLCheck.Forward;

/// <summary>
///     Finds other URLCheck devices on the local network. A searching device broadcasts a query over
///     UDP — IPv4 broadcast and an IPv6 link-local multicast group — and every listening device answers
///     with its name, port and public key. Discovery is only a hint: the keys are pinned for real when
///     the user pairs.
/// </summary>
internal sealed class ForwardDiscovery(Action<IReadOnlyList<DeviceEntry>> onDiscovered)
{
    /// <summary>A fixed link-local multicast group, so IPv6-only networks work as well as IPv4 ones.</summary>
    private static readonly IPAddress Group = IPAddress.Parse("ff02::5552:4c48");

    private static readonly TimeSpan QueryInterval = TimeSpan.FromMilliseconds(1_500);

    /// <summary>How long a device stays in the list after it last answered.</summary>
    private static readonly TimeSpan FoundLifetime = TimeSpan.FromSeconds(6);

    private readonly ConcurrentDictionary<string, (DeviceEntry Device, long SeenAt)> _found = new();
    private readonly Lock _gate = new();

    private string _deviceId = "";
    private string _deviceName = "";
    private bool _enabled;
    private int _port;
    private string _publicKey = "";
    private CancellationTokenSource? _queryCts;
    private CancellationTokenSource? _receiveCts;
    private bool _scanning;
    private bool _searching;
    private UdpClient? _v4;
    private UdpClient? _v6;

    /// <summary>Starts or stops the discovery socket so it always matches the setting.</summary>
    public void Apply(AppSettings settings, DeviceIdentity identity)
    {
        lock (_gate)
        {
            _deviceId = settings.DeviceId;
            _deviceName = settings.DeviceName;
            _port = settings.ForwardPort;
            _publicKey = identity.PublicKeyBase64;

            if (settings.ForwardingEnabled)
            {
                if (_v4 is null && _v6 is null)
                    StartSockets();
                return;
            }

            _enabled = false;
            StopQuery();
            StopSockets();
        }
    }

    /// <summary>Starts looking for devices; the results arrive through the callback.</summary>
    public void BeginSearch()
    {
        lock (_gate)
        {
            _searching = true;
            _found.Clear();
            StopQuery();
            _queryCts = new();

            // Runs even when the UDP sockets could not be opened: the TCP sweep does not need them.
            _ = Task.Run(() => QueryLoopAsync(_queryCts.Token));
        }
    }

    public void EndSearch()
    {
        lock (_gate)
        {
            _searching = false;
            StopQuery();
            _found.Clear();
        }
    }

    private void StartSockets()
    {
        _receiveCts = new();

        try
        {
            var v4 = new UdpClient(AddressFamily.InterNetwork);
            v4.Client.SetSocketOption(SocketOptionLevel.Socket, SocketOptionName.ReuseAddress, true);
            v4.EnableBroadcast = true;
            v4.Client.Bind(new IPEndPoint(IPAddress.Any, ForwardProtocol.DiscoveryPort));
            _v4 = v4;
            _ = Task.Run(() => ReceiveLoopAsync(v4, _receiveCts.Token));
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to open the IPv4 discovery socket");
        }

        try
        {
            var v6 = new UdpClient(AddressFamily.InterNetworkV6);
            v6.Client.SetSocketOption(SocketOptionLevel.Socket, SocketOptionName.ReuseAddress, true);
            // IPv6-only, so it can share the port with the IPv4 socket above.
            v6.Client.DualMode = false;
            v6.Client.Bind(new IPEndPoint(IPAddress.IPv6Any, ForwardProtocol.DiscoveryPort));
            JoinGroups(v6);
            _v6 = v6;
            _ = Task.Run(() => ReceiveLoopAsync(v6, _receiveCts.Token));
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to open the IPv6 discovery socket");
        }

        _enabled = _v4 is not null || _v6 is not null;
        if (_enabled)
            Log.Information("Device discovery is listening on UDP {Port}", ForwardProtocol.DiscoveryPort);
    }

    private void StopSockets()
    {
        _receiveCts?.Cancel();
        _receiveCts?.Dispose();
        _receiveCts = null;

        Close(_v4);
        Close(_v6);
        _v4 = null;
        _v6 = null;
    }

    private void StopQuery()
    {
        _queryCts?.Cancel();
        _queryCts?.Dispose();
        _queryCts = null;
    }

    private async Task ReceiveLoopAsync(UdpClient client, CancellationToken token)
    {
        while (!token.IsCancellationRequested)
        {
            UdpReceiveResult result;
            try
            {
                result = await client.ReceiveAsync(token);
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
                Log.Debug(ex, "A discovery datagram could not be read");
                continue;
            }

            try
            {
                await HandleDatagramAsync(client, result, token);
            }
            catch (Exception ex)
            {
                Log.Debug(ex, "A discovery datagram could not be handled");
            }
        }
    }

    private async Task HandleDatagramAsync(UdpClient client, UdpReceiveResult result, CancellationToken token)
    {
        var type = ForwardProtocol.ReadType(result.Buffer);
        Log.Debug("Discovery datagram {Type} from {From}", type, result.RemoteEndPoint);

        switch (type)
        {
            case ForwardProtocol.Discover:
            {
                var announce = new AnnounceMessage(ForwardProtocol.Announce, _deviceId, _deviceName, _port, _publicKey);
                var frame = JsonSerializer.SerializeToUtf8Bytes(announce, AppJsonContext.Default.AnnounceMessage);
                await client.SendAsync(frame, result.RemoteEndPoint);
                return;
            }

            case ForwardProtocol.Announce:
            {
                if (!_searching)
                    return;

                var announce = JsonSerializer.Deserialize(result.Buffer, AppJsonContext.Default.AnnounceMessage);
                Record(announce, HostOf(result.RemoteEndPoint));
                return;
            }
        }
    }

    private async Task QueryLoopAsync(CancellationToken token)
    {
        var lastScan = 0L;

        while (!token.IsCancellationRequested)
        {
            SendQuery();
            Publish();

            // The UDP query is cheap and repeats; the TCP sweep is heavier, so it runs less often.
            if (Environment.TickCount64 - lastScan > 10_000)
            {
                lastScan = Environment.TickCount64;
                StartScan(token);
            }

            try
            {
                await Task.Delay(QueryInterval, token);
            }
            catch (OperationCanceledException)
            {
                break;
            }
        }
    }

    private void StartScan(CancellationToken token)
    {
        lock (_gate)
        {
            if (_scanning)
                return;

            _scanning = true;
        }

        _ = Task.Run(async () =>
        {
            try
            {
                await ScanAsync(token);
            }
            catch (OperationCanceledException)
            {
                // The search was closed; nothing to do.
            }
            catch (Exception ex)
            {
                Log.Debug(ex, "The discovery sweep failed");
            }
            finally
            {
                lock (_gate)
                    _scanning = false;
            }
        }, token);
    }

    /// <summary>
    ///     Sweeps the local /24 over TCP, asking each host whether it is a device. It never needs an
    ///     inbound packet, so it still works when the UDP broadcast is blocked.
    /// </summary>
    private async Task ScanAsync(CancellationToken token)
    {
        var ports = _port == AppSettings.DefaultForwardPort
            ? new[] { _port }
            : new[] { _port, AppSettings.DefaultForwardPort };

        var networks = LocalNetworks();
        var targets = CandidateAddresses(networks);
        if (targets.Count == 0)
            return;

        Log.Information("Device discovery is probing {Count} addresses on {Networks} over TCP",
            targets.Count, string.Join(", ", networks));

        foreach (var port in ports.Distinct())
            await Parallel.ForEachAsync(targets, new ParallelOptions
            {
                MaxDegreeOfParallelism = 64,
                CancellationToken = token
            }, async (address, ct) => await ProbeAsync(address, port, ct));
    }

    private async Task ProbeAsync(IPAddress address, int port, CancellationToken token)
    {
        try
        {
            using var client = new TcpClient();
            client.NoDelay = true;

            using var cts = CancellationTokenSource.CreateLinkedTokenSource(token);
            cts.CancelAfter(TimeSpan.FromMilliseconds(400));
            await client.ConnectAsync(address, port, cts.Token);

            var stream = client.GetStream();
            var query = JsonSerializer.SerializeToUtf8Bytes(new DiscoverMessage(ForwardProtocol.Discover),
                AppJsonContext.Default.DiscoverMessage);
            await ForwardProtocol.WriteFrameAsync(stream, query, cts.Token);

            var reply = await ForwardProtocol.ReadFrameAsync(stream, cts.Token);
            if (reply is null || ForwardProtocol.ReadType(reply) != ForwardProtocol.Announce)
                return;

            var announce = JsonSerializer.Deserialize(reply, AppJsonContext.Default.AnnounceMessage);
            Record(announce, address.ToString());
        }
        catch (Exception)
        {
            // A host that does not answer is simply not a device.
        }
    }

    /// <summary>The distinct /24 prefixes this device's IPv4 addresses live in.</summary>
    private static List<string> LocalNetworks()
    {
        var networks = new HashSet<string>(StringComparer.Ordinal);

        foreach (var nic in UpInterfaces(NetworkInterfaceComponent.IPv4))
        foreach (var unicast in nic.GetIPProperties().UnicastAddresses)
        {
            if (unicast.Address.AddressFamily != AddressFamily.InterNetwork)
                continue;

            var self = unicast.Address.GetAddressBytes();
            networks.Add($"{self[0]}.{self[1]}.{self[2]}.0/24");
        }

        return [.. networks];
    }

    /// <summary>The other hosts in the given /24 networks.</summary>
    private static List<IPAddress> CandidateAddresses(List<string> networks)
    {
        var local = new HashSet<IPAddress>();
        foreach (var nic in UpInterfaces(NetworkInterfaceComponent.IPv4))
        foreach (var unicast in nic.GetIPProperties().UnicastAddresses)
            if (unicast.Address.AddressFamily == AddressFamily.InterNetwork)
                local.Add(unicast.Address);

        var candidates = new List<IPAddress>();
        foreach (var network in networks)
        {
            var parts = network.Split('/')[0].Split('.');
            var a = byte.Parse(parts[0]);
            var b = byte.Parse(parts[1]);
            var c = byte.Parse(parts[2]);

            for (var host = 1; host <= 254; host++)
            {
                var address = new IPAddress([a, b, c, (byte)host]);
                if (!local.Contains(address))
                    candidates.Add(address);
            }
        }

        return candidates;
    }

    private void Record(AnnounceMessage? announce, string host)
    {
        if (announce is null || announce.DeviceId == _deviceId || announce.PublicKey.Length == 0)
            return;

        var device = new DeviceEntry
        {
            Id = announce.DeviceId,
            Name = announce.DeviceName,
            Host = host,
            Port = announce.Port,
            PublicKey = announce.PublicKey
        };

        if (_found.TryAdd(announce.DeviceId, (device, Environment.TickCount64)))
            Log.Information("Device discovery found {Name} at {Host}:{Port}", announce.DeviceName, host, announce.Port);
        else
            _found[announce.DeviceId] = (device, Environment.TickCount64);
    }

    private void SendQuery()
    {
        var frame = JsonSerializer.SerializeToUtf8Bytes(new(ForwardProtocol.Discover),
            AppJsonContext.Default.DiscoverMessage);

        if (_v4 is { } v4)
        {
            TrySend(v4, frame, new(IPAddress.Broadcast, ForwardProtocol.DiscoveryPort));
            foreach (var address in BroadcastAddresses())
                TrySend(v4, frame, new(address, ForwardProtocol.DiscoveryPort));
        }

        if (_v6 is not { } v6)
            return;

        foreach (var nic in UpInterfaces(NetworkInterfaceComponent.IPv6))
            TrySend(v6, frame, new(new IPAddress(Group.GetAddressBytes(), Index6(nic)),
                ForwardProtocol.DiscoveryPort));
    }

    private void Publish()
    {
        var cutoff = Environment.TickCount64 - (long)FoundLifetime.TotalMilliseconds;
        var devices = _found.Values
            .Where(entry => entry.SeenAt >= cutoff)
            .Select(entry => entry.Device)
            .OrderBy(device => device.Name, StringComparer.OrdinalIgnoreCase)
            .ToList();

        try
        {
            onDiscovered(devices);
        }
        catch (Exception ex)
        {
            // A window that cannot take the event must not stop the search loop.
            Log.Debug(ex, "Failed to publish discovered devices");
        }
    }

    /// <summary>Every interface's broadcast address, so all of them are probed and not just the default one.</summary>
    private static IEnumerable<IPAddress> BroadcastAddresses()
    {
        foreach (var nic in UpInterfaces(NetworkInterfaceComponent.IPv4))
        foreach (var unicast in nic.GetIPProperties().UnicastAddresses)
        {
            if (unicast.Address.AddressFamily != AddressFamily.InterNetwork)
                continue;

            var address = unicast.Address.GetAddressBytes();
            var mask = unicast.IPv4Mask?.GetAddressBytes() ?? new byte[4];
            var broadcast = new byte[4];
            for (var i = 0; i < 4; i++)
                broadcast[i] = (byte)(address[i] | ~mask[i]);

            yield return new(broadcast);
        }
    }

    private static void JoinGroups(UdpClient client)
    {
        foreach (var nic in UpInterfaces(NetworkInterfaceComponent.IPv6))
            try
            {
                client.JoinMulticastGroup(Index6(nic), Group);
            }
            catch (Exception ex)
            {
                Log.Debug(ex, "Failed to join the discovery group on {Nic}", nic.Name);
            }
    }

    private static IEnumerable<NetworkInterface> UpInterfaces(NetworkInterfaceComponent component) =>
        NetworkInterface.GetAllNetworkInterfaces().Where(nic =>
            nic.OperationalStatus == OperationalStatus.Up &&
            nic.NetworkInterfaceType != NetworkInterfaceType.Loopback &&
            nic.Supports(component));

    private static int Index6(NetworkInterface nic)
    {
        try
        {
            return nic.GetIPProperties().GetIPv6Properties().Index;
        }
        catch (Exception)
        {
            return 0;
        }
    }

    private static string HostOf(IPEndPoint endpoint)
    {
        var address = endpoint.Address;
        if (address.IsIPv4MappedToIPv6)
            address = address.MapToIPv4();

        return address.ToString();
    }

    private static void TrySend(UdpClient client, byte[] frame, IPEndPoint target)
    {
        try
        {
            client.Send(frame, frame.Length, target);
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "Failed to send a discovery query to {Target}", target);
        }
    }

    private static void Close(UdpClient? client)
    {
        try
        {
            client?.Close();
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "Failed to close a discovery socket");
        }
    }
}