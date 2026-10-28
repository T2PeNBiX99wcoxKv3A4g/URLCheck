using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;
using URLCheck.Messaging;

namespace URLCheck.Services;

/// <summary>
///     Answers the <c>app.checkUpdate</c> message by reading the tiny version file the release
///     workflow publishes. The file is served as plain text from the repository, so a check costs one
///     small download and never touches the GitHub API or its rate limit.
/// </summary>
internal sealed class UpdateService : Singleton<UpdateService>
{
    /// <summary>Written by the release workflow and updated with every tagged build.</summary>
    private const string VersionUrl =
        "https://github.com/T2PeNBiX99wcoxKv3A4g/URLCheck/raw/refs/heads/master/.version";

    /// <summary>Shorter than the bridge's own request timeout, so the button always gets an answer.</summary>
    private static readonly HttpClient Client = new() { Timeout = TimeSpan.FromSeconds(8) };

    public UpdateService() => NativeBridge.MessageReceived += HandleMessageAsync;

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) =>
        context.Request.Type == "app.checkUpdate" ? CheckAsync(context) : Task.FromResult<NativeResponse?>(null);

    private async Task<NativeResponse?> CheckAsync(NativeContext context)
    {
        var published = await Try.Run(ReadPublishedVersionAsync);

        if (published.Exception is { } exception)
        {
            Log.Warning(exception, "Failed to check for a newer version");
            return context.Fail("app.checkUpdate.result",
                exception is TaskCanceledException ? "error.timeout" : "error.updateCheckFailed");
        }

        if (published.Value is not { Length: > 0 } latest)
            return context.Fail("app.checkUpdate.result", "error.updateCheckFailed");

        var current = AppInfoService.Version;
        return context.Reply("app.checkUpdate.result",
            new UpdateCheckPayload(current, latest, IsNewer(latest, current)));
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
