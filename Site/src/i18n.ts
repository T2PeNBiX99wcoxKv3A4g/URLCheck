/**
 * The site's own text, in the languages the desktop app ships with. The documentation itself lives in
 * the wiki and is generated per language by `scripts/generate-docs.mjs`.
 */
export const LANGUAGES = [
    {id: "en", label: "English"},
    {id: "ja", label: "日本語"},
    {id: "zh-CN", label: "简体中文"},
    {id: "zh-TW", label: "繁體中文"}
] as const;

export type Language = (typeof LANGUAGES)[number]["id"];

export const DEFAULT_LANGUAGE: Language = "en";

export interface Copy {
    nav: { home: string; scripts: string; docs: string };
    footer: string;
    home: {
        tagline: string;
        download: string;
        installScript: string;
        documentation: string;
        mainWindow: string;
        mainWindowAlt: string;
        whatTitle: string;
        whatText: string;
        popupTitle: string;
        popupText: string;
        popupCaption: string;
        popupAlt: string;
        featuresTitle: string;
        features: [string, string][];
        installTitle: string;
        /** Text before the README link, the link label, and the text after it. */
        installBefore: string;
        readme: string;
        installAfter: string;
        platforms: [string, string][];
    };
    scripts: {
        title: string;
        /** Uses `{scheme}` where the `checkurl://` code element goes. */
        subtitle: string;
        install: string;
        copy: string;
        copied: string;
    };
    docs: { scripting: string; libraries: string };
}

