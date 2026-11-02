// Generates crawlable HTML for every docs page, the scripts page and the three translated home
// pages, plus the sitemap and robots.txt. The React app stays the interactive view; these pages
// exist so search engines do not have to execute JavaScript or understand a hash route.
import React from "react";
import {renderToStaticMarkup} from "react-dom/server";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {existsSync} from "node:fs";
import {mkdir, readFile, readdir, writeFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {
    absolute,
    DOC_PAGES,
    docsPath,
    homePath,
    LANGUAGES,
    LANGUAGE_LABELS,
    OG_LOCALES,
    RELEASES,
    REPOSITORY,
    scriptsPath,
    SITE_URL
} from "./docs-config.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(here, "..");
const docsDirectory = path.join(siteRoot, "docs");
const luaDirectory = path.resolve(siteRoot, "../Lua");
const dist = path.join(siteRoot, "dist");
const known = new Set(DOC_PAGES.map((page) => page.slug));
const screenshot = "https://raw.githubusercontent.com/T2PeNBiX99wcoxKv3A4g/URLCheck/master/docs/main-window.png";

const CSS = `
:root {
    color-scheme: dark;
    --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", Arial;
    --font-mono: "JetBrains Mono", ui-monospace, "Cascadia Mono", Consolas, monospace;
    --accent: #93c5fd;
    --bg-primary: #08070f;
    --bg-card: rgba(22, 19, 38, 0.78);
    --text-primary: #f5f3ff;
    --text-secondary: #a9a2c4;
    --text-muted: #6f6885;
    --border: rgba(167, 139, 250, 0.12);
    --border-hover: rgba(167, 139, 250, 0.4);
}
* { box-sizing: border-box; }
body {
    margin: 0;
    min-height: 100vh;
    background-color: var(--bg-primary);
    background-image:
        radial-gradient(circle at 50% -10%, rgba(99, 102, 241, 0.22), transparent 60%),
        radial-gradient(circle at 85% 15%, rgba(59, 130, 246, 0.12), transparent 55%);
    background-attachment: fixed;
    color: var(--text-primary);
    font-family: var(--font-sans);
    line-height: 1.6;
}
a { color: var(--accent); }
code { font-family: var(--font-mono); }
.topbar {
    position: sticky;
    top: 0;
    z-index: 20;
    border-bottom: 1px solid var(--border);
    background: rgba(8, 7, 15, 0.88);
    backdrop-filter: blur(14px);
}
.topbar-inner, .shell, .footer {
    width: min(1100px, calc(100% - 40px));
    margin: 0 auto;
}
.topbar-inner { display: flex; align-items: center; gap: 18px; min-height: 58px; }
.brand {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    color: var(--text-primary);
    font-weight: 700;
    text-decoration: none;
}
.brand img { width: 26px; height: 26px; border-radius: 7px; }
.nav { display: flex; align-items: center; gap: 4px; }
.nav a {
    padding: 7px 10px;
    border-radius: 7px;
    color: var(--text-secondary);
    font-size: 0.86rem;
    text-decoration: none;
}
.nav a:hover, .nav a[aria-current="page"] { background: rgba(167, 139, 250, 0.14); color: var(--text-primary); }
.languages { display: flex; gap: 2px; margin-left: auto; flex-wrap: wrap; }
.languages a {
    padding: 5px 8px;
    border-radius: 6px;
    color: var(--text-muted);
    font-size: 0.75rem;
    text-decoration: none;
}
.languages a:hover, .languages a[aria-current="page"] { color: var(--text-primary); background: rgba(167, 139, 250, 0.12); }
.shell { padding: 36px 0 56px; }
.layout { display: flex; align-items: flex-start; gap: 32px; }
.sidebar { position: sticky; top: 82px; width: 210px; flex-shrink: 0; display: flex; flex-direction: column; gap: 18px; }
.group { display: flex; flex-direction: column; gap: 2px; }
.group-title {
    padding: 0 10px 6px;
    color: var(--text-muted);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}
.sidebar a {
    padding: 7px 10px;
    border-radius: 7px;
    color: var(--text-secondary);
    font-size: 0.85rem;
    text-decoration: none;
}
.sidebar a:hover { color: var(--text-primary); background: rgba(167, 139, 250, 0.08); }
.sidebar a[aria-current="page"] { color: #c4b5fd; background: rgba(167, 139, 250, 0.14); }
.article {
    flex: 1;
    min-width: 0;
    padding: 28px 32px;
    border: 1px solid var(--border);
    border-radius: 16px;
    background: var(--bg-card);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
}
.doc-body { color: #d8d3ea; font-size: 0.92rem; line-height: 1.65; }
.doc-body h1 { margin: 0 0 16px; color: var(--text-primary); font-size: 1.8rem; letter-spacing: -0.02em; }
.doc-body h2 { margin: 32px 0 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border); color: var(--text-primary); font-size: 1.25rem; }
.doc-body h3 { margin: 24px 0 8px; color: var(--text-primary); font-size: 1.02rem; }
.doc-body p { margin: 0 0 12px; }
.doc-body ul, .doc-body ol { margin: 0 0 12px; padding-left: 22px; }
.doc-body li { margin: 4px 0; }
.doc-body a { color: var(--accent); text-decoration: none; }
.doc-body a:hover { text-decoration: underline; }
.doc-body code { padding: 1px 5px; border-radius: 4px; background: rgba(167, 139, 250, 0.12); color: #c4b5fd; font-size: 0.85em; }
.doc-body pre { margin: 0 0 16px; padding: 14px 16px; border: 1px solid var(--border); border-radius: 10px; background: rgba(8, 7, 15, 0.85); overflow-x: auto; }
.doc-body pre code { padding: 0; background: none; color: #e2e8f0; font-size: 0.82rem; }
.doc-body table { width: 100%; margin: 0 0 16px; border-collapse: collapse; font-size: 0.85rem; }
.doc-body th, .doc-body td { padding: 8px 10px; border-bottom: 1px solid var(--border); text-align: left; vertical-align: top; }
.doc-body th { color: var(--text-secondary); font-weight: 600; }
.doc-body blockquote { margin: 0 0 16px; padding: 8px 14px; border-left: 3px solid rgba(139, 92, 246, 0.5); background: rgba(139, 92, 246, 0.08); color: var(--text-secondary); }
.doc-body hr { margin: 24px 0; border: 0; border-top: 1px solid var(--border); }
.home-hero { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 32px 0 12px; text-align: center; }
.home-hero img { width: 88px; height: 88px; border-radius: 22px; filter: drop-shadow(0 12px 32px rgba(99, 102, 241, 0.35)); }
.home-hero h1 { margin: 0; font-size: 2.6rem; letter-spacing: -0.03em; }
.home-hero p { max-width: 560px; margin: 0; color: var(--text-secondary); font-size: 1.05rem; }
.actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 12px; }
.button {
    display: inline-flex;
    align-items: center;
    padding: 10px 18px;
    border: 1px solid var(--border);
    border-radius: 9px;
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
}
.button.primary { border-color: rgba(99, 102, 241, 0.5); background: rgba(59, 130, 246, 0.18); color: #bfdbfe; }
.button:hover { border-color: var(--border-hover); color: var(--text-primary); }
.shot { margin: 36px 0 0; text-align: center; }
.shot img { width: min(880px, 100%); border: 1px solid var(--border); border-radius: 14px; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45); }
.shot figcaption { margin-top: 10px; color: var(--text-muted); font-size: 0.78rem; }
.section { margin-top: 48px; }
.section h2 { margin: 0 0 16px; font-size: 1.3rem; letter-spacing: -0.01em; }
.section > p { margin: 0 0 18px; color: var(--text-secondary); font-size: 0.92rem; }
.feature-grid, .script-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
.feature, .script-card { padding: 18px; border: 1px solid var(--border); border-radius: 12px; background: var(--bg-card); }
.feature h3, .script-card h2 { margin: 0 0 6px; font-size: 0.92rem; }
.feature p, .script-card p { margin: 0; color: var(--text-secondary); font-size: 0.84rem; }
.script-card { display: flex; flex-direction: column; gap: 8px; }
.script-card h2 { font-family: var(--font-mono); overflow-wrap: anywhere; }
.script-card .source { color: var(--text-muted); font-family: var(--font-mono); font-size: 0.72rem; text-decoration: none; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.script-card .install { align-self: flex-start; padding: 7px 11px; border: 1px solid rgba(99, 102, 241, 0.45); border-radius: 8px; background: rgba(59, 130, 246, 0.18); color: #bfdbfe; font-size: 0.8rem; font-weight: 600; text-decoration: none; }
.platforms { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 12px; }
.platform { display: flex; flex-direction: column; gap: 4px; padding: 16px 18px; border: 1px solid var(--border); border-radius: 12px; background: var(--bg-card); text-decoration: none; }
.platform strong { color: var(--text-primary); font-size: 0.95rem; }
.platform span { color: var(--text-secondary); font-size: 0.8rem; }
.footer { padding: 20px 0 28px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 0.78rem; }
@media (max-width: 760px) {
    .layout { flex-direction: column; gap: 20px; }
    .sidebar { position: static; width: 100%; }
    .article { padding: 22px 18px; }
    .topbar-inner { flex-wrap: wrap; padding: 8px 0; }
    .languages { width: 100%; margin-left: 0; }
}
`;

const copyCache = new Map();

async function copyFor(language) {
    if (!copyCache.has(language)) {
        const file = path.join(siteRoot, "src", "i18n", `${language}.json`);
        copyCache.set(language, JSON.parse(await readFile(file, "utf8")));
    }

    return copyCache.get(language);
}

async function readDoc(language, slug) {
    const translated = path.join(docsDirectory, language, `${slug}.md`);
    const file = language === "en" || !existsSync(translated)
        ? path.join(docsDirectory, "en", `${slug}.md`)
        : translated;

    return await readFile(file, "utf8");
}

async function readScripts() {
    const names = (await readdir(luaDirectory)).filter((name) => name.endsWith(".lua")).sort();
    return await Promise.all(names.map(async (name) => {
        const body = await readFile(path.join(luaDirectory, name), "utf8");
        const description = body.split(/\r?\n/).map((line) => /^--\s+(.+)$/.exec(line)?.[1].trim()).find(Boolean) ?? "";
        const source = `https://raw.githubusercontent.com/T2PeNBiX99wcoxKv3A4g/URLCheck/master/Lua/${name}`;

        return {
            name,
            description,
            source,
            install: `checkurl://script?url=${encodeURIComponent(source)}`
        };
    }));
}

const escapeHtml = (value) => value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function plainText(markdown) {
    return markdown
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/^#{1,6}\s+/gm, "")
        .replace(/^[>\-*+]\s+/gm, "")
        .replace(/^\d+\.\s+/gm, "")
        .replace(/[|*_~]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function titleOf(markdown, fallback) {
    const match = /^#\s+(.+)$/m.exec(markdown);
    return match ? match[1].trim() : fallback;
}

function descriptionOf(markdown, fallback) {
    const title = titleOf(markdown, "");
    const text = plainText(markdown);
    const body = title && text.startsWith(title) ? text.slice(title.length).trim() : text;
    const value = body || text || fallback;
    return value.length > 155 ? `${value.slice(0, 152).trimEnd()}…` : value;
}

function rewriteLinks(markdown, language) {
    return markdown.replace(/\]\(([^)\s]+)\)/g, (match, target) => {
        const page = target.split("#")[0];
        return known.has(page) ? `](${absolute(docsPath(language, page))})` : match;
    });
}

function pathFor(kind, language, slug = "") {
    if (kind === "docs")
        return docsPath(language, slug);

    return kind === "scripts" ? scriptsPath(language) : homePath(language);
}

function alternates(kind, language, slug = "") {
    return LANGUAGES.map((entry) => ({
        language: entry,
        url: absolute(pathFor(kind, entry, slug))
    }));
}

function languageLinks(kind, current, slug = "") {
    return LANGUAGES.map((entry) => {
        const url = absolute(pathFor(kind, entry, slug));
        const active = entry === current ? ' aria-current="page"' : "";
        return `<a href="${url}"${active}>${LANGUAGE_LABELS[entry]}</a>`;
    }).join("");
}

function head({title, description, canonical, language, kind, slug = "", jsonLd}) {
    const image = absolute("/og.png");
    const alternateLinks = alternates(kind, language, slug)
        .map((entry) => `<link rel="alternate" hreflang="${entry.language}" href="${entry.url}"/>`)
        .join("\n    ");
    const defaultLink = `<link rel="alternate" hreflang="x-default" href="${absolute(
        pathFor(kind, "en", slug)
    )}"/>`;

    return `<!doctype html>
<html lang="${language}">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="theme-color" content="#0b0f19"/>
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}"/>
    <link rel="canonical" href="${canonical}"/>
    <meta name="robots" content="index,follow"/>
    <link rel="icon" type="image/svg+xml" href="${absolute("/icon.svg")}"/>
    ${alternateLinks}
    ${defaultLink}

    <meta property="og:type" content="${kind === "home" ? "website" : "article"}"/>
    <meta property="og:site_name" content="URLCheck"/>
    <meta property="og:locale" content="${OG_LOCALES[language]}"/>
    <meta property="og:title" content="${escapeHtml(title)}"/>
    <meta property="og:description" content="${escapeHtml(description)}"/>
    <meta property="og:url" content="${canonical}"/>
    <meta property="og:image" content="${image}"/>
    <meta property="og:image:type" content="image/png"/>
    <meta property="og:image:width" content="1200"/>
    <meta property="og:image:height" content="630"/>
    <meta property="og:image:alt" content="${escapeHtml(title)}"/>

    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content="${escapeHtml(title)}"/>
    <meta name="twitter:description" content="${escapeHtml(description)}"/>
    <meta name="twitter:image" content="${image}"/>
    <meta name="twitter:image:alt" content="${escapeHtml(title)}"/>

    <script type="application/ld+json">${JSON.stringify(jsonLd).replaceAll("<", "\\u003c")}</script>
    <style>${CSS}</style>
</head>`;
}

function header(copy, language, kind, slug = "") {
    const homeUrl = absolute(homePath(language));
    const scriptsUrl = absolute(scriptsPath(language));
    const docsUrl = absolute(docsPath(language, "Lua-Scripts"));

    return `<header class="topbar">
    <div class="topbar-inner">
        <a class="brand" href="${homeUrl}">
            <img src="${absolute("/icon.svg")}" alt=""/>
            URLCheck
        </a>
        <nav class="nav">
            <a href="${homeUrl}"${kind === "home" ? ' aria-current="page"' : ""}>${escapeHtml(copy.nav.home)}</a>
            <a href="${scriptsUrl}"${kind === "scripts" ? ' aria-current="page"' : ""}>${escapeHtml(copy.nav.scripts)}</a>
            <a href="${docsUrl}"${kind === "docs" ? ' aria-current="page"' : ""}>${escapeHtml(copy.nav.docs)}</a>
            <a href="${REPOSITORY}">GitHub</a>
        </nav>
        <div class="languages">${languageLinks(kind, language, slug)}</div>
    </div>
</header>`;
}

function footer(copy) {
    return `<footer class="footer">${escapeHtml(copy.footer)}</footer>`;
}

async function renderDoc(language, page) {
    const markdown = await readDoc(language, page.slug);
    const copy = await copyFor(language);
    const title = titleOf(markdown, page.slug);
    const description = descriptionOf(markdown, copy.home.tagline);
    const canonical = absolute(docsPath(language, page.slug));
    const pages = await Promise.all(DOC_PAGES.map(async (entry) => ({
        ...entry,
        title: titleOf(await readDoc(language, entry.slug), entry.slug)
    })));

    const article = renderToStaticMarkup(
        React.createElement(Markdown, {remarkPlugins: [remarkGfm]}, rewriteLinks(markdown, language))
    );
    const sidebar = ["scripting", "libraries"].map((group) => `<div class="group">
        <span class="group-title">${escapeHtml(copy.docs[group])}</span>
        ${pages.filter((entry) => entry.group === group).map((entry) =>
            `<a href="${absolute(docsPath(language, entry.slug))}"${
                entry.slug === page.slug ? ' aria-current="page"' : ""
            }>${escapeHtml(entry.title)}</a>`).join("")}
    </div>`).join("");

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: title,
            description,
            inLanguage: language,
            url: canonical,
            mainEntityOfPage: canonical,
            isPartOf: {"@type": "WebSite", name: "URLCheck", url: absolute("/")},
            publisher: {
                "@type": "Organization",
                name: "URLCheck",
                url: REPOSITORY,
                logo: {"@type": "ImageObject", url: absolute("/icon.svg")}
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                {"@type": "ListItem", position: 1, name: "Home", item: absolute(homePath(language))},
                {"@type": "ListItem", position: 2, name: copy.nav.docs,
                    item: absolute(docsPath(language, "Lua-Scripts"))},
                {"@type": "ListItem", position: 3, name: title, item: canonical}
            ]
        }
    ];

    return `${head({
        title: `${title} — URLCheck`,
        description,
        canonical,
        language,
        kind: "docs",
        slug: page.slug,
        jsonLd
    })}
<body>
${header(copy, language, "docs", page.slug)}
<main class="shell">
    <div class="layout">
        <aside class="sidebar">${sidebar}</aside>
        <article class="article"><div class="doc-body">${article}</div></article>
    </div>
</main>
${footer(copy)}
</body>
</html>
`;
}

