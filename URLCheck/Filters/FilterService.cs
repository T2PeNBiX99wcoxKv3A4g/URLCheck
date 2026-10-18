using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using JetBrains.Annotations;
using URLCheck.Extensions;
using URLCheck.Messaging;
using URLCheck.Models;
using URLCheck.Utils;

namespace URLCheck.Filters;

/// <summary>
///     Manages the URL-cleaning filter lists: the embedded built-in rules plus the lists the user
///     installs from the settings. Rule files are downloaded once and cached on disk, and the parsed
///     rules are handed to the popup so it can clean a URL without another round-trip.
/// </summary>
[PublicAPI]
internal sealed class FilterService : Singleton<FilterService>
{
    private static readonly JsonSerializerOptions ManifestOptions = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true,
        TypeInfoResolver = AppJsonContext.Default
    };

    private static readonly HttpClient Client = new()
    {
        Timeout = TimeSpan.FromSeconds(30)
    };

    private readonly List<RemoveParamRule> _builtinRules;
    private readonly string _directory;
    private readonly SemaphoreSlim _gate = new(1, 1);
    private readonly string _manifestPath;

    private List<RemoveParamRule>? _effectiveRules;
    private List<FilterListEntry>? _lists;

    public FilterService()
    {
        _directory = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), Constants.Name, "filters");
        Directory.CreateDirectory(_directory);
        _manifestPath = Path.Combine(_directory, "filters.json");
        _builtinRules = FilterParser.Parse(ReadBuiltin());
        NativeBridge.MessageReceived += HandleMessageAsync;
    }

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "filters.get" => GetAsync(context),
        "filters.add" => AddAsync(context),
        "filters.remove" => RemoveAsync(context),
        "filters.setEnabled" => SetEnabledAsync(context),
        "filters.update" => UpdateAsync(context),
        "filters.rules" => RulesAsync(context),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    private async Task<NativeResponse?> GetAsync(NativeContext context)
    {
        await _gate.WaitAsync();
        try
        {
            return context.Reply("filters.get.result",
                new FilterListPayload(await LoadListsAsync(), _builtinRules.Count));
        }
        finally
        {
            _gate.Release();
        }
    }

    private async Task<NativeResponse?> AddAsync(NativeContext context)
    {
        var request = context.Payload<FilterAddRequest>();
        var url = request?.Url?.Trim() ?? "";
        if (string.IsNullOrWhiteSpace(request?.Name) ||
            !Uri.TryCreate(url, UriKind.Absolute, out var uri) ||
            uri.Scheme is not ("http" or "https"))
            return context.Fail("filters.add.result", "error.invalidFilter");

        await _gate.WaitAsync();
        try
        {
            var lists = await LoadListsAsync();
            var entry = new FilterListEntry
            {
                Id = Guid.NewGuid().ToString("N"),
                Name = request.Name.Trim(),
                Url = url
            };

            // A broken URL still lands in the list with its error, so it can be retried or removed
            // instead of silently disappearing.
            entry.Error = await DownloadAsync(entry);
            lists.Add(entry);
            await SaveListsAsync(lists);
            _effectiveRules = null;

            return context.Reply("filters.add.result", new FilterListPayload(lists, _builtinRules.Count));
        }
        finally
        {
            _gate.Release();
        }
    }

    private async Task<NativeResponse?> RemoveAsync(NativeContext context)
    {
        var id = context.Payload<FilterIdRequest>()?.Id;
        if (string.IsNullOrEmpty(id))
            return context.Fail("filters.remove.result", "error.invalidFilter");

        await _gate.WaitAsync();
        try
        {
            var lists = await LoadListsAsync();
            lists.RemoveAll(entry => entry.Id == id);
            await SaveListsAsync(lists);
            _effectiveRules = null;

            TryDelete(RuleFilePath(id));
            return context.Reply("filters.remove.result", new FilterListPayload(lists, _builtinRules.Count));
        }
        finally
        {
            _gate.Release();
        }
    }

    private async Task<NativeResponse?> SetEnabledAsync(NativeContext context)
    {
        var request = context.Payload<FilterToggleRequest>();
        if (request is null || string.IsNullOrEmpty(request.Id))
            return context.Fail("filters.setEnabled.result", "error.invalidFilter");

        await _gate.WaitAsync();
        try
        {
            var lists = await LoadListsAsync();
            if (lists.FirstOrDefault(entry => entry.Id == request.Id) is { } entry)
                entry.Enabled = request.Enabled;

            await SaveListsAsync(lists);
            _effectiveRules = null;

            return context.Reply("filters.setEnabled.result", new FilterListPayload(lists, _builtinRules.Count));
        }
        finally
        {
            _gate.Release();
        }
    }

    /// <summary>Re-downloads one list, or every list when the request carries no id.</summary>
    private async Task<NativeResponse?> UpdateAsync(NativeContext context)
    {
        var id = context.Payload<FilterIdRequest>()?.Id;

        await _gate.WaitAsync();
        try
        {
            var lists = await LoadListsAsync();
            foreach (var entry in lists.Where(entry => string.IsNullOrEmpty(id) || entry.Id == id))
                entry.Error = await DownloadAsync(entry);

            await SaveListsAsync(lists);
            _effectiveRules = null;

            return context.Reply("filters.update.result", new FilterListPayload(lists, _builtinRules.Count));
        }
        finally
        {
            _gate.Release();
        }
    }

    private async Task<NativeResponse?> RulesAsync(NativeContext context)
    {
        await _gate.WaitAsync();
        try
        {
            if (_effectiveRules is null)
            {
                var rules = new List<RemoveParamRule>(_builtinRules);
                foreach (var entry in (await LoadListsAsync()).Where(entry => entry.Enabled))
                {
                    var path = RuleFilePath(entry.Id);
                    if (File.Exists(path))
                        rules.AddRange(FilterParser.Parse(await File.ReadAllTextAsync(path)));
                }

                _effectiveRules = rules;
            }

            return context.Reply("filters.rules.result", new FilterRulesPayload(_effectiveRules));
        }
        finally
        {
            _gate.Release();
        }
    }

    /// <summary>
    ///     Fetches a rule file, parses it and stores it. Two layers keep a repeated check cheap: a
    ///     conditional request (ETag / Last-Modified) lets the server answer 304 without a body, and
    ///     the SHA-256 of the content catches servers that ignore it. Returns an error key, or null.
    /// </summary>
    private async Task<string?> DownloadAsync(FilterListEntry entry)
    {
        var result = await Try.Run(async () =>
        {
            using var request = new HttpRequestMessage(HttpMethod.Get, entry.Url);
            if (!string.IsNullOrEmpty(entry.ETag))
                request.Headers.TryAddWithoutValidation("If-None-Match", entry.ETag);
            else if (!string.IsNullOrEmpty(entry.LastModified))
                request.Headers.TryAddWithoutValidation("If-Modified-Since", entry.LastModified);

            using var response = await Client.SendAsync(request);

            // Nothing changed since the last check, so there is no body to read or store.
            if (response.StatusCode == HttpStatusCode.NotModified)
            {
                entry.Error = null;
                return null;
            }

            if (!response.IsSuccessStatusCode)
            {
                entry.Error = $"HTTP {(int)response.StatusCode}";
                return entry.Error;
            }

            var text = await response.Content.ReadAsStringAsync();
            var hash = Convert.ToHexStringLower(SHA256.HashData(Encoding.UTF8.GetBytes(text)));

            // The server did not honour the conditional request, but the file is byte-identical.
            if (hash == entry.Hash)
            {
                entry.Error = null;
                return null;
            }

            var rules = FilterParser.Parse(text);
            if (rules.Count == 0)
            {
                entry.Error = "error.noFilterRules";
                return entry.Error;
            }

            await File.WriteAllTextAsync(RuleFilePath(entry.Id), text);
            entry.Hash = hash;
            entry.ETag = response.Headers.ETag?.ToString();
            entry.LastModified = response.Content.Headers.LastModified?.ToString("R");
            entry.RuleCount = rules.Count;
            entry.LastUpdated = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            entry.Error = null;
            return null;
        });

        return result.GetOrElse(ex =>
        {
            Log.Warning(ex, "Failed to download the filter list {Url}", entry.Url);
            entry.Error = ex.Message;
            return entry.Error;
        });
    }

    /// <summary>Reads the manifest. Callers hold the gate.</summary>
    private async Task<List<FilterListEntry>> LoadListsAsync()
    {
        if (_lists is not null)
            return _lists;

        if (!File.Exists(_manifestPath))
            return _lists = [];

        var lists = (await Try.Run(async () =>
        {
            var json = await File.ReadAllTextAsync(_manifestPath);
            return JsonSerializer.Deserialize(json, ManifestOptions.GetTypeInfo(typeof(List<FilterListEntry>)))
                as List<FilterListEntry> ?? [];
        })).GetOrElse(ex =>
        {
            Log.Warning(ex, "Failed to read the filter list manifest");
            return [];
        });

        return _lists = lists;
    }

    /// <summary>Writes the manifest. Callers hold the gate.</summary>
    private async Task SaveListsAsync(List<FilterListEntry> lists)
    {
        _lists = lists;
        await File.WriteAllTextAsync(_manifestPath,
            JsonSerializer.Serialize(lists, ManifestOptions.GetTypeInfo(typeof(List<FilterListEntry>))));
    }

    private string RuleFilePath(string id) => Path.Combine(_directory, $"{id}.txt");

    private void TryDelete(string path) =>
        Try.Run(() => File.Delete(path)).OnFailure(ex => Log.Warning(ex, "Failed to delete {Path}", path));

    private string ReadBuiltin()
    {
        using var stream = typeof(FilterService).Assembly
            .GetManifestResourceStream("URLCheck.Resources.filters.builtin.txt");
        if (stream is null)
        {
            Log.Error("The built-in filter list is missing from the assembly");
            return "";
        }

        using var reader = new StreamReader(stream);
        return reader.ReadToEnd();
    }
}