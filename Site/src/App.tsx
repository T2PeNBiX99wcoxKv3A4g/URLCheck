import React, {useEffect, useState} from "react";
import styled, {createGlobalStyle, keyframes} from "styled-components";
import {BookOpen, FileCode2, Globe, House} from "lucide-react";
import {siGithub} from "simple-icons";
import {HomePage} from "./pages/Home";
import {ScriptsPage} from "./pages/Scripts";
import {DocsPage} from "./pages/Docs";
import {docs} from "./docs.generated";
import {ICON, RELEASES} from "./constants";
import {docsHref, homeHref, scriptsHref} from "./links";
import {useVersion} from "./version";
import {LANGUAGES, type Copy, type Language} from "./i18n";
import {LanguageProvider, useCopy, useLanguage} from "./language";

const GlobalStyle = createGlobalStyle`
    :root {
        color-scheme: dark;
        --font-cjk: sans-serif;
        --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", Arial;
        --font-mono: "JetBrains Mono", ui-monospace, "Cascadia Mono", Consolas, "SFMono-Regular", Menlo, var(--font-cjk);
    }

    /* The app picks the CJK face per language; the site does the same so the text matches. */
    html:lang(zh-TW) {
        --font-cjk: "Noto Sans TC", "Microsoft JhengHei UI", "PingFang TC";
    }

    html:lang(zh-CN) {
        --font-cjk: "Noto Sans SC", "Microsoft YaHei UI", "PingFang SC";
    }

    html:lang(ja) {
        --font-cjk: "Noto Sans JP", "Yu Gothic UI", "Hiragino Kaku Gothic ProN";
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
        font-family: var(--font-sans), var(--font-cjk);
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
    }

    a {
        color: #60a5fa;
    }

    code {
        font-family: var(--font-mono);
    }

    ::selection {
        background: rgba(59, 130, 246, 0.35);
    }

    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
        }
    }
`;

/** The app fades its panels in the same way, so the site uses the same curve. */
const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(6px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
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
    animation: ${fadeIn} 0.24s cubic-bezier(0.22, 1, 0.36, 1);
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
    transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);

    ${Brand}:hover & {
        transform: rotate(-6deg) scale(1.06);
    }
`;

/** The brand and its release badge travel together; the nav keeps the rest of the row. */
const BrandGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const VersionBadge = styled.a`
    padding: 2px 8px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    color: #9ca3af;
    font-size: 0.68rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    text-decoration: none;
    transition: background 140ms ease, border-color 140ms ease, color 140ms ease;

    &:hover {
        color: #f9fafb;
        border-color: rgba(255, 255, 255, 0.25);
        background: rgba(255, 255, 255, 0.06);
    }
`;

const Nav = styled.nav`
    display: flex;
    gap: 4px;
    margin-left: auto;
`;

const NavLink = styled.a<{ $active?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 7px;
    color: ${(props) => (props.$active ? "#f9fafb" : "#9ca3af")};
    background: ${(props) => (props.$active ? "rgba(255, 255, 255, 0.08)" : "transparent")};
    font-size: 0.85rem;
    text-decoration: none;
    transition: background 120ms ease, color 120ms ease;

    &:hover {
        color: #f9fafb;
        background: rgba(255, 255, 255, 0.06);
    }
`;

/** Keeps a brand mark (simple-icons has no React wrapper) in step with the lucide glyphs beside it. */
const BrandMark = styled.svg`
    width: 15px;
    height: 15px;
    flex-shrink: 0;
    fill: currentColor;
`;

const LanguagePicker = styled.label`
    position: relative;
    display: inline-flex;
    align-items: center;
    margin-left: 4px;

    svg {
        position: absolute;
        left: 8px;
        color: #9ca3af;
        pointer-events: none;
    }
`;

const LanguageSelect = styled.select`
    padding: 6px 8px 6px 28px;
    border-radius: 7px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(17, 24, 39, 0.9);
    color: #d1d5db;
    font: inherit;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background 120ms ease, border-color 120ms ease, color 120ms ease;

    &:hover {
        color: #f9fafb;
        border-color: rgba(255, 255, 255, 0.25);
        background: rgba(31, 41, 55, 0.95);
    }
`;

