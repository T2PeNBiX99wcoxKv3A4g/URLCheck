using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using Serilog;
using URLCheck.Extensions;
using URLCheck.Utils;

namespace URLCheck.Interop;

/// <summary>
///     A notification-area (tray) icon hosted on its own STA thread with a private message loop,
///     independent of Photino's UI thread.
/// </summary>
[SupportedOSPlatform("windows")]
internal sealed class WindowsTrayIcon(
    string tooltip,
    string? iconPath,
    Func<string, string> localize,
    Action onOpen,
    Action onSettings,
    Action onExit)
    : ITrayIcon
{
    private const uint WmApp = 0x8000;
    private const uint WmTrayIcon = WmApp + 1;
    private const uint WmCommand = 0x0111;
    private const uint WmDestroy = 0x0002;
    private const uint WmNull = 0x0000;
    private const int WmLButtonUp = 0x0202;
    private const int WmLButtonDblClk = 0x0203;
    private const int WmRButtonUp = 0x0205;

    private const int NimAdd = 0;
    private const int NimDelete = 2;
    private const int NifMessage = 0x1;
    private const int NifIcon = 0x2;
    private const int NifTip = 0x4;
    private const uint MfString = 0x0;
    private const uint MfSeparator = 0x800;
    private const uint TpmRightButton = 0x0002;
    private const uint TpmReturnCmd = 0x0100;

    private const int MenuOpen = 1;
    private const int MenuSettings = 2;
    private const int MenuExit = 3;
    private const int IdiApplication = 32512;
    private readonly string _className = $"URLCheck.TrayIcon.{Guid.NewGuid():N}";
    private IntPtr _hIcon = IntPtr.Zero;

    private IntPtr _hwnd = IntPtr.Zero;
    private uint _taskbarCreatedMessage;

    private Thread? _thread;
    private NativeMethods.WndProcDelegate? _wndProc;

    public void Dispose()
    {
        if (_hwnd != IntPtr.Zero)
            NativeMethods.PostMessage(_hwnd, WmDestroy, IntPtr.Zero, IntPtr.Zero);
    }

    public bool Start()
    {
        _thread = new(ThreadProc)
        {
            IsBackground = true,
            Name = "URLCheck.Tray"
        };
        _thread.SetApartmentState(ApartmentState.STA);
        _thread.Start();
        return true;
    }

    private void ThreadProc()
    {
        var hInstance = NativeMethods.GetModuleHandle(null);
        _wndProc = WindowProc;
        _taskbarCreatedMessage = NativeMethods.RegisterWindowMessage("TaskbarCreated");

        var windowClass = new NativeMethods.WndClassEx
        {
            cbSize = (uint)Marshal.SizeOf<NativeMethods.WndClassEx>(),
            lpfnWndProc = Marshal.GetFunctionPointerForDelegate(_wndProc),
            hInstance = hInstance,
            lpszClassName = _className
        };
        NativeMethods.RegisterClassEx(ref windowClass);

        _hwnd = NativeMethods.CreateWindowEx(
            0, _className, Constants.Name, 0, 0, 0, 0, 0,
            IntPtr.Zero, IntPtr.Zero, hInstance, IntPtr.Zero);

        AddIcon();

        while (NativeMethods.GetMessage(out var message, IntPtr.Zero, 0, 0) > 0)
        {
            NativeMethods.TranslateMessage(ref message);
            NativeMethods.DispatchMessage(ref message);
        }

        RemoveIcon();

        if (_hIcon != IntPtr.Zero)
        {
            NativeMethods.DestroyIcon(_hIcon);
            _hIcon = IntPtr.Zero;
        }
    }

    /// <summary>The app icon, falling back to the generic application icon when it cannot be loaded.</summary>
    private IntPtr ResolveIcon()
    {
        if (_hIcon == IntPtr.Zero && iconPath is { Length: > 0 })
            _hIcon = NativeMethods.LoadImage(IntPtr.Zero, iconPath, NativeMethods.ImageIcon,
                NativeMethods.GetSystemMetrics(NativeMethods.SmCxSmIcon),
                NativeMethods.GetSystemMetrics(NativeMethods.SmCySmIcon),
                NativeMethods.LrLoadFromFile);

        return _hIcon != IntPtr.Zero ? _hIcon : NativeMethods.LoadIcon(IntPtr.Zero, IdiApplication);
    }

    private void AddIcon()
    {
        if (_hwnd == IntPtr.Zero)
            return;

        var data = new NativeMethods.NotifyIconData
        {
            cbSize = Marshal.SizeOf<NativeMethods.NotifyIconData>(),
            hWnd = _hwnd,
            uID = 1,
            uFlags = NifMessage | NifIcon | NifTip,
            uCallbackMessage = (int)WmTrayIcon,
            hIcon = ResolveIcon(),
            szTip = tooltip,
            szInfo = string.Empty,
            szInfoTitle = string.Empty
        };

        NativeMethods.Shell_NotifyIcon(NimAdd, ref data);
    }

    private void RemoveIcon()
    {
        if (_hwnd == IntPtr.Zero)
            return;

        var data = new NativeMethods.NotifyIconData
        {
            cbSize = Marshal.SizeOf<NativeMethods.NotifyIconData>(),
            hWnd = _hwnd,
            uID = 1
        };

        NativeMethods.Shell_NotifyIcon(NimDelete, ref data);
    }

    private IntPtr WindowProc(IntPtr hWnd, uint msg, IntPtr wParam, IntPtr lParam)
    {
        if (_taskbarCreatedMessage != 0 && msg == _taskbarCreatedMessage)
        {
            // Explorer restarted; re-register the icon.
            AddIcon();
            return IntPtr.Zero;
        }

        switch (msg)
        {
            case WmTrayIcon:
                switch ((int)lParam & 0xFFFF)
                {
                    case WmLButtonUp:
                    case WmLButtonDblClk:
                        SafeInvoke(onOpen);
                        break;
                    case WmRButtonUp:
                        ShowContextMenu();
                        break;
                }

                return IntPtr.Zero;

            case WmCommand:
                switch ((int)wParam & 0xFFFF)
                {
                    case MenuOpen:
                        SafeInvoke(onOpen);
                        break;
                    case MenuSettings:
                        SafeInvoke(onSettings);
                        break;
                    case MenuExit:
                        SafeInvoke(onExit);
                        break;
                }

                return IntPtr.Zero;

            case WmDestroy:
                RemoveIcon();
                NativeMethods.PostQuitMessage(0);
                return IntPtr.Zero;
        }

        return NativeMethods.DefWindowProc(hWnd, msg, wParam, lParam);
    }

    private void ShowContextMenu()
    {
        var menu = NativeMethods.CreatePopupMenu();
        NativeMethods.AppendMenu(menu, MfString, MenuOpen, localize("tray.open"));
        NativeMethods.AppendMenu(menu, MfString, MenuSettings, localize("tray.settings"));
        NativeMethods.AppendMenu(menu, MfSeparator, IntPtr.Zero, null);
        NativeMethods.AppendMenu(menu, MfString, MenuExit, localize("tray.exit"));

        NativeMethods.GetCursorPos(out var cursor);
        NativeMethods.SetForegroundWindow(_hwnd);

        var command = NativeMethods.TrackPopupMenu(
            menu, TpmRightButton | TpmReturnCmd, cursor.X, cursor.Y, 0, _hwnd, IntPtr.Zero);

        NativeMethods.PostMessage(_hwnd, WmNull, IntPtr.Zero, IntPtr.Zero);
        NativeMethods.DestroyMenu(menu);

        if (command > 0)
            WindowProc(_hwnd, WmCommand, command, IntPtr.Zero);
    }

    private static void SafeInvoke(Action action) =>
        Try.Run(action).OnFailure(ex => Log.Warning(ex, "Tray callback failed"));
}