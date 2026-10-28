import {useEffect, useState} from "react";
import styled from "styled-components";
import {DEFAULT_TAB, findTab, type TabType} from "./tabs";
import {Native} from "@photino-net-utils/bridge";
import {NavigationContext} from "./navigation";
import {Sidebar} from "./components/Sidebar";
import {Header} from "./components/Header";

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
    const [currentTab, setCurrentTab] = useState<TabType>(DEFAULT_TAB);

    // The tray menu can request a specific tab (e.g. "Settings").
    useEffect(() => {
        return Native.on((message) => {
            const event = message as { type?: string; data?: { tab?: TabType } };
            if (event.type === "app.navigate" && event.data?.tab) {
                setCurrentTab(event.data.tab);
            }
        });
    }, []);

    // Tells the backend the interface is up and painting. A hidden start uses this to keep the window
    // minimised — and its web view rendering — until the first frame has really been drawn, instead of
    // hiding it while the web view is still starting up, which would leave it blank for good.
    useEffect(() => {
        const timer = window.setTimeout(() => Native.send({type: "app.ready"}), 250);
        return () => window.clearTimeout(timer);
    }, []);

    const CurrentPage = findTab(currentTab).page;

    return (
        <AppContainer>
            <Sidebar currentTab={currentTab} onSelectTab={setCurrentTab}/>

            <MainLayout>
                <Header currentTab={currentTab}/>
                <ContentArea>
                    <NavigationContext.Provider value={setCurrentTab}>
                        <CurrentPage/>
                    </NavigationContext.Provider>
                </ContentArea>
            </MainLayout>
        </AppContainer>
    );
}
