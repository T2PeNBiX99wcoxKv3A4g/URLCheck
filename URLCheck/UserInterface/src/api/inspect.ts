import {Native} from "../Native";

export interface StatusResult {
    statusCode: number;
    statusText: string;
    ok: boolean;
    /** Set when the response is a redirect; the popup offers to follow it. */
    location: string | null;
}

/**
 * Asks the backend to request the URL and report its HTTP status. Redirects are not followed, so a
 * 3xx comes back as-is with its {@link StatusResult.location}.
 */
export async function checkStatus(url: string, userAgentId?: string): Promise<StatusResult> {
    return await Native.request<StatusResult>("inspect.status", {url, userAgentId});
}
