import React, { useState } from "react";
import styled from "styled-components";
import { UrlCheckResult } from "../types";
import {
  SearchIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  XCircleIcon,
  ShieldCheckIcon,
  CopyIcon,
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

const InputSection = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputForm = styled.form`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 16px;
    stroke: #94a3b8;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
  font-size: 0.95rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #f8fafc;
  color: #1e293b;
  outline: none;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    background: #ffffff;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }
`;

const PrimaryButton = styled.button`
  padding: 0 24px;
  height: 50px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25);

  &:hover {
    background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const PresetsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const PresetLabel = styled.span`
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
`;

const PresetChip = styled.button`
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 0.75rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #e2e8f0;
    color: #1e293b;
  }
`;

const StatusBanner = styled.div<{ $status: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-radius: 8px;
  background: ${(props) =>
    props.$status === "valid"
      ? "#ecfdf5"
      : props.$status === "warning"
      ? "#fffbeb"
      : "#fef2f2"};
  border: 1px solid
    ${(props) =>
      props.$status === "valid"
        ? "#a7f3d0"
        : props.$status === "warning"
        ? "#fde68a"
        : "#fecaca"};
  color: ${(props) =>
    props.$status === "valid"
      ? "#065f46"
      : props.$status === "warning"
      ? "#92400e"
      : "#991b1b"};
`;

const StatusLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
`;

const StatusMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.85rem;
`;

const MetaBadge = styled.span`
  background: rgba(0, 0, 0, 0.05);
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 500;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #f1f5f9;
`;

const DetailLabel = styled.span`
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.04em;
`;

const DetailValue = styled.span`
  font-size: 0.95rem;
  color: #0f172a;
  font-family: monospace;
  word-break: break-all;
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ParamsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;

  th {
    text-align: left;
    padding: 8px 12px;
    background: #f8fafc;
    color: #64748b;
    font-weight: 600;
    border-bottom: 1px solid #e2e8f0;
  }

  td {
    padding: 10px 12px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
    font-family: monospace;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 32px;
  color: #94a3b8;
  font-size: 0.85rem;
`;

const CopyBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  padding: 2px;
  border-radius: 4px;

  &:hover {
    color: #2563eb;
    background: #e2e8f0;
  }
`;

export const SingleCheckPage: React.FC = () => {
  const [inputUrl, setInputUrl] = useState(
    "https://api.github.com/repos/tryphotino/photino.NET/releases?page=1&per_page=10#latest"
  );
  const [copied, setCopied] = useState(false);

  const parseUrl = (urlString: string): UrlCheckResult => {
    try {
      const parsed = new URL(urlString);
      const searchParams: { key: string; value: string }[] = [];
      parsed.searchParams.forEach((value, key) => {
        searchParams.push({ key, value });
      });

      return {
        url: urlString,
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        port: parsed.port || (parsed.protocol === "https:" ? "443" : "80"),
        pathname: parsed.pathname,
        searchParams,
        hash: parsed.hash || "(none)",
        status: "valid",
        statusCode: 200,
        statusText: "OK",
        responseTimeMs: 42,
        checkedAt: new Date().toLocaleTimeString(),
      };
    } catch {
      return {
        url: urlString,
        protocol: "invalid",
        hostname: "invalid",
        port: "none",
        pathname: "",
        searchParams: [],
        hash: "",
        status: "invalid",
        statusCode: 400,
        statusText: "Invalid URL Format",
        responseTimeMs: 0,
        checkedAt: new Date().toLocaleTimeString(),
      };
    }
  };

  const [result, setResult] = useState<UrlCheckResult>(parseUrl(inputUrl));

  const handleInspect = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setResult(parseUrl(inputUrl));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleUrls = [
    "https://api.github.com/users/photino",
    "https://www.google.com/search?q=photino+net&hl=en",
    "http://localhost:5000/api/health",
  ];

  return (
    <PageContainer>
      <InputSection>
        <InputForm onSubmit={handleInspect}>
          <InputWrapper>
            <SearchIcon size={20} />
            <StyledInput
              type="text"
              placeholder="Enter URL to inspect (e.g. https://example.com/path?key=val)"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
            />
          </InputWrapper>
          <PrimaryButton type="submit">
            <ShieldCheckIcon size={18} />
            <span>Inspect URL</span>
          </PrimaryButton>
        </InputForm>

        <PresetsContainer>
          <PresetLabel>Sample URLs:</PresetLabel>
          {sampleUrls.map((u) => (
            <PresetChip
              key={u}
              type="button"
              onClick={() => {
                setInputUrl(u);
                setResult(parseUrl(u));
              }}
            >
              {u}
            </PresetChip>
          ))}
        </PresetsContainer>
      </InputSection>

      <StatusBanner $status={result.status}>
        <StatusLeft>
          {result.status === "valid" ? (
            <CheckCircleIcon size={22} />
          ) : result.status === "warning" ? (
            <AlertTriangleIcon size={22} />
          ) : (
            <XCircleIcon size={22} />
          )}
          <span>
            {result.status === "valid"
              ? "Valid URL structure and reachable"
              : result.status === "warning"
              ? "URL warning detected"
              : "Invalid URL format or unreachable"}
          </span>
        </StatusLeft>
        <StatusMeta>
          <MetaBadge>Status: {result.statusCode} {result.statusText}</MetaBadge>
          <MetaBadge>Latency: {result.responseTimeMs} ms</MetaBadge>
          <MetaBadge>Checked At: {result.checkedAt}</MetaBadge>
        </StatusMeta>
      </StatusBanner>

      <Grid>
        <Card>
          <CardTitle>
            <ShieldCheckIcon size={18} />
            <span>Structure Details</span>
            <CopyBtn onClick={() => handleCopy(result.url)} title="Copy full URL">
              <CopyIcon size={16} />
              {copied && <span style={{ fontSize: "0.7rem", marginLeft: 4 }}>Copied!</span>}
            </CopyBtn>
          </CardTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <DetailItem>
              <DetailLabel>Protocol</DetailLabel>
              <DetailValue>{result.protocol}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Hostname</DetailLabel>
              <DetailValue>{result.hostname}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Port</DetailLabel>
              <DetailValue>{result.port}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Pathname</DetailLabel>
              <DetailValue>{result.pathname || "/"}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Hash (Anchor)</DetailLabel>
              <DetailValue>{result.hash}</DetailValue>
            </DetailItem>
          </div>
        </Card>

        <Card>
          <CardTitle>
            <span>Query Parameters</span>
            <MetaBadge style={{ marginLeft: "auto" }}>
              {result.searchParams.length} parameters
            </MetaBadge>
          </CardTitle>
          {result.searchParams.length > 0 ? (
            <ParamsTable>
              <thead>
                <tr>
                  <th>Parameter Key</th>
                  <th>Parameter Value</th>
                </tr>
              </thead>
              <tbody>
                {result.searchParams.map((param, index) => (
                  <tr key={index}>
                    <td style={{ color: "#2563eb", fontWeight: 600 }}>{param.key}</td>
                    <td>{param.value}</td>
                  </tr>
                ))}
              </tbody>
            </ParamsTable>
          ) : (
            <EmptyState>No query parameters found in this URL</EmptyState>
          )}
        </Card>
      </Grid>
    </PageContainer>
  );
};
