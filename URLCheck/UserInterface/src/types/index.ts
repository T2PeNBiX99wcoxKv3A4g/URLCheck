export interface HistoryItem {
    id: number;
    url: string;
    timestamp: string;
}

export interface AppSettings {
    requestTimeoutMs: number;
    userAgents: UserAgentEntry[];
    browsers: BrowserEntry[];
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
