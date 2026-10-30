using System.Diagnostics;
using System.Runtime.Versioning;
using PhotinoNetUtils;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;

namespace URLCheck.Platform;

/// <summary>
///     Registers URLCheck through the freedesktop desktop-entry mechanism: a <c>urlcheck.desktop</c>
///     file plus <c>xdg-mime default</c>. Unlike Windows, the default handler can be set directly.
/// </summary>
[SupportedOSPlatform("linux")]
internal sealed class LinuxProtocolRegistrar : Singleton<LinuxProtocolRegistrar>, IProtocolRegistrar
{
    private const string DesktopFileName = "urlcheck.desktop";
    private const string CustomSchemeMime = "x-scheme-handler/urlcheck";

    /// <summary>
    ///     The Wayland app id GTK reports for our windows. It has to match the desktop entry's file name
    ///     for the compositor to associate the two, which is how the window gets its icon.
    /// </summary>
    public const string ProcessName = "urlcheck";

    private static readonly string Home =
        Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);

    private static readonly string ApplicationsDirectory =
        Path.Combine(Home, ".local", "share", "applications");

    private static readonly string DesktopFilePath = Path.Combine(ApplicationsDirectory, DesktopFileName);

    public string ExecutablePath { get; } = Environment.ProcessPath
                                            ?? Process.GetCurrentProcess().MainModule?.FileName
                                            ?? string.Empty;

    /// <summary>
    ///     The path stored in <c>urlcheck.desktop</c>. Comparing it with <see cref="ExecutablePath" /> is
    ///     how a stale registration (the app moved) is detected.
    /// </summary>
    public string? RegisteredExecutablePath
    {
        get
        {
            var command = ReadExecCommand();
            if (string.IsNullOrWhiteSpace(command))
                return null;

            // Exec lines look like: Exec="/path/to/URLCheck" %u
            if (!command.StartsWith('"'))
                return command.Split(' ')[0];

            var end = command.IndexOf('"', 1);
            return end > 1 ? command[1..end] : null;
        }
    }

    public void RegisterBrowser()
    {
        EnsureExecutable();
        WriteDesktopEntry();
        SetDefault("x-scheme-handler/http");
        SetDefault("x-scheme-handler/https");
        SetDefault(CustomSchemeMime);
        UpdateDesktopDatabase();
    }

    /// <summary>
    ///     Repairs a stale registration, and does nothing when the scheme is not registered at all: whether
    ///     URLCheck handles <c>urlcheck://</c> is the user's choice.
    /// </summary>
    public void EnsureCustomScheme()
    {
        if (!IsCustomSchemeRegistered() ||
            string.Equals(RegisteredExecutablePath, ExecutablePath, StringComparison.Ordinal))
            return;

        WriteDesktopEntry();
        UpdateDesktopDatabase();
    }

    public void Unregister()
    {
        TryDelete(DesktopFilePath);

        foreach (var file in MimeAppsFiles())
            CleanMimeApps(file);

        UpdateDesktopDatabase();
    }

    /// <summary>
    ///     Linux can set the handler directly (see <see cref="RegisterBrowser" />), so there is no
    ///     equivalent of the Windows "Default apps" page to open.
    /// </summary>
    public void OpenDefaultAppsSettings() =>
        Log.Information("No default-apps page on Linux; http/https is set by RegisterBrowser.");

    public bool IsDefaultBrowser() => IsDefault("x-scheme-handler/http");

    public bool IsCustomSchemeRegistered() => IsDefault(CustomSchemeMime);

    private void EnsureExecutable()
    {
        if (string.IsNullOrWhiteSpace(ExecutablePath))
            throw new InvalidOperationException("Unable to determine the URLCheck executable path.");
    }

    private void WriteDesktopEntry()
    {
        Directory.CreateDirectory(ApplicationsDirectory);

        // On Wayland the compositor takes a window's icon from the desktop entry matched to its app id,
        // so this is what decides the title bar and taskbar icon. An absolute path is allowed here.
        var icon = AppIcon.EnsureExtracted(typeof(LinuxProtocolRegistrar).Assembly, Constants.Name) ?? "web-browser";

        var content = $"""
                       [Desktop Entry]
                       Type=Application
                       Name=URLCheck
                       Comment=URLCheck URL intermediary
                       Exec="{ExecutablePath}" %u
                       Icon={icon}
                       StartupWMClass={ProcessName}
                       Terminal=false
                       Categories=Network;WebBrowser;
                       MimeType=x-scheme-handler/http;x-scheme-handler/https;{CustomSchemeMime};text/html;
                       """;

        File.WriteAllText(DesktopFilePath, content + Environment.NewLine);

        // A file manager refuses to launch an entry that is not marked executable, and a plain write
        // leaves it at 0644.
        File.SetUnixFileMode(DesktopFilePath, File.GetUnixFileMode(DesktopFilePath) | UnixFileMode.UserExecute);
    }

    private void SetDefault(string mimeType)
    {
        var (ok, _) = Run("xdg-mime", "default", DesktopFileName, mimeType);
        if (!ok)
            Log.Warning("xdg-mime could not set the default handler for {MimeType}", mimeType);
    }

    /// <summary>Reads the <c>Exec=</c> line of our desktop entry, if it exists.</summary>
    private string? ReadExecCommand() =>
        Try.Run(() =>
        {
            if (!File.Exists(DesktopFilePath))
                return null;

            var line = File.ReadLines(DesktopFilePath)
                .FirstOrDefault(candidate => candidate.StartsWith("Exec=", StringComparison.Ordinal));

            return line is null ? null : line["Exec=".Length..].Trim();
        }).GetOrElse(ex =>
        {
            Log.Warning(ex, "Failed to read {File}", DesktopFilePath);
            return null;
        });

    /// <summary>Refreshes the MIME cache so the new entry is picked up immediately (best effort).</summary>
    private void UpdateDesktopDatabase() =>
        Run("update-desktop-database", ApplicationsDirectory);

    private bool IsDefault(string mimeType)
    {
        var (ok, output) = Run("xdg-mime", "query", "default", mimeType);
        var reported = output.Trim();

        var isDefault = ok && reported.Equals(DesktopFileName, StringComparison.OrdinalIgnoreCase);

        // xdg-mime is not always installed; the mimeapps.list files say the same thing directly.
        var fallback = isDefault ? null : ReadMimeAppsDefault(mimeType);
        if (!isDefault && fallback is not null)
            isDefault = fallback.Equals(DesktopFileName, StringComparison.OrdinalIgnoreCase);

        // Only worth an Information line when it is wrong; it is queried on every popup open.
        var detail = $"xdg-mime={reported} (ran={ok}), mimeapps.list={fallback ?? "<none>"}";
        if (isDefault)
            Log.Debug("Default handler for {MimeType} is URLCheck ({Detail})", mimeType, detail);
        else
            Log.Information("Default handler for {MimeType} is NOT URLCheck ({Detail})", mimeType, detail);

        return isDefault;
    }

    /// <summary>The mimeapps.list files that can hold the default handler, most specific first.</summary>
    private static IEnumerable<string> MimeAppsFiles()
    {
        yield return Path.Combine(Home, ".config", "mimeapps.list");
        yield return Path.Combine(ApplicationsDirectory, "mimeapps.list");
    }

    /// <summary>Reads a <c>[Default Applications]</c> entry straight out of mimeapps.list.</summary>
    private string? ReadMimeAppsDefault(string mimeType)
    {
        foreach (var file in MimeAppsFiles())
        {
            var value = Try.Run(() =>
            {
                if (!File.Exists(file))
                    return null;

                var inDefaults = false;
                foreach (var raw in File.ReadLines(file))
                {
                    var line = raw.Trim();
                    if (line.StartsWith('['))
                    {
                        inDefaults = line.Equals("[Default Applications]", StringComparison.OrdinalIgnoreCase);
                        continue;
                    }

                    if (!inDefaults || !line.StartsWith(mimeType, StringComparison.OrdinalIgnoreCase))
                        continue;

                    var separator = line.IndexOf('=');
                    if (separator > 0)
                        return line[(separator + 1)..]
                            .Split(';', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                            .FirstOrDefault();
                }

                return null;
            }).GetOrElse(ex =>
            {
                Log.Warning(ex, "Failed to read {File}", file);
                return null;
            });

            if (value is not null)
                return value;
        }

        return null;
    }

    private void CleanMimeApps(string file) =>
        Try.Run(() =>
        {
            if (!File.Exists(file))
                return;

            var kept = File.ReadAllLines(file)
                .Where(line => !line.Contains(DesktopFileName, StringComparison.OrdinalIgnoreCase))
                .ToArray();

            File.WriteAllLines(file, kept);
        }).OnFailure(ex => Log.Warning(ex, "Failed to clean {File}", file));

    private void TryDelete(string file) =>
        Try.Run(() => File.Delete(file)).OnFailure(ex => Log.Warning(ex, "Failed to delete {File}", file));

    /// <summary>Runs a helper command, returning whether it succeeded and what it printed.</summary>
    private (bool Ok, string Output) Run(string file, params string[] args) =>
        Try.Run(() =>
        {
            var info = new ProcessStartInfo(file)
            {
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true
            };

            foreach (var arg in args)
                info.ArgumentList.Add(arg);

            using var process = Process.Start(info);
            if (process is null)
                return (false, string.Empty);

            var output = process.StandardOutput.ReadToEnd();
            _ = process.StandardError.ReadToEnd();
            process.WaitForExit(5000);

            return (process.HasExited && process.ExitCode == 0, output);
        }).GetOrElse(ex =>
        {
            Log.Debug(ex, "Failed to run {File}", file);
            return (false, string.Empty);
        });
}