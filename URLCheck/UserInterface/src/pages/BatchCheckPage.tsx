import React, { useState } from "react";
import styled from "styled-components";
import { BatchItem } from "../types";
import {
  PlayIcon,
  TrashIcon,
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
  background: rgba(17, 24, 39, 0.75);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled(Card)<{ $accent?: string }>`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-left: 4px solid ${(props) => props.$accent || "#3b82f6"};
`;

const StatLabel = styled.span`
  font-size: 0.8rem;
  color: #9ca3af;
  font-weight: 600;
`;

const StatNumber = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  color: #f9fafb;
`;

const InputSection = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 14px 16px;
  font-size: 0.9rem;
  font-family: monospace;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.75);
  color: #f9fafb;
  outline: none;
  resize: vertical;
  line-height: 1.5;
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

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PrimaryButton = styled.button`
  padding: 10px 20px;
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.35);

  &:hover {
    background: linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%);
    box-shadow: 0 0 24px rgba(99, 102, 241, 0.5);
  }
`;

const SecondaryButton = styled.button`
  padding: 10px 16px;
  background: rgba(15, 23, 42, 0.7);
  color: #9ca3af;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(31, 41, 55, 0.85);
    color: #f9fafb;
    border-color: rgba(99, 102, 241, 0.35);
  }
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 6px;
`;

const FilterChip = styled.button<{ $active: boolean }>`
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid ${(props) => (props.$active ? "rgba(99, 102, 241, 0.5)" : "rgba(255, 255, 255, 0.08)")};
  background: ${(props) => (props.$active ? "rgba(59, 130, 246, 0.15)" : "rgba(15, 23, 42, 0.7)")};
  color: ${(props) => (props.$active ? "#60a5fa" : "#9ca3af")};
  font-size: 0.8rem;
  font-weight: ${(props) => (props.$active ? "600" : "500")};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: ${(props) => (props.$active ? "rgba(59, 130, 246, 0.2)" : "rgba(31, 41, 55, 0.85)")};
    color: ${(props) => (props.$active ? "#93c5fd" : "#f9fafb")};
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
  border: 1px solid
    ${(props) =>
      props.$status === "success"
        ? "rgba(16, 185, 129, 0.3)"
        : props.$status === "warning"
        ? "rgba(245, 158, 11, 0.3)"
        : "rgba(239, 68, 68, 0.3)"};
`;

const defaultBatchInput = `https://www.google.com
https://api.github.com
https://httpbin.org/status/404
https://httpbin.org/status/500
https://example.org`;

const initialBatchItems: BatchItem[] = [
  { id: "1", url: "https://www.google.com", status: "success", statusCode: 200, latency: 38, message: "OK (HTTPS Valid)" },
  { id: "2", url: "https://api.github.com", status: "success", statusCode: 200, latency: 65, message: "OK (REST API)" },
  { id: "3", url: "https://httpbin.org/status/404", status: "warning", statusCode: 404, latency: 120, message: "Not Found" },
  { id: "4", url: "https://httpbin.org/status/500", status: "error", statusCode: 500, latency: 210, message: "Internal Server Error" },
  { id: "5", url: "https://example.org", status: "success", statusCode: 200, latency: 45, message: "OK" },
];

