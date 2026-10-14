using System.Text.Json;
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
    private readonly WindowManager _windows;
    private readonly SettingsService _settingsService;
    private readonly ProtocolRegistrationService _protocols;

    public NativeBridge(WindowManager windows, SettingsService settingsService, ProtocolRegistrationService protocols)
    {
        _windows = windows;
        _settingsService = settingsService;
        _protocols = protocols;
    }

    public void HandleMessage(PhotinoWindow? window, string rawMessage)
    {
        Console.WriteLine($"[bridge] << {rawMessage}");

        NativeRequest? request;
        try
        {
            request = JsonSerializer.Deserialize<NativeRequest>(rawMessage, NativeProtocol.SerializerOptions);
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
                var incoming = request.Payload?.Deserialize<AppSettings>(NativeProtocol.SerializerOptions);
                if (incoming is null)
                {
                    Send(window, NativeResponse.Failure(request.Id, "settings.save.result", "Missing settings payload."));
                    return;
                }

                _settingsService.Save(incoming);
                Send(window, NativeResponse.Success(request.Id, "settings.save.result", CreateSettingsPayload()));
                _windows.BroadcastEvent("settings.changed", CreateSettingsPayload());
                break;
            }

            case "settings.reset":
                _settingsService.Reset();
                Send(window, NativeResponse.Success(request.Id, "settings.reset.result", CreateSettingsPayload()));
                _windows.BroadcastEvent("settings.changed", CreateSettingsPayload());
                break;

            case "browsers.detect":
                Send(window, NativeResponse.Success(request.Id, "browsers.detect.result",
                    new { Browsers = BrowserService.DetectInstalledBrowsers() }));
                break;

            case "popup.show":
            {
                var payload = request.Payload?.Deserialize<PopupShowRequest>(NativeProtocol.SerializerOptions);
                if (payload is null || string.IsNullOrWhiteSpace(payload.Url))
                {
                    Send(window, NativeResponse.Failure(request.Id, "popup.show.result", "Missing URL."));
                    return;
                }

                _windows.ShowPopup(payload.Url);
                Send(window, NativeResponse.Success(request.Id, "popup.show.result", new { Ok = true }));
                break;
            }

            case "popup.open":
            {
                var payload = request.Payload?.Deserialize<PopupOpenRequest>(NativeProtocol.SerializerOptions);
                if (payload is null || string.IsNullOrWhiteSpace(payload.Url))
                {
                    Send(window, NativeResponse.Failure(request.Id, "popup.open.result", "Missing URL."));
                    return;
                }

                var browser = ResolveBrowser(payload.BrowserId);
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
                _windows.CloseWindow(window);
                break;

            case "app.registerProtocols":
                _protocols.Register();
                Send(window, NativeResponse.Success(request.Id, "app.registerProtocols.result",
                    new { Ok = true, ExecutablePath = _protocols.ExecutablePath }));
                break;

            case "app.openDefaultApps":
                _protocols.OpenDefaultAppsSettings();
                Send(window, NativeResponse.Success(request.Id, "app.openDefaultApps.result", new { Ok = true }));
                break;

            default:
                Console.WriteLine($"[bridge] No handler registered for message type '{request.Type}'.");
                if (!string.IsNullOrEmpty(request.Id))
                    Send(window, NativeResponse.Failure(request.Id, $"{request.Type}.result", $"Unsupported message type '{request.Type}'."));
                break;
        }
    }

    private BrowserEntry? ResolveBrowser(string? browserId)
    {
        var browsers = _settingsService.Current.Browsers;
        if (browsers.Count == 0)
            return null;

        if (!string.IsNullOrEmpty(browserId))
        {
            var match = browsers.FirstOrDefault(browser => browser.Id == browserId);
            if (match is not null)
                return match;
        }

        return browsers[0];
    }

    private SettingsPayload CreateSettingsPayload() =>
        new(_settingsService.Current, _settingsService.SettingsFilePath);

    private static void Send(PhotinoWindow? window, NativeResponse response)
    {
        var json = NativeProtocol.SerializeResponse(response);
        Console.WriteLine($"[bridge] >> {json}");
        window?.SendWebMessage(json);
    }
}
