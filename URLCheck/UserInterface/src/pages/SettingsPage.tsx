import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {AlertTriangleIcon, CheckCircleIcon} from "../components/Icons";
import {AppSettings} from "../types";
import {Native} from "../Native";
import {DEFAULT_SETTINGS, loadSettings, resetSettings, saveSettings, type SettingsPayload} from "../api/settings";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
`;

const Card = styled.div`
  background: rgba(17, 24, 39, 0.75);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: #f9fafb;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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
  color: #f9fafb;
`;

const SettingDescription = styled.span`
  font-size: 0.8rem;
  color: #9ca3af;
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
    background-color: rgba(255, 255, 255, 0.15);
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
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  input:checked + span {
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
    box-shadow: 0 0 12px rgba(99, 102, 241, 0.4);
  }

  input:checked + span:before {
    transform: translateX(22px);
  }

  input:disabled + span {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledSelect = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(15, 23, 42, 0.75);
  color: #f9fafb;
  font-size: 0.875rem;
  outline: none;
  cursor: pointer;
  min-width: 200px;

  &:focus {
    border-color: #3b82f6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  option {
    background: #111827;
    color: #f9fafb;
  }
`;

const StyledRange = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 220px;

  input {
    flex: 1;
    accent-color: #6366f1;
    cursor: pointer;
  }

  input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  span {
    font-size: 0.85rem;
    font-weight: 600;
    color: #60a5fa;
    min-width: 50px;
    text-align: right;
    font-family: monospace;
  }
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BaseButton = styled.button`
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const SaveButton = styled(BaseButton)`
  background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
  color: #ffffff;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.35);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%);
    box-shadow: 0 0 24px rgba(99, 102, 241, 0.5);
  }
`;

const ResetButton = styled(BaseButton)`
  background: rgba(255, 255, 255, 0.06);
  color: #d1d5db;
  border: 1px solid rgba(255, 255, 255, 0.12);

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.12);
    color: #f9fafb;
  }
`;

const Toast = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #34d399;
  font-size: 0.85rem;
  font-weight: 500;
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

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.75rem;
  color: #6b7280;

  code {
    color: #9ca3af;
    font-family: monospace;
    word-break: break-all;
  }
`;

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [settingsFilePath, setSettingsFilePath] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const payload = await loadSettings();
        if (cancelled) return;

        setSettings(payload.settings);
        setSettingsFilePath(payload.settingsFilePath);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // C# pushes `settings.changed` after any save/reset. Listening keeps the view in sync when the
  // change originates outside this component (e.g. a future "settings" command or a second window).
  useEffect(() => {
    return Native.on((message) => {
      const event = message as { type?: string; data?: SettingsPayload };
      if (event.type === "settings.changed" && event.data) {
        setSettings(event.data.settings);
        setSettingsFilePath(event.data.settingsFilePath);
      }
    });
  }, []);

  const update = (patch: Partial<AppSettings>) => {
    setSettings((prev) => ({...prev, ...patch}));
  };

  const flashSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = await saveSettings(settings);
      setSettings(payload.settings);
      setSettingsFilePath(payload.settingsFilePath);
      flashSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = await resetSettings();
      setSettings(payload.settings);
      setSettingsFilePath(payload.settingsFilePath);
      flashSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  const busy = loading || saving;

  return (
      <PageContainer>
        {error && (
            <ErrorBanner>
              <AlertTriangleIcon size={16}/>
              <span>{error}</span>
            </ErrorBanner>
        )}

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
                  disabled={busy}
                  value={settings.requestTimeoutMs}
                  onChange={(e) => update({requestTimeoutMs: Number(e.target.value)})}
              />
              <span>{settings.requestTimeoutMs / 1000}s</span>
            </StyledRange>
          </SettingRow>

          <SettingRow>
            <SettingInfo>
              <SettingLabel>Follow Redirects</SettingLabel>
              <SettingDescription>Automatically follow 301/302 HTTP redirects to
                destination</SettingDescription>
            </SettingInfo>
            <Switch>
              <input
                  type="checkbox"
                  disabled={busy}
                  checked={settings.followRedirects}
                  onChange={(e) => update({followRedirects: e.target.checked})}
              />
              <span/>
            </Switch>
          </SettingRow>

          <SettingRow>
            <SettingInfo>
              <SettingLabel>Verify SSL Certificate</SettingLabel>
              <SettingDescription>Verify SSL/TLS certificate validity for target
                hostnames</SettingDescription>
            </SettingInfo>
            <Switch>
              <input
                  type="checkbox"
                  disabled={busy}
                  checked={settings.verifySsl}
                  onChange={(e) => update({verifySsl: e.target.checked})}
              />
              <span/>
            </Switch>
          </SettingRow>

          <SettingRow>
            <SettingInfo>
              <SettingLabel>User-Agent Header</SettingLabel>
              <SettingDescription>Custom user-agent header sent with outbound requests</SettingDescription>
            </SettingInfo>
            <StyledSelect
                disabled={busy}
                value={settings.userAgent}
                onChange={(e) => update({userAgent: e.target.value})}
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
              <SettingDescription>Maximum number of asynchronous requests executed
                simultaneously</SettingDescription>
            </SettingInfo>
            <StyledRange>
              <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  disabled={busy}
                  value={settings.maxConcurrency}
                  onChange={(e) => update({maxConcurrency: Number(e.target.value)})}
              />
              <span>{settings.maxConcurrency} reqs</span>
            </StyledRange>
          </SettingRow>
        </Card>

        <ActionRow>
          <SaveButton onClick={handleSave} disabled={busy}>
            {loading ? "Loading..." : saving ? "Saving..." : "Save Settings"}
          </SaveButton>
          <ResetButton onClick={handleReset} disabled={busy}>
            Reset to Defaults
          </ResetButton>
          {saved && (
              <Toast>
                <CheckCircleIcon size={16}/>
                <span>Settings saved successfully</span>
              </Toast>
          )}
        </ActionRow>

        <FileInfo>
          <span>Settings are persisted by the C# backend at:</span>
          <code>{settingsFilePath || "..."}</code>
        </FileInfo>
      </PageContainer>
  );
};
