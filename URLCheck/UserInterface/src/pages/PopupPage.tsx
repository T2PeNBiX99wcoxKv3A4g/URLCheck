import React, {useEffect, useMemo, useReducer, useRef, useState} from "react";
import styled, {keyframes} from "styled-components";
import {BrowserEntry, DeviceEntry, UserAgentEntry} from "../types";
import {loadSettings} from "../api/settings";
import {openWithBrowser} from "../api/browsers";
import {forwardUrl} from "../api/forward";
import {checkStatus, type StatusResult} from "../api/inspect";
import {closePopup, resizePopup} from "../api/system";
import {loadFilterRules} from "../api/filters";
import {type CompiledRules, compileRules, stripTrackingParams, trackingParamKeys} from "../data/filterRules";
import {useTranslation} from "../i18n";
import {Native} from "../Native";
import {
    AlertTriangleIcon,
    CheckCircleIcon,
    CopyIcon,
    LockIcon,
    PlusIcon,
    SendIcon,
    ShieldCheckIcon,
    TrashIcon,
    XCircleIcon,
} from "../components/Icons";
import {Caret, Dropdown, DropdownItem, DropdownMenu, useMenuFit} from "../components/Dropdown";

/* ------------------------------------------------------------------ history */

interface HistoryState {
    entries: string[];
    index: number;
    editing: boolean;
}

type HistoryAction =
    | { type: "edit"; value: string }
    | { type: "commit"; value: string }
    | { type: "jump"; index: number };

function append(state: HistoryState, value: string): HistoryState {
    if (state.entries[state.index] === value) return {...state, editing: false};

    const entries = [...state.entries.slice(0, state.index + 1), value];
    return {entries, index: entries.length - 1, editing: false};
}

function historyReducer(state: HistoryState, action: HistoryAction): HistoryState {
    switch (action.type) {
        case "edit": {
            // A burst of typing collapses into a single entry.
            if (state.editing) {
                const entries = [...state.entries];
                entries[state.index] = action.value;
                return {...state, entries};
            }

            return {...append(state, action.value), editing: true};
        }

        case "commit":
            return append(state, action.value);

        case "jump":
            return {...state, index: Math.max(0, Math.min(action.index, state.entries.length - 1)), editing: false};
    }
}

function readInitialUrl(): string {
    const hash = window.location.hash;
    const queryIndex = hash.indexOf("?");
    if (queryIndex < 0) return "";

    return new URLSearchParams(hash.slice(queryIndex + 1)).get("url") ?? "";
}

/**
 * Reads a `1`/`0` flag from the popup's `#popup?...` query. The backend decides these — the
 * borderless state may have fallen back when the screen cannot do transparent windows — so a missing
 * query means "on".
 */
function readPopupFlag(name: string): boolean {
    const hash = window.location.hash;
    const queryIndex = hash.indexOf("?");
    if (queryIndex < 0) return true;

    return new URLSearchParams(hash.slice(queryIndex + 1)).get(name) !== "0";
}

/** Percent-decodes a value, leaving it untouched when it is not valid encoding. */
function decode(value: string): string {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}

