import React, {useEffect, useState} from "react";
import styled, {createGlobalStyle} from "styled-components";
import {HomePage} from "./pages/Home";
import {ScriptsPage} from "./pages/Scripts";
import {DocsPage} from "./pages/Docs";
import {docs} from "./docs.generated";
import {ICON} from "./constants";

const GlobalStyle = createGlobalStyle`
    :root {
        color-scheme: dark;
        --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", Arial, sans-serif;
        --font-mono: "JetBrains Mono", ui-monospace, "Cascadia Mono", Consolas, "SFMono-Regular", Menlo, monospace;
    }

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        min-height: 100vh;
        background-color: #0b0f19;
        background-image: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.14), transparent 70%);
        color: #f9fafb;
        font-family: var(--font-sans);
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
    }

    a {
        color: #60a5fa;
    }

    code {
        font-family: var(--font-mono);
    }
`;

const Shell = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const TopBar = styled.header`
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 14px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(11, 15, 25, 0.85);
    backdrop-filter: blur(14px);
`;

const Brand = styled.a`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #f9fafb;
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    text-decoration: none;
`;

const BrandIcon = styled.img`
    width: 22px;
    height: 22px;
`;

const Nav = styled.nav`
    display: flex;
    gap: 4px;
    margin-left: auto;
`;

const NavLink = styled.a<{ $active?: boolean }>`
    padding: 6px 12px;
    border-radius: 7px;
    color: ${(props) => (props.$active ? "#f9fafb" : "#9ca3af")};
    background: ${(props) => (props.$active ? "rgba(255, 255, 255, 0.08)" : "transparent")};
    font-size: 0.85rem;
    text-decoration: none;

    &:hover {
        color: #f9fafb;
        background: rgba(255, 255, 255, 0.06);
    }
`;

const Content = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1080px;
    margin: 0 auto;
    padding: 40px 24px 64px;
`;

const Footer = styled.footer`
    padding: 20px 24px 28px;
    color: #6b7280;
    font-size: 0.78rem;
    text-align: center;
`;

/** `#/section/page` — the site is static, so the hash keeps deep links working on Pages. */
function useRoute() {
    const [hash, setHash] = useState(() => window.location.hash);

    useEffect(() => {
        const update = () => setHash(window.location.hash);
        window.addEventListener("hashchange", update);
        return () => window.removeEventListener("hashchange", update);
    }, []);

    const path = hash.replace(/^#\/?/, "");
    const [section, ...rest] = path.split("/");

    return {section: section || "home", page: rest.join("/")};
}

/** Keeps the browser tab in step with the current page. */
function useTitle(section: string, page: string) {
    useEffect(() => {
        const doc = docs.find((entry) => entry.slug === page);
        const name = section === "scripts" ? "Scripts" : section === "docs" ? doc?.title ?? "Docs" : "";
        document.title = name ? `${name} — URLCheck` : "URLCheck";
    }, [section, page]);
}

export const App: React.FC = () => {
    const route = useRoute();
    useTitle(route.section, route.page);

    return (
        <>
            <GlobalStyle/>
            <Shell>
                <TopBar>
                    <Brand href="#/">
                        <BrandIcon src={ICON} alt=""/>
                        URLCheck
                    </Brand>
                    <Nav>
                        <NavLink $active={route.section === "home"} href="#/">
                            Home
                        </NavLink>
                        <NavLink $active={route.section === "scripts"} href="#/scripts">
                            Scripts
                        </NavLink>
                        <NavLink $active={route.section === "docs"} href="#/docs/Lua-Scripts">
                            Docs
                        </NavLink>
                        <NavLink href="https://github.com/T2PeNBiX99wcoxKv3A4g/URLCheck">GitHub</NavLink>
                    </Nav>
                </TopBar>

                <Content>
                    {route.section === "scripts" ? (
                        <ScriptsPage/>
                    ) : route.section === "docs" ? (
                        <DocsPage page={route.page}/>
                    ) : (
                        <HomePage/>
                    )}
                </Content>

                <Footer>
                    URLCheck is MIT licensed. The docs are generated from the project wiki.
                </Footer>
            </Shell>
        </>
    );
};
