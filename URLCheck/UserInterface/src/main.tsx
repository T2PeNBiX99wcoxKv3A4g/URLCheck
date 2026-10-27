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
import {ContextMenu} from "./components/ContextMenu";
import {LocalizationProvider} from "./i18n";
import {PopupPage} from "./pages/PopupPage";
import {SelectionButtonPage} from "./pages/SelectionButtonPage";

const rootElement = document.getElementById("root");
if (rootElement) {
    // The popup and the floating button are their own windows, each loaded with its own fragment;
    // everything else is the management shell.
    const hash = window.location.hash;
    const page = hash.startsWith("#popup")
        ? <PopupPage/>
        : hash.startsWith("#selection")
            ? <SelectionButtonPage/>
            : <App/>;

    createRoot(rootElement).render(
        <StrictMode>
            <LocalizationProvider>
                {page}
                <ContextMenu/>
            </LocalizationProvider>
        </StrictMode>
    );
}
