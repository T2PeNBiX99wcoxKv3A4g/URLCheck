namespace URLCheck.Platform;

/// <summary>
///     Reports every new text the user copies, so the floating button can react without polling or
///     locking the clipboard.
/// </summary>
internal interface IClipboardWatcher : IDisposable
{
    /// <summary>
    ///     Raised on the platform's clipboard thread with the freshly copied text. Implementations must
    ///     never block the clipboard and may silently skip a value they could not read in time.
    /// </summary>
    event Action<string>? TextCopied;

    /// <summary>Starts watching. Calling it again while already watching does nothing.</summary>
    void Start();

    /// <summary>Stops watching. Safe to call when not watching.</summary>
    void Stop();
}