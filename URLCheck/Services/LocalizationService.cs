using System.Globalization;
using System.Text.Json;
using Serilog;
using URLCheck.Messaging;

namespace URLCheck.Services;

/// <summary>
///     Loads UI strings from the embedded <c>Resources/i18n/*.jsonc</c> files, so the desktop backend
///     and the React front-end read the exact same text.
/// </summary>
internal sealed class LocalizationService
{
    public const string DefaultLocale = "en";

    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web)
    {
        ReadCommentHandling = JsonCommentHandling.Skip,
        AllowTrailingCommas = true
    };

    private readonly Dictionary<string, Dictionary<string, string>> _cache = new(StringComparer.OrdinalIgnoreCase);
    private readonly SettingsService _settings;
    private readonly Lock _sync = new();

    public LocalizationService(SettingsService settings)
    {
        _settings = settings;
        NativeBridge.MessageReceived += HandleMessageAsync;
    }

    /// <summary>Locales discovered from the embedded translation files.</summary>
    public static IReadOnlyList<string> AvailableLocales { get; } = DiscoverLocales();

    /// <summary>The language currently selected in the settings.</summary>
    public string CurrentLanguage => _settings.Language;

    /// <summary>Looks a key up in the current language.</summary>
    public string Get(string key) => Get(CurrentLanguage, key);

    public string Get(string locale, string key) =>
        Load(locale).TryGetValue(key, out var value) ? value : key;

    /// <summary>Best matching embedded locale for the OS UI culture.</summary>
    public static string ResolveSystemLocale()
    {
        var culture = CultureInfo.CurrentUICulture.Name;

        return AvailableLocales.FirstOrDefault(locale => locale.Equals(culture, StringComparison.OrdinalIgnoreCase))
               ?? AvailableLocales.FirstOrDefault(locale =>
                   locale.Split('-')[0].Equals(culture.Split('-')[0], StringComparison.OrdinalIgnoreCase))
               ?? DefaultLocale;
    }

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context)
    {
        if (context.Request.Type != "i18n.get")
            return Task.FromResult<NativeResponse?>(null);

        var requested = context.Payload<LocaleRequest>()?.Locale;
        var locale = string.IsNullOrWhiteSpace(requested) ? CurrentLanguage : requested;
        if (string.IsNullOrWhiteSpace(locale))
            locale = DefaultLocale;

        return Task.FromResult<NativeResponse?>(context.Reply("i18n.get.result", new
        {
            Locale = locale,
            Strings = Load(locale),
            Available = AvailableLocales
        }));
    }

    private Dictionary<string, string> Load(string locale)
    {
        lock (_sync)
        {
            if (_cache.TryGetValue(locale, out var cached))
                return cached;

            var merged = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            foreach (var candidate in FallbackChain(locale))
            foreach (var pair in ReadFile(candidate))
                merged.TryAdd(pair.Key, pair.Value);

            _cache[locale] = merged;
            return merged;
        }
    }

    private static Dictionary<string, string> ReadFile(string locale)
    {
        using var stream = typeof(LocalizationService).Assembly
            .GetManifestResourceStream($"URLCheck.Resources.i18n.{locale}.jsonc");

        if (stream is null)
            return new();

        try
        {
            return JsonSerializer.Deserialize<Dictionary<string, string>>(stream, JsonOptions)
                   ?? new Dictionary<string, string>();
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to read the translation file for {Locale}", locale);
            return new();
        }
    }

    private static IEnumerable<string> FallbackChain(string locale)
    {
        yield return locale;

        var language = locale.Split('-')[0];
        if (!language.Equals(locale, StringComparison.OrdinalIgnoreCase))
            yield return language;

        if (!DefaultLocale.Equals(locale, StringComparison.OrdinalIgnoreCase))
            yield return DefaultLocale;
    }

    private static IReadOnlyList<string> DiscoverLocales()
    {
        const string prefix = "URLCheck.Resources.i18n.";
        const string suffix = ".jsonc";

        return
        [
            .. typeof(LocalizationService).Assembly.GetManifestResourceNames()
                .Where(name => name.StartsWith(prefix, StringComparison.Ordinal) &&
                               name.EndsWith(suffix, StringComparison.Ordinal))
                .Select(name => name[prefix.Length..^suffix.Length])
                .OrderBy(name => name, StringComparer.Ordinal)
        ];
    }
}