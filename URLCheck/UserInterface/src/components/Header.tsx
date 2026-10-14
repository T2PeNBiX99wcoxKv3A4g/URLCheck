import React from "react";
import styled from "styled-components";
import {findTab, type TabType} from "../tabs";

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

export const Header: React.FC<HeaderProps> = ({currentTab}) => {
  const current = findTab(currentTab);

  return (
      <HeaderContainer>
        <PageTitleGroup>
          <PageTitle>{current.title}</PageTitle>
          <PageSubtitle>{current.subtitle}</PageSubtitle>
        </PageTitleGroup>
      </HeaderContainer>
  );
};
