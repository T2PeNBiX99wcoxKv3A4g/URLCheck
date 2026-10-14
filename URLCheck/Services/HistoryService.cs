using Microsoft.EntityFrameworkCore;
using Serilog;
using URLCheck.Data;
using URLCheck.Messaging;
using URLCheck.Models;

namespace URLCheck.Services;

/// <summary>Stores the URLs that were intercepted (clicked) in a local SQLite database.</summary>
internal sealed class HistoryService
{
    private readonly DbContextOptions<HistoryContext> _options;
    private readonly SemaphoreSlim _gate = new(1, 1);

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
        {
            context.Database.EnsureCreated();
        }

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
            try
            {
                await using var context = new HistoryContext(_options);
                context.Entries.Add(new HistoryEntry { Url = url });
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Failed to record a history entry");
            }
            finally
            {
                _gate.Release();
            }
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
                .OrderByDescending(entry => entry.Timestamp)
                .Take(500)
                .Select(entry => new { entry.Id, entry.Url, entry.Timestamp })
                .ToListAsync();

            return context.Reply("history.list.result", new { Entries = entries });
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

            return context.Reply("history.clear.result", new { Ok = true });
        }
        finally
        {
            _gate.Release();
        }
    }
}
