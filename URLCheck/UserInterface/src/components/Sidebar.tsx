import React, {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import {Native} from "@photino-net-utils/bridge";
import {TABS, type TabType} from "../tabs";
import {useTranslation} from "../i18n";
import {getAppInfo, getUpdateStatus, RELEASES_URL, type UpdateCheck} from "../api/system";
import {openWithBrowser} from "../api/browsers";
import {LogoIcon} from "./Icons";

interface SidebarProps {
    currentTab: TabType;
    onSelectTab: (tab: TabType) => void;
}

const SidebarContainer = styled.aside`
    width: 260px;
    background: rgba(17, 24, 39, 0.85);
    backdrop-filter: blur(16px);
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    height: 100vh;
    flex-shrink: 0;
    user-select: none;
`;

const LogoSection = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 24px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

const LogoIconWrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.35);
`;

const LogoText = styled.div`
    display: flex;
    flex-direction: column;
`;

const LogoTitle = styled.span`
    font-size: 1.15rem;
    font-weight: 700;
    color: #f9fafb;
    letter-spacing: -0.02em;
`;

const LogoBadge = styled.span`
    font-size: 0.7rem;
    color: #9ca3af;
    font-weight: 500;
`;

const NavList = styled.nav`
    padding: 16px 12px;
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
    color: ${(props) => (props.$active ? "#60a5fa" : "#9ca3af")};
    font-weight: ${(props) => (props.$active ? "600" : "500")};
    font-size: 0.925rem;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    text-align: left;

    &:hover {
        background: ${(props) => (props.$active ? "rgba(59, 130, 246, 0.2)" : "rgba(255, 255, 255, 0.05)")};
        color: ${(props) => (props.$active ? "#93c5fd" : "#f9fafb")};
        border-color: ${(props) => (props.$active ? "rgba(99, 102, 241, 0.5)" : "rgba(255, 255, 255, 0.05)")};
    }

    svg {
        stroke: ${(props) => (props.$active ? "#60a5fa" : "#9ca3af")};
        transition: stroke 0.2s ease;
    }

    &:hover svg {
        stroke: ${(props) => (props.$active ? "#93c5fd" : "#f9fafb")};
    }
`;

const FooterSection = styled.div`
    padding: 16px 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    align-items: center;
    gap: 8px;
`;

const VersionLabel = styled.span`
    font-size: 0.75rem;
    color: #6b7280;
    font-family: var(--font-mono);
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
    background: #fbbf24;
    cursor: pointer;
    animation: ${pulse} 2s ease-in-out infinite;
    transition: background 0.15s ease;

    &:hover {
        background: #fcd34d;
    }
`;

export const Sidebar: React.FC<SidebarProps> = ({currentTab, onSelectTab}) => {
    const t = useTranslation();
    const [version, setVersion] = useState<string | null>(null);
    /** The automatically checked update state; null until it is known. */
    const [update, setUpdate] = useState<UpdateCheck | null>(null);

    useEffect(() => {
        getAppInfo().then((info) => setVersion(info.version)).catch(() => setVersion(null));
    }, []);

    /* The first ask runs the check; the backend answers from its cache after that. */
    useEffect(() => {
        getUpdateStatus().then(setUpdate).catch(() => setUpdate(null));

        /* A check started from the settings page reports its result here too. */
        return Native.on((message) => {
            const event = message as { type?: string; data?: UpdateCheck };
            if (event.type === "app.update" && event.data)
                setUpdate(event.data);
        });
    }, []);

    return (
        <SidebarContainer>
            <LogoSection>
                <LogoIconWrapper>
                    <LogoIcon size={40}/>
                </LogoIconWrapper>
                <LogoText>
                    <LogoTitle>URLCheck</LogoTitle>
                    <LogoBadge>{t("app.tagline")}</LogoBadge>
                </LogoText>
            </LogoSection>

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
                {update?.available && (
                    <UpdateDot
                        type="button"
                        title={t("app.updateAvailable", {version: update.latest})}
                        onClick={() => void openWithBrowser(RELEASES_URL).catch(() => undefined)}
                    />
                )}
            </FooterSection>
        </SidebarContainer>
    );
};
