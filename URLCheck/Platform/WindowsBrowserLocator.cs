using System.Runtime.Versioning;
using Microsoft.Win32;
using Serilog;
using URLCheck.Models;
using URLCheck.Extensions;
using URLCheck.Utils;

namespace URLCheck.Platform;

/// <summary>Reads installed browsers from the Windows "StartMenuInternet" client registry.</summary>
[SupportedOSPlatform("windows")]
internal sealed class WindowsBrowserLocator : Singleton<WindowsBrowserLocator>, IBrowserLocator
{
    private const string OwnClientName = "URLCheck";

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
            Try.Run(() => ScanRoot(hive, root, found))
                .OnFailure(ex => Log.Warning(ex, "Failed to scan {Root}", root));

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
            var executable = WindowsCommandLine.ExtractExecutable(commandKey?.GetValue(null) as string);
            if (executable is null || !File.Exists(executable))
                continue;

            // Never offer URLCheck itself as a browser to open URLs with.
            if (clientName.Equals(OwnClientName, StringComparison.OrdinalIgnoreCase) ||
                string.Equals(executable, Environment.ProcessPath, StringComparison.OrdinalIgnoreCase))
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
}