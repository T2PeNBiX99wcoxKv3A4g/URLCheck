using System.Runtime.Versioning;
using Photino.NET;

namespace URLCheck.Platform;

/// <summary>GTK implementation of the platform window operations.</summary>
[SupportedOSPlatform("linux")]
internal sealed class LinuxWindowPlatform : IWindowPlatform
{
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
}
