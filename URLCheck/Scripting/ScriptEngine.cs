using System.Collections.Concurrent;
using System.Text;
using Lua;
using Lua.Standard;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;

namespace URLCheck.Scripting;

/// <summary>One script as the interface lists it.</summary>
internal sealed record ScriptInfo(string Name, long Size, DateTime Modified, string? Error);

/// <summary>What the scripts made of one URL, and the first failure to show in the popup.</summary>
internal sealed record ScriptOutcome(string Url, string? Error);

/// <summary>One line of what the scripts printed or failed with.</summary>
internal sealed record ScriptLogEntry(DateTime Time, string Level, string Script, string Message);

/// <summary>
///     Runs the user's Lua scripts for every URL that comes in, so they can inspect it and hand back a
///     changed one.
/// </summary>
/// <remarks>
///     Each script gets its own state, compiled once and reused: a state is not thread-safe, so runs
///     are serialized, but the parse and the compile are not paid per URL. The sandbox opens only the
///     libraries that work on text and numbers — no <c>io</c>, <c>os</c>, <c>debug</c> or
///     <c>package</c>, and no <c>dofile</c>/<c>loadfile</c>, so a script can neither read files nor
///     reach the machine.
/// </remarks>
internal sealed class ScriptEngine : Singleton<ScriptEngine>
{
    /// <summary>How long one script may run before it is cancelled; it only handles a URL.</summary>
    private static readonly TimeSpan Timeout = TimeSpan.FromSeconds(2);

    /// <summary>How many log lines are kept for the scripts page.</summary>
    private const int MaxLogEntries = 200;

    private readonly SemaphoreSlim _gate = new(1, 1);
    private readonly ConcurrentQueue<ScriptLogEntry> _logs = new();
    private readonly List<Script> _scripts = [];

    private bool _loaded;

    /// <summary>Raised for every line a script prints or fails with.</summary>
    public event Action<ScriptLogEntry>? Logged;

    /// <summary>Where the scripts live; created on demand, beside the settings file.</summary>
    public static string ScriptsDirectory => Path.Combine(Path.GetDirectoryName(Constants.LogDirectory)!, "scripts");

    /// <summary>The script a new one starts from.</summary>
    public const string Template = """
                                   -- Runs once for every URL that comes in.
                                   --
                                   -- u.url          the whole URL
                                   -- u.scheme, u.host, u.port, u.path
                                   -- u.query, u.fragment
                                   -- u.params       decoded query parameters; set one to nil to drop it
                                   -- u.app_version  the running version
                                   --
                                   -- Return u (or a URL string) to accept the changes, nil to leave the URL alone.

                                   return function(u)
                                       if u.host == "example.com" then
                                           u.params["utm_source"] = nil
                                       end

                                       return u
                                   end
                                   """;

    public IReadOnlyList<ScriptLogEntry> Logs => [.. _logs];

    /// <summary>
    ///     Runs every script over <paramref name="url" />, in file name order, and returns the URL the
    ///     last one produced, plus the first failure the interface should show. A script that fails
    ///     leaves the URL as it was.
    /// </summary>
    public async Task<ScriptOutcome> ProcessAsync(string url, string appVersion)
    {
        Load();

        if (_scripts.Count == 0)
            return new ScriptOutcome(url, null);

        await _gate.WaitAsync();

        try
        {
            var current = url;
            string? error = null;

            foreach (var script in _scripts.Where(script => script.Function is not null))
            {
                var (next, problem) = await RunAsync(script, current, appVersion);
                current = next;
                error ??= problem;
            }

            return new ScriptOutcome(current, error);
        }
        finally
        {
            _gate.Release();
        }
    }

    /// <summary>The scripts on disk, with the error each one currently has, if any.</summary>
    public IReadOnlyList<ScriptInfo> List()
    {
        Load();
        return [.. _scripts.Select(script => script.Info)];
    }