export const BatchCheckPage: React.FC = () => {
  const [inputText, setInputText] = useState(defaultBatchInput);
  const [items, setItems] = useState<BatchItem[]>(initialBatchItems);
  const [filter, setFilter] = useState<"all" | "success" | "warning" | "error">("all");

  const handleStartScan = () => {
    const urls = inputText
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    const generated: BatchItem[] = urls.map((u, idx) => {
      let isInvalid = false;
      try {
        new URL(u);
      } catch {
        isInvalid = true;
      }

      if (isInvalid) {
        return {
          id: String(idx + 1),
          url: u,
          status: "error",
          statusCode: 400,
          latency: 0,
          message: "Invalid URL format",
        };
      }

      if (u.includes("404")) {
        return {
          id: String(idx + 1),
          url: u,
          status: "warning",
          statusCode: 404,
          latency: Math.floor(Math.random() * 80) + 60,
          message: "Not Found",
        };
      }
      if (u.includes("500")) {
        return {
          id: String(idx + 1),
          url: u,
          status: "error",
          statusCode: 500,
          latency: Math.floor(Math.random() * 100) + 120,
          message: "Internal Server Error",
        };
      }

      return {
        id: String(idx + 1),
        url: u,
        status: "success",
        statusCode: 200,
        latency: Math.floor(Math.random() * 40) + 25,
        message: "OK (200)",
      };
    });

    setItems(generated);
  };

  const handleClear = () => {
    setInputText("");
    setItems([]);
  };

  const successCount = items.filter((i) => i.status === "success").length;
  const warningCount = items.filter((i) => i.status === "warning").length;
  const errorCount = items.filter((i) => i.status === "error").length;

  const filteredItems = items.filter((i) => {
    if (filter === "all") return true;
    return i.status === filter;
  });

  return (
    <PageContainer>
      <StatsGrid>
        <StatCard $accent="#3b82f6">
          <StatLabel>Total Inspected</StatLabel>
          <StatNumber>{items.length}</StatNumber>
        </StatCard>
        <StatCard $accent="#10b981">
          <StatLabel>Successful (2xx)</StatLabel>
          <StatNumber style={{ color: "#34d399" }}>{successCount}</StatNumber>
        </StatCard>
        <StatCard $accent="#f59e0b">
          <StatLabel>Warning / Redirect (3xx/4xx)</StatLabel>
          <StatNumber style={{ color: "#fbbf24" }}>{warningCount}</StatNumber>
        </StatCard>
        <StatCard $accent="#ef4444">
          <StatLabel>Error / Failure (5xx/Err)</StatLabel>
          <StatNumber style={{ color: "#f87171" }}>{errorCount}</StatNumber>
        </StatCard>
      </StatsGrid>

      <InputSection>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "#f9fafb" }}>
            Enter Batch URL List (One URL per line)
          </span>
          <span style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
            {inputText.split("\n").filter((l) => l.trim()).length} URLs entered
          </span>
        </div>

        <StyledTextarea
          placeholder="https://example1.com&#10;https://example2.com&#10;https://example3.com"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <ActionsRow>
          <ButtonGroup>
            <PrimaryButton onClick={handleStartScan}>
              <PlayIcon size={14} />
              <span>Start Batch Scan</span>
            </PrimaryButton>
            <SecondaryButton onClick={handleClear}>
              <TrashIcon size={16} />
              <span>Clear List</span>
            </SecondaryButton>
          </ButtonGroup>

          <FilterTabs>
            <FilterChip $active={filter === "all"} onClick={() => setFilter("all")}>
              All ({items.length})
            </FilterChip>
            <FilterChip $active={filter === "success"} onClick={() => setFilter("success")}>
              Success ({successCount})
            </FilterChip>
            <FilterChip $active={filter === "warning"} onClick={() => setFilter("warning")}>
              Warning ({warningCount})
            </FilterChip>
            <FilterChip $active={filter === "error"} onClick={() => setFilter("error")}>
              Error ({errorCount})
            </FilterChip>
          </FilterTabs>
        </ActionsRow>
      </InputSection>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th style={{ width: "60px" }}>#</th>
              <th>Target URL</th>
              <th style={{ width: "120px" }}>Status Code</th>
              <th style={{ width: "120px" }}>Latency</th>
              <th style={{ width: "200px" }}>Diagnosis</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td style={{ color: "#6b7280", fontFamily: "monospace" }}>{idx + 1}</td>
                  <td style={{ fontFamily: "monospace", wordBreak: "break-all" }}>{item.url}</td>
                  <td>
                    <StatusBadge $status={item.status}>
                      {item.status === "success" && <CheckCircleIcon size={14} />}
                      {item.status === "warning" && <AlertTriangleIcon size={14} />}
                      {item.status === "error" && <XCircleIcon size={14} />}
                      <span>{item.statusCode}</span>
                    </StatusBadge>
                  </td>
                  <td style={{ color: "#9ca3af", fontFamily: "monospace" }}>
                    {item.latency > 0 ? `${item.latency} ms` : "-"}
                  </td>
                  <td style={{ color: "#cbd5e1", fontSize: "0.85rem" }}>{item.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "36px", color: "#6b7280" }}>
                  No matching inspection results found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
    </PageContainer>
  );
};
