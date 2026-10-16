import React, {useEffect, useMemo, useState} from "react";
import styled, {css} from "styled-components";
import {AlertTriangleIcon, CheckCircleIcon, LinkIcon, TrashIcon} from "../components/Icons";
import {PageContainer, SectionTitle, StackCard} from "../components/Layout";
import {useTranslation} from "../i18n";
import {loadStrings} from "../api/i18n";
import {AppSettings, BrowserEntry, UserAgentEntry} from "../types";
import {Native} from "../Native";
import {DEFAULT_SETTINGS, loadSettings, resetSettings, saveSettings, type SettingsPayload} from "../api/settings";
import {detectBrowsers} from "../api/browsers";
import {getAppInfo, openDefaultAppsSettings, protocolStatus, registerCustomScheme, registerProtocols, unregisterProtocols, type ProtocolStatus} from "../api/system";

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
    font-family: var(--font-mono);
  }
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  /* On a narrow window (or a high display scale) the buttons wrap instead of being clipped. */
  flex-wrap: wrap;
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
  /* Keep the label on one line and let the row wrap rather than squeezing the button. */
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

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

/** Shared red treatment for the destructive actions (discard edits, reset to defaults). */
const dangerStyles = css`
  background: rgba(239, 68, 68, 0.12);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.35);

  &:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.24);
    color: #fca5a5;
    border-color: rgba(239, 68, 68, 0.5);
  }
`;

const ResetButton = styled(BaseButton)`
  ${dangerStyles}
`;

/**
 * Reverts the form to the last saved snapshot. It sits next to Save and only exists while there
 * are unsaved edits: the collapsed state animates down to zero width and cancels the row gap so it
 * leaves no trace.
 */
