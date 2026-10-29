using JetBrains.Annotations;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Platform;
using PhotinoNetUtils.Utils;
using URLCheck.Messaging;

namespace URLCheck.Services;

/// <summary>
///     Answers the <c>app.*</c> messages about the app itself: the build version, the platform, where
///     its logs are, and opening that folder for the user.
/// </summary>
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

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => Task.FromResult(
        context.Request.Type switch
        {
            "app.info" => Info(context),
            "app.openLogs" => OpenLogs(context),
            _ => null
        });

    private static NativeResponse Info(NativeContext context) =>
        context.Reply("app.info.result", new AppInfoPayload(Version, Platform, Constants.LogDirectory));

    /// <summary>
    ///     Opens the log folder in the desktop's file manager, so a bug report can be made without
    ///     hunting for the path by hand.
    /// </summary>
    private NativeResponse OpenLogs(NativeContext context)
    {
        var directory = Constants.LogDirectory;

        var started = Try.Run(() => SystemLauncher.Open(directory));

        if (started.Exception is not { } exception)
            return context.Reply("app.openLogs.result", new OkPayload());

        Log.Warning(exception, "Failed to open the log folder {Path}", directory);
        return context.Fail("app.openLogs.result", "error.openLogsFailed");
    }

    /// <summary>The executable's write time, which a replacement binary always changes.</summary>
    private static string ResolveBuildToken()
    {
        var executable = Environment.ProcessPath;
        return string.IsNullOrEmpty(executable)
            ? Version
            : File.GetLastWriteTimeUtc(executable).Ticks.ToString();
    }
}
