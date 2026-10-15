using JetBrains.Annotations;
using URLCheck.Messaging;

namespace URLCheck.Services;

/// <summary>Answers the <c>app.info</c> message so the UI can show the build version.</summary>
internal sealed class AppInfoService
{
    /// <summary>The version declared in the csproj (<c>&lt;Version&gt;</c>).</summary>
    [PublicAPI] public static readonly string Version =
        typeof(AppInfoService).Assembly.GetName().Version?.ToString(3) ?? "0.0.0";

    /// <summary>Lower-case platform id, so the UI can adapt platform-specific actions.</summary>
    [PublicAPI] public static readonly string Platform =
        OperatingSystem.IsWindows() ? "windows" :
        OperatingSystem.IsLinux() ? "linux" : "unknown";

    public AppInfoService() => NativeBridge.MessageReceived += HandleMessageAsync;

    private static Task<NativeResponse?> HandleMessageAsync(NativeContext context) =>
        context.Request.Type == "app.info"
            ? Task.FromResult<NativeResponse?>(context.Reply("app.info.result",
                new AppInfoPayload(Version, Platform)))
            : Task.FromResult<NativeResponse?>(null);
}