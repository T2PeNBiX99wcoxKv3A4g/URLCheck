using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using Serilog;

namespace URLCheck.Platform;

/// <summary>
///     Direct GTK access for the few things Photino cannot do on Linux: finding a window to hide or
///     re-present it, making it RGBA-transparent, and setting the program name that becomes the Wayland
///     app id.
/// </summary>
/// <remarks>
///     Photino exposes no GTK widget handle and no hide call, and on Wayland minimising
///     (<c>gtk_window_iconify</c>) leaves the window in the taskbar. The toplevel is therefore looked up
///     by its unique, app-controlled title. Every call is best-effort and never throws.
/// </remarks>
[SupportedOSPlatform("linux")]
internal static partial class LinuxGtk
{
    private const string GtkLibrary = "libgtk-3.so.0";
    private const string GlibLibrary = "libglib-2.0.so.0";
    private const string GObjectLibrary = "libgobject-2.0.so.0";
    private const string CairoLibrary = "libcairo.so.2";

    /// <summary>Hides a toplevel by title. Returns false when it could not be found.</summary>
    public static bool Hide(string title) => WithWindow(title, gtk_widget_hide);

    /// <summary>Un-hides and raises a toplevel by title. Returns false when it could not be found.</summary>
    public static bool Present(string title) => WithWindow(title, window =>
    {
        gtk_widget_show(window);
        gtk_window_present(window);
    });

    /// <summary>Sets the program name, which GTK reports as the Wayland app id.</summary>
    public static void SetProgramName(string name)
    {
        try
        {
            g_set_prgname(name);
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "Failed to set the program name");
        }
    }

    /// <summary>Connects a GObject signal. The caller has to keep the callback alive.</summary>
    public static void Connect(IntPtr instance, string signal, Delegate callback, IntPtr data) =>
        g_signal_connect_data(instance, signal, Marshal.GetFunctionPointerForDelegate(callback), data,
            IntPtr.Zero, 0);

    /// <summary>
    ///     Whether the screen supports RGBA visuals at all. This can be answered without a window, which
    ///     matters because the decision has to be taken before the popup is created.
    /// </summary>
    public static bool CanBeTransparent
    {
        get
        {
            try
            {
                return gdk_screen_get_rgba_visual(gdk_screen_get_default()) != IntPtr.Zero;
            }
            catch (Exception ex)
            {
                Log.Debug(ex, "Could not query the screen's RGBA visual");
                return false;
            }
        }
    }

    /// <summary>
    ///     Makes a toplevel RGBA-transparent, so its CSS rounded corners are not filled in. GTK needs an
    ///     RGBA visual plus a draw handler that clears the background, and both have to be in place
    ///     before the window is realised.
    /// </summary>
    public static bool MakeTransparent(string title)
    {
        try
        {
            var window = FindByTitle(title);
            if (window == IntPtr.Zero)
            {
                Log.Warning("Could not find the {Title} window to make transparent", title);
                return false;
            }

            var visual = gdk_screen_get_rgba_visual(gtk_widget_get_screen(window));
            if (visual == IntPtr.Zero)
            {
                Log.Warning("The screen has no RGBA visual; the popup stays opaque");
                return false;
            }

            var realized = gtk_widget_get_realized(window);
            gtk_widget_set_visual(window, visual);
            gtk_widget_set_app_paintable(window, true);
            Connect(window, "draw", DrawHandler, IntPtr.Zero);

            Log.Information("Popup background is transparent (realised={Realized})", realized);
            return true;
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to make {Title} transparent", title);
            return false;
        }
    }

    /// <summary>Clears the window to fully transparent; the web view paints everything on top of it.</summary>
    private static int OnDraw(IntPtr widget, IntPtr cairo, IntPtr data)
    {
        cairo_set_operator(cairo, CairoOperatorClear);
        cairo_paint(cairo);

        // Let the default handler run too, so children still get drawn.
        return 0;
    }

    private const int CairoOperatorClear = 0;
    private static readonly DrawCallback DrawHandler = OnDraw;

    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
    private delegate int DrawCallback(IntPtr widget, IntPtr cairo, IntPtr data);

    private static bool WithWindow(string title, Action<IntPtr> action)
    {
        try
        {
            var window = FindByTitle(title);
            if (window == IntPtr.Zero)
                return false;

            action(window);
            return true;
        }
        catch (Exception ex)
        {
            Log.Debug(ex, "GTK window lookup for {Title} failed", title);
            return false;
        }
    }

    private static IntPtr FindByTitle(string title)
    {
        var list = gtk_window_list_toplevels();
        if (list == IntPtr.Zero)
            return IntPtr.Zero;

        try
        {
            // GList is { gpointer data; GList* next; GList* prev; }.
            for (var node = list; node != IntPtr.Zero; node = Marshal.ReadIntPtr(node, IntPtr.Size))
            {
                var window = Marshal.ReadIntPtr(node);
                var current = gtk_window_get_title(window);

                if (current != IntPtr.Zero && Marshal.PtrToStringUTF8(current) == title)
                    return window;
            }
        }
        finally
        {
            g_list_free(list);
        }

        return IntPtr.Zero;
    }

    [LibraryImport(GtkLibrary)]
    private static partial IntPtr gtk_window_list_toplevels();

    [LibraryImport(GtkLibrary)]
    private static partial IntPtr gtk_window_get_title(IntPtr window);

    [LibraryImport(GtkLibrary)]
    private static partial void gtk_widget_hide(IntPtr widget);

    [LibraryImport(GtkLibrary)]
    private static partial void gtk_widget_show(IntPtr widget);

    [LibraryImport(GtkLibrary)]
    private static partial void gtk_window_present(IntPtr window);

    [LibraryImport(GtkLibrary)]
    private static partial IntPtr gtk_widget_get_screen(IntPtr widget);

    [LibraryImport(GtkLibrary)]
    private static partial IntPtr gdk_screen_get_default();

    [LibraryImport(GtkLibrary)]
    private static partial IntPtr gdk_screen_get_rgba_visual(IntPtr screen);

    [LibraryImport(GtkLibrary)]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static partial bool gtk_widget_get_realized(IntPtr widget);

    [LibraryImport(GtkLibrary)]
    private static partial void gtk_widget_set_visual(IntPtr widget, IntPtr visual);

    [LibraryImport(GtkLibrary)]
    private static partial void gtk_widget_set_app_paintable(IntPtr widget, [MarshalAs(UnmanagedType.Bool)] bool paintable);

    [LibraryImport(GlibLibrary)]
    private static partial void g_list_free(IntPtr list);

    [LibraryImport(GlibLibrary, StringMarshalling = StringMarshalling.Utf8)]
    private static partial void g_set_prgname(string name);

    // g_signal_connect_data lives in GObject, not GLib.
    [LibraryImport(GObjectLibrary, StringMarshalling = StringMarshalling.Utf8)]
    private static partial ulong g_signal_connect_data(IntPtr instance, string detailedSignal, IntPtr handler,
        IntPtr data, IntPtr destroyData, int flags);

    [LibraryImport(CairoLibrary)]
    private static partial void cairo_set_operator(IntPtr cairo, int op);

    [LibraryImport(CairoLibrary)]
    private static partial void cairo_paint(IntPtr cairo);
}
