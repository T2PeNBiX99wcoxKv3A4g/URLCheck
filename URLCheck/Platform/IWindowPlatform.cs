using Photino.NET;

namespace URLCheck.Platform;

/// <summary>Window operations that differ per platform (hide/show/always-on-top/drag).</summary>
internal interface IWindowPlatform
{
    void Hide(PhotinoWindow window);

    void Show(PhotinoWindow window);

    void KeepOnTop(PhotinoWindow window);

    void Resize(PhotinoWindow window, int width, int height);

    void RoundCorners(PhotinoWindow window);

    /// <summary>
    ///     Applies the popup's platform-specific flags (frame, top-most, centring, sizing) and returns the
    ///     borderless state actually in effect: a platform may have to fall back.
    /// </summary>
    bool ConfigurePopup(PhotinoWindow window, bool borderless);

    /// <summary>Called once the popup's native window exists, but before it is shown.</summary>
    void OnPopupCreated(PhotinoWindow window, bool borderless);

    /// <summary>
    ///     Creates the popup window, parented where the platform needs it: destroying a top-level GTK
    ///     window quits the whole application, so a popup that is allowed to close must be a transient
    ///     child of the host there.
    /// </summary>
    PhotinoWindow CreatePopupWindow(PhotinoWindow? parent);

    /// <summary>Creates the small, chromeless window that hosts the floating selection button.</summary>
    PhotinoWindow CreateSelectionButtonWindow(PhotinoWindow? parent);

    /// <summary>Applies the button window's platform styling once its native window exists.</summary>
    void ConfigureSelectionButtonWindow(PhotinoWindow window);

    /// <summary>
    ///     Shows the button window near <paramref name="x" />,<paramref name="y" />, without stealing
    ///     focus when possible, and returns the place it was really put.
    /// </summary>
    System.Drawing.Point ShowSelectionButton(PhotinoWindow window, int x, int y);

    /// <summary>
    ///     True while a mouse button is down, so the floating button can be dismissed the moment the
    ///     user clicks anywhere else: no window ever tells us that such a click happened.
    /// </summary>
    bool PointerButtonPressed();

    /// <summary>The pointer position in screen coordinates; false when the platform cannot report it.</summary>
    bool TryGetCursorPosition(out int x, out int y);
}
