// Generates the translated home pages, sitemap and robots.txt. The SPA remains the interactive
// site; docs and scripts are deliberately not duplicated as static pages, so moving between them
// stays instant. The English home is the SPA itself; only the three translated homes get a static
// HTML entry point for search engines.
import {mkdir, readFile, writeFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {
    absolute,
    homePath,
    LANGUAGES,
    LANGUAGE_LABELS,
    OG_LOCALES,
    RELEASES,
    REPOSITORY
} from "./docs-config.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(here, "..");
const dist = path.join(siteRoot, "dist");
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
.topbar {
    border-bottom: 1px solid var(--border);
    background: rgba(8, 7, 15, 0.88);
    backdrop-filter: blur(14px);
}
.topbar-inner, .shell, .footer { width: min(1100px, calc(100% - 40px)); margin: 0 auto; }
.topbar-inner { display: flex; align-items: center; gap: 18px; min-height: 58px; }
.brand { display: inline-flex; align-items: center; gap: 9px; color: var(--text-primary); font-weight: 700; text-decoration: none; }
.brand img { width: 26px; height: 26px; border-radius: 7px; }
.nav { display: flex; align-items: center; gap: 4px; }
.nav a { padding: 7px 10px; border-radius: 7px; color: var(--text-secondary); font-size: 0.86rem; text-decoration: none; }
.nav a:hover, .nav a[aria-current="page"] { background: rgba(167, 139, 250, 0.14); color: var(--text-primary); }
.languages { display: flex; gap: 2px; margin-left: auto; flex-wrap: wrap; }
.languages a { padding: 5px 8px; border-radius: 6px; color: var(--text-muted); font-size: 0.75rem; text-decoration: none; }
.languages a:hover, .languages a[aria-current="page"] { color: var(--text-primary); background: rgba(167, 139, 250, 0.12); }
.shell { padding: 36px 0 56px; }
.home-hero { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 32px 0 12px; text-align: center; }
.home-hero img { width: 88px; height: 88px; border-radius: 22px; filter: drop-shadow(0 12px 32px rgba(99, 102, 241, 0.35)); }
.home-hero h1 { margin: 0; font-size: 2.6rem; letter-spacing: -0.03em; }
.home-hero p { max-width: 560px; margin: 0; color: var(--text-secondary); font-size: 1.05rem; }
.actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 12px; }
.button { display: inline-flex; align-items: center; padding: 10px 18px; border: 1px solid var(--border); border-radius: 9px; color: var(--text-secondary); font-size: 0.9rem; font-weight: 600; text-decoration: none; }
.button.primary { border-color: rgba(99, 102, 241, 0.5); background: rgba(59, 130, 246, 0.18); color: #bfdbfe; }
.button:hover { border-color: var(--border-hover); color: var(--text-primary); }
.shot { margin: 36px 0 0; text-align: center; }
.shot img { width: min(880px, 100%); border: 1px solid var(--border); border-radius: 14px; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45); }
.shot figcaption { margin-top: 10px; color: var(--text-muted); font-size: 0.78rem; }
.section { margin-top: 48px; }
.section h2 { margin: 0 0 16px; font-size: 1.3rem; letter-spacing: -0.01em; }
.section > p { margin: 0 0 18px; color: var(--text-secondary); font-size: 0.92rem; }
.feature-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
.feature { padding: 18px; border: 1px solid var(--border); border-radius: 12px; background: var(--bg-card); }
.feature h3 { margin: 0 0 6px; font-size: 0.92rem; }
.feature p { margin: 0; color: var(--text-secondary); font-size: 0.84rem; }
.platforms { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 12px; }
.platform { display: flex; flex-direction: column; gap: 4px; padding: 16px 18px; border: 1px solid var(--border); border-radius: 12px; background: var(--bg-card); text-decoration: none; }
.platform strong { color: var(--text-primary); font-size: 0.95rem; }
.platform span { color: var(--text-secondary); font-size: 0.8rem; }
.footer { padding: 20px 0 28px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 0.78rem; }
@media (max-width: 760px) {
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

const escapeHtml = (value) => value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function languageLinks(current) {
    return LANGUAGES.map((entry) => {
        const active = entry === current ? ' aria-current="page"' : "";
        return `<a href="${absolute(homePath(entry))}"${active}>${LANGUAGE_LABELS[entry]}</a>`;
    }).join("");
}

function head({title, description, canonical, language, jsonLd}) {
    const image = absolute("/og.png");
    const alternateLinks = LANGUAGES.map((entry) =>
        `<link rel="alternate" hreflang="${entry}" href="${absolute(homePath(entry))}"/>`).join("\n    ");

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
    <link rel="alternate" hreflang="x-default" href="${absolute(homePath("en"))}"/>

    <meta property="og:type" content="website"/>
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

function header(copy, language) {
    return `<header class="topbar">
    <div class="topbar-inner">
        <a class="brand" href="${absolute(homePath(language))}">
            <img src="${absolute("/icon.svg")}" alt=""/>
            URLCheck
        </a>
        <nav class="nav">
            <a href="${absolute(homePath(language))}" aria-current="page">${escapeHtml(copy.nav.home)}</a>
            <a href="${absolute("/")}#/scripts">${escapeHtml(copy.nav.scripts)}</a>
            <a href="${absolute("/")}#/docs/Lua-Scripts">${escapeHtml(copy.nav.docs)}</a>
            <a href="${REPOSITORY}">GitHub</a>
        </nav>
        <div class="languages">${languageLinks(language)}</div>
    </div>
</header>`;
}

async function renderHome(language) {
    const copy = await copyFor(language);
    const home = copy.home;
    const canonical = absolute(homePath(language));
    const title = `URLCheck — ${home.tagline}`;
    const description = home.whatText;

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

    return `${head({title, description, canonical, language, jsonLd})}
<body>
${header(copy, language)}
<main class="shell">
    <section class="home-hero">
        <img src="${absolute("/icon.svg")}" alt=""/>
        <h1>URLCheck</h1>
        <p>${escapeHtml(home.tagline)}</p>
        <div class="actions">
            <a class="button primary" href="${RELEASES}">${escapeHtml(home.download)}</a>
            <a class="button" href="${absolute("/")}#/scripts">${escapeHtml(home.installScript)}</a>
            <a class="button" href="${absolute("/")}#/docs/Lua-Scripts">${escapeHtml(home.documentation)}</a>
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
<footer class="footer">${escapeHtml(copy.footer)}</footer>
</body>
</html>
`;
}

async function main() {
    for (const language of LANGUAGES) {
        if (language === "en")
            continue;

        const file = path.join(dist, homePath(language), "index.html");
        await mkdir(path.dirname(file), {recursive: true});
        await writeFile(file, await renderHome(language), "utf8");
    }

    const urls = LANGUAGES.map((language) => `  <url>
    <loc>${absolute(homePath(language))}</loc>
${LANGUAGES.map((entry) =>
        `    <xhtml:link rel="alternate" hreflang="${entry}" href="${absolute(homePath(entry))}"/>`).join("\n")}
  </url>`).join("\n");

    await writeFile(path.join(dist, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`, "utf8");
    await writeFile(path.join(dist, "robots.txt"),
        `User-agent: *\nAllow: /\n\nSitemap: ${absolute("/sitemap.xml")}\n`, "utf8");

    console.log(`Generated ${LANGUAGES.length - 1} localized home pages, sitemap and robots.txt.`);
}

await main();
