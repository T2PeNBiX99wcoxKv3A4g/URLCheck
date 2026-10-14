namespace URLCheck.Interop;

/// <summary>A notification-area (tray) icon. Only implemented where the platform provides one.</summary>
internal interface ITrayIcon : IDisposable
{
    /// <summary>Shows the icon; returns immediately.</summary>
    void Start();
}
