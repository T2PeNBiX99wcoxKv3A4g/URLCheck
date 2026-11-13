import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {HistoryItem} from "../types";
import {AlertTriangleIcon, SearchIcon, TrashIcon} from "../components/Icons";
import {Card, PageContainer} from "../components/Layout";
import {type LocalizationKey, Native, useLocale, useTranslation} from "@photino-net-utils/bridge";
import {clearHistory, listHistory} from "../api/history";
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
        stroke: var(--text-secondary);
    }
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 10px 14px 10px 42px;
    border: 1px solid var(--border-strong);
    border-radius: 8px;
    background: var(--input);
    color: var(--text-primary);
    font-size: 0.9rem;
    outline: none;
    font-family: inherit;
    transition: all 0.2s ease;

    &:focus {
        background: var(--input-focus);
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
    }

    &::placeholder {
        color: var(--text-muted);
    }
`;

const DangerButton = styled.button`
    padding: 10px 16px;
    background: rgba(239, 68, 68, 0.15);
    color: var(--danger);
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
        color: var(--danger);
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
        background: var(--surface-soft);
        color: var(--text-secondary);
        font-weight: 600;
        font-size: 0.8rem;
        border-bottom: 1px solid var(--border);
        text-transform: uppercase;
        letter-spacing: 0.03em;
    }

    td {
        padding: 14px 18px;
        border-bottom: 1px solid var(--border-faint);
        color: var(--text-strong);
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
        box-shadow: inset 3px 0 0 0 var(--link);
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
    color: var(--link);
    text-align: left;
    word-break: break-all;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.15s ease;

    &:hover {
        color: var(--accent-soft);
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
    color: var(--danger);
    font-size: 0.85rem;
`;

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

    /* The backend pushes `history.changed` whenever a URL is recorded or the history is cleared. */
    useEffect(() => {
        let cancelled = false;
        let timer: number | undefined;

        const reload = async () => {
            try {
                const entries = await listHistory();
                if (!cancelled) setHistory(entries);
            } catch {
                // Keep the current list; the next change tries again.
            }
        };

        const unsubscribe = Native.on((message) => {
            if ((message as { type?: string }).type !== "history.changed") return;

            // A burst of records collapses into a single reload.
            window.clearTimeout(timer);
            timer = window.setTimeout(() => {
                void reload();
            }, 150);
        });

        return () => {
            cancelled = true;
            window.clearTimeout(timer);
            unsubscribe();
        };
    }, []);

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
                    <span>{t(error as LocalizationKey)}</span>
                </ErrorBanner>
            )}

            <ControlsCard>
                <SearchWrapper>
                    <SearchIcon size={18}/>
                    <SearchInput
                        type="text"
                        placeholder={t("history.search_placeholder")}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </SearchWrapper>

                <DangerButton onClick={handleClearHistory} disabled={history.length === 0}>
                    <TrashIcon size={15}/>
                    <span>{t("history.clear_all")}</span>
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
                            <tr key={item.id} data-history-url={item.url}>
                                <td style={{color: "var(--text-secondary)", fontSize: "0.85rem"}}>
                                    {formatTimestamp(item.timestamp, locale)}
                                </td>
                                <UrlCell>
                                    <UrlLink
                                        onClick={() => handleOpen(item.url)}
                                        title={t("history.open_tooltip")}
                                    >
                                        {item.url}
                                    </UrlLink>
                                </UrlCell>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2} style={{textAlign: "center", padding: "36px", color: "var(--text-muted)"}}>
                                {loading ? t("history.loading") : t("history.empty")}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </TableContainer>
        </PageContainer>
    );
};
