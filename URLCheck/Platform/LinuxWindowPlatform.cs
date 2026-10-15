using System.Runtime.Versioning;
using Photino.NET;

namespace URLCheck.Platform;

/// <summary>GTK implementation of the platform window operations.</summary>
[SupportedOSPlatform("linux")]
internal sealed class LinuxWindowPlatform : IWindowPlatform
{
    public bool HidesPopupOnClose => true;

    public void Hide(PhotinoWindow window) => window.SetMinimized(true);

    public void Show(PhotinoWindow window)
    {
        window.SetMinimized(false);
        window.SetTopMost(true);
    }

    public void KeepOnTop(PhotinoWindow window) => window.SetTopMost(true);

    public void Resize(PhotinoWindow window, int width, int height)
    {
        window.SetSize(width, height);

        // Keep it centered on every fit.
        window.Center();
    }

    /// <summary>
    ///     GTK draws square window corners. Transparent corners need RGBA visuals that Photino does not
    ///     expose, so on Linux the popup keeps its CSS-rounded content on a square window.
    /// </summary>
    public void RoundCorners(PhotinoWindow window)
    {
    }

    /// <summary>
    ///     Unlike Win32, GTK ignores <c>gtk_window_resize</c> on a window that is not resizable — which is
    ///     exactly what the popup's auto-fit relies on — so the popup deliberately stays resizable here.
    /// </summary>
    public void ConfigurePopup(PhotinoWindow window) => window
        .SetUseOsDefaultSize(false)
        .SetUseOsDefaultLocation(false)
        .SetSize(new(560, 640))
        .SetChromeless(true)
        .SetTopMost(true)
        .Center();
}
