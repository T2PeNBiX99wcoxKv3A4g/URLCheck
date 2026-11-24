import {Native} from "@photino-net-utils/bridge";
import type {AppSettings} from "../types";

/**
 * The bounds the backend keeps the settings in. They travel with every settings payload, so the
 * interface never has to keep a copy of the numbers.
 */
export interface SettingsLimits {
    timeoutMinMs: number;
    timeoutMaxMs: number;
    filterMinutesMax: number;
}

export interface SettingsPayload {
    settings: AppSettings;
    settingsFilePath: string;
    limits: SettingsLimits;
}

/**
 * A settings object with nothing filled in yet. Every default and bound belongs to the backend, so
 * this only holds the shape the form needs for its first render; the payload replaces it right away.
 */
export function emptySettings(): AppSettings {
    return {
        requestTimeoutMs: 0,
        userAgents: [],
        selectedUserAgentId: "",
        language: "",
        theme: "",
        browsers: [],
        borderlessPopup: false,
        autoStripTrackingParams: false,
        autoRedirectHosts: [],
        hideOnLaunch: false,
        showUrlButton: false,
        allowScriptNetwork: false,
        deviceName: "",
        deviceId: "",
        forwardingEnabled: false,
        forwardPort: 0,
        filterAutoUpdate: false,
        filterAutoUpdateMinutes: 0,
        devices: [],
    };
}

/** Loads the settings; the backend has already normalized them and their bounds come with them. */
export async function loadSettings(): Promise<SettingsPayload> {
    return await Native.request<SettingsPayload>("settings.get");
}

/** Saves them as they are: the backend clamps whatever is out of range and returns the result. */
export async function saveSettings(settings: AppSettings): Promise<SettingsPayload> {
    return await Native.request<SettingsPayload>("settings.save", settings);
}

/** Restores the backend's defaults, which is also the only place they exist. */
export async function resetSettings(): Promise<SettingsPayload> {
    return await Native.request<SettingsPayload>("settings.reset");
}

/** Adds a URL's host to the auto-redirect list. Idempotent. */
export async function addAutoRedirect(url: string): Promise<void> {
    if (!Native.available) return;

    await Native.request("settings.addAutoRedirect", {url});
}
