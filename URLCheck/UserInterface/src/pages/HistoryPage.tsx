import React, {useState} from "react";
import styled from "styled-components";
import {HistoryItem} from "../types";
import {AlertTriangleIcon, CheckCircleIcon, SearchIcon, TrashIcon, XCircleIcon,} from "../components/Icons";
import {Card, PageContainer} from "../components/Layout";

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

    &:hover {
        background: rgba(239, 68, 68, 0.25);
        color: #fca5a5;
        border-color: rgba(239, 68, 68, 0.5);
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
    }

    tr:last-child td {
        border-bottom: none;
    }

    tr:hover td {
        background: rgba(255, 255, 255, 0.02);
    }
`;

const StatusBadge = styled.span<{ $status: string }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    background: ${(props) =>
            props.$status === "success"
                    ? "rgba(16, 185, 129, 0.12)"
                    : props.$status === "warning"
                            ? "rgba(245, 158, 11, 0.12)"
                            : "rgba(239, 68, 68, 0.12)"};
    color: ${(props) =>
            props.$status === "success"
                    ? "#34d399"
                    : props.$status === "warning"
                            ? "#fbbf24"
                            : "#f87171"};
    border: 1px solid ${(props) =>
            props.$status === "success"
                    ? "rgba(16, 185, 129, 0.3)"
                    : props.$status === "warning"
                            ? "rgba(245, 158, 11, 0.3)"
                            : "rgba(239, 68, 68, 0.3)"};
`;

const initialHistory: HistoryItem[] = [
    {
        id: "1",
        url: "https://api.github.com/repos/tryphotino/photino.NET",
        status: "success",
        statusCode: 200,
        timestamp: "2026-09-28 02:10:15"
    },
    {
        id: "2",
        url: "https://www.google.com/search?q=photino+net",
        status: "success",
        statusCode: 200,
        timestamp: "2026-09-28 02:08:33"
    },
    {
        id: "3",
        url: "https://httpbin.org/status/404",
        status: "warning",
        statusCode: 404,
        timestamp: "2026-09-28 02:05:12"
    },
    {
        id: "4",
        url: "https://invalid-domain-test.local",
        status: "error",
        statusCode: 400,
        timestamp: "2026-09-28 01:58:40"
    },
    {id: "5", url: "https://example.org", status: "success", statusCode: 200, timestamp: "2026-09-28 01:45:21"},
];

export const HistoryPage: React.FC = () => {
    const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
    const [keyword, setKeyword] = useState("");

    const filteredHistory = history.filter((item) =>
        item.url.toLowerCase().includes(keyword.toLowerCase())
    );

    const handleClearHistory = () => {
        setHistory([]);
    };

    return (
        <PageContainer>
            <ControlsCard>
                <SearchWrapper>
                    <SearchIcon size={18}/>
                    <SearchInput
                        type="text"
                        placeholder="Search history by URL..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </SearchWrapper>

                <DangerButton onClick={handleClearHistory}>
                    <TrashIcon size={15}/>
                    <span>Clear All Logs</span>
                </DangerButton>
            </ControlsCard>

            <TableContainer>
                <Table>
                    <thead>
                    <tr>
                        <th style={{width: "180px"}}>Timestamp</th>
                        <th>Target URL</th>
                        <th style={{width: "140px"}}>Status Response</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredHistory.length > 0 ? (
                        filteredHistory.map((item) => (
                            <tr key={item.id}>
                                <td style={{color: "#9ca3af", fontSize: "0.85rem"}}>{item.timestamp}</td>
                                <td style={{fontFamily: "monospace", wordBreak: "break-all"}}>{item.url}</td>
                                <td>
                                    <StatusBadge $status={item.status}>
                                        {item.status === "success" && <CheckCircleIcon size={14}/>}
                                        {item.status === "warning" && <AlertTriangleIcon size={14}/>}
                                        {item.status === "error" && <XCircleIcon size={14}/>}
                                        <span>{item.statusCode}</span>
                                    </StatusBadge>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} style={{textAlign: "center", padding: "36px", color: "#6b7280"}}>
                                No inspection history recorded yet
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </TableContainer>
        </PageContainer>
    );
};
