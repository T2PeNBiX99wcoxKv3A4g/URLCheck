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

/** Registers URLCheck as the handler for the custom `urlcheck://` scheme. */
export async function registerCustomScheme(): Promise<{ executablePath: string }> {
    return await Native.request<{ executablePath: string }>("app.registerCustomScheme");
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

/** Reports whether URLCheck is the default browser and whether urlcheck:// is registered. */
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

/** Reads the app version declared in the csproj, plus the host platform id and where logs live. */
export async function getAppInfo(): Promise<{ version: string; platform: string; logDirectory: string }> {
    if (!Native.available) return {version: "dev", platform: "windows", logDirectory: ""};

    return await Native.request<{ version: string; platform: string; logDirectory: string }>("app.info");
}

/** Opens the folder the app writes its log files to, in the desktop's file manager. */
export async function openLogsFolder(): Promise<void> {
    if (!Native.available) return;

    await Native.request("app.openLogs");
}

/** Body of `app.checkUpdate`: the running version, the published one, and whether it is newer. */
export interface UpdateCheck {
    current: string;
    latest: string;
    available: boolean;
}

/**
 * Compares this build with the version file the release workflow publishes. It is a plain download
 * from the repository, so checking never runs into the GitHub API rate limit.
 */
export async function checkForUpdates(): Promise<UpdateCheck> {
    if (!Native.available) return {current: "dev", latest: "dev", available: false};

    return await Native.request<UpdateCheck>("app.checkUpdate");
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
