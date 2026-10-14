import React, {useEffect, useMemo, useRef, useState} from "react";
import styled from "styled-components";
import {BrowserEntry} from "../types";
import {loadSettings} from "../api/settings";
import {detectBrowsers, openWithBrowser} from "../api/browsers";
import {closePopup} from "../api/system";
import {Native} from "../Native";
import {AlertTriangleIcon, CheckCircleIcon, CopyIcon, ShieldCheckIcon, TrashIcon} from "../components/Icons";

const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100vh;
  padding: 18px 20px 20px;
  background-color: #0b0f19;
  background-image: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.12), transparent 70%);
  color: #f9fafb;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BrandMark = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
  color: #ffffff;
  box-shadow: 0 0 16px rgba(99, 102, 241, 0.35);
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
`;

const BrandTitle = styled.span`
  font-size: 0.95rem;
  font-weight: 700;
`;

const BrandSubtitle = styled.span`
  font-size: 0.72rem;
  color: #9ca3af;
  font-family: monospace;
  max-width: 320px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const IconButton = styled.button`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #9ca3af;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  line-height: 1;

  &:hover {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
    border-color: rgba(239, 68, 68, 0.3);
  }
`;

const UrlInput = styled.textarea`
  width: 100%;
  min-height: 70px;
  resize: vertical;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(15, 23, 42, 0.8);
  color: #f9fafb;
  font-family: monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  outline: none;
  word-break: break-all;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SectionTitle = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9ca3af;
`;

const ParamList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 260px;
  overflow-y: auto;
  padding-right: 2px;
`;

const ParamRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.07);
`;

const ParamKey = styled.span`
  font-family: monospace;
  font-size: 0.8rem;
  font-weight: 600;
  color: #60a5fa;
  flex-shrink: 0;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ParamValue = styled.span`
  font-family: monospace;
  font-size: 0.8rem;
  color: #cbd5e1;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  padding: 3px;
  border-radius: 6px;
  flex-shrink: 0;

  &:hover {
    color: #f87171;
    background: rgba(239, 68, 68, 0.12);
  }
`;

const EmptyState = styled.div`
  padding: 18px;
  text-align: center;
  font-size: 0.8rem;
  color: #6b7280;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
`;

const SplitButton = styled.div`
  position: relative;
  display: flex;
`;

const MainButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: none;
  border-radius: 8px 0 0 8px;
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 0 18px rgba(99, 102, 241, 0.3);

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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
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

const Menu = styled.div`
  position: absolute;
  bottom: calc(100% + 6px);
  left: 0;
  min-width: 220px;
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 6px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
  z-index: 20;
`;

const MenuItem = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 9px 12px;
  border: none;
  border-radius: 7px;
  background: none;
  color: #e2e8f0;
  font-size: 0.85rem;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background: rgba(59, 130, 246, 0.18);
    color: #ffffff;
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: #d1d5db;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #f9fafb;
  }
`;

