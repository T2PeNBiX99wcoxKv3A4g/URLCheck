using System.Diagnostics;
using System.Runtime.Versioning;
using Microsoft.Win32;
using PhotinoNetUtils.Utils;
using Serilog;

namespace URLCheck.Platform;

/// <summary>
///     Registers URLCheck in the Windows registry as a candidate browser for <c>http</c>/<c>https</c>
///     and as a handler for the custom <c>checkurl://</c> scheme.
/// </summary>
/// <remarks>
///     Windows 10/11 protect the default-handler choice with a hash (UserChoice), so an app can never
///     silently become the default browser. Registering here only makes URLCheck appear in the
///     "Default apps" list; the user still has to select it. <see cref="OpenDefaultAppsSettings" />
///     deep-links them to that page.
/// </remarks>
[SupportedOSPlatform("windows")]
internal sealed class WindowsProtocolRegistrar : Singleton<WindowsProtocolRegistrar>, IProtocolRegistrar
{
    private const string AppKeyName = "URLCheck";

    // Windows' shell refuses any scheme whose name starts with "url" (ShellExecute returns
    // SE_ERR_FNF and shows "cannot find program"), so the script links use "checkurl" instead.
    private const string CustomScheme = "checkurl";

    /// <summary>Links shared before the rename; still registered so they keep working where they can.</summary>
    private const string LegacyScheme = "urlcheck";

    private const string HttpProgId = "URLCheck.HTTP";
    private const string HttpsProgId = "URLCheck.HTTPS";

    private readonly string _command;

    public WindowsProtocolRegistrar()
    {
        ExecutablePath = Environment.ProcessPath
                         ?? Process.GetCurrentProcess().MainModule?.FileName
                         ?? string.Empty;
        _command = $"\"{ExecutablePath}\" \"%1\"";
    }

    public string ExecutablePath { get; }

    /// <summary>
    ///     The path stored for the http handler. Comparing it with <see cref="ExecutablePath" /> is how a
    ///     stale registration (the app moved, or a debug build took over) is detected.
    /// </summary>
    public string? RegisteredExecutablePath
    {
        get
        {
            using var key = Registry.CurrentUser.OpenSubKey($@"Software\Classes\{HttpProgId}\shell\open\command");
            return WindowsCommandLine.ExtractExecutable(key?.GetValue(null) as string);
        }
    }

    /// <summary>Registers URLCheck as an http/https candidate browser and as the checkurl:// handler.</summary>
    public void RegisterBrowser()
    {
        EnsureExecutable();

        RegisterProgId(HttpProgId, "URLCheck HTTP handler");
        RegisterProgId(HttpsProgId, "URLCheck HTTPS handler");

        // Script links are part of the same integration, so they are registered together and cannot be
        // left behind as a second, easily forgotten step.
        RegisterProgId(CustomScheme, "URL:URLCheck Protocol");
        RegisterProgId(LegacyScheme, "URL:URLCheck Protocol");

        using var capabilities = Registry.CurrentUser.CreateSubKey(
            $@"Software\Clients\StartMenuInternet\{AppKeyName}\Capabilities");
        capabilities.SetValue(null, AppKeyName);
        capabilities.SetValue("ApplicationName", AppKeyName);
        capabilities.SetValue("ApplicationDescription", "URLCheck URL intermediary");

        using var associations = capabilities.CreateSubKey("URLAssociations");
        associations.SetValue("http", HttpProgId);
        associations.SetValue("https", HttpsProgId);

        using var startMenuCommand = Registry.CurrentUser.CreateSubKey(
            $@"Software\Clients\StartMenuInternet\{AppKeyName}\shell\open\command");
        startMenuCommand.SetValue(null, _command);

        using var registered = Registry.CurrentUser.CreateSubKey(@"Software\RegisteredApplications");
        registered.SetValue(AppKeyName, $@"Software\Clients\StartMenuInternet\{AppKeyName}\Capabilities");
    }

    /// <summary>
    ///     Repairs a stale registration: the handler is stored as an absolute path, so after the app moves
    ///     every click on a <c>checkurl://</c> link fails before the app is even started, with no visible
    ///     error. A scheme that was never registered is left alone; that is the user's choice.
    /// </summary>
    public void EnsureCustomScheme()
    {
        RepointIfStale(CustomScheme);
        RepointIfStale(LegacyScheme);
    }

    /// <summary>Rewrites the handler of one scheme when it points at another build.</summary>
    private void RepointIfStale(string scheme)
    {
        using var key = Registry.CurrentUser.OpenSubKey($@"Software\Classes\{scheme}\shell\open\command");
        if (key?.GetValue(null) is not string command ||
            command.Trim().Equals(_command, StringComparison.OrdinalIgnoreCase))
            return;

        Log.Information("Repointing the {Scheme}:// handler to {Path}", scheme, ExecutablePath);
        EnsureExecutable();
        RegisterProgId(scheme, "URL:URLCheck Protocol");
    }

    /// <summary>Removes every registry key this app created, so nothing is left behind after uninstalling.</summary>
    public void Unregister()
    {
        DeleteKey($@"Software\Classes\{HttpProgId}");
        DeleteKey($@"Software\Classes\{HttpsProgId}");
        DeleteKey($@"Software\Classes\{CustomScheme}");
        DeleteKey($@"Software\Classes\{LegacyScheme}");
        DeleteKey($@"Software\Clients\StartMenuInternet\{AppKeyName}");

        using var registered = Registry.CurrentUser.OpenSubKey(@"Software\RegisteredApplications", true);
        registered?.DeleteValue(AppKeyName, false);
    }

    /// <summary>Opens the Windows "Default apps" settings page so the user can pick URLCheck.</summary>
    public void OpenDefaultAppsSettings() =>
        Process.Start(new ProcessStartInfo("ms-settings:defaultapps")
        {
            UseShellExecute = true
        });

    public bool IsDefaultBrowser()
    {
        using var key = Registry.CurrentUser.OpenSubKey(
            @"Software\Microsoft\Windows\Shell\Associations\UrlAssociations\http\UserChoice");

        return key?.GetValue("ProgId") as string == HttpProgId;
    }

    public bool IsCustomSchemeRegistered()
    {
        using var key = Registry.CurrentUser.OpenSubKey($@"Software\Classes\{CustomScheme}\shell\open\command");
        return key?.GetValue(null) is string command && command.Length > 0;
    }

    private static void DeleteKey(string path) =>
        Registry.CurrentUser.DeleteSubKeyTree(path, false);

    private void EnsureExecutable()
    {
        if (string.IsNullOrWhiteSpace(ExecutablePath))
            throw new InvalidOperationException("Unable to determine the URLCheck executable path.");
    }

    private void RegisterProgId(string progId, string description)
    {
        using var key = Registry.CurrentUser.CreateSubKey($@"Software\Classes\{progId}");
        key.SetValue(null, description);
        key.SetValue("URL Protocol", string.Empty);

        using var icon = key.CreateSubKey("DefaultIcon");
        icon.SetValue(null, $"\"{ExecutablePath}\",0");

        using var openCommand = key.CreateSubKey(@"shell\open\command");
        openCommand.SetValue(null, _command);
    }
}