async function renderScripts(language) {
    const copy = await copyFor(language);
    const canonical = absolute(scriptsPath(language));
    const scripts = await readScripts();
    const title = `${copy.scripts.title} — URLCheck`;
    const description = copy.scripts.subtitle.replace("{scheme}", "checkurl://");

    const cards = scripts.map((script) => `<article class="script-card">
        <h2>${escapeHtml(script.name)}</h2>
        <p>${escapeHtml(script.description)}</p>
        <a class="source" href="${script.source}" title="${script.source}">${escapeHtml(script.source)}</a>
        <a class="install" href="${script.install}">${escapeHtml(copy.scripts.install)}</a>
    </article>`).join("");

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: copy.scripts.title,
            description,
            inLanguage: language,
            url: canonical,
            isPartOf: {"@type": "WebSite", name: "URLCheck", url: absolute("/")},
            mainEntity: {
                "@type": "ItemList",
                itemListElement: scripts.map((script, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: script.name,
                    url: script.source
                }))
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                {"@type": "ListItem", position: 1, name: "Home", item: absolute(homePath(language))},
                {"@type": "ListItem", position: 2, name: copy.nav.scripts, item: canonical}
            ]
        }
    ];

    return `${head({
        title,
        description,
        canonical,
        language,
        kind: "scripts",
        jsonLd
    })}
<body>
${header(copy, language, "scripts")}
<main class="shell">
    <section>
        <h1>${escapeHtml(copy.scripts.title)}</h1>
        <p class="section-lead">${escapeHtml(copy.scripts.subtitle).replace("{scheme}", "<code>checkurl://</code>")}</p>
        <div class="script-grid">${cards}</div>
    </section>
</main>
${footer(copy)}
</body>
</html>
`;
}

