export interface HistoryItem {
    id: string;
    url: string;
    status: "success" | "warning" | "error";
    statusCode: number;
    timestamp: string;
}

export interface AppSettings {
    requestTimeoutMs: number;
    userAgent: string;
    browsers: BrowserEntry[];
}

export interface BrowserEntry {
    id: string;
    name: string;
    executablePath: string;
}
