import type React from "react";
import type {IconProps} from "./components/Icons";
import {HistoryIcon, HomeIcon, SettingsIcon} from "./components/Icons";
import {HistoryPage} from "./pages/HistoryPage";
import {HomePage} from "./pages/HomePage";
import {SettingsPage} from "./pages/SettingsPage";

/** A single entry in the app's tab registry. */
export interface TabDefinition {
    id: string;
    /** Sidebar label. */
    label: string;
    /** Header title. */
    title: string;
    /** Header subtitle. */
    subtitle: string;
    icon: React.FC<IconProps>;
    page: React.FC;
}

/**
 * The single source of truth for the app's pages. Add or reorder a page here and the sidebar,
 * header and content area all follow — no ids to chase around the codebase.
 */
export const TABS = [
    {
        id: "home",
        label: "Home",
        title: "Home",
        subtitle: "Open a URL to inspect and clean it before opening",
        icon: HomeIcon,
        page: HomePage,
    },
    {
        id: "history",
        label: "Inspection History",
        title: "Inspection History",
        subtitle: "Review recently executed URL checks and summary logs",
        icon: HistoryIcon,
        page: HistoryPage,
    },
    {
        id: "settings",
        label: "Settings",
        title: "Preferences & Settings",
        subtitle: "Configure the request timeout, User-Agent header, and browsers",
        icon: SettingsIcon,
        page: SettingsPage,
    },
] as const satisfies readonly TabDefinition[];

/** Union of the registered tab ids, derived from {@link TABS}. */
export type TabType = (typeof TABS)[number]["id"];

export const DEFAULT_TAB: TabType = TABS[0].id;

/** Looks up a tab, falling back to the first one for unknown ids. */
export function findTab(id: TabType): TabDefinition {
    return TABS.find((tab) => tab.id === id) ?? TABS[0];
}
