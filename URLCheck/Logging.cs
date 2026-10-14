using Serilog;
using Serilog.Events;

namespace URLCheck;

/// <summary>Configures the Serilog pipeline used across the app.</summary>
internal static class Logging
{
    public static void Initialize()
    {
        var logDirectory = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "URLCheck", "logs");
        Directory.CreateDirectory(logDirectory);

        Log.Logger = new LoggerConfiguration()
#if DEBUG
            .MinimumLevel.Is(LogEventLevel.Debug)
#else
            .MinimumLevel.Is(LogEventLevel.Information)
#endif
            .Enrich.FromLogContext()
            .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}")
            .WriteTo.File(
                Path.Combine(logDirectory, "urlcheck-.log"),
                rollingInterval: RollingInterval.Day,
                retainedFileCountLimit: 7,
                shared: true,
                outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff} [{Level:u3}] {Message:lj}{NewLine}{Exception}")
            .CreateLogger();
    }

    public static void Shutdown() => Log.CloseAndFlush();
}