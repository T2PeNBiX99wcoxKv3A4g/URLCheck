import React from "react";
import styled from "styled-components";
import { TabType } from "../types";

interface HeaderProps {
  currentTab: TabType;
}

const HeaderContainer = styled.header`
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
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
  color: #0f172a;
  letter-spacing: -0.01em;
`;

const PageSubtitle = styled.span`
  font-size: 0.8rem;
  color: #64748b;
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
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #475569;
  font-weight: 500;
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3b82f6;
`;

const tabInfo: Record<TabType, { title: string; subtitle: string }> = {
  single: {
    title: "Single URL Inspector",
    subtitle: "Inspect URL structure, protocol, hostname, query parameters, and status in real time",
  },
  batch: {
    title: "Batch URL Scanner",
    subtitle: "Quickly scan multiple URLs and examine response status codes and latencies",
  },
  history: {
    title: "Inspection History",
    subtitle: "Review recently executed URL checks and summary logs",
  },
  settings: {
    title: "Preferences & Settings",
    subtitle: "Configure request timeouts, User-Agent header, and concurrency limits",
  },
};

export const Header: React.FC<HeaderProps> = ({ currentTab }) => {
  const current = tabInfo[currentTab];

  return (
    <HeaderContainer>
      <PageTitleGroup>
        <PageTitle>{current.title}</PageTitle>
        <PageSubtitle>{current.subtitle}</PageSubtitle>
      </PageTitleGroup>

      <RightControls>
        <QuickBadge>
          <Dot />
          <span>Desktop Engine</span>
        </QuickBadge>
      </RightControls>
    </HeaderContainer>
  );
};
