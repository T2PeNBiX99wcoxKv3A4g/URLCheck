<div align="center">
  <img src="icon.svg" alt="" width="120">
  <h1>URLCheck</h1>
  <p><strong>在 URL 進入瀏覽器之前先檢查它。</strong></p>
  <p>
    <a href="README.md">English</a> ·
    <a href="README.ja.md">日本語</a> ·
    <a href="README.zh-CN.md">简体中文</a>
  </p>
</div>

URLCheck 會將自己註冊為連結處理程式，因此點擊 `http`/`https` 連結時，會先開啟一個小小的
檢查彈窗，而不是直接前往瀏覽器。你可以看到連結實際上會連到哪裡、清掉追蹤用的雜訊，
然後才把它交給你真正想用的瀏覽器。

<div align="center">
  <a href="docs/popup.png"><img src="docs/popup.png" alt="檢查彈窗" width="440"></a>
  <br>
  <em>檢查彈窗</em>
  <br><br>
  <a href="docs/main-window.png"><img src="docs/main-window.png" alt="主視窗" width="880"></a>
  <br>
  <em>主視窗</em>
</div>

## 為什麼需要

如果沒有先檢查 URL，連結可能會帶來危險。這套軟體讓這項檢查在瀏覽器做出任何動作之前發生。

