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
    public bool ConfigurePopup(PhotinoWindow window, bool borderless)
    {
        // The RGBA visual has to be known before the window is built, so fall back here rather than
        // finding out too late: a frameless popup with a filled-in background just looks broken.
        if (borderless && !LinuxGtk.CanBeTransparent)
        {
            Log.Information("This screen cannot do transparent windows; falling back to a framed popup");
            borderless = false;
        }

        window
            .SetUseOsDefaultSize(false)
            .SetUseOsDefaultLocation(false)
            .SetSize(new(560, 640))
            .SetChromeless(borderless)
            .SetTopMost(true)
            .Center();

        return borderless;
    }

    /// <summary>
    ///     The window exists now and has not been realised yet, which is the only moment the visual can
    ///     still be set — at ConfigurePopup time Photino has not created it at all.
    /// </summary>
    public void OnPopupCreated(PhotinoWindow window, bool borderless)
    {
        if (!borderless)
            return;

        if (!LinuxGtk.MakeTransparent(window.Title))
        {
            Log.Warning("The popup could not be made transparent after all");
            return;
        }

        // The window being transparent is not enough: WebKit paints its own opaque background behind the
        // page, which is what shows through the rounded corners.
        if (!LinuxGtk.MakeWebViewTransparent(window.Title))
            Log.Warning("The popup window is transparent but the web view still paints a background");
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