export const COPY: Record<Language, Copy> = {
    en: {
        nav: {home: "Home", scripts: "Scripts", docs: "Docs"},
        footer: "URLCheck is MIT licensed. The docs live in this repository.",
        home: {
            tagline: "Check the URL before it opens in your browser.",
            download: "Download",
            installScript: "Install a script",
            documentation: "Documentation",
            mainWindow: "The main window",
            mainWindowAlt: "The URLCheck main window",
            whatTitle: "What it does",
            whatText:
                "URLCheck registers itself as a link handler, so clicking an http/https link opens a small " +
                "inspection popup instead of going straight to a browser. You get to see where the link " +
                "really goes, strip the tracking junk, and only then hand it to the browser you want.",
            popupTitle: "The popup",
            popupText:
                "Every clicked link opens this before anything reaches the browser. The URL is split into " +
                "domain, parameters and fragment; insecure links and known tracking parameters are flagged, " +
                "and the button at the bottom picks which browser finally opens it.",
            popupCaption: "Inspecting http://www.google.com/?foo=bar#tag",
            popupAlt: "The URLCheck popup for an insecure link",
            featuresTitle: "Features",
            features: [
                [
                    "Intercept links",
                    "Installed as the default handler for http/https, so every clicked link passes through " +
                    "the popup. Stays in the tray."
                ],
                [
                    "Inspect before opening",
                    "A borderless popup shows the URL broken into scheme, host, parameters and fragment."
                ],
                [
                    "Clean the URL",
                    "Edit or remove any query parameter, clear the fragment, or strip tracking parameters in " +
                    "one click."
                ],
                [
                    "Script it",
                    "Lua scripts can rewrite every URL before it opens; install them from the scripts page."
                ],
                [
                    "Forward to another device",
                    "Send a URL to another URLCheck on the local network, end-to-end encrypted."
                ],
                ["History", "Every intercepted URL is recorded locally in SQLite and can be searched."]
            ],
            installTitle: "Install",
            installBefore:
                "Self-contained builds: the .NET runtime is bundled, so nothing else needs to be installed. " +
                "Windows also needs the WebView2 runtime; Linux needs WebKitGTK and the AppIndicator library " +
                "(see the ",
            readme: "README",
            installAfter:
                "). Pick your system to open the latest release and download the matching file.",
            platforms: [
                ["Windows", "x64 installer (.msi)"],
                ["Fedora", "x86_64 (.rpm)"],
                ["Debian / Ubuntu", "amd64 (.deb)"],
                ["Arch Linux", "x86_64 (.pkg.tar.zst)"]
            ]
        },
        scripts: {
            title: "Scripts",
            subtitle:
                "Click Install to hand the script to URLCheck. The app must be running and registered for " +
                "{scheme}. If nothing happens, copy the script URL and add it under Scripts → Download in the app.",
            install: "Install",
            copy: "Copy URL",
            copied: "Copied"
        },
        docs: {scripting: "Scripting", libraries: "Libraries"}
    },

    ja: {
        nav: {home: "ホーム", scripts: "スクリプト", docs: "ドキュメント"},
        footer: "URLCheck は MIT ライセンスです。ドキュメントはこのリポジトリに含まれています。",
        home: {
            tagline: "ブラウザで開く前に、URL を確認できます。",
            download: "ダウンロード",
            installScript: "スクリプトを追加",
            documentation: "ドキュメント",
            mainWindow: "メイン ウィンドウ",
            mainWindowAlt: "URLCheck のメイン ウィンドウ",
            whatTitle: "できること",
            whatText:
                "URLCheck はリンク ハンドラーとして登録されるので、http/https のリンクをクリックすると" +
                "ブラウザに直接渡す代わりに小さな確認ポップアップが開きます。リンクの本当の行き先を確かめ、" +
                "追跡用のパラメーターを削除してから、好きなブラウザで開けます。",
            popupTitle: "ポップアップ",
            popupText:
                "クリックしたリンクは、ブラウザに届く前に必ずここを通ります。URL はドメイン、パラメーター、" +
                "フラグメントに分解され、安全でないリンクや既知の追跡パラメーターには印が付きます。" +
                "最後に開くブラウザは下部のボタンで選べます。",
            popupCaption: "http://www.google.com/?foo=bar#tag を確認中",
            popupAlt: "安全でないリンクに対する URLCheck のポップアップ",
            featuresTitle: "機能",
            features: [
                [
                    "リンクを横取り",
                    "http/https の既定のハンドラーとして登録されるので、クリックしたリンクはすべて" +
                    "ポップアップを通ります。常駐してトレイに残ります。"
                ],
                [
                    "開く前に確認",
                    "枠なしのポップアップが、URL をスキーム、ホスト、パラメーター、フラグメントに分けて表示します。"
                ],
                [
                    "URL を整理",
                    "クエリ パラメーターの編集・削除、フラグメントの消去、追跡パラメーターの削除をワンクリックで行えます。"
                ],
                [
                    "スクリプトで拡張",
                    "Lua スクリプトは開く前の URL を書き換えられます。スクリプト ページから追加できます。"
                ],
                [
                    "別のデバイスへ転送",
                    "同じローカル ネットワーク上の別の URLCheck へ URL を送れます。通信は端末間で暗号化されます。"
                ],
                ["履歴", "横取りした URL はすべてローカルの SQLite に記録され、検索できます。"]
            ],
            installTitle: "インストール",
            installBefore:
                "自己完結したビルドです。.NET ランタイムを同梱しているので、ほかに何もインストールする必要は" +
                "ありません。Windows では WebView2 ランタイム、Linux では WebKitGTK と AppIndicator " +
                "ライブラリも必要です（",
            readme: "README",
            installAfter:
                " を参照）。お使いのシステムを選ぶと最新リリースが開くので、対応するファイルをダウンロードしてください。",
            platforms: [
                ["Windows", "x64 インストーラー（.msi）"],
                ["Fedora", "x86_64（.rpm）"],
                ["Debian / Ubuntu", "amd64（.deb）"],
                ["Arch Linux", "x86_64（.pkg.tar.zst）"]
            ]
        },
        scripts: {
            title: "スクリプト",
            subtitle:
                "「Install」を押すとスクリプトが URLCheck に渡されます。アプリが起動していて {scheme} が" +
                "登録されている必要があります。何も起きない場合は、スクリプトの URL をコピーして、アプリの" +
                "「スクリプト」タブの「ダウンロード」から追加してください。",
            install: "インストール",
            copy: "URL をコピー",
            copied: "コピーしました"
        },
        docs: {scripting: "スクリプト", libraries: "ライブラリ"}
    },

    "zh-CN": {
        nav: {home: "首页", scripts: "脚本", docs: "文档"},
        footer: "URLCheck 采用 MIT 许可证。文档就在本仓库中。",
        home: {
            tagline: "在浏览器打开之前，先看清楚这个链接。",
            download: "下载",
            installScript: "安装脚本",
            documentation: "文档",
            mainWindow: "主窗口",
            mainWindowAlt: "URLCheck 主窗口",
            whatTitle: "它做什么",
            whatText:
                "URLCheck 把自己注册为链接处理程序，点击 http/https 链接时会先弹出一个小窗口，而不是直接交给" +
                "浏览器。你可以看清链接真正要去哪里，去掉跟踪参数，再交给想用的浏览器打开。",
            popupTitle: "弹窗",
            popupText:
                "点击的每个链接都会先经过这里。URL 会被拆成域名、参数和片段；不安全的链接和已知的跟踪参数会" +
                "被标出来，最后由底部的按钮决定用哪个浏览器打开。",
            popupCaption: "正在检查 http://www.google.com/?foo=bar#tag",
            popupAlt: "URLCheck 针对不安全链接的弹窗",
            featuresTitle: "功能",
            features: [
                [
                    "拦截链接",
                    "注册为 http/https 的默认处理程序，点击的链接都会先经过弹窗。常驻托盘。"
                ],
                ["打开前检查", "无边框弹窗会把 URL 拆成协议、主机、参数和片段显示。"],
                ["清理 URL", "编辑或删除任意查询参数、清除片段，或一键删除跟踪参数。"],
                ["脚本扩展", "Lua 脚本可以在打开前改写每个 URL；在脚本页面一键安装。"],
                ["转发到其他设备", "把 URL 发送到同一局域网内的另一台 URLCheck，端到端加密。"],
                ["历史记录", "拦截过的 URL 都会记录在本地 SQLite 中，可以搜索。"]
            ],
            installTitle: "安装",
            installBefore:
                "自包含构建：已内置 .NET 运行时，不需要另外安装。Windows 还需要 WebView2 运行时；Linux " +
                "需要 WebKitGTK 和 AppIndicator 库（见 ",
            readme: "README",
            installAfter: "）。选择你的系统会打开最新版本页面，下载对应的文件即可。",
            platforms: [
                ["Windows", "x64 安装程序（.msi）"],
                ["Fedora", "x86_64（.rpm）"],
                ["Debian / Ubuntu", "amd64（.deb）"],
                ["Arch Linux", "x86_64（.pkg.tar.zst）"]
            ]
        },
        scripts: {
            title: "脚本",
            subtitle:
                "点击「Install」会把脚本交给 URLCheck。应用需要在运行中，并且已注册 {scheme}。" +
                "如果没有反应，请复制脚本 URL，在应用的「脚本 → 下载」里添加。",
            install: "安装",
            copy: "复制 URL",
            copied: "已复制"
        },
        docs: {scripting: "脚本", libraries: "函数库"}
    },

    "zh-TW": {
        nav: {home: "首頁", scripts: "腳本", docs: "文件"},
        footer: "URLCheck 採用 MIT 授權。文件就在本專案中。",
        home: {
            tagline: "在瀏覽器開啟之前，先看清楚這個連結。",
            download: "下載",
            installScript: "安裝腳本",
            documentation: "文件",
            mainWindow: "主視窗",
            mainWindowAlt: "URLCheck 主視窗",
            whatTitle: "它能做什麼",
            whatText:
                "URLCheck 會把自己註冊為連結處理常式，點擊 http/https 連結時先開啟一個小視窗，而不是直接交給" +
                "瀏覽器。你可以看清連結真正要去哪裡、去掉追蹤參數，再交給想用的瀏覽器開啟。",
            popupTitle: "彈窗",
            popupText:
                "點擊的每個連結都會先經過這裡。URL 會被拆成網域、參數與片段；不安全的連結和已知的追蹤參數會" +
                "被標示出來，最後由底部的按鈕決定用哪個瀏覽器開啟。",
            popupCaption: "正在檢查 http://www.google.com/?foo=bar#tag",
            popupAlt: "URLCheck 針對不安全連結的彈窗",
            featuresTitle: "功能",
            features: [
                [
                    "攔截連結",
                    "註冊為 http/https 的預設處理常式，點擊的連結都會先經過彈窗。常駐系統匣。"
                ],
                ["開啟前檢查", "無邊框彈窗會把 URL 拆成通訊協定、主機、參數與片段顯示。"],
                ["清理 URL", "編輯或刪除任意查詢參數、清除片段，或一鍵刪除追蹤參數。"],
                ["腳本擴充", "Lua 腳本可以在開啟前改寫每個 URL；在腳本頁面一鍵安裝。"],
                ["轉送到其他裝置", "把 URL 傳送到同一區域網路上的另一台 URLCheck，端對端加密。"],
                ["歷史記錄", "攔截過的 URL 都會記錄在本機 SQLite 中，可以搜尋。"]
            ],
            installTitle: "安裝",
            installBefore:
                "自包含建置：已內建 .NET 執行階段，不需要另外安裝。Windows 還需要 WebView2 執行階段；Linux " +
                "需要 WebKitGTK 與 AppIndicator 函式庫（請見 ",
            readme: "README",
            installAfter: "）。選擇你的系統會開啟最新版本頁面，下載對應的檔案即可。",
            platforms: [
                ["Windows", "x64 安裝程式（.msi）"],
                ["Fedora", "x86_64（.rpm）"],
                ["Debian / Ubuntu", "amd64（.deb）"],
                ["Arch Linux", "x86_64（.pkg.tar.zst）"]
            ]
        },
        scripts: {
            title: "腳本",
            subtitle:
                "按下「Install」會把腳本交給 URLCheck。應用程式必須在執行中，且已註冊 {scheme}。" +
                "如果沒有反應，請複製腳本 URL，在應用程式的「腳本 → 下載」中加入。",
            install: "安裝",
            copy: "複製 URL",
            copied: "已複製"
        },
        docs: {scripting: "腳本", libraries: "函式庫"}
    }
};
