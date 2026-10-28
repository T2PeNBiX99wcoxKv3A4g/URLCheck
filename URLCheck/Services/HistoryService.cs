using JetBrains.Annotations;
using Microsoft.Data.Sqlite;
using PhotinoNetUtils.Extensions;
using URLCheck.Messaging;
using PhotinoNetUtils.Utils;

namespace URLCheck.Services;

/// <summary>
///     Stores the URLs that were intercepted (clicked) in a local SQLite database.
///     Uses raw ADO.NET (<see cref="SqliteConnection" />) rather than EF Core, whose runtime model
///     building generates code and is therefore not usable from a Native AOT build.
/// </summary>
[PublicAPI]
internal sealed class HistoryService : Singleton<HistoryService>
{
    private const string CreateSchema =
        """
        CREATE TABLE IF NOT EXISTS History (
            Id INTEGER NOT NULL CONSTRAINT PK_History PRIMARY KEY AUTOINCREMENT,
            Url TEXT NOT NULL,
            Timestamp INTEGER NOT NULL
        );
        CREATE INDEX IF NOT EXISTS IX_History_Timestamp ON History (Timestamp);
        """;

    private readonly string _connectionString;

    private readonly SemaphoreSlim _gate = new(1, 1);

    public HistoryService()
    {
        var directory = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), Constants.Name);
        Directory.CreateDirectory(directory);
        DatabasePath = Path.Combine(directory, "history.db");
        _connectionString = new SqliteConnectionStringBuilder
        {
            DataSource = DatabasePath
        }.ToString();

        using (var connection = Open())
        using (var command = connection.CreateCommand())
        {
            command.CommandText = CreateSchema;
            command.ExecuteNonQuery();
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
            (await Try.Run(async () =>
            {
                await using var connection = await OpenAsync();
                await using var command = connection.CreateCommand();
                command.CommandText = "INSERT INTO History (Url, Timestamp) VALUES ($url, $timestamp)";
                command.Parameters.AddWithValue("$url", url);
                command.Parameters.AddWithValue("$timestamp", DateTimeOffset.UtcNow.ToUnixTimeMilliseconds());
                await command.ExecuteNonQueryAsync();
                NotifyChanged();
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
            await using var connection = await OpenAsync();
            await using var command = connection.CreateCommand();
            command.CommandText = "SELECT Id, Url, Timestamp FROM History ORDER BY Timestamp DESC LIMIT 500";

            var entries = new List<HistoryItemPayload>();
            await using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
                entries.Add(new(reader.GetInt32(0), reader.GetString(1), reader.GetInt64(2)));

            return context.Reply("history.list.result", new HistoryListPayload(entries));
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
            await using var connection = await OpenAsync();
            await using var command = connection.CreateCommand();
            command.CommandText = "DELETE FROM History";
            await command.ExecuteNonQueryAsync();
            NotifyChanged();

            return context.Reply("history.clear.result", new OkPayload());
        }
        finally
        {
            _gate.Release();
        }
    }

    /// <summary>Tells the open history view that the list changed.</summary>
    private static void NotifyChanged() => WindowManager.Instance.NotifyMainWindow("history.changed", null);

    private SqliteConnection Open()
    {
        var connection = new SqliteConnection(_connectionString);
        connection.Open();
        return connection;
    }

    private async Task<SqliteConnection> OpenAsync()
    {
        var connection = new SqliteConnection(_connectionString);
        await connection.OpenAsync();
        return connection;
    }
}