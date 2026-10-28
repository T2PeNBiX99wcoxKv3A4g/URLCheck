import {Native} from "@photino-net-utils/bridge";
import type {BrowserEntry} from "../types";

/** Asks the C# backend to enumerate installed browsers from the Windows registry. */
export async function detectBrowsers(): Promise<BrowserEntry[]> {
    if (!Native.available) return [];

    const data = await Native.request<{ browsers: BrowserEntry[] }>("browsers.detect");
    return data.browsers ?? [];
}

/** Opens a URL with a specific browser (or the default one when no id is given). */
export async function openWithBrowser(url: string, browserId?: string, privateMode = false): Promise<void> {
    if (!Native.available) {
        window.open(url, "_blank", "noopener,noreferrer");
        return;
    }

    await Native.request("popup.open", {url, browserId, private: privateMode});
}
