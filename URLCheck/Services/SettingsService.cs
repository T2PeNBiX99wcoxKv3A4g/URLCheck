using System.Text.Json;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Services;
using URLCheck.Messaging;
using URLCheck.Models;
using URLCheck.Platform;

namespace URLCheck.Services;

/// <summary>
///     Owns the TOML settings file and its standard bridge messages. The shared base handles
///     loading, saving, JSON-to-TOML migration and the change notification.
/// </summary>
internal sealed class SettingsService() : SettingsServiceBase<SettingsService, AppSettings, SettingsPayload>(
    new TomlSettingsStore<AppSettings>(
        Path.Combine(Constants.SettingsDirectory, "settings.toml"),
        Defaults(),
        AppTomlContext.Default.AppSettings,
        json => JsonSerializer.Deserialize(json, AppJsonContext.Default.AppSettings),
        LegacySettingsPath,
        Header),
    (type, data) => WindowManager.Instance.BroadcastEventIfReady(type, data))
{
    private const string Header =
        "# URLCheck settings. Rewritten when settings are saved; comments are not preserved.";

    /// <summary>
    ///     What a first run and a reset both start from: the model's own defaults, plus the browsers
    ///     that are really installed. Both paths go through here, so they cannot drift apart.
    /// </summary>
    private static AppSettings Defaults() => new()
    {
        Browsers = [.. PlatformServices.BrowserLocator.Detect()]
    };

    /// <summary>The old JSON file, read once when the TOML file does not exist yet.</summary>
    private static readonly string? LegacySettingsPath = new[]
    {
        Path.Combine(Constants.SettingsDirectory, "settings.json"), Path.Combine(Constants.DataDirectory, "settings.json")
    }.FirstOrDefault(File.Exists);

    /// <summary>The language from the loaded settings.</summary>
    public string Language => Current.Language;

    protected override SettingsPayload Payload() => new(Current, FilePath, new(
        AppSettings.TimeoutMinMs, AppSettings.TimeoutMaxMs, AppSettings.FilterAutoUpdateMaxMinutes));

    protected override AppSettings Normalize(AppSettings settings)
    {
        settings.Normalize();
        settings.Language = Localization.Normalize(settings.Language);
        return settings;
    }

    protected override async Task<NativeResponse?> HandleExtraAsync(NativeContext context)
    {
        switch (context.Request.Type)
        {
            case "settings.addAutoRedirect":
                return await AddAutoRedirectAsync(context);

            case "settings.reset":
                return await ResetAsync(context);

            default:
                return await base.HandleExtraAsync(context);
        }
    }

    /// <summary>Adds a URL's host to the auto-redirect list, keeping the list unique.</summary>
    private async Task<NativeResponse?> AddAutoRedirectAsync(NativeContext context)
    {
        if (context.Payload<AutoRedirectRequest>()?.Url is not { Length: > 0 } url ||
            !Uri.TryCreate(url, UriKind.Absolute, out var uri) ||
            uri.Host.Length == 0)
            return context.Fail("settings.addAutoRedirect.result", "error.missingUrl");

        var settings = Current.Clone();
        settings.AutoRedirectHosts = [.. settings.AutoRedirectHosts];
        var host = uri.Host.ToLowerInvariant();

        if (!settings.AutoRedirectHosts.Contains(host, StringComparer.OrdinalIgnoreCase))
        {
            settings.AutoRedirectHosts.Add(host);
            await SaveAsync(settings);
        }

        return context.Reply("settings.addAutoRedirect.result", new OkPayload());
    }

    /// <summary>Restores defaults, re-detecting the installed browsers.</summary>
    private async Task<NativeResponse?> ResetAsync(NativeContext context)
    {
        await SaveAsync(Defaults());

        return context.Reply("settings.reset.result", Payload());
    }
}