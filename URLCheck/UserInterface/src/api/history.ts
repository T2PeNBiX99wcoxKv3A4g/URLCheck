import {Native} from "@photino-net-utils/bridge";
import type {HistoryItem} from "../types";
import {data} from "./data";

/** Lists the intercepted URLs, newest first. */
export async function listHistory(): Promise<HistoryItem[]> {
    if (!Native.available) return [];

    try {
        const page = await data.readBlock("/history");
        return page.rows.map((row) => ({
            id: Number(row.id),
            url: String(row.url),
            timestamp: Number(row.timestamp),
        }));
    } catch {
        // The Vite dev server has no data plane; keep the bridge as the fallback.
        const result = await Native.request<{ entries: HistoryItem[] }>("history.list");
        return result.entries ?? [];
    }
}

/** Deletes every stored history entry. */
export async function clearHistory(): Promise<void> {
    if (!Native.available) return;

    await Native.request("history.clear");
}