    /// <summary>The source of one script, or null when it is gone.</summary>
    public string? Read(string name) =>
        Try.Run(() => File.ReadAllText(PathFor(name))).GetOrNull();

    /// <summary>
    ///     Writes a script and reloads everything; returns the compile error when the source does not
    ///     parse, and leaves the file alone in that case.
    /// </summary>
    public async Task<string?> SaveAsync(string name, string content)
    {
        if (Validate(content) is { } error)
            return error;

        try
        {
            Directory.CreateDirectory(ScriptsDirectory);
            File.WriteAllText(PathFor(name), content);
        }
        catch (Exception ex)
        {
            return ex.Message;
        }

        await ReloadAsync();
        return null;
    }

    /// <summary>Creates a script from the template; returns an error when it already exists.</summary>
    public async Task<string?> CreateAsync(string name)
    {
        if (File.Exists(PathFor(name)))
            return "error.scriptExists";

        return await SaveAsync(name, Template);
    }

    /// <summary>Deletes a script and reloads everything.</summary>
    public async Task<bool> DeleteAsync(string name)
    {
        var deleted = Try.Run(() =>
        {
            File.Delete(PathFor(name));
            return true;
        }).GetOrElse(_ => false);

        await ReloadAsync();
        return deleted;
    }

    /// <summary>Copies a script from somewhere else on disk, after checking that it parses.</summary>
    public async Task<string?> ImportAsync(string source)
    {
        var content = Try.Run(() => File.ReadAllText(source)).GetOrNull();
        if (content is null)
            return "error.scriptUnreadable";

        return await SaveAsync(Path.GetFileName(source), content);
    }

    /// <summary>Downloads a script over http(s) and saves it under the name in the URL.</summary>
    public async Task<string?> DownloadAsync(string url, HttpClient client)
    {
        if (!Uri.TryCreate(url, UriKind.Absolute, out var uri) || uri.Scheme is not ("http" or "https"))
            return "error.invalidUrl";

        var download = await Try.Run(async () => await client.GetStringAsync(uri));

        if (download.Exception is { } exception)
            return exception.Message;

        var name = Path.GetFileName(uri.LocalPath);
        if (!name.EndsWith(".lua", StringComparison.OrdinalIgnoreCase))
            name += ".lua";

        return await SaveAsync(name, download.Value ?? "");
    }

    public void ClearLogs()
    {
        while (_logs.TryDequeue(out _))
        {
        }
    }

    /// <summary>Parses a script without running it; null when it compiles.</summary>
    private static string? Validate(string content)
    {
        var state = CreateSandbox();

        try
        {
            state.Load(content, "script");
            return null;
        }
        catch (Exception ex)
        {
            return ex.Message;
        }
        finally
        {
            state.Dispose();
        }
    }

    private async Task ReloadAsync()
    {
        await _gate.WaitAsync();

        try
        {
            DisposeScripts();
            _loaded = false;
            Load();
        }
        finally
        {
            _gate.Release();
        }
    }

    private async Task<(string Url, string? Error)> RunAsync(Script script, string url, string appVersion)
    {
        using var timeout = new CancellationTokenSource(Timeout);

        try
        {
            if (script.State is not { } state || script.Function is not { } function)
                return (url, null);

            var context = BuildContext(url, appVersion);
            var results = await state.CallAsync(function, [context.Table], timeout.Token);
            if (results.Length == 0)
                return (url, null);

            var result = results[0];

            if (result.TryRead<string>(out var text))
                return (Report(script, url, text), null);

            if (result.TryRead<LuaTable>(out var table))
                return (Report(script, url, BuildUrl(table, url, context.Order)), null);

            return (url, null);
        }
        catch (Exception ex)
        {
            Write("error", script.Name, ex.Message);
            Serilog.Log.Warning(ex, "Lua script {Script} failed for {Url}", script.Name, url);
            return (url, $"{script.Name}: {ex.Message}");
        }
    }

