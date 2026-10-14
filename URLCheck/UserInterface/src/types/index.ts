export interface HistoryItem {
    id: string;
    url: string;
    status: "success" | "warning" | "error";
    statusCode: number;
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
}
