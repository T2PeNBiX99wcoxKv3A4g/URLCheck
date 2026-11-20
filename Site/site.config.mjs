/**
 * Everything about this project that is not text: where it lives, how it looks, and which pages the
 * documentation holds. Plain JavaScript, because the generators read it with node.
 */
export const site = {
    name: "URLCheck",
    tagline: "Check the URL before it opens in your browser.",
    description: "URLCheck shows where a link really goes before it opens in your browser.",
    url: "https://t2penbix99wcoxkv3a4g.github.io/URLCheck/",
    icon: "https://raw.githubusercontent.com/T2PeNBiX99wcoxKv3A4g/URLCheck/master/icon.svg",
    webView2Url: "https://developer.microsoft.com/microsoft-edge/webview2/",
    repository: "https://github.com/T2PeNBiX99wcoxKv3A4g/URLCheck",
    languages: ["en", "ja", "zh-CN", "zh-TW"],
    docs: [
        {
            "slug": "Lua-Scripts",
            "group": "scripting"
        },
        {
            "slug": "Lua-Script-Examples",
            "group": "scripting"
        },
        {
            "slug": "API",
            "group": "scripting"
        },
        {
            "slug": "_G",
            "group": "libraries"
        },
        {
            "slug": "table",
            "group": "libraries"
        },
        {
            "slug": "string",
            "group": "libraries"
        },
        {
            "slug": "math",
            "group": "libraries"
        },
        {
            "slug": "coroutine",
            "group": "libraries"
        },
        {
            "slug": "bit32",
            "group": "libraries"
        },
        {
            "slug": "Changelog",
            "group": "history",
            "source": "../CHANGELOG.md"
        }
    ],
    theme: {
        "accent": "#3b82f6",
        "accentStrong": "#6366f1",
        "background": "#0b0f19",
        "card": "rgba(17, 24, 39, 0.6)",
        "topBar": "rgba(11, 15, 25, 0.85)",
        "textPrimary": "#f9fafb",
        "textSecondary": "#9ca3af",
        "textMuted": "#6b7280",
        "body": "#d1d5db",
        "border": "rgba(59, 130, 246, 0.14)",
        "borderHover": "rgba(59, 130, 246, 0.42)"
    },
    screenshots: {
        main: "https://raw.githubusercontent.com/T2PeNBiX99wcoxKv3A4g/URLCheck/master/docs/main-window.png",
        popup: "https://raw.githubusercontent.com/T2PeNBiX99wcoxKv3A4g/URLCheck/master/docs/popup.png",
    },
    extraNav: [{key: "scripts", href: "#/scripts"}],
    scriptInstall: "#/scripts",
    scripts: {
        "directory": "../Lua",
        "extension": ".lua",
        "comment": "--",
        "scheme": "checkurl://script?url=",
        "branch": "master",
        "folder": "Lua"
    },
};
