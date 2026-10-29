using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Utils;
using URLCheck.Messaging;

namespace URLCheck.Services;

/// <summary>
///     Answers the <c>app.updateStatus</c> and <c>app.checkUpdate</c> messages by reading the tiny
///     version file the release workflow publishes. The file is served as plain text from the
///     repository, so a check costs one small download and never touches the GitHub API or its rate
///     limit.
/// </summary>
internal sealed class UpdateService : Singleton<UpdateService>
{
    /// <summary>Written by the release workflow and updated with every tagged build.</summary>
    private const string VersionUrl =
        "https://github.com/T2PeNBiX99wcoxKv3A4g/URLCheck/raw/refs/heads/master/.version";

    /// <summary>Shorter than the bridge's own request timeout, so the button always gets an answer.</summary>
    private static readonly HttpClient Client = new() { Timeout = TimeSpan.FromSeconds(8) };

    /// <summary>How long an answer is reused. The sidebar asks on every start; the button forces one.</summary>
    private static readonly TimeSpan CacheLifetime = TimeSpan.FromHours(6);

    private readonly SemaphoreSlim _gate = new(1, 1);
    private UpdateCheckPayload? _cached;
    private DateTime _cachedAt;

    public UpdateService() => NativeBridge.MessageReceived += HandleMessageAsync;

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "app.updateStatus" => StatusAsync(context),
        "app.checkUpdate" => CheckAsync(context),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    /// <summary>
    ///     The automatic check: answers from the cache, and only reads the version file when there is
    ///     nothing recent to answer with. A failure stays silent, since nobody asked for it.
    /// </summary>
    private async Task<NativeResponse?> StatusAsync(NativeContext context) =>
        context.Reply("app.updateStatus.result", await ResolveAsync(force: false));

    /// <summary>The check the user asked for: always reads the version file, and reports a failure.</summary>
    private async Task<NativeResponse?> CheckAsync(NativeContext context) =>
        await ResolveAsync(force: true) is { } result
            ? context.Reply("app.checkUpdate.result", result)
            : context.Fail("app.checkUpdate.result", "error.updateCheckFailed");

    /// <summary>The fresh or cached answer, or null when the version file cannot be read.</summary>
    private async Task<UpdateCheckPayload?> ResolveAsync(bool force)
    {
        await _gate.WaitAsync();
        try
        {
            if (!force && _cached is { } cached && DateTime.UtcNow - _cachedAt < CacheLifetime)
                return cached;

            var published = await Try.Run(ReadPublishedVersionAsync);

            if (published.Exception is { } exception)
            {
                Log.Warning(exception, "Failed to check for a newer version");
                return null;
            }

            if (published.Value is not { Length: > 0 } latest)
                return null;

            var current = AppInfoService.Version;
            _cachedAt = DateTime.UtcNow;
            _cached = new UpdateCheckPayload(current, latest, IsNewer(latest, current));

            // A check the user started elsewhere updates the dot in the sidebar as well.
            WindowManager.Instance.NotifyMainWindow("app.update", _cached);
            return _cached;
        }
        finally
        {
            _gate.Release();
        }
    }

    /// <summary>Reads the version file and keeps its first non-empty line, which is the version.</summary>
    private static async Task<string> ReadPublishedVersionAsync()
    {
        using var response = await Client.GetAsync(VersionUrl);
        response.EnsureSuccessStatusCode();

        var text = await response.Content.ReadAsStringAsync();
        var line = text.Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .FirstOrDefault() ?? string.Empty;

        // The workflow may prefix the tag; either form is the same version.
        return line.TrimStart('v', 'V');
    }

    /// <summary>
    ///     True when the published version is higher than the running one. An unreadable version is
    ///     treated as not newer, so a broken file never pushes the user to download anything.
    /// </summary>
    private bool IsNewer(string latest, string current) =>
        Try.Run(() => Version.Parse(latest) > Version.Parse(current)).GetOrElse(exception =>
        {
            Log.Debug(exception, "Could not compare versions {Latest} and {Current}", latest, current);
            return false;
        });
}
