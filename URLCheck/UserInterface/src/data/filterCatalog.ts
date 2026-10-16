/**
 * Ready-made filter lists offered by the "choose from list" dialog. Each entry is just a display
 * name and a direct download URL — installing one only downloads and parses it, so no copy of the
 * rules ships with the app.
 *
 * Every entry here has to be an AdGuard / uBlock Origin style list, which is what the parser
 * understands. Formats with their own schema (ClearURLs' JSON, Firefox's Remote Settings records)
 * would need their own parser before they can be offered.
 */
export interface CatalogEntry {
    name: string;
    url: string;
    /** Translation key for the one-line description. */
    descriptionKey: string;
}

export const FILTER_CATALOG: CatalogEntry[] = [
    {
        name: "AdGuard URL Tracking Protection",
        url: "https://raw.githubusercontent.com/AdguardTeam/FiltersRegistry/master/filters/filter_17_TrackParam/filter.txt",
        descriptionKey: "filters.catalog.adguardUrlTracking",
    },
    {
        name: "uBlock Origin – AdGuard URL Tracking Protection",
        url: "https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy-removeparam.txt",
        descriptionKey: "filters.catalog.uboUrlTracking",
    },
];