/** The path without its leading slash, decoded the way it is shown. */
function pathFrom(target: URL | null): string {
    return target ? decode(target.pathname).replace(/^\//, "") : "";
}

/* ------------------------------------------------------------------- styled */

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-4px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Root = styled.div<{ $borderless: boolean }>`
    min-height: 100vh;
    background-color: #0b0f19;
    background-image: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.12), transparent 70%);
    color: #f9fafb;
    border-radius: ${(p) => (p.$borderless ? "8px" : "0")};
    box-shadow: ${(p) => (p.$borderless ? "inset 0 0 0 1px rgba(255, 255, 255, 0.12)" : "none")};
    overflow: hidden;
    animation: ${fadeIn} 0.24s cubic-bezier(0.22, 1, 0.36, 1);
`;

const TopBar = styled.div`
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 2px 0 6px;
`;

const CloseButton = styled.button`
    width: 24px;
    height: 20px;
    border-radius: 6px;
    border: none;
    background: transparent;
    color: #6b7280;
    cursor: pointer;
    font-size: 0.85rem;
    line-height: 1;
    transition: background 0.15s ease, color 0.15s ease;

    &:hover {
        background: rgba(239, 68, 68, 0.15);
        color: #f87171;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 12px 12px;
`;

const UrlInput = styled.input<{ $warn?: boolean }>`
    width: 100%;
    height: 34px;
    padding: 0 11px;
    border-radius: 8px;
    border: 1px solid ${(p) => (p.$warn ? "rgba(245, 158, 11, 0.6)" : "rgba(255, 255, 255, 0.12)")};
    background: ${(p) => (p.$warn ? "rgba(245, 158, 11, 0.1)" : "rgba(15, 23, 42, 0.8)")};
    color: #f9fafb;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

    &:focus {
        border-color: ${(p) => (p.$warn ? "#f59e0b" : "#3b82f6")};
        box-shadow: 0 0 0 3px ${(p) => (p.$warn ? "rgba(245, 158, 11, 0.25)" : "rgba(59, 130, 246, 0.25)")};
    }
`;

const HttpWarning = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: -4px;
    color: #fbbf24;
    font-size: 0.74rem;
    animation: ${fadeIn} 0.15s ease;
`;

const Toolbar = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`;

const SmallButton = styled.button`
    min-width: 28px;
    height: 24px;
    padding: 0 6px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: #cbd5e1;
    font-size: 0.72rem;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, transform 0.1s ease;

    &:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.12);
        color: #f9fafb;
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
    }
`;

const StatusPill = styled.button<{ $tone: "idle" | "ok" | "info" | "error" }>`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    height: 30px;
    padding: 0 10px;
    border-radius: 7px;
    cursor: pointer;
    font-size: 0.76rem;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    transition: filter 0.15s ease, transform 0.1s ease;

    &:hover:not(:disabled) {
        filter: brightness(1.35);
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    border: 1px solid ${(p) =>
            p.$tone === "ok"
                    ? "rgba(16, 185, 129, 0.3)"
                    : p.$tone === "info"
                            ? "rgba(59, 130, 246, 0.3)"
                            : p.$tone === "error"
                                    ? "rgba(239, 68, 68, 0.3)"
                                    : "rgba(255, 255, 255, 0.1)"};
    background: ${(p) =>
            p.$tone === "ok"
                    ? "rgba(16, 185, 129, 0.12)"
                    : p.$tone === "info"
                            ? "rgba(59, 130, 246, 0.12)"
                            : p.$tone === "error"
                                    ? "rgba(239, 68, 68, 0.12)"
                                    : "rgba(255, 255, 255, 0.04)"};
    color: ${(p) =>
            p.$tone === "ok"
                    ? "#34d399"
                    : p.$tone === "info"
                            ? "#60a5fa"
                            : p.$tone === "error"
                                    ? "#f87171"
                                    : "#9ca3af"};
`;

const Actions = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 6px;
`;

const ActionButton = styled.button<{ $accent?: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    /* Fixed height so every action keeps the same height as the status pill, whatever the language. */
    height: 30px;
    box-sizing: border-box;
    padding: 0 11px;
    border-radius: 7px;
    border: 1px solid ${(p) => (p.$accent ? "rgba(245, 158, 11, 0.4)" : "rgba(255, 255, 255, 0.1)")};
    background: ${(p) => (p.$accent ? "rgba(245, 158, 11, 0.14)" : "rgba(255, 255, 255, 0.05)")};
    color: ${(p) => (p.$accent ? "#fbbf24" : "#d1d5db")};
    font-size: 0.76rem;
    font-weight: 500;
    line-height: 1;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, transform 0.1s ease;

    &:hover:not(:disabled) {
        background: ${(p) => (p.$accent ? "rgba(245, 158, 11, 0.26)" : "rgba(255, 255, 255, 0.12)")};
        color: #f9fafb;
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

const Section = styled.div`
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    overflow: hidden;
    background: rgba(15, 23, 42, 0.5);
`;

const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 6px 4px 10px;
`;

const SectionToggle = styled.button`
    display: flex;
    align-items: center;
    gap: 7px;
    flex: 1;
    min-width: 0;
    padding: 2px 0;
    border: none;
    background: transparent;
    color: #9ca3af;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    text-align: left;
    transition: color 0.15s ease;

    &:hover {
        color: #f9fafb;
    }
`;

const HeaderAction = styled.button`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    padding: 3px;
    border: none;
    border-radius: 5px;
    background: none;
    color: #6b7280;
    cursor: pointer;
    transition: color 0.15s ease, background 0.15s ease;

    &:hover:not(:disabled) {
        color: #60a5fa;
        background: rgba(255, 255, 255, 0.08);
    }

    &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
    }
`;

const ClearAction = styled(HeaderAction)`
    &:hover:not(:disabled) {
        color: #f87171;
        background: rgba(239, 68, 68, 0.12);
    }
`;

const Chevron = styled.span<{ $open: boolean }>`
    display: inline-block;
    transition: transform 0.15s ease;
    transform: rotate(${(p) => (p.$open ? "90deg" : "0deg")});
    font-size: 0.65rem;
`;

const CountBadge = styled.span`
    background: rgba(255, 255, 255, 0.08);
    color: #cbd5e1;
    border-radius: 9999px;
    padding: 0 7px;
    font-size: 0.68rem;
    font-weight: 600;
    flex-shrink: 0;
`;

const EmptyHint = styled.span`
    padding: 6px 2px;
    color: #6b7280;
    font-size: 0.76rem;
`;

const SectionBody = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 10px 7px;
    animation: ${fadeIn} 0.15s ease;
`;

const Row = styled.div`
    display: flex;
    gap: 10px;
    padding: 4px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    font-family: var(--font-mono);
    font-size: 0.75rem;
`;

const RowKey = styled.span`
    color: #60a5fa;
    flex-shrink: 0;
    min-width: 78px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const RowValue = styled.span`
    color: #cbd5e1;
    flex: 1;
    word-break: break-all;
`;

const HostLink = styled.button`
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    color: #60a5fa;
    text-decoration: underline;
    text-underline-offset: 2px;
    cursor: pointer;
    word-break: break-all;
    transition: color 0.15s ease;

    &:hover {
        color: #93c5fd;
    }
`;

const ParamInput = styled.input`
    background: transparent;
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 2px 5px;
    font-family: inherit;
    font-size: inherit;
    outline: none;
    transition: background 0.15s ease, border-color 0.15s ease;

    &.key {
        color: #60a5fa;
        flex: 0 0 40%;
        min-width: 0;
    }

    &.value {
        color: #cbd5e1;
        flex: 1;
        min-width: 0;
    }

    &:hover {
        border-color: rgba(255, 255, 255, 0.12);
    }

    &:focus {
        border-color: #3b82f6;
        background: rgba(15, 23, 42, 0.9);
    }
`;

const RemoveParam = styled.button`
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 0 2px;
    flex-shrink: 0;
    transition: color 0.15s ease, background 0.15s ease;

    &:hover {
        color: #f87171;
    }
`;

const Footer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    margin-top: 2px;
`;

const SplitButton = styled.div`
    position: relative;
    display: flex;
`;

/** Anchors the "send to device" menu to its button, the way `SplitButton` anchors the browser one. */
const ForwardGroup = styled.div`
    position: relative;
    display: flex;
`;

const OpenButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    /* Fixed height keeps the primary button aligned with the ghost buttons in every language. */
    height: 32px;
    box-sizing: border-box;
    padding: 0 14px;
    border: none;
    border-radius: 8px 0 0 8px;
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
    color: #ffffff;
    font-weight: 600;
    font-size: 0.82rem;
    cursor: pointer;
    box-shadow: 0 0 16px rgba(99, 102, 241, 0.3);
    transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease;

    &:hover:not(:disabled) {
        background: linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%);
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
        box-shadow: none;
    }
`;

const ArrowButton = styled.button`
    width: 30px;
    border: none;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0 8px 8px 0;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: #ffffff;
    cursor: pointer;
    transition: filter 0.15s ease;

    &:hover:not(:disabled) {
        filter: brightness(1.15);
    }

    &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }
`;

const GhostButton = styled(ActionButton)<{ $active?: boolean }>`
    height: 32px;
    border-color: ${(p) => (p.$active ? "rgba(99, 102, 241, 0.5)" : "rgba(255, 255, 255, 0.1)")};
    background: ${(p) => (p.$active ? "rgba(99, 102, 241, 0.22)" : "rgba(255, 255, 255, 0.05)")};
    color: ${(p) => (p.$active ? "#c7d2fe" : "#d1d5db")};

    /* ActionButton's hover rule knows nothing about $active, so it would flatten the active
       background back to the plain white wash. Keep the two states distinguishable. */

    &:hover:not(:disabled) {
        border-color: ${(p) => (p.$active ? "rgba(99, 102, 241, 0.7)" : "rgba(255, 255, 255, 0.1)")};
        background: ${(p) => (p.$active ? "rgba(99, 102, 241, 0.34)" : "rgba(255, 255, 255, 0.12)")};
        color: ${(p) => (p.$active ? "#e0e7ff" : "#f9fafb")};
    }
`;

const Message = styled.div<{ $tone: "error" | "ok" }>`
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 7px 10px;
    border-radius: 7px;
    font-size: 0.76rem;
    background: ${(p) => (p.$tone === "error" ? "rgba(239, 68, 68, 0.12)" : "rgba(16, 185, 129, 0.12)")};
    border: 1px solid ${(p) => (p.$tone === "error" ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)")};
    color: ${(p) => (p.$tone === "error" ? "#f87171" : "#34d399")};
`;

/* ---------------------------------------------------------------- component */

interface SectionState {
    domain: boolean;
    parameters: boolean;
    fragment: boolean;
}

export const PopupPage: React.FC = () => {
    const t = useTranslation();
    const initialUrl = useMemo(readInitialUrl, []);
    const [history, dispatch] = useReducer(historyReducer, {
        entries: [initialUrl],
        index: 0,
        editing: false,
    });
    const url = history.entries[history.index];

    const [browsers, setBrowsers] = useState<BrowserEntry[]>([]);
    const [userAgents, setUserAgents] = useState<UserAgentEntry[]>([]);
    /* Devices this URL can be forwarded to; the button is hidden while the list is empty. */
    const [devices, setDevices] = useState<DeviceEntry[]>([]);
    /* Picked here for this popup only; the settings hold the default. */
    const [userAgentId, setUserAgentId] = useState("");
    const [status, setStatus] = useState<StatusResult | null>(null);
    const [statusBusy, setStatusBusy] = useState(false);
    const [browserMenuOpen, setBrowserMenuOpen] = useState(false);
    const [historyMenuOpen, setHistoryMenuOpen] = useState(false);
    const [forwardMenuOpen, setForwardMenuOpen] = useState(false);
    /* Id of the device the URL was just sent to, so its entry can confirm the send briefly. */
    const [forwardedTo, setForwardedTo] = useState<string | null>(null);
    const [privateMode, setPrivateMode] = useState(false);
    const [copied, setCopied] = useState(false);
    const [borderless] = useState(() => readPopupFlag("borderless"));
    const [autoStrip] = useState(() => readPopupFlag("strip"));
    /* The URL-cleaning rules come from the backend: the embedded list plus every enabled filter list. */
    const [rules, setRules] = useState<CompiledRules | null>(null);

    /**
     * Cleans a URL with the filter lists, but only when the setting asks for it. Untouched URLs are
     * returned as they are, so a URL without tracking parameters is never re-serialized.
     */
    const cleanUrl = (value: string) =>
        autoStrip && rules && trackingParamKeys(value, rules).length > 0
            ? stripTrackingParams(value, rules)
            : value;
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState<SectionState>({domain: false, parameters: false, fragment: false});

    const contentRef = useRef<HTMLDivElement>(null);
    const lastHeight = useRef(0);
    const resizeTimer = useRef<number | undefined>(undefined);
    /* Anchors for the two menus that are not `Dropdown`s, so they stay inside the window too. */
    const historyAnchor = useRef<HTMLDivElement>(null);
    const browserAnchor = useRef<HTMLDivElement>(null);
    const forwardAnchor = useRef<HTMLDivElement>(null);

    const historyMenuStyle = useMenuFit(historyMenuOpen, false, historyAnchor);
    const browserMenuStyle = useMenuFit(browserMenuOpen, true, browserAnchor);
    const forwardMenuStyle = useMenuFit(forwardMenuOpen, true, forwardAnchor);

    const parsed = useMemo(() => {
        try {
            return new URL(url);
        } catch {
            return null;
        }
    }, [url]);

    /* The path edits a draft and applies it on blur, so half-typed input never has to be parsed as
       half a URL. */
    const [pathDraft, setPathDraft] = useState(() => pathFrom(parsed));

    useEffect(() => {
        setPathDraft(pathFrom(parsed));
    }, [parsed]);

    const params = useMemo(
        () => (parsed ? [...parsed.searchParams.entries()].map(([key, value]) => ({key, value})) : []),
        [parsed]
    );

    const fragment = decode(parsed?.hash.replace(/^#/, "") ?? "");
    const isHttp = parsed?.protocol === "http:";
    const defaultBrowser = browsers[0];
    const canOpen = Boolean(parsed) && browsers.length > 0;
    const trackingCount = rules ? trackingParamKeys(url, rules).length : 0;

    /* load the browser and User-Agent lists */
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const payload = await loadSettings();
                if (cancelled) return;
                setBrowsers(payload.settings.browsers);
                setUserAgents(payload.settings.userAgents);
                setUserAgentId(payload.settings.selectedUserAgentId);
                setDevices(payload.settings.devices ?? []);
            } catch {
                // The popup still works without a browser list.
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    /* load the URL-cleaning rules */
    useEffect(() => {
        let cancelled = false;
        loadFilterRules()
            .then((loaded) => {
                if (!cancelled) setRules(compileRules(loaded));
            })
            .catch(() => undefined);

        return () => {
            cancelled = true;
        };
    }, []);

    /* A borderless window is transparent on Linux, so the page must not paint over it. */
    useEffect(() => {
        document.documentElement.classList.toggle("popup-transparent", borderless);
        return () => document.documentElement.classList.remove("popup-transparent");
    }, [borderless]);

    /* a new URL arriving while the popup is open replaces the current one */
    useEffect(() => {
        return Native.on((message) => {
            const event = message as { type?: string; data?: { url?: string } };
            if (event.type === "popup.navigate" && event.data?.url) {
                dispatch({type: "commit", value: event.data.url});
                setStatus(null);
                setError(null);
            }
        });
    }, []);

    /* The backend holds the URL back when it is too long for the start URL, and sends it once we are listening. */
    useEffect(() => {
        Native.send({type: "popup.ready"});
    }, []);

    /* the device list can change while the popup is open, since the settings live in another window */
    useEffect(() => {
        return Native.on((message) => {
            const event = message as { type?: string; data?: { settings?: { devices?: DeviceEntry[] } } };
            if (event.type === "settings.changed" && event.data?.settings)
                setDevices(event.data.settings.devices ?? []);
        });
    }, []);

    /* tracking parameters are stripped as soon as the popup opens, unless the setting turns it off */
    useEffect(() => {
        const cleaned = cleanUrl(initialUrl);
        if (cleaned !== initialUrl) dispatch({type: "commit", value: cleaned});
    }, [initialUrl, autoStrip, rules]);

    /* keep the window sized to its content */
    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        const fit = () => {
            window.clearTimeout(resizeTimer.current);
            resizeTimer.current = window.setTimeout(() => {
                const height = Math.ceil(el.offsetHeight) + 24; // + the top bar
                if (Math.abs(height - lastHeight.current) < 2) return;
                lastHeight.current = height;
                resizePopup(height);
            }, 60);
        };

        const observer = new ResizeObserver(fit);
        observer.observe(el);
        window.addEventListener("resize", fit);

        return () => {
            window.clearTimeout(resizeTimer.current);
            observer.disconnect();
            window.removeEventListener("resize", fit);
        };
    }, []);

    const commit = (value: string) => {
        dispatch({type: "commit", value});
        setStatus(null);
    };

    /* typing edits collapse into a single history entry */
    const applyEdit = (value: string) => {
        dispatch({type: "edit", value});
        setStatus(null);
    };

    const enterBlurs = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") event.currentTarget.blur();
    };

    /* Commits the edited URL, then snaps the draft back to what it really became. */
    const applyPath = () => {
        if (!parsed) return;

        const next = new URL(url);
        next.pathname = `/${pathDraft}`;
        const result = next.toString();
        commit(result);
        setPathDraft(pathFrom(new URL(result)));
    };

    const updateParamAt = (index: number, patch: { key?: string; value?: string }) => {
        if (!parsed) return;

        const entries = [...parsed.searchParams.entries()].map(([key, value], i) =>
            i === index ? {key: patch.key ?? key, value: patch.value ?? value} : {key, value}
        );

        const next = new URL(url);
        next.search = "";
        for (const entry of entries) next.searchParams.append(entry.key, entry.value);

        applyEdit(next.toString());
    };

    const updateFragment = (value: string) => {
        if (!parsed) return;

        const next = new URL(url);
        next.hash = value;
        applyEdit(next.toString());
    };

    const addParam = () => {
        if (!parsed) return;

        const next = new URL(url);
        next.searchParams.append("", "");
        commit(next.toString());
    };

    const clearFragment = () => {
        if (!parsed) return;

        const next = new URL(url);
        next.hash = "";
        commit(next.toString());
    };

    const useOrigin = () => {
        if (!parsed) return;
        commit(`${parsed.origin}/`);
    };

    const handleCheckStatus = async () => {
        setStatusBusy(true);
        setError(null);
        try {
            const result = await checkStatus(url, userAgentId);
            // The pill reports the response's own status — a redirect shows the exact 3xx it is — and
            // the URL box moves straight to the target, with no confirmation.
            if (result.location) {
                // The target is recorded first and cleaned second, exactly like a URL that is opened
                // directly, so the edit history keeps the uncleaned target as its own step.
                dispatch({type: "commit", value: result.location});

                const cleaned = cleanUrl(result.location);
                if (cleaned !== result.location) dispatch({type: "commit", value: cleaned});
            }

            setStatus(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setStatusBusy(false);
        }
    };

    const handleOpen = async (browserId?: string) => {
        setBrowserMenuOpen(false);
        setError(null);
        try {
            await openWithBrowser(url, browserId, privateMode);
            closePopup();
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        }
    };

    const handleCopy = async () => {
        setError(null);
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        }
    };

    const handleForward = async (deviceId: string) => {
        setForwardMenuOpen(false);
        setError(null);
        try {
            await forwardUrl(url, deviceId);
            setForwardedTo(deviceId);
            setTimeout(() => setForwardedTo(null), 1500);
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        }
    };

    const handleRemoveParam = (key: string, value: string) => {
        if (!parsed) return;

        const next = new URL(url);
        const entries = [...next.searchParams.entries()];
        next.search = "";
        for (const [k, v] of entries) {
            if (k === key && v === value) continue;
            next.searchParams.append(k, v);
        }

        commit(next.toString());
    };

    const handleClearParams = () => {
        if (!parsed) return;

        const next = new URL(url);
        next.search = "";
        commit(next.toString());
    };

    const handleUseHttps = () => {
        if (!parsed) return;

        const next = new URL(url);
        next.protocol = "https:";
        commit(next.toString());
    };

    const toggleSection = (key: keyof SectionState) => setOpen((prev) => ({...prev, [key]: !prev[key]}));

    const tone: "idle" | "ok" | "info" | "error" = !status
        ? "idle"
        : status.ok
            ? "ok"
            : status.statusCode >= 300 && status.statusCode < 400
                ? "info"
                : "error";

    /* A followed redirect says so, rather than repeating the server's "Found"/"Moved Permanently". */
    const statusDetail = status?.location
        ? t("popup.redirected")
        : status?.statusText === "error.timeout"
            ? t("error.timeout")
            : status?.statusText;

    const statusText = statusBusy
        ? t("popup.checking")
        : status
            ? `${status.statusCode || "!"} ${statusDetail ?? ""}`.trim()
            : t("popup.checkStatus");

    const StatusIcon = tone === "ok" ? CheckCircleIcon : tone === "error" ? XCircleIcon : AlertTriangleIcon;

    return (
        <Root $borderless={borderless}>
            <TopBar>
                <CloseButton onClick={closePopup} title={t("popup.close")}>
                    ✕
                </CloseButton>
            </TopBar>

            <Content ref={contentRef}>
                <UrlInput
                    type="text"
                    value={url}
                    spellCheck={false}
                    $warn={isHttp}
                    onChange={(e) => applyEdit(e.target.value)}
                    onBlur={() => dispatch({type: "commit", value: url})}
                    placeholder="https://example.com/path?key=value"
                />

                {isHttp && (
                    <HttpWarning>
                        <AlertTriangleIcon size={13}/>
                        <span>{t("popup.httpWarning")}</span>
                    </HttpWarning>
                )}

                {history.entries.length > 1 && (
                    <Toolbar ref={historyAnchor}>
                        <SmallButton onClick={() => dispatch({type: "jump", index: 0})} disabled={history.index === 0}
                                     title={t("popup.first")}>|◀
                        </SmallButton>
                        <SmallButton onClick={() => dispatch({type: "jump", index: history.index - 1})}
                                     disabled={history.index === 0} title={t("popup.back")}>◀
                        </SmallButton>
                        <SmallButton onClick={() => setHistoryMenuOpen((open) => !open)}
                                     title={t("popup.history")}>▾</SmallButton>
                        <SmallButton onClick={() => dispatch({type: "jump", index: history.index + 1})}
                                     disabled={history.index >= history.entries.length - 1}
                                     title={t("popup.forward")}>▶
                        </SmallButton>
                        <SmallButton onClick={() => dispatch({type: "jump", index: history.entries.length - 1})}
                                     disabled={history.index >= history.entries.length - 1}
                                     title={t("popup.last")}>▶|
                        </SmallButton>

                        {historyMenuOpen && (
                            <DropdownMenu $stretch style={historyMenuStyle}>
                                {history.entries.map((entry, index) => (
                                    <DropdownItem
                                        key={`${index}-${entry}`}
                                        $mono
                                        $active={index === history.index}
                                        onClick={() => {
                                            dispatch({type: "jump", index});
                                            setHistoryMenuOpen(false);
                                        }}
                                    >
                                        {entry}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        )}
                    </Toolbar>
                )}

                <Actions>
                    {userAgents.length > 0 && (
                        <Dropdown
                            value={userAgentId}
                            disabled={statusBusy}
                            options={userAgents.map((agent) => ({value: agent.id, label: agent.name}))}
                            onChange={setUserAgentId}
                            title={t("popup.userAgentTooltip")}
                        />
                    )}

                    <StatusPill $tone={tone} onClick={handleCheckStatus} disabled={statusBusy}
                                title={t("popup.checkStatus")}>
                        <StatusIcon size={13}/>
                        <span>{statusText}</span>
                    </StatusPill>

                    <ActionButton onClick={() => rules && commit(stripTrackingParams(url, rules))}
                                  disabled={!parsed || !rules}
                                  title={t("popup.removeTrackingTooltip")}>
                        <TrashIcon size={13}/>
                        {t("popup.tracking")}{trackingCount > 0 ? ` (${trackingCount})` : ""}
                    </ActionButton>

                    {isHttp && (
                        <ActionButton $accent onClick={handleUseHttps}>
                            {t("popup.useHttps")}
                        </ActionButton>
                    )}
                </Actions>

                <Section>
                    <SectionHeader>
                        <SectionToggle onClick={() => toggleSection("domain")}>
                            <Chevron $open={open.domain}>▶</Chevron>
                            <span>{t("popup.domain")}</span>
                        </SectionToggle>
                    </SectionHeader>
                    {open.domain && (
                        <SectionBody>
                            <Row>
                                <RowKey>{t("popup.scheme")}</RowKey>
                                <RowValue>{parsed?.protocol.replace(/:$/, "") ?? "(none)"}</RowValue>
                            </Row>
                            <Row>
                                <RowKey>{t("popup.host")}</RowKey>
                                <RowValue>
                                    {parsed ? (
                                        <HostLink onClick={useOrigin} title={t("popup.hostTooltip")}>
                                            {decode(parsed.host)}
                                        </HostLink>
                                    ) : (
                                        "(none)"
                                    )}
                                </RowValue>
                            </Row>
                            <Row>
                                <RowKey>{t("popup.path")}</RowKey>
                                <ParamInput
                                    className="value"
                                    spellCheck={false}
                                    placeholder={t("popup.empty")}
                                    value={pathDraft}
                                    disabled={!parsed}
                                    onChange={(e) => setPathDraft(e.target.value)}
                                    onBlur={applyPath}
                                    onKeyDown={enterBlurs}
                                />
                            </Row>
                        </SectionBody>
                    )}
                </Section>

                <Section>
                    <SectionHeader>
                        <SectionToggle onClick={() => toggleSection("parameters")}>
                            <Chevron $open={open.parameters}>▶</Chevron>
                            <span>{t("popup.parameters")}</span>
                        </SectionToggle>
                        <CountBadge>{params.length}</CountBadge>
                        <HeaderAction title={t("popup.addParameter")} onClick={addParam} disabled={!parsed}>
                            <PlusIcon size={14}/>
                        </HeaderAction>
                        <ClearAction
                            title={t("popup.removeAllParameters")}
                            onClick={handleClearParams}
                            disabled={!parsed || params.length === 0}
                        >
                            <TrashIcon size={13}/>
                        </ClearAction>
                    </SectionHeader>
                    {open.parameters && (
                        <SectionBody>
                            {params.length === 0 && <EmptyHint>{t("popup.noParameters")}</EmptyHint>}
                            {params.map((param, index) => (
                                <Row key={index}>
                                    <ParamInput
                                        className="key"
                                        title={t("popup.parameterName")}
                                        value={param.key}
                                        onChange={(e) => updateParamAt(index, {key: e.target.value})}
                                    />
                                    <ParamInput
                                        className="value"
                                        title={t("popup.parameterValue")}
                                        placeholder={t("popup.empty")}
                                        value={param.value}
                                        onChange={(e) => updateParamAt(index, {value: e.target.value})}
                                    />
                                    <RemoveParam
                                        title={t("popup.removeParameter")}
                                        onClick={() => handleRemoveParam(param.key, param.value)}
                                    >
                                        <TrashIcon size={12}/>
                                    </RemoveParam>
                                </Row>
                            ))}
                        </SectionBody>
                    )}
                </Section>

                <Section>
                    <SectionHeader>
                        <SectionToggle onClick={() => toggleSection("fragment")}>
                            <Chevron $open={open.fragment}>▶</Chevron>
                            <span>{t("popup.fragment")}</span>
                        </SectionToggle>
                        <ClearAction
                            title={t("popup.removeFragment")}
                            onClick={clearFragment}
                            disabled={!parsed || fragment.length === 0}
                        >
                            <TrashIcon size={13}/>
                        </ClearAction>
                    </SectionHeader>
                    {open.fragment && (
                        <SectionBody>
                            <Row>
                                <RowKey>#</RowKey>
                                <ParamInput
                                    className="value"
                                    title={t("popup.fragmentTooltip")}
                                    placeholder={t("popup.empty")}
                                    value={fragment}
                                    onChange={(e) => updateFragment(e.target.value)}
                                />
                            </Row>
                        </SectionBody>
                    )}
                </Section>

                {error && (
                    <Message $tone="error">
                        <AlertTriangleIcon size={13}/>
                        <span>{t(error)}</span>
                    </Message>
                )}

                <Footer>
                    <SplitButton ref={browserAnchor}>
                        <OpenButton disabled={!canOpen} onClick={() => handleOpen()}>
                            <ShieldCheckIcon size={14}/>
                            <span>{t("popup.open", {browser: defaultBrowser?.name ?? t("popup.openFallback")})}</span>
                        </OpenButton>
                        <ArrowButton
                            disabled={browsers.length === 0}
                            onClick={() => setBrowserMenuOpen((open) => !open)}
                            title={t("popup.chooseBrowser")}
                        >
                            ▾
                        </ArrowButton>
                        {browserMenuOpen && (
                            <DropdownMenu $up style={browserMenuStyle}>
                                {browsers.map((browser) => (
                                    <DropdownItem key={browser.id} onClick={() => handleOpen(browser.id)}>
                                        {browser.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        )}
                    </SplitButton>

                    <GhostButton $active={privateMode} onClick={() => setPrivateMode((value) => !value)}
                                 title={t("popup.privateTooltip")}>
                        <LockIcon size={13}/>
                        {t("popup.private")}
                    </GhostButton>

                    {devices.length > 0 && (
                        <ForwardGroup ref={forwardAnchor}>
                            <GhostButton onClick={() => setForwardMenuOpen((open) => !open)}
                                         disabled={!parsed}
                                         title={t("popup.sendToTooltip")}>
                                <SendIcon size={13}/>
                                {t("popup.sendTo")}
                                <Caret $open={forwardMenuOpen}>▾</Caret>
                            </GhostButton>
                            {forwardMenuOpen && (
                                <DropdownMenu $up
                                              style={{...forwardMenuStyle, left: "auto", right: 0, maxWidth: 280}}>
                                    {devices.map((device) => (
                                        <DropdownItem key={device.id} onClick={() => handleForward(device.id)}>
                                            {forwardedTo === device.id
                                                ? t("popup.sent")
                                                : device.name || device.host}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            )}
                        </ForwardGroup>
                    )}

                    <GhostButton onClick={handleCopy} disabled={!parsed}>
                        <CopyIcon size={13}/>
                        {copied ? t("popup.copied") : t("popup.copy")}
                    </GhostButton>
                </Footer>
            </Content>
        </Root>
    );
};
