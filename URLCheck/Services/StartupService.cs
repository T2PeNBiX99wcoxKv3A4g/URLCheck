using System.Runtime.Versioning;
using JetBrains.Annotations;
using Serilog;
using URLCheck.Messaging;
using URLCheck.Platform;

namespace URLCheck.Services;

/// <summary>
///     Adds or removes the per-user startup shortcut. Nothing is stored in the settings: the
///     shortcut's presence <em>is</em> the state, exactly like the shell's own Startup folder, so
///     removing the file by hand turns the feature off too.
/// </summary>
[PublicAPI]
internal sealed class StartupService
{
    private const string ShortcutName = "URLCheck.lnk";

    private readonly string _shortcutPath;

    public StartupService()
    {
        _shortcutPath = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.Startup), ShortcutName);
        NativeBridge.MessageReceived += HandleMessageAsync;
    }

    /// <summary>Only Windows has a per-user Startup folder this app can drop a shortcut into.</summary>
    public static bool IsSupported => OperatingSystem.IsWindows();

    private bool IsEnabled => IsSupported && File.Exists(_shortcutPath);

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

        try
        {
            if (enabled)
            {
                if (OperatingSystem.IsWindows()) Create();
            }
            else if (File.Exists(_shortcutPath))
            {
                File.Delete(_shortcutPath);
            }
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to update the startup shortcut");
        }

        return context.Reply("app.setStartup.result", new StartupPayload(IsSupported, IsEnabled));
    }

    [SupportedOSPlatform("windows")]
    private void Create()
    {
        var executable = Environment.ProcessPath;
        if (string.IsNullOrEmpty(executable))
        {
            Log.Warning("Cannot create the startup shortcut: the executable path is unknown");
            return;
        }

        WindowsShortcut.Create(_shortcutPath, executable, "", Path.GetDirectoryName(executable) ?? "",
            Constants.WindowTitle);
    }
}
