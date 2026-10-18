import {Native} from "../Native";
import type {DeviceEntry} from "../types";

export interface ForwardInfo {
    deviceId: string;
    deviceName: string;
    /** Port this device accepts pairing and forwarded URLs on. */
    port: number;
    /** Addresses this device can be reached at on the local network. */
    addresses: string[];
    /** True when the listener and discovery are switched on. */
    enabled: boolean;
    /** True when the listener is actually bound right now. */
    listening: boolean;
    /** This device's Ed25519 public key, base64. */
    publicKey: string;
}

const OFFLINE: ForwardInfo = {
    deviceId: "",
    deviceName: "",
    port: 0,
    addresses: [],
    enabled: false,
    listening: false,
    publicKey: "",
};

/** Describes how this device can be reached, for the settings panel. */
export async function getForwardInfo(): Promise<ForwardInfo> {
    if (!Native.available) return OFFLINE;

    return await Native.request<ForwardInfo>("forward.info");
}

/** Sends a URL to another device, where it opens in the inspection popup. */
export async function forwardUrl(url: string, deviceId: string): Promise<void> {
    await Native.request("forward.send", {url, deviceId});
}

/** Starts broadcasting discovery queries; results arrive as `forward.discovered` events. */
export function startDiscovery(): void {
    Native.send({type: "forward.discoverStart"});
}

export function stopDiscovery(): void {
    Native.send({type: "forward.discoverStop"});
}

/** Asks to pair with a device; progress arrives as `forward.pairState` events. */
export function pairWith(host: string, port: number): void {
    Native.send({type: "forward.pair", payload: {host, port}});
}

/** Answers an incoming pairing request. */
export function respondToPairing(requestId: string, accept: boolean): void {
    Native.send({type: "forward.pairRespond", payload: {requestId, accept}});
}

/** Reads a pairing request that is still waiting, in case its event was pushed before the page mounted. */
export async function pendingPairing(): Promise<PairRequestEvent | null> {
    if (!Native.available) return null;

    return (await Native.request<PairRequestEvent | null>("forward.pendingPairing")) ?? null;
}

/** Forgets a paired device. */
export function removeDevice(deviceId: string): void {
    Native.send({type: "forward.remove", payload: {deviceId}});
}

export type PairState = "code" | "accepted" | "rejected" | "failed";

/** Body of the `forward.pairState` event: progress of a pairing this device started. */
export interface PairStateEvent {
    state: PairState;
    code: string | null;
    device: DeviceEntry | null;
    error: string | null;
}

/** Body of the `forward.pairRequest` event: a peer asking to pair, for the user to confirm. */
export interface PairRequestEvent {
    requestId: string;
    deviceId: string;
    deviceName: string;
    code: string;
}
