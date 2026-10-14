/**
 * Common analytics/tracking query parameters removed by the "remove tracking" action.
 * Kept in sync with the usual ClearURLs-style basics.
 *
 * TODO(tracking): this is a deliberately simple allow-list of well-known keys. A full
 * implementation should load provider-aware rules (ClearURLs' `data.min.json` style:
 * per-provider parameter names, regex-redacted values, and exceptions) instead of the
 * flat set below, and expose it as an opt-in setting. Until then this list is a stop-gap.
 */
const TRACKING_PARAMS = new Set([
    "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id",
    "utm_name", "utm_reader", "utm_creative_format", "utm_marketing_tactic",
    "fbclid", "gclid", "dclid", "gbraid", "wbraid", "msclkid", "yclid", "twclid",
    "igshid", "mc_cid", "mc_eid", "mkt_tok", "vero_id", "oly_anon_id", "oly_enc_id",
    "wickedid", "_ga", "_gl", "s_kwcid", "spm", "scm", "trk", "trkcampaign",
]);

function parse(url: string): URL | null {
    try {
        return new URL(url);
    } catch {
        return null;
    }
}

/** Returns the tracking parameter keys currently present in the URL. */
export function trackingParamKeys(url: string): string[] {
    const parsed = parse(url);
    if (!parsed) return [];

    return [...parsed.searchParams.keys()].filter((key) => TRACKING_PARAMS.has(key.toLowerCase()));
}

/** Removes every tracking parameter from the URL. */
export function stripTrackingParams(url: string): string {
    const parsed = parse(url);
    if (!parsed) return url;

    for (const key of [...parsed.searchParams.keys()]) {
        if (TRACKING_PARAMS.has(key.toLowerCase())) {
            parsed.searchParams.delete(key);
        }
    }

    return parsed.toString();
}
