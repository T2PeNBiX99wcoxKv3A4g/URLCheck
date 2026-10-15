using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using Serilog;
using Serilog.Events;

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
    private const string WebKitLibrary = "libwebkit2gtk-4.1.so.0";

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
    ///     Reroutes a GLib log domain to Serilog at a fixed level. Used for libraries that announce their
    ///     own deprecation on every start and would otherwise keep printing it to stderr.
    /// </summary>
    public static void RouteLogDomain(string domain, LogEventLevel level) =>
        g_log_set_handler(domain, LogLevelWarning | LogLevelCritical | LogLevelError,
            Marshal.GetFunctionPointerForDelegate(Root((_, _, message, _) => Write(level, IntPtr.Zero, message))),
            IntPtr.Zero);

    /// <summary>
    ///     Reroutes every GLib domain that has no handler of its own — which is how GTK, WebKit and the
    ///     other native libraries report problems — so their warnings reach the log file, not only stderr.
    /// </summary>
    public static void RouteAllLogDomains() =>
        g_log_set_default_handler(
            Marshal.GetFunctionPointerForDelegate(
                Root((domain, level, message, _) => Write(ToSerilogLevel(level), domain, message))),
            IntPtr.Zero);

    /// <summary>Keeps a GLib callback alive: the library holds it for the life of the process.</summary>
    private static LogHandler Root(LogHandler handler)
    {
        LogHandlers.Add(handler);
        return handler;
    }

    private static void Write(LogEventLevel level, IntPtr domain, IntPtr message)
    {
        var name = domain == IntPtr.Zero ? "glib" : Marshal.PtrToStringUTF8(domain) ?? "glib";
        var text = (Marshal.PtrToStringUTF8(message) ?? string.Empty).TrimEnd();

        if (text.Length > 0)
            Log.Write(level, "[{Domain}] {Line}", name, text);
    }

    private static LogEventLevel ToSerilogLevel(int level) => level switch
    {
        LogLevelError or LogLevelCritical => LogEventLevel.Error,
        LogLevelWarning => LogEventLevel.Warning,
        _ => LogEventLevel.Debug
    };

    // G_LOG_LEVEL_ERROR = 1 << 2, CRITICAL = 1 << 3, WARNING = 1 << 4.
    private const int LogLevelError = 1 << 2;
    private const int LogLevelCritical = 1 << 3;
    private const int LogLevelWarning = 1 << 4;

    private static readonly List<LogHandler> LogHandlers = [];

    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
    private delegate void LogHandler(IntPtr domain, int level, IntPtr message, IntPtr userData);

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

    /// <summary>
    ///     Clears the web view's own background. Without this the GTK window can be transparent and the
    ///     page can have transparent corners, and WebKit still paints opaque white behind them.
    /// </summary>
    public static bool MakeWebViewTransparent(string title)
    {
        try
        {
            var webView = FindWebView(FindByTitle(title));
            if (webView == IntPtr.Zero)
            {
                Log.Warning("Could not find the web view inside {Title}", title);
                return false;
            }

            var clear = new GdkRgba { Alpha = 0 };
            webkit_web_view_set_background_color(webView, ref clear);

            Log.Information("Web view background cleared");
            return true;
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to clear the web view background");
            return false;
        }
    }

    /// <summary>Depth-first search for the WebKitWebView inside a widget tree.</summary>
    private static IntPtr FindWebView(IntPtr widget)
    {
        if (widget == IntPtr.Zero)
            return IntPtr.Zero;

        if (g_type_check_instance_is_a(widget, webkit_web_view_get_type()) != 0)
            return widget;

        if (g_type_check_instance_is_a(widget, gtk_container_get_type()) == 0)
            return IntPtr.Zero;

        var children = gtk_container_get_children(widget);
        if (children == IntPtr.Zero)
            return IntPtr.Zero;

        try
        {
            for (var node = children; node != IntPtr.Zero; node = Marshal.ReadIntPtr(node, IntPtr.Size))
            {
                var found = FindWebView(Marshal.ReadIntPtr(node));
                if (found != IntPtr.Zero)
                    return found;
            }
        }
        finally
        {
            g_list_free(children);
        }

        return IntPtr.Zero;
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

    [StructLayout(LayoutKind.Sequential)]
    private struct GdkRgba
    {
        public double Red;
        public double Green;
        public double Blue;
        public double Alpha;
    }

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

    [LibraryImport(GlibLibrary, StringMarshalling = StringMarshalling.Utf8)]
    private static partial uint g_log_set_handler(string logDomain, int logLevels, IntPtr logFunc, IntPtr userData);

    [LibraryImport(GlibLibrary)]
    private static partial IntPtr g_log_set_default_handler(IntPtr logFunc, IntPtr userData);

    // g_signal_connect_data lives in GObject, not GLib.
    [LibraryImport(GObjectLibrary, StringMarshalling = StringMarshalling.Utf8)]
    private static partial ulong g_signal_connect_data(IntPtr instance, string detailedSignal, IntPtr handler,
        IntPtr data, IntPtr destroyData, int flags);

    [LibraryImport(CairoLibrary)]
    private static partial void cairo_set_operator(IntPtr cairo, int op);

    [LibraryImport(CairoLibrary)]
    private static partial void cairo_paint(IntPtr cairo);

    // ---- libgobject / libgtk (widget tree) ----

    [LibraryImport(GObjectLibrary)]
    private static partial int g_type_check_instance_is_a(IntPtr instance, IntPtr type);

    [LibraryImport(GtkLibrary)]
    private static partial IntPtr gtk_container_get_type();

    [LibraryImport(GtkLibrary)]
    private static partial IntPtr gtk_container_get_children(IntPtr container);

    // ---- libwebkit2gtk ----

    [LibraryImport(WebKitLibrary)]
    private static partial IntPtr webkit_web_view_get_type();

    [LibraryImport(WebKitLibrary)]
    private static partial void webkit_web_view_set_background_color(IntPtr webView, ref GdkRgba color);
}
