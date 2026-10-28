using System.Runtime.Versioning;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;
using ShellLink;

namespace URLCheck.Platform;

/// <summary>
///     Keeps the Start Menu shortcut that Photino creates in step with the running build.
/// </summary>
/// <remarks>
///     Photino writes that shortcut when the main window registers for notifications, because Windows
///     needs one to attribute toasts to, and it only ever writes it once. A build that later moves —
///     from an unzipped folder to the installer's location, or to a new folder after an upgrade —
///     therefore leaves a shortcut that keeps starting the old copy. This rewrites it whenever it
///     points somewhere else, and creates it when it is missing altogether.
/// </remarks>
[SupportedOSPlatform("windows")]
internal static class StartMenuShortcut
{
    /// <summary>Points the shortcut at this executable, unless it already does.</summary>
    public static void Refresh()
    {
        var executable = Environment.ProcessPath;
        if (string.IsNullOrEmpty(executable))
            return;

        var link = ShortcutPath();

        var current = Try.Run(() => File.Exists(link) ? TargetOf(link) : null)
            .OnFailure(ex => Constants.Logger.Debug(ex, "Could not read {Path}", link))
            .GetOrNull();

        if (current is not null && current.Equals(executable, StringComparison.OrdinalIgnoreCase))
            return;

        Constants.Logger.Information("Repointing the Start Menu shortcut from {Old} to {New}",
            current ?? "(missing)", executable);

        WindowsShortcut.Create(link, executable, "", Path.GetDirectoryName(executable) ?? "",
            Constants.WindowTitle);
    }

    /// <summary>The file Photino names after the window, in the per-user Start Menu's Programs folder.</summary>
    private static string ShortcutPath() => Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.Programs), $"{Constants.WindowTitle}.lnk");

    /// <summary>The target stored in a shortcut, or null when it cannot be read.</summary>
    private static string? TargetOf(string link) => Shortcut.ReadFromFile(link).LinkTargetIDList?.Path;
}
