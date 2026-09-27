import React from "react";
import styled from "styled-components";
import { TabType } from "../types";
import { LinkIcon, LayersIcon, HistoryIcon, SettingsIcon, ShieldCheckIcon } from "./Icons";

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

const SidebarContainer = styled.aside`
  width: 260px;
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
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
  border-bottom: 1px solid #f1f5f9;
`;

const LogoIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoTitle = styled.span`
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.02em;
`;

const LogoBadge = styled.span`
  font-size: 0.7rem;
  color: #64748b;
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
  border: none;
  background: ${(props) => (props.$active ? "#eff6ff" : "transparent")};
  color: ${(props) => (props.$active ? "#2563eb" : "#64748b")};
  font-weight: ${(props) => (props.$active ? "600" : "500")};
  font-size: 0.925rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;

  &:hover {
    background: ${(props) => (props.$active ? "#eff6ff" : "#f8fafc")};
    color: ${(props) => (props.$active ? "#2563eb" : "#1e293b")};
  }

  svg {
    stroke: ${(props) => (props.$active ? "#2563eb" : "#64748b")};
    transition: stroke 0.2s ease;
  }

  &:hover svg {
    stroke: ${(props) => (props.$active ? "#2563eb" : "#1e293b")};
  }
`;

const FooterSection = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #64748b;
`;

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
`;

const VersionLabel = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
  font-family: monospace;
`;

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab }) => {
  return (
    <SidebarContainer>
      <LogoSection>
        <LogoIconWrapper>
          <ShieldCheckIcon size={22} />
        </LogoIconWrapper>
        <LogoText>
          <LogoTitle>URLCheck</LogoTitle>
          <LogoBadge>Photino Inspector</LogoBadge>
        </LogoText>
      </LogoSection>

      <NavList>
        <NavItem
          $active={currentTab === "single"}
          onClick={() => onSelectTab("single")}
        >
          <LinkIcon size={18} />
          <span>Single URL Inspector</span>
        </NavItem>

        <NavItem
          $active={currentTab === "batch"}
          onClick={() => onSelectTab("batch")}
        >
          <LayersIcon size={18} />
          <span>Batch URL Scanner</span>
        </NavItem>

        <NavItem
          $active={currentTab === "history"}
          onClick={() => onSelectTab("history")}
        >
          <HistoryIcon size={18} />
          <span>Inspection History</span>
        </NavItem>

        <NavItem
          $active={currentTab === "settings"}
          onClick={() => onSelectTab("settings")}
        >
          <SettingsIcon size={18} />
          <span>Settings</span>
        </NavItem>
      </NavList>

      <FooterSection>
        <StatusIndicator>
          <StatusDot />
          <span>Photino Ready</span>
        </StatusIndicator>
        <VersionLabel>v1.0.0</VersionLabel>
      </FooterSection>
    </SidebarContainer>
  );
};
