import React, {createContext, useContext, useEffect, useState} from "react";
import {loadStrings} from "./api/i18n";
import {Native} from "@photino-net-utils/bridge";

export type Translate = (key: string, params?: Record<string, string | number>) => string;

/** Falls back to the key itself so a missing translation is obvious but never breaks the UI. */
export function createTranslator(strings: Record<string, string>): Translate {
    return (key, params) => {
        const template = strings[key] ?? key;
        if (!params) return template;

        return template.replace(/\{(\w+)}/g, (match, name: string) =>
            name in params ? String(params[name]) : match
        );
    };
}

export const TranslationContext = createContext<Translate>(createTranslator({}));

/** BCP-47 tag of the language the backend resolved, for locale-aware formatting. */
export const LocaleContext = createContext<string>("en");

export function useTranslation(): Translate {
    return useContext(TranslationContext);
}

export function useLocale(): string {
    return useContext(LocaleContext);
}

/** Loads the string table from the backend and reloads it whenever the settings change. */
export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [translate, setTranslate] = useState<Translate>(() => createTranslator({}));
    const [locale, setLocale] = useState("en");

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const payload = await loadStrings();
                if (cancelled) return;

                setTranslate(() => createTranslator(payload.strings));
                setLocale(payload.locale);
            } catch {
                // Keep the key-fallback translator.
            }
        };

        void load();

        const unsubscribe = Native.on((message) => {
            const event = message as { type?: string };
            if (event.type === "settings.changed") void load();
        });

        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, []);

    /* Chromium picks the CJK fallback font from this, so it has to follow the UI language. */
    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    return (
        <TranslationContext.Provider value={translate}>
            <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
        </TranslationContext.Provider>
    );
};
