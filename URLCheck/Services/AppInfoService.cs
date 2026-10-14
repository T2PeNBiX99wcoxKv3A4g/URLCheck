using URLCheck.Messaging;

namespace URLCheck.Services;

/// <summary>Answers the <c>app.info</c> message so the UI can show the build version.</summary>
internal sealed class AppInfoService
{
    /// <summary>The version declared in the csproj (<c>&lt;Version&gt;</c>).</summary>
    public static readonly string Version =
        typeof(AppInfoService).Assembly.GetName().Version?.ToString(3) ?? "0.0.0";

    public AppInfoService() => NativeBridge.MessageReceived += HandleMessageAsync;

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) =>
        context.Request.Type == "app.info"
            ? Task.FromResult<NativeResponse?>(context.Reply("app.info.result", new { Version }))
            : Task.FromResult<NativeResponse?>(null);
}
