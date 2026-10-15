import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./globals.scss";
import App from "./App";
import {LocalizationProvider} from "./i18n";
import {PopupPage} from "./pages/PopupPage";

const rootElement = document.getElementById("root");
if (rootElement) {
    // The popup window is loaded with a `#popup?url=...` fragment; everything else is the shell.
    const isPopup = window.location.hash.startsWith("#popup");

    // The popup window itself is transparent on Linux, so its background comes from the page root.
    if (isPopup) document.documentElement.classList.add("popup");

    createRoot(rootElement).render(
        <StrictMode>
            <LocalizationProvider>
                {isPopup ? <PopupPage/> : <App/>}
            </LocalizationProvider>
        </StrictMode>
    );
}
