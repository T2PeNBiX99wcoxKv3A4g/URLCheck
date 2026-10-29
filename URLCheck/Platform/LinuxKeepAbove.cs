using System.Diagnostics;
using System.Runtime.Versioning;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;
using Serilog;

namespace URLCheck.Platform;

/// <summary>
///     Keeps the app's overlay windows above the others on KDE.
/// </summary>
/// <remarks>
///     Wayland has no keep-above state a window can set for itself, and a compositor is free to ignore
///     the request — KWin does. KWin can be told through its scripting interface instead: a small
///     script marks every window of this app that carries one of the overlay captions as "keep above".
///     Desktops without that interface simply do not answer, and the windows behave as they did.
/// </remarks>
[SupportedOSPlatform("linux")]
internal static class LinuxKeepAbove
{
    private const string ScriptName = "urlcheck-keepabove";
    private const string KWinService = "org.kde.KWin";
    private const string KWinScriptingPath = "/Scripting";

    private static string ScriptPath => Path.Combine(Constants.DataDirectory, $"{ScriptName}.js");

    /// <summary>Marks windows with one of these captions as always on top, now and as they appear.</summary>
    public static void Start(params string[] captions)
    {
        var written = Try.Run(() =>
        {
            Directory.CreateDirectory(Constants.DataDirectory);
            File.WriteAllText(ScriptPath, BuildScript(captions));
            return true;
        }).GetOrElse(ex =>
        {
            Log.Warning(ex, "Could not write the keep-above script");
            return false;
        });

        if (!written)
            return;

        // An earlier run may have left it loaded, and loading it again would connect the handler twice.
        Call("unloadScript", ScriptName);

        if (Call("loadScript", ScriptPath, ScriptName) is null)
            return;

        if (Call("start") is null)
        {
            Log.Warning("KWin loaded the keep-above script but could not start it");
            return;
        }

        Log.Information("Asking KWin to keep the popup and the button above other windows");
    }

    /// <summary>Drops the script again, so nothing of ours keeps running inside KWin.</summary>
    public static void Stop() => Call("unloadScript", ScriptName);

    /// <summary>Runs one method of KWin's scripting interface; null when KWin does not answer.</summary>
    private static string? Call(params string[] arguments)
    {
        var startInfo = new ProcessStartInfo("gdbus")
        {
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true
        };

        foreach (var argument in new[]
                 {
                     "call", "--session", "--dest", KWinService, "--object-path", KWinScriptingPath, "--method",
                     $"org.kde.kwin.Scripting.{arguments[0]}"
                 })
            startInfo.ArgumentList.Add(argument);

        foreach (var argument in arguments.Skip(1))
            startInfo.ArgumentList.Add(argument);

        return Try.Run(() =>
        {
            using var process = Process.Start(startInfo);
            if (process is null)
                return null;

            var output = process.StandardOutput.ReadToEnd().Trim();
            return process.WaitForExit(2000) && process.ExitCode == 0 ? output : null;
        }).GetOrElse(ex =>
        {
            Log.Debug(ex, "KWin's scripting interface did not answer");
            return null;
        });
    }

    private static string BuildScript(IEnumerable<string> captions)
    {
        var list = string.Join(", ", captions.Select(caption => $"\"{caption}\""));

        return $$"""
                 // Loaded by URLCheck. Wayland has no keep-above state for a window, so the windows
                 // that are meant to float above the rest are marked here instead.
                 const captions = [{{list}}];
                 const appClass = "{{Constants.Name.ToLowerInvariant()}}";

                 function keepAbove(window) {
                     if (window && window.resourceClass === appClass && captions.indexOf(window.caption) !== -1)
                         window.keepAbove = true;
                 }

                 workspace.windowAdded.connect(keepAbove);
                 workspace.windowList().forEach(keepAbove);
                 """;
    }
}
