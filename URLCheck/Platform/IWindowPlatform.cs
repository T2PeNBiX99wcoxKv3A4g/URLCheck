using Photino.NET;

namespace URLCheck.Platform;

/// <summary>Window operations that differ per platform (hide/show/always-on-top/drag).</summary>
internal interface IWindowPlatform
{
    /// <summary>
    ///     True when the platform gives every top-level window its own blocking message loop (Win32).
    ///     False when one shared loop drives them all (GTK), where a window must be dismissed by hiding
    ///     it: closing it tears down that shared loop, and with it the whole application.
    /// </summary>
    bool WindowPerMessageLoop { get; }

    void Hide(PhotinoWindow window);

    void Show(PhotinoWindow window);

    void KeepOnTop(PhotinoWindow window);

    void Resize(PhotinoWindow window, int width, int height);

    void RoundCorners(PhotinoWindow window);

    /// <summary>Applies the popup's platform-specific flags (chromeless, top-most, centring, sizing).</summary>
    void ConfigurePopup(PhotinoWindow window);
}
