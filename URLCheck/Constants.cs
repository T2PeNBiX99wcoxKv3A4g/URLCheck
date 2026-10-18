using JetBrains.Annotations;
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

    internal static ILogger Logger = Log.ForContext("SourceContext", "Core");
}