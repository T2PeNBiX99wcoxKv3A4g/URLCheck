using System.Diagnostics;
using System.Runtime.Versioning;
using System.Text;
using Serilog;

namespace URLCheck.Platform;

/// <summary>
///     Watches the clipboard under Wayland through <c>wl-paste</c>, falling back to GTK's clipboard
///     signal elsewhere. Neither path blocks: Wayland hands the text to the child process, and GTK
///     pulls it with an asynchronous request.
/// </summary>
[SupportedOSPlatform("linux")]
internal sealed class LinuxClipboardWatcher : IClipboardWatcher
{
    /// <summary>Opens each value in the child's output. A control byte can never appear in a URL.</summary>
    private const byte Separator = 0x01;

    /// <summary>Longer than any URL; a value past this is dropped rather than buffered forever.</summary>
    private const int MaxValueLength = 8192;

    private CancellationTokenSource? _cancellation;

    private Process? _process;

    public event Action<string>? TextCopied;

    public void Start()
    {
        if (_process is not null)
            return;

        if (TryWatchWithWlPaste())
            return;

        // X11, and any Wayland compositor that still lets a background client read the clipboard.
        if (!LinuxGtk.WatchClipboard(OnTextCopied))
            Log.Warning("Clipboard watching is unavailable on this desktop");
    }

    public void Stop()
    {
        _cancellation?.Cancel();

        try
        {
            if (_process is { HasExited: false } process)
                process.Kill(true);
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "Failed to stop the clipboard watcher");
        }

        _process = null;
        _cancellation?.Dispose();
        _cancellation = null;

        LinuxGtk.StopWatchingClipboard();
    }

    public void Dispose() => Stop();

    /// <summary>
    ///     Wayland hides the clipboard from unfocused clients, so the only way in is the data-control
    ///     protocol, which <c>wl-paste --watch</c> speaks. It feeds every new value to its command's
    ///     standard input, so the command is a shell that frames each value with a marker byte.
    /// </summary>
    private bool TryWatchWithWlPaste()
    {
        if (Environment.GetEnvironmentVariable("WAYLAND_DISPLAY") is not { Length: > 0 })
            return false;

        try
        {
            var startInfo = new ProcessStartInfo("wl-paste")
            {
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };
            startInfo.ArgumentList.Add("--type");
            startInfo.ArgumentList.Add("text");
            startInfo.ArgumentList.Add("--watch");
            startInfo.ArgumentList.Add("sh");
            startInfo.ArgumentList.Add("-c");
            startInfo.ArgumentList.Add("printf '\\001'; cat");

            var process = Process.Start(startInfo);
            if (process is null)
                return false;

            _process = process;
            _cancellation = new();

            // The pump swallows everything it can throw, so the task needs no observer.
            _ = Task.Run(() => PumpAsync(process, _cancellation.Token));

            Log.Information("Watching the clipboard through wl-paste");
            return true;
        }
        catch (Exception ex)
        {
            // No wl-paste installed, or no Wayland session after all.
            Log.Information(ex, "Could not watch the clipboard through wl-paste: {Message}", ex.Message);
            return false;
        }
    }

    /// <summary>Reads the child's output and reports every value the marker delimits.</summary>
    private async Task PumpAsync(Process process, CancellationToken token)
    {
        var buffer = new byte[4096];
        var current = new List<byte>();

        try
        {
            var stream = process.StandardOutput.BaseStream;
            while (!token.IsCancellationRequested)
            {
                var read = await stream.ReadAsync(buffer, token);
                if (read == 0)
                    break;

                for (var index = 0; index < read; index++)
                {
                    var value = buffer[index];

                    if (value == Separator)
                    {
                        // The marker opens the next value, so what came before it is complete.
                        Report(current);
                        current.Clear();
                    }
                    else if (current.Count < MaxValueLength)
                        current.Add(value);
                    else
                        current.Clear();
                }
            }
        }
        catch (OperationCanceledException)
        {
            // Stopping.
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "The clipboard watcher stopped");
        }
    }

    private void Report(List<byte> value)
    {
        if (value.Count == 0)
            return;

        try
        {
            TextCopied?.Invoke(Encoding.UTF8.GetString(value.ToArray()));
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Clipboard handler failed");
        }
    }

    private void OnTextCopied(string text)
    {
        try
        {
            TextCopied?.Invoke(text);
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Clipboard handler failed");
        }
    }
}