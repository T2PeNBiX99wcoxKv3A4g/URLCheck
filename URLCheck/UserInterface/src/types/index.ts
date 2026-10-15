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
