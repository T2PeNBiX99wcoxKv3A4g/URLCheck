using System.IO.Pipes;
using Serilog;

namespace URLCheck.Services;

/// <summary>
/// Ensures a single running instance. Later launches forward their command-line arguments to the
/// first instance over a named pipe and then exit.
/// </summary>
internal sealed class SingleInstance : IDisposable
{
    private const string MutexName = @"Local\URLCheck.SingleInstance";
    private const string PipeName = "URLCheck.Ipc";
    private readonly CancellationTokenSource _cts = new();

    private readonly Mutex _mutex;

    public SingleInstance()
    {
        _mutex = new Mutex(initiallyOwned: true, MutexName, out var createdNew);
        IsFirstInstance = createdNew;
    }

    public bool IsFirstInstance { get; }

    public void Dispose()
    {
        _cts.Cancel();
        _cts.Dispose();
        _mutex.Dispose();
    }

    /// <summary>Hands the arguments to the already-running instance. Returns false on failure.</summary>
    public static async Task<bool> ForwardAsync(IReadOnlyList<string> args)
    {
        try
        {
            await using var client = new NamedPipeClientStream(".", PipeName, PipeDirection.Out);
            await client.ConnectAsync(3000);

            await using var writer = new StreamWriter(client);
            await writer.WriteAsync(string.Join('\n', args));

            return true;
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to forward arguments");
            return false;
        }
    }

    /// <summary>Starts the pipe server; <paramref name="onArguments"/> runs on a background thread.</summary>
    public void StartServer(Action<IReadOnlyList<string>> onArguments) =>
        _ = Task.Run(() => ServerLoopAsync(onArguments));

    private async Task ServerLoopAsync(Action<IReadOnlyList<string>> onArguments)
    {
        while (!_cts.IsCancellationRequested)
        {
            try
            {
                await using var server = new NamedPipeServerStream(
                    PipeName, PipeDirection.In, 1, PipeTransmissionMode.Byte, PipeOptions.Asynchronous);

                await server.WaitForConnectionAsync(_cts.Token);

                using var reader = new StreamReader(server);
                var payload = await reader.ReadToEndAsync(_cts.Token);

                var args = payload.Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
                if (args.Length > 0)
                    onArguments(args);
            }
            catch (OperationCanceledException)
            {
                return;
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "IPC server error");

                try
                {
                    await Task.Delay(250, _cts.Token);
                }
                catch (OperationCanceledException)
                {
                    return;
                }
            }
        }
    }
}