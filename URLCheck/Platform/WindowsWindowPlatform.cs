using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using Photino.NET;
using Serilog;
using URLCheck.Interop;

namespace URLCheck.Platform;

/// <summary>Win32 implementation of the platform window operations.</summary>
[SupportedOSPlatform("windows")]
internal sealed class WindowsWindowPlatform : IWindowPlatform
{
    /// <summary>Hides the window outright, the way closing it to the tray always has.</summary>
    public void Hide(PhotinoWindow window) =>
        UseHandle(window, handle => NativeMethods.ShowWindow(handle, NativeMethods.SwHide));

    /// <summary>Brings the window back, restored and focused.</summary>
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

    public bool ConfigurePopup(PhotinoWindow window, bool borderless)
    {
        window
            .SetUseOsDefaultSize(false)
            .SetUseOsDefaultLocation(false)
            .SetSize(new(560, 640))
            .SetResizable(false)
            .SetChromeless(borderless)
            .SetTopMost(true)
            .Center()
            // Registering for toast notifications makes Photino drop a Start Menu shortcut named after
            // the window, which is right for the main window but not for a transient popup.
            .SetNotificationsEnabled(false);

        return borderless;
    }

    /// <summary>Nothing to do: Win32 draws whatever frame it was asked for.</summary>
    public void OnPopupCreated(PhotinoWindow window, bool borderless)
    {
    }

    /// <summary>
    ///     Top-level, deliberately not owned: an owned Win32 window is hidden together with its owner,
    ///     which would take the popup down whenever the host hides to the tray.
    /// </summary>
    public PhotinoWindow CreatePopupWindow(PhotinoWindow? parent) => new();

    /// <summary>
    ///     Like the popup, top-level and unowned: an owned window follows its owner to the tray, which
    ///     must not happen to a button that appears over other applications.
    /// </summary>
    public PhotinoWindow CreateSelectionButtonWindow(PhotinoWindow? parent) => new();

    /// <summary>
    ///     A tool window that never activates: the button must not steal focus from whatever the user is
    ///     working in when it pops up.
    /// </summary>
    public void ConfigureSelectionButtonWindow(PhotinoWindow window)
    {
        // GetWindowLongPtrW only exists on 64-bit Windows; the styles are a nicety, not a requirement.
        if (!Environment.Is64BitProcess)
            return;

        UseHandle(window, handle =>
        {
            var style = (long)NativeMethods.GetWindowLongPtr(handle, NativeMethods.GwlExStyle);
            style |= NativeMethods.WsExNoActivate | NativeMethods.WsExToolWindow;
            NativeMethods.SetWindowLongPtr(handle, NativeMethods.GwlExStyle, new IntPtr(style));

            // Windows 11 would otherwise draw its own light border and rounded corners around the
            // window, which shows up as a frame sitting outside the round button.
            var noBorder = NativeMethods.DwmwaColorNone;
            NativeMethods.DwmSetWindowAttribute(handle, NativeMethods.DwmwaBorderColor, ref noBorder, sizeof(int));

            var doNotRound = NativeMethods.DwmwcpDoNotRound;
            NativeMethods.DwmSetWindowAttribute(handle, NativeMethods.DwmwaWindowCornerPreference, ref doNotRound,
                sizeof(int));
        });
    }

    public System.Drawing.Point ShowSelectionButton(PhotinoWindow window, int x, int y, int size)
    {
        var placed = ClampToMonitor(x, y, size);

        // Shown without stealing focus, and placed and sized in the same call: a separate move can be
        // swallowed by the show, and Photino's own clamp mixes logical and physical pixels.
        UseHandle(window, handle =>
        {
            NativeMethods.ShowWindow(handle, NativeMethods.SwShowNoActivate);
            NativeMethods.SetWindowPos(handle, NativeMethods.HwndTopMost, placed.Left, placed.Top, size, size,
                NativeMethods.SwpNoActivate | NativeMethods.SwpShowWindow);
        });

        Log.Debug("Selection button placed at {Left},{Top}", placed.Left, placed.Top);
        return new System.Drawing.Point(placed.Left, placed.Top);
    }

    public bool PointerButtonPressed() =>
        IsPressed(NativeMethods.VkLButton) || IsPressed(NativeMethods.VkRButton) || IsPressed(NativeMethods.VkMButton);

    public bool TryGetCursorPosition(out int x, out int y)
    {
        if (NativeMethods.GetCursorPos(out var point))
        {
            x = point.X;
            y = point.Y;
            return true;
        }

        x = 0;
        y = 0;
        return false;
    }

    private static bool IsPressed(int key) => (NativeMethods.GetAsyncKeyState(key) & 0x8000) != 0;

    /// <summary>Keeps the button inside the work area of the monitor the pointer is on.</summary>
    private static (int Left, int Top) ClampToMonitor(int x, int y, int size)
    {
        var pointer = new NativeMethods.Point { X = x, Y = y };
        var monitor = NativeMethods.MonitorFromPoint(pointer, NativeMethods.MonitorDefaultToNearest);
        var info = new NativeMethods.MonitorInfo { cbSize = Marshal.SizeOf<NativeMethods.MonitorInfo>() };

        if (monitor == IntPtr.Zero || !NativeMethods.GetMonitorInfo(monitor, ref info))
            return (x, y);

        var left = Math.Clamp(x, info.rcWork.Left, Math.Max(info.rcWork.Left, info.rcWork.Right - size));
        var top = Math.Clamp(y, info.rcWork.Top, Math.Max(info.rcWork.Top, info.rcWork.Bottom - size));
        return (left, top);
    }

    private static void UseHandle(PhotinoWindow window, Action<IntPtr> action)
    {
        var handle = window.WindowHandle;
        if (handle != IntPtr.Zero)
            action(handle);
    }
}
