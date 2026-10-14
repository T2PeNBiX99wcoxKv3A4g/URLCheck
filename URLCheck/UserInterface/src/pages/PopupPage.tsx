import React, {useEffect, useMemo, useReducer, useRef, useState} from "react";
import styled, {keyframes} from "styled-components";
import {BrowserEntry} from "../types";
import {loadSettings} from "../api/settings";
import {openWithBrowser} from "../api/browsers";
import {checkStatus, followRedirect, type StatusResult} from "../api/inspect";
import {closePopup, resizePopup} from "../api/system";
import {stripTrackingParams, trackingParamKeys} from "../data/trackingParams";
import {Native} from "../Native";
import {
    AlertTriangleIcon,
    CheckCircleIcon,
    CopyIcon,
    LockIcon,
    PlusIcon,
    RedirectIcon,
    ShieldCheckIcon,
    TrashIcon,
    XCircleIcon,
} from "../components/Icons";

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

/** Percent-decodes a value, leaving it untouched when it is not valid encoding. */
function decode(value: string): string {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
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

const Root = styled.div`
    min-height: 100vh;
    background-color: #0b0f19;
    background-image: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.12), transparent 70%);
    color: #f9fafb;
    border-radius: 8px;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
    overflow: hidden;
`;

const TopBar = styled.div`
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 6px;
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
    font-family: monospace;
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

const HistoryMenu = styled.div`
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    right: 0;
    max-height: 200px;
    overflow-y: auto;
    background: #111827;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 9px;
    padding: 5px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
    z-index: 30;
`;

const HistoryItem = styled.button<{ $active: boolean }>`
    display: block;
    width: 100%;
    text-align: left;
    padding: 6px 8px;
    border: none;
    border-radius: 6px;
    background: ${(p) => (p.$active ? "rgba(59, 130, 246, 0.2)" : "transparent")};
    color: ${(p) => (p.$active ? "#ffffff" : "#cbd5e1")};
    font-family: monospace;
    font-size: 0.72rem;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: background 0.15s ease, color 0.15s ease;

    &:hover {
        background: rgba(59, 130, 246, 0.15);
        color: #ffffff;
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
    white-space: nowrap;
    transition: filter 0.15s ease, transform 0.1s ease;

    &:hover:not(:disabled) {
        filter: brightness(1.35);
        transform: translateY(-1px);
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }
    border: 1px solid
        ${(p) =>
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
    justify-content: center;
    gap: 6px;
`;

const ActionButton = styled.button<{ $accent?: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 7px 11px;
    border-radius: 7px;
    border: 1px solid
        ${(p) => (p.$accent ? "rgba(245, 158, 11, 0.4)" : "rgba(255, 255, 255, 0.1)")};
    background: ${(p) => (p.$accent ? "rgba(245, 158, 11, 0.14)" : "rgba(255, 255, 255, 0.05)")};
    color: ${(p) => (p.$accent ? "#fbbf24" : "#d1d5db")};
    font-size: 0.76rem;
    font-weight: 500;
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
    font-family: monospace;
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

const OpenButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
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

const BrowserMenu = styled.div`
    position: absolute;
    bottom: calc(100% + 6px);
    left: 0;
    min-width: 200px;
    background: #111827;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    padding: 5px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
    z-index: 30;
`;

const BrowserMenuItem = styled.button`
    display: block;
    width: 100%;
    text-align: left;
    padding: 7px 9px;
    border: none;
    border-radius: 6px;
    background: none;
    color: #e2e8f0;
    font-size: 0.8rem;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
        background: rgba(59, 130, 246, 0.18);
        color: #ffffff;
    }
`;

const GhostButton = styled(ActionButton)<{ $active?: boolean }>`
    border-color: ${(p) => (p.$active ? "rgba(99, 102, 241, 0.5)" : "rgba(255, 255, 255, 0.1)")};
    background: ${(p) => (p.$active ? "rgba(99, 102, 241, 0.22)" : "rgba(255, 255, 255, 0.05)")};
    color: ${(p) => (p.$active ? "#c7d2fe" : "#d1d5db")};
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
    const initialUrl = useMemo(readInitialUrl, []);
    const [history, dispatch] = useReducer(historyReducer, {
        entries: [initialUrl],
        index: 0,
        editing: false,
    });
    const url = history.entries[history.index];

    const [browsers, setBrowsers] = useState<BrowserEntry[]>([]);
    const [status, setStatus] = useState<StatusResult | null>(null);
    const [statusBusy, setStatusBusy] = useState(false);
    const [redirectBusy, setRedirectBusy] = useState(false);
    const [browserMenuOpen, setBrowserMenuOpen] = useState(false);
    const [historyMenuOpen, setHistoryMenuOpen] = useState(false);
    const [privateMode, setPrivateMode] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState<SectionState>({domain: false, parameters: false, fragment: false});

    const contentRef = useRef<HTMLDivElement>(null);
    const lastHeight = useRef(0);
    const resizeTimer = useRef<number | undefined>(undefined);

    const parsed = useMemo(() => {
        try {
            return new URL(url);
        } catch {
            return null;
        }
    }, [url]);

    const params = useMemo(
        () => (parsed ? [...parsed.searchParams.entries()].map(([key, value]) => ({key, value})) : []),
        [parsed]
    );

    const fragment = decode(parsed?.hash.replace(/^#/, "") ?? "");
    const isHttp = parsed?.protocol === "http:";
    const defaultBrowser = browsers[0];
    const canOpen = Boolean(parsed) && browsers.length > 0;
    const trackingCount = trackingParamKeys(url).length;

    /* load the browser list */
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const payload = await loadSettings();
                if (!cancelled) setBrowsers(payload.settings.browsers);
            } catch {
                // The popup still works without a browser list.
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

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

    /* tracking parameters are stripped as soon as the popup opens */
    useEffect(() => {
        const stripped = stripTrackingParams(initialUrl);
        if (stripped !== initialUrl) dispatch({type: "commit", value: stripped});
    }, [initialUrl]);

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

    const handleFollowRedirect = async () => {
        setRedirectBusy(true);
        setError(null);
        try {
            const target = await followRedirect(url);
            if (target) commit(target);
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setRedirectBusy(false);
        }
    };

    const handleCheckStatus = async () => {
        setStatusBusy(true);
        setError(null);
        try {
            setStatus(await checkStatus(url));
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

    const statusText = statusBusy
        ? "Checking…"
        : status
                ? `${status.statusCode || "!"} ${status.statusText}`.trim()
                : "Check status";

    const StatusIcon = tone === "ok" ? CheckCircleIcon : tone === "error" ? XCircleIcon : AlertTriangleIcon;

    return (
        <Root>
            <TopBar>
                <CloseButton onClick={closePopup} title="Close">
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
                        <span>Insecure http:// — switch to https</span>
                    </HttpWarning>
                )}

                {history.entries.length > 1 && (
                <Toolbar>
                    <SmallButton onClick={() => dispatch({type: "jump", index: 0})} disabled={history.index === 0}
                                 title="First">|◀
                    </SmallButton>
                    <SmallButton onClick={() => dispatch({type: "jump", index: history.index - 1})}
                                 disabled={history.index === 0} title="Back">◀
                    </SmallButton>
                    <SmallButton onClick={() => setHistoryMenuOpen((open) => !open)} title="History">▾</SmallButton>
                    <SmallButton onClick={() => dispatch({type: "jump", index: history.index + 1})}
                                 disabled={history.index >= history.entries.length - 1} title="Forward">▶
                    </SmallButton>
                    <SmallButton onClick={() => dispatch({type: "jump", index: history.entries.length - 1})}
                                 disabled={history.index >= history.entries.length - 1} title="Last">▶|
                    </SmallButton>

                    {historyMenuOpen && (
                        <HistoryMenu>
                            {history.entries.map((entry, index) => (
                                <HistoryItem
                                    key={`${index}-${entry}`}
                                    $active={index === history.index}
                                    onClick={() => {
                                        dispatch({type: "jump", index});
                                        setHistoryMenuOpen(false);
                                    }}
                                >
                                    {entry}
                                </HistoryItem>
                            ))}
                        </HistoryMenu>
                    )}
                </Toolbar>
                )}

                <Actions>
                    <StatusPill $tone={tone} onClick={handleCheckStatus} disabled={statusBusy} title="Check status">
                        <StatusIcon size={13}/>
                        <span>{statusText}</span>
                    </StatusPill>

                    <ActionButton onClick={handleFollowRedirect} disabled={redirectBusy || !parsed} title="Follow the next redirect">
                        <RedirectIcon size={13}/>
                        {redirectBusy ? "Resolving…" : "Redirect"}
                    </ActionButton>

                    <ActionButton onClick={() => commit(stripTrackingParams(url))} disabled={!parsed}>
                        <TrashIcon size={13}/>
                        Tracking{trackingCount > 0 ? ` (${trackingCount})` : ""}
                    </ActionButton>

                    {isHttp && (
                        <ActionButton $accent onClick={handleUseHttps}>
                            Use https
                        </ActionButton>
                    )}
                </Actions>

                <Section>
                    <SectionHeader>
                        <SectionToggle onClick={() => toggleSection("domain")}>
                            <Chevron $open={open.domain}>▶</Chevron>
                            <span>Domain</span>
                        </SectionToggle>
                    </SectionHeader>
                    {open.domain && (
                        <SectionBody>
                            <Row>
                                <RowKey>scheme</RowKey>
                                <RowValue>{parsed?.protocol.replace(/:$/, "") ?? "(none)"}</RowValue>
                            </Row>
                            <Row>
                                <RowKey>host</RowKey>
                                <RowValue>
                                    {parsed ? (
                                        <HostLink onClick={useOrigin} title="Replace the URL with just this host">
                                            {parsed.host}
                                        </HostLink>
                                    ) : (
                                        "(none)"
                                    )}
                                </RowValue>
                            </Row>
                        </SectionBody>
                    )}
                </Section>

                <Section>
                    <SectionHeader>
                        <SectionToggle onClick={() => toggleSection("parameters")}>
                            <Chevron $open={open.parameters}>▶</Chevron>
                            <span>Parameters</span>
                        </SectionToggle>
                        <CountBadge>{params.length}</CountBadge>
                        <HeaderAction title="Add parameter" onClick={addParam} disabled={!parsed}>
                            <PlusIcon size={14}/>
                        </HeaderAction>
                        <ClearAction
                            title="Remove all parameters"
                            onClick={handleClearParams}
                            disabled={!parsed || params.length === 0}
                        >
                            <TrashIcon size={13}/>
                        </ClearAction>
                    </SectionHeader>
                    {open.parameters && (
                        <SectionBody>
                            {params.length === 0 && <EmptyHint>No parameters</EmptyHint>}
                            {params.map((param, index) => (
                                <Row key={index}>
                                    <ParamInput
                                        className="key"
                                        title="Parameter name"
                                        value={param.key}
                                        onChange={(e) => updateParamAt(index, {key: e.target.value})}
                                    />
                                    <ParamInput
                                        className="value"
                                        title="Parameter value (decoded)"
                                        placeholder="(empty)"
                                        value={param.value}
                                        onChange={(e) => updateParamAt(index, {value: e.target.value})}
                                    />
                                    <RemoveParam
                                        title="Remove parameter"
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
                            <span>Fragment</span>
                        </SectionToggle>
                        <ClearAction
                            title="Remove fragment"
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
                                    title="Fragment (decoded)"
                                    placeholder="(empty)"
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
                        <span>{error}</span>
                    </Message>
                )}

                <Footer>
                    <SplitButton>
                        <OpenButton disabled={!canOpen} onClick={() => handleOpen()}>
                            <ShieldCheckIcon size={14}/>
                            <span>Open in {defaultBrowser?.name ?? "browser"}</span>
                        </OpenButton>
                        <ArrowButton
                            disabled={browsers.length === 0}
                            onClick={() => setBrowserMenuOpen((open) => !open)}
                            title="Choose browser"
                        >
                            ▾
                        </ArrowButton>
                        {browserMenuOpen && (
                            <BrowserMenu>
                                {browsers.map((browser) => (
                                    <BrowserMenuItem key={browser.id} onClick={() => handleOpen(browser.id)}>
                                        {browser.name}
                                    </BrowserMenuItem>
                                ))}
                            </BrowserMenu>
                        )}
                    </SplitButton>

                    <GhostButton $active={privateMode} onClick={() => setPrivateMode((value) => !value)}
                                 title="Open in a private/incognito window">
                        <LockIcon size={13}/>
                        Private
                    </GhostButton>

                    <GhostButton onClick={handleCopy} disabled={!parsed}>
                        <CopyIcon size={13}/>
                        {copied ? "Copied!" : "Copy"}
                    </GhostButton>
                </Footer>
            </Content>
        </Root>
    );
};
