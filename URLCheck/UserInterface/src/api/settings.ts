import {Native} from "../Native";
import type {AppSettings} from "../types";

export const DEFAULT_SETTINGS: AppSettings = {
    requestTimeoutMs: 5000,
    userAgents: [],
    browsers: [],
    language: "en",
    borderlessPopup: true,
    autoStripTrackingParams: true,
    hideOnLaunch: false,
    showUrlButton: true,
    selectedUserAgentId: "default",
    deviceName: "",
    deviceId: "",
    forwardingEnabled: false,
    forwardPort: 45454,
    devices: [],
};

export interface SettingsPayload {
    settings: AppSettings;
    settingsFilePath: string;
}

const STORAGE_KEY = "urlcheck.settings";

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

function normalize(settings: AppSettings): AppSettings {
    const userAgents = Array.isArray(settings.userAgents) ? settings.userAgents : DEFAULT_SETTINGS.userAgents;

    return {
        ...settings,
        requestTimeoutMs: clamp(settings.requestTimeoutMs, 1000, 15000),
        userAgents,
        // Removing the selected entry must not leave the setting pointing at nothing.
        selectedUserAgentId: userAgents.some((agent) => agent.id === settings.selectedUserAgentId)
            ? settings.selectedUserAgentId
            : userAgents[0].id,
        browsers: (Array.isArray(settings.browsers) ? settings.browsers : []).map((browser) => ({
            ...browser,
            arguments: browser.arguments ?? "",
            useCount: browser.useCount ?? 0,
        })),
        language: settings.language || DEFAULT_SETTINGS.language,
        borderlessPopup: settings.borderlessPopup ?? DEFAULT_SETTINGS.borderlessPopup,
        autoStripTrackingParams:
            settings.autoStripTrackingParams ?? DEFAULT_SETTINGS.autoStripTrackingParams,
        hideOnLaunch: settings.hideOnLaunch ?? DEFAULT_SETTINGS.hideOnLaunch,
        showUrlButton: settings.showUrlButton ?? DEFAULT_SETTINGS.showUrlButton,
        deviceName: settings.deviceName ?? DEFAULT_SETTINGS.deviceName,
        deviceId: settings.deviceId ?? DEFAULT_SETTINGS.deviceId,
        forwardingEnabled: settings.forwardingEnabled ?? DEFAULT_SETTINGS.forwardingEnabled,
        forwardPort: settings.forwardPort ?? DEFAULT_SETTINGS.forwardPort,
        devices: (Array.isArray(settings.devices) ? settings.devices : []).map((device) => ({
            ...device,
            host: device.host ?? "",
            port: device.port ?? DEFAULT_SETTINGS.forwardPort,
            publicKey: device.publicKey ?? "",
        })),
    };
}

/** Browser fallback used when the app runs outside the Photino shell (e.g. `npm run dev`). */
function readLocalSettings(): AppSettings {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) return normalize({...DEFAULT_SETTINGS, ...JSON.parse(raw)});
    } catch (error) {
        console.warn("[settings] Failed to read local settings:", error);
    }

    return {...DEFAULT_SETTINGS};
}

export async function loadSettings(): Promise<SettingsPayload> {
    if (Native.available) {
        return await Native.request<SettingsPayload>("settings.get");
    }

    return {settings: readLocalSettings(), settingsFilePath: "(browser localStorage)"};
}

export async function saveSettings(settings: AppSettings): Promise<SettingsPayload> {
    const normalized = normalize(settings);

    if (Native.available) {
        return await Native.request<SettingsPayload>("settings.save", normalized);
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return {settings: normalized, settingsFilePath: "(browser localStorage)"};
}

export async function resetSettings(): Promise<SettingsPayload> {
    if (Native.available) {
        return await Native.request<SettingsPayload>("settings.reset");
    }

    window.localStorage.removeItem(STORAGE_KEY);
    return {settings: {...DEFAULT_SETTINGS}, settingsFilePath: "(browser localStorage)"};
}
