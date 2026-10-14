import React from "react";
import styled from "styled-components";
import {TabType} from "../types";
import {HistoryIcon, HomeIcon, SettingsIcon, ShieldCheckIcon} from "./Icons";

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
    justify-content: space-between;
`;

const StatusIndicator = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
    color: #9ca3af;
`;

const StatusDot = styled.span`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.6);
`;

const VersionLabel = styled.span`
    font-size: 0.75rem;
    color: #6b7280;
    font-family: monospace;
`;

export const Sidebar: React.FC<SidebarProps> = ({currentTab, onSelectTab}) => {
    return (
        <SidebarContainer>
            <LogoSection>
                <LogoIconWrapper>
                    <ShieldCheckIcon size={22}/>
                </LogoIconWrapper>
                <LogoText>
                    <LogoTitle>URLCheck</LogoTitle>
                    <LogoBadge>Photino Inspector</LogoBadge>
                </LogoText>
            </LogoSection>

            <NavList>
                <NavItem
                    $active={currentTab === "home"}
                    onClick={() => onSelectTab("home")}
                >
                    <HomeIcon size={18}/>
                    <span>Home</span>
                </NavItem>

                <NavItem
                    $active={currentTab === "history"}
                    onClick={() => onSelectTab("history")}
                >
                    <HistoryIcon size={18}/>
                    <span>Inspection History</span>
                </NavItem>

                <NavItem
                    $active={currentTab === "settings"}
                    onClick={() => onSelectTab("settings")}
                >
                    <SettingsIcon size={18}/>
                    <span>Settings</span>
                </NavItem>
            </NavList>

            <FooterSection>
                <StatusIndicator>
                    <StatusDot/>
                    <span>Photino Ready</span>
                </StatusIndicator>
                <VersionLabel>v1.0.0</VersionLabel>
            </FooterSection>
        </SidebarContainer>
    );
};