    private static string Report(Script script, string from, string to)
    {
        if (to == from)
            return to;

        Serilog.Log.Information("Lua script {Script} changed {From} to {To}", script.Name, from, to);
        return to;
    }

    private void Write(string level, string script, string message)
    {
        var entry = new ScriptLogEntry(DateTime.Now, level, script, message);

        _logs.Enqueue(entry);
        while (_logs.Count > MaxLogEntries)
            _logs.TryDequeue(out _);

        Try.Run(() => Logged?.Invoke(entry)).OnFailure(_ => { });
    }

    /// <summary>Parses the URL into the table a script sees, and remembers the parameter order.</summary>
    private static Context BuildContext(string url, string appVersion)
    {
        var table = new LuaTable();
        table["url"] = url;
        table["app_version"] = appVersion;

        var parameters = new LuaTable();
        table["params"] = parameters;

        var order = new List<string>();

        if (!Uri.TryCreate(url, UriKind.Absolute, out var uri))
            return new(table, order);

        table["scheme"] = uri.Scheme;
        table["host"] = uri.Host;
        table["port"] = uri.IsDefaultPort ? LuaValue.Nil : uri.Port;
        table["path"] = uri.AbsolutePath;
        table["query"] = uri.Query.Length > 1 ? uri.Query[1..] : LuaValue.Nil;
        table["fragment"] = uri.Fragment.Length > 1 ? uri.Fragment[1..] : LuaValue.Nil;

        foreach (var (name, value) in ReadParameters(uri.Query))
        {
            if (!order.Contains(name))
                order.Add(name);

            parameters[name] = value;
        }

        return new(table, order);
    }

    /// <summary>The query pairs of a URL, decoded; a parameter that repeats keeps its last value.</summary>
    private static IEnumerable<(string Name, string Value)> ReadParameters(string query)
    {
        foreach (var pair in query.TrimStart('?').Split('&', StringSplitOptions.RemoveEmptyEntries))
        {
            var equals = pair.IndexOf('=');
            var name = Decode(equals < 0 ? pair : pair[..equals]);
            var value = equals < 0 ? "" : Decode(pair[(equals + 1)..]);

            if (name.Length > 0)
                yield return (name, value);
        }

        static string Decode(string value) =>
            Try.Run(() => Uri.UnescapeDataString(value.Replace("+", " "))).GetOrElse(_ => value);
    }

    /// <summary>Reassembles a URL from the table a script returned.</summary>
    private static string BuildUrl(LuaTable table, string original, List<string> order)
    {
        if (!table["scheme"].TryRead<string>(out var scheme) || !table["host"].TryRead<string>(out var host) ||
            scheme.Length == 0 || host.Length == 0)
            return original;

        var builder = new StringBuilder().Append(scheme).Append("://").Append(host);

        if (table["port"].TryRead<double>(out var port) && port is > 0 and <= 65535)
            builder.Append(':').Append((int)port);

        var path = table["path"].TryRead<string>(out var value) ? value : "/";
        builder.Append(path.StartsWith('/') ? path : $"/{path}");

        var query = BuildQuery(table, order);
        if (query.Length > 0)
            builder.Append('?').Append(query);

        if (table["fragment"].TryRead<string>(out var fragment) && fragment.Length > 0)
            builder.Append('#').Append(fragment);

        return builder.ToString();
    }

    /// <summary>
    ///     The query the script left behind: the parameters that were there keep their order, anything
    ///     it added follows in name order, so the same input always gives the same URL.
    /// </summary>
    private static string BuildQuery(LuaTable table, List<string> order)
    {
        if (!table["params"].TryRead<LuaTable>(out var parameters))
            return "";

        var values = new Dictionary<string, string>(StringComparer.Ordinal);

        foreach (var pair in parameters)
        {
            if (pair.Key.TryRead<string>(out var name) && name.Length > 0)
                values[name] = pair.Value.TryRead<string>(out var text) ? text : pair.Value.ToString();
        }

        var parts = new List<string>(values.Count);

        foreach (var name in order)
            if (values.Remove(name, out var value))
                parts.Add($"{Uri.EscapeDataString(name)}={Uri.EscapeDataString(value)}");

        foreach (var (name, value) in values.OrderBy(pair => pair.Key, StringComparer.Ordinal))
            parts.Add($"{Uri.EscapeDataString(name)}={Uri.EscapeDataString(value)}");

        return string.Join("&", parts);
    }

