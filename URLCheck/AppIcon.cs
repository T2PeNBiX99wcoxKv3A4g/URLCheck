using Serilog;

namespace URLCheck;

/// <summary>
///     The application icon. It is embedded as <c>Resources/icon.ico</c> (and set as the executable's
///     icon), but Photino's <c>SetIconFile</c> and Win32's <c>LoadImage</c> both need a real path, so
///     the embedded copy is written to disk on startup.
/// </summary>
internal static class AppIcon
{
    private const string ResourceName = "URLCheck.Resources.icon.ico";

    /// <summary>
    ///     Extracts the embedded icon (rewriting it only when it changed) and returns its path, or
    ///     <c>null</c> when the resource is unavailable.
    /// </summary>
    public static string? EnsureExtracted()
    {
        try
        {
            using var stream = typeof(AppIcon).Assembly.GetManifestResourceStream(ResourceName);
            if (stream is null)
            {
                Log.Warning("Embedded icon {Resource} was not found", ResourceName);
                return null;
            }

            using var buffer = new MemoryStream();
            stream.CopyTo(buffer);
            var icon = buffer.ToArray();

            var directory = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), Constants.Name);
            Directory.CreateDirectory(directory);

            var path = Path.Combine(directory, "icon.ico");
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
