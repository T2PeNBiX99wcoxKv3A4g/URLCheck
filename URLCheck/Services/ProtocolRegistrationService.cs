using System.Diagnostics;
using System.Runtime.Versioning;
using JetBrains.Annotations;
using Microsoft.Win32;
using URLCheck.Messaging;

namespace URLCheck.Services;

/// <summary>
///     Registers URLCheck as a candidate browser for <c>http</c>/<c>https</c> and as a handler for the
///     custom <c>urlcheck://</c> scheme.
/// </summary>
/// <remarks>
///     Windows 10/11 protect the default-handler choice with a hash (UserChoice), so an app can never
///     silently become the default browser. Registering here only makes URLCheck appear in the
///     "Default apps" list; the user still has to select it. <see cref="OpenDefaultAppsSettings" />
///     deep-links them to that page.
/// </remarks>
[SupportedOSPlatform("windows")]
internal sealed class ProtocolRegistrationService
{
    private const string AppKeyName = "URLCheck";
    private const string CustomScheme = "urlcheck";
    private const string HttpProgId = "URLCheck.HTTP";
    private const string HttpsProgId = "URLCheck.HTTPS";

    private readonly string _command;

    public ProtocolRegistrationService()
    {
        ExecutablePath = Environment.ProcessPath
                         ?? Process.GetCurrentProcess().MainModule?.FileName
                         ?? string.Empty;
        _command = $"\"{ExecutablePath}\" \"%1\"";
        NativeBridge.MessageReceived += HandleMessageAsync;
    }

    [PublicAPI] public string ExecutablePath { get; }

    /// <summary>Handles the <c>app.*</c> messages.</summary>
    private Task<NativeResponse?> HandleMessageAsync(NativeContext context)
    {
        var response = context.Request.Type switch
        {
            "app.registerProtocols" => RegisterBrowserReply(context),
            "app.registerCustomScheme" => RegisterCustomSchemeReply(context),
            "app.unregisterProtocols" => UnregisterReply(context),
            "app.protocolStatus" => StatusReply(context),
            "app.openDefaultApps" => OpenDefaultAppsReply(context),
            _ => null
        };

        return Task.FromResult(response);
    }

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
    public static void Unregister()
    {
        DeleteKey($@"Software\Classes\{HttpProgId}");
        DeleteKey($@"Software\Classes\{HttpsProgId}");
        DeleteKey($@"Software\Classes\{CustomScheme}");
        DeleteKey($@"Software\Clients\StartMenuInternet\{AppKeyName}");

        using var registered = Registry.CurrentUser.OpenSubKey(@"Software\RegisteredApplications", true);
        registered?.DeleteValue(AppKeyName, false);
    }

    private static void DeleteKey(string path) =>
        Registry.CurrentUser.DeleteSubKeyTree(path, false);

    /// <summary>Opens the Windows "Default apps" settings page so the user can pick URLCheck.</summary>
    public static void OpenDefaultAppsSettings()
    {
        Process.Start(new ProcessStartInfo("ms-settings:defaultapps")
        {
            UseShellExecute = true
        });
    }

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

    /// <summary>True when Windows currently routes http links to URLCheck.</summary>
    private static bool IsDefaultBrowser()
    {
        using var key = Registry.CurrentUser.OpenSubKey(
            @"Software\Microsoft\Windows\Shell\Associations\UrlAssociations\http\UserChoice");

        return key?.GetValue("ProgId") as string == HttpProgId;
    }

    private static bool IsCustomSchemeRegistered()
    {
        using var key = Registry.CurrentUser.OpenSubKey($@"Software\Classes\{CustomScheme}\shell\open\command");
        return key?.GetValue(null) is string command && command.Length > 0;
    }

    private NativeResponse RegisterBrowserReply(NativeContext context)
    {
        RegisterBrowser();
        return context.Reply("app.registerProtocols.result", new
        {
            Ok = true,
            ExecutablePath
        });
    }

    private NativeResponse RegisterCustomSchemeReply(NativeContext context)
    {
        RegisterCustomScheme();
        return context.Reply("app.registerCustomScheme.result", new
        {
            Ok = true,
            ExecutablePath
        });
    }

    private static NativeResponse UnregisterReply(NativeContext context)
    {
        Unregister();
        return context.Reply("app.unregisterProtocols.result", new { Ok = true });
    }

    private static NativeResponse StatusReply(NativeContext context) =>
        context.Reply("app.protocolStatus.result", new
        {
            IsDefault = IsDefaultBrowser(),
            CustomSchemeRegistered = IsCustomSchemeRegistered()
        });

    private static NativeResponse OpenDefaultAppsReply(NativeContext context)
    {
        OpenDefaultAppsSettings();
        return context.Reply("app.openDefaultApps.result", new
        {
            Ok = true
        });
    }
}
