using System.Text.Json;
using URLCheck.Models;

namespace URLCheck.Services;

/// <summary>
/// Loads and persists <see cref="AppSettings"/> as JSON under the user's roaming application data
/// folder (e.g. <c>%APPDATA%\URLCheck\settings.json</c>).
/// </summary>
internal sealed class SettingsService
{
    private static readonly JsonSerializerOptions SerializerOptions = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true,
    };

    private readonly Lock _sync = new();

    public SettingsService()
    {
        var directory = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
            "URLCheck");

        Directory.CreateDirectory(directory);
        SettingsFilePath = Path.Combine(directory, "settings.json");

        Current = Load();
    }

    /// <summary>Absolute path of the JSON file the settings are stored in.</summary>
    public string SettingsFilePath { get; }

    /// <summary>The settings currently held in memory.</summary>
    public AppSettings Current { get; private set; }

    public AppSettings Load()
    {
        lock (_sync)
        {
            try
            {
                if (File.Exists(SettingsFilePath))
                {
                    var json = File.ReadAllText(SettingsFilePath);
                    var settings = JsonSerializer.Deserialize<AppSettings>(json, SerializerOptions);
                    if (settings is not null)
                    {
                        settings.Normalize();
                        return settings;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[settings] Failed to load '{SettingsFilePath}': {ex.Message}");
            }

            return new AppSettings();
        }
    }

    public AppSettings Save(AppSettings settings)
    {
        ArgumentNullException.ThrowIfNull(settings);

        lock (_sync)
        {
            settings.Normalize();

            var json = JsonSerializer.Serialize(settings, SerializerOptions);
            File.WriteAllText(SettingsFilePath, json);

            Current = settings;
            return Current;
        }
    }

    public AppSettings Reset() => Save(new AppSettings());
}
