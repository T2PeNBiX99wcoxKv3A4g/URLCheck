#if WINDOWS
using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using Windows.ApplicationModel.DataTransfer;
using WinRT;

namespace URLCheck.Platform;

/// <summary>
///     Opens the Windows share sheet for a link, anchored to one of the app's windows. The WinRT
///     projection is reached through the interop interface, because an unpackaged desktop app has no
///     "current view" for <see cref="DataTransferManager" /> to attach to.
/// </summary>
[SupportedOSPlatform("windows10.0.10240.0")]
internal static class WindowsShare
{
    /// <summary><c>IDataTransferManager</c>; the manager the interop call must return.</summary>
    private static readonly Guid ManagerId = new("A5CAEE9B-8708-49D1-8D36-67D25A8DA00C");

    private static readonly Lock Gate = new();

    /// <summary>
    ///     One manager per window. The same manager is returned every time, so it gets one handler and
    ///     the URL is swapped before each share instead of accumulating handlers.
    /// </summary>
    private static readonly Dictionary<IntPtr, PendingShare> Shares = [];

    /// <summary>Shows the system share sheet for <paramref name="url" />.</summary>
    public static void Show(IntPtr window, string url, string? title = null)
    {
        if (window == IntPtr.Zero || !Uri.TryCreate(url, UriKind.Absolute, out var uri))
            return;

        var interop = DataTransferManager.As<IDataTransferManagerInterop>();
        PendingShare share;

        lock (Gate)
        {
            if (!Shares.TryGetValue(window, out share!))
            {
                var id = ManagerId;
                share = new PendingShare(DataTransferManager.FromAbi(interop.GetForWindow(window, ref id)));
                share.Manager.DataRequested += (_, args) => share.Fill(args);
                Shares[window] = share;
            }

            share.Url = uri;
            share.Title = title;
        }

        interop.ShowShareUIForWindow(window);
    }

    private sealed class PendingShare(DataTransferManager manager)
    {
        /// <summary>Kept alive so the event above stays attached to a live manager.</summary>
        public DataTransferManager Manager { get; } = manager;

        public Uri? Url { get; set; }

        public string? Title { get; set; }

        public void Fill(DataRequestedEventArgs args)
        {
            if (Url is not { } url)
                return;

            var data = args.Request.Data;
            data.Properties.Title = string.IsNullOrWhiteSpace(Title) ? url.Host : Title;
            data.Properties.Description = url.AbsoluteUri;
            data.SetWebLink(url);
            data.SetText(url.AbsoluteUri);
        }
    }

    /// <summary>
    ///     Desktop-only face of <see cref="DataTransferManager" />. The projected class has no
    ///     <c>GetForWindow</c>; the interop interface supplies the window-associated manager.
    /// </summary>
    [ComImport]
    [Guid("3A3DCD6C-3EAB-43DC-BCDE-45671CE800C8")]
    [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    private interface IDataTransferManagerInterop
    {
        IntPtr GetForWindow([In] IntPtr window, [In] ref Guid id);

        void ShowShareUIForWindow([In] IntPtr window);
    }
}
#endif
