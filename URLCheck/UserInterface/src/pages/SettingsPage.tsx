import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {AlertTriangleIcon, CheckCircleIcon, LinkIcon, TrashIcon} from "../components/Icons";
import {PageContainer, SectionTitle, StackCard} from "../components/Layout";
import {AppSettings, BrowserEntry, UserAgentEntry} from "../types";
import {Native} from "../Native";
import {DEFAULT_SETTINGS, loadSettings, resetSettings, saveSettings, type SettingsPayload} from "../api/settings";
import {detectBrowsers} from "../api/browsers";
import {openDefaultAppsSettings, protocolStatus, registerCustomScheme, registerProtocols, unregisterProtocols, type ProtocolStatus} from "../api/system";

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

const ListEditor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ListRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ListInput = styled.input`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(15, 23, 42, 0.75);
  color: #f9fafb;
  font-size: 0.82rem;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }

  &.name {
    width: 150px;
    flex-shrink: 0;
  }

  &.path {
    flex: 1;
    font-family: monospace;
  }

  &.args {
    flex: 0 0 160px;
    font-family: monospace;
  }
`;

const GhostButton = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: #d1d5db;
  font-weight: 500;
  font-size: 0.82rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.12);
    color: #f9fafb;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const DangerGhostButton = styled(GhostButton)`
  border-color: rgba(239, 68, 68, 0.35);
  background: rgba(239, 68, 68, 0.12);
  color: #f87171;

  &:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.24);
    color: #fca5a5;
  }
`;

const IconOnlyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 6px;
  flex-shrink: 0;

  &:hover {
    color: #f87171;
    background: rgba(239, 68, 68, 0.12);
  }
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const InfoText = styled.span`
  font-size: 0.78rem;
  color: #9ca3af;
