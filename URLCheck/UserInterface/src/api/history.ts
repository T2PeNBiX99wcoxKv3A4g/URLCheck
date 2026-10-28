import {Native} from "@photino-net-utils/bridge";
import type {HistoryItem} from "../types";

/** Lists the intercepted URLs, newest first. */
export async function listHistory(): Promise<HistoryItem[]> {
    if (!Native.available) return [];

    const data = await Native.request<{ entries: HistoryItem[] }>("history.list");
    return data.entries ?? [];
}

/** Deletes every stored history entry. */
export async function clearHistory(): Promise<void> {
    if (!Native.available) return;

    await Native.request("history.clear");
}
