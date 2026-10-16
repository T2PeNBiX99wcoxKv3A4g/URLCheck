using System.Runtime.Versioning;
using ShellLink;
using ShellLink.Structures;

namespace URLCheck.Platform;

/// <summary>
///     Creates a Windows shell link (<c>.lnk</c>) for the per-user startup folder.
/// </summary>
/// <remarks>
///     The format is not assembled here: a link only resolves when its <c>LinkTargetIDList</c> holds
///     shell-namespace items with their metadata, which is far more than a path string, so the byte
///     layout is left to the <c>securifybv.ShellLink</c> library.
/// </remarks>
[SupportedOSPlatform("windows")]
internal static class WindowsShortcut
{
    /// <summary>Creates (or overwrites) a shortcut pointing at <paramref name="targetPath" />.</summary>
    public static void Create(string linkPath, string targetPath, string arguments, string workingDirectory,
        string description)
    {
        var shortcut = new Shortcut
        {
            LinkTargetIDList = new LinkTargetIDList
            {
                Path = targetPath
            },
            StringData = new StringData
            {
                NameString = description,
                WorkingDir = workingDirectory,
                CommandLineArguments = arguments,
                IconLocation = targetPath
            }
        };

        shortcut.WriteToFile(linkPath);
    }
}
