using System.Text.Json;
using Serilog;
using URLCheck.Models;

namespace URLCheck.Services;

/// <summary>
/// Loads and persists <see cref="AppSettings"/> as JSON under <c>%APPDATA%\URLCheck</c>.
/// The first read seeds the browser list so the popup works out of the box.
/// </summary>
internal sealed class SettingsService
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web) { WriteIndented = true };

    private readonly SemaphoreSlim _gate = new(1, 1);
    private AppSettings? _current;

    public SettingsService()
    {
        var directory = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "URLCheck");
        Directory.CreateDirectory(directory);
        SettingsFilePath = Path.Combine(directory, "settings.json");
    }

    public string SettingsFilePath { get; }

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
    public Task<AppSettings> ResetAsync() =>
        SaveAsync(new AppSettings { Browsers = [.. BrowserService.DetectInstalledBrowsers()] });

    private async Task<AppSettings> ReadAsync()
    {
        if (!File.Exists(SettingsFilePath))
            return new AppSettings { Browsers = [.. BrowserService.DetectInstalledBrowsers()] };

        try
        {
            var json = await File.ReadAllTextAsync(SettingsFilePath);
            return JsonSerializer.Deserialize<AppSettings>(json, JsonOptions) ?? new AppSettings();
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to load settings from {Path}", SettingsFilePath);
            return new AppSettings();
        }
    }
}
