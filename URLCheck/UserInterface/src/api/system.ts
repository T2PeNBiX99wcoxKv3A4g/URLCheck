import {Native} from "@photino-net-utils/bridge";

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

export interface StartupStatus {
    /** False on platforms with no per-user Startup folder (Linux). */
    supported: boolean;
    enabled: boolean;
}

/** Reports whether URLCheck starts with the user's session. */
export async function startupStatus(): Promise<StartupStatus> {
    if (!Native.available) return {supported: false, enabled: false};

    return await Native.request<StartupStatus>("app.startup");
}

/** Adds or removes the per-user startup shortcut. */
export async function setStartup(enabled: boolean): Promise<StartupStatus> {
    return await Native.request<StartupStatus>("app.setStartup", {enabled});
}

/** Opens the Windows "Default apps" settings page. */
export async function openDefaultAppsSettings(): Promise<void> {
    await Native.request("app.openDefaultApps");
}

/** Asks the backend to resize the popup window so it fits its content. */
export function resizePopup(height: number): void {
    Native.send({type: "popup.resize", payload: {height: Math.round(height)}});
}

export interface AppInfo {
    version: string;
    platform: string;
    logDirectory: string;
    /** True when the interface has to paint the window's rounded corners itself (Linux). */
    rounded: boolean;
}

/** Reads the app version declared in the csproj, plus the host platform id and where logs live. */
export async function getAppInfo(): Promise<AppInfo> {
    if (!Native.available) return {version: "dev", platform: "windows", logDirectory: "", rounded: false};

    return await Native.request<AppInfo>("app.info");
}

/** Opens the folder the app writes its log files to, in the desktop's file manager. */
export async function openLogsFolder(): Promise<void> {
    if (!Native.available) return;

    await Native.request("update.openLogs");
}

/** Body of `update.check`: the running version, the published one, and whether it is newer. */
export interface UpdateCheck {
    current: string;
    latest: string;
    available: boolean;
}

/** Reply to an update action that only reports whether it started. */
export interface UpdateAck {
    ok: boolean;
    error?: string | null;
}

/** One `update.progress` event. */
export interface UpdateProgress {
    phase: "changelog" | "downloading" | "ready" | "cancelled" | "error";
    downloaded: number;
    total: number;
    percent: number;
    error?: string | null;
}

/** One `update.changelog` event. */
export interface UpdateChangelog {
    text: string;
}

/** Where the newest release can be downloaded from. */
export const RELEASES_URL = "https://github.com/T2PeNBiX99wcoxKv3A4g/URLCheck/releases/latest";

/**
 * The update state, checked automatically on first use and then cached by the shared update service.
 * Null while it is unknown, which is also what a failed check reports: nobody asked for it, so
 * nothing is shown.
 */
export async function getUpdateStatus(): Promise<UpdateCheck | null> {
    if (!Native.available) return null;

    return (await Native.request<UpdateCheck | null>("update.status")) ?? null;
}

/**
 * Compares this build with the version file the release workflow publishes, ignoring the cache. The
 * shared update service reads the file directly, so checking never runs into the GitHub API rate
 * limit.
 */
export async function checkForUpdates(): Promise<UpdateCheck> {
    if (!Native.available) return {current: "dev", latest: "dev", available: false};

    return await Native.request<UpdateCheck>("update.check");
}

/** Starts downloading the release asset; progress and the changelog arrive as events. */
export async function downloadUpdate(): Promise<UpdateAck> {
    if (!Native.available) return {ok: false, error: "Only the desktop app can install updates."};

    return await Native.request<UpdateAck>("update.download");
}

/** Stops an in-flight download. */
export async function cancelUpdateDownload(): Promise<void> {
    if (!Native.available) return;

    await Native.request("update.cancel");
}

/** Starts the downloaded MSI; the shared service closes the app once the reply has been sent. */
export async function installUpdate(): Promise<UpdateAck> {
    if (!Native.available) return {ok: false, error: "Only the desktop app can install updates."};

    return await Native.request<UpdateAck>("update.install");
}

/** Opens the latest release page in the user's browser. */
export async function openReleasePage(): Promise<void> {
    if (!Native.available) {
        window.open(RELEASES_URL, "_blank", "noopener,noreferrer");
        return;
    }

    const ack = await Native.request<UpdateAck>("update.openRelease");
    if (!ack.ok) throw new Error(ack.error ?? "Could not open the release page.");
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