`;

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [settingsFilePath, setSettingsFilePath] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [integrationBusy, setIntegrationBusy] = useState(false);
  const [integrationMessage, setIntegrationMessage] = useState<string | null>(null);
  const [protocols, setProtocols] = useState<ProtocolStatus | null>(null);

  useEffect(() => {
    protocolStatus().then(setProtocols).catch(() => setProtocols(null));
  }, []);

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

  const updateBrowser = (id: string, patch: Partial<BrowserEntry>) => {
    setSettings((prev) => ({
      ...prev,
      browsers: prev.browsers.map((browser) => (browser.id === id ? {...browser, ...patch} : browser)),
    }));
  };

  const addBrowser = () => {
    const id = Math.random().toString(36).slice(2, 10);
    setSettings((prev) => ({
      ...prev,
      browsers: [...prev.browsers, {id, name: "", executablePath: "", arguments: "", useCount: 0}],
    }));
  };

  const removeBrowser = (id: string) => {
    setSettings((prev) => ({...prev, browsers: prev.browsers.filter((browser) => browser.id !== id)}));
  };

  const updateUserAgent = (id: string, patch: Partial<UserAgentEntry>) => {
    setSettings((prev) => ({
      ...prev,
      userAgents: prev.userAgents.map((agent) => (agent.id === id ? {...agent, ...patch} : agent)),
    }));
  };

  const addUserAgent = () => {
    const id = Math.random().toString(36).slice(2, 10);
    setSettings((prev) => ({...prev, userAgents: [...prev.userAgents, {id, name: "Custom", value: ""}]}));
  };

  const removeUserAgent = (id: string) => {
    setSettings((prev) => ({...prev, userAgents: prev.userAgents.filter((agent) => agent.id !== id)}));
  };

  const handleDetectBrowsers = async () => {
    setDetecting(true);
    setError(null);
    try {
      const detected = await detectBrowsers();
      setSettings((prev) => {
        const existing = new Set(prev.browsers.map((browser) => browser.executablePath.toLowerCase()));
        const additions = detected.filter((browser) => !existing.has(browser.executablePath.toLowerCase()));
        return {...prev, browsers: [...prev.browsers, ...additions]};
      });
      if (detected.length === 0) setIntegrationMessage("No installed browsers were detected.");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setDetecting(false);
    }
  };

  const handleRegisterProtocols = async () => {
    setIntegrationBusy(true);
    setIntegrationMessage(null);
    try {
      const result = await registerProtocols();
      setIntegrationMessage(`Registered http/https. Executable: ${result.executablePath}`);
      setProtocols(await protocolStatus());
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIntegrationBusy(false);
    }
  };

  const handleRegisterCustomScheme = async () => {
    setIntegrationBusy(true);
    setIntegrationMessage(null);
    try {
      const result = await registerCustomScheme();
      setIntegrationMessage(`Registered urlcheck://. Executable: ${result.executablePath}`);
      setProtocols(await protocolStatus());
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIntegrationBusy(false);
    }
  };

  const handleUnregisterProtocols = async () => {
    setIntegrationBusy(true);
    setIntegrationMessage(null);
    try {
      await unregisterProtocols();
      setIntegrationMessage("Removed every URLCheck registry entry.");
      setProtocols(await protocolStatus());
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIntegrationBusy(false);
    }
  };

  const handleOpenDefaultApps = async () => {
    setIntegrationBusy(true);
    try {
      await openDefaultAppsSettings();
      setIntegrationMessage("Opened Windows Default apps. Select URLCheck for http/https.");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIntegrationBusy(false);
    }
  };

  return (
      <PageContainer $maxWidth={800}>
        {error && (
            <ErrorBanner>
              <AlertTriangleIcon size={16}/>
              <span>{error}</span>
            </ErrorBanner>
        )}

        <StackCard>
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

        </StackCard>

        <StackCard>
          <SectionTitle>User-Agent</SectionTitle>

          <SettingInfo>
            <SettingDescription>
              The first entry is used for outbound requests. Edit the display name and the header value.
            </SettingDescription>
          </SettingInfo>

          <ListEditor>
            {settings.userAgents.map((agent) => (
                <ListRow key={agent.id}>
                  <ListInput
                      className="name"
                      placeholder="Name"
                      disabled={busy}
                      value={agent.name}
                      onChange={(e) => updateUserAgent(agent.id, {name: e.target.value})}
                  />
                  <ListInput
                      className="path"
                      placeholder="User-Agent header value"
                      disabled={busy}
                      value={agent.value}
                      onChange={(e) => updateUserAgent(agent.id, {value: e.target.value})}
                  />
                  <IconOnlyButton
                      type="button"
                      title="Remove User-Agent"
                      onClick={() => removeUserAgent(agent.id)}
                  >
                    <TrashIcon size={16}/>
                  </IconOnlyButton>
                </ListRow>
            ))}
          </ListEditor>

          <ButtonRow>
            <GhostButton type="button" onClick={addUserAgent} disabled={busy}>
              Add User-Agent
            </GhostButton>
          </ButtonRow>
        </StackCard>

        <StackCard>
          <SectionTitle>Browsers</SectionTitle>

          <SettingInfo>
            <SettingDescription>
              The first browser is used by the popup's main "Open" button; the dropdown lists the rest.
            </SettingDescription>
          </SettingInfo>

          <ListEditor>
            {settings.browsers.map((browser) => (
                <ListRow key={browser.id}>
                  <ListInput
                      className="name"
                      placeholder="Name"
                      disabled={busy}
                      value={browser.name}
                      onChange={(e) => updateBrowser(browser.id, {name: e.target.value})}
                  />
                  <ListInput
                      className="path"
                      placeholder="C:\\Path\\To\\browser.exe"
                      disabled={busy}
                      value={browser.executablePath}
                      onChange={(e) => updateBrowser(browser.id, {executablePath: e.target.value})}
                  />
                  <ListInput
                      className="args"
                      placeholder="Extra args"
                      title="Extra command-line arguments appended after the URL"
                      disabled={busy}
                      value={browser.arguments}
                      onChange={(e) => updateBrowser(browser.id, {arguments: e.target.value})}
                  />
                  <IconOnlyButton
                      type="button"
                      title="Remove browser"
                      onClick={() => removeBrowser(browser.id)}
                  >
                    <TrashIcon size={16}/>
                  </IconOnlyButton>
                </ListRow>
            ))}
          </ListEditor>

          <ButtonRow>
            <GhostButton type="button" onClick={addBrowser} disabled={busy}>
              Add browser
            </GhostButton>
            <GhostButton type="button" onClick={handleDetectBrowsers} disabled={busy || detecting}>
              {detecting ? "Detecting..." : "Detect installed"}
            </GhostButton>
          </ButtonRow>
        </StackCard>

        <StackCard>
          <SectionTitle>System Integration</SectionTitle>

          <SettingInfo>
            <SettingDescription>
              URLCheck must be registered as a candidate browser and confirmed in Windows "Default apps" to
              handle http/https links. The urlcheck:// scheme is registered separately for future features.
            </SettingDescription>
          </SettingInfo>

          <ButtonRow>
            <GhostButton type="button" onClick={handleRegisterProtocols} disabled={integrationBusy}>
              <LinkIcon size={15}/>
              Register http/https
            </GhostButton>
            <GhostButton type="button" onClick={handleRegisterCustomScheme} disabled={integrationBusy}>
              <LinkIcon size={15}/>
              Register urlcheck://
            </GhostButton>
            <GhostButton type="button" onClick={handleOpenDefaultApps} disabled={integrationBusy}>
              Open Default apps
            </GhostButton>
            <DangerGhostButton type="button" onClick={handleUnregisterProtocols} disabled={integrationBusy}>
              <TrashIcon size={15}/>
              Unregister
            </DangerGhostButton>
          </ButtonRow>

          {protocols && (
              <InfoText>
                Default browser: {protocols.isDefault ? "yes" : "no"} · urlcheck:// registered:{" "}
                {protocols.customSchemeRegistered ? "yes" : "no"}
              </InfoText>
          )}

          {integrationMessage && <InfoText>{integrationMessage}</InfoText>}
        </StackCard>

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
