using Serilog;

namespace URLCheck;

/// <summary>
///     The application icon. Both an <c>.ico</c> (Windows) and a <c>.png</c> (Linux, where GTK cannot
///     read ICO) are embedded, but Photino's <c>SetIconFile</c>, Win32's <c>LoadImage</c> and
///     libayatana-appindicator all want a real path, so the suitable one is written to disk on startup.
/// </summary>
internal static class AppIcon
{
    /// <summary>
    ///     Extracts the icon this platform can read (rewriting it only when it changed) and returns its
    ///     path, or <c>null</c> when the resource is unavailable.
    /// </summary>
    public static string? EnsureExtracted() => OperatingSystem.IsWindows()
        ? Extract("URLCheck.Resources.icon.ico", "icon.ico")
        : Extract("URLCheck.Resources.icon.png", "icon.png");

    private static string? Extract(string resourceName, string fileName)
    {
        try
        {
            using var stream = typeof(AppIcon).Assembly.GetManifestResourceStream(resourceName);
            if (stream is null)
            {
                Log.Warning("Embedded icon {Resource} was not found", resourceName);
                return null;
            }

            using var buffer = new MemoryStream();
            stream.CopyTo(buffer);
            var icon = buffer.ToArray();

            var directory = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), Constants.Name);
            Directory.CreateDirectory(directory);

            var path = Path.Combine(directory, fileName);
            if (!File.Exists(path) || !File.ReadAllBytes(path).AsSpan().SequenceEqual(icon))
                File.WriteAllBytes(path, icon);

            return path;
        }
        catch (Exception ex)
        {
            Log.Warning(ex, "Failed to extract the app icon");
            return null;
        }
    }
}