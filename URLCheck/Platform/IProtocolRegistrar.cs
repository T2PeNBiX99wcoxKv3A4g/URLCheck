namespace URLCheck.Platform;

/// <summary>Per-platform registration of the http/https and <c>urlcheck://</c> handlers.</summary>
internal interface IProtocolRegistrar
{
    /// <summary>Full path of the running executable, used in the generated handler entries.</summary>
    string ExecutablePath { get; }

    /// <summary>The executable the registered handlers currently point at, or null when unregistered.</summary>
    string? RegisteredExecutablePath { get; }

    /// <summary>Makes URLCheck an http/https handler (and, where possible, the default one).</summary>
    void RegisterBrowser();

    /// <summary>Registers the custom <c>urlcheck://</c> scheme handler.</summary>
    void RegisterCustomScheme();

    /// <summary>Removes everything <see cref="RegisterBrowser" />/<see cref="RegisterCustomScheme" /> created.</summary>
    void Unregister();

    /// <summary>Sends the user somewhere they can pick URLCheck as the default browser.</summary>
    void OpenDefaultAppsSettings();

    /// <summary>True when the OS currently routes http links to URLCheck.</summary>
    bool IsDefaultBrowser();

    /// <summary>True when the <c>urlcheck://</c> scheme is routed to URLCheck.</summary>
    bool IsCustomSchemeRegistered();
}