const Message = styled.div<{ $tone: "error" | "ok" }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px;
  border-radius: 8px;
  font-size: 0.8rem;
  background: ${(props) => (props.$tone === "error" ? "rgba(239, 68, 68, 0.12)" : "rgba(16, 185, 129, 0.12)")};
  border: 1px solid ${(props) => (props.$tone === "error" ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)")};
  color: ${(props) => (props.$tone === "error" ? "#f87171" : "#34d399")};
`;

const Hint = styled.span`
  font-size: 0.78rem;
  color: #6b7280;
`;

function readInitialUrl(): string {
    const hash = window.location.hash;
    const queryIndex = hash.indexOf("?");
    if (queryIndex < 0) return "";

    const params = new URLSearchParams(hash.slice(queryIndex + 1));
    return params.get("url") ?? "";
}

interface Param {
    key: string;
    value: string;
}

export const PopupPage: React.FC = () => {
    const [url, setUrl] = useState(readInitialUrl);
    const [browsers, setBrowsers] = useState<BrowserEntry[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openedIn, setOpenedIn] = useState<string | null>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const payload = await loadSettings();
                let list = payload.settings.browsers;

                // First run: fall back to auto-detection so the popup is usable immediately.
                if (list.length === 0) {
                    list = await detectBrowsers();
                }

                if (!cancelled) setBrowsers(list);
            } catch {
                // Ignore: the popup still works without a browser list.
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    // A new URL arriving while the popup is open navigates it instead of stacking windows.
    useEffect(() => {
        return Native.on((message) => {
            const event = message as { type?: string; data?: { url?: string } };
            if (event.type === "popup.navigate" && event.data?.url) {
                setUrl(event.data.url);
                setError(null);
            }
        });
    }, []);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const parsed = useMemo(() => {
        try {
            return new URL(url);
        } catch {
            return null;
        }
    }, [url]);

    const params = useMemo<Param[]>(() => {
        if (!parsed) return [];
        return Array.from(parsed.searchParams.entries()).map(([key, value]) => ({key, value}));
    }, [parsed]);

    const removeParamAt = (index: number) => {
        if (!parsed) return;

        const entries = Array.from(parsed.searchParams.entries());
        entries.splice(index, 1);

        const next = new URL(url);
        next.search = "";
        for (const [key, value] of entries) {
            next.searchParams.append(key, value);
        }

        setUrl(next.toString());
    };

    const clearParams = () => {
        if (!parsed) return;

        const next = new URL(url);
        next.search = "";
        setUrl(next.toString());
    };

    const handleOpen = async (browserId?: string) => {
        setMenuOpen(false);
        setError(null);
        setOpenedIn(null);

        try {
            await openWithBrowser(url, browserId);
            const name = browsers.find((b) => b.id === browserId)?.name ?? browsers[0]?.name ?? "browser";
            setOpenedIn(name);
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

    const defaultBrowser = browsers[0];
    const canOpen = Boolean(parsed) && browsers.length > 0;

    return (
        <PopupContainer>
            <TopBar>
                <Brand>
                    <BrandMark>
                        <ShieldCheckIcon size={18}/>
                    </BrandMark>
                    <BrandText>
                        <BrandTitle>URLCheck</BrandTitle>
                        <BrandSubtitle>{parsed?.host || "Intercepted URL"}</BrandSubtitle>
                    </BrandText>
                </Brand>
                <IconButton onClick={closePopup} title="Close">
                    ✕
                </IconButton>
            </TopBar>

            <UrlInput
                ref={inputRef}
                value={url}
                spellCheck={false}
                onChange={(e) => {
                    setUrl(e.target.value);
                    setOpenedIn(null);
                }}
                placeholder="https://example.com/path?key=value"
            />

            {error && (
                <Message $tone="error">
                    <AlertTriangleIcon size={15}/>
                    <span>{error}</span>
                </Message>
            )}

            {openedIn && (
                <Message $tone="ok">
                    <CheckCircleIcon size={15}/>
                    <span>Opened in {openedIn}</span>
                </Message>
            )}

            <SectionHeader>
                <SectionTitle>Query parameters ({params.length})</SectionTitle>
                {params.length > 0 && (
                    <SecondaryButton onClick={clearParams}>
                        <TrashIcon size={14}/>
                        <span>Clear all</span>
                    </SecondaryButton>
                )}
            </SectionHeader>

            {params.length > 0 ? (
                <ParamList>
                    {params.map((param, index) => (
                        <ParamRow key={`${param.key}-${param.value}-${index}`}>
                            <ParamKey title={param.key}>{param.key}</ParamKey>
                            <ParamValue title={param.value}>{param.value || "(empty)"}</ParamValue>
                            <RemoveButton onClick={() => removeParamAt(index)} title="Remove parameter">
                                <TrashIcon size={15}/>
                            </RemoveButton>
                        </ParamRow>
                    ))}
                </ParamList>
            ) : (
                <EmptyState>No query parameters in this URL</EmptyState>
            )}

            <Actions>
                <SplitButton>
                    <MainButton disabled={!canOpen} onClick={() => handleOpen()}>
                        <ShieldCheckIcon size={16}/>
                        <span>Open in {defaultBrowser?.name ?? "browser"}</span>
                    </MainButton>
                    <ArrowButton
                        disabled={browsers.length === 0}
                        onClick={() => setMenuOpen((open) => !open)}
                        title="Choose browser"
                    >
                        ▾
                    </ArrowButton>
                    {menuOpen && (
                        <Menu>
                            {browsers.map((browser) => (
                                <MenuItem key={browser.id} onClick={() => handleOpen(browser.id)}>
                                    {browser.name}
                                </MenuItem>
                            ))}
                        </Menu>
                    )}
                </SplitButton>

                <SecondaryButton onClick={handleCopy}>
                    <CopyIcon size={15}/>
                    <span>{copied ? "Copied!" : "Copy"}</span>
                </SecondaryButton>

                {browsers.length === 0 && <Hint>No browser configured — add one in Settings.</Hint>}
            </Actions>
        </PopupContainer>
    );
};
