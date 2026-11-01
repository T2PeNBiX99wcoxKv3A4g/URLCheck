import React from "react";
import {createRoot} from "react-dom/client";
// Self-hosted so the site looks the same everywhere, like the app's own interface.
// Latin subsets only: the CJK faces stay system fonts, they are far too large to bundle.
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import {App} from "./App";

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
