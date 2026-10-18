namespace URLCheck.Filters;

/// <summary>
///     One parsed rule that removes tracking parameters from a URL, reduced to what the popup needs.
///     <see cref="Pattern" /> is a literal parameter name, or a regular expression source when
///     <see cref="Regex" /> is set. Every other field is a restriction, and a null one stays out of
///     the serialized payload.
/// </summary>
/// <param name="Pattern">Parameter name, or a regular expression source matched against the name.</param>
/// <param name="Regex">True when <paramref name="Pattern" /> is a regular expression.</param>
/// <param name="UrlPattern">Full-URL regular expression the rule is limited to (ClearURLs providers).</param>
/// <param name="Include">Hosts the rule is limited to; null means every host.</param>
/// <param name="Exclude">Hosts the rule is skipped on.</param>
/// <param name="UrlExceptions">Full-URL regular expressions that skip the rule.</param>
internal sealed record RemoveParamRule(
    string Pattern,
    bool Regex,
    string? UrlPattern = null,
    IReadOnlyList<string>? Include = null,
    IReadOnlyList<string>? Exclude = null,
    IReadOnlyList<string>? UrlExceptions = null);