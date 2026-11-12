using System.Text;
using System.Text.Json;
using Jint;
using Lua;
using URLCheck.Services;

namespace URLCheck.Scripting;

/// <summary>
///     The extra Lua libraries: base64, JSON, HTTP and a bare JavaScript engine. They are registered on
///     every state, but <c>http</c> also needs the network permission in the settings and
///     <c>scriptNetwork = true</c> in the script, so a downloaded script cannot start talking to the
///     network on its own.
/// </summary>
internal static class LuaCapabilities
{
    private const int MaxHttpBytes = 512 * 1024;

    private static readonly HttpClient Client = new()
    {
        Timeout = Timeout.InfiniteTimeSpan
    };

    public static void Register(LuaState state)
    {
        state.Environment["base64"] = new LuaTable
        {
            ["encode"] = new LuaFunction((context, _) =>
            {
                var text = Convert.ToBase64String(Encoding.UTF8.GetBytes(Text(context, 0)));
                return new(context.Return(text));
            }),
            ["decode"] = new LuaFunction(DecodeBase64)
        };

        state.Environment["json"] = new LuaTable
        {
            ["parse"] = new LuaFunction(ParseJson),
            ["stringify"] = new LuaFunction(StringifyJson)
        };

        state.Environment["http"] = new LuaTable
        {
            ["get"] = new LuaFunction((context, cancellation) => RequestAsync(context, cancellation, true)),
            ["request"] = new LuaFunction((context, cancellation) => RequestAsync(context, cancellation, false))
        };

        state.Environment["js"] = new LuaTable
        {
            ["eval"] = new LuaFunction(EvalJavaScript)
        };
    }

    private static string Text(LuaFunctionExecutionContext context, int index) =>
        context.HasArgument(index) ? context.GetArgument(index).ToString() : "";

    private static LuaTable? Table(LuaFunctionExecutionContext context, int index) =>
        context.HasArgument(index) && context.GetArgument(index).TryRead<LuaTable>(out var table) ? table : null;

    private static string? Option(LuaTable? table, string name) =>
        table is not null && table[name].TryRead<string>(out var value) ? value : null;

    private static ValueTask<int> DecodeBase64(LuaFunctionExecutionContext context, CancellationToken cancellation)
    {
        var text = Text(context, 0).Replace('-', '+').Replace('_', '/');

        var padding = text.Length % 4;
        if (padding > 0)
            text += new string('=', 4 - padding);

        try
        {
            return new(context.Return(Encoding.UTF8.GetString(Convert.FromBase64String(text))));
        }
        catch (FormatException)
        {
            return new(context.Return(LuaValue.Nil));
        }
    }

    private static ValueTask<int> ParseJson(LuaFunctionExecutionContext context, CancellationToken cancellation)
    {
        try
        {
            using var document = JsonDocument.Parse(Text(context, 0));
            return new(context.Return(ToLua(document.RootElement)));
        }
        catch (Exception exception)
        {
            return new(context.Return(LuaValue.Nil, exception.Message));
        }
    }

    private static ValueTask<int> StringifyJson(LuaFunctionExecutionContext context, CancellationToken cancellation)
    {
        try
        {
            using var stream = new MemoryStream();

            using (var writer = new Utf8JsonWriter(stream))
                WriteJson(writer, context.HasArgument(0) ? context.GetArgument(0) : LuaValue.Nil,
                    new(ReferenceEqualityComparer.Instance));

            return new(context.Return(Encoding.UTF8.GetString(stream.ToArray())));
        }
        catch (Exception exception)
        {
            return new(context.Return(LuaValue.Nil, exception.Message));
        }
    }

    private static LuaValue ToLua(JsonElement element) => element.ValueKind switch
    {
        JsonValueKind.Object => ObjectToLua(element),
        JsonValueKind.Array => ArrayToLua(element),
        JsonValueKind.String => element.GetString() ?? "",
        JsonValueKind.Number => element.GetDouble(),
        JsonValueKind.True => true,
        JsonValueKind.False => false,
        _ => LuaValue.Nil
    };

    private static LuaValue ObjectToLua(JsonElement element)
    {
        var table = new LuaTable();

        foreach (var property in element.EnumerateObject())
            table[property.Name] = ToLua(property.Value);

        return table;
    }

    private static LuaValue ArrayToLua(JsonElement element)
    {
        var table = new LuaTable();
        var index = 0;

        foreach (var item in element.EnumerateArray())
            table[++index] = ToLua(item);

        return table;
    }

    private static void WriteJson(Utf8JsonWriter writer, LuaValue value, HashSet<LuaTable> seen)
    {
        if (value.TryRead<string>(out var text))
        {
            writer.WriteStringValue(text);
            return;
        }

        if (value.TryRead<bool>(out var flag))
        {
            writer.WriteBooleanValue(flag);
            return;
        }

        if (value.TryRead<double>(out var number))
        {
            writer.WriteNumberValue(number);
            return;
        }

        if (!value.TryRead<LuaTable>(out var table))
        {
            writer.WriteNullValue();
            return;
        }

        if (!seen.Add(table))
            throw new InvalidOperationException("cannot encode a table that contains itself");

        if (table.ArrayLength > 0 && table.HashMapCount == 0)
        {
            writer.WriteStartArray();

            foreach (var (_, item) in table)
                WriteJson(writer, item, seen);

            writer.WriteEndArray();
        }
        else
        {
            writer.WriteStartObject();

            foreach (var (key, item) in table)
            {
                writer.WritePropertyName(key.ToString());
                WriteJson(writer, item, seen);
            }

            writer.WriteEndObject();
        }

        seen.Remove(table);
    }

