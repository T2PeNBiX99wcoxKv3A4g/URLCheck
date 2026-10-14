using JetBrains.Annotations;

namespace URLCheck;

public static class Constants
{
#if DEBUG
    [PublicAPI] internal const bool IsDebugMode = true;
#else
    [PublicAPI] internal const bool IsDebugMode = false;
#endif

    public const string Name = "URLCheck";
    public const string WindowTitle = Name;
}