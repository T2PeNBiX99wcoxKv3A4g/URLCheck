namespace URLCheck.Platform;

/// <summary>Parsing helpers for the command strings Windows keeps in the registry.</summary>
internal static class WindowsCommandLine
{
    /// <summary>Pulls the executable path out of a <c>shell\open\command</c> value.</summary>
    public static string? ExtractExecutable(string? command)
    {
        if (string.IsNullOrWhiteSpace(command))
            return null;

        command = command.Trim();

        // Quoted: "C:\Program Files\...\chrome.exe" --flag
        if (command.StartsWith('"'))
        {
            var end = command.IndexOf('"', 1);
            if (end > 1)
                return command[1..end];
        }

        // Unquoted: C:\...\browser.exe --flag
        var exeIndex = command.IndexOf(".exe", StringComparison.OrdinalIgnoreCase);
        if (exeIndex >= 0)
            return command[..(exeIndex + 4)];

        var space = command.IndexOf(' ');
        return space > 0 ? command[..space] : command;
    }
}