import React, {useEffect, useState} from "react";
import {Native, type ThemeMode, useTheme} from "@photino-net-utils/bridge";
import {loadSettings, type SettingsPayload} from "../api/settings";

/** Any stored value other than an explicit theme falls back to following the system. */
const asMode = (theme: string | undefined): ThemeMode =>
    theme === "light" || theme === "dark" ? theme : "system";

/**
 * Applies the saved theme to the document and follows later changes. Every window (management,
 * popup, floating button) wraps its page in this, so all of them switch together.
 */
export const ThemeRoot: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [mode, setMode] = useState<ThemeMode>("system");

    useEffect(() => {
        let cancelled = false;

        loadSettings()
            .then((payload) => {
                if (!cancelled) setMode(asMode(payload.settings.theme));
            })
            .catch(() => undefined);

        const unsubscribe = Native.on((message) => {
            if (message.type === "settings.changed")
                setMode(asMode((message.data as SettingsPayload | undefined)?.settings.theme));
        });

        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, []);

    useTheme(mode);
    return <>{children}</>;
};
