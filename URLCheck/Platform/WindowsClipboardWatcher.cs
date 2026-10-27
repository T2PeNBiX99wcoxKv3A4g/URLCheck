using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using URLCheck.Extensions;
using URLCheck.Interop;
using URLCheck.Utils;

namespace URLCheck.Platform;

/// <summary>
///     Watches the Windows clipboard from a hidden window on a dedicated STA thread. The OS tells the
///     window when the clipboard changes, so nothing ever polls it; a read that cannot get the lock is
///     retried a couple of times and then skipped, so the clipboard is never blocked for anyone else.
/// </summary>
[SupportedOSPlatform("windows")]
internal sealed class WindowsClipboardWatcher : Singleton<WindowsClipboardWatcher>, IClipboardWatcher
{
    private const uint WmDestroy = 0x0002;
    private const int ReadAttempts = 6;
    private const int ReadRetryMs = 20;

    private readonly string _className = $"URLCheck.Clipboard.{Guid.NewGuid():N}";
    private readonly ManualResetEventSlim _ready = new();
    private IntPtr _hwnd = IntPtr.Zero;
    private string? _lastText;
    private bool _listening;

    private Thread? _thread;
    private NativeMethods.WndProcDelegate? _wndProc;

    public event Action<string>? TextCopied;

    /// <summary>
    ///     The listening thread outlives every stop: only the clipboard notification is toggled, which
    ///     keeps the window handle stable and means stopping never has to wait for a thread (which
    ///     would deadlock against a clipboard callback that is being marshalled to the UI thread).
    /// </summary>
    public void Start()
    {
        EnsureThread();

        if (_listening || !_ready.Wait(TimeSpan.FromSeconds(2)))
            return;

        _listening = NativeMethods.AddClipboardFormatListener(_hwnd);
        if (_listening)
            Log.Information("Watching the clipboard for copied URLs");
    }

    public void Stop()
    {
        if (!_listening)
            return;

        _listening = false;

        if (_hwnd != IntPtr.Zero)
            NativeMethods.RemoveClipboardFormatListener(_hwnd);
    }

    public void Dispose() => Stop();

    private void EnsureThread()
    {
        if (_thread is not null)
            return;

        _thread = new(ThreadProc)
        {
            IsBackground = true,
            Name = "URLCheck.Clipboard"
        };
        _thread.SetApartmentState(ApartmentState.STA);
        _thread.Start();
    }

    private void ThreadProc()
    {
        var hInstance = NativeMethods.GetModuleHandle(null);
        _wndProc = WindowProc;

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
        _ready.Set();

        while (NativeMethods.GetMessage(out var message, IntPtr.Zero, 0, 0) > 0)
        {
            NativeMethods.TranslateMessage(ref message);
            NativeMethods.DispatchMessage(ref message);
        }

        _hwnd = IntPtr.Zero;
    }

    private IntPtr WindowProc(IntPtr hWnd, uint msg, IntPtr wParam, IntPtr lParam)
    {
        switch (msg)
        {
            case NativeMethods.WmClipboardUpdate:
                Publish();
                return IntPtr.Zero;

            case WmDestroy:
                NativeMethods.PostQuitMessage(0);
                return IntPtr.Zero;
        }

        return NativeMethods.DefWindowProc(hWnd, msg, wParam, lParam);
    }

    private void Publish()
    {
        // The popup's own Copy button puts a URL on the clipboard too; that must not summon the button.
        if (IsOwnedByThisProcess())
            return;

        var text = ReadText();
        if (string.IsNullOrEmpty(text) || text == _lastText)
            return;

        _lastText = text;

        Try.Run(() => TextCopied?.Invoke(text))
            .OnFailure(ex => Log.Warning(ex, "Clipboard handler failed"));
    }

    private static bool IsOwnedByThisProcess()
    {
        var owner = NativeMethods.GetClipboardOwner();
        return owner != IntPtr.Zero &&
               NativeMethods.GetWindowThreadProcessId(owner, out var processId) != 0 &&
               processId == Environment.ProcessId;
    }

    /// <summary>Reads the clipboard's Unicode text, giving up rather than blocking when it stays locked.</summary>
    public string? ReadText()
    {
        for (var attempt = 0; attempt < ReadAttempts; attempt++)
        {
            if (TryReadText(out var text))
                return text;

            Thread.Sleep(ReadRetryMs);
        }

        Log.Debug("The clipboard stayed locked; skipping this change");
        return null;
    }

    private static bool TryReadText(out string? text)
    {
        text = null;

        if (!NativeMethods.OpenClipboard(IntPtr.Zero))
            return false;

        try
        {
            var handle = NativeMethods.GetClipboardData(NativeMethods.CfUnicodeText);
            if (handle == IntPtr.Zero)
                return true;

            var pointer = NativeMethods.GlobalLock(handle);
            if (pointer == IntPtr.Zero)
                return true;

            try
            {
                text = Marshal.PtrToStringUni(pointer);
            }
            finally
            {
                NativeMethods.GlobalUnlock(handle);
            }

            return true;
        }
        finally
        {
            NativeMethods.CloseClipboard();
        }
    }
}