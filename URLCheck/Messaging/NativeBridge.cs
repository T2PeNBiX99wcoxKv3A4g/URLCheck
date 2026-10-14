using System.Text.Json;
using Photino.NET;
using Serilog;
using Swan;
using URLCheck.Models;
using URLCheck.Services;

namespace URLCheck.Messaging;

/// <summary>
/// Translates the JSON messages exchanged with the React front-end.
/// Incoming messages arrive through <see cref="PhotinoWindow.RegisterWebMessageReceivedHandler"/>;
/// outgoing messages are pushed back with <see cref="PhotinoWindow.SendWebMessage"/>.
/// </summary>
internal sealed class NativeBridge(WindowManager windows, SettingsService settings, ProtocolRegistrationService protocols)
{
    public async Task HandleMessageAsync(PhotinoWindow? window, string rawMessage)
    {
        Log.Debug("<< {Message}", rawMessage.RemoveControlChars().Truncate(600));

        NativeRequest? request;
        try
        {
            request = JsonSerializer.Deserialize<NativeRequest>(rawMessage, NativeProtocol.SerializerOptions);
        }
        catch (JsonException ex)
        {
            Log.Warning(ex, "Invalid JSON received");
            Send(window, NativeResponse.Failure(null, "error", "Invalid JSON payload."));
            return;
        }

        if (request?.Type is null or "")
            return;

        try
        {
            await DispatchAsync(window, request);
        }
        catch (Exception ex)
        {
            Log.Error(ex, "Handler for {Type} failed", request.Type);
            Send(window, NativeResponse.Failure(request.Id, $"{request.Type}.result", ex.Message));
        }
    }

    private async Task DispatchAsync(PhotinoWindow? window, NativeRequest request)
    {
        switch (request.Type)
        {
            case "settings.get":
                Send(window, NativeResponse.Success(request.Id, "settings.get.result", await PayloadAsync()));
                break;

            case "settings.save":
            {
                var incoming = request.Payload?.Deserialize<AppSettings>(NativeProtocol.SerializerOptions);
                if (incoming is null)
                {
                    Send(window, NativeResponse.Failure(request.Id, "settings.save.result", "Missing settings payload."));
                    return;
                }

                await settings.SaveAsync(incoming);
                Send(window, NativeResponse.Success(request.Id, "settings.save.result", await PayloadAsync()));
                windows.BroadcastEvent("settings.changed", await PayloadAsync());
                break;
            }

            case "settings.reset":
                await settings.ResetAsync();
                Send(window, NativeResponse.Success(request.Id, "settings.reset.result", await PayloadAsync()));
                windows.BroadcastEvent("settings.changed", await PayloadAsync());
                break;

            case "browsers.detect":
                Send(window, NativeResponse.Success(request.Id, "browsers.detect.result",
                    new { Browsers = BrowserService.DetectInstalledBrowsers() }));
                break;

            case "popup.show":
            {
                var payload = request.Payload?.Deserialize<PopupShowRequest>(NativeProtocol.SerializerOptions);
                if (string.IsNullOrWhiteSpace(payload?.Url))
                {
                    Send(window, NativeResponse.Failure(request.Id, "popup.show.result", "Missing URL."));
                    return;
                }

                windows.ShowPopup(payload.Url);
                Send(window, NativeResponse.Success(request.Id, "popup.show.result", new { Ok = true }));
                break;
            }

            case "popup.open":
            {
                var payload = request.Payload?.Deserialize<PopupOpenRequest>(NativeProtocol.SerializerOptions);
                if (string.IsNullOrWhiteSpace(payload?.Url))
                {
                    Send(window, NativeResponse.Failure(request.Id, "popup.open.result", "Missing URL."));
                    return;
                }

                var browser = ResolveBrowser(await settings.GetAsync(), payload.BrowserId);
                if (browser is null)
                {
                    Send(window, NativeResponse.Failure(request.Id, "popup.open.result",
                        "No browser configured. Add one in Settings."));
                    return;
                }

                BrowserService.Launch(browser.ExecutablePath, payload.Url);
                Send(window, NativeResponse.Success(request.Id, "popup.open.result",
                    new { Ok = true, Browser = browser.Name }));
                break;
            }

            case "popup.close":
                windows.CloseWindow(window);
                break;

            case "window.drag":
                windows.StartDrag(window);
                break;

            case "app.registerProtocols":
                protocols.Register();
                Send(window, NativeResponse.Success(request.Id, "app.registerProtocols.result",
                    new { Ok = true, ExecutablePath = protocols.ExecutablePath }));
                break;

            case "app.openDefaultApps":
                protocols.OpenDefaultAppsSettings();
                Send(window, NativeResponse.Success(request.Id, "app.openDefaultApps.result", new { Ok = true }));
                break;

            default:
                Log.Debug("No handler registered for message type {Type}", request.Type);
                if (request.Id is { Length: > 0 })
                    Send(window, NativeResponse.Failure(request.Id, $"{request.Type}.result", $"Unsupported message type '{request.Type}'."));
                break;
        }
    }

    private async Task<SettingsPayload> PayloadAsync() =>
        new(await settings.GetAsync(), settings.SettingsFilePath);

    private static BrowserEntry? ResolveBrowser(AppSettings current, string? browserId) =>
        current.Browsers.Count == 0
            ? null
            : current.Browsers.FirstOrDefault(browser => browser.Id == browserId) ?? current.Browsers[0];

    private static void Send(PhotinoWindow? window, NativeResponse response)
    {
        var json = NativeProtocol.SerializeResponse(response);
        Log.Debug(">> {Message}", json.RemoveControlChars().Truncate(600));
        window?.SendWebMessage(json);
    }
}
