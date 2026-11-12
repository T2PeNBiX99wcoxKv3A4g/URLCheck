using System.Text.RegularExpressions;
using PhotinoNetUtils.Messaging;
using URLCheck.Messaging;

namespace URLCheck.Scripting;

/// <summary>
///     Answers the <c>scripts.checkUpdates</c> and <c>scripts.update</c> messages. A script opts in by
///     setting two globals while it loads; the app reads them once and never executes the remote copy
///     during a check.
/// </summary>
[Singleton]
internal partial class ScriptUpdates
{
    /// <summary>A URL script is small; anything larger is not one.</summary>
    private const int MaxBytes = 512 * 1024;

    private const int MaxErrorLength = 300;

    private static readonly HttpClient Client = new()
    {
        Timeout = TimeSpan.FromSeconds(10)
    };

    /// <summary>
    ///     The literal <c>scriptVersion = "..."</c> in the remote file. Only the text is read: a check
    ///     must not run code that has not been installed yet.
    /// </summary>
    private static readonly Regex VersionPattern = new(
        @"(?m)^[ \t]*scriptVersion[ \t]*=[ \t]*(?:""(?<value>[^""]*)""|'(?<value>[^']*)')",
        RegexOptions.Compiled);

    private ScriptUpdates() => NativeBridge.MessageReceived += HandleMessageAsync;

    private static Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "scripts.checkUpdates" => CheckAsync(context),
        "scripts.update" => UpdateAsync(context),
        "scripts.updateAll" => UpdateAllAsync(context),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    private static async Task<NativeResponse?> CheckAsync(NativeContext context) =>
        context.Reply("scripts.checkUpdates.result", new ScriptUpdatesPayload(await CheckAllAsync()));

    private static async Task<NativeResponse?> UpdateAsync(NativeContext context)
    {
        var payload = context.Payload<ScriptUpdateRequest>();
        if (payload?.Name is not { Length: > 0 } name || Find(name) is not { } script)
            return context.Reply("scripts.update.result", new ScriptResultPayload(false, "error.scriptMissing"));

        var result = await Try.Run(() => UpdateOneAsync(script, payload.Force));
        var error = result.Exception is { } exception ? Describe(exception) : result.Value;

        if (error is null)
            Serilog.Log.Information("Updated Lua script {Script}", name);

        return context.Reply("scripts.update.result", new ScriptResultPayload(error is null, error));
    }

    private static async Task<NativeResponse?> UpdateAllAsync(NativeContext context)
    {
        var updates = await CheckAllAsync();
        var updated = 0;
        var failed = 0;

        foreach (var entry in updates.Where(entry => entry.Available))
        {
            if (Find(entry.Name) is not { } script)
            {
                failed++;
                continue;
            }

            var result = await Try.Run(() => UpdateOneAsync(script, false));
            if (result.Exception is null && result.Value is null)
                updated++;
            else
                failed++;
        }

        Serilog.Log.Information("Updated {Updated} Lua script(s); {Failed} failed", updated, failed);
        return context.Reply("scripts.updateAll.result", new ScriptUpdateAllPayload(failed == 0, updated, failed, null));
    }

    /// <summary>Checks every script that declares both globals, in parallel.</summary>
    private static async Task<List<ScriptUpdateEntryPayload>> CheckAllAsync()
    {
        await ScriptEngine.Instance.ReloadIfChangedAsync();

        var checkable = ScriptEngine.Instance.List()
            .Where(script => script.UpdateUrl is not null && script.Version is not null)
            .ToArray();

        return [.. await Task.WhenAll(checkable.Select(CheckOneAsync))];
    }

    private static async Task<ScriptUpdateEntryPayload> CheckOneAsync(ScriptInfo script)
    {
        if (script.UpdateUrl is not { } updateUrl || script.Version is not { } installed)
            return new(script.Name, script.Version, null, false, false, "error.scriptUpdateNoSource");

        var local = ScriptEngine.Read(script.Name);
        var downloaded = await Try.Run(() => FetchAsync(updateUrl));

        if (downloaded.Exception is { } exception)
            return new(script.Name, installed, null, false, false, Describe(exception));

        var source = downloaded.Value ?? "";
        var latest = ReadVersion(source);

        if (latest is null)
            return new(script.Name, installed, null, false, false, "error.scriptUpdateNoVersion");

        var order = Compare(latest, installed);
        if (order is null)
            return new(script.Name, installed, latest, false, false, "error.scriptUpdateBadVersion");

        // Same version but different content means someone edited one of the two without bumping it.
        var changed = order == 0 && local is not null && !string.Equals(local, source, StringComparison.Ordinal);

        return new(script.Name, installed, latest, order > 0, changed, null);
    }

    /// <summary>Replaces one script with the version at its <c>scriptUrl</c>.</summary>
    private static async Task<string?> UpdateOneAsync(ScriptInfo script, bool force)
    {
        if (script.UpdateUrl is null || script.Version is null)
            return "error.scriptUpdateNoSource";

        var source = await FetchAsync(script.UpdateUrl);
        var latest = ReadVersion(source);

        if (latest is null)
            return "error.scriptUpdateNoVersion";

        var order = Compare(latest, script.Version);
        if (order is null)
            return "error.scriptUpdateBadVersion";

        // Never downgrade; a same-version replacement only happens when the user confirmed it.
        if (order < 0)
            return "error.scriptUpdateOlder";

        if (order == 0 && !force)
            return null;

        // SaveAsync compiles first, so a broken remote file never replaces a working one.
        return await ScriptEngine.Instance.SaveAsync(script.Name, source);
    }

    private static async Task<string> FetchAsync(string url)
    {
        if (!Uri.TryCreate(url, UriKind.Absolute, out var uri) || uri.Scheme is not ("http" or "https"))
            throw new InvalidOperationException("error.scriptUpdateBadUrl");

        using var response = await Client.GetAsync(uri);
        response.EnsureSuccessStatusCode();

        if (response.Content.Headers.ContentLength is > MaxBytes)
            throw new InvalidOperationException("error.scriptUpdateTooLarge");

        var source = await response.Content.ReadAsStringAsync();

        return source.Length > MaxBytes
            ? throw new InvalidOperationException("error.scriptUpdateTooLarge")
            : source;
    }

    private static ScriptInfo? Find(string name) =>
        ScriptEngine.Instance.List().FirstOrDefault(script => script.Name == name);

    private static string? ReadVersion(string source)
    {
        var match = VersionPattern.Match(source);
        return match.Success ? match.Groups["value"].Value.Trim() : null;
    }

    /// <summary>Compares dotted numeric versions; null when either side is not one.</summary>
    private static int? Compare(string left, string right)
    {
        var first = left.Split('.', StringSplitOptions.TrimEntries);
        var second = right.Split('.', StringSplitOptions.TrimEntries);
        var length = Math.Max(first.Length, second.Length);

        for (var index = 0; index < length; index++)
        {
            if (!int.TryParse(index < first.Length ? first[index] : "0", out var a) ||
                !int.TryParse(index < second.Length ? second[index] : "0", out var b))
                return null;

            if (a != b)
                return a.CompareTo(b);
        }

        return 0;
    }

    private static string Describe(Exception exception) =>
        exception.Message.Length > MaxErrorLength ? exception.Message[..MaxErrorLength] : exception.Message;
}