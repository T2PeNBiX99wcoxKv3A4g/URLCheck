import {fileURLToPath} from "node:url";
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// The shared bridge package is linked from the sibling PhotinoNETUtils checkout, which lives
// outside this Vite root; the dev server has to be told it may serve that directory.
const sharedBridge = fileURLToPath(
    new URL("../../../PhotinoNETUtils/UserInterface", import.meta.url)
);

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    server: {
        host: "127.0.0.1",
        port: 3000,
        strictPort: true,
        fs: {
            allow: [".", sharedBridge],
        },
    },
    build: {
        outDir: "build",
        emptyOutDir: true,
    },
});
