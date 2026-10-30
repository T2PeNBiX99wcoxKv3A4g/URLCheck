using System.Text.Json;
using JetBrains.Annotations;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Localization;
using PhotinoNetUtils.Messaging;
using PhotinoNetUtils.Utils;
using URLCheck.Messaging;
using URLCheck.Models;
using URLCheck.Platform;

namespace URLCheck.Services;

/// <summary>
///     Loads and persists <see cref="AppSettings" /> as JSON in the per-user config folder
///     (<c>%APPDATA%\URLCheck</c> on Windows, <c>~/.config/URLCheck</c> on Linux).
///     The first read seeds the browser list so the popup works out of the box.
/// </summary>
internal sealed class SettingsService : Singleton<SettingsService>
{
    private static readonly JsonSerializerOptions SettingsFileOptions = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true,
        TypeInfoResolver = AppJsonContext.Default
    };

    private readonly IBrowserLocator _browserLocator = PlatformServices.BrowserLocator;
    private readonly SemaphoreSlim _gate = new(1, 1);

    public SettingsService()
    {
        var directory = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
            Constants.Name);
        Directory.CreateDirectory(directory);
        SettingsFilePath = Path.Combine(directory, "settings.json");
        NativeBridge.MessageReceived += HandleMessageAsync;
    }

    [PublicAPI] public string SettingsFilePath { get; }

    /// <summary>The language from the cached settings (falls back before the first load).</summary>
    public string Language => Current?.Language ?? AppSettings.DefaultLanguage;

    /// <summary>The cached settings, for synchronous callers that cannot await a load.</summary>
    public AppSettings? Current { get; private set; }

    /// <summary>Raised after the settings are saved or reset.</summary>
    public static event Action<SettingsPayload>? Changed;

    /// <summary>Handles the <c>settings.*</c> messages.</summary>
    private async Task<NativeResponse?> HandleMessageAsync(NativeContext context)
    {
        switch (context.Request.Type)
        {
            case "settings.get":
                return context.Reply("settings.get.result", await PayloadAsync());

            case "settings.save":
            {
                var incoming = context.Payload<AppSettings>();
                if (incoming is null)
                    return context.Fail("settings.save.result", "error.missingSettings");

                await SaveAsync(incoming);
                return context.Reply("settings.save.result", await PublishAsync());
            }

            case "settings.addAutoRedirect":
            {
                if (context.Payload<AutoRedirectRequest>()?.Url is not { Length: > 0 } url ||
                    !Uri.TryCreate(url, UriKind.Absolute, out var uri) ||
                    uri.Host.Length == 0)
                    return context.Fail("settings.addAutoRedirect.result", "error.missingUrl");

                var settings = await GetAsync();
                var host = uri.Host.ToLowerInvariant();
                if (!settings.AutoRedirectHosts.Contains(host, StringComparer.OrdinalIgnoreCase))
                {
                    settings.AutoRedirectHosts.Add(host);
                    await SaveAndPublishAsync(settings);
                }

                return context.Reply("settings.addAutoRedirect.result", new OkPayload());
            }

            case "settings.reset":
                await ResetAsync();
                return context.Reply("settings.reset.result", await PublishAsync());

            default:
                return null;
        }
    }

    /// <summary>Returns the settings, loading them from disk on first use.</summary>
    public async Task<AppSettings> GetAsync()
    {
        if (Current is not null)
            return Current;

        await _gate.WaitAsync();
        try
        {
            if (Current is not null)
                return Current;

            Current = await ReadAsync();
            Current.Normalize();
            return Current;
        }
        finally
        {
            _gate.Release();
        }
    }

    [PublicAPI]
    public async Task<AppSettings> SaveAsync(AppSettings settings)
    {
        settings.Normalize();

        await _gate.WaitAsync();
        try
        {
            await File.WriteAllTextAsync(SettingsFilePath,
                JsonSerializer.Serialize(settings, SettingsFileOptions.GetTypeInfo(typeof(AppSettings))));
            Current = settings;
            return settings;
        }
        finally
        {
            _gate.Release();
        }
    }

    /// <summary>Saves and notifies the UI, for changes the backend makes on its own.</summary>
    public async Task<AppSettings> SaveAndPublishAsync(AppSettings settings)
    {
        await SaveAsync(settings);
        Changed?.Invoke(new(settings, SettingsFilePath));
        return settings;
    }

    /// <summary>Restores defaults, re-detecting the installed browsers.</summary>
    [PublicAPI]
    public Task<AppSettings> ResetAsync() =>
        SaveAsync(new()
        {
            Browsers = [.. _browserLocator.Detect()]
        });

    private async Task<SettingsPayload> PayloadAsync() => new(await GetAsync(), SettingsFilePath);

    private async Task<SettingsPayload> PublishAsync()
    {
        var payload = await PayloadAsync();
        Changed?.Invoke(payload);
        return payload;
    }

    private async Task<AppSettings> ReadAsync()
    {
        if (!File.Exists(SettingsFilePath))
            return new()
            {
                Browsers = [.. _browserLocator.Detect()],
                Language = Localization.ResolveSystemLocale()
            };

        return (await Try.Run(async () =>
        {
            var json = await File.ReadAllTextAsync(SettingsFilePath);
            return JsonSerializer.Deserialize(json, SettingsFileOptions.GetTypeInfo(typeof(AppSettings)))
                as AppSettings ?? new AppSettings();
        })).GetOrElse(ex =>
        {
            Log.Warning(ex, "Failed to load settings from {Path}", SettingsFilePath);
            return new();
        });
    }
}