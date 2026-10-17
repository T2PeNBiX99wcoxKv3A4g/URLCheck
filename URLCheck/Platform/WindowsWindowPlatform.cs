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

    public void ShowSelectionButton(PhotinoWindow window, int x, int y)
    {
        window.MoveTo(x, y);
        UseHandle(window, handle =>
        {
            NativeMethods.ShowWindow(handle, NativeMethods.SwShowNoActivate);
            NativeMethods.SetWindowPos(handle, NativeMethods.HwndTopMost, 0, 0, 0, 0,
                NativeMethods.SwpNoMove | NativeMethods.SwpNoSize | NativeMethods.SwpNoActivate);
        });
    }

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

    private static void UseHandle(PhotinoWindow window, Action<IntPtr> action)
    {
        var handle = window.WindowHandle;
        if (handle != IntPtr.Zero)
            action(handle);
    }
}
