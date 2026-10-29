using System.Diagnostics;
using System.Runtime.Versioning;
using PhotinoNetUtils.Extensions;
using PhotinoNetUtils.Utils;
using Serilog;

namespace URLCheck.Platform;

/// <summary>
///     The two things a window cannot do for itself on Wayland: stay above the others, and move next
///     to the pointer. KWin does both for us, through its scripting interface.
/// </summary>
/// <remarks>
///     A window has no keep-above state on Wayland, and a compositor may ignore the request for one —
///     KWin does. The pointer position is hidden from clients as well, so a window that is meant to
///     appear next to it has nowhere to go. Two small scripts inside KWin cover both: one marks the
///     overlay windows as "keep above" and stays loaded, the other moves one window to the pointer and
///     is unloaded again. Desktops without that interface simply do not answer, and nothing changes.
/// </remarks>
[SupportedOSPlatform("linux")]
internal static class LinuxOverlay
{
    private const string KeepAboveScript = "urlcheck-overlay";
    private const string MoveScript = "urlcheck-overlay-move";
    private const string KWinService = "org.kde.KWin";
    private const string KWinScriptingPath = "/Scripting";

    /// <summary>Marks windows with one of these captions as always on top, now and as they appear.</summary>
    public static void Start(params string[] captions)
    {
        if (!Load(KeepAboveScript, BuildKeepAboveScript(captions)))
            return;

        Log.Information("Asking KWin to keep the popup and the button above other windows");
    }

    /// <summary>Moves the window with this caption next to the pointer, once.</summary>
    public static void MoveToCursor(string caption, int offset)
    {
        if (!Load(MoveScript, BuildMoveScript(caption, offset)))
            return;

        // The window may still be on its way to the compositor when this runs, and the script moves it
        // as soon as it appears; it is dropped again once that had its chance.
        _ = Task.Delay(TimeSpan.FromSeconds(2)).ContinueWith(_ => Call("unloadScript", MoveScript));
    }

    /// <summary>Drops the keep-above script again, so nothing of ours keeps running inside KWin.</summary>
    public static void Stop() => Call("unloadScript", KeepAboveScript);

    /// <summary>Writes a script and runs it in KWin; false when KWin does not answer.</summary>
    private static bool Load(string name, string script)
    {
        var written = Try.Run(() =>
        {
            Directory.CreateDirectory(Constants.DataDirectory);
            File.WriteAllText(ScriptPath(name), script);
            return true;
        }).GetOrElse(ex =>
        {
            Log.Warning(ex, "Could not write the KWin script {Name}", name);
            return false;
        });

        if (!written)
            return false;

        // An earlier run may have left it loaded, and loading it again would connect its handler twice.
        Call("unloadScript", name);

        if (Call("loadScript", ScriptPath(name), name) is null)
            return false;

        if (Call("start") is not null)
            return true;

        Log.Warning("KWin loaded the script {Name} but could not start it", name);
        return false;
    }

    private static string ScriptPath(string name) => Path.Combine(Constants.DataDirectory, $"{name}.js");

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

    private static string BuildKeepAboveScript(IEnumerable<string> captions)
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

    private static string BuildMoveScript(string caption, int offset) =>
        $$"""
          // Loaded by URLCheck. Wayland hides the pointer from clients, so only the compositor can put
          // a window next to it. The window may only reach the compositor after this script starts, so
          // it is moved when it appears as well as when it is already there.
          const appClass = "{{Constants.Name.ToLowerInvariant()}}";
          const caption = "{{caption}}";
          const offset = {{offset}};

          function moveToPointer(window) {
              if (!window || window.resourceClass !== appClass || window.caption !== caption)
                  return;

              const pointer = workspace.cursorPos;
              const frame = Object.assign({}, window.frameGeometry);

              frame.x = pointer.x + offset;
              frame.y = pointer.y + offset;

              if (window.output) {
                  const area = window.output.geometry;
                  frame.x = Math.min(Math.max(frame.x, area.x), area.x + area.width - frame.width);
                  frame.y = Math.min(Math.max(frame.y, area.y), area.y + area.height - frame.height);
              }

              window.frameGeometry = frame;
          }

          workspace.windowAdded.connect(moveToPointer);
          workspace.windowList().forEach(moveToPointer);
          """;
}
