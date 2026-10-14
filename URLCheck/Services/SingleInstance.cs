using System.IO.Pipes;

namespace URLCheck.Services;

/// <summary>
/// Ensures a single running instance. Later launches forward their command-line arguments to the
/// first instance over a named pipe and then exit.
/// </summary>
internal sealed class SingleInstance : IDisposable
{
    private const string MutexName = @"Local\URLCheck.SingleInstance";
    private const string PipeName = "URLCheck.Ipc";

    private readonly Mutex _mutex;
    private readonly CancellationTokenSource _cts = new();

    public SingleInstance()
    {
        _mutex = new Mutex(initiallyOwned: true, MutexName, out var createdNew);
        IsFirstInstance = createdNew;
    }

    public bool IsFirstInstance { get; }

    /// <summary>Hands the arguments to the already-running instance. Returns false on failure.</summary>
    public bool TryForwardToExistingInstance(IReadOnlyList<string> args)
    {
        try
        {
            using var client = new NamedPipeClientStream(".", PipeName, PipeDirection.Out);
            client.Connect(3000);

            using var writer = new StreamWriter(client);
            writer.Write(string.Join('\n', args));
            writer.Flush();

            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[ipc] Failed to forward arguments: {ex.Message}");
            return false;
        }
    }

    /// <summary>Starts the pipe server. <paramref name="onArguments"/> runs on a background thread.</summary>
    public void StartServer(Action<IReadOnlyList<string>> onArguments)
    {
        var thread = new Thread(() => ServerLoop(onArguments))
        {
            IsBackground = true,
            Name = "URLCheck.IpcServer",
        };

        thread.Start();
    }

    private void ServerLoop(Action<IReadOnlyList<string>> onArguments)
    {
        while (!_cts.IsCancellationRequested)
        {
            try
            {
                using var server = new NamedPipeServerStream(
                    PipeName, PipeDirection.In, 1, PipeTransmissionMode.Byte, PipeOptions.None);

                server.WaitForConnection();

                using var reader = new StreamReader(server);
                var payload = reader.ReadToEnd();

                var args = payload.Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
                if (args.Length > 0)
                    onArguments(args);
            }
            catch (Exception ex)
            {
                if (_cts.IsCancellationRequested)
                    return;

                Console.WriteLine($"[ipc] Server error: {ex.Message}");
                Thread.Sleep(250);
            }
        }
    }

    public void Dispose()
    {
        _cts.Cancel();
        _cts.Dispose();
        _mutex.Dispose();
    }
}
