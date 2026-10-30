using System.Diagnostics;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Utils;
using URLCheck.Messaging;
using URLCheck.Services;

namespace URLCheck.Scripting;

/// <summary>
///     Answers the <c>scripts.*</c> messages: what is installed, reading and saving the source, and the
///     lines the scripts printed or failed with.
/// </summary>
internal sealed class ScriptsService : Singleton<ScriptsService>
{
    private static readonly HttpClient Client = new()
    {
        Timeout = TimeSpan.FromSeconds(30)
    };

    /// <summary>Set while a folder change is waiting to be announced, so a burst sends one event.</summary>
    private static int _announcing;

    /// <summary>
    ///     The live watcher. It has to stay referenced: an unreferenced one gets collected and then
    ///     silently stops reporting, which looks exactly like the folder never changing.
    /// </summary>
    private static FileSystemWatcher? _watcher;

    public ScriptsService()
    {
        NativeBridge.MessageReceived += HandleMessageAsync;

        // Every line a script writes is pushed to the interface as it happens, so the page does not
        // have to poll for it.
        ScriptEngine.Instance.Logged += entry => WindowManager.Instance.BroadcastEventIfReady("scripts.log",
            new ScriptLogPayload(entry.Time.ToString("HH:mm:ss"), entry.Level, entry.Script, entry.Message));

        WatchScriptsFolder();
    }

    /// <summary>
    ///     Tells the interface when the folder changes behind its back, so a script dropped in,
    ///     renamed or deleted with another program shows up without reopening the page.
    /// </summary>
    private static void WatchScriptsFolder()
    {
        var created = Try.Run(() =>
        {
            Directory.CreateDirectory(ScriptEngine.ScriptsDirectory);

            var folder = new FileSystemWatcher(ScriptEngine.ScriptsDirectory, "*.lua")
            {
                NotifyFilter = NotifyFilters.FileName | NotifyFilters.LastWrite | NotifyFilters.Size,
                IncludeSubdirectories = false
            };

            folder.Created += (_, _) => Announce();
            folder.Changed += (_, _) => Announce();
            folder.Deleted += (_, _) => Announce();
            folder.Renamed += (_, _) => Announce();
            folder.EnableRaisingEvents = true;

            return folder;
        });

        if (created.Exception is { } exception)
        {
            Serilog.Log.Warning(exception, "Could not watch the script folder {Path}", ScriptEngine.ScriptsDirectory);
            return;
        }

        _watcher = created.Value;
    }

    /// <summary>A save is several file events; they collapse into one reload and refresh.</summary>
    private static void Announce()
    {
        if (Interlocked.Exchange(ref _announcing, 1) == 1)
            return;

        _ = Task.Run(async () =>
        {
            try
            {
                await Task.Delay(250);
                await ScriptEngine.Instance.ReloadIfChangedAsync();
                WindowManager.Instance.BroadcastEventIfReady("scripts.changed", new OkPayload());
            }
            finally
            {
                Interlocked.Exchange(ref _announcing, 0);
            }
        });
    }

    private static Task<NativeResponse?> HandleMessageAsync(NativeContext context) =>
        context.Request.Type switch
        {
            "scripts.list" => ListAsync(context),

            "scripts.read" => Task.FromResult(Read(context)),
            "scripts.save" => SaveAsync(context),
            "scripts.create" => CreateAsync(context),
            "scripts.delete" => DeleteAsync(context),
            "scripts.rename" => RenameAsync(context),
            "scripts.import" => ImportAsync(context),
            "scripts.download" => DownloadAsync(context),
            "scripts.open" => Task.FromResult(Open(context)),
            "scripts.test" => TestAsync(context),

            "scripts.logs" => Task.FromResult<NativeResponse?>(context.Reply("scripts.logs.result",
                new ScriptLogsPayload([.. ScriptEngine.Instance.Logs.Select(ToPayload)]))),

            "scripts.clearLogs" => Task.FromResult(ClearLogs(context)),

            _ => Task.FromResult<NativeResponse?>(null)
        };

    private static ScriptEntryPayload Entry(ScriptInfo script) =>
        new(script.Name, script.Size, script.Modified, script.Error);

    private static async Task<NativeResponse?> ListAsync(NativeContext context)
    {
        await ScriptEngine.Instance.ReloadIfChangedAsync();

        return context.Reply("scripts.list.result",
            new ScriptListPayload([.. ScriptEngine.Instance.List().Select(Entry)], ScriptEngine.ScriptsDirectory));
    }

    private static ScriptLogPayload ToPayload(ScriptLogEntry entry) =>
        new(entry.Time.ToString("HH:mm:ss"), entry.Level, entry.Script, entry.Message);

