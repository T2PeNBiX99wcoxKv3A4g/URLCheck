using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization.Metadata;
using URLCheck.Filters;
using URLCheck.Forward;
using URLCheck.Models;

namespace URLCheck.Messaging;

/// <summary>
///     Source-generated serializer context. The Release build is trimmed, which turns off
///     reflection-based serialization, so every shape that crosses the native bridge or lands on
///     disk must be registered here.
/// </summary>
[JsonSourceGenerationOptions(
    PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase,
    PropertyNameCaseInsensitive = true,
    NumberHandling = JsonNumberHandling.AllowReadingFromString,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    ReadCommentHandling = JsonCommentHandling.Skip,
    AllowTrailingCommas = true)]
[JsonSerializable(typeof(NativeRequest))]
[JsonSerializable(typeof(NativeResponse))]
[JsonSerializable(typeof(NativeEvent))]
[JsonSerializable(typeof(AppSettings))]
[JsonSerializable(typeof(SettingsPayload))]
[JsonSerializable(typeof(PopupShowRequest))]
[JsonSerializable(typeof(PopupOpenRequest))]
[JsonSerializable(typeof(PopupResizeRequest))]
[JsonSerializable(typeof(InspectRequest))]
[JsonSerializable(typeof(LocaleRequest))]
[JsonSerializable(typeof(OkPayload))]
[JsonSerializable(typeof(AutoRedirectRequest))]
[JsonSerializable(typeof(ClipboardTextPayload))]
[JsonSerializable(typeof(BrowserOpenPayload))]
[JsonSerializable(typeof(RegisterPayload))]
[JsonSerializable(typeof(ProtocolStatusPayload))]
[JsonSerializable(typeof(BrowsersPayload))]
[JsonSerializable(typeof(AppInfoPayload))]
[JsonSerializable(typeof(UpdateCheckPayload))]
[JsonSerializable(typeof(StartupPayload))]
[JsonSerializable(typeof(StartupRequest))]
[JsonSerializable(typeof(LocalePayload))]
[JsonSerializable(typeof(HistoryListPayload))]
[JsonSerializable(typeof(InspectStatusPayload))]
[JsonSerializable(typeof(FilterListEntry))]
[JsonSerializable(typeof(List<FilterListEntry>))]
[JsonSerializable(typeof(FilterAddRequest))]
[JsonSerializable(typeof(FilterIdRequest))]
[JsonSerializable(typeof(FilterToggleRequest))]
[JsonSerializable(typeof(FilterListPayload))]
[JsonSerializable(typeof(FilterRulesPayload))]
[JsonSerializable(typeof(RemoveParamRule))]
[JsonSerializable(typeof(List<RemoveParamRule>))]
[JsonSerializable(typeof(NavigatePayload))]
[JsonSerializable(typeof(PopupNavigatePayload))]
[JsonSerializable(typeof(SelectionShowPayload))]
[JsonSerializable(typeof(ForwardSendRequest))]
[JsonSerializable(typeof(ForwardSendPayload))]
[JsonSerializable(typeof(ForwardInfoPayload))]
[JsonSerializable(typeof(ForwardPairStartRequest))]
[JsonSerializable(typeof(ForwardPairRespondRequest))]
[JsonSerializable(typeof(ForwardRemoveRequest))]
[JsonSerializable(typeof(ForwardAddressRequest))]
[JsonSerializable(typeof(ForwardDiscoveredPayload))]
[JsonSerializable(typeof(ForwardPresencePayload))]
[JsonSerializable(typeof(ForwardPairStatePayload))]
[JsonSerializable(typeof(ForwardPairRequestPayload))]
[JsonSerializable(typeof(DeviceEntry))]
[JsonSerializable(typeof(List<DeviceEntry>))]
[JsonSerializable(typeof(DiscoverMessage))]
[JsonSerializable(typeof(AnnounceMessage))]
[JsonSerializable(typeof(PairRequestMessage))]
[JsonSerializable(typeof(PairChallengeMessage))]
[JsonSerializable(typeof(PairAcceptMessage))]
[JsonSerializable(typeof(PairRejectMessage))]
[JsonSerializable(typeof(ForwardHelloMessage))]
[JsonSerializable(typeof(ForwardReplyMessage))]
[JsonSerializable(typeof(ForwardDataMessage))]
[JsonSerializable(typeof(StatusMessage))]
[JsonSerializable(typeof(ForwardPayload))]
[JsonSerializable(typeof(Dictionary<string, string>))]
internal sealed partial class AppJsonContext : JsonSerializerContext;

/// <summary>Bridges loosely-typed payloads to the source-generated serializer.</summary>
internal static class NativeJson
{
    /// <summary>Converts a registered payload into the <see cref="JsonElement" /> the envelope embeds.</summary>
    public static JsonElement? ToElement(object? value) =>
        value is null ? null : JsonSerializer.SerializeToElement(value, TypeInfo(value.GetType()));

    /// <summary>Resolves the type info for a registered type, or throws when it was never registered.</summary>
    public static JsonTypeInfo TypeInfo(Type type) =>
        AppJsonContext.Default.GetTypeInfo(type) ?? throw NotRegistered(type);

    /// <summary>Typed overload of <see cref="TypeInfo(Type)" />, for deserializing a payload.</summary>
    public static JsonTypeInfo<T> TypeInfo<T>() =>
        AppJsonContext.Default.GetTypeInfo(typeof(T)) as JsonTypeInfo<T> ?? throw NotRegistered(typeof(T));

    private static InvalidOperationException NotRegistered(Type type) =>
        new($"JSON type '{type}' is not registered in {nameof(AppJsonContext)}.");
}