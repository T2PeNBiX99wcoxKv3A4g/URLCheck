import React, { useState } from "react";
import styled from "styled-components";
import { HistoryItem } from "../types";
import {
  TrashIcon,
  SearchIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  XCircleIcon,
} from "../components/Icons";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

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
    stroke: #94a3b8;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 14px 10px 42px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #f8fafc;
  font-size: 0.9rem;
  outline: none;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    background: #ffffff;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
`;

const DangerButton = styled.button`
  padding: 10px 16px;
  background: #fee2e2;
  color: #b91c1c;
  border: 1px solid #fecaca;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #fecaca;
    color: #991b1b;
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
    background: #f8fafc;
    color: #64748b;
    font-weight: 600;
    font-size: 0.8rem;
    border-bottom: 1px solid #e2e8f0;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  td {
    padding: 14px 18px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background: #fafafa;
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
      ? "#ecfdf5"
      : props.$status === "warning"
      ? "#fffbeb"
      : "#fef2f2"};
  color: ${(props) =>
    props.$status === "success"
      ? "#059669"
      : props.$status === "warning"
      ? "#d97706"
      : "#dc2626"};
  border: 1px solid
    ${(props) =>
      props.$status === "success"
        ? "#a7f3d0"
        : props.$status === "warning"
        ? "#fde68a"
        : "#fecaca"};
`;

const TypeTag = styled.span`
  background: #f1f5f9;
  color: #475569;
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 500;
`;

const initialHistory: HistoryItem[] = [
  { id: "1", url: "https://api.github.com/repos/tryphotino/photino.NET", type: "single", status: "success", statusCode: 200, timestamp: "2026-09-28 02:10:15" },
  { id: "2", url: "https://www.google.com/search?q=photino+net", type: "single", status: "success", statusCode: 200, timestamp: "2026-09-28 02:08:33" },
  { id: "3", url: "https://httpbin.org/status/404", type: "batch", status: "warning", statusCode: 404, timestamp: "2026-09-28 02:05:12" },
  { id: "4", url: "https://invalid-domain-test.local", type: "single", status: "error", statusCode: 400, timestamp: "2026-09-28 01:58:40" },
  { id: "5", url: "https://example.org", type: "batch", status: "success", statusCode: 200, timestamp: "2026-09-28 01:45:21" },
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
          <SearchIcon size={18} />
          <SearchInput
            type="text"
            placeholder="Search history by URL..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </SearchWrapper>

        <DangerButton onClick={handleClearHistory}>
          <TrashIcon size={15} />
          <span>Clear All Logs</span>
        </DangerButton>
      </ControlsCard>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th style={{ width: "180px" }}>Timestamp</th>
              <th style={{ width: "120px" }}>Mode</th>
              <th>Target URL</th>
              <th style={{ width: "140px" }}>Status Response</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <tr key={item.id}>
                  <td style={{ color: "#64748b", fontSize: "0.85rem" }}>{item.timestamp}</td>
                  <td>
                    <TypeTag>{item.type === "single" ? "Single Check" : "Batch Scan"}</TypeTag>
                  </td>
                  <td style={{ fontFamily: "monospace", wordBreak: "break-all" }}>{item.url}</td>
                  <td>
                    <StatusBadge $status={item.status}>
                      {item.status === "success" && <CheckCircleIcon size={14} />}
                      {item.status === "warning" && <AlertTriangleIcon size={14} />}
                      {item.status === "error" && <XCircleIcon size={14} />}
                      <span>{item.statusCode}</span>
                    </StatusBadge>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "36px", color: "#94a3b8" }}>
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
