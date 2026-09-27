import React, { useState } from "react";
import styled from "styled-components";
import { CheckCircleIcon } from "../components/Icons";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 12px;
  margin-bottom: 4px;
`;

const SettingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SettingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SettingLabel = styled.span`
  font-size: 0.925rem;
  font-weight: 600;
  color: #1e293b;
`;

const SettingDescription = styled.span`
  font-size: 0.8rem;
  color: #64748b;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
  flex-shrink: 0;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #cbd5e1;
    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 24px;
  }

  span:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  input:checked + span {
    background-color: #2563eb;
  }

  input:checked + span:before {
    transform: translateX(22px);
  }
`;

const StyledSelect = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  color: #1e293b;
  font-size: 0.875rem;
  outline: none;
  cursor: pointer;
  min-width: 200px;

  &:focus {
    border-color: #3b82f6;
  }
`;

const StyledRange = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 220px;

  input {
    flex: 1;
    accent-color: #2563eb;
    cursor: pointer;
  }

  span {
    font-size: 0.85rem;
    font-weight: 600;
    color: #2563eb;
    min-width: 50px;
    text-align: right;
    font-family: monospace;
  }
`;

const SaveButton = styled.button`
  align-self: flex-start;
  padding: 10px 24px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
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
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25);

  &:hover {
    background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  }
`;

const Toast = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #059669;
  font-size: 0.85rem;
  font-weight: 500;
  margin-left: 12px;
`;

export const SettingsPage: React.FC = () => {
  const [timeout, setTimeoutVal] = useState(5000);
  const [followRedirects, setFollowRedirects] = useState(true);
  const [verifySsl, setVerifySsl] = useState(true);
  const [userAgent, setUserAgent] = useState("default");
  const [maxConcurrency, setMaxConcurrency] = useState(5);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <PageContainer>
      <Card>
        <SectionTitle>Network & Request Settings</SectionTitle>

        <SettingRow>
          <SettingInfo>
            <SettingLabel>Request Timeout</SettingLabel>
            <SettingDescription>Maximum milliseconds to wait for a single URL response</SettingDescription>
          </SettingInfo>
          <StyledRange>
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              value={timeout}
              onChange={(e) => setTimeoutVal(Number(e.target.value))}
            />
            <span>{timeout / 1000}s</span>
          </StyledRange>
        </SettingRow>

        <SettingRow>
          <SettingInfo>
            <SettingLabel>Follow Redirects</SettingLabel>
            <SettingDescription>Automatically follow 301/302 HTTP redirects to destination</SettingDescription>
          </SettingInfo>
          <Switch>
            <input
              type="checkbox"
              checked={followRedirects}
              onChange={(e) => setFollowRedirects(e.target.checked)}
            />
            <span />
          </Switch>
        </SettingRow>

        <SettingRow>
          <SettingInfo>
            <SettingLabel>Verify SSL Certificate</SettingLabel>
            <SettingDescription>Verify SSL/TLS certificate validity for target hostnames</SettingDescription>
          </SettingInfo>
          <Switch>
            <input
              type="checkbox"
              checked={verifySsl}
              onChange={(e) => setVerifySsl(e.target.checked)}
            />
            <span />
          </Switch>
        </SettingRow>

        <SettingRow>
          <SettingInfo>
            <SettingLabel>User-Agent Header</SettingLabel>
            <SettingDescription>Custom user-agent header sent with outbound requests</SettingDescription>
          </SettingInfo>
          <StyledSelect
            value={userAgent}
            onChange={(e) => setUserAgent(e.target.value)}
          >
            <option value="default">Default (URLCheck Desktop Agent/1.0)</option>
            <option value="chrome">Chrome Desktop (Windows 11)</option>
            <option value="safari">Safari Desktop (macOS)</option>
            <option value="curl">cURL CLI Client (curl/8.4.0)</option>
            <option value="bot">Search Engine Bot (Googlebot/2.1)</option>
          </StyledSelect>
        </SettingRow>
      </Card>

      <Card>
        <SectionTitle>Concurrency & Performance</SectionTitle>

        <SettingRow>
          <SettingInfo>
            <SettingLabel>Max Concurrent Requests</SettingLabel>
            <SettingDescription>Maximum number of asynchronous requests executed simultaneously</SettingDescription>
          </SettingInfo>
          <StyledRange>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={maxConcurrency}
              onChange={(e) => setMaxConcurrency(Number(e.target.value))}
            />
            <span>{maxConcurrency} reqs</span>
          </StyledRange>
        </SettingRow>
      </Card>

      <div style={{ display: "flex", alignItems: "center" }}>
        <SaveButton onClick={handleSave}>Save Settings</SaveButton>
        {saved && (
          <Toast>
            <CheckCircleIcon size={16} />
            <span>Settings saved successfully</span>
          </Toast>
        )}
      </div>
    </PageContainer>
  );
};
