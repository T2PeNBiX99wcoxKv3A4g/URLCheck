using System.Runtime.Versioning;
using Photino.NET;
using URLCheck.Interop;

namespace URLCheck.Platform;

/// <summary>Win32 implementation of the platform window operations.</summary>
[SupportedOSPlatform("windows")]
internal sealed class WindowsWindowPlatform : IWindowPlatform
{
    public void Hide(PhotinoWindow window) =>
        UseHandle(window, handle => NativeMethods.ShowWindow(handle, NativeMethods.SwHide));

    public void Show(PhotinoWindow window) => UseHandle(window, handle =>
    {
        NativeMethods.ShowWindow(handle, NativeMethods.SwRestore);
        NativeMethods.SetForegroundWindow(handle);
    });

    public void KeepOnTop(PhotinoWindow window) => UseHandle(window, handle =>
        NativeMethods.SetWindowPos(handle, NativeMethods.HwndTopMost, 0, 0, 0, 0,
            NativeMethods.SwpNoMove | NativeMethods.SwpNoSize | NativeMethods.SwpNoActivate));

    public void Resize(PhotinoWindow window, int width, int height)
    {
        UseHandle(window, handle => NativeMethods.SetWindowPos(handle, IntPtr.Zero, 0, 0, width, height,
            NativeMethods.SwpNoMove | NativeMethods.SwpNoZOrder | NativeMethods.SwpNoActivate));

        // Keep it centered on every fit.
        window.Center();
    }

    public void RoundCorners(PhotinoWindow window) => UseHandle(window, handle =>
    {
        var preference = NativeMethods.DwmwcpRound;
        NativeMethods.DwmSetWindowAttribute(handle, NativeMethods.DwmwaWindowCornerPreference, ref preference,
            sizeof(int));
    });

    public void ConfigurePopup(PhotinoWindow window) => window
        .SetUseOsDefaultSize(false)
        .SetUseOsDefaultLocation(false)
        .SetSize(new(560, 640))
        .SetResizable(false)
        .SetChromeless(true)
        .SetTopMost(true)
        .Center();

    /// <summary>
    ///     Top-level, deliberately not owned: an owned Win32 window is hidden together with its owner,
    ///     which would take the popup down whenever the host hides to the tray.
    /// </summary>
    public PhotinoWindow CreatePopupWindow(PhotinoWindow? parent) => new();

    private static void UseHandle(PhotinoWindow window, Action<IntPtr> action)
    {
        var handle = window.WindowHandle;
        if (handle != IntPtr.Zero)
            action(handle);
    }
}
