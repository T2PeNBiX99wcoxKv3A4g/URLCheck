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

    public void StartDrag(PhotinoWindow window) => UseHandle(window, handle =>
    {
        NativeMethods.ReleaseCapture();
        NativeMethods.SendMessage(handle, NativeMethods.WmNcLButtonDown, NativeMethods.HtCaption, IntPtr.Zero);
    });

    public void Resize(PhotinoWindow window, int width, int height) => UseHandle(window, handle =>
        NativeMethods.SetWindowPos(handle, IntPtr.Zero, 0, 0, width, height,
            NativeMethods.SwpNoMove | NativeMethods.SwpNoZOrder | NativeMethods.SwpNoActivate));

    private static void UseHandle(PhotinoWindow window, Action<IntPtr> action)
    {
        var handle = window.WindowHandle;
        if (handle != IntPtr.Zero)
            action(handle);
    }
}
