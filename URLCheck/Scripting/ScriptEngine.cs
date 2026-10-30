using System.Collections.Concurrent;
using System.Globalization;
using System.Text;
using JetBrains.Annotations;
using Lua;
using Lua.Standard;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;

namespace URLCheck.Scripting;

/// <summary>One script as the interface lists it.</summary>
internal sealed record ScriptInfo(string Name, long Size, DateTime Modified, string? Error);

/// <summary>What the scripts made of one URL, and the first failure to show in the popup.</summary>
internal sealed record ScriptOutcome(string Url, string? Error);

/// <summary>What one test run made of a URL: the URL it produced, and the failure if there was one.</summary>
internal sealed record ScriptTestResult(string Url, string? Error);

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
    /// <summary>How many log lines are kept for the scripts page.</summary>
    private const int MaxLogEntries = 200;

    /// <summary>How deep <c>print</c> walks nested tables before it stops; a cycle stops it anyway.</summary>
    private const int MaxPrintDepth = 6;

    /// <summary>The script a new one starts from.</summary>
    [PublicAPI] public const string Template = """
                                               -- Runs once for every URL that comes in.
                                               --
                                               -- u.url          the whole URL, decoded
                                               -- u.scheme, u.host, u.port, u.path
                                               -- u.fragment
                                               -- u.query        decoded query parameters as a table; set one to nil to drop it
                                               -- u.app_version  the running version
                                               --
                                               -- Everything arrives URL-decoded; the URL is encoded again on the way out.
                                               -- Return u (or a URL string) to accept the changes, nil to leave the URL alone.

                                               return function(u)
                                                   if u.host == "example.com" then
                                                       u.query["utm_source"] = nil
                                                   end

                                                   return u
                                               end
                                               """;

    /// <summary>How long one script may run before it is cancelled; it only handles a URL.</summary>
    private static readonly TimeSpan Timeout = TimeSpan.FromSeconds(2);

    private readonly SemaphoreSlim _gate = new(1, 1);
    private readonly ConcurrentQueue<ScriptLogEntry> _logs = new();
    private readonly List<Script> _scripts = [];

    private bool _loaded;

    /// <summary>The folder as it was when the scripts were loaded, so a stale list can be spotted.</summary>
    private string _signature = "";

    /// <summary>Two list requests can arrive together; only one of them may load the folder.</summary>
    private readonly Lock _loadLock = new();

    /// <summary>Where the scripts live; created on demand, beside the settings file.</summary>
    public static string ScriptsDirectory => Path.Combine(Path.GetDirectoryName(Constants.LogDirectory)!, "scripts");

    public IReadOnlyList<ScriptLogEntry> Logs => [.. _logs];

    /// <summary>Raised for every line a script prints or fails with.</summary>
    public event Action<ScriptLogEntry>? Logged;

    /// <summary>
    ///     Runs every script over <paramref name="url" />, in file name order, and returns the URL the
    ///     last one produced, plus the first failure the interface should show. A script that fails
    ///     leaves the URL as it was.
    /// </summary>
    public async Task<ScriptOutcome> ProcessAsync(string url, string appVersion)
    {
        Load();

        if (_scripts.Count == 0)
            return new(url, null);

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

            return new(current, error);
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

    /// <summary>
    ///     Runs one script over <paramref name="url" /> without touching the popup, and reports what it
    ///     handed back plus everything it printed, so the scripts page can show it inline. When
    ///     <paramref name="source" /> is given it is compiled instead of the copy on disk, so the test
    ///     runs exactly what the editor shows.
    /// </summary>
    public async Task<ScriptTestResult> TestAsync(string name, string url, string appVersion, string? source)
    {
        await _gate.WaitAsync();

        LuaState? state = null;

        try
        {
            Script script;

            if (source is null)
            {
                Load();
                var saved = _scripts.FirstOrDefault(candidate => candidate.Name == name);

                if (saved is null)
                    return new(url, "error.scriptMissing");

                if (saved.Function is null)
                    return new(url, saved.Info.Error);

                script = saved;
            }
            else
            {
                var (compiled, function, error) = Compile(name, source);
                state = compiled;

                if (state is null || function is null)
                    return new(url, error ?? "error.scriptNoFunction");

                script = new(name, state, function, new(PathFor(name)));
            }

            var (next, problem) = await RunAsync(script, url, appVersion);
            return new(next, problem);
        }
        finally
        {
            state?.Dispose();
            _gate.Release();
        }
    }

    /// <summary>The source of one script, or null when it is gone.</summary>
    public static string? Read(string name) =>
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
            await File.WriteAllTextAsync(PathFor(name), content);
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

    /// <summary>
    ///     Renames a script on disk; returns an error when the old one is gone or the new name is
    ///     taken. A rename that only changes the case is left alone, because Windows treats the two
    ///     paths as the same file.
    /// </summary>
    public async Task<string?> RenameAsync(string name, string newName)
    {
        var from = PathFor(name);
        var to = PathFor(newName);

        if (string.Equals(from, to, StringComparison.OrdinalIgnoreCase))
            return null;

        if (!File.Exists(from))
            return "error.scriptMissing";

        if (File.Exists(to))
            return "error.scriptExists";

        var moved = Try.Run(() =>
        {
            File.Move(from, to);
            return true;
        });

        if (moved.Exception is { } exception)
            return exception.Message;

        await ReloadAsync();
        return null;
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
        var state = CreateSandbox("script");

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

    /// <summary>Drops the compiled scripts and reads the folder again; used when it changes on disk.</summary>
    public async Task ReloadAsync()
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
                return (Report(script, url, EncodeUrl(text)), null);

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
        var table = new LuaTable
        {
            ["url"] = Unescape(url),
            ["app_version"] = appVersion
        };

        var parameters = new LuaTable();
        table["query"] = parameters;

        var order = new List<string>();

        if (!Uri.TryCreate(url, UriKind.Absolute, out var uri))
            return new(table, order);

        table["scheme"] = uri.Scheme;
        table["host"] = uri.Host;
        table["port"] = uri.IsDefaultPort ? LuaValue.Nil : uri.Port;
        table["path"] = Unescape(uri.AbsolutePath);
        table["fragment"] = uri.Fragment.Length > 1 ? Unescape(uri.Fragment[1..]) : LuaValue.Nil;

        foreach (var (name, value) in ReadParameters(uri.Query))
        {
            if (!order.Contains(name))
                order.Add(name);

            parameters[name] = value;
        }

        return new(table, order);
    }

    /// <summary>Percent-decodes text; a sequence that cannot be decoded is left as it was.</summary>
    private static string Unescape(string value) =>
        Try.Run(() => Uri.UnescapeDataString(value)).GetOrElse(_ => value);

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

        static string Decode(string value) => Unescape(value.Replace("+", " "));
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
        builder.Append(EncodePath(path));

        var query = BuildQuery(table, order);
        if (query.Length > 0)
            builder.Append('?').Append(query);

        if (table["fragment"].TryRead<string>(out var fragment) && fragment.Length > 0)
            builder.Append('#').Append(Uri.EscapeDataString(fragment));

        return builder.ToString();
    }

    /// <summary>Escapes one path segment at a time, so the slashes stay separators.</summary>
    private static string EncodePath(string path) =>
        $"/{string.Join('/', path.TrimStart('/').Split('/').Select(Uri.EscapeDataString))}";

    /// <summary>
    ///     Escapes the characters a URL cannot carry and leaves its structure alone. Used for a URL a
    ///     script handed back as a string, which it saw decoded.
    /// </summary>
    private static string EncodeUrl(string value)
    {
        var builder = new StringBuilder(value.Length);

        foreach (var rune in value.EnumerateRunes())
        {
            if (rune.Value is > 0x20 and < 0x7F && "\"<>\\^`{|}".IndexOf((char)rune.Value) < 0)
                builder.Append((char)rune.Value);
            else
                builder.Append(Uri.EscapeDataString(rune.ToString()));
        }

        return builder.ToString();
    }

    /// <summary>
    ///     The query the script left behind: the parameters that were there keep their order, anything
    ///     it added follows in name order, so the same input always gives the same URL.
    /// </summary>
    private static string BuildQuery(LuaTable table, List<string> order)
    {
        if (!table["query"].TryRead<LuaTable>(out var parameters))
            return "";

        var values = new Dictionary<string, string>(StringComparer.Ordinal);

        foreach (var pair in parameters)
            if (pair.Key.TryRead<string>(out var name) && name.Length > 0)
                values[name] = pair.Value.TryRead<string>(out var text) ? text : pair.Value.ToString();

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
        lock (_loadLock)
        {
            if (_loaded)
                return;

            _loaded = true;

            var files = ReadFolder();
            _signature = Signature(files);

            foreach (var path in files)
                _scripts.Add(LoadScript(path));

            if (_scripts.Count > 0)
                Serilog.Log.Information("Loaded {Count} Lua script(s) from {Path}", _scripts.Count, ScriptsDirectory);
            else
                Serilog.Log.Debug("No Lua scripts in {Path}", ScriptsDirectory);
        }
    }

    /// <summary>
    ///     Reloads when the folder no longer matches what was loaded. The file watcher normally does
    ///     this, but it can miss events (and a list request is cheap), so the list stays honest.
    /// </summary>
    public async Task ReloadIfChangedAsync()
    {
        Load();

        if (Signature(ReadFolder()) == _signature)
            return;

        await ReloadAsync();
    }

    /// <summary>The .lua files in the folder, in the order they are run.</summary>
    private static string[] ReadFolder() =>
        Try.Run(() =>
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

    /// <summary>Names, sizes and write times, so two folder scans can be compared cheaply.</summary>
    private static string Signature(IEnumerable<string> files) =>
        Try.Run(() => string.Join('|', files.Select(path =>
        {
            var info = new FileInfo(path);
            return $"{info.Name}:{info.Length}:{info.LastWriteTimeUtc.Ticks}";
        }))).GetOrElse(_ => "");

    private static Script LoadScript(string path)
    {
        var name = Path.GetFileName(path);
        var info = new FileInfo(path);
        var source = Try.Run(() => File.ReadAllText(path)).GetOrNull();

        if (source is null)
            return new(name, null, null, info, "error.scriptUnreadable");

        var (state, function, error) = Compile(name, source);

        if (error is not null)
            Serilog.Log.Warning("Lua script {Script} could not be loaded: {Error}", name, error);

        return new(name, state, function, info, error);
    }

    /// <summary>
    ///     Compiles a source into the function it returns. The caller owns the state and must dispose
    ///     it; on failure the state is already gone and the tuple's first item is null.
    /// </summary>
    private static (LuaState? State, LuaFunction? Function, string? Error) Compile(string name, string source)
    {
        var state = CreateSandbox(name);

        try
        {
            var chunk = state.Load(source, name);
            var results = state.ExecuteAsync(chunk).AsTask().GetAwaiter().GetResult();

            return results.Length > 0 && results[0].TryRead<LuaFunction>(out var function)
                ? (state, function, null)
                : (state, null, "error.scriptNoFunction");
        }
        catch (Exception ex)
        {
            state.Dispose();
            return (null, null, ex.Message);
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
    private static LuaState CreateSandbox(string script)
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
                parts.Add(Describe(context.GetArgument(index)));

            Instance.Write("info", script, string.Join("\t", parts));
            return new(0);
        });

        return state;
    }

    /// <summary>
    ///     Lua's <c>print</c> shows a table's address; in a log line the contents are far more useful,
    ///     so tables are walked all the way down (and a table that contains itself is cut off).
    /// </summary>
    private static string Describe(LuaValue value) =>
        Describe(value, MaxPrintDepth, new(ReferenceEqualityComparer.Instance));

    private static string Describe(LuaValue value, int depth, HashSet<LuaTable> seen)
    {
        if (!value.TryRead<LuaTable>(out var table))
            return DescribeScalar(value);

        if (depth == 0 || !seen.Add(table))
            return "{...}";

        try
        {
            var parts = new List<string>(table.ArrayLength + table.HashMapCount);

            foreach (var (key, item) in table)
                parts.Add($"{DescribeKey(key)} = {Describe(item, depth - 1, seen)}");

            return parts.Count == 0 ? "{}" : $"{{ {string.Join(", ", parts)} }}";
        }
        finally
        {
            seen.Remove(table);
        }
    }

    private static string DescribeScalar(LuaValue value)
    {
        if (value.TryRead<string>(out var text))
            return text;

        if (value.TryRead<bool>(out var flag))
            return flag ? "true" : "false";

        if (value.TryRead<double>(out var number))
            return number.ToString(CultureInfo.InvariantCulture);

        return value.TypeToString();
    }

    /// <summary>A key that is a plain name is written as `name`, anything else as `[value]`.</summary>
    private static string DescribeKey(LuaValue key)
    {
        if (!key.TryRead<string>(out var name))
            return $"[{DescribeScalar(key)}]";

        if (name.Length == 0 || !(char.IsLetter(name[0]) || name[0] == '_'))
            return $"[\"{name}\"]";

        return name.Skip(1).All(character => char.IsLetterOrDigit(character) || character == '_')
            ? name
            : $"[\"{name}\"]";
    }

    public static string PathFor(string name) => Path.Combine(ScriptsDirectory, Path.GetFileName(name));

    private sealed record Context(LuaTable Table, List<string> Order);

    private sealed record Script(string Name, LuaState? State, LuaFunction? Function, FileInfo File, string? Error = null)
    {
        public ScriptInfo Info =>
            new(Name, File.Exists ? File.Length : 0, File.Exists ? File.LastWriteTime : default,
                Error ?? (Function is null ? "error.scriptNoFunction" : null));
    }
}