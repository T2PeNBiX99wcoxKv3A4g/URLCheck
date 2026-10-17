export interface HistoryItem {
    id: number;
    url: string;
    /** Unix epoch milliseconds (UTC). */
    timestamp: number;
}

export interface AppSettings {
    requestTimeoutMs: number;
    userAgents: UserAgentEntry[];
    /** Id of the entry used for outbound requests; falls back to the first entry. */
    selectedUserAgentId: string;
    browsers: BrowserEntry[];
    language: string;
    /** Cross-platform: show the popup without window decorations, drawing our own rounded frame. */
    borderlessPopup: boolean;
    /** Strip known tracking parameters from a URL as soon as the popup opens. */
    autoStripTrackingParams: boolean;
    /** Start with the management window hidden, like a link launch. Ignored without a tray icon. */
    hideOnLaunch: boolean;
    /** Watch the clipboard and float a button over the pointer whenever a copied text is an http(s) URL. */
    showUrlButton: boolean;
}

export interface UserAgentEntry {
    id: string;
    name: string;
    value: string;
}

export interface BrowserEntry {
    id: string;
    name: string;
    executablePath: string;
    arguments: string;
    useCount: number;
}
