import {Native} from "../Native";

export interface I18nPayload {
    locale: string;
    strings: Record<string, string>;
    available: string[];
}

/** Loads the string table for the current (or a specific) language from the backend. */
export async function loadStrings(locale?: string): Promise<I18nPayload> {
    if (!Native.available) return {locale: "en", strings: {}, available: ["en"]};

    return await Native.request<I18nPayload>("i18n.get", locale ? {locale} : undefined);
}
