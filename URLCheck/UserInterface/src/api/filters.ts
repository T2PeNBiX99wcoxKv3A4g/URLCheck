import {Native} from "@photino-net-utils/bridge";

export interface FilterListEntry {
    id: string;
    name: string;
    /** Direct download URL of the rule file. */
    url: string;
    enabled: boolean;
    /** Unix epoch milliseconds of the last successful download, or 0 when never fetched. */
    lastUpdated: number;
    ruleCount: number;
    /** Last download/parse error, or null. */
    error: string | null;
}

export interface FilterListsPayload {
    lists: FilterListEntry[];
    /** Rules from the embedded list, which is always active and never listed. */
    builtinRuleCount: number;
}

/** One parameter-removal rule, as parsed by the backend from any supported list format. */
export interface RemoveParamRule {
    /** A literal parameter name, or a regular expression source when `regex` is true. */
    pattern: string;
    regex: boolean;
    /** Full-URL regex the rule is limited to (ClearURLs providers); absent means every URL. */
    urlPattern?: string | null;
    /** Hosts the rule is limited to; absent means every host. */
    include?: string[] | null;
    /** Hosts the rule is skipped on. */
    exclude?: string[] | null;
    /** Full-URL regexes that skip the rule. */
    urlExceptions?: string[] | null;
}

/**
 * The rules always come from the backend, which owns the embedded built-in file and the downloaded
 * lists. Outside the desktop shell there is nothing to apply, so the popup leaves URLs untouched.
 */
const NO_LISTS: FilterListsPayload = {lists: [], builtinRuleCount: 0};

/** The installed filter lists plus the built-in rule count. */
export async function loadFilterLists(): Promise<FilterListsPayload> {
    if (!Native.available) return NO_LISTS;
    return await Native.request<FilterListsPayload>("filters.get");
}

/** Installs a list from a direct rule-file URL; the backend downloads and parses it. */
export async function addFilterList(name: string, url: string): Promise<FilterListsPayload> {
    return await Native.request<FilterListsPayload>("filters.add", {name, url});
}

export async function removeFilterList(id: string): Promise<FilterListsPayload> {
    return await Native.request<FilterListsPayload>("filters.remove", {id});
}

export async function setFilterListEnabled(id: string, enabled: boolean): Promise<FilterListsPayload> {
    return await Native.request<FilterListsPayload>("filters.setEnabled", {id, enabled});
}

/** Re-downloads one list, or every list when `id` is omitted. */
export async function updateFilterLists(id?: string): Promise<FilterListsPayload> {
    return await Native.request<FilterListsPayload>("filters.update", {id: id ?? ""});
}

/** Every rule the popup should apply: the built-in list plus every enabled installed list. */
export async function loadFilterRules(): Promise<RemoveParamRule[]> {
    if (!Native.available) return [];
    return (await Native.request<FilterRulesPayload>("filters.rules")).rules;
}

interface FilterRulesPayload {
    rules: RemoveParamRule[];
}
