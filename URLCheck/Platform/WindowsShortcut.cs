using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using System.Text;

namespace URLCheck.Platform;

/// <summary>
///     Creates a Windows shell link (<c>.lnk</c>) through the shell's own <c>IShellLink</c>
///     implementation, so the file is byte-for-byte what Explorer would write. Hand-writing the
///     format is not an option: the target is resolved from a <c>LinkTargetIDList</c> whose root item
///     is a large opaque structure, and a link without it does not resolve.
/// </summary>
[SupportedOSPlatform("windows")]
internal static class WindowsShortcut
{
    /// <summary>Creates (or overwrites) a shortcut pointing at <paramref name="targetPath" />.</summary>
    public static void Create(string linkPath, string targetPath, string arguments, string workingDirectory,
        string description)
    {
        // The COM coclass is activated by the runtime, so the cast has to go through `object`.
        var link = (IShellLinkW)(object)new ShellLink();
        try
        {
            link.SetPath(targetPath);
            link.SetArguments(arguments);
            link.SetWorkingDirectory(workingDirectory);
            link.SetDescription(description);
            link.SetIconLocation(targetPath, 0);
            ((IPersistFile)link).Save(linkPath, true);
        }
        finally
        {
            Marshal.FinalReleaseComObject(link);
        }
    }

    [ComImport]
    [Guid("00021401-0000-0000-C000-000000000046")]
    private sealed class ShellLink
    {
    }

    /// <summary>The vtable order matters, so every member up to the ones used is declared.</summary>
    [ComImport]
    [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    [Guid("000214F9-0000-0000-C000-000000000046")]
    private interface IShellLinkW
    {
        void GetPath([Out] [MarshalAs(UnmanagedType.LPWStr)] StringBuilder file, int length, IntPtr findData,
            uint flags);

        void GetIDList(out IntPtr itemIdList);

        void SetIDList(IntPtr itemIdList);

        void GetDescription([Out] [MarshalAs(UnmanagedType.LPWStr)] StringBuilder name, int length);

        void SetDescription([MarshalAs(UnmanagedType.LPWStr)] string name);

        void GetWorkingDirectory([Out] [MarshalAs(UnmanagedType.LPWStr)] StringBuilder directory, int length);

        void SetWorkingDirectory([MarshalAs(UnmanagedType.LPWStr)] string directory);

        void GetArguments([Out] [MarshalAs(UnmanagedType.LPWStr)] StringBuilder arguments, int length);

        void SetArguments([MarshalAs(UnmanagedType.LPWStr)] string arguments);

        void GetHotkey(out short hotkey);

        void SetHotkey(short hotkey);

        void GetShowCommand(out int showCommand);

        void SetShowCommand(int showCommand);

        void GetIconLocation([Out] [MarshalAs(UnmanagedType.LPWStr)] StringBuilder path, int length, out int index);

        void SetIconLocation([MarshalAs(UnmanagedType.LPWStr)] string path, int index);

        void SetRelativePath([MarshalAs(UnmanagedType.LPWStr)] string path, uint reserved);

        void Resolve(IntPtr window, uint flags);

        void SetPath([MarshalAs(UnmanagedType.LPWStr)] string file);
    }

    [ComImport]
    [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    [Guid("0000010B-0000-0000-C000-000000000046")]
    private interface IPersistFile
    {
        void GetClassID(out Guid classId);

        [PreserveSig] int IsDirty();

        void Load([MarshalAs(UnmanagedType.LPWStr)] string fileName, uint mode);

        void Save([MarshalAs(UnmanagedType.LPWStr)] string? fileName,
            [MarshalAs(UnmanagedType.Bool)] bool remember);

        void SaveCompleted([MarshalAs(UnmanagedType.LPWStr)] string fileName);

        void GetCurFile([Out] [MarshalAs(UnmanagedType.LPWStr)] StringBuilder fileName);
    }
}