    private static NativeResponse? Read(NativeContext context)
    {
        var name = context.Payload<ScriptNameRequest>()?.Name;
        var content = name is { Length: > 0 } ? ScriptEngine.Read(name) : null;

        return content is null
            ? context.Fail("scripts.read.result", "error.scriptMissing")
            : context.Reply("scripts.read.result", new ScriptContentPayload(name!, content));
    }

    private static async Task<NativeResponse?> SaveAsync(NativeContext context)
    {
        var payload = context.Payload<ScriptSaveRequest>();
        if (payload?.Name is not { Length: > 0 } name || payload.Content is null)
            return context.Fail("scripts.save.result", "error.invalidScript");

        return Result(context, "scripts.save.result", await ScriptEngine.Instance.SaveAsync(name, payload.Content));
    }

    private static async Task<NativeResponse?> CreateAsync(NativeContext context)
    {
        var name = context.Payload<ScriptNameRequest>()?.Name;
        if (name is not { Length: > 0 })
            return context.Fail("scripts.create.result", "error.invalidScript");

        var error = await ScriptEngine.Instance.CreateAsync(name.EndsWith(".lua", StringComparison.OrdinalIgnoreCase)
            ? name
            : $"{name}.lua");

        return Result(context, "scripts.create.result", error);
    }

    private static async Task<NativeResponse?> DeleteAsync(NativeContext context)
    {
        var name = context.Payload<ScriptNameRequest>()?.Name;
        if (name is not { Length: > 0 })
            return context.Fail("scripts.delete.result", "error.scriptMissing");

        return Result(context, "scripts.delete.result",
            await ScriptEngine.Instance.DeleteAsync(name) ? null : "error.scriptMissing");
    }

    private static async Task<NativeResponse?> RenameAsync(NativeContext context)
    {
        var payload = context.Payload<ScriptRenameRequest>();
        if (payload?.Name is not { Length: > 0 } name || payload.NewName is not { Length: > 0 } newName)
            return context.Fail("scripts.rename.result", "error.invalidScript");

        var target = newName.EndsWith(".lua", StringComparison.OrdinalIgnoreCase) ? newName : $"{newName}.lua";

        return Result(context, "scripts.rename.result",
            await ScriptEngine.Instance.RenameAsync(name, target));
    }

    private static async Task<NativeResponse?> ImportAsync(NativeContext context)
    {
        var files = await WindowManager.Instance.PickFilesAsync();
        if (files.Length == 0)
            return Result(context, "scripts.import.result", null);

        string? error = null;

        foreach (var file in files)
            error = await ScriptEngine.Instance.ImportAsync(file) ?? error;

        return Result(context, "scripts.import.result", error);
    }

    private static async Task<NativeResponse?> DownloadAsync(NativeContext context)
    {
        var url = context.Payload<ScriptDownloadRequest>()?.Url;
        if (url is not { Length: > 0 })
            return context.Fail("scripts.download.result", "error.invalidUrl");

        return Result(context, "scripts.download.result",
            await ScriptEngine.Instance.DownloadAsync(url, Client));
    }

    /// <summary>Opens the script's file with whatever the system has registered for .lua files.</summary>
    private static NativeResponse? Open(NativeContext context)
    {
        var name = context.Payload<ScriptNameRequest>()?.Name;
        var path = name is { Length: > 0 } ? ScriptEngine.PathFor(name) : null;

        if (path is null || !File.Exists(path))
            return context.Fail("scripts.open.result", "error.scriptMissing");

        var started = Try.Run(() => Process.Start(new ProcessStartInfo(path)
        {
            UseShellExecute = true
        }));

        if (started.Exception is not { } exception)
            return context.Reply("scripts.open.result", new OkPayload());

        Constants.Logger.Warning(exception, "Failed to open {Script} with the system handler", path);
        return context.Fail("scripts.open.result", "error.openFailed");
    }

    /// <summary>Runs the script over a URL without opening anything, for the test box.</summary>
    private static async Task<NativeResponse?> TestAsync(NativeContext context)
    {
        var payload = context.Payload<ScriptTestRequest>();
        if (payload?.Name is not { Length: > 0 } name || payload.Url is not { Length: > 0 } url)
            return context.Fail("scripts.test.result", "error.invalidScript");

        var result = await ScriptEngine.Instance.TestAsync(name, url, AppInfoService.Version, payload.Content);

        return context.Reply("scripts.test.result", new ScriptTestPayload(result.Url, result.Error));
    }

    private static NativeResponse? ClearLogs(NativeContext context)
    {
        ScriptEngine.Instance.ClearLogs();
        return context.Reply("scripts.clearLogs.result", new OkPayload());
    }

    private static NativeResponse Result(NativeContext context, string type, string? error) =>
        context.Reply(type, new ScriptResultPayload(error is null, error));
}