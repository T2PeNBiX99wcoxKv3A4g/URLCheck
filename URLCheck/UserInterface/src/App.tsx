import {useEffect, useState} from "react";
import styled from "styled-components";
import {TabType} from "./types";
import {Native} from "./Native";
import {Sidebar} from "./components/Sidebar";
import {Header} from "./components/Header";
import {HomePage} from "./pages/HomePage";
import {HistoryPage} from "./pages/HistoryPage";
import {SettingsPage} from "./pages/SettingsPage";

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
    const [currentTab, setCurrentTab] = useState<TabType>("home");

    // The tray menu can request a specific tab (e.g. "Settings").
    useEffect(() => {
        return Native.on((message) => {
            const event = message as { type?: string; data?: { tab?: TabType } };
            if (event.type === "app.navigate" && event.data?.tab) {
                setCurrentTab(event.data.tab);
            }
        });
    }, []);

    return (
        <AppContainer>
            <Sidebar currentTab={currentTab} onSelectTab={setCurrentTab}/>

            <MainLayout>
                <Header currentTab={currentTab}/>
                <ContentArea>
                    {currentTab === "home" && <HomePage/>}
                    {currentTab === "history" && <HistoryPage/>}
                    {currentTab === "settings" && <SettingsPage/>}
                </ContentArea>
            </MainLayout>
        </AppContainer>
    );
}
