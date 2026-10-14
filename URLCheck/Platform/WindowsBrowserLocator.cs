using System.Runtime.Versioning;
using Microsoft.Win32;
using Serilog;
using URLCheck.Models;

namespace URLCheck.Platform;

/// <summary>Reads installed browsers from the Windows "StartMenuInternet" client registry.</summary>
[SupportedOSPlatform("windows")]
internal sealed class WindowsBrowserLocator : IBrowserLocator
{
    private static readonly string[] ClientRoots =
    [
        @"SOFTWARE\Clients\StartMenuInternet",
        @"SOFTWARE\WOW6432Node\Clients\StartMenuInternet"
    ];

    public IReadOnlyList<BrowserEntry> Detect()
    {
        var found = new Dictionary<string, BrowserEntry>(StringComparer.OrdinalIgnoreCase);

        foreach (var hive in new[]
                 {
                     Registry.LocalMachine, Registry.CurrentUser
                 })
        foreach (var root in ClientRoots)
            try
            {
                ScanRoot(hive, root, found);
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Failed to scan {Root}", root);
            }

        return
        [
            .. found.Values
                .OrderBy(browser => browser.Name, StringComparer.CurrentCultureIgnoreCase)
        ];
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

            found[executable] = new()
            {
                Name = displayName,
                ExecutablePath = executable
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
