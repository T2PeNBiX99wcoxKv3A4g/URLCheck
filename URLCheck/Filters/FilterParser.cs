using System.Text.Json;

namespace URLCheck.Filters;

/// <summary>
///     Turns a downloaded rule file into the parameter-removal rules the popup applies. The format is
///     detected from the content, so any supported list can be installed from a plain URL:
///     AdGuard / uBlock Origin filter lists, ClearURLs' JSON catalog, and Firefox's query-stripping
///     Remote Settings records.
/// </summary>
/// <remarks>
///     <para>
///         AdGuard: <c>$removeparam=name</c>, <c>$removeparam=/regex/</c>, host scoping through
///         <c>||host^</c> and <c>domain=a|b</c>, and <c>domain=~c</c> / <c>denyallow=</c> exclusions.
///         Rules with a pattern this app cannot scope (a path, a query fragment, ...) are skipped
///         rather than applied everywhere, and "remove every parameter" is ignored so a single bad
///         third-party rule cannot gut a URL.
///     </para>
///     <para>
///         ClearURLs: every provider's <c>rules</c> (and <c>referralMarketing</c>) become rules limited
///         to that provider's <c>urlPattern</c>, with the provider's <c>exceptions</c> kept as URL
///         exceptions. <c>rawRules</c>, <c>redirections</c> and <c>completeProvider</c> are ignored.
///     </para>
///     <para>
///         Firefox: every record's <c>stripList</c> becomes global rules, with the record's
///         <c>allowList</c> kept as host exclusions. <c>filter_expression</c> is ignored.
///     </para>
/// </remarks>
internal static class FilterParser
{
    /// <summary>Parses a rule file, detecting which of the supported formats it uses.</summary>
    public static List<RemoveParamRule> Parse(string text)
    {
        var trimmed = text.TrimStart();
        if (trimmed.StartsWith('{') || trimmed.StartsWith('['))
            try
            {
                using var document = JsonDocument.Parse(text);

                var clearUrls = ParseClearUrls(document.RootElement);
                if (clearUrls.Count > 0)
                    return clearUrls;

                return ParseFirefox(document.RootElement);
            }
            catch (JsonException)
            {
                // Not JSON after all; fall through to the line-based parser.
            }

        return ParseAdGuard(text);
    }

    // ---------------------------------------------------------------- AdGuard / uBlock Origin

    private static List<RemoveParamRule> ParseAdGuard(string text)
    {
        var rules = new List<RemoveParamRule>();

        foreach (var raw in text.Split('\n'))
        {
            var line = raw.Trim();
            if (line.Length == 0 || line[0] is '!' or '[' or '#')
                continue;

            if (TryParseAdGuardRule(line, out var rule))
                rules.Add(rule);
        }

        return rules;
    }

