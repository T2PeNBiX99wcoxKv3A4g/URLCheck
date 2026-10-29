using URLCheck.Models;

namespace URLCheck.Messaging;

// The message envelope and the bridge itself come from PhotinoNetUtils.Messaging; only the payloads
// this app defines live here.

/// <summary>Body returned for every settings message.</summary>
internal sealed record SettingsPayload(AppSettings Settings, string SettingsFilePath);

/// <summary>Payload for <c>popup.show</c>.</summary>
internal sealed record PopupShowRequest(string Url);

/// <summary>Payload for <c>popup.open</c>.</summary>
internal sealed record PopupOpenRequest(string Url, string? BrowserId, bool Private = false);

/// <summary>Payload for <c>popup.resize</c>.</summary>
internal sealed record PopupResizeRequest(int Height);

/// <summary>Payload for <c>forward.send</c>: the URL to forward and the target device.</summary>
internal sealed record ForwardSendRequest(string Url, string? DeviceId);

/// <summary>Payload for <c>forward.pair</c>: the address of the device to pair with.</summary>
internal sealed record ForwardPairStartRequest(string Host, int Port);

/// <summary>Payload for <c>forward.pairRespond</c>: the user's answer to an incoming pairing request.</summary>
internal sealed record ForwardPairRespondRequest(string RequestId, bool Accept);

/// <summary>Payload for <c>forward.remove</c>: the paired device to forget.</summary>
internal sealed record ForwardRemoveRequest(string DeviceId);

/// <summary>Payload for <c>forward.addAddress</c> and <c>forward.removeAddress</c>: an extra device address.</summary>
internal sealed record ForwardAddressRequest(string DeviceId, string Address);

/// <summary>
///     Payload for the <c>inspect.*</c> messages. The User-Agent is optional: the configured default is used when it
///     is empty.
/// </summary>
internal sealed record InspectRequest(string Url, string? UserAgentId = null);


/// <summary>Payload for <c>app.setStartup</c>: whether the startup shortcut should exist.</summary>
internal sealed record StartupRequest(bool Enabled);

/// <summary>Payload for <c>filters.add</c>: a display name and a direct rule-file URL.</summary>
internal sealed record FilterAddRequest(string Name, string Url);

/// <summary>Payload for <c>filters.remove</c> and <c>filters.update</c>; an empty id targets every list.</summary>
internal sealed record FilterIdRequest(string? Id);

/// <summary>Payload for <c>filters.setEnabled</c>.</summary>
internal sealed record FilterToggleRequest(string Id, bool Enabled);
