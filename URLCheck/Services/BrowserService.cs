using System.Diagnostics;
using Microsoft.Win32;
using URLCheck.Models;

namespace URLCheck.Services;

/// <summary>
/// Detects installed browsers from the Windows "StartMenuInternet" client registry and launches
/// them with a URL.
/// </summary>
internal static class BrowserService
{
    private static readonly string[] ClientRoots =
    [
        @"SOFTWARE\Clients\StartMenuInternet",
        @"SOFTWARE\WOW6432Node\Clients\StartMenuInternet"
    ];

    /// <summary>Enumerates installed browsers, de-duplicated by executable path.</summary>
    public static IReadOnlyList<BrowserEntry> DetectInstalledBrowsers()
    {
        var found = new Dictionary<string, BrowserEntry>(StringComparer.OrdinalIgnoreCase);

        foreach (var hive in new[]
                 {
                     Registry.LocalMachine, Registry.CurrentUser
                 })
        {
            foreach (var root in ClientRoots)
            {
                try
                {
                    ScanRoot(hive, root, found);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[browsers] Failed to scan {root}: {ex.Message}");
                }
            }
        }

        return
        [
            .. found.Values
                .OrderBy(browser => browser.Name, StringComparer.CurrentCultureIgnoreCase)
        ];
    }

    /// <summary>Starts <paramref name="executablePath"/> with <paramref name="url"/> as its argument.</summary>
    public static void Launch(string executablePath, string url)
    {
        if (string.IsNullOrWhiteSpace(executablePath))
            throw new ArgumentException("A browser executable path is required.", nameof(executablePath));

        Process.Start(new ProcessStartInfo
        {
            FileName = executablePath,
            Arguments = $"\"{url}\"",
            UseShellExecute = false,
        });
    }

    private static void ScanRoot(RegistryKey hive, string root, IDictionary<string, BrowserEntry> found)
    {
        using var clients = hive.OpenSubKey(root);
        if (clients is null)
            return;

        foreach (var clientName in clients.GetSubKeyNames())
        {
            using var client = clients.OpenSubKey(clientName);
            if (client is null)
                continue;

            using var commandKey = client.OpenSubKey(@"shell\open\command");
            var executable = ExtractExecutable(commandKey?.GetValue(null) as string);
            if (executable is null || !File.Exists(executable))
                continue;

            var displayName = client.GetValue(null) as string;
            if (string.IsNullOrWhiteSpace(displayName))
                displayName = clientName;

            found[executable] = new BrowserEntry
            {
                Name = displayName,
                ExecutablePath = executable,
            };
        }
    }

    private static string? ExtractExecutable(string? command)
    {
        if (string.IsNullOrWhiteSpace(command))
            return null;

        command = command.Trim();

        // Quoted: "C:\Program Files\...\chrome.exe" --flag
        if (command.StartsWith('"'))
        {
            var end = command.IndexOf('"', 1);
            if (end > 1)
                return command[1..end];
        }

        // Unquoted: C:\...\browser.exe --flag
        var exeIndex = command.IndexOf(".exe", StringComparison.OrdinalIgnoreCase);
        if (exeIndex >= 0)
            return command[..(exeIndex + 4)];

        var space = command.IndexOf(' ');
        return space > 0 ? command[..space] : command;
    }
}