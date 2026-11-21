using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using PhotinoNetUtils.Hosting;
using PhotinoNetUtils.Messaging;
using URLCheck.Filters;
using URLCheck.Messaging;
using URLCheck.Scripting;

namespace URLCheck.Services;

/// <summary>
///     The data plane for the two lists that grow with use: the intercepted URLs and the effective
///     filter rules. Commands and small settings stay on the message bridge.
/// </summary>
internal static class DataRoutes
{
    public const ushort HistoryKind = 1;
    public const ushort FilterRulesKind = 2;
    public const ushort ScriptsKind = 3;
    public const ushort ScriptLogsKind = 4;

    public static void Map(WebApplication app, string token)
    {
        app.MapGet($"/data/{token}/history", (Delegate)(async (HttpContext context) =>
        {
            var entries = await HistoryService.Instance.DataEntriesAsync(500, context.RequestAborted);

            var block = new DataBlock(HistoryKind)
                .Text("url")
                .Number("id")
                .Number("timestamp");

            foreach (var entry in entries)
                block.Row([entry.Url], entry.Id, entry.Timestamp);

            return DataBlockResults.Block(block);
        }));

        app.MapGet($"/data/{token}/filter-rules", (Delegate)(async (HttpContext context) =>
        {
            var rules = await FilterService.Instance.DataRulesAsync(context.RequestAborted);

            var block = new DataBlock(FilterRulesKind)
                .Text("pattern")
                .Text("urlPattern")
                .Text("include")
                .Text("exclude")
                .Text("urlExceptions")
                .Number("regex");

            foreach (var rule in rules)
                block.Row(
                    [
                        rule.Pattern,
                        rule.UrlPattern ?? "",
                        Join(rule.Include),
                        Join(rule.Exclude),
                        Join(rule.UrlExceptions)
                    ],
                    rule.Regex ? 1 : 0);

            return DataBlockResults.Block(block);
        }));

        app.MapGet($"/data/{token}/scripts", (Delegate)(async (HttpContext _) =>
        {
            await ScriptEngine.Instance.ReloadIfChangedAsync();

            var block = new DataBlock(ScriptsKind)
                .Meta("directory", ScriptEngine.ScriptsDirectory)
                .Text("name")
                .Text("modified")
                .Text("error")
                .Text("version")
                .Text("updateUrl")
                .Number("size");

            foreach (var script in ScriptEngine.Instance.List())
                block.Row(
                    [
                        script.Name,
                        script.Modified.ToString("O"),
                        script.Error ?? "",
                        script.Version ?? "",
                        script.UpdateUrl ?? ""
                    ],
                    script.Size);

            return DataBlockResults.Block(block);
        }));

        app.MapGet($"/data/{token}/script-logs", (Delegate)((HttpContext _) =>
        {
            var block = new DataBlock(ScriptLogsKind)
                .Text("time")
                .Text("level")
                .Text("script")
                .Text("message");

            foreach (var entry in ScriptEngine.Instance.Logs)
                block.Row(
                    [
                        entry.Time.ToString("HH:mm:ss"),
                        entry.Level,
                        entry.Script,
                        entry.Message
                    ]);

            return DataBlockResults.Block(block);
        }));
    }

    private static string Join(IReadOnlyList<string>? values) =>
        values is { Count: > 0 } ? string.Join('\u001f', values) : "";
}

/// <summary>Answers <c>data.base</c>: where the window finds the routes above.</summary>
internal static class DataPlaneService
{
    public static string DataUrl { get; set; } = "";

    static DataPlaneService() => NativeBridge.MessageReceived += HandleMessageAsync;

    private static Task<NativeResponse?> HandleMessageAsync(NativeContext context) =>
        context.Request.Type == "data.base"
            ? Task.FromResult<NativeResponse?>(
                context.Reply("data.base.result", new DataBasePayload(DataUrl)))
            : Task.FromResult<NativeResponse?>(null);
}

/// <summary>Body for <c>data.base</c>.</summary>
internal sealed record DataBasePayload(string Base);
