import {Native} from "../Native";

export interface ForwardInfo {
    deviceId: string;
    deviceName: string;
    /** Port this device accepts forwarded URLs on. */
    port: number;
    /** IPv4 addresses this device can be reached at on the local network. */
    addresses: string[];
    /** True while a pairing code is set and the listener is running. */
    listening: boolean;
}

const OFFLINE: ForwardInfo = {deviceId: "", deviceName: "", port: 0, addresses: [], listening: false};

/** Describes how this device can be reached, for the settings panel. */
export async function getForwardInfo(): Promise<ForwardInfo> {
    if (!Native.available) return OFFLINE;

    return await Native.request<ForwardInfo>("forward.info");
}

/** Sends a URL to another device, where it opens in the inspection popup. */
export async function forwardUrl(url: string, deviceId: string): Promise<void> {
    await Native.request("forward.send", {url, deviceId});
}