const DiscardButton = styled(BaseButton)<{ $visible: boolean }>`
  ${dangerStyles}
  overflow: hidden;
  transform-origin: left center;

  &:disabled {
    opacity: ${(props) => (props.$visible ? 0.55 : 0)};
  }

  max-width: ${(props) => (props.$visible ? "240px" : "0")};
  padding: ${(props) => (props.$visible ? "10px 24px" : "0")};
  border-width: ${(props) => (props.$visible ? "1px" : "0")};
  /* Collapsed, the item still sits between two 12px gaps; cancel one so the pair looks like one. */
  margin-left: ${(props) => (props.$visible ? "0" : "-12px")};
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: ${(props) => (props.$visible ? "translateX(0)" : "translateX(-8px)")};
  pointer-events: ${(props) => (props.$visible ? "auto" : "none")};
  transition: max-width 0.28s ease, padding 0.28s ease, border-width 0.28s ease,
    margin-left 0.28s ease, opacity 0.28s ease, transform 0.28s ease, background 0.15s ease,
    color 0.15s ease, border-color 0.15s ease;
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

/**
 * Sticky reminder that the form differs from the last saved settings. It stays pinned directly
 * under the page header while the content scrolls, and collapses smoothly when nothing is dirty.
 * The negative bottom margin cancels the page gap so the hidden state leaves no empty space.
 */
const UnsavedBanner = styled.div<{ $visible: boolean }>`
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  border-radius: 10px;
  border: solid rgba(251, 191, 36, 0.35);
  background: rgba(30, 27, 17, 0.92);
  backdrop-filter: blur(16px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  color: #fbbf24;
  font-size: 0.85rem;
  font-weight: 600;
  transform-origin: top;
  transition: opacity 0.28s ease, transform 0.28s ease, max-height 0.28s ease,
    padding 0.28s ease, border-width 0.28s ease, margin-bottom 0.28s ease;

  max-height: ${(props) => (props.$visible ? "120px" : "0")};
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: ${(props) => (props.$visible ? "translateY(0)" : "translateY(-8px)")};
  padding: ${(props) => (props.$visible ? "10px 16px" : "0 16px")};
  border-width: ${(props) => (props.$visible ? "1px" : "0")};
  margin-bottom: ${(props) => (props.$visible ? "0" : "-24px")};
  pointer-events: ${(props) => (props.$visible ? "auto" : "none")};
`;

const PulseDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fbbf24;
  flex-shrink: 0;
  animation: unsavedPulse 1.8s ease-out infinite;

  @keyframes unsavedPulse {
    0% {
      box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.5);
    }
    70% {
      box-shadow: 0 0 0 8px rgba(251, 191, 36, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(251, 191, 36, 0);
    }
  }
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.75rem;
  color: #6b7280;

  code {
    color: #9ca3af;
    font-family: var(--font-mono);
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
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #3b82f6;
    background: rgba(15, 23, 42, 0.95);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
  }

  &.name {
    width: 150px;
    flex-shrink: 0;
  }

  &.path {
    flex: 1;
    font-family: var(--font-mono);
  }

  &.args {
    flex: 0 0 160px;
    font-family: var(--font-mono);
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
  transition: color 0.15s ease, background 0.15s ease, transform 0.15s ease;

  &:hover {
    color: #f87171;
    background: rgba(239, 68, 68, 0.12);
    transform: scale(1.08);
  }

  &:active {
    transform: scale(0.94);
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

const WarnText = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  line-height: 1.4;
  color: #fbbf24;
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(15, 23, 42, 0.75);
  color: #f9fafb;
  font-size: 0.875rem;
  outline: none;
  cursor: pointer;
  min-width: 200px;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
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

const Checkbox = styled.input.attrs({type: "checkbox"})`
  width: 18px;
  height: 18px;
  accent-color: #6366f1;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.2s ease;

  &:hover:not(:disabled) {
    transform: scale(1.12);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/** Language names are always shown in their own language. */
const LOCALE_NAMES: Record<string, string> = {  en: "English",
  "zh-TW": "繁體中文",
  "zh-CN": "简体中文",
  ja: "日本語",
};

export const SettingsPage: React.FC = () => {
  const t = useTranslation();
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  /** Last persisted snapshot; the form is "dirty" while it differs from this. */
  const [baseline, setBaseline] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [settingsFilePath, setSettingsFilePath] = useState("");
  const [locales, setLocales] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [integrationBusy, setIntegrationBusy] = useState(false);
  const [integrationMessage, setIntegrationMessage] = useState<{ key: string; params?: Record<string, string> } | null>(null);
  const [protocols, setProtocols] = useState<ProtocolStatus | null>(null);
  const [platform, setPlatform] = useState("windows");

  useEffect(() => {
    protocolStatus().then(setProtocols).catch(() => setProtocols(null));
  }, []);

  useEffect(() => {
    getAppInfo().then((info) => setPlatform(info.platform)).catch(() => undefined);
  }, []);

  useEffect(() => {
    loadStrings().then((payload) => setLocales(payload.available)).catch(() => setLocales([]));
  }, []);

  /** Applies a backend payload and treats it as the new saved baseline. */
  const applyPayload = (payload: SettingsPayload) => {
    setSettings(payload.settings);
    setBaseline(payload.settings);
    setSettingsFilePath(payload.settingsFilePath);
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const payload = await loadSettings();
        if (cancelled) return;

        applyPayload(payload);
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
        applyPayload(event.data);
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
      applyPayload(payload);
      flashSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  /** Throws away the edits and restores the last saved snapshot. */
  const handleDiscard = () => {
    setSettings(baseline);
    setError(null);
  };

  const handleReset = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = await resetSettings();
      applyPayload(payload);
      flashSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  };

  const busy = loading || saving;
  // Language is applied immediately, so it is part of the baseline and never counts as dirty.
  const unsaved = useMemo(
      () => !loading && JSON.stringify(settings) !== JSON.stringify(baseline),
      [settings, baseline, loading]
  );

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
      if (detected.length === 0) setIntegrationMessage({key: "settings.noBrowsersDetected"});
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
      setIntegrationMessage({key: "settings.registeredHttp", params: {path: result.executablePath}});
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
      setIntegrationMessage({key: "settings.registeredUrlcheck", params: {path: result.executablePath}});
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
      setIntegrationMessage({key: "settings.unregistered"});
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
      setIntegrationMessage({key: "settings.openedDefaultApps"});
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIntegrationBusy(false);
    }
  };

  const handleLanguageChange = async (language: string) => {
    const next = {...settings, language};
    setSettings(next);
    setError(null);
    try {
      const payload = await saveSettings(next);
      applyPayload(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
      <PageContainer $maxWidth={800}>
        <UnsavedBanner $visible={unsaved}>
          <PulseDot/>
          <span>{t("settings.unsaved")}</span>
        </UnsavedBanner>

        {error && (
            <ErrorBanner>
              <AlertTriangleIcon size={16}/>
              <span>{t(error)}</span>
            </ErrorBanner>
        )}

        <StackCard>
          <SectionTitle>{t("settings.network")}</SectionTitle>

          <SettingRow>
            <SettingInfo>
              <SettingLabel>{t("settings.requestTimeout")}</SettingLabel>
              <SettingDescription>{t("settings.requestTimeoutDescription")}</SettingDescription>
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
              <SettingLabel>{t("settings.language")}</SettingLabel>
              <SettingDescription>{t("settings.languageDescription")}</SettingDescription>
            </SettingInfo>
            <Select
                disabled={busy || locales.length === 0}
                value={settings.language}
                onChange={(e) => handleLanguageChange(e.target.value)}
            >
              {locales.map((locale) => (
                  <option key={locale} value={locale}>{LOCALE_NAMES[locale] ?? locale}</option>
              ))}
            </Select>
          </SettingRow>

          <SettingRow>
            <SettingInfo>
              <SettingLabel>{t("settings.borderlessPopup")}</SettingLabel>
              <SettingDescription>{t("settings.borderlessPopupDescription")}</SettingDescription>
            </SettingInfo>
            <Checkbox
                disabled={busy}
                checked={settings.borderlessPopup}
                onChange={(e) => update({borderlessPopup: e.target.checked})}
            />
          </SettingRow>

          <SettingRow>
            <SettingInfo>
              <SettingLabel>{t("settings.autoStripTracking")}</SettingLabel>
              <SettingDescription>{t("settings.autoStripTrackingDescription")}</SettingDescription>
            </SettingInfo>
            <Checkbox
                disabled={busy}
                checked={settings.autoStripTrackingParams}
                onChange={(e) => update({autoStripTrackingParams: e.target.checked})}
            />
          </SettingRow>
        </StackCard>

        <StackCard>
          <SectionTitle>{t("settings.userAgent")}</SectionTitle>

          <SettingInfo>
            <SettingDescription>
              {t("settings.userAgentDescription")}
            </SettingDescription>
          </SettingInfo>

          <SettingRow>
            <SettingInfo>
              <SettingLabel>{t("settings.userAgentDefault")}</SettingLabel>
            </SettingInfo>
            <Select
                disabled={busy || settings.userAgents.length === 0}
                value={settings.selectedUserAgentId}
                onChange={(e) => update({selectedUserAgentId: e.target.value})}
            >
              {settings.userAgents.map((agent) => (
                  <option key={agent.id} value={agent.id}>{agent.name}</option>
              ))}
            </Select>
          </SettingRow>

          <ListEditor>
            {settings.userAgents.map((agent) => (
                <ListRow key={agent.id}>
                  <ListInput
                      className="name"
                      placeholder={t("settings.browserNamePlaceholder")}
                      disabled={busy}
                      value={agent.name}
                      onChange={(e) => updateUserAgent(agent.id, {name: e.target.value})}
                  />
                  <ListInput
                      className="path"
                      placeholder={t("settings.userAgentValuePlaceholder")}
                      disabled={busy}
                      value={agent.value}
                      onChange={(e) => updateUserAgent(agent.id, {value: e.target.value})}
                  />
                  <IconOnlyButton
                      type="button"
                      title={t("settings.removeUserAgent")}
                      onClick={() => removeUserAgent(agent.id)}
                  >
                    <TrashIcon size={16}/>
                  </IconOnlyButton>
                </ListRow>
            ))}
          </ListEditor>

          <ButtonRow>
            <GhostButton type="button" onClick={addUserAgent} disabled={busy}>
              {t("settings.addUserAgent")}
            </GhostButton>
          </ButtonRow>
        </StackCard>

        <StackCard>
          <SectionTitle>{t("settings.browsers")}</SectionTitle>

          <SettingInfo>
            <SettingDescription>
              {t("settings.browsersDescription")}
            </SettingDescription>
          </SettingInfo>

          <ListEditor>
            {settings.browsers.map((browser) => (
                <ListRow key={browser.id}>
                  <ListInput
                      className="name"
                      placeholder={t("settings.browserNamePlaceholder")}
                      disabled={busy}
                      value={browser.name}
                      onChange={(e) => updateBrowser(browser.id, {name: e.target.value})}
                  />
                  <ListInput
                      className="path"
                      placeholder={t("settings.browserPathPlaceholder")}
                      disabled={busy}
                      value={browser.executablePath}
                      onChange={(e) => updateBrowser(browser.id, {executablePath: e.target.value})}
                  />
                  <ListInput
                      className="args"
                      placeholder={t("settings.browserArgsPlaceholder")}
                      title={t("settings.browserArgsTitle")}
                      disabled={busy}
                      value={browser.arguments}
                      onChange={(e) => updateBrowser(browser.id, {arguments: e.target.value})}
                  />
                  <IconOnlyButton
                      type="button"
                      title={t("settings.removeBrowser")}
                      onClick={() => removeBrowser(browser.id)}
                  >
                    <TrashIcon size={16}/>
                  </IconOnlyButton>
                </ListRow>
            ))}
          </ListEditor>

          <ButtonRow>
            <GhostButton type="button" onClick={addBrowser} disabled={busy}>
              {t("settings.addBrowser")}
            </GhostButton>
            <GhostButton type="button" onClick={handleDetectBrowsers} disabled={busy || detecting}>
              {detecting ? t("settings.detecting") : t("settings.detectInstalled")}
            </GhostButton>
          </ButtonRow>
        </StackCard>

        <StackCard>
          <SectionTitle>{t("settings.systemIntegration")}</SectionTitle>

          <SettingInfo>
            <SettingDescription>
              {t(platform === "windows"
                  ? "settings.systemIntegrationDescription"
                  : "settings.systemIntegrationDescriptionLinux")}
            </SettingDescription>
          </SettingInfo>

          <ButtonRow>
            <GhostButton type="button" onClick={handleRegisterProtocols} disabled={integrationBusy}>
              <LinkIcon size={15}/>
              {t("settings.registerHttp")}
            </GhostButton>
            <GhostButton type="button" onClick={handleRegisterCustomScheme} disabled={integrationBusy}>
              <LinkIcon size={15}/>
              {t("settings.registerUrlcheck")}
            </GhostButton>
            {platform === "windows" && (
                <GhostButton type="button" onClick={handleOpenDefaultApps} disabled={integrationBusy}>
                  {t("settings.openDefaultApps")}
                </GhostButton>
            )}
            <DangerGhostButton type="button" onClick={handleUnregisterProtocols} disabled={integrationBusy}>
              <TrashIcon size={15}/>
              {t("settings.unregister")}
            </DangerGhostButton>
          </ButtonRow>

          {protocols && (
              <InfoText>
                {t("settings.protocolStatus", {
                  isDefault: protocols.isDefault && protocols.pathMatches ? t("settings.yes") : t("settings.no"),
                  scheme: protocols.customSchemeRegistered ? t("settings.yes") : t("settings.no"),
                })}
              </InfoText>
          )}

          {protocols?.isDefault && !protocols.pathMatches && (
              <WarnText>
                <AlertTriangleIcon size={14}/>
                <span>{t("settings.pathMismatch", {path: protocols.registeredPath ?? "?"})}</span>
              </WarnText>
          )}

          {integrationMessage && <InfoText>{t(integrationMessage.key, integrationMessage.params)}</InfoText>}
        </StackCard>

        <ActionRow>
          <SaveButton onClick={handleSave} disabled={busy}>
            {loading ? t("settings.loading") : saving ? t("settings.saving") : t("settings.save")}
          </SaveButton>
          <DiscardButton $visible={unsaved} type="button" onClick={handleDiscard} disabled={busy}>
            {t("settings.discard")}
          </DiscardButton>
          <ResetButton onClick={handleReset} disabled={busy}>
            {t("settings.reset")}
          </ResetButton>
          {saved && (
              <Toast>
                <CheckCircleIcon size={16}/>
                <span>{t("settings.saved")}</span>
              </Toast>
          )}
        </ActionRow>

        <FileInfo>
          <span>{t("settings.fileInfo")}</span>
          <code>{settingsFilePath || "..."}</code>
        </FileInfo>
      </PageContainer>
  );
};
