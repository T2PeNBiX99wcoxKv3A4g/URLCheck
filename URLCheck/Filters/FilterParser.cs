namespace URLCheck.Filters;

/// <summary>
///     Pulls the <c>$removeparam</c> rules out of an AdGuard / uBlock Origin filter list. Everything
///     else — ad rules, cosmetic rules, other modifiers — is ignored, so any standard list can be
///     installed even though only the URL-cleaning part of it is used.
/// </summary>
/// <remarks>
///     Supported: <c>$removeparam=name</c>, <c>$removeparam=/regex/</c>, host scoping through
///     <c>||host^</c> and <c>domain=a|b</c>, and <c>domain=~c</c> / <c>denyallow=</c> exclusions.
///     Rules with a pattern this app cannot scope (a path, a query fragment, ...) are skipped rather
///     than applied everywhere, and "remove every parameter" (<c>$removeparam</c> with no value) is
///     ignored so a single bad third-party rule cannot gut a URL.
/// </remarks>
internal static class FilterParser
{
    /// <summary>Parses a whole filter list, keeping only the rules that touch a URL's query string.</summary>
    public static List<RemoveParamRule> Parse(string text)
    {
        var rules = new List<RemoveParamRule>();

        foreach (var raw in text.Split('\n'))
        {
            var line = raw.Trim();
            if (line.Length == 0 || line[0] is '!' or '[' or '#')
                continue;

            if (TryParse(line, out var rule))
                rules.Add(rule);
        }

        return rules;
    }

    private static bool TryParse(string line, out RemoveParamRule rule)
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
        rule = new RemoveParamRule(source, isRegex, include.Count > 0 ? include : null,
            exclude.Count > 0 ? exclude : null);
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
        {
            if (domain.StartsWith('~'))
                exclude.Add(domain[1..]);
            else
                include.Add(domain);
        }
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
}