    /// <summary>
    ///     <c>http.get(url [, options])</c> and <c>http.request(url [, options])</c>. The response is
    ///     <c>{ status, body, headers, url }</c>, or <c>nil, message</c> on failure.
    /// </summary>
    private static async ValueTask<int> RequestAsync(LuaFunctionExecutionContext context,
        CancellationToken cancellation, bool forceGet)
    {
        if (SettingsService.Instance.Current?.AllowScriptNetwork != true)
            return context.Return(LuaValue.Nil, "network access is disabled in the settings");

        if (!context.State.Environment["scriptNetwork"].TryRead<bool>(out var declared) || !declared)
            return context.Return(LuaValue.Nil, "the script must set scriptNetwork = true");

        var url = Text(context, 0);
        if (!Uri.TryCreate(url, UriKind.Absolute, out var uri) || uri.Scheme is not ("http" or "https"))
            return context.Return(LuaValue.Nil, "only http and https URLs can be fetched");

        var options = Table(context, 1);
        var method = forceGet ? "GET" : (Option(options, "method") ?? "GET").ToUpperInvariant();

        if (method is not ("GET" or "POST" or "HEAD"))
            return context.Return(LuaValue.Nil, "only GET, POST and HEAD are allowed");

        var timeout = OptionValue(options, "timeout", 7);
        using var linked = CancellationTokenSource.CreateLinkedTokenSource(cancellation);
        linked.CancelAfter(TimeSpan.FromSeconds(Math.Clamp(timeout, 1, 7)));

        try
        {
            using var request = new HttpRequestMessage(new(method), uri);

            if (!forceGet && Option(options, "body") is { } body)
                request.Content = new StringContent(body, Encoding.UTF8);

            if (options is not null && options["headers"].TryRead<LuaTable>(out var headers))
                foreach (var (key, value) in headers)
                    if (key.TryRead<string>(out var name))
                        request.Headers.TryAddWithoutValidation(name, value.ToString());

            using var response = await Client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead,
                linked.Token);

            var result = new LuaTable
            {
                ["status"] = (double)response.StatusCode,
                ["body"] = method == "HEAD" ? "" : await ReadLimitedAsync(response.Content, linked.Token),
                ["url"] = response.RequestMessage?.RequestUri?.ToString() ?? url
            };

            var responseHeaders = new LuaTable();

            foreach (var header in response.Headers.Concat(response.Content.Headers))
                responseHeaders[header.Key.ToLowerInvariant()] = string.Join(", ", header.Value);

            result["headers"] = responseHeaders;
            return context.Return(result);
        }
        catch (Exception exception)
        {
            return context.Return(LuaValue.Nil, exception.Message);
        }
    }

    private static double OptionValue(LuaTable? table, string name, double fallback) =>
        table is not null && table[name].TryRead<double>(out var value) ? value : fallback;

    private static async Task<string> ReadLimitedAsync(HttpContent content, CancellationToken cancellation)
    {
        await using var stream = await content.ReadAsStreamAsync(cancellation);

        using var memory = new MemoryStream();
        var buffer = new byte[8192];

        while (true)
        {
            var read = await stream.ReadAsync(buffer, cancellation);
            if (read == 0)
                break;

            if (memory.Length + read > MaxHttpBytes)
                throw new InvalidOperationException("the response is larger than 512 KB");

            memory.Write(buffer, 0, read);
        }

        return Encoding.UTF8.GetString(memory.ToArray());
    }

    /// <summary>
    ///     <c>js.eval(source [, bindings])</c> — a bare JavaScript engine for snippets. There is no DOM,
    ///     no timer and no network; it is useful for decoding and for extracting a value, not for
    ///     running a page's own scripts.
    /// </summary>
    private static ValueTask<int> EvalJavaScript(LuaFunctionExecutionContext context, CancellationToken cancellation)
    {
        try
        {
            var engine = new Engine(options => options
                .TimeoutInterval(TimeSpan.FromMilliseconds(750))
                .LimitMemory(16_000_000));

            if (Table(context, 1) is { } bindings)
                foreach (var (key, value) in bindings)
                {
                    if (!key.TryRead<string>(out var name))
                        continue;

                    if (value.TryRead<string>(out var text))
                        engine.SetValue(name, text);
                    else if (value.TryRead<double>(out var number))
                        engine.SetValue(name, number);
                    else if (value.TryRead<bool>(out var flag))
                        engine.SetValue(name, flag);
                }

            var result = engine.Evaluate(Text(context, 0));

            if (result.IsString())
                return new(context.Return(result.AsString()));

            if (result.IsNumber())
                return new(context.Return(result.AsNumber()));

            if (result.IsBoolean())
                return new(context.Return(result.AsBoolean()));

            if (result.IsNull() || result.IsUndefined())
                return new(context.Return(LuaValue.Nil));

            return new(context.Return(result.ToString()));
        }
        catch (Exception exception)
        {
            throw new LuaRuntimeException(context.State, $"js.eval: {exception.Message}");
        }
    }
}