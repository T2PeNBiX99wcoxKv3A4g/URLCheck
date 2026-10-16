import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./globals.scss";
// Self-hosted so the interface does not depend on whatever the OS happens to have installed.
// Latin subsets only — the CJK faces stay system fonts, they are far too large to bundle.
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "@fontsource/jetbrains-mono/latin-600.css";
import "@fontsource/jetbrains-mono/latin-700.css";
import App from "./App";
import {LocalizationProvider} from "./i18n";
import {SelectionPopup} from "./components/SelectionPopup";
import {PopupPage} from "./pages/PopupPage";

const rootElement = document.getElementById("root");
if (rootElement) {
    // The popup window is loaded with a `#popup?url=...` fragment; everything else is the shell.
    const isPopup = window.location.hash.startsWith("#popup");

    createRoot(rootElement).render(
        <StrictMode>
            <LocalizationProvider>
                {isPopup ? <PopupPage/> : <App/>}
                {/* Lives outside the pages so selecting a URL works in every window. */}
                <SelectionPopup/>
            </LocalizationProvider>
        </StrictMode>
    );
}
