import type React from "react";
import type {IconProps} from "./components/Icons";
import {CodeIcon, HistoryIcon, HomeIcon, SettingsIcon} from "./components/Icons";
import {HistoryPage} from "./pages/HistoryPage";
import {HomePage} from "./pages/HomePage";
import {SettingsPage} from "./pages/SettingsPage";
import {ScriptsPage} from "./pages/ScriptsPage";

/** A single entry in the app's tab registry. */
export interface TabDefinition {
    id: string;
    /** Translation keys, resolved by the sidebar and header. */
    labelKey: string;
    titleKey: string;
    subtitleKey: string;
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
        labelKey: "tabs.home.label",
        titleKey: "tabs.home.title",
        subtitleKey: "tabs.home.subtitle",
        icon: HomeIcon,
        page: HomePage,
    },
    {
        id: "history",
        labelKey: "tabs.history.label",
        titleKey: "tabs.history.title",
        subtitleKey: "tabs.history.subtitle",
        icon: HistoryIcon,
        page: HistoryPage,
    },
    {
        id: "scripts",
        labelKey: "tabs.scripts.label",
        titleKey: "tabs.scripts.title",
        subtitleKey: "tabs.scripts.subtitle",
        icon: CodeIcon,
        page: ScriptsPage,
    },
    {
        id: "settings",
        labelKey: "tabs.settings.label",
        titleKey: "tabs.settings.title",
        subtitleKey: "tabs.settings.subtitle",
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
