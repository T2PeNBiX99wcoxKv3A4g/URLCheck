using System.Text.Json;
using URLCheck.Models;

namespace URLCheck.Messaging;

/// <summary>
/// A message sent from the React front-end through <c>window.external.sendMessage(...)</c>.
/// </summary>
internal sealed class NativeRequest
{
    /// <summary>Logical message name, e.g. <c>settings.get</c>.</summary>
    public string? Type { get; set; }

    /// <summary>Optional correlation id; when present the handler replies with the same id.</summary>
    public string? Id { get; set; }

    /// <summary>Optional message body, kept as a raw element until the handler knows what to expect.</summary>
    public JsonElement? Payload { get; set; }
}

/// <summary>
/// A reply sent back to the front-end through <c>window.external.receiveMessage(...)</c>.
/// </summary>
internal sealed class NativeResponse
{
    public string? Id { get; init; }
    public string Type { get; init; } = string.Empty;
    public bool Ok { get; init; }
    public object? Data { get; init; }
    public string? Error { get; init; }

    public static NativeResponse Success(string? id, string type, object? data = null) =>
        new() { Id = id, Type = type, Ok = true, Data = data };

    public static NativeResponse Failure(string? id, string type, string error) =>
        new() { Id = id, Type = type, Ok = false, Error = error };
}

/// <summary>
/// An unsolicited push from C# to the front-end (no request id, no reply expected).
/// </summary>
internal sealed class NativeEvent
{
    public string Type { get; init; } = string.Empty;
    public object? Data { get; init; }
}

/// <summary>Body returned for every settings message.</summary>
internal sealed record SettingsPayload(AppSettings Settings, string SettingsFilePath);
