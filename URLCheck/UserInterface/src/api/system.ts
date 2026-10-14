import {Native} from "../Native";

/** Simulates a link click: asks the backend to open (or navigate) the inspection popup. */
export async function showPopup(url: string): Promise<void> {
    if (!Native.available) {
        window.open(url, "_blank", "noopener,noreferrer");
        return;
    }

    await Native.request("popup.show", {url});
}

/** Closes the window that sent the request. */
export function closePopup(): void {
    if (!Native.available) {
        window.close();
        return;
    }

    Native.send({type: "popup.close"});
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

/** Opens the Windows "Default apps" settings page. */
export async function openDefaultAppsSettings(): Promise<void> {
    await Native.request("app.openDefaultApps");
}

/** Asks the backend to resize the popup window so it fits its content. */
export function resizePopup(height: number): void {
    Native.send({type: "popup.resize", payload: {height: Math.round(height)}});
}

/** Reads the app version declared in the csproj, plus the host platform id. */
export async function getAppInfo(): Promise<{ version: string; platform: string }> {
    if (!Native.available) return {version: "dev", platform: "windows"};

    return await Native.request<{ version: string; platform: string }>("app.info");
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
