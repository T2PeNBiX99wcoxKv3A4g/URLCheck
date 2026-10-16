namespace URLCheck.Filters;

/// <summary>
///     One parsed AdGuard / uBlock Origin <c>$removeparam</c> rule, reduced to what the popup needs.
///     <see cref="Pattern" /> is a literal parameter name, or a regular expression source when
///     <see cref="Regex" /> is set. Null host lists mean "no restriction", so they stay out of the
///     serialized payload.
/// </summary>
internal sealed record RemoveParamRule(
    string Pattern,
    bool Regex,
    IReadOnlyList<string>? Include = null,
    IReadOnlyList<string>? Exclude = null);
