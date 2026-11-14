import {Native} from "@photino-net-utils/bridge";

/**
 * The app-side system messages the shared bridge does not know about. App info, startup and update
 * calls come straight from `@photino-net-utils/bridge`.
 */
export {
    type AppInfo,
    type StartupStatus,
    type UpdateAck,
    type UpdateChangelog,
    type UpdateCheck,
    type UpdatePhase,
    type UpdateProgress,
    cancelUpdateDownload,
    checkForUpdates,
    getAppInfo,
    getUpdateStatus,
    installUpdate,
    onUpdateChangelog,
    onUpdateProgress,
    openLogsFolder,
    openReleasesPage,
    openUrl,
    setStartup,
    startUpdateDownload,
    startupStatus,
} from "@photino-net-utils/bridge";

/** Fallback only for the browser preview; the desktop host owns the real release URL. */
export const RELEASES_URL = "https://github.com/T2PeNBiX99wcoxKv3A4g/URLCheck/releases/latest";

/** Simulates a link click: asks the backend to open (or navigate) the inspection popup. */
export async function showPopup(url: string): Promise<void> {
    if (!Native.available) {
        window.open(url, "_blank", "noopener,noreferrer");
        return;
    }

    await Native.request("popup.show", {url});
}

/** Reads the clipboard's text once, through the backend, so no web permission is involved. */
export async function readClipboard(): Promise<string | null> {
    if (!Native.available) return null;

    const data = await Native.request<{ text: string | null }>("clipboard.read");
    return data.text ?? null;
}

/** Closes the window that sent the request. */
export function closePopup(): void {
    if (!Native.available) {
        window.close();
        return;
    }

    Native.send({type: "popup.close"});
}

/** Hides the floating button's window once the URL has been handed to the popup. */
export function hideSelectionButton(): void {
    Native.send({type: "selection.hide"});
}

/** Hands a link to the system share sheet. Windows-only; the interface hides the button elsewhere. */
export async function shareUrl(url: string, title?: string): Promise<void> {
    await Native.request("share.url", {url, title});
}

/** Registers URLCheck as a candidate browser for http/https. */
export async function registerProtocols(): Promise<{ executablePath: string }> {
    return await Native.request<{ executablePath: string }>("app.registerProtocols");
}

/** Removes every registry entry URLCheck created (for a clean uninstall). */
export async function unregisterProtocols(): Promise<void> {
    await Native.request("app.unregisterProtocols");
}

export interface ProtocolStatus {
    isDefault: boolean;
    customSchemeRegistered: boolean;
    /** True when the registered handler points at this exact executable. */
    pathMatches: boolean;
    /** The executable the OS currently has registered, or null when nothing is registered. */
    registeredPath: string | null;
}

/** Reports whether URLCheck is the default browser and whether checkurl:// is registered. */
export async function protocolStatus(): Promise<ProtocolStatus> {
    if (!Native.available) {
        return {isDefault: false, customSchemeRegistered: false, pathMatches: false, registeredPath: null};
    }

    return await Native.request<ProtocolStatus>("app.protocolStatus");
}

/** Opens the Windows "Default apps" settings page. */
export async function openDefaultAppsSettings(): Promise<void> {
    await Native.request("app.openDefaultApps");
}

/** Asks the backend to resize the popup window so it fits its content. */
export function resizePopup(height: number): void {
    Native.send({type: "popup.resize", payload: {height: Math.round(height)}});
}

/**
 * True when the OS routes http links to *this* copy of URLCheck. A registration that points at a
 * different executable (the app moved, or a debug build took over) counts as not being the default,
 * so the UI keeps nagging until it is re-registered.
 */
export async function isDefaultBrowser(): Promise<boolean> {
    if (!Native.available) return false;

    const status = await Native.request<ProtocolStatus>("app.protocolStatus");
    return status.isDefault && status.pathMatches;
}
