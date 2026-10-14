using System.Diagnostics;
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
internal sealed class ProtocolRegistrationService
{
    private const string AppKeyName = "URLCheck";
    private const string CustomScheme = "urlcheck";
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
            "app.registerProtocols" => RegisterReply(context),
            "app.openDefaultApps" => OpenDefaultAppsReply(context),
            _ => null
        };

        return Task.FromResult(response);
    }

    /// <summary>Writes all required registry keys for the current user.</summary>
    public void Register()
    {
        if (string.IsNullOrWhiteSpace(ExecutablePath))
            throw new InvalidOperationException("Unable to determine the URLCheck executable path.");

        RegisterProgId("URLCheck.HTTP", "URLCheck HTTP handler", _command);
        RegisterProgId("URLCheck.HTTPS", "URLCheck HTTPS handler", _command);
        RegisterProgId(CustomScheme, "URL:URLCheck Protocol", _command);

        using var capabilities = Registry.CurrentUser.CreateSubKey(
            $@"Software\Clients\StartMenuInternet\{AppKeyName}\Capabilities");
        capabilities.SetValue(null, AppKeyName);
        capabilities.SetValue("ApplicationName", AppKeyName);
        capabilities.SetValue("ApplicationDescription", "URLCheck URL intermediary");

        using var associations = capabilities.CreateSubKey("URLAssociations");
        associations.SetValue("http", "URLCheck.HTTP");
        associations.SetValue("https", "URLCheck.HTTPS");

        using var startMenuCommand = Registry.CurrentUser.CreateSubKey(
            $@"Software\Clients\StartMenuInternet\{AppKeyName}\shell\open\command");
        startMenuCommand.SetValue(null, _command);

        using var registered = Registry.CurrentUser.CreateSubKey(@"Software\RegisteredApplications");
        registered.SetValue(AppKeyName, $@"Software\Clients\StartMenuInternet\{AppKeyName}\Capabilities");
    }

    /// <summary>Opens the Windows "Default apps" settings page so the user can pick URLCheck.</summary>
    public static void OpenDefaultAppsSettings()
    {
        Process.Start(new ProcessStartInfo("ms-settings:defaultapps")
        {
            UseShellExecute = true
        });
    }

    private void RegisterProgId(string progId, string description, string command)
    {
        using var key = Registry.CurrentUser.CreateSubKey($@"Software\Classes\{progId}");
        key.SetValue(null, description);
        key.SetValue("URL Protocol", string.Empty);

        using var icon = key.CreateSubKey("DefaultIcon");
        icon.SetValue(null, $"\"{ExecutablePath}\",0");

        using var openCommand = key.CreateSubKey(@"shell\open\command");
        openCommand.SetValue(null, command);
    }

    private NativeResponse RegisterReply(NativeContext context)
    {
        Register();
        return context.Reply("app.registerProtocols.result", new
        {
            Ok = true,
            ExecutablePath
        });
    }

    private static NativeResponse OpenDefaultAppsReply(NativeContext context)
    {
        OpenDefaultAppsSettings();
        return context.Reply("app.openDefaultApps.result", new
        {
            Ok = true
        });
    }
}