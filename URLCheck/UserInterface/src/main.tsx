import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./globals.scss";
import App from "./App";
import {PopupPage} from "./pages/PopupPage";

const rootElement = document.getElementById("root");
if (rootElement) {
    // The popup window is loaded with a `#popup?url=...` fragment; everything else is the shell.
    const isPopup = window.location.hash.startsWith("#popup");

    createRoot(rootElement).render(
        <StrictMode>
            {isPopup ? <PopupPage/> : <App/>}
        </StrictMode>
    );
}
