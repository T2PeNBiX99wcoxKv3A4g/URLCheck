import {Native} from "../Native";

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

/** One AdGuard / uBlock Origin `$removeparam` rule, as parsed by the backend. */
export interface RemoveParamRule {
    /** A literal parameter name, or a regular expression source when `regex` is true. */
    pattern: string;
    regex: boolean;
    /** Hosts the rule is limited to; null means every host. */
    include: string[] | null;
    /** Hosts the rule is skipped on; null means none. */
    exclude: string[] | null;
}

/**
 * Rules applied when the native bridge is missing, so the popup still cleans URLs during plain
 * browser development. The real list comes from the backend's embedded `builtin.txt`.
 */
const FALLBACK_RULES: RemoveParamRule[] = [
    "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id", "utm_name",
    "utm_reader", "utm_creative_format", "utm_marketing_tactic", "fbclid", "gclid", "dclid", "gbraid",
    "wbraid", "msclkid", "yclid", "twclid", "igshid", "mc_cid", "mc_eid", "mkt_tok", "vero_id",
    "oly_anon_id", "oly_enc_id", "wickedid", "_ga", "_gl", "_s_kwcid", "spm", "scm", "trk", "trkcampaign",
].map((pattern) => ({pattern, regex: false, include: null, exclude: null}));

const EMPTY_LISTS: FilterListsPayload = {lists: [], builtinRuleCount: FALLBACK_RULES.length};

/** The installed filter lists plus the built-in rule count. */
export async function loadFilterLists(): Promise<FilterListsPayload> {
    if (!Native.available) return EMPTY_LISTS;
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
    if (!Native.available) return FALLBACK_RULES;
    return (await Native.request<FilterRulesPayload>("filters.rules")).rules;
}

interface FilterRulesPayload {
    rules: RemoveParamRule[];
}
