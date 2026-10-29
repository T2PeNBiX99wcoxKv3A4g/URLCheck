using URLCheck.Filters;
using URLCheck.Models;

namespace URLCheck.Messaging;

// Response and event bodies. These are named records rather than anonymous types because the
// source-generated JSON context has to know every shape the app can ever serialize.

/// <summary>Body for a bare <c>{ "ok": true }</c> acknowledgement.</summary>
internal sealed record OkPayload(bool Ok = true);

/// <summary>Body for <c>browsers.openDefault</c>: the URL the system's handler should open.</summary>
internal sealed record OpenUrlRequest(string Url);

/// <summary>Body for <c>settings.addAutoRedirect</c>: the URL whose host should be added.</summary>
internal sealed record AutoRedirectRequest(string Url);

/// <summary>Body for <c>clipboard.read</c>: the clipboard's text, or null when it cannot be read.</summary>
internal sealed record ClipboardTextPayload(string? Text);

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

/// <summary>Body for <c>app.info</c>: the build version, the platform id and where the logs live.</summary>
internal sealed record AppInfoPayload(string Version, string Platform, string LogDirectory, bool Rounded);

/// <summary>
///     Body for <c>app.checkUpdate</c>: the running version, the published one, and whether the
///     published one is actually newer.
/// </summary>
internal sealed record UpdateCheckPayload(string Current, string Latest, bool Available);

/// <summary>
///     Body for the <c>app.startup</c> messages. The state lives in the Startup folder, so it is
///     reported rather than stored, and platforms without one report <c>Supported: false</c>.
/// </summary>
internal sealed record StartupPayload(bool Supported, bool Enabled);

/// <summary>Body for the <c>window.state</c> event: whether the window is maximized.</summary>
internal sealed record WindowStatePayload(bool Maximized);

/// <summary>Payload for <c>window.resize</c>: the edge the interface's grip was dragged from.</summary>
internal sealed record WindowResizeRequest(string Direction);

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

/// <summary>Body for the <c>selection.show</c> event: the URL the floating button should offer.</summary>
internal sealed record SelectionShowPayload(string Url);

/// <summary>Body for <c>forward.send</c>: which device accepted the URL.</summary>
internal sealed record ForwardSendPayload(bool Ok, string Device);

/// <summary>
///     Body for <c>forward.info</c>: how this device can be reached, whether it is listening, and the
///     public key that identifies it.
/// </summary>
internal sealed record ForwardInfoPayload(
    string DeviceId,
    string DeviceName,
    int Port,
    IReadOnlyList<string> Addresses,
    bool Enabled,
    bool Listening,
    string PublicKey);

/// <summary>Body for <c>forward.discovered</c>: devices found on the local network.</summary>
internal sealed record ForwardDiscoveredPayload(IReadOnlyList<DeviceEntry> Devices);

/// <summary>Body for <c>forward.presence</c>: ids of the paired devices that answer right now.</summary>
internal sealed record ForwardPresencePayload(IReadOnlyList<string> Online);

/// <summary>
///     Body for the <c>forward.pairState</c> event: progress of a pairing this device started.
///     <paramref name="State" /> is <c>code</c>, <c>accepted</c>, <c>rejected</c> or <c>failed</c>.
/// </summary>
internal sealed record ForwardPairStatePayload(string State, string? Code, DeviceEntry? Device, string? Error);

/// <summary>Body for the <c>forward.pairRequest</c> event: a peer asking to pair, for the user to confirm.</summary>
internal sealed record ForwardPairRequestPayload(string RequestId, string DeviceId, string DeviceName, string Code);