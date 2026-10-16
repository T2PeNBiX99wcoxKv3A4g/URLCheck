using URLCheck.Filters;
using URLCheck.Models;

namespace URLCheck.Messaging;

// Response and event bodies. These are named records rather than anonymous types because the
// source-generated JSON context has to know every shape the app can ever serialize.

/// <summary>Body for a bare <c>{ "ok": true }</c> acknowledgement.</summary>
internal sealed record OkPayload(bool Ok = true);

/// <summary>Body for <c>popup.open</c>: which browser actually launched.</summary>
internal sealed record BrowserOpenPayload(bool Ok, string Browser);

/// <summary>Body for the protocol registration messages.</summary>
internal sealed record RegisterPayload(bool Ok, string ExecutablePath);

/// <summary>Body for <c>app.protocolStatus</c>.</summary>
internal sealed record ProtocolStatusPayload(
    bool IsDefault,
    bool CustomSchemeRegistered,
    bool PathMatches,
    string? RegisteredPath);

/// <summary>Body for <c>browsers.detect</c>.</summary>
internal sealed record BrowsersPayload(IReadOnlyList<BrowserEntry> Browsers);

/// <summary>Body for <c>app.info</c>.</summary>
internal sealed record AppInfoPayload(string Version, string Platform);

/// <summary>Body for <c>i18n.get</c>.</summary>
internal sealed record LocalePayload(
    string Locale,
    Dictionary<string, string> Strings,
    IReadOnlyList<string> Available);

/// <summary>Body for <c>history.list</c>.</summary>
internal sealed record HistoryListPayload(IReadOnlyList<HistoryItemPayload> Entries);

/// <summary>One row of <c>history.list</c>.</summary>
internal sealed record HistoryItemPayload(int Id, string Url, long Timestamp);

/// <summary>
///     Body for <c>inspect.status</c>. <paramref name="Location" /> is the target of the redirect
///     whose status is reported, or null when the response was not a redirect.
/// </summary>
internal sealed record InspectStatusPayload(int StatusCode, string StatusText, bool Ok, string? Location);

/// <summary>
///     Body for the <c>filters.*</c> messages that return the installed lists. The built-in rules are
///     only reported as a count: they are never listed, toggled or removed.
/// </summary>
internal sealed record FilterListPayload(List<FilterListEntry> Lists, int BuiltinRuleCount);

/// <summary>Body for <c>filters.rules</c>: every rule the popup should apply, built-in included.</summary>
internal sealed record FilterRulesPayload(List<RemoveParamRule> Rules);

/// <summary>Body for the <c>app.navigate</c> event.</summary>
internal sealed record NavigatePayload(string Tab);

/// <summary>Body for the <c>popup.navigate</c> event.</summary>
internal sealed record PopupNavigatePayload(string Url);
