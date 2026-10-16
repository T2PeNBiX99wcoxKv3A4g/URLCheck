/**
 * Ready-made filter lists offered by the "choose from list" dialog. Each entry is just a display
 * name and a direct download URL — installing one only downloads and parses it, so no copy of the
 * rules ships with the app.
 *
 * Any format the backend's parser understands can be listed here: AdGuard / uBlock Origin filter
 * lists, ClearURLs' JSON catalog and Firefox's query-stripping records. The format is detected from
 * the downloaded content.
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
    {
        name: "ClearURLs",
        url: "https://rules1.clearurls.xyz/data.minify.json",
        descriptionKey: "filters.catalog.clearUrls",
    },
    {
        name: "Firefox – Query Parameter Stripping",
        url: "https://firefox.settings.services.mozilla.com/v1/buckets/main/collections/query-stripping/records",
        descriptionKey: "filters.catalog.firefox",
    },
];
