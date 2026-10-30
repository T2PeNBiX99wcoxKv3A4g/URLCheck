import {Native} from "@photino-net-utils/bridge";

/** One installed script, as the scripts page lists it. */
export interface ScriptEntry {
    name: string;
    size: number;
    /** ISO timestamp of the last write. */
    modified: string;
    /** Compile/load error the backend found, or null. */
    error: string | null;
}

export interface ScriptList {
    scripts: ScriptEntry[];
    directory: string;
}

/** One line a script printed or failed with. */
export interface ScriptLogEntry {
    time: string;
    level: "info" | "error" | string;
    script: string;
    message: string;
}

/** Runs a backend call that answers with `{ok, error}` and returns the error key, or null. */
async function result(type: string, payload?: unknown): Promise<string | null> {
    try {
        const answer = await Native.request<{ ok: boolean; error: string | null }>(type, payload);
        return answer.ok ? null : answer.error ?? "error.unknown";
    } catch (error) {
        return error instanceof Error ? error.message : String(error);
    }
}

/** The installed scripts and the folder they live in. */
export async function listScripts(): Promise<ScriptList> {
    if (!Native.available) return {scripts: [], directory: ""};

    return await Native.request<ScriptList>("scripts.list");
}

/** The source of one script. */
export async function readScript(name: string): Promise<string> {
    const answer = await Native.request<{ name: string; content: string }>("scripts.read", {name});
    return answer.content;
}

/** Writes a script; the backend checks that it parses first. */
export async function saveScript(name: string, content: string): Promise<string | null> {
    return await result("scripts.save", {name, content});
}

/** Creates a script from the built-in template. */
export async function createScript(name: string): Promise<string | null> {
    return await result("scripts.create", {name});
}

export async function deleteScript(name: string): Promise<string | null> {
    return await result("scripts.delete", {name});
}

/** Asks the user for files and copies them in; the backend opens the dialog. */
export async function importScripts(): Promise<string | null> {
    return await result("scripts.import");
}

/** Downloads a script from a URL and installs it. */
export async function downloadScript(url: string): Promise<string | null> {
    return await result("scripts.download", {url});
}

/** Opens the script's file with whatever the system uses for .lua files. */
export async function openScript(name: string): Promise<string | null> {
    return await result("scripts.open", {name});
}

/** One run of a script over a test URL, without opening anything. */
export interface ScriptTestResult {
    /** The URL the script handed back (the input when it left it alone). */
    url: string;
    /** The failure, when the script threw or could not be loaded. */
    error: string | null;
    /** Everything it printed, oldest first. */
    output: string[];
}

/** Runs one script over a test URL and returns what it produced. */
export async function testScript(name: string, url: string, content: string): Promise<ScriptTestResult> {
    return await Native.request<ScriptTestResult>("scripts.test", {name, url, content});
}

/** The lines the scripts printed or failed with, newest last. */
export async function scriptLogs(): Promise<ScriptLogEntry[]> {
    if (!Native.available) return [];

    const answer = await Native.request<{ entries: ScriptLogEntry[] }>("scripts.logs");
    return answer.entries;
}

export async function clearScriptLogs(): Promise<void> {
    await result("scripts.clearLogs");
}
