import React, {useEffect, useMemo, useReducer, useRef, useState} from "react";
import styled from "styled-components";
import {BrowserEntry} from "../types";
import {loadSettings} from "../api/settings";
import {openWithBrowser} from "../api/browsers";
import {checkStatus, unshorten, type StatusResult} from "../api/inspect";
import {closePopup, resizePopup} from "../api/system";
import {stripTrackingParams, trackingParamKeys} from "../data/trackingParams";
import {Native} from "../Native";
import {AlertTriangleIcon, CheckCircleIcon, CopyIcon, ShieldCheckIcon, TrashIcon, XCircleIcon} from "../components/Icons";

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

/* ------------------------------------------------------------------- styled */

const Root = styled.div`
    position: relative;
    min-height: 100vh;
    background-color: #0b0f19;
    background-image: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.12), transparent 70%);
    color: #f9fafb;
`;

const DragBar = styled.div`
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 6px;
`;

const CloseButton = styled.button`
    width: 24px;
    height: 22px;
    border-radius: 6px;
    border: none;
    background: transparent;
    color: #6b7280;
    cursor: pointer;
    font-size: 0.9rem;
    line-height: 1;

    &:hover {
        background: rgba(239, 68, 68, 0.15);
        color: #f87171;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 14px 14px;
`;

const UrlInput = styled.textarea`
    width: 100%;
    min-height: 62px;
    resize: vertical;
    padding: 10px 12px;
    border-radius: 9px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(15, 23, 42, 0.8);
    color: #f9fafb;
    font-family: monospace;
    font-size: 0.82rem;
    line-height: 1.5;
    outline: none;
    word-break: break-all;

    &:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
    }
`;

const HistoryBar = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
`;

const SmallButton = styled.button`
    min-width: 30px;
    height: 26px;
    padding: 0 7px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: #cbd5e1;
    font-size: 0.78rem;
    cursor: pointer;

    &:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.12);
        color: #f9fafb;
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

const HistoryMenu = styled.div`
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    right: 0;
    max-height: 220px;
    overflow-y: auto;
    background: #111827;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    padding: 5px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
    z-index: 30;
`;

const HistoryItem = styled.button<{ $active: boolean }>`
    display: block;
    width: 100%;
    text-align: left;
    padding: 7px 9px;
    border: none;
    border-radius: 6px;
    background: ${(p) => (p.$active ? "rgba(59, 130, 246, 0.2)" : "transparent")};
    color: ${(p) => (p.$active ? "#ffffff" : "#cbd5e1")};
    font-family: monospace;
    font-size: 0.74rem;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
        background: rgba(59, 130, 246, 0.15);
        color: #ffffff;
    }
`;

const StatusRow = styled.button<{ $tone: "idle" | "ok" | "info" | "error" }>`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 9px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.82rem;
    font-weight: 500;
    text-align: left;
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

const ActionRow = styled.div`
    display: flex;
    gap: 8px;
`;

const ActionButton = styled.button`
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: #d1d5db;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;

    &:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.12);
        color: #f9fafb;
    }

    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }
`;

const HttpsButton = styled(ActionButton)`
    flex: none;
    width: 100%;
    border-color: rgba(99, 102, 241, 0.35);
    background: rgba(99, 102, 241, 0.14);
    color: #a5b4fc;
`;

const Section = styled.div`
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 9px;
    overflow: hidden;
    background: rgba(15, 23, 42, 0.5);
`;

const SectionHeader = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 12px;
    border: none;
    background: transparent;
    color: #9ca3af;
    font-size: 0.76rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;

    &:hover {
        color: #f9fafb;
    }
`;

const Chevron = styled.span<{ $open: boolean }>`
    display: inline-block;
    transition: transform 0.15s ease;
    transform: rotate(${(p) => (p.$open ? "90deg" : "0deg")});
    font-size: 0.7rem;
`;

const CountBadge = styled.span`
    margin-left: auto;
    background: rgba(255, 255, 255, 0.08);
    color: #cbd5e1;
    border-radius: 9999px;
    padding: 1px 8px;
    font-size: 0.7rem;
    font-weight: 600;
`;

const SectionBody = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 12px 10px;
`;

const Row = styled.div`
    display: flex;
    gap: 10px;
    padding: 5px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    font-family: monospace;
    font-size: 0.78rem;