它也補上了一個缺口：[URLCheck](https://github.com/TrianguloY/URLCheck) 只涵蓋 Android，
並沒有桌面版本。

## 功能

- **攔截連結** — 註冊為 `http`/`https` 的預設處理程式，因此每個被點擊的連結都會經過彈窗。
  程式會常駐於系統匣。
- **開啟前先檢查** — 一個無邊框、會自動配合內容大小的彈窗，置於其他視窗之上，
  將 URL 拆解成 scheme、host、參數與 fragment 顯示。
- **清理 URL** — 編輯或移除任何查詢參數、清除 fragment、捨棄整份參數清單，
  或一鍵移除常見的追蹤參數。
- **以腳本處理** — Lua 腳本可以在每個 URL 開啟前改寫它；範例與一鍵安裝請見
  [腳本頁面](https://t2penbix99wcoxkv3a4g.github.io/URLCheck/#%2Fscripts)。
- **信任前先檢查** — 查詢 URL 的 HTTP 狀態（會跟隨重新導向），或逐跳檢視重新導向，
  看看短網址會導向何處。
- **在想要的地方開啟** — 每個連結都能選擇瀏覽器，並可選擇以私密／無痕視窗開啟。
  最常使用的瀏覽器會成為預設按鈕。
- **歷史紀錄** — 每個被攔截的 URL 都會以 SQLite 記錄在本機，可搜尋，
  點擊項目即可重新開啟該 URL 的彈窗。
- **在複製的連結上浮現按鈕** — 在任何地方複製 `http(s)` URL 時，游標旁會出現一個小按鈕；
  點一下即可開啟檢查彈窗，不必切換應用程式。此功能可在設定中關閉。
- **轉送到另一台裝置** — 從彈窗將 URL 傳送到區域網路上另一台 URLCheck，
  由對方以自己的檢查彈窗開啟。裝置會自動找到彼此，並透過確認一次性代碼進行配對，
  每次傳輸都經過端對端加密；資料不會離開該網路。

## 技術組成

- **C# on .NET 10** — 所有邏輯：攔截連結、系統匣、解析與清理 URL、
  啟動瀏覽器，以及歷史紀錄。
- **React 19 + TypeScript**，由 **Vite** 打包並以 **styled-components** 設計樣式 — 介面部分。
  它僅負責呈現：與 C# 端交換 JSON 訊息，本身不做任何運算。
- **Photino.NET** — 桌面外殼。它在作業系統自有的 web view 中顯示介面，
  這也是為什麼 web view 是執行階段的相依項目：Windows 上為 WebView2、Linux 上為 WebKitGTK。

## 執行

已發佈的建置版本是**自包含**的 — 它們捆綁了 .NET 執行階段，因此不需要額外安裝任何東西。
作業系統仍須提供的是：

除了純封存檔之外，另外發佈了四種套件格式：

| 檔案                                      | 用途                                                                                                                                                                      |
|-------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `URLCheck-<version>-win-x64.msi`          | 每位使用者的 Windows 安裝程式：安裝到 `%LOCALAPPDATA%\Programs\URLCheck`，加入開始功能表項目與桌面捷徑，且從不要求系統管理員權限。                                        |
| `urlcheck-<version>-1.fcXX.x86_64.rpm`    | Fedora 套件：`sudo dnf install ./urlcheck-<version>-*.rpm`。安裝到 `/opt/URLCheck`，並提供 `urlcheck` 指令、桌面項目與圖示。                                                 |
| `urlcheck_<version>_amd64.deb`            | Debian/Ubuntu 套件：`sudo apt install ./urlcheck_<version>_amd64.deb`。配置與 RPM 相同。                                                                                  |
| `urlcheck-<version>-1-x86_64.pkg.tar.zst` | Arch Linux 套件：`sudo pacman -U urlcheck-<version>-1-x86_64.pkg.tar.zst`。配置與 RPM 相同。                                                                               |

### Windows

1. Microsoft Edge **WebView2 Runtime**。如果你不是使用 Windows 11，就需要它。
   [Microsoft 的頁面](https://developer.microsoft.com/microsoft-edge/webview2/)。
2. 任何低於 11 的 Windows 版本都不在官方支援範圍內。
   若遇到任何問題，你需要自行解決。
3. 必須告訴平鋪式視窗管理員不要干預浮動按鈕：它的 web view 需要視窗短暫可見才能啟動，
   因此會將它平鋪的視窗管理員會讓它尺寸錯誤、位置也錯誤。以 GlazeWM 為例，
   以下設定會同時忽略它與彈窗：

```yaml
window_rules:
  - commands: ['ignore']
    match:
      - window_process: { equals: 'URLCheck' }
        window_title: { regex: '^(Popup|SelectionButton)$' }
```

### Linux

1. GTK 用的 web view。
2. AppIndicator 函式庫，僅供系統匣圖示使用。
3. `wl-clipboard` 2.3 或更新版本，僅供複製連結上的浮動按鈕使用。Wayland 不會讓未取得焦點的
   應用程式看到剪貼簿，而 `wl-paste --watch` 正是繞過此限制的方法。
   沒有它，該處就完全不會出現按鈕。
4. 僅在 **Fedora 44 搭配 Wayland 上的 KDE Plasma** 上測試過。其他所有發行版皆未測試，
   而執行階段函式庫正是最麻煩的部分，因此請從函式庫而非套件名稱著手。
5. 目前僅支援 Wayland。如果你是執行 X11 上舊式視窗管理員之類的超級狂熱者，
   任何問題都應自行修正。

| 發行版          | 套件                                                              |
|-----------------|-------------------------------------------------------------------|
| Fedora 44       | `sudo dnf install webkit2gtk4.1 libayatana-appindicator-gtk3`     |
| Debian / Ubuntu | `sudo apt install libwebkit2gtk-4.1-0 libayatana-appindicator3-1` |
| 其他            | 找出任何提供下列函式庫的套件                                      |

```
libwebkit2gtk-4.1.so.0          libjavascriptcoregtk-4.1.so.0
libgtk-3.so.0                   libglib-2.0.so.0
libayatana-appindicator3.so.1   (or the older libappindicator3.so.1)
```

缺少 web view 函式庫時，啟動階段會顯示 `Unable to load shared library 'Photino.Native'`。
若要找出某個缺少的 soname 屬於哪個套件，請詢問你的套件管理員 — 例如
`dnf provides 'libwebkit2gtk-4.1.so.0'`、`apt-file search libwebkit2gtk-4.1.so.0`，或
`pacman -F libwebkit2gtk-4.1.so.0`。

AppIndicator 函式庫僅供系統匣圖示使用：沒有它應用程式仍可執行，只是沒有系統匣，
並會讓主視窗保持可見。

## 建置

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) 20 或更新版本，用於建置介面
- `URLCheck/Libs` 中共用的 DLL 與前端橋接套件，需以 `build-and-copy.ps1` 從獨立的
  [PhotinoNETUtils](../PhotinoNETUtils) 專案複製過來

## 建置與執行

### 開發

介面由 Vite 提供，因此兩者都要執行：

```bash
# terminal 1 — the interface on http://127.0.0.1:3000
cd URLCheck/UserInterface
npm install
npm run dev

# terminal 2 — the desktop app
dotnet run --project URLCheck
```

Debug 建置會從開發伺服器載入介面。實用參數：

```bash
dotnet run --project URLCheck -- --tray        # start hidden in the tray
dotnet run --project URLCheck -- "https://example.com/?utm_source=x"   # open the popup for a URL
```

### 發行

`npm run build` 會將介面複製到 `URLCheck/Resources/wwwroot`，專案再將它內嵌到執行檔中 —
因此請在發佈前先建置介面。

```bash
cd URLCheck/UserInterface && npm run build
cd ../.. && ./URLCheck/publish.sh          # publish.bat on Windows
```

這會為每個平台在 `URLCheck/bin/Release/net10.0/<rid>/publish/` 下產生單一自包含執行檔。

## 資料存放位置

|            | Windows                                  | Linux                                    |
|------------|------------------------------------------|------------------------------------------|
| 設定       | `%APPDATA%\URLCheck\settings.json`       | `~/.config/URLCheck/settings.json`       |
| 腳本       | `%APPDATA%\URLCheck\scripts`             | `~/.config/URLCheck/scripts`             |
| 歷史紀錄   | `%APPDATA%\URLCheck\history.db`          | `~/.config/URLCheck/history.db`          |
| 裝置金鑰   | `%APPDATA%\URLCheck\device.key`          | `~/.config/URLCheck/device.key`          |
| 日誌       | `%APPDATA%\URLCheck\logs\urlcheck-*.log` | `~/.config/URLCheck/logs/urlcheck-*.log` |

日誌會寫入檔案並同步輸出到主控台，因此只要有日誌檔就足以回報問題。日誌每日輪替，
並保留最近七份。

## Linux 注意事項

已在 Fedora 44、KDE Plasma、Wayland 上測試。Wayland 刻意不讓應用程式自行決定視窗位置，
因此有些行為與 Windows 或 X11 不同：

- 彈窗無法強制置於螢幕中央 — 由合成器決定位置，通常是相對於主視窗；
- 永遠置頂不會有作用，因為 GTK Wayland 後端並未實作此功能。

兩者都不是 URLCheck 的錯誤；兩者都是協定本身的限制。

如果你使用 KDE Plasma，可以在 KWin 中讓彈窗永遠置頂並強制置於螢幕中央。
