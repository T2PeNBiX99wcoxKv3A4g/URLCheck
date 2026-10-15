using System.Diagnostics;
using System.Runtime.Versioning;
using Serilog;

namespace URLCheck.Platform;

/// <summary>
///     Registers URLCheck through the freedesktop desktop-entry mechanism: a <c>urlcheck.desktop</c>
///     file plus <c>xdg-mime default</c>. Unlike Windows, the default handler can be set directly.
/// </summary>
[SupportedOSPlatform("linux")]
internal sealed class LinuxProtocolRegistrar : IProtocolRegistrar
{
    private const string DesktopFileName = "urlcheck.desktop";
    private const string CustomSchemeMime = "x-scheme-handler/urlcheck";

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
        UpdateDesktopDatabase();
    }

    public void RegisterCustomScheme()
    {
        EnsureExecutable();
        WriteDesktopEntry();
        SetDefault(CustomSchemeMime);
        UpdateDesktopDatabase();
    }

    public void Unregister()
    {
        TryDelete(DesktopFilePath);
        CleanMimeApps(Path.Combine(Home, ".config", "mimeapps.list"));
        CleanMimeApps(Path.Combine(ApplicationsDirectory, "mimeapps.list"));
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

        var content = $"""
                       [Desktop Entry]
                       Type=Application
                       Name=URLCheck
                       Comment=URLCheck URL intermediary
                       Exec="{ExecutablePath}" %u
                       Icon=web-browser
                       Terminal=false
                       Categories=Network;WebBrowser;
                       MimeType=x-scheme-handler/http;x-scheme-handler/https;{CustomSchemeMime};text/html;
                       """;

        File.WriteAllText(DesktopFilePath, content + Environment.NewLine);
    }

    private static void SetDefault(string mimeType)
    {
        var (ok, _) = Run("xdg-mime", "default", DesktopFileName, mimeType);
        if (!ok)
            Log.Warning("xdg-mime could not set the default handler for {MimeType}", mimeType);
    }

    /// <summary>Reads the <c>Exec=</c> line of our desktop entry, if it exists.</summary>
    private static string? ReadExecCommand()
    {
        try
        {
            if (!File.Exists(DesktopFilePath))
                return null;

            var line = File.ReadLines(DesktopFilePath)
                .FirstOrDefault(candidate => candidate.StartsWith("Exec=", StringComparison.Ordinal));

            return line is null ? null : line["Exec=".Length..].Trim();
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to read {File}", DesktopFilePath);
            return null;
        }
    }

    /// <summary>Refreshes the MIME cache so the new entry is picked up immediately (best effort).</summary>
    private static void UpdateDesktopDatabase() =>
        Run("update-desktop-database", ApplicationsDirectory);

    private static bool IsDefault(string mimeType)
    {
        var (ok, output) = Run("xdg-mime", "query", "default", mimeType);
        return ok && output.Trim().Equals(DesktopFileName, StringComparison.OrdinalIgnoreCase);
    }

    private static void CleanMimeApps(string file)
    {
        try
        {
            if (!File.Exists(file))
                return;

            var kept = File.ReadAllLines(file)
                .Where(line => !line.Contains(DesktopFileName, StringComparison.OrdinalIgnoreCase))
                .ToArray();

            File.WriteAllLines(file, kept);
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to clean {File}", file);
        }
    }

    private static void TryDelete(string file)
    {
        try
        {
            File.Delete(file);
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to delete {File}", file);
        }
    }

    /// <summary>Runs a helper command, returning whether it succeeded and what it printed.</summary>
    private static (bool Ok, string Output) Run(string file, params string[] args)
    {
        try
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
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "Failed to run {File}", file);
            return (false, string.Empty);
        }
    }
}