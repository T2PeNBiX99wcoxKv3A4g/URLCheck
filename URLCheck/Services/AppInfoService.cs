using JetBrains.Annotations;
using URLCheck.Messaging;
using URLCheck.Utils;

namespace URLCheck.Services;

/// <summary>Answers the <c>app.info</c> message so the UI can show the build version.</summary>
internal sealed class AppInfoService : Singleton<AppInfoService>
{
    /// <summary>The version declared in the csproj (<c>&lt;Version&gt;</c>).</summary>
    [PublicAPI] public static readonly string Version =
        typeof(AppInfoService).Assembly.GetName().Version?.ToString(3) ?? "0.0.0";

    /// <summary>Lower-case platform id, so the UI can adapt platform-specific actions.</summary>
    [PublicAPI] public static readonly string Platform =
        OperatingSystem.IsWindows() ? "windows" :
        OperatingSystem.IsLinux() ? "linux" : "unknown";

    /// <summary>
    ///     Changes whenever this build does. The interface is always served from the same address, so
    ///     this is what tells the web view that what it cached belongs to an older build.
    /// </summary>
    [PublicAPI] public static readonly string BuildToken = ResolveBuildToken();

    public AppInfoService() => NativeBridge.MessageReceived += HandleMessageAsync;

    private static Task<NativeResponse?> HandleMessageAsync(NativeContext context) =>
        context.Request.Type == "app.info"
            ? Task.FromResult<NativeResponse?>(context.Reply("app.info.result",
                new AppInfoPayload(Version, Platform)))
            : Task.FromResult<NativeResponse?>(null);

    /// <summary>The executable's write time, which a replacement binary always changes.</summary>
    private static string ResolveBuildToken()
    {
        var executable = Environment.ProcessPath;
        return string.IsNullOrEmpty(executable)
            ? Version
            : File.GetLastWriteTimeUtc(executable).Ticks.ToString();
    }
}