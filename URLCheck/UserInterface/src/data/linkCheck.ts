/**
 * Heuristics that spot a link pretending to be something else: a host spelled with letters from
 * another alphabet, a host written in a form nobody can read back, or a host a keystroke away from
 * a platform people sign in to. Nothing here blocks anything — the popup only warns.
 */

/** One suspicious thing about a URL's host. */
export type HostWarning =
    | { kind: "nonAscii" }
    | { kind: "punycode" }
    | { kind: "lookalike"; brand: string; domain: string; score: number };

/** How much a label has to look like a brand name before it is reported. */
const LOOKALIKE_THRESHOLD = 0.8;

/** Shortest brand name worth a fuzzy comparison; below it, one edit already means another word. */
const MIN_FUZZY_TOKEN = 4;

/** Registrable suffixes with two labels, so the name before them is the one the owner picked. */
const MULTI_SUFFIXES = new Set([
    "co.uk", "org.uk", "ac.uk", "gov.uk", "me.uk",
    "com.au", "net.au", "org.au", "co.nz", "co.za",
    "co.jp", "ne.jp", "or.jp", "co.kr", "or.kr",
    "com.cn", "net.cn", "org.cn", "com.hk", "com.tw", "com.sg", "com.my",
    "com.br", "com.mx", "com.ar", "com.co", "com.pe", "com.ve",
    "co.in", "co.id", "com.vn", "com.ph", "com.tr", "com.sa", "com.eg",
    "co.il", "com.ua", "com.pk", "com.ng", "com.es", "com.pl", "com.ru"
]);

/** Words a look-alike host bolts onto a brand name to sound official. */
const LURES = [
    "login", "signin", "sign-in", "secure", "security", "account", "accounts", "support",
    "verify", "verification", "update", "billing", "invoice", "wallet", "gift", "bonus",
    "free", "official", "auth", "recovery", "confirm", "unlock", "payment", "refund",
    "service", "help", "alert", "notice", "center", "team"
];

/** Digits and symbols that stand in for letters when a host is dressed up as another one. */
const CONFUSABLES: Record<string, string> = {
    "0": "o", "1": "l", "3": "e", "4": "a", "5": "s", "6": "g", "7": "t", "8": "b", "9": "g",
    "@": "a", "$": "s", "!": "i"
};

/** The host exactly as the URL spells it, without userinfo, port or trailing dot. */
function asWrittenHost(url: string): string {
    const scheme = /^[a-z][a-z0-9+.-]*:\/\//i.exec(url);
    const authority = scheme ? url.slice(scheme[0].length) : url;
    const host = (authority.split(/[/?#]/)[0] ?? "").slice(authority.lastIndexOf("@") + 1);

    // An IPv6 literal is bracketed and can never be a brand name.
    if (host.startsWith("[")) return "";

    return host.replace(/:\d*$/, "").replace(/\.$/, "").toLowerCase();
}

/** How many trailing labels belong to the registry: one, or two for `co.uk` and friends. */
function registryLabels(labels: string[]): number {
    const count = labels.length;
    return count >= 2 && MULTI_SUFFIXES.has(`${labels[count - 2]}.${labels[count - 1]}`) ? 2 : 1;
}

/** The registrable domain: the label the owner chose plus the suffix it was registered under. */
function registrableDomain(labels: string[]): string {
    return labels.slice(-(registryLabels(labels) + 1)).join(".");
}

/** Rewrites the digits and symbols that are used to disguise a letter. */
function foldConfusables(value: string): string {
    return value.replace(/[013456789@$!]/g, (character) => CONFUSABLES[character] ?? character);
}

/** Damerau-Levenshtein distance: a swap of two neighbours costs one edit, like a typo does. */
function editDistance(a: string, b: string): number {
    const grid: number[][] = [];

    for (let i = 0; i <= a.length; i++) {
        const row = [i];
        for (let j = 1; j <= b.length; j++) row.push(i === 0 ? j : 0);
        grid.push(row);
    }

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            grid[i][j] = Math.min(grid[i - 1][j] + 1, grid[i][j - 1] + 1, grid[i - 1][j - 1] + cost);

            if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1])
                grid[i][j] = Math.min(grid[i][j], grid[i - 2][j - 2] + 1);
        }
    }

    return grid[a.length][b.length];
}

/**
 * How much one host label looks like a brand name, from 0 (not at all) to 1 (the name, spelled
 * with something else). A bare brand name in the registrable label is left alone: brands do use
 * other suffixes, so accusing `amazon.de` of impersonating `amazon.com` would be wrong.
 */
function lookalikeScore(label: string, token: string, isRegistrableLabel: boolean): number {
    if (label === token) return isRegistrableLabel ? 0 : 0.9; // the name parked in somebody else's subdomain

    const folded = foldConfusables(label);
    if (folded === token) return 0.95; // paypa1, amaz0n, faceb00k
    if (label.split(/[-_]+/).includes(token)) return 0.9; // steam-login

    // One letter added at the end makes a plural or a derived word, which is too weak to report.
    const appended = label.length === token.length + 1 && label.startsWith(token);

    if (!appended &&
        token.length >= MIN_FUZZY_TOKEN &&
        Math.abs(folded.length - token.length) <= 2 &&
        editDistance(folded, token) === 1)
        return 0.8; // one letter off: stearn, gogle, microsotf

    if (token.length >= 3 && folded.includes(token) && LURES.some((lure) => folded.includes(lure)))
        return 0.85; // steamsupport, paypalsecure

    return 0;
}

/** The best brand a host pretends to be, or null when nothing is close enough. */
function findLookalike(labels: string[]): { brand: Brand; score: number } | null {
    const suffix = registryLabels(labels);
    const registrable = registrableDomain(labels);
    const registrableIndex = labels.length - suffix - 1;

    // A domain any brand really owns is that brand (or its subdomain), whoever it belongs to: a
    // login page under `ctbcbank.com.tw` must not be reported because `ecard` is one edit from
    // `dcard`.
    const genuine = (domain: string) => registrable === domain || registrable.endsWith(`.${domain}`);
    if (BRANDS.some((brand) => brand.domains.some(genuine))) return null;

    let best: { brand: Brand; score: number } | null = null;

    for (const brand of BRANDS) {
        for (let index = 0; index < labels.length; index++) {
            for (const token of brand.tokens) {
                const score = lookalikeScore(labels[index], token, index === registrableIndex);
                if (score >= LOOKALIKE_THRESHOLD && (!best || score > best.score))
                    best = {brand, score};
            }
        }
    }

    return best;
}

/**
 * Everything worth warning about for one URL's host. The URL is read as it was written, because
 * the parsed form has already turned any non-Latin host into `xn--...`.
 */
export function hostWarnings(url: string): HostWarning[] {
    const host = asWrittenHost(url);
    if (!host) return [];

    const labels = host.split(".").filter(Boolean);
    if (labels.length < 2) return []; // an intranet name is not impersonating anybody

    const warnings: HostWarning[] = [];

    // eslint-disable-next-line no-control-regex -- deliberately matching "not ASCII"
    if (/[^\x00-\x7f]/.test(host)) warnings.push({kind: "nonAscii"});
    if (labels.some((label) => label.startsWith("xn--"))) warnings.push({kind: "punycode"});

    const lookalike = findLookalike(labels);
    if (lookalike)
        warnings.push({
            kind: "lookalike",
            brand: lookalike.brand.name,
            domain: lookalike.brand.domains[0],
            score: lookalike.score
        });

    return warnings;
}

/** A platform worth impersonating, with the names and domains it really uses. */
interface Brand {
    /** Shown to the user. */
    name: string;
    /** Lower-case names matched against a host label, including the brand's sign-in domains. */
    tokens: string[];
    /** Registrable domains the brand really uses; anything under one of them is genuine. */
    domains: string[];
}

/**
 * The catalog the look-alike check compares against. It is deliberately about the places where an
 * intercepted link asks for a password or a card; a generic top-sites list would mostly add noise.
 */
const BRANDS: Brand[] = [
    // ---------------------------------------------------------------- money
    {name: "PayPal", tokens: ["paypal"], domains: ["paypal.com", "paypal.me", "paypalobjects.com"]},
    {name: "Visa", tokens: ["visa"], domains: ["visa.com", "visa.com.tw"]},
    {name: "Mastercard", tokens: ["mastercard"], domains: ["mastercard.com", "mastercard.us"]},
    {name: "American Express", tokens: ["americanexpress", "amex"], domains: ["americanexpress.com", "amex.com", "aexp.com"]},
    {name: "Stripe", tokens: ["stripe"], domains: ["stripe.com"]},
    {name: "Coinbase", tokens: ["coinbase"], domains: ["coinbase.com"]},
    {name: "Binance", tokens: ["binance"], domains: ["binance.com", "binance.us", "bnbstatic.com"]},
    {name: "Kraken", tokens: ["kraken"], domains: ["kraken.com"]},
    {name: "MetaMask", tokens: ["metamask"], domains: ["metamask.io"]},
    {name: "Wise", tokens: ["wise", "transferwise"], domains: ["wise.com", "transferwise.com"]},
    {name: "Revolut", tokens: ["revolut"], domains: ["revolut.com"]},
    {name: "Alipay", tokens: ["alipay"], domains: ["alipay.com", "alipayobjects.com"]},

    // ---------------------------------------------------------------- banks
    {name: "Chase", tokens: ["chase"], domains: ["chase.com", "jpmorgan.com"]},
    {name: "Bank of America", tokens: ["bankofamerica", "bofa"], domains: ["bankofamerica.com", "bofa.com"]},
    {name: "Wells Fargo", tokens: ["wellsfargo"], domains: ["wellsfargo.com"]},
    {name: "Citibank", tokens: ["citibank", "citi"], domains: ["citi.com", "citibank.com", "citibank.com.tw"]},
    {name: "HSBC", tokens: ["hsbc"], domains: ["hsbc.com", "hsbc.co.uk", "hsbc.com.tw"]},
    {name: "Barclays", tokens: ["barclays"], domains: ["barclays.co.uk", "barclays.com"]},
    {name: "Santander", tokens: ["santander"], domains: ["santander.com"]},
    {name: "Capital One", tokens: ["capitalone"], domains: ["capitalone.com"]},
    {name: "Cathay United Bank", tokens: ["cathaybk", "cathay"], domains: ["cathaybk.com.tw", "cathay.com"]},
    {name: "CTBC Bank", tokens: ["ctbc", "ctbcbank"], domains: ["ctbcbank.com"]},
    {name: "E.SUN Bank", tokens: ["esun", "esunbank"], domains: ["esunbank.com.tw"]},
    {name: "Taishin Bank", tokens: ["taishin", "taishinbank"], domains: ["taishinbank.com.tw"]},
    {name: "Fubon Bank", tokens: ["fubon"], domains: ["fubon.com", "taipeifubon.com.tw"]},
    {name: "Mega Bank", tokens: ["megabank"], domains: ["megabank.com.tw"]},
    {name: "First Bank", tokens: ["firstbank"], domains: ["firstbank.com.tw"]},
    {name: "Hua Nan Bank", tokens: ["hncb"], domains: ["hncb.com.tw"]},
    {name: "Chang Hwa Bank", tokens: ["chb"], domains: ["chb.com.tw"]},

    // ----------------------------------------------------------------- tech
    {
        name: "Google",
        tokens: ["google", "gmail", "googlemail", "youtube"],
        domains: [
            "google.com", "gmail.com", "googlemail.com", "youtube.com", "googleapis.com",
            "googleusercontent.com", "gstatic.com", "withgoogle.com", "goo.gl", "ytimg.com",
            "google.com.tw", "google.co.jp", "google.co.uk", "google.de", "google.fr",
            "google.ca", "google.com.au", "google.co.in", "google.com.br", "google.es", "google.it"
        ]
    },
    {
        name: "Microsoft",
        tokens: ["microsoft", "outlook", "hotmail", "onedrive", "sharepoint", "xbox", "skype"],
        domains: [
            "microsoft.com", "live.com", "outlook.com", "hotmail.com", "office.com", "office365.com",
            "microsoftonline.com", "microsoft365.com", "onedrive.com", "sharepoint.com", "xbox.com",
            "xboxlive.com", "bing.com", "msn.com", "azure.com", "microsoftstore.com",
            "windowsupdate.com", "skype.com", "msecnd.net"
        ]
    },
    {name: "Apple", tokens: ["apple", "icloud", "itunes"], domains: ["apple.com", "icloud.com", "me.com", "itunes.com", "mzstatic.com"]},
    {
        name: "Amazon",
        tokens: ["amazon", "aws", "audible"],
        domains: [
            "amazon.com", "amazon.co.uk", "amazon.de", "amazon.co.jp", "amazon.fr", "amazon.it",
            "amazon.es", "amazon.ca", "amazon.com.au", "amazon.in", "amazon.com.br", "amazon.com.mx",
            "amazon.com.tw", "amazonaws.com", "audible.com", "media-amazon.com", "ssl-images-amazon.com"
        ]
    },
    {
        name: "Facebook",
        tokens: ["facebook", "messenger", "instagram", "whatsapp"],
        domains: [
            "facebook.com", "fb.com", "fb.me", "messenger.com", "instagram.com", "whatsapp.com",
            "whatsapp.net", "meta.com", "threads.net", "m.me", "facebook.net", "fbcdn.net", "cdninstagram.com"
        ]
    },
    {name: "X (Twitter)", tokens: ["twitter"], domains: ["x.com", "twitter.com", "t.co", "twimg.com"]},
    {name: "LinkedIn", tokens: ["linkedin"], domains: ["linkedin.com", "licdn.com", "lnkd.in"]},
    {name: "Reddit", tokens: ["reddit"], domains: ["reddit.com", "redd.it", "redditmedia.com", "redditstatic.com"]},
    {name: "Pinterest", tokens: ["pinterest"], domains: ["pinterest.com", "pinimg.com"]},
    {name: "Snapchat", tokens: ["snapchat"], domains: ["snapchat.com", "sc-cdn.net"]},
    {
        name: "Yahoo",
        tokens: ["yahoo"],
        domains: ["yahoo.com", "yimg.com", "yahoo.co.jp", "yahoo.com.tw", "yahoo.co.uk", "yahoo.com.hk"]
    },
    {name: "Baidu", tokens: ["baidu"], domains: ["baidu.com", "bdstatic.com"]},
    {
        name: "Tencent",
        tokens: ["tencent", "wechat", "weixin", "qq"],
        domains: ["qq.com", "wechat.com", "weixin.qq.com", "tencent.com", "gtimg.cn", "qpic.cn", "servicewechat.com"]
    },
    {
        name: "Alibaba",
        tokens: ["alibaba", "taobao", "tmall", "aliexpress"],
        domains: ["alibaba.com", "taobao.com", "tmall.com", "aliexpress.com", "aliyun.com", "alicdn.com", "1688.com", "tbcdn.cn"]
    },
    {name: "JD.com", tokens: ["jd"], domains: ["jd.com", "360buyimg.com"]},
    {name: "Bilibili", tokens: ["bilibili"], domains: ["bilibili.com", "b23.tv", "hdslb.com"]},
    {name: "NetEase", tokens: ["netease", "163", "126"], domains: ["163.com", "netease.com", "126.com", "126.net"]},
    {name: "Xiaomi", tokens: ["xiaomi", "miui"], domains: ["mi.com", "xiaomi.com", "miui.com"]},
    {name: "Huawei", tokens: ["huawei", "hicloud"], domains: ["huawei.com", "hicloud.com"]},
    {name: "Samsung", tokens: ["samsung"], domains: ["samsung.com", "samsungapps.com"]},
    {name: "PlayStation", tokens: ["playstation", "sony"], domains: ["playstation.com", "playstation.net", "sony.com", "sony.net"]},
    {name: "Nintendo", tokens: ["nintendo"], domains: ["nintendo.com", "nintendo.net", "nintendo.co.jp", "nintendo-europe.com"]},

    // --------------------------------------------------------------- gaming
    {
        name: "Steam",
        tokens: ["steam", "steampowered", "steamcommunity"],
        domains: ["steampowered.com", "steamcommunity.com", "steamstatic.com", "steamcontent.com", "steamgames.com", "valvesoftware.com"]
    },
    {name: "Epic Games", tokens: ["epicgames", "fortnite", "unrealengine"], domains: ["epicgames.com", "fortnite.com", "unrealengine.com", "epicgames.dev"]},
    {name: "Battle.net", tokens: ["battlenet", "blizzard"], domains: ["battle.net", "blizzard.com", "blizzard.net", "worldofwarcraft.com"]},
    {name: "Riot Games", tokens: ["riotgames", "leagueoflegends", "valorant"], domains: ["riotgames.com", "leagueoflegends.com", "valorant.com"]},
    {name: "Roblox", tokens: ["roblox"], domains: ["roblox.com", "rbxcdn.com", "robloxlabs.com"]},
    {name: "Minecraft", tokens: ["minecraft"], domains: ["minecraft.net", "mojang.com"]},
    {name: "Ubisoft", tokens: ["ubisoft"], domains: ["ubisoft.com", "ubi.com"]},
    {name: "GOG", tokens: ["gog"], domains: ["gog.com"]},
    {name: "Rockstar Games", tokens: ["rockstar"], domains: ["rockstargames.com", "rockstarnorth.com"]},

    // ------------------------------------------------------------- messaging
    {name: "Discord", tokens: ["discord"], domains: ["discord.com", "discord.gg", "discordapp.com", "discordapp.net", "discord.media"]},
    {name: "Telegram", tokens: ["telegram"], domains: ["telegram.org", "telegram.me", "t.me", "tgme.org", "telesco.pe"]},
    {name: "Signal", tokens: ["signal"], domains: ["signal.org", "signal.art"]},
    {name: "Slack", tokens: ["slack"], domains: ["slack.com", "slack-edge.com", "slackb.com"]},
    {name: "Zoom", tokens: ["zoom"], domains: ["zoom.us", "zoom.com", "zoomgov.com"]},
    {name: "Twitch", tokens: ["twitch"], domains: ["twitch.tv", "ttvnw.net", "twitchcdn.net"]},
    {name: "TikTok", tokens: ["tiktok", "douyin"], domains: ["tiktok.com", "tiktokcdn.com", "douyin.com"]},

    // -------------------------------------------------------------- shopping
    {name: "eBay", tokens: ["ebay"], domains: ["ebay.com", "ebay.co.uk", "ebay.de", "ebay.fr", "ebay.it", "ebay.es", "ebay.com.au", "ebayimg.com"]},
    {name: "Shopify", tokens: ["shopify", "myshopify"], domains: ["shopify.com", "myshopify.com", "shopifycdn.com"]},
    {name: "Etsy", tokens: ["etsy"], domains: ["etsy.com", "etsystatic.com"]},
    {name: "Walmart", tokens: ["walmart"], domains: ["walmart.com", "walmart.ca", "walmartimages.com"]},
    {name: "Target", tokens: ["target"], domains: ["target.com"]},
    {name: "Best Buy", tokens: ["bestbuy"], domains: ["bestbuy.com"]},
    {name: "Costco", tokens: ["costco"], domains: ["costco.com", "costco.ca", "costco.co.uk"]},
    {name: "IKEA", tokens: ["ikea"], domains: ["ikea.com", "ikea.com.tw"]},
    {name: "Temu", tokens: ["temu"], domains: ["temu.com", "temucdn.com"]},
    {name: "SHEIN", tokens: ["shein"], domains: ["shein.com", "sheincdn.com"]},
    {name: "Rakuten", tokens: ["rakuten"], domains: ["rakuten.co.jp", "rakuten.com", "rakuten.com.tw"]},
    {name: "Shopee", tokens: ["shopee"], domains: ["shopee.com", "shopee.tw", "shopee.sg", "shopee.co.id", "shopee.ph", "shopee.com.my", "shopee.co.th", "shopee.vn", "shopee.com.br", "shopeemobile.com"]},
    {name: "PChome", tokens: ["pchome"], domains: ["pchome.com.tw", "pchome24h.com.tw", "pchomeec.tw"]},
    {name: "momo", tokens: ["momoshop"], domains: ["momoshop.com.tw"]},
    {name: "Ruten", tokens: ["ruten"], domains: ["ruten.com.tw"]},
    {name: "Gamer.com.tw", tokens: ["gamer"], domains: ["gamer.com.tw"]},
    {name: "Dcard", tokens: ["dcard"], domains: ["dcard.tw"]},

    // --------------------------------------------------------------- travel
    {name: "Booking.com", tokens: ["booking"], domains: ["booking.com"]},
    {name: "Airbnb", tokens: ["airbnb"], domains: ["airbnb.com", "airbnbcdn.com"]},
    {name: "Uber", tokens: ["uber"], domains: ["uber.com"]},
    {name: "Lyft", tokens: ["lyft"], domains: ["lyft.com"]},
    {name: "Expedia", tokens: ["expedia"], domains: ["expedia.com"]},
    {name: "DHL", tokens: ["dhl"], domains: ["dhl.com", "dhl.de"]},
    {name: "FedEx", tokens: ["fedex"], domains: ["fedex.com"]},
    {name: "UPS", tokens: ["ups"], domains: ["ups.com"]},
    {name: "USPS", tokens: ["usps"], domains: ["usps.com"]},

    // ------------------------------------------------------------------- ai
    {name: "ChatGPT", tokens: ["openai", "chatgpt"], domains: ["openai.com", "chatgpt.com", "oaiusercontent.com", "sora.com"]},
    {name: "Claude", tokens: ["anthropic", "claude"], domains: ["anthropic.com", "claude.ai"]},
    {name: "DeepSeek", tokens: ["deepseek"], domains: ["deepseek.com"]},
    {name: "Hugging Face", tokens: ["huggingface"], domains: ["huggingface.co", "hf.co"]},
    {name: "Perplexity", tokens: ["perplexity"], domains: ["perplexity.ai"]},
    {name: "Grok", tokens: ["grok", "xai"], domains: ["x.ai", "grok.com"]},

    // ---------------------------------------------------------- productivity
    {name: "Notion", tokens: ["notion"], domains: ["notion.so", "notion.site", "notionusercontent.com"]},
    {name: "Figma", tokens: ["figma"], domains: ["figma.com", "figmausercontent.com"]},
    {name: "Canva", tokens: ["canva"], domains: ["canva.com"]},
    {name: "Adobe", tokens: ["adobe"], domains: ["adobe.com", "adobelogin.com", "adobe.io", "adobedtm.com", "typekit.net"]},
    {name: "Dropbox", tokens: ["dropbox"], domains: ["dropbox.com", "dropboxusercontent.com", "dropboxstatic.com"]},
    {name: "Box", tokens: ["box"], domains: ["box.com", "boxcdn.net"]},
    {name: "GitHub", tokens: ["github"], domains: ["github.com", "githubusercontent.com", "githubassets.com", "githubapp.com", "ghcr.io"]},
    {name: "GitLab", tokens: ["gitlab"], domains: ["gitlab.com"]},
    {name: "Atlassian", tokens: ["atlassian", "bitbucket", "jira"], domains: ["atlassian.com", "atlassian.net", "bitbucket.org", "jira.com"]},
    {name: "Spotify", tokens: ["spotify"], domains: ["spotify.com", "spotifycdn.com", "scdn.co", "spotify.link"]},
    {name: "Netflix", tokens: ["netflix"], domains: ["netflix.com", "nflxvideo.net", "nflximg.net", "nflxext.com"]},
    {name: "Disney+", tokens: ["disneyplus", "disney"], domains: ["disneyplus.com", "disney.com", "bamgrid.com"]}
];
