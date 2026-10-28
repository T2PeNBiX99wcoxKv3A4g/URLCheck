using System.Runtime.Versioning;
using JetBrains.Annotations;
using PhotinoNetUtils;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Platform;
using URLCheck.Messaging;
using URLCheck.Platform;
using PhotinoNetUtils.Utils;

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
    private const string ShortcutName = "URLCheck.lnk";
    private const string DesktopEntryName = "URLCheck.desktop";

    private readonly string _entryPath;

    public StartupService()
    {
        _entryPath = OperatingSystem.IsWindows()
            ? Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Startup), ShortcutName)
            : Path.Combine(ConfigHome(), "autostart", DesktopEntryName);

        NativeBridge.MessageReceived += HandleMessageAsync;
        Refresh();
    }

    /// <summary>True on the platforms that have a per-user autostart location we can write to.</summary>
    public static bool IsSupported => OperatingSystem.IsWindows() || OperatingSystem.IsLinux();

    private bool IsEnabled => IsSupported && File.Exists(_entryPath);

    /// <summary>
    ///     Rewrites an autostart entry that already exists, so one left by an older version picks up
    ///     fixes to it — its icon, or a moved executable — without the setting being toggled.
    /// </summary>
    private void Refresh()
    {
        if (!IsEnabled)
            return;

        Try.Run(Create).OnFailure(ex => Log.Warning(ex, "Failed to refresh the autostart entry"));
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

        Try.Run(() =>
        {
            if (enabled)
                Create();
            else if (File.Exists(_entryPath))
                File.Delete(_entryPath);
        }).OnFailure(ex => Log.Warning(ex, "Failed to update the autostart entry"));

        return context.Reply("app.setStartup.result", new StartupPayload(IsSupported, IsEnabled));
    }

    private void Create()
    {
        var executable = Environment.ProcessPath;
        if (string.IsNullOrEmpty(executable))
        {
            Log.Warning("Cannot create the autostart entry: the executable path is unknown");
            return;
        }

        if (OperatingSystem.IsLinux())
            WriteDesktopEntry(executable);
        else if (OperatingSystem.IsWindows())
            WindowsShortcut.Create(_entryPath, executable, "", Path.GetDirectoryName(executable) ?? "",
                Constants.WindowTitle);
    }

    [SupportedOSPlatform("linux")]
    private void WriteDesktopEntry(string executable)
    {
        Directory.CreateDirectory(Path.GetDirectoryName(_entryPath)!);

        // Mirrors the desktop entry the protocol registrar writes: without an icon the session's
        // autostart list shows a blank entry, and without the app id the window is not associated with
        // that icon once it is up.
        var icon = AppIcon.EnsureExtracted(typeof(StartupService).Assembly, Constants.Name) ?? "web-browser";

        // Built line by line rather than as one raw string, so that no source indentation can leak into
        // the file, and written without a BOM: Encoding.UTF8 would prepend one, hiding the
        // [Desktop Entry] group from the session's parser, which then reports a missing Type= line.
        // The executable is quoted because an installation path may contain spaces.
        File.WriteAllText(_entryPath, string.Join("\n",
            "[Desktop Entry]",
            "Type=Application",
            $"Name={Constants.WindowTitle}",
            $"Comment={Constants.WindowTitle} URL intermediary",
            $"Exec=\"{executable}\"",
            $"Icon={icon}",
            $"StartupWMClass={LinuxProtocolRegistrar.ProcessName}",
            "Terminal=false",
            "X-GNOME-Autostart-enabled=true",
            ""));

        // The session only runs an entry it can execute, and a file manager refuses to launch one that
        // is not marked executable, which is how a plain write (0644) leaves it.
        File.SetUnixFileMode(_entryPath, File.GetUnixFileMode(_entryPath) | UnixFileMode.UserExecute);
    }

    /// <summary>The XDG config directory, which is where autostart entries live.</summary>
    private static string ConfigHome()
    {
        var configured = Environment.GetEnvironmentVariable("XDG_CONFIG_HOME");
        return string.IsNullOrEmpty(configured)
            ? Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), ".config")
            : configured;
    }
}