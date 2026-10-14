import {Native} from "../Native";

export interface StatusResult {
    statusCode: number;
    statusText: string;
    ok: boolean;
}

export interface RedirectResult {
    location: string | null;
}

/** Asks the backend to request the URL and report its HTTP status. */
export async function checkStatus(url: string): Promise<StatusResult> {
    return await Native.request<StatusResult>("inspect.status", {url});
}

/** Asks the backend for the next redirect target (one hop), or null when there is none. */
export async function followRedirect(url: string): Promise<string | null> {
    const result = await Native.request<RedirectResult>("inspect.redirect", {url});
    return result.location ?? null;
}
