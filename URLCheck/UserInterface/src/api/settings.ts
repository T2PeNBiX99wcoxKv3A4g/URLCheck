import {Native} from "../Native";
import type {AppSettings} from "../types";

export const DEFAULT_SETTINGS: AppSettings = {
    requestTimeoutMs: 5000,
    userAgents: [
        {id: "default", name: "Default (URLCheck)", value: "URLCheck Desktop Agent/1.0"},
        {
            id: "chrome",
            name: "Chrome (Windows)",
            value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        },
        {
            id: "safari",
            name: "Safari (macOS)",
            value: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
        },
        {id: "curl", name: "cURL", value: "curl/8.4.0"},
        {
            id: "bot",
            name: "Googlebot",
            value: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        },
    ],
    browsers: [],
    language: "en",
    transparentPopup: true,
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
        userAgents:
            Array.isArray(settings.userAgents) && settings.userAgents.length > 0
                ? settings.userAgents
                : DEFAULT_SETTINGS.userAgents,
        browsers: (Array.isArray(settings.browsers) ? settings.browsers : []).map((browser) => ({
            ...browser,
            arguments: browser.arguments ?? "",
            useCount: browser.useCount ?? 0,
        })),
        language: settings.language || DEFAULT_SETTINGS.language,
        transparentPopup: settings.transparentPopup ?? DEFAULT_SETTINGS.transparentPopup,
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
