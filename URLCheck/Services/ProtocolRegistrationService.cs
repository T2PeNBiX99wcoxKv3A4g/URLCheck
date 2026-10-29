using JetBrains.Annotations;
using PhotinoNetUtils.Messaging;
using URLCheck.Messaging;
using URLCheck.Platform;
using PhotinoNetUtils.Utils;

namespace URLCheck.Services;

/// <summary>
///     Exposes the platform protocol registrar (<see cref="IProtocolRegistrar" />) over the native
///     message bridge.
/// </summary>
internal sealed class ProtocolRegistrationService : Singleton<ProtocolRegistrationService>
{
    private static readonly TimeSpan StatusLifetime = TimeSpan.FromSeconds(2);

    private readonly IProtocolRegistrar _registrar = PlatformServices.ProtocolRegistrar;
    private ProtocolStatusPayload? _status;
    private DateTime _statusReadAt;

    public ProtocolRegistrationService() => NativeBridge.MessageReceived += HandleMessageAsync;

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
        InvalidateStatus();
        return context.Reply("app.registerProtocols.result", new RegisterPayload(true, ExecutablePath));
    }

    private NativeResponse RegisterCustomSchemeReply(NativeContext context)
    {
        _registrar.RegisterCustomScheme();
        InvalidateStatus();
        return context.Reply("app.registerCustomScheme.result", new RegisterPayload(true, ExecutablePath));
    }

    private NativeResponse UnregisterReply(NativeContext context)
    {
        _registrar.Unregister();
        InvalidateStatus();
        return context.Reply("app.unregisterProtocols.result", new OkPayload());
    }

    private NativeResponse StatusReply(NativeContext context) =>
        context.Reply("app.protocolStatus.result", Status());

    /// <summary>
    ///     The protocol status, cached very briefly. Probing it spawns <c>xdg-mime</c> processes on Linux
    ///     and the UI asks several times in a row, so the short lifetime collapses that burst without
    ///     hiding a change the user makes outside the app.
    /// </summary>
    private ProtocolStatusPayload Status()
    {
        if (_status is { } cached && DateTime.UtcNow - _statusReadAt < StatusLifetime)
            return cached;

        var registered = _registrar.RegisteredExecutablePath;
        var comparison = OperatingSystem.IsWindows()
            ? StringComparison.OrdinalIgnoreCase
            : StringComparison.Ordinal;

        _status = new(
            _registrar.IsDefaultBrowser(),
            _registrar.IsCustomSchemeRegistered(),
            registered is { Length: > 0 } && registered.Equals(_registrar.ExecutablePath, comparison),
            registered);
        _statusReadAt = DateTime.UtcNow;

        return _status;
    }

    /// <summary>Drops the cached status, because this app just changed the registration itself.</summary>
    private void InvalidateStatus() => _status = null;

    private NativeResponse OpenDefaultAppsReply(NativeContext context)
    {
        _registrar.OpenDefaultAppsSettings();
        return context.Reply("app.openDefaultApps.result", new OkPayload());
    }
}