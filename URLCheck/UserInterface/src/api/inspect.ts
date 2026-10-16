import {Native} from "../Native";

export interface StatusResult {
    statusCode: number;
    statusText: string;
    ok: boolean;
    /** Redirect target when the response was a 3xx; the popup jumps to it. */
    location: string | null;
}

/**
 * Asks the backend to request the URL and report its HTTP status. Redirects are not followed, so a
 * redirect keeps its own code (301, 302, 307, ...) instead of the destination's.
 */
export async function checkStatus(url: string, userAgentId?: string): Promise<StatusResult> {
    return await Native.request<StatusResult>("inspect.status", {url, userAgentId});
}
