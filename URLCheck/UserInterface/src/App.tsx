import {useEffect, useState} from "react";
import styled from "styled-components";
import {DEFAULT_TAB, findTab, type TabType} from "./tabs";
import {Native, ResizeHandles, useWindowControls} from "@photino-net-utils/bridge";
import {getAppInfo} from "./api/system";
import {NavigationContext} from "./navigation";
import {Sidebar} from "./components/Sidebar";
import {Header} from "./components/Header";
import {TitleBar} from "./components/TitleBar";

const AppContainer = styled.div<{ $rounded: boolean }>`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #0b0f19;
    background-image: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.12), transparent 70%);
    color: #f9fafb;

    /* GTK gives an undecorated window no frame at all, so the corners and the border are drawn
       here; the window itself is transparent behind them. */
    border-radius: ${(props) => (props.$rounded ? "10px" : "0")};
    box-shadow: ${(props) => (props.$rounded ? "inset 0 0 0 1px rgba(255, 255, 255, 0.1)" : "none")};
`;

const Body = styled.div`
    display: flex;
    flex: 1;
    min-height: 0;
    overflow: hidden;
`;

const MainLayout = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    overflow: hidden;
`;

const ContentArea = styled.main`
    flex: 1;
    padding: 28px 32px 40px;
    overflow-y: auto;
`;

export default function App() {
    const [currentTab, setCurrentTab] = useState<TabType>(DEFAULT_TAB);
    /** Whether the window has no frame of its own, so the interface draws the corners (Linux). */
    const [rounded, setRounded] = useState(false);
    const {maximized} = useWindowControls();

    useEffect(() => {
        void getAppInfo().then((info) => setRounded(info.rounded), () => undefined);
    }, []);

    /* The window is transparent behind the rounded corners, so the page must not paint over them. */
    useEffect(() => {
        document.documentElement.classList.toggle("window-rounded", rounded);
    }, [rounded]);

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
        <AppContainer $rounded={rounded && !maximized}>
            <TitleBar/>

            <Body>
                <Sidebar currentTab={currentTab} onSelectTab={setCurrentTab}/>

                <MainLayout>
                    <Header currentTab={currentTab}/>
                    <ContentArea>
                        <NavigationContext.Provider value={setCurrentTab}>
                            <CurrentPage/>
                        </NavigationContext.Provider>
                    </ContentArea>
                </MainLayout>
            </Body>

            {/* A chromeless window has no frame to grab, so the edges are resized from here. */}
            <ResizeHandles/>
        </AppContainer>
    );
}
