namespace URLCheck.Interop;

/// <summary>A notification-area (tray) icon. Only implemented where the platform provides one.</summary>
internal interface ITrayIcon : IDisposable
{
    /// <summary>
    ///     Shows the icon and reports whether it was actually created. Implementations may have to defer
    ///     the work, so a <c>false</c> result only means "not available", never "still starting".
    /// </summary>
    bool Start();
}
