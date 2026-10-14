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
}

/** Reports whether URLCheck is the default browser and whether urlcheck:// is registered. */
export async function protocolStatus(): Promise<ProtocolStatus> {
    if (!Native.available) return {isDefault: false, customSchemeRegistered: false};

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

/** True when Windows currently routes http links to URLCheck. */
export async function isDefaultBrowser(): Promise<boolean> {
    if (!Native.available) return false;

    const status = await Native.request<ProtocolStatus>("app.protocolStatus");
    return status.isDefault;
}