const Content = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1080px;
    margin: 0 auto;
    padding: 40px 24px 64px;
    animation: ${fadeIn} 0.24s cubic-bezier(0.22, 1, 0.36, 1);
`;

const Footer = styled.footer`
    padding: 20px 24px 28px;
    color: #6b7280;
    font-size: 0.78rem;
    text-align: center;
`;

/** `#/scripts` and `#%2Fscripts` both mean the same page; a stray encoding must not break the route. */
function decodeHash(value: string) {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}

/** `#/section/page` — the site is static, so the hash keeps deep links working on Pages. */
function useRoute() {
    const [hash, setHash] = useState(() => window.location.hash);

    useEffect(() => {
        const update = () => setHash(window.location.hash);
        window.addEventListener("hashchange", update);
        return () => window.removeEventListener("hashchange", update);
    }, []);

    const path = decodeHash(hash.replace(/^#\/?/, "")).replace(/^\/+/, "");
    const [section, ...rest] = path.split("/");

    return {section: section || "home", page: rest.join("/")};
}

/** Keeps the browser tab in step with the current page and language. */
function useTitle(section: string, page: string, language: Language, copy: Copy) {
    useEffect(() => {
        const doc = (docs[language] ?? docs.en).find((entry) => entry.slug === page);
        const name = section === "scripts" ? copy.nav.scripts : section === "docs" ? doc?.title ?? copy.nav.docs : "";
        document.title = name ? `${name} — URLCheck` : "URLCheck";
    }, [section, page, language, copy]);
}

const Site: React.FC = () => {
    const route = useRoute();
    const {language, setLanguage} = useLanguage();
    const copy = useCopy();
    const version = useVersion();
    useTitle(route.section, route.page, language, copy);

    return (
        <Shell>
            <TopBar>
                <BrandGroup>
                    <Brand href={homeHref()}>
                        <BrandIcon src={ICON} alt=""/>
                        URLCheck
                    </Brand>
                    {version && (
                        <VersionBadge
                            href={RELEASES}
                            aria-label={`${copy.version} ${version}`}
                            title={`${copy.version} ${version}`}
                        >
                            v{version}
                        </VersionBadge>
                    )}
                </BrandGroup>
                <Nav>
                    <NavLink $active={route.section === "home"} href={homeHref()}>
                        <House size={15}/>
                        {copy.nav.home}
                    </NavLink>
                    <NavLink $active={route.section === "scripts"} href={scriptsHref()}>
                        <FileCode2 size={15}/>
                        {copy.nav.scripts}
                    </NavLink>
                    <NavLink $active={route.section === "docs"} href={docsHref("Lua-Scripts")}>
                        <BookOpen size={15}/>
                        {copy.nav.docs}
                    </NavLink>
                    <NavLink href="https://github.com/T2PeNBiX99wcoxKv3A4g/URLCheck">
                        <BrandMark viewBox="0 0 24 24" aria-hidden="true">
                            <path d={siGithub.path}/>
                        </BrandMark>
                        GitHub
                    </NavLink>
                    <LanguagePicker>
                        <Globe size={14}/>
                        <LanguageSelect
                            aria-label="Language"
                            value={language}
                            onChange={(event) => setLanguage(event.target.value as Language)}
                        >
                            {LANGUAGES.map((entry) => (
                                <option value={entry.id} key={entry.id}>
                                    {entry.label}
                                </option>
                            ))}
                        </LanguageSelect>
                    </LanguagePicker>
                </Nav>
            </TopBar>

            <Content key={`${route.section}/${route.page}/${language}`}>
                {route.section === "scripts" ? (
                    <ScriptsPage/>
                ) : route.section === "docs" ? (
                    <DocsPage page={route.page}/>
                ) : (
                    <HomePage/>
                )}
            </Content>

            <Footer>{copy.footer}</Footer>
        </Shell>
    );
};

export const App: React.FC = () => (
    <LanguageProvider>
        <GlobalStyle/>
        <Site/>
    </LanguageProvider>
);
