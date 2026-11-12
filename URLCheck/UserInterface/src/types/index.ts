import type {AppSettingsGenerated} from "../api/settings.generated";

export interface HistoryItem {
    id: number;
    url: string;
    /** Unix epoch milliseconds (UTC). */
    timestamp: number;
}

/**
 * The primitive settings come from the generated C# model, so adding a setting to `AppSettings.cs`
 * shows up here after the next build. The lists keep their concrete types instead of `unknown[]`.
 */
export interface AppSettings extends Omit<AppSettingsGenerated, "userAgents" | "browsers" | "devices"> {
    userAgents: UserAgentEntry[];
    browsers: BrowserEntry[];
    devices: DeviceEntry[];
}

export interface DeviceEntry {
    id: string;
    name: string;
    /** Host name or IP address of the peer on the local network. */
    host: string;
    /** Port the peer's listener is bound to. */
    port: number;
    /** The peer's Ed25519 public key, base64. Empty until the device has been paired. */
    publicKey: string;
    /**
     * Extra addresses (host names or IPs) tried when the primary `host` cannot be reached, e.g. a
     * private `.lan` name that survives an address change. All share `port`.
     */
    addresses: string[];
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
    arguments: string;
    useCount: number;
}
