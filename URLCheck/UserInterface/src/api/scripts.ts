import {Native} from "@photino-net-utils/bridge";

/** One installed script, as the scripts page lists it. */
export interface ScriptEntry {
    name: string;
    size: number;
    /** ISO timestamp of the last write. */
    modified: string;
    /** Compile/load error the backend found, or null. */
    error: string | null;
    /** The `scriptVersion` global, or null when the script does not publish one. */
    version: string | null;
    /** The `scriptUrl` global, or null when the script is not updatable. */
    updateUrl: string | null;
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

    const answer = await Native.request<ScriptList>("scripts.list");

    return {
        ...answer,
        scripts: answer.scripts.map((script) => ({
            ...script,
            version: script.version ?? null,
            updateUrl: script.updateUrl ?? null,
        })),
    };
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

/** Renames a script on disk. */
export async function renameScript(name: string, newName: string): Promise<string | null> {
    return await result("scripts.rename", {name, newName});
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
}

/**
 * Runs one script over a test URL and returns what it produced.
 *
 * The backend leaves null fields out of the payload, so `error` has to be filled in here; otherwise
 * it arrives as `undefined` and every run looks like a failure.
 */
export async function testScript(name: string, url: string, content: string): Promise<ScriptTestResult> {
    const answer = await Native.request<Partial<ScriptTestResult>>("scripts.test", {name, url, content});

    return {url: answer.url ?? url, error: answer.error ?? null};
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

/** One script the update check inspected. */
export interface ScriptUpdateEntry {
    name: string;
    /** The local `scriptVersion`, or null. */
    installed: string | null;
    /** The version published at `scriptUrl`, or null when it could not be read. */
    latest: string | null;
    /** The published version is newer than the local one. */
    available: boolean;
    /** Same version but different content: the local copy may have been edited. */
    changed: boolean;
    /** Why the check failed, or null. */
    error: string | null;
}

/** Asks every script that publishes `scriptUrl` and `scriptVersion` for its current version. */
export async function checkScriptUpdates(): Promise<ScriptUpdateEntry[]> {
    if (!Native.available) return [];

    const answer = await Native.request<{ updates: ScriptUpdateEntry[] }>("scripts.checkUpdates");

    return (answer.updates ?? []).map((entry) => ({
        ...entry,
        installed: entry.installed ?? null,
        latest: entry.latest ?? null,
        available: entry.available ?? false,
        changed: entry.changed ?? false,
        error: entry.error ?? null,
    }));
}

/**
 * Replaces one script with the copy at its `scriptUrl`. `force` is only for the case where the
 * versions match but the content differs and the user agreed to overwrite the local copy.
 */
export async function updateScript(name: string, force = false): Promise<string | null> {
    return await result("scripts.update", {name, force});
}

export interface ScriptUpdateAllResult {
    ok: boolean;
    updated: number;
    failed: number;
    error: string | null;
}

/** Updates every script whose published version is newer. */
export async function updateAllScripts(): Promise<ScriptUpdateAllResult> {
    if (!Native.available) return {ok: true, updated: 0, failed: 0, error: null};

    const answer = await Native.request<Partial<ScriptUpdateAllResult>>("scripts.updateAll");

    return {
        ok: answer.ok ?? false,
        updated: answer.updated ?? 0,
        failed: answer.failed ?? 0,
        error: answer.error ?? null,
    };
}
