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
    /** Cross-platform: show the popup without window decorations, drawing our own rounded frame. */
    borderlessPopup: boolean;
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
