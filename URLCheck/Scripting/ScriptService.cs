using System.Text;
using Lua;
using Lua.Standard;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;
using Serilog;

namespace URLCheck.Scripting;

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
internal sealed class ScriptService : Singleton<ScriptService>
{
    /// <summary>How long one script may run before it is cancelled; it only handles a URL.</summary>
    private static readonly TimeSpan Timeout = TimeSpan.FromSeconds(2);

    private readonly SemaphoreSlim _gate = new(1, 1);
    private readonly List<Script> _scripts = [];

    private bool _loaded;

    /// <summary>Where the scripts live; created on demand, beside the settings file.</summary>
    public static string ScriptsDirectory => Path.Combine(Path.GetDirectoryName(Constants.LogDirectory)!, "scripts");

    /// <summary>
    ///     Runs every script over <paramref name="url" />, in file name order, and returns the URL the
    ///     last one produced. A script that fails leaves the URL as it was.
    /// </summary>
    public async Task<string> ProcessAsync(string url, string appVersion)
    {
        Load();

        if (_scripts.Count == 0)
            return url;

        await _gate.WaitAsync();

        try
        {
            var current = url;

            foreach (var script in _scripts)
                current = await RunAsync(script, current, appVersion);

            return current;
        }
        finally
        {
            _gate.Release();
        }
    }

    private async Task<string> RunAsync(Script script, string url, string appVersion)
    {
        using var timeout = new CancellationTokenSource(Timeout);

        try
        {
            var context = BuildContext(url, appVersion);
            var results = await script.State.CallAsync(script.Function, [context.Table], timeout.Token);
            if (results.Length == 0)
                return url;

            var result = results[0];

            if (result.TryRead<string>(out var text))
                return Report(script, url, text);

            if (result.TryRead<LuaTable>(out var table))
                return Report(script, url, BuildUrl(table, url, context.Order));

            return url;
        }
        catch (Exception ex)
        {
            Serilog.Log.Warning(ex, "Lua script {Script} failed for {Url}", script.Name, url);
            return url;
        }
    }

    private static string Report(Script script, string from, string to)
    {
        if (to == from)
            return to;

        Serilog.Log.Information("Lua script {Script} changed {From} to {To}", script.Name, from, to);
        return to;
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

    /// <summary>Loads every script in the folder once; a broken one is logged and skipped.</summary>
    private void Load()
    {
        if (_loaded)
            return;

        _loaded = true;

        var loaded = Try.Run(() =>
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

        foreach (var path in loaded)
        {
            if (TryLoad(path) is { } script)
                _scripts.Add(script);
        }

        if (_scripts.Count > 0)
            Serilog.Log.Information("Loaded {Count} Lua script(s) from {Path}", _scripts.Count, ScriptsDirectory);
        else
            Serilog.Log.Debug("No Lua scripts in {Path}", ScriptsDirectory);
    }

    private static Script? TryLoad(string path)
    {
        var name = Path.GetFileName(path);
        var state = CreateSandbox();

        try
        {
            var chunk = state.Load(File.ReadAllText(path), name);
            var results = state.ExecuteAsync(chunk).AsTask().GetAwaiter().GetResult();

            if (results.Length > 0 && results[0].TryRead<LuaFunction>(out var function))
                return new Script(name, state, function);

            Serilog.Log.Warning("Lua script {Script} does not return a function", name);
        }
        catch (Exception ex)
        {
            Serilog.Log.Warning(ex, "Lua script {Script} could not be loaded", name);
        }

        state.Dispose();
        return null;
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

            Serilog.Log.Information("[lua] {Line}", string.Join("\t", parts));
            return new(0);
        });

        return state;
    }

    private sealed record Context(LuaTable Table, List<string> Order);

    private sealed record Script(string Name, LuaState State, LuaFunction Function);
}
