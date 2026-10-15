using Photino.NET;

namespace URLCheck.Platform;

/// <summary>Window operations that differ per platform (hide/show/always-on-top/drag).</summary>
internal interface IWindowPlatform
{
    /// <summary>
    ///     True when a top-level window cannot simply be closed without taking the whole application
    ///     down — GTK wires <c>gtk_main_quit</c> to the destroy signal of top-level windows — so the
    ///     popup is hidden and reused instead of closed.
    /// </summary>
    bool HidesPopupOnClose { get; }

    void Hide(PhotinoWindow window);

    void Show(PhotinoWindow window);

    void KeepOnTop(PhotinoWindow window);

    void Resize(PhotinoWindow window, int width, int height);

    void RoundCorners(PhotinoWindow window);

    /// <summary>Applies the popup's platform-specific flags (chromeless, top-most, centring, sizing).</summary>
    void ConfigurePopup(PhotinoWindow window);
}
