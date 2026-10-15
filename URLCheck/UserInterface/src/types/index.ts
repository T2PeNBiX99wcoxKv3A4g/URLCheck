export interface HistoryItem {
    id: number;
    url: string;
    /** Unix epoch milliseconds (UTC). */
    timestamp: number;
}

export interface AppSettings {
    requestTimeoutMs: number;
    userAgents: UserAgentEntry[];
    browsers: BrowserEntry[];
    language: string;
    /** Linux only: leave the popup's background transparent so its rounded corners show. */
    transparentPopup: boolean;
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
