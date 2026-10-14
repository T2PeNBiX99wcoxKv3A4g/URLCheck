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

/** Registers URLCheck as a candidate browser and as the `urlcheck://` handler. */
export async function registerProtocols(): Promise<{ executablePath: string }> {
    return await Native.request<{ executablePath: string }>("app.registerProtocols");
}

/** Opens the Windows "Default apps" settings page. */
export async function openDefaultAppsSettings(): Promise<void> {
    await Native.request("app.openDefaultApps");
}

/** Asks the backend to resize the popup window so it fits its content. */
export function resizePopup(height: number): void {
    Native.send({type: "popup.resize", payload: {height: Math.round(height)}});
}

/** Reads the app version declared in the csproj. */
export async function getAppInfo(): Promise<{ version: string }> {
    if (!Native.available) return {version: "dev"};

    return await Native.request<{ version: string }>("app.info");
}

/** True when Windows currently routes http links to URLCheck. */
export async function isDefaultBrowser(): Promise<boolean> {
    if (!Native.available) return false;

    const result = await Native.request<{ isDefault: boolean }>("app.isDefaultBrowser");
    return result.isDefault;
}
