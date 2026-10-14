using System.Text.Json;
using JetBrains.Annotations;
using Serilog;
using URLCheck.Messaging;
using URLCheck.Models;
using URLCheck.Platform;

namespace URLCheck.Services;

/// <summary>
///     Loads and persists <see cref="AppSettings" /> as JSON under <c>%APPDATA%\URLCheck</c>.
///     The first read seeds the browser list so the popup works out of the box.
/// </summary>
internal sealed class SettingsService
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true
    };

    private readonly IBrowserLocator _browserLocator;
    private readonly SemaphoreSlim _gate = new(1, 1);
    private AppSettings? _current;

    public SettingsService(IBrowserLocator browserLocator)
    {
        _browserLocator = browserLocator;

        var directory = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
            Constants.Name);
        Directory.CreateDirectory(directory);
        SettingsFilePath = Path.Combine(directory, "settings.json");
        NativeBridge.MessageReceived += HandleMessageAsync;
    }

    [PublicAPI] public string SettingsFilePath { get; }

    /// <summary>The language from the cached settings (falls back before the first load).</summary>
    public string Language => _current?.Language ?? AppSettings.DefaultLanguage;

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
        if (_current is not null)
            return _current;

        await _gate.WaitAsync();
        try
        {
            if (_current is not null)
                return _current;

            _current = await ReadAsync();
            _current.Normalize();
            return _current;
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
            await File.WriteAllTextAsync(SettingsFilePath, JsonSerializer.Serialize(settings, JsonOptions));
            _current = settings;
            return settings;
        }
        finally
        {
            _gate.Release();
        }
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
            return new AppSettings
            {
                Browsers = [.. _browserLocator.Detect()],
                Language = LocalizationService.ResolveSystemLocale()
            };

        try
        {
            var json = await File.ReadAllTextAsync(SettingsFilePath);
            return JsonSerializer.Deserialize<AppSettings>(json, JsonOptions) ?? new AppSettings();
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to load settings from {Path}", SettingsFilePath);
            return new();
        }
    }
}