using Serilog;

namespace URLCheck.Interop;

/// <summary>
///     Stand-in tray icon for platforms that have none. Linux needs a StatusNotifierItem over D-Bus
///     (or libappindicator) to show a tray icon, which is not implemented yet, so there the app simply
///     keeps its main window visible instead of hiding to the tray.
/// </summary>
internal sealed class NullTrayIcon : ITrayIcon
{
    public bool Start()
    {
        Log.Information("No tray icon on this platform; the main window stays visible");
        return false;
    }

    public void Dispose()
    {
    }
}