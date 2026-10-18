namespace URLCheck.Platform;

/// <summary>
///     Resolves the platform-specific implementations for the OS the app is running on. The concrete
///     services are singletons; this only picks the right one, so callers never pass them around.
/// </summary>
internal static class PlatformServices
{
    public static IBrowserLocator BrowserLocator =>
        OperatingSystem.IsWindows() ? WindowsBrowserLocator.Instance :
        OperatingSystem.IsLinux() ? LinuxBrowserLocator.Instance :
        throw new PlatformNotSupportedException("URLCheck supports Windows and Linux.");

    public static IWindowPlatform Window =>
        OperatingSystem.IsWindows() ? WindowsWindowPlatform.Instance :
        OperatingSystem.IsLinux() ? LinuxWindowPlatform.Instance :
        throw new PlatformNotSupportedException("URLCheck supports Windows and Linux.");

    public static IProtocolRegistrar ProtocolRegistrar =>
        OperatingSystem.IsWindows() ? WindowsProtocolRegistrar.Instance :
        OperatingSystem.IsLinux() ? LinuxProtocolRegistrar.Instance :
        throw new PlatformNotSupportedException("URLCheck supports Windows and Linux.");

    public static IClipboardWatcher Clipboard =>
        OperatingSystem.IsWindows() ? WindowsClipboardWatcher.Instance :
        OperatingSystem.IsLinux() ? LinuxClipboardWatcher.Instance :
        throw new PlatformNotSupportedException("URLCheck supports Windows and Linux.");
}