async function renderHome(language) {
    const copy = await copyFor(language);
    const home = copy.home;
    const canonical = absolute(homePath(language));
    const title = `URLCheck — ${home.tagline}`;
    const description = home.whatText;
    const docsUrl = absolute(docsPath(language, "Lua-Scripts"));
    const scriptsUrl = absolute(scriptsPath(language));

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "URLCheck",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Windows, Linux",
            description,
            url: canonical,
            downloadUrl: RELEASES,
            inLanguage: language,
            offers: {"@type": "Offer", price: "0", priceCurrency: "USD"},
            publisher: {"@type": "Organization", name: "URLCheck", url: REPOSITORY}
        },
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "URLCheck",
            url: canonical,
            inLanguage: language
        }
    ];

    const features = home.features.map((feature) =>
        `<article class="feature"><h3>${escapeHtml(feature.name)}</h3><p>${escapeHtml(feature.text)}</p></article>`
    ).join("");
    const platforms = home.platforms.map((platform) =>
        `<a class="platform" href="${RELEASES}"><strong>${escapeHtml(platform.name)}</strong><span>${escapeHtml(platform.note)}</span></a>`
    ).join("");

    return `${head({
        title,
        description,
        canonical,
        language,
        kind: "home",
        jsonLd
    })}
<body>
${header(copy, language, "home")}
<main class="shell">
    <section class="home-hero">
        <img src="${absolute("/icon.svg")}" alt=""/>
        <h1>URLCheck</h1>
        <p>${escapeHtml(home.tagline)}</p>
        <div class="actions">
            <a class="button primary" href="${RELEASES}">${escapeHtml(home.download)}</a>
            <a class="button" href="${scriptsUrl}">${escapeHtml(home.installScript)}</a>
            <a class="button" href="${docsUrl}">${escapeHtml(home.documentation)}</a>
        </div>
    </section>

    <figure class="shot">
        <img src="${screenshot}" alt="${escapeHtml(home.mainWindowAlt)}"/>
        <figcaption>${escapeHtml(home.mainWindow)}</figcaption>
    </figure>

    <section class="section">
        <h2>${escapeHtml(home.whatTitle)}</h2>
        <p>${escapeHtml(home.whatText)}</p>
    </section>

    <section class="section">
        <h2>${escapeHtml(home.popupTitle)}</h2>
        <p>${escapeHtml(home.popupText)}</p>
    </section>

    <section class="section">
        <h2>${escapeHtml(home.featuresTitle)}</h2>
        <div class="feature-grid">${features}</div>
    </section>

    <section class="section">
        <h2>${escapeHtml(home.installTitle)}</h2>
        <p>${escapeHtml(home.installBefore)} <a href="${REPOSITORY}">${escapeHtml(home.readme)}</a> ${escapeHtml(home.installAfter)}</p>
        <div class="platforms">${platforms}</div>
    </section>
</main>
${footer(copy)}
</body>
</html>
`;
}

