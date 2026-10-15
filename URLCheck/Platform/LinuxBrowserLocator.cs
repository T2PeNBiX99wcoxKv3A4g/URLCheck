using System.Runtime.Versioning;
using Serilog;
using URLCheck.Models;

namespace URLCheck.Platform;

/// <summary>
///     Discovers installed browsers from the freedesktop <c>.desktop</c> entries that advertise
///     themselves as <c>x-scheme-handler/http</c> or <c>https</c> handlers.
/// </summary>
[SupportedOSPlatform("linux")]
internal sealed class LinuxBrowserLocator : IBrowserLocator
{
    private const string OwnDesktopFile = "urlcheck.desktop";

    public IReadOnlyList<BrowserEntry> Detect()
    {
        var found = new Dictionary<string, BrowserEntry>(StringComparer.OrdinalIgnoreCase);

        foreach (var directory in ApplicationDirectories())
            try
            {
                if (!Directory.Exists(directory))
                    continue;

                foreach (var file in Directory.EnumerateFiles(directory, "*.desktop"))
                    Scan(file, found);
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Failed to scan {Directory}", directory);
            }

        return
        [
            .. found.Values
                .OrderBy(browser => browser.Name, StringComparer.CurrentCultureIgnoreCase)
        ];
    }

    private static void Scan(string file, IDictionary<string, BrowserEntry> found)
    {
        var fileName = Path.GetFileName(file);

        // Never offer URLCheck itself as a browser to open URLs with.
        if (fileName.Equals(OwnDesktopFile, StringComparison.OrdinalIgnoreCase))
            return;

        var entry = DesktopEntry.Parse(file);
        if (entry is null || !entry.HandlesWeb)
            return;

        var (executable, arguments) = entry.Command();
        if (executable is null)
            return;

        if (string.Equals(executable, Environment.ProcessPath, StringComparison.OrdinalIgnoreCase))
            return;

        if (Path.IsPathRooted(executable) && !File.Exists(executable))
            return;

        found[executable] = new()
        {
            Name = string.IsNullOrWhiteSpace(entry.Name) ? Path.GetFileNameWithoutExtension(fileName) : entry.Name,
            ExecutablePath = executable,
            Arguments = arguments
        };
    }

    /// <summary>The XDG directories that can hold application entries, in precedence order.</summary>
    private static IEnumerable<string> ApplicationDirectories()
    {
        var home = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);

        var dataHome = Environment.GetEnvironmentVariable("XDG_DATA_HOME");
        if (string.IsNullOrWhiteSpace(dataHome))
            dataHome = Path.Combine(home, ".local", "share");

        yield return Path.Combine(dataHome, "applications");

        var dataDirs = Environment.GetEnvironmentVariable("XDG_DATA_DIRS");
        if (string.IsNullOrWhiteSpace(dataDirs))
            dataDirs = "/usr/local/share:/usr/share";

        foreach (var directory in dataDirs.Split(':', StringSplitOptions.RemoveEmptyEntries))
            yield return Path.Combine(directory, "applications");

        // Flatpak and Snap publish their exports here.
        yield return Path.Combine(dataHome, "flatpak", "exports", "share", "applications");
        yield return "/var/lib/flatpak/exports/share/applications";
        yield return "/var/lib/snapd/desktop/applications";
    }

    /// <summary>Minimal reader for the few <c>[Desktop Entry]</c> keys we care about.</summary>
    private sealed class DesktopEntry
    {
        private string? Exec { get; init; }
        private string? MimeType { get; init; }
        private bool Hidden { get; init; }

        public string? Name { get; private init; }

        public bool HandlesWeb =>
            !Hidden &&
            MimeType is not null &&
            (MimeType.Contains("x-scheme-handler/http", StringComparison.OrdinalIgnoreCase) ||
             MimeType.Contains("x-scheme-handler/https", StringComparison.OrdinalIgnoreCase));

        public static DesktopEntry? Parse(string file)
        {
            string? name = null, exec = null, mimeType = null;
            var hidden = false;
            var inEntryGroup = false;

            foreach (var raw in File.ReadLines(file))
            {
                var line = raw.Trim();
                if (line.Length == 0 || line.StartsWith('#'))
                    continue;

                if (line.StartsWith('['))
                {
                    inEntryGroup = line.Equals("[Desktop Entry]", StringComparison.OrdinalIgnoreCase);
                    continue;
                }

                if (!inEntryGroup)
                    continue;

                var separator = line.IndexOf('=');
                if (separator <= 0)
                    continue;

                var key = line[..separator];
                var value = line[(separator + 1)..];

                switch (key)
                {
                    case "Name":
                        name ??= value;
                        break;
                    case "Exec":
                        exec ??= value;
                        break;
                    case "MimeType":
                        mimeType ??= value;
                        break;
                    case "Hidden":
                        hidden = value.Equals("true", StringComparison.OrdinalIgnoreCase);
                        break;
                }
            }

            return new()
            {
                Name = name,
                Exec = exec,
                MimeType = mimeType,
                Hidden = hidden
            };
        }

        /// <summary>Splits <c>Exec</c> into the executable and its extra arguments.</summary>
        public (string? Executable, string Arguments) Command()
        {
            if (string.IsNullOrWhiteSpace(Exec))
                return (null, string.Empty);

            var parts = Exec
                .Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                .Where(part => !part.StartsWith('%')) // drop %u/%U/%f/%F field codes; we append the URL
                .ToList();

            // Skip `env FOO=1 browser %u` style wrappers.
            while (parts.Count > 0 && (parts[0] == "env" || parts[0].Contains('=')))
                parts.RemoveAt(0);

            return parts.Count == 0
                ? (null, string.Empty)
                : (parts[0], string.Join(' ', parts.Skip(1)));
        }
    }
}