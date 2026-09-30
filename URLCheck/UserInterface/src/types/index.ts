export type TabType = "single" | "history" | "settings";

export interface UrlCheckResult {
  url: string;
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  searchParams: { key: string; value: string }[];
  hash: string;
  status: "valid" | "warning" | "invalid";
  statusCode?: number;
  statusText?: string;
  responseTimeMs?: number;
  checkedAt: string;
}

export interface BatchItem {
  id: string;
  url: string;
  status: "pending" | "success" | "warning" | "error";
  statusCode: number;
  latency: number;
  message: string;
}

export interface HistoryItem {
  id: string;
  url: string;
  status: "success" | "warning" | "error";
  statusCode: number;
  timestamp: string;
}
