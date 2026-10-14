using System.Text.Json;
using System.Text.Json.Serialization;
using Photino.NET;
using URLCheck.Models;
using URLCheck.Services;

namespace URLCheck.Messaging;

/// <summary>
/// Translates the JSON messages exchanged with the React front-end.
/// Incoming messages arrive through <see cref="PhotinoWindow.RegisterWebMessageReceivedHandler"/>;
/// outgoing messages are pushed back with <see cref="PhotinoWindow.SendWebMessage"/>.
/// </summary>
internal sealed class NativeBridge
{
    private static readonly JsonSerializerOptions SerializerOptions = new(JsonSerializerDefaults.Web)
    {
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    };

    private readonly SettingsService _settingsService;

    public NativeBridge(SettingsService settingsService)
    {
        _settingsService = settingsService;
    }

    public void HandleMessage(PhotinoWindow? window, string rawMessage)
    {
        Console.WriteLine($"[bridge] << {rawMessage}");

        NativeRequest? request;
        try
        {
            request = JsonSerializer.Deserialize<NativeRequest>(rawMessage, SerializerOptions);
        }
        catch (JsonException ex)
        {
            Console.WriteLine($"[bridge] Invalid JSON received: {ex.Message}");
            Send(window, NativeResponse.Failure(null, "error", "Invalid JSON payload."));
            return;
        }

        if (string.IsNullOrEmpty(request?.Type))
            return;

        try
        {
            Dispatch(window, request);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[bridge] Handler for '{request.Type}' failed: {ex}");
            Send(window, NativeResponse.Failure(request.Id, $"{request.Type}.result", ex.Message));
        }
    }

    private void Dispatch(PhotinoWindow? window, NativeRequest request)
    {
        switch (request.Type)
        {
            case "settings.get":
                Send(window, NativeResponse.Success(request.Id, "settings.get.result", CreateSettingsPayload()));
                break;

            case "settings.save":
            {
                var incoming = request.Payload?.Deserialize<AppSettings>(SerializerOptions);
                if (incoming is null)
                {
                    Send(window, NativeResponse.Failure(request.Id, "settings.save.result", "Missing settings payload."));
                    return;
                }

                _settingsService.Save(incoming);
                Send(window, NativeResponse.Success(request.Id, "settings.save.result", CreateSettingsPayload()));
                SendEvent(window, "settings.changed", CreateSettingsPayload());
                break;
            }

            case "settings.reset":
                _settingsService.Reset();
                Send(window, NativeResponse.Success(request.Id, "settings.reset.result", CreateSettingsPayload()));
                SendEvent(window, "settings.changed", CreateSettingsPayload());
                break;

            default:
                Console.WriteLine($"[bridge] No handler registered for message type '{request.Type}'.");
                if (!string.IsNullOrEmpty(request.Id))
                    Send(window, NativeResponse.Failure(request.Id, $"{request.Type}.result", $"Unsupported message type '{request.Type}'."));
                break;
        }
    }

    private SettingsPayload CreateSettingsPayload() =>
        new(_settingsService.Current, _settingsService.SettingsFilePath);

    private static void Send(PhotinoWindow? window, NativeResponse response)
    {
        var json = JsonSerializer.Serialize(response, SerializerOptions);
        Console.WriteLine($"[bridge] >> {json}");
        window?.SendWebMessage(json);
    }

    private static void SendEvent(PhotinoWindow? window, string type, object? data)
    {
        var json = JsonSerializer.Serialize(new NativeEvent { Type = type, Data = data }, SerializerOptions);
        Console.WriteLine($"[bridge] >> {json}");
        window?.SendWebMessage(json);
    }
}
