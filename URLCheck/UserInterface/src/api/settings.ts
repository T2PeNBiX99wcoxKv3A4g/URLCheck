import {Native} from "../Native";
import type {AppSettings} from "../types";

export const DEFAULT_SETTINGS: AppSettings = {
    requestTimeoutMs: 5000,
    followRedirects: true,
    verifySsl: true,
    userAgent: "default",
    maxConcurrency: 5,
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
    return {
        ...settings,
        requestTimeoutMs: clamp(settings.requestTimeoutMs, 1000, 15000),
        maxConcurrency: clamp(settings.maxConcurrency, 1, 20),
        userAgent: settings.userAgent || DEFAULT_SETTINGS.userAgent,
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
