using JetBrains.Annotations;
using PhotinoNetUtils;
using Serilog;

namespace URLCheck;

[PublicAPI]
public static class Constants
{
#if DEBUG
    [PublicAPI] internal const bool IsDebugMode = true;
#else
    [PublicAPI] internal const bool IsDebugMode = false;
#endif

    public const string Name = "URLCheck";
    public const string WindowTitle = Name;
    public const string PopupTitle = "Popup";

    /// <summary>
    ///     Title of the tiny window that hosts the floating button. The GTK platform looks windows up by
    ///     title, so it has to be unique and stable.
    /// </summary>
    public const string SelectionButtonTitle = "SelectionButton";

    /// <summary>
    ///     The shared "Core" logger. Resolved from the configured <see cref="Log.Logger" /> on every
    ///     access, so it must not be captured before <see cref="Logging.Initialize" /> has run.
    /// </summary>
    internal static ILogger Logger => Log.Logger.ForContext("SourceContext", "Core");

    /// <summary>
    ///     Where the rolling log files are written. The logging library owns the exact location, so the
    ///     conventional folder is only a fallback: the one that really holds log files wins.
    /// </summary>
    internal static string LogDirectory
    {
        get
        {
            string[] candidates =
            [
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), Name, "logs"),
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), Name, "logs")
            ];

            return candidates.FirstOrDefault(Directory.Exists) ?? candidates[0];
        }
    }

    /// <summary>
    ///     A directory we own, used as the host's content root. The static server creates a <c>wwwroot</c>
    ///     web root under it when missing, which without this would land next to the executable.
    /// </summary>
    internal static string DataDirectory
    {
        get
        {
            var path = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), Name);
            Directory.CreateDirectory(path);
            return path;
        }
    }
}