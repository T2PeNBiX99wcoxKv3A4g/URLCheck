import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {HistoryItem} from "../types";
import {AlertTriangleIcon, CheckCircleIcon, SearchIcon, TrashIcon} from "../components/Icons";
import {Card, PageContainer} from "../components/Layout";
import {useLocale, useTranslation} from "../i18n";
import {clearHistory, listHistory} from "../api/history";
import {addAutoRedirect} from "../api/settings";
import {showPopup} from "../api/system";

const ControlsCard = styled(Card)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
`;

const SearchWrapper = styled.div`
    position: relative;
    flex: 1;
    max-width: 400px;
    display: flex;
    align-items: center;

    svg {
        position: absolute;
        left: 14px;
        stroke: #9ca3af;
    }
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 10px 14px 10px 42px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    background: rgba(15, 23, 42, 0.75);
    color: #f9fafb;
    font-size: 0.9rem;
    outline: none;
    font-family: inherit;
    transition: all 0.2s ease;

    &:focus {
        background: rgba(15, 23, 42, 0.95);
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
    }

    &::placeholder {
        color: #6b7280;
    }
`;

const DangerButton = styled.button`
    padding: 10px 16px;
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 8px;
    font-weight: 500;
    font-size: 0.85rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
        background: rgba(239, 68, 68, 0.25);
        color: #fca5a5;
        border-color: rgba(239, 68, 68, 0.5);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const TableContainer = styled(Card)`
    padding: 0;
    overflow: hidden;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;

    th {
        text-align: left;
        padding: 12px 18px;
        background: rgba(15, 23, 42, 0.7);
        color: #9ca3af;
        font-weight: 600;
        font-size: 0.8rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        text-transform: uppercase;
        letter-spacing: 0.03em;
    }

    td {
        padding: 14px 18px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        color: #e2e8f0;
        transition: background 0.2s ease, box-shadow 0.2s ease;
    }

    /* Starting value for the accent bar so it slides in instead of popping. */

    td:first-child {
        box-shadow: inset 0 0 0 0 rgba(96, 165, 250, 0);
    }

    tr:last-child td {
        border-bottom: none;
    }

    tr:hover td {
        background: rgba(59, 130, 246, 0.09);
    }

    tr:hover td:first-child {
        box-shadow: inset 3px 0 0 0 #60a5fa;
    }
`;

const UrlCell = styled.td`
    word-break: break-all;
`;

const UrlLink = styled.button`
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    font-family: var(--font-mono);
    color: #60a5fa;
    text-align: left;
    word-break: break-all;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.15s ease;

    &:hover {
        color: #93c5fd;
    }
`;

const ErrorBanner = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 8px;
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #f87171;
    font-size: 0.85rem;
`;

const NoticeBanner = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 8px;
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #34d399;
    font-size: 0.85rem;
`;

/** The app's own right-click menu; the web view's built-in one is disabled. */
const ContextMenu = styled.div`
    position: fixed;
    z-index: 1000;
    min-width: 200px;
    padding: 4px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(15, 23, 42, 0.98);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(12px);
`;

const ContextItem = styled.button`
    display: block;
    width: 100%;
    padding: 8px 10px;
    border: none;
    border-radius: 7px;
    background: none;
    color: #e2e8f0;
    font-size: 0.85rem;
    text-align: left;
    cursor: pointer;
    font-family: inherit;

    &:hover {
        background: rgba(59, 130, 246, 0.18);
        color: #f9fafb;
    }
`;

interface HistoryMenu {
    x: number;
    y: number;
    url: string;
}

/** Renders an epoch-milliseconds timestamp in the app's language (local time zone). */
function formatTimestamp(value: number, locale: string): string {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString(locale);
}

export const HistoryPage: React.FC = () => {
    const t = useTranslation();
    const locale = useLocale();
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [menu, setMenu] = useState<HistoryMenu | null>(null);
    const [notice, setNotice] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const entries = await listHistory();
                if (!cancelled) setHistory(entries);
            } catch (err) {
                if (!cancelled) setError(err instanceof Error ? err.message : String(err));
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const filteredHistory = history.filter((item) => item.url.toLowerCase().includes(keyword.toLowerCase()));

    /* Any click, scroll, Escape or another right-click closes the custom menu. */
    useEffect(() => {
        if (!menu) return;

        const close = () => setMenu(null);
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenu(null);
        };

        window.addEventListener("click", close);
        window.addEventListener("contextmenu", close);
        window.addEventListener("scroll", close, true);
        window.addEventListener("keydown", onKey);

        return () => {
            window.removeEventListener("click", close);
            window.removeEventListener("contextmenu", close);
            window.removeEventListener("scroll", close, true);
            window.removeEventListener("keydown", onKey);
        };
    }, [menu]);

    const flashNotice = (message: string) => {
        setNotice(message);
        window.setTimeout(() => setNotice(null), 1800);
    };

    const openMenu = (event: React.MouseEvent, url: string) => {
        event.preventDefault();
        event.stopPropagation();
        setMenu({
            x: Math.min(event.clientX, window.innerWidth - 220),
            y: Math.min(event.clientY, window.innerHeight - 96),
            url,
        });
    };

    const handleCopy = async (url: string) => {
        setMenu(null);
        setError(null);
        try {
            await navigator.clipboard.writeText(url);
            flashNotice(t("popup.copied"));
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        }
    };

    const handleAddAutoRedirect = async (url: string) => {
        setMenu(null);
        setError(null);
        try {
            await addAutoRedirect(url);
            flashNotice(t("history.autoRedirectAdded"));
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        }
    };

    const handleOpen = async (target: string) => {
        setError(null);
        try {
            await showPopup(target);
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        }
    };

    const handleClearHistory = async () => {
        setError(null);
        try {
            await clearHistory();
            setHistory([]);
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        }
    };

    return (
        <PageContainer>
            {error && (
                <ErrorBanner>
                    <AlertTriangleIcon size={16}/>
                    <span>{t(error)}</span>
                </ErrorBanner>
            )}

            {notice && (
                <NoticeBanner>
                    <CheckCircleIcon size={16}/>
                    <span>{notice}</span>
                </NoticeBanner>
            )}

            <ControlsCard>
                <SearchWrapper>
                    <SearchIcon size={18}/>
                    <SearchInput
                        type="text"
                        placeholder={t("history.searchPlaceholder")}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </SearchWrapper>

                <DangerButton onClick={handleClearHistory} disabled={history.length === 0}>
                    <TrashIcon size={15}/>
                    <span>{t("history.clearAll")}</span>
                </DangerButton>
            </ControlsCard>

            <TableContainer>
                <Table>
                    <thead>
                    <tr>
                        <th style={{width: "200px"}}>{t("history.timestamp")}</th>
                        <th>{t("history.url")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredHistory.length > 0 ? (
                        filteredHistory.map((item) => (
                            <tr key={item.id} onContextMenu={(event) => openMenu(event, item.url)}>
                                <td style={{color: "#9ca3af", fontSize: "0.85rem"}}>
                                    {formatTimestamp(item.timestamp, locale)}
                                </td>
                                <UrlCell>
                                    <UrlLink
                                        onClick={() => handleOpen(item.url)}
                                        title={t("history.openTooltip")}
                                    >
                                        {item.url}
                                    </UrlLink>
                                </UrlCell>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2} style={{textAlign: "center", padding: "36px", color: "#6b7280"}}>
                                {loading ? t("history.loading") : t("history.empty")}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </TableContainer>

            {menu && (
                <ContextMenu style={{left: menu.x, top: menu.y}}>
                    <ContextItem type="button" onClick={() => handleCopy(menu.url)}>
                        {t("history.copy")}
                    </ContextItem>
                    <ContextItem type="button" onClick={() => handleAddAutoRedirect(menu.url)}>
                        {t("history.addAutoRedirect")}
                    </ContextItem>
                </ContextMenu>
            )}
        </PageContainer>
    );
};
