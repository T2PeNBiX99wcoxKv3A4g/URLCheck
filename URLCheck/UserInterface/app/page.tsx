"use client";

import styled from "styled-components";

const MainContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ContentCard = styled.section`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  max-width: 640px;
  width: 100%;
  text-align: center;
  border: 1px solid #e5e7eb;
`;

const StyledTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  margin: 1rem 0 0.5rem;
  letter-spacing: -0.02em;
`;

const StyledDescription = styled.p`
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const StyledHighlight = styled.span`
  color: #2563eb;
  font-weight: 600;
  background-color: #eff6ff;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
`;

export default function Home() {
  return (
    <MainContainer>
      <ContentCard>
        {/* SCSS text styles */}
        <span className="scss-badge">URLCheck Platform</span>
        <h1 className="scss-title">URL Inspection Service</h1>
        <p className="scss-subtitle">Fast, reliable, and secure URL validation</p>

        {/* Styled-components text styles */}
        <StyledTitle>Typography & Styling</StyledTitle>
        <StyledDescription>
          This page demonstrates text styling powered by{" "}
          <StyledHighlight>Sass (SCSS)</StyledHighlight> and{" "}
          <StyledHighlight>styled-components</StyledHighlight>.
        </StyledDescription>
      </ContentCard>
    </MainContainer>
  );
}
