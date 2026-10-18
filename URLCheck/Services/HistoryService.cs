using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using URLCheck.Data;
using URLCheck.Extensions;
using URLCheck.Messaging;
using URLCheck.Utils;

namespace URLCheck.Services;

/// <summary>Stores the URLs that were intercepted (clicked) in a local SQLite database.</summary>
[PublicAPI]
internal sealed class HistoryService : Singleton<HistoryService>
{
    private readonly SemaphoreSlim _gate = new(1, 1);
    private readonly DbContextOptions<HistoryContext> _options;

    public HistoryService()
    {
        var directory = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), Constants.Name);
        Directory.CreateDirectory(directory);
        DatabasePath = Path.Combine(directory, "history.db");

        _options = new DbContextOptionsBuilder<HistoryContext>()
            .UseSqlite($"Data Source={DatabasePath}")
            .Options;

        using (var context = new HistoryContext(_options))
            context.Database.EnsureCreated();

        NativeBridge.MessageReceived += HandleMessageAsync;
    }

    public string DatabasePath { get; }

    /// <summary>Records an intercepted URL. Fire-and-forget; failures are only logged.</summary>
    public void Record(string url)
    {
        if (string.IsNullOrWhiteSpace(url))
            return;

        _ = Task.Run(async () =>
        {
            await _gate.WaitAsync();
            (await Try.Run(async () =>
            {
                await using var context = new HistoryContext(_options);
                context.Entries.Add(new()
                {
                    Url = url
                });
                await context.SaveChangesAsync();
            })).OnFailure(ex => Log.Warning(ex, "Failed to record a history entry"));
            _gate.Release();
        });
    }

    private Task<NativeResponse?> HandleMessageAsync(NativeContext context) => context.Request.Type switch
    {
        "history.list" => ListAsync(context),
        "history.clear" => ClearAsync(context),
        _ => Task.FromResult<NativeResponse?>(null)
    };

    private async Task<NativeResponse?> ListAsync(NativeContext context)
    {
        await _gate.WaitAsync();
        try
        {
            await using var db = new HistoryContext(_options);
            var entries = await db.Entries
                .AsNoTracking()
                .OrderByDescending(entry => entry.Timestamp)
                .Take(500)
                .ToListAsync();

            return context.Reply("history.list.result", new HistoryListPayload(
            [
                .. entries.Select(entry => new HistoryItemPayload(entry.Id, entry.Url, entry.Timestamp))
            ]));
        }
        finally
        {
            _gate.Release();
        }
    }

    private async Task<NativeResponse?> ClearAsync(NativeContext context)
    {
        await _gate.WaitAsync();
        try
        {
            await using var db = new HistoryContext(_options);
            await db.Entries.ExecuteDeleteAsync();

            return context.Reply("history.clear.result", new OkPayload());
        }
        finally
        {
            _gate.Release();
        }
    }
}