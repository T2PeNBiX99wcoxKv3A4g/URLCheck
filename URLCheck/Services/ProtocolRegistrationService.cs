using JetBrains.Annotations;
using URLCheck.Messaging;
using URLCheck.Platform;

namespace URLCheck.Services;

/// <summary>
///     Exposes the platform protocol registrar (<see cref="IProtocolRegistrar" />) over the native
///     message bridge.
/// </summary>
internal sealed class ProtocolRegistrationService
{
    private readonly IProtocolRegistrar _registrar;

    public ProtocolRegistrationService(IProtocolRegistrar registrar)
    {
        _registrar = registrar;
        NativeBridge.MessageReceived += HandleMessageAsync;
    }

    [PublicAPI] public string ExecutablePath => _registrar.ExecutablePath;

    /// <summary>Handles the <c>app.*</c> messages.</summary>
    private Task<NativeResponse?> HandleMessageAsync(NativeContext context)
    {
        var response = context.Request.Type switch
        {
            "app.registerProtocols" => RegisterBrowserReply(context),
            "app.registerCustomScheme" => RegisterCustomSchemeReply(context),
            "app.unregisterProtocols" => UnregisterReply(context),
            "app.protocolStatus" => StatusReply(context),
            "app.openDefaultApps" => OpenDefaultAppsReply(context),
            _ => null
        };

        return Task.FromResult(response);
    }

    private NativeResponse RegisterBrowserReply(NativeContext context)
    {
        _registrar.RegisterBrowser();
        return context.Reply("app.registerProtocols.result", new RegisterPayload(true, ExecutablePath));
    }

    private NativeResponse RegisterCustomSchemeReply(NativeContext context)
    {
        _registrar.RegisterCustomScheme();
        return context.Reply("app.registerCustomScheme.result", new RegisterPayload(true, ExecutablePath));
    }

    private NativeResponse UnregisterReply(NativeContext context)
    {
        _registrar.Unregister();
        return context.Reply("app.unregisterProtocols.result", new OkPayload());
    }

    private NativeResponse StatusReply(NativeContext context) =>
        context.Reply("app.protocolStatus.result",
            new ProtocolStatusPayload(_registrar.IsDefaultBrowser(), _registrar.IsCustomSchemeRegistered()));

    private NativeResponse OpenDefaultAppsReply(NativeContext context)
    {
        _registrar.OpenDefaultAppsSettings();
        return context.Reply("app.openDefaultApps.result", new OkPayload());
    }
}
