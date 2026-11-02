using JetBrains.Annotations;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Platform;
using PhotinoNetUtils.Utils;
using URLCheck.Messaging;
using URLCheck.Platform;

namespace URLCheck.Services;

/// <summary>
///     Registers URLCheck to start with the user's session. Nothing is stored in the settings: the
///     autostart entry's presence <em>is</em> the state, so deleting the file by hand turns the
///     feature off too.
/// </summary>
/// <remarks>
///     Windows uses a shortcut in the per-user Startup folder; the freedesktop desktops (KDE, GNOME,
///     XFCE, ...) use the XDG autostart directory, which is the same mechanism their own settings
///     panels write to.
/// </remarks>
[PublicAPI]
internal sealed class StartupService : Singleton<StartupService>
{
    private readonly StartupRegistration _registration = new(
        typeof(StartupService).Assembly,
        Constants.Name,
        "web-browser",
        $"{Constants.WindowTitle} URL intermediary",
        OperatingSystem.IsLinux() ? LinuxProtocolRegistrar.ProcessName : null);

    public StartupService()
    {
        NativeBridge.MessageReceived += HandleMessageAsync;
        Refresh();
    }

    /// <summary>True on the platforms that have a per-user autostart location we can write to.</summary>
    public static bool IsSupported => StartupRegistration.IsSupported;

    private bool IsEnabled => _registration.IsEnabled;

    /// <summary>
    ///     Rewrites an autostart entry that already exists, so one left by an older version picks up
    ///     fixes to it — its icon, or a moved executable — without the setting being toggled.
    /// </summary>
    private void Refresh()
    {
        if (!IsEnabled)
            return;

        Try.Run(_registration.Refresh).OnFailure(ex => Log.Warning(ex, "Failed to refresh the autostart entry"));
    }

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "app.startup" => Task.FromResult<NativeResponse?>(Status(context)),
        "app.setStartup" => Task.FromResult<NativeResponse?>(Set(context)),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    private NativeResponse Status(NativeContext context) =>
        context.Reply("app.startup.result", new StartupPayload(IsSupported, IsEnabled));

    private NativeResponse Set(NativeContext context)
    {
        var enabled = context.Payload<StartupRequest>()?.Enabled ?? false;

        if (!IsSupported)
            return context.Reply("app.setStartup.result", new StartupPayload(false, false));

        Try.Run(() => _registration.SetEnabled(enabled))
            .OnFailure(ex => Log.Warning(ex, "Failed to update the autostart entry"));

        return context.Reply("app.setStartup.result", new StartupPayload(IsSupported, IsEnabled));
    }
}