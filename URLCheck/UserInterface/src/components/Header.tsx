import React from "react";
import styled from "styled-components";
import {TabType} from "../types";

interface HeaderProps {
  currentTab: TabType;
}

const HeaderContainer = styled.header`
  height: 64px;
  background: rgba(17, 24, 39, 0.75);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  flex-shrink: 0;
`;

const PageTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: #f9fafb;
  letter-spacing: -0.01em;
`;

const PageSubtitle = styled.span`
  font-size: 0.8rem;
  color: #9ca3af;
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QuickBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #9ca3af;
  font-weight: 500;
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3b82f6;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
`;

const tabInfo: Record<TabType, { title: string; subtitle: string }> = {
  home: {
    title: "Home",
    subtitle: "Open a URL to inspect and clean it before opening",
  },
  history: {
    title: "Inspection History",
    subtitle: "Review recently executed URL checks and summary logs",
  },
  settings: {
    title: "Preferences & Settings",
    subtitle: "Configure the request timeout, User-Agent header, and browsers",
  },
};

export const Header: React.FC<HeaderProps> = ({currentTab}) => {
  const current = tabInfo[currentTab];

  return (
      <HeaderContainer>
        <PageTitleGroup>
          <PageTitle>{current.title}</PageTitle>
          <PageSubtitle>{current.subtitle}</PageSubtitle>
        </PageTitleGroup>

        <RightControls>
          <QuickBadge>
            <Dot/>
            <span>Desktop Engine</span>
          </QuickBadge>
        </RightControls>
      </HeaderContainer>
  );
};
