using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using Serilog;

namespace URLCheck.Platform;

/// <summary>
///     Reaches the real GTK window behind a Photino one.
/// </summary>
/// <remarks>
///     Photino exposes no GTK widget handle and no "hide" call, and on Wayland minimising
///     (<c>gtk_window_iconify</c>) leaves the window in the taskbar. Photino does not expose the handle,
///     so the toplevel is looked up by its (unique, app-controlled) title. Every call is best-effort.
/// </remarks>
[SupportedOSPlatform("linux")]
internal static partial class LinuxGtk
{
    private const string GtkLibrary = "libgtk-3.so.0";
    private const string GlibLibrary = "libglib-2.0.so.0";

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

    [LibraryImport(GlibLibrary)]
    private static partial void g_list_free(IntPtr list);

    [LibraryImport(GlibLibrary, StringMarshalling = StringMarshalling.Utf8)]
    private static partial void g_set_prgname(string name);
}