async function writePage(pathname, html) {
    const file = pathname.endsWith("/")
        ? path.join(dist, pathname, "index.html")
        : path.join(dist, `${pathname}.html`);

    await mkdir(path.dirname(file), {recursive: true});
    await writeFile(file, html, "utf8");
}

function sitemap() {
    const entries = [
        ...LANGUAGES.map((language) => ({
            kind: "home", language, slug: "", url: absolute(homePath(language))
        })),
        ...LANGUAGES.flatMap((language) => DOC_PAGES.map((page) => ({
            kind: "docs", language, slug: page.slug, url: absolute(docsPath(language, page.slug))
        }))),
        ...LANGUAGES.map((language) => ({
            kind: "scripts", language, slug: "", url: absolute(scriptsPath(language))
        }))
    ];

    const urls = entries.map((entry) => {
        const links = alternates(entry.kind, entry.language, entry.slug)
            .map((alternate) =>
                `    <xhtml:link rel="alternate" hreflang="${alternate.language}" href="${alternate.url}"/>`)
            .join("\n");

        return `  <url>\n    <loc>${entry.url}</loc>\n${links}\n  </url>`;
    }).join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

async function main() {
    for (const language of LANGUAGES) {
        if (language !== "en")
            await writePage(homePath(language), await renderHome(language));

        await writePage(scriptsPath(language), await renderScripts(language));

        for (const page of DOC_PAGES)
            await writePage(docsPath(language, page.slug), await renderDoc(language, page));
    }

    await writeFile(path.join(dist, "sitemap.xml"), sitemap(), "utf8");
    await writeFile(path.join(dist, "robots.txt"),
        `User-agent: *\nAllow: /\n\nSitemap: ${absolute("/sitemap.xml")}\n`, "utf8");

    console.log(`Generated ${LANGUAGES.length * DOC_PAGES.length} doc pages, ${LANGUAGES.length} script pages and ${LANGUAGES.length - 1} localized home pages.`);
}

await main();
