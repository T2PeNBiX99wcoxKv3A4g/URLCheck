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
    /// <summary>
    ///     Takes the window off the user's radar without hiding it. Photino's windows host a web view
    ///     that must be created while the window is visible; hiding one outright leaves it permanently
    ///     blank, so it is cloaked instead — DWM stops drawing it and the shell drops it from the
    ///     taskbar and Alt+Tab, while the window itself stays "visible" and keeps its web view alive.
    ///     It is minimised too so nothing is ever painted in the split second before the cloak lands.
    /// </summary>
    public void Hide(PhotinoWindow window) => UseHandle(window, handle =>
    {
        Cloak(handle, true);
        NativeMethods.ShowWindow(handle, NativeMethods.SwShowMinNoActive);
    });

    /// <summary>Brings the window back: uncloaked, restored and focused.</summary>
    public void Show(PhotinoWindow window) => UseHandle(window, handle =>
    {
        Cloak(handle, false);
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
        });
    }

    public System.Drawing.Point ShowSelectionButton(PhotinoWindow window, int x, int y)
    {
        var placed = ClampToMonitor(window, x, y);

        // Uncloaked, un-minimised and placed in one go: a separate move can be swallowed by the
        // show, and Photino's own clamp mixes logical and physical pixels. SW_SHOWNOACTIVATE also
        // restores a minimised window, but without pulling focus away from whatever has it.
        UseHandle(window, handle =>
        {
            Cloak(handle, false);
            NativeMethods.ShowWindow(handle, NativeMethods.SwShowNoActivate);
            NativeMethods.SetWindowPos(handle, NativeMethods.HwndTopMost, placed.Left, placed.Top, 0, 0,
                NativeMethods.SwpNoSize | NativeMethods.SwpNoActivate);
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
    private static (int Left, int Top) ClampToMonitor(PhotinoWindow window, int x, int y)
    {
        var pointer = new NativeMethods.Point { X = x, Y = y };
        var monitor = NativeMethods.MonitorFromPoint(pointer, NativeMethods.MonitorDefaultToNearest);
        var info = new NativeMethods.MonitorInfo { cbSize = Marshal.SizeOf<NativeMethods.MonitorInfo>() };

        if (monitor == IntPtr.Zero || !NativeMethods.GetMonitorInfo(monitor, ref info))
            return (x, y);

        var left = Math.Clamp(x, info.rcWork.Left, Math.Max(info.rcWork.Left, info.rcWork.Right - window.Width));
        var top = Math.Clamp(y, info.rcWork.Top, Math.Max(info.rcWork.Top, info.rcWork.Bottom - window.Height));
        return (left, top);
    }

    /// <summary>Cloaks or uncloaks a window through DWM. Best effort: older systems just ignore it.</summary>
    private static void Cloak(IntPtr handle, bool cloaked)
    {
        var value = cloaked ? 1 : 0;
        NativeMethods.DwmSetWindowAttribute(handle, NativeMethods.DwmwaCloak, ref value, sizeof(int));
    }

    private static void UseHandle(PhotinoWindow window, Action<IntPtr> action)
    {
        var handle = window.WindowHandle;
        if (handle != IntPtr.Zero)
            action(handle);
    }
}
