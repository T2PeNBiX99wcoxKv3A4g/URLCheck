using System.Diagnostics;
using System.Runtime.Versioning;
using Microsoft.Win32;

namespace URLCheck.Platform;

/// <summary>
///     Registers URLCheck in the Windows registry as a candidate browser for <c>http</c>/<c>https</c>
///     and as a handler for the custom <c>urlcheck://</c> scheme.
/// </summary>
/// <remarks>
///     Windows 10/11 protect the default-handler choice with a hash (UserChoice), so an app can never
///     silently become the default browser. Registering here only makes URLCheck appear in the
///     "Default apps" list; the user still has to select it. <see cref="OpenDefaultAppsSettings" />
///     deep-links them to that page.
/// </remarks>
[SupportedOSPlatform("windows")]
internal sealed class WindowsProtocolRegistrar : IProtocolRegistrar
{
    private const string AppKeyName = "URLCheck";
    private const string CustomScheme = "urlcheck";
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

    /// <summary>Registers URLCheck as an http/https candidate browser.</summary>
    public void RegisterBrowser()
    {
        EnsureExecutable();

        RegisterProgId(HttpProgId, "URLCheck HTTP handler");
        RegisterProgId(HttpsProgId, "URLCheck HTTPS handler");

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

    /// <summary>Registers the custom <c>urlcheck://</c> scheme handler.</summary>
    public void RegisterCustomScheme()
    {
        EnsureExecutable();
        RegisterProgId(CustomScheme, "URL:URLCheck Protocol");
    }

    /// <summary>Removes every registry key this app created, so nothing is left behind after uninstalling.</summary>
    public void Unregister()
    {
        DeleteKey($@"Software\Classes\{HttpProgId}");
        DeleteKey($@"Software\Classes\{HttpsProgId}");
        DeleteKey($@"Software\Classes\{CustomScheme}");
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