`;

const RowKey = styled.span`
    color: #60a5fa;
    flex-shrink: 0;
    min-width: 84px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const RowValue = styled.span`
    color: #cbd5e1;
    flex: 1;
    word-break: break-all;
`;

const RemoveParam = styled.button`
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 0 2px;
    flex-shrink: 0;

    &:hover {
        color: #f87171;
    }
`;

const Footer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
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
    padding: 9px 16px;
    border: none;
    border-radius: 8px 0 0 8px;
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
    color: #ffffff;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    box-shadow: 0 0 16px rgba(99, 102, 241, 0.3);

    &:hover:not(:disabled) {
        background: linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%);
    }

    &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
        box-shadow: none;
    }
`;

const ArrowButton = styled.button`
    width: 32px;
    border: none;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0 8px 8px 0;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: #ffffff;
    cursor: pointer;

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
    padding: 8px 10px;
    border: none;
    border-radius: 6px;
    background: none;
    color: #e2e8f0;
    font-size: 0.82rem;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
        background: rgba(59, 130, 246, 0.18);
        color: #ffffff;
    }
`;

const GhostButton = styled(ActionButton)`
    flex: none;
`;

const Message = styled.div<{ $tone: "error" | "ok" }>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 11px;
    border-radius: 8px;
    font-size: 0.78rem;
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
    const [unshortBusy, setUnshortBusy] = useState(false);
    const [browserMenuOpen, setBrowserMenuOpen] = useState(false);
    const [historyMenuOpen, setHistoryMenuOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [openedIn, setOpenedIn] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState<SectionState>({domain: true, parameters: true, fragment: true});

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

    const fragment = parsed?.hash.replace(/^#/, "") ?? "";
    const isHttps = parsed?.protocol === "https:";
    const defaultBrowser = browsers[0];
    const canOpen = Boolean(parsed) && browsers.length > 0;

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

        const observer = new ResizeObserver(() => {
            window.clearTimeout(resizeTimer.current);
            resizeTimer.current = window.setTimeout(() => {
                const height = Math.ceil(el.offsetHeight);
                if (Math.abs(height - lastHeight.current) < 2) return;
                lastHeight.current = height;
                resizePopup(height);
            }, 60);
        });

        observer.observe(el);
        return () => {
            window.clearTimeout(resizeTimer.current);
            observer.disconnect();
        };
    }, []);

    const commit = (value: string) => {
        dispatch({type: "commit", value});
        setStatus(null);
        setOpenedIn(null);
    };

    const handleUnshort = async () => {
        setUnshortBusy(true);
        setError(null);
        try {
            const target = await unshorten(url);
            if (target) commit(target);
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setUnshortBusy(false);
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
        setOpenedIn(null);
        try {
            await openWithBrowser(url, browserId);
            setOpenedIn(browsers.find((b) => b.id === browserId)?.name ?? defaultBrowser?.name ?? "browser");
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

    const handleStripTracking = () => commit(stripTrackingParams(url));

    const handleUseHttps = () => {
        if (!parsed) return;

        const next = new URL(url);
        next.protocol = "https:";
        commit(next.toString());
    };

    const toggleSection = (key: keyof SectionState) => setOpen((prev) => ({...prev, [key]: !prev[key]}));

    const trackingCount = trackingParamKeys(url).length;
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
                : "Tap to check the status code";

    const StatusIcon = tone === "ok" ? CheckCircleIcon : tone === "error" ? XCircleIcon : AlertTriangleIcon;

    return (
        <Root>
            <DragBar onMouseDown={() => Native.send({type: "window.drag"})}>
                <CloseButton onMouseDown={(e) => e.stopPropagation()} onClick={closePopup} title="Close">
                    ✕
                </CloseButton>
            </DragBar>

            <Content ref={contentRef}>
                <UrlInput
                    value={url}
                    spellCheck={false}
                    onChange={(e) => dispatch({type: "edit", value: e.target.value})}
                    onBlur={() => dispatch({type: "commit", value: url})}
                    placeholder="https://example.com/path?key=value"
                />

                <HistoryBar>
                    <SmallButton onClick={() => dispatch({type: "jump", index: 0})} disabled={history.index === 0}
                                 title="First">|◀
                    </SmallButton>
                    <SmallButton onClick={() => dispatch({type: "jump", index: history.index - 1})}
                                 disabled={history.index === 0} title="Back">◀
                    </SmallButton>
                    <SmallButton onClick={() => setHistoryMenuOpen((open) => !open)}
                                 title="History">▾
                    </SmallButton>
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
                </HistoryBar>

                <StatusRow $tone={tone} onClick={handleCheckStatus} disabled={statusBusy}>
                    <StatusIcon size={15}/>
                    <span>{statusText}</span>
                </StatusRow>

                <ActionRow>
                    <ActionButton onClick={handleUnshort} disabled={unshortBusy || !parsed}>
                        <span>{unshortBusy ? "Resolving…" : "Unshort"}</span>
                    </ActionButton>
                    <ActionButton onClick={handleStripTracking} disabled={!parsed}>
                        <TrashIcon size={14}/>
                        <span>{trackingCount > 0 ? `Remove tracking (${trackingCount})` : "Remove tracking"}</span>
                    </ActionButton>
                </ActionRow>

                <ActionButton onClick={handleClearParams} disabled={!parsed || params.length === 0}>
                    <TrashIcon size={14}/>
                    <span>{params.length > 0 ? `Remove all parameters (${params.length})` : "Remove all parameters"}</span>
                </ActionButton>

                <Section>
                    <SectionHeader onClick={() => toggleSection("domain")}>
                        <Chevron $open={open.domain}>▶</Chevron>
                        <span>Domain</span>
                    </SectionHeader>
                    {open.domain && (
                        <SectionBody>
                            <Row>
                                <RowKey>scheme</RowKey>
                                <RowValue>{parsed?.protocol.replace(/:$/, "") ?? "(none)"}</RowValue>
                            </Row>
                            <Row>
                                <RowKey>host</RowKey>
                                <RowValue>{parsed?.host ?? "(none)"}</RowValue>
                            </Row>
                        </SectionBody>
                    )}
                </Section>

                {params.length > 0 && (
                    <Section>
                        <SectionHeader onClick={() => toggleSection("parameters")}>
                            <Chevron $open={open.parameters}>▶</Chevron>
                            <span>Parameters</span>
                            <CountBadge>{params.length}</CountBadge>
                        </SectionHeader>
                        {open.parameters && (
                            <SectionBody>
                                {params.map((param, index) => (
                                    <Row key={`${param.key}-${param.value}-${index}`}>
                                        <RowKey title={param.key}>{param.key}</RowKey>
                                        <RowValue>{param.value || "(empty)"}</RowValue>
                                        <RemoveParam
                                            title="Remove parameter"
                                            onClick={() => handleRemoveParam(param.key, param.value)}
                                        >
                                            <TrashIcon size={13}/>
                                        </RemoveParam>
                                    </Row>
                                ))}
                            </SectionBody>
                        )}
                    </Section>
                )}

                {fragment && (
                    <Section>
                        <SectionHeader onClick={() => toggleSection("fragment")}>
                            <Chevron $open={open.fragment}>▶</Chevron>
                            <span>Fragment</span>
                        </SectionHeader>
                        {open.fragment && (
                            <SectionBody>
                                <Row>
                                    <RowKey>#</RowKey>
                                    <RowValue>{fragment}</RowValue>
                                </Row>
                            </SectionBody>
                        )}
                    </Section>
                )}

                {parsed && !isHttps && (
                    <HttpsButton onClick={handleUseHttps}>
                        <span>Use https://</span>
                    </HttpsButton>
                )}

                {error && (
                    <Message $tone="error">
                        <AlertTriangleIcon size={14}/>
                        <span>{error}</span>
                    </Message>
                )}

                {openedIn && (
                    <Message $tone="ok">
                        <CheckCircleIcon size={14}/>
                        <span>Opened in {openedIn}</span>
                    </Message>
                )}

                <Footer>
                    <SplitButton>
                        <OpenButton disabled={!canOpen} onClick={() => handleOpen()}>
                            <ShieldCheckIcon size={15}/>
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

                    <GhostButton onClick={handleCopy} disabled={!parsed}>
                        <CopyIcon size={14}/>
                        <span>{copied ? "Copied!" : "Copy"}</span>
                    </GhostButton>

                    <GhostButton disabled title="Sharing is not available on Windows yet">
                        <span>Share</span>
                    </GhostButton>
                </Footer>
            </Content>
        </Root>
    );
};
