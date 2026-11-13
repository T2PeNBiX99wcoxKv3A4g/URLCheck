import React, {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import {Native, useTranslation} from "@photino-net-utils/bridge";
import {TABS, type TabType} from "../tabs";
import {getAppInfo, getUpdateStatus, openReleasesPage, RELEASES_URL, type UpdateCheck} from "../api/system";

interface SidebarProps {
    currentTab: TabType;
    onSelectTab: (tab: TabType) => void;
}

const SidebarContainer = styled.aside`
    width: 260px;
    background: var(--panel-strong);
    backdrop-filter: blur(16px);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-shrink: 0;
    user-select: none;
`;

const NavList = styled.nav`
    padding: 18px 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
`;

const NavItem = styled.button<{ $active: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid ${(props) => (props.$active ? "rgba(99, 102, 241, 0.35)" : "transparent")};
    background: ${(props) => (props.$active ? "rgba(59, 130, 246, 0.15)" : "transparent")};
    color: ${(props) => (props.$active ? "var(--link)" : "var(--text-secondary)")};
    font-weight: ${(props) => (props.$active ? "600" : "500")};
    font-size: 0.925rem;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    text-align: left;

    &:hover {
        background: ${(props) => (props.$active ? "rgba(59, 130, 246, 0.2)" : "var(--border-faint)")};
        color: ${(props) => (props.$active ? "var(--accent-soft)" : "var(--text-primary)")};
        border-color: ${(props) => (props.$active ? "rgba(99, 102, 241, 0.5)" : "var(--border-faint)")};
    }

    svg {
        stroke: ${(props) => (props.$active ? "var(--link)" : "var(--text-secondary)")};
        transition: stroke 0.2s ease;
    }

    &:hover svg {
        stroke: ${(props) => (props.$active ? "var(--accent-soft)" : "var(--text-primary)")};
    }
`;

const FooterSection = styled.div`
    padding: 16px 20px;
    border-top: 1px solid var(--border-faint);
    display: flex;
    align-items: center;
    gap: 8px;
`;

const VersionLabel = styled.span`
    font-size: 0.75rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
`;

/** Marks a debug build next to the version, so it is not mistaken for a release binary. */
const DebugBadge = styled.span`
    padding: 1px 5px;
    border: 1px solid rgba(251, 191, 36, 0.45);
    border-radius: 4px;
    background: rgba(251, 191, 36, 0.12);
    color: var(--warning);
    font-family: var(--font-mono);
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    line-height: 1.3;
`;

/** Draws attention to the update dot without moving anything around it. */
const pulse = keyframes`
    0%, 100% {
        box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.5);
    }
    50% {
        box-shadow: 0 0 0 4px rgba(251, 191, 36, 0);
    }
`;

/** Sits beside the version when a newer release exists, and opens its page when clicked. */
const UpdateDot = styled.button`
    width: 8px;
    height: 8px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: var(--warning);
    cursor: pointer;
    animation: ${pulse} 2s ease-in-out infinite;
    transition: background 0.15s ease;

    &:hover {
        background: var(--warning);
    }
`;

export const Sidebar: React.FC<SidebarProps> = ({currentTab, onSelectTab}) => {
    const t = useTranslation();
    const [version, setVersion] = useState<string | null>(null);
    const [debug, setDebug] = useState(false);
    /** The automatically checked update state; null until it is known. */
    const [update, setUpdate] = useState<UpdateCheck | null>(null);

    useEffect(() => {
        getAppInfo().then((info) => {
            setVersion(info.version);
            setDebug(info.debug === true);
        }).catch(() => {
            setVersion(null);
            setDebug(false);
        });
    }, []);

    /* The first ask runs the check; the backend answers from its cache after that. */
    useEffect(() => {
        getUpdateStatus().then(setUpdate).catch(() => setUpdate(null));

        /* A check started from the settings page reports its result here too. */
        return Native.on((message) => {
            const event = message as { type?: string; data?: UpdateCheck };
            if (event.type === "update.checked" && event.data)
                setUpdate(event.data);
        });
    }, []);

    return (
        <SidebarContainer>
            <NavList>
                {TABS.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <NavItem
                            key={tab.id}
                            $active={currentTab === tab.id}
                            onClick={() => onSelectTab(tab.id)}
                        >
                            <Icon size={18}/>
                            <span>{t(tab.labelKey)}</span>
                        </NavItem>
                    );
                })}
            </NavList>

            <FooterSection>
                <VersionLabel>{version ? `v${version}` : "…"}</VersionLabel>
                {debug && <DebugBadge title="Debug build">DEBUG</DebugBadge>}
                {update?.available && (
                    <UpdateDot
                        type="button"
                        title={t("app.updateAvailable", {version: update.latest})}
                        onClick={() => void openReleasesPage(RELEASES_URL).catch(() => undefined)}
                    />
                )}
            </FooterSection>
        </SidebarContainer>
    );
};
