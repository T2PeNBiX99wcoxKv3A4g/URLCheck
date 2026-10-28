using System.Text.Json;
using Photino.NET;
using Serilog;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;

namespace URLCheck.Messaging;

/// <summary>
///     The transport for JSON messages exchanged with the React front-end.
///     It only parses, raises <see cref="MessageReceived" /> and serializes the reply — the actual
///     handling lives with the services that own each message type.
/// </summary>
internal static class NativeBridge
{
    /// <summary>
    ///     Raised for every incoming message. Handlers are awaited in subscription order and the first
    ///     non-null response wins.
    /// </summary>
    public static event NativeMessageHandler? MessageReceived;

    public static async Task HandleMessageAsync(PhotinoWindow? window, string rawMessage)
    {
        Log.Debug("<< {Message}", rawMessage.RemoveControlChars().Truncate(600));

        NativeRequest? request;
        try
        {
            request = JsonSerializer.Deserialize(rawMessage, AppJsonContext.Default.NativeRequest);
        }
        catch (JsonException ex)
        {
            Log.Warning(ex, "Invalid JSON received");
            Send(window, NativeResponse.Failure(null, "error", "error.invalidJson"));
            return;
        }

        if (request?.Type is null or "")
            return;

        var context = new NativeContext(window, request);

        (await Try.Run(async () =>
        {
            var response = await RaiseAsync(context);

            if (response is not null)
                Send(window, response);
            else if (context.WantsReply)
                Send(window, context.Fail($"{request.Type}.result", "error.unsupported"));
        })).OnFailure(ex =>
        {
            Log.Error(ex, "Handler for {Type} failed", request.Type);

            if (context.WantsReply)
                Send(window, context.Fail($"{request.Type}.result", ex.Message));
        });
    }

    private static async Task<NativeResponse?> RaiseAsync(NativeContext context)
    {
        if (MessageReceived is not { } handlers)
            return null;

        foreach (var handler in handlers.GetInvocationList().Cast<NativeMessageHandler>())
            if (await handler(context) is { } response)
                return response;

        return null;
    }

    private static void Send(PhotinoWindow? window, NativeResponse response)
    {
        var json = NativeProtocol.SerializeResponse(response);
        Log.Debug(">> {Message}", json.RemoveControlChars().Truncate(600));
        window?.SendWebMessage(json);
    }
}