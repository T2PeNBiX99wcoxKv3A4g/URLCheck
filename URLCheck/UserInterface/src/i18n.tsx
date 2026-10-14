import React, {createContext, useContext, useEffect, useState} from "react";
import {loadStrings} from "./api/i18n";
import {Native} from "./Native";

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

export function useTranslation(): Translate {
    return useContext(TranslationContext);
}

/** Loads the string table from the backend and reloads it whenever the settings change. */
export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [translate, setTranslate] = useState<Translate>(() => createTranslator({}));

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const payload = await loadStrings();
                if (!cancelled) setTranslate(() => createTranslator(payload.strings));
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

    return <TranslationContext.Provider value={translate}>{children}</TranslationContext.Provider>;
};
