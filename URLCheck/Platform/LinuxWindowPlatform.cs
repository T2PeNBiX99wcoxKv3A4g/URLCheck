using System.Runtime.Versioning;
using Photino.NET;
using Serilog;

namespace URLCheck.Platform;

/// <summary>GTK implementation of the platform window operations.</summary>
[SupportedOSPlatform("linux")]
internal sealed class LinuxWindowPlatform : IWindowPlatform
{
    public void Hide(PhotinoWindow window)
    {
        // Minimising leaves the window in the taskbar; hiding it outright does not.
        if (!LinuxGtk.Hide(window.Title))
            window.SetMinimized(true);
    }

    public void Show(PhotinoWindow window)
    {
        if (LinuxGtk.Present(window.Title))
            return;

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
    public void ConfigurePopup(PhotinoWindow window, bool borderless)
    {
        window
            .SetUseOsDefaultSize(false)
            .SetUseOsDefaultLocation(false)
            .SetSize(new(560, 640))
            .SetChromeless(borderless)
            .SetTopMost(true)
            .Center();

        // Photino has no transparency support on Linux, so this reaches into GTK directly. It only makes
        // sense without a frame, and has to happen before the window is realised — which is where this
        // runs. When it cannot be done the UI is told, and keeps drawing an opaque background.
        if (borderless && !LinuxGtk.MakeTransparent(window.Title))
            Log.Information("The popup could not be made transparent; keeping an opaque background");
    }

    /// <summary>
    ///     A transient child of the host window. GTK quits the shared main loop when a <em>top-level</em>
    ///     window is destroyed, so a popup that is allowed to close needs a parent; being transient also
    ///     lets the compositor place it relative to the host, which is the only way to centre a window on
    ///     Wayland.
    /// </summary>
    public PhotinoWindow CreatePopupWindow(PhotinoWindow? parent) =>
        parent is null ? new PhotinoWindow() : new PhotinoWindow(parent);
}