    /// <summary>Loads every script in the folder once; a broken one is listed with its error.</summary>
    private void Load()
    {
        if (_loaded)
            return;

        _loaded = true;

        var files = Try.Run(() =>
        {
            Directory.CreateDirectory(ScriptsDirectory);
            return Directory.EnumerateFiles(ScriptsDirectory, "*.lua")
                .OrderBy(path => path, StringComparer.Ordinal)
                .ToArray();
        }).GetOrElse(ex =>
        {
            Serilog.Log.Warning(ex, "Could not read the script folder {Path}", ScriptsDirectory);
            return [];
        });

        foreach (var path in files)
            _scripts.Add(LoadScript(path));

        if (_scripts.Count > 0)
            Serilog.Log.Information("Loaded {Count} Lua script(s) from {Path}", _scripts.Count, ScriptsDirectory);
        else
            Serilog.Log.Debug("No Lua scripts in {Path}", ScriptsDirectory);
    }

    private Script LoadScript(string path)
    {
        var name = Path.GetFileName(path);
        var info = new FileInfo(path);
        var state = CreateSandbox();

        try
        {
            var chunk = state.Load(File.ReadAllText(path), name);
            var results = state.ExecuteAsync(chunk).AsTask().GetAwaiter().GetResult();

            if (results.Length > 0 && results[0].TryRead<LuaFunction>(out var function))
                return new Script(name, state, function, info);

            return new Script(name, state, null, info, "error.scriptNoFunction");
        }
        catch (Exception ex)
        {
            Serilog.Log.Warning(ex, "Lua script {Script} could not be loaded", name);
            state.Dispose();
            return new Script(name, null, null, info, ex.Message);
        }
    }

    private void DisposeScripts()
    {
        foreach (var script in _scripts)
            script.State?.Dispose();

        _scripts.Clear();
    }

    /// <summary>
    ///     A state that can work on text and numbers and nothing else: no file access, no OS calls, no
    ///     debug hooks and no module loader.
    /// </summary>
    private static LuaState CreateSandbox()
    {
        var state = LuaState.Create();

        state.OpenBasicLibrary();
        state.OpenStringLibrary();
        state.OpenTableLibrary();
        state.OpenMathLibrary();
        state.OpenBitwiseLibrary();
        state.OpenCoroutineLibrary();

        // dofile and loadfile read through the host's file system; a script only gets a URL.
        state.Environment["dofile"] = LuaValue.Nil;
        state.Environment["loadfile"] = LuaValue.Nil;

        state.Environment["print"] = new LuaFunction((context, _) =>
        {
            var parts = new List<string>(context.ArgumentCount);

            for (var index = 0; index < context.ArgumentCount; index++)
                parts.Add(context.GetArgument(index).ToString() ?? "");

            Instance.Write("info", "print", string.Join("\t", parts));
            return new(0);
        });

        return state;
    }

    private static string PathFor(string name) => Path.Combine(ScriptsDirectory, Path.GetFileName(name));

    private sealed record Context(LuaTable Table, List<string> Order);

    private sealed record Script(string Name, LuaState? State, LuaFunction? Function, FileInfo File, string? Error = null)
    {
        public ScriptInfo Info =>
            new(Name, File.Exists ? File.Length : 0, File.Exists ? File.LastWriteTime : default,
                Error ?? (Function is null ? "error.scriptNoFunction" : null));
    }
}