    private static bool TryParseAdGuardRule(string line, out RemoveParamRule rule)
    {
        rule = null!;

        // The options block starts at the first `$`; the generic rules start with one and have no
        // pattern at all (`$removeparam=utm_source`).
        var separator = line.IndexOf('$');
        if (separator < 0)
            return false;

        var pattern = line[..separator];
        var include = new List<string>();
        var exclude = new List<string>();
        string? value = null;
        var found = false;

        foreach (var modifier in line[(separator + 1)..]
                     .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
        {
            var equals = modifier.IndexOf('=');
            var key = (equals < 0 ? modifier : modifier[..equals]).Trim().ToLowerInvariant();
            var argument = equals < 0 ? "" : modifier[(equals + 1)..].Trim();

            switch (key)
            {
                case "removeparam":
                    found = true;
                    value = argument;
                    break;

                case "domain":
                    ClassifyDomains(argument, include, exclude);
                    break;

                case "denyallow":
                    // The rule never applies on these hosts.
                    exclude.AddRange(SplitDomains(argument));
                    break;
            }
        }

        if (!found || string.IsNullOrEmpty(value))
            return false;

        // `||host^…` scopes the rule to that host, exactly like `domain=`. Anything else that is not
        // a plain `*` carries a path or query fragment this app cannot scope, so it is skipped.
        switch (pattern)
        {
            case "" or "*":
                break;
            default:
                if (HostOf(pattern) is not { Length: > 0 } host)
                    return false;

                include.Add(host);
                break;
        }

        var (source, isRegex) = SplitRegex(value);
        rule = new(source, isRegex, Include: include.Count > 0 ? include : null,
            Exclude: exclude.Count > 0 ? exclude : null);
        return true;
    }

    /// <summary>Reads the host out of a <c>||host^</c> / <c>||host/path</c> pattern, or null.</summary>
    private static string? HostOf(string pattern) =>
        pattern.StartsWith("||", StringComparison.Ordinal) && Cut(pattern[2..]) is { Length: > 0 } host
            ? host
            : null;

    private static string Cut(string host)
    {
        var cut = host.IndexOfAny(['/', '^', '$', '?']);
        return cut < 0 ? host : host[..cut];
    }

    private static void ClassifyDomains(string argument, List<string> include, List<string> exclude)
    {
        foreach (var domain in SplitDomains(argument))
            if (domain.StartsWith('~'))
                exclude.Add(domain[1..]);
            else
                include.Add(domain);
    }

    private static IEnumerable<string> SplitDomains(string argument) =>
        argument.Split('|', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

    /// <summary>Splits <c>/regex/flags</c> into its source; a plain value is a literal parameter name.</summary>
    private static (string Source, bool IsRegex) SplitRegex(string value)
    {
        if (value.Length < 2 || value[0] != '/')
            return (value, false);

        var end = value.LastIndexOf('/');
        return end <= 0 ? (value, false) : (value[1..end], true);
    }

    // ------------------------------------------------------------------------------- ClearURLs

    private static List<RemoveParamRule> ParseClearUrls(JsonElement root)
    {
        var rules = new List<RemoveParamRule>();

        if (root.ValueKind != JsonValueKind.Object ||
            !root.TryGetProperty("providers", out var providers))
            return rules;

        switch (providers.ValueKind)
        {
            case JsonValueKind.Object:
                foreach (var provider in providers.EnumerateObject())
                    AddClearUrlsProvider(rules, provider.Value);
                break;

            // The newer "compiled" catalog keeps providers in an array.
            case JsonValueKind.Array:
                foreach (var provider in providers.EnumerateArray())
                    AddClearUrlsProvider(rules, provider);
                break;
        }

        return rules;
    }

    private static void AddClearUrlsProvider(List<RemoveParamRule> rules, JsonElement provider)
    {
        if (provider.ValueKind != JsonValueKind.Object ||
            !provider.TryGetProperty("urlPattern", out var patternElement) ||
            patternElement.ValueKind != JsonValueKind.String ||
            patternElement.GetString() is not { Length: > 0 } urlPattern)
            return;

        // `completeProvider` blocks the whole URL, which is not a parameter removal.
        if (provider.TryGetProperty("completeProvider", out var complete) && complete.ValueKind == JsonValueKind.True)
            return;

        var exceptions = ReadStrings(provider, "exceptions");

        // The classic catalog lists rule names as plain strings.
        foreach (var name in ReadStrings(provider, "rules").Concat(ReadStrings(provider, "referralMarketing")))
            AddClearUrlsRule(rules, name, urlPattern, exceptions);

        // The compiled catalog lists them as objects with `kind` / `match` / `action`.
        if (!provider.TryGetProperty("rules", out var ruleArray) || ruleArray.ValueKind != JsonValueKind.Array)
            return;

        foreach (var rule in ruleArray.EnumerateArray())
        {
            if (rule.ValueKind != JsonValueKind.Object)
                continue;

            if (rule.TryGetProperty("kind", out var kind) && kind.ValueKind == JsonValueKind.String &&
                kind.GetString() != "field")
                continue;

            if (HasNonRemovalAction(rule))
                continue;

            if (!rule.TryGetProperty("match", out var match) || match.ValueKind != JsonValueKind.String ||
                match.GetString() is not { Length: > 0 } pattern)
                continue;

            AddClearUrlsRule(rules, pattern, urlPattern, [.. exceptions, .. ReadStrings(rule, "exceptions")]);
        }
    }

    private static bool HasNonRemovalAction(JsonElement rule) =>
        rule.TryGetProperty("action", out var action) &&
        action.ValueKind == JsonValueKind.Object &&
        action.TryGetProperty("type", out var type) &&
        type.ValueKind == JsonValueKind.String &&
        type.GetString() is { } name && name != "remove";

    private static void AddClearUrlsRule(List<RemoveParamRule> rules, string pattern, string urlPattern,
        List<string> exceptions) =>
        rules.Add(new(pattern, true, urlPattern,
            UrlExceptions: exceptions.Count > 0 ? exceptions : null));

    // -------------------------------------------------------------------------------- Firefox

    private static List<RemoveParamRule> ParseFirefox(JsonElement root)
    {
        var rules = new List<RemoveParamRule>();

        if (root.ValueKind != JsonValueKind.Object ||
            !root.TryGetProperty("data", out var records) || records.ValueKind != JsonValueKind.Array)
            return rules;

        foreach (var record in records.EnumerateArray())
        {
            if (record.ValueKind != JsonValueKind.Object)
                continue;

            var allowList = ReadStrings(record, "allowList");
            foreach (var name in ReadStrings(record, "stripList"))
                rules.Add(new(name, false, Exclude: allowList.Count > 0 ? allowList : null));
        }

        return rules;
    }

    // ---------------------------------------------------------------------------------- shared

    private static List<string> ReadStrings(JsonElement element, string property)
    {
        var values = new List<string>();

        if (element.ValueKind != JsonValueKind.Object ||
            !element.TryGetProperty(property, out var array) || array.ValueKind != JsonValueKind.Array)
            return values;

        foreach (var item in array.EnumerateArray())
            if (item.ValueKind == JsonValueKind.String && item.GetString() is { Length: > 0 } value)
                values.Add(value);

        return values;
    }
}