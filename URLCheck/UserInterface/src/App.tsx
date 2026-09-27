import { useState } from "react";
import styled from "styled-components";
import { TabType } from "./types";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { SingleCheckPage } from "./pages/SingleCheckPage";
import { BatchCheckPage } from "./pages/BatchCheckPage";
import { HistoryPage } from "./pages/HistoryPage";
import { SettingsPage } from "./pages/SettingsPage";

const AppContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #0b0f19;
  background-image: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.12), transparent 70%);
  color: #f9fafb;
`;

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  height: 100vh;
  overflow: hidden;
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 28px 32px 40px;
  overflow-y: auto;
`;

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>("single");

  return (
    <AppContainer>
      <Sidebar currentTab={currentTab} onSelectTab={setCurrentTab} />

      <MainLayout>
        <Header currentTab={currentTab} />
        <ContentArea>
          {currentTab === "single" && <SingleCheckPage />}
          {currentTab === "batch" && <BatchCheckPage />}
          {currentTab === "history" && <HistoryPage />}
          {currentTab === "settings" && <SettingsPage />}
        </ContentArea>
      </MainLayout>
    </AppContainer>
  );
}
