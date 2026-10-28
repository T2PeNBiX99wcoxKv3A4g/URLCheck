using System.Collections.Concurrent;
using URLCheck.Messaging;
using URLCheck.Models;
using URLCheck.Services;
using PhotinoNetUtils.Utils;

namespace URLCheck.Forward;

/// <summary>
///     Tracks which paired devices answer right now, so the settings list can show it and the popup
///     only offers devices that really work. A check asks each device to identify itself over TCP,
///     which proves both that it is running and that it is the device that was paired.
/// </summary>
/// <remarks>
///     The check repeats in the background while at least one device is paired, and windows are only
///     told when the answer changes, so a steady state costs no messages.
/// </remarks>
internal sealed class ForwardPresence : Singleton<ForwardPresence>
{
    /// <summary>How often every paired device is rechecked while any of them exist.</summary>
    private static readonly TimeSpan Interval = TimeSpan.FromSeconds(10);

    /// <summary>A window asking for the state reuses a result at most this old.</summary>
    private static readonly TimeSpan ReuseWindow = TimeSpan.FromSeconds(4);

    private readonly Lock _gate = new();
    private readonly ConcurrentDictionary<string, bool> _online = new(StringComparer.Ordinal);

    private long? _checkedAt;
    private bool _checking;
    private CancellationTokenSource? _loopCts;
    private string _published = "";
    private string _signature = "";

    /// <summary>The paired devices that answered the last check.</summary>
    public ForwardPresencePayload Snapshot() =>
        new([.. _online.Where(entry => entry.Value).Select(entry => entry.Key).Order(StringComparer.Ordinal)]);

    /// <summary>Follows the settings: forgets removed devices and keeps checking while any are left.</summary>
    public void Apply(AppSettings settings)
    {
        foreach (var id in _online.Keys.Where(id => settings.Devices.All(device => device.Id != id)))
            _online.TryRemove(id, out _);

        bool started;
        var empty = settings.Devices.Count == 0;
        lock (_gate)
            if (empty)
            {
                StopLoop();
                started = false;
            }
            else
            {
                started = _loopCts is null;
                if (started)
                    StartLoop();
            }

        if (empty)
        {
            Publish();
            return;
        }

        // An added, removed or re-addressed device is checked right away instead of on its turn.
        var signature = string.Join('\n', settings.Devices.Select(device =>
            $"{device.Id}|{device.Host}|{device.Port}|{string.Join(',', device.Addresses)}"));

        var changed = signature != _signature;
        _signature = signature;

        if (started || changed)
            RequestRefresh(true);
    }

    /// <summary>Rechecks the devices, unless the last result is only a moment old.</summary>
    public void RequestRefresh(bool force = false)
    {
        lock (_gate)
        {
            if (_checking)
                return;

            if (!force && _checkedAt is { } checkedAt &&
                Environment.TickCount64 - checkedAt < (long)ReuseWindow.TotalMilliseconds)
                return;

            _checking = true;
        }

        _ = Task.Run(() => CheckAsync(CancellationToken.None));
    }

    /// <summary>Records that a device just answered, without waiting for the next check.</summary>
    public void MarkOnline(string deviceId)
    {
        if (_online.TryGetValue(deviceId, out var online) && online)
            return;

        _online[deviceId] = true;
        Publish();
    }

    private async Task LoopAsync(CancellationToken token)
    {
        while (!token.IsCancellationRequested)
        {
            RequestRefresh(true);

            try
            {
                await Task.Delay(Interval, token);
            }
            catch (OperationCanceledException)
            {
                break;
            }
        }
    }

    private async Task CheckAsync(CancellationToken token)
    {
        try
        {
            var settings = await SettingsService.Instance.GetAsync();
            var devices = settings.Devices;

            var results = await Task.WhenAll(devices.Select(async device =>
                (device.Id, Alive: await ForwardClient.IsAliveAsync(device, token))));

            foreach (var (id, alive) in results)
                _online[id] = alive;

            _checkedAt = Environment.TickCount64;
            Publish();
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "Failed to check which paired devices are reachable");
        }
        finally
        {
            lock (_gate)
                _checking = false;
        }
    }

    /// <summary>Publishes the state only when it differs from the last one every window saw.</summary>
    private void Publish()
    {
        var payload = Snapshot();
        var key = string.Join(',', payload.Online);
        if (key == _published)
            return;

        _published = key;
        Log.Debug("Paired devices that answer right now: {Ids}", key.Length == 0 ? "none" : key);
        WindowManager.Instance.BroadcastEventIfReady("forward.presence", payload);
    }

    /// <summary>Callers hold <see cref="_gate" />.</summary>
    private void StartLoop()
    {
        var cts = new CancellationTokenSource();
        _loopCts = cts;
        _ = Task.Run(() => LoopAsync(cts.Token));
    }

    /// <summary>Callers hold <see cref="_gate" />.</summary>
    private void StopLoop()
    {
        _loopCts?.Cancel();
        _loopCts?.Dispose();
        _loopCts = null;
    }
}