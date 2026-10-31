<div align="center">
  <img src="icon.svg" alt="" width="120">
  <h1>URLCheck</h1>
  <p><strong>ブラウザで開く前に URL を確認できます。</strong></p>
  <p>
    <a href="README.md">English</a> ·
    <a href="README.zh-CN.md">简体中文</a> ·
    <a href="README.zh-TW.md">繁體中文</a>
  </p>
</div>

URLCheck は自分自身をリンクハンドラーとして登録するため、`http`/`https` のリンクをクリックすると
ブラウザへ直接移動する代わりに、小さな確認用ポップアップが開きます。リンクが実際にどこへ向かうのかを
確認し、トラッキング用の不要な部分を取り除いてから、本当に使いたいブラウザへ渡せます。

<div align="center">
  <a href="docs/popup.png"><img src="docs/popup.png" alt="確認用ポップアップ" width="440"></a>
  <br>
  <em>確認用ポップアップ</em>
  <br><br>
  <a href="docs/main-window.png"><img src="docs/main-window.png" alt="メインウィンドウ" width="880"></a>
  <br>
  <em>メインウィンドウ</em>
</div>

## なぜ必要か

URL を確認せずにリンクを開くのは危険です。このソフトウェアは、ブラウザが何かを行う前にその確認を
行います。

また、次の隙間も埋めます。[URLCheck](https://github.com/TrianguloY/URLCheck) は Android 向けで、
デスクトップ版はありません。

## 機能

- **リンクをインターセプト** — `http`/`https` の既定のハンドラーとしてインストールされるため、
  クリックされたすべてのリンクがポップアップを通ります。トレイに常駐します。
- **開く前に確認** — 内容に合わせてサイズが決まり、他のウィンドウの上に表示される枠なしの
  ポップアップで、URL をスキーム、ホスト、パラメーター、フラグメントに分解して表示します。
- **URL をクリーンアップ** — クエリ パラメーターを編集・削除したり、フラグメントを消したり、
  パラメーター リスト全体を削除したり、よく知られたトラッキング パラメーターをワンクリックで
  取り除いたりできます。
- **スクリプトで拡張** — Lua スクリプトは、開かれる前のすべての URL を書き換えられます。例と
  ワンクリック インストールについては [Lua/README.md](Lua/README.md) を参照してください。
- **信頼する前に確認** — URL の HTTP ステータスを問い合わせたり（リダイレクトを追跡）、
  リダイレクトを 1 ホップずつたどって短縮 URL がどこへ向かうのかを確認したりできます。
- **好きな場所で開く** — リンクごとにブラウザを選べ、必要ならプライベート/シークレット
  ウィンドウで開けます。最もよく使うブラウザが既定のボタンになります。
- **履歴** — インターセプトしたすべての URL はローカルの SQLite に記録され、検索できます。
  項目をクリックすると、その URL のポップアップが再び開きます。
- **コピーしたリンクの上にボタンを表示** — どこかで `http(s)` URL をコピーすると、ポインターの
  近くに小さなボタンが現れます。ワンクリックで、アプリケーションを切り替えることなく確認用
  ポップアップを開けます。設定で無効にできます。
- **別のデバイスへ転送** — ポップアップからローカル ネットワーク上の別の URLCheck へ URL を送ると、
  その側の確認用ポップアップで開きます。デバイスは自動的に互いを見つけ、ワンタイム コードの確認で
  ペアリングし、すべての転送はエンドツーエンドで暗号化されます。ネットワークの外へは何も出ません。

## 使用技術

- **.NET 10 上の C#** — リンクのインターセプト、トレイ、URL の解析とクリーンアップ、
  ブラウザの起動、履歴といったすべてのロジック。
- **React 19 + TypeScript**、**Vite** でバンドルし、**styled-components** でスタイルを適用 —
  インターフェース部分。表示専用で、C# 側と JSON メッセージをやり取りするだけで、それ自体では
  何の処理も行いません。
- **Photino.NET** — デスクトップ シェル。オペレーティング システム自身の web view で
  インターフェースを表示するため、web view が実行時の依存関係になります。Windows では WebView2、
  Linux では WebKitGTK です。

## 実行

公開されているビルドは **自己完結型** です。.NET ランタイムを同梱しているため、それらを使うために
何かをインストールする必要はありません。オペレーティング システム側で必要なものは次のとおりです。

通常のアーカイブとは別に、4 種類のパッケージ形式が公開されています。

| ファイル                                  | 内容                                                                                                                                                                      |
|-------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `URLCheck-<version>-win-x64.msi`          | ユーザーごとの Windows インストーラー: `%LOCALAPPDATA%\Programs\URLCheck` にインストールし、スタート メニューの項目とデスクトップ ショートカットを追加します。管理者権限は要求しません。 |
| `urlcheck-<version>-1.fcXX.x86_64.rpm`    | Fedora パッケージ: `sudo dnf install ./urlcheck-<version>-*.rpm`。`/opt/URLCheck` にインストールし、`urlcheck` コマンド、デスクトップ エントリ、アイコンを追加します。      |
| `urlcheck_<version>_amd64.deb`            | Debian/Ubuntu パッケージ: `sudo apt install ./urlcheck_<version>_amd64.deb`。構成は RPM と同じです。                                                                     |
| `urlcheck-<version>-1-x86_64.pkg.tar.zst` | Arch Linux パッケージ: `sudo pacman -U urlcheck-<version>-1-x86_64.pkg.tar.zst`。構成は RPM と同じです。                                                                 |

### Windows

1. Microsoft Edge の **WebView2 Runtime**。Windows 11 以外を使っている場合は必要です。
   [Microsoft のページ](https://developer.microsoft.com/microsoft-edge/webview2/)。
2. Windows 11 より前のバージョンは公式にはサポートされません。
   問題が発生した場合は、ご自身で解決する必要があります。
3. タイル型ウィンドウ マネージャーには、フローティング ボタンを対象外にするよう設定する必要が
   あります。その web view は起動時にウィンドウが一瞬表示される必要があるため、ウィンドウを
   タイル化するウィンドウ マネージャーではサイズと位置が正しくなくなります。GlazeWM の場合、
   次の設定でフローティング ボタンとポップアップの両方を対象外にできます。

```yaml
window_rules:
  - commands: ['ignore']
    match:
      - window_process: { equals: 'URLCheck' }
        window_title: { regex: '^(Popup|SelectionButton)$' }
```

### Linux

1. GTK 用の web view。
2. AppIndicator ライブラリ。トレイ アイコン専用です。
3. `wl-clipboard` 2.3 以降。コピーしたリンクの上に表示するフローティング ボタン専用です。Wayland は
   フォーカスのないアプリケーションからクリップボードを隠すため、`wl-paste --watch` がその回避策に
   なります。これがない場合、そのボタンは単に表示されません。
4. **Fedora 44（Wayland 上の KDE Plasma）** でのみテストされています。その他のディストリビューションは
   未検証であり、実行時ライブラリが面倒な部分なので、パッケージ名ではなくライブラリから
   探し始めてください。
5. 現時点では Wayland のみをサポートしています。X11 上の古いウィンドウ マネージャーなどを使っている
   超マニアの方は、問題を自分で修正してください。

| ディストリビューション | パッケージ                                                        |
|-----------------|-------------------------------------------------------------------|
| Fedora 44       | `sudo dnf install webkit2gtk4.1 libayatana-appindicator-gtk3`     |
| Debian / Ubuntu | `sudo apt install libwebkit2gtk-4.1-0 libayatana-appindicator3-1` |
| その他          | 下記のライブラリを提供するものを探してください                    |

```
libwebkit2gtk-4.1.so.0          libjavascriptcoregtk-4.1.so.0
libgtk-3.so.0                   libglib-2.0.so.0
libayatana-appindicator3.so.1   (or the older libappindicator3.so.1)
```

web view ライブラリが見つからない場合、起動時に `Unable to load shared library 'Photino.Native'` と
表示されます。見つからない soname を提供するパッケージを調べるには、パッケージ マネージャーに
問い合わせてください。たとえば `dnf provides 'libwebkit2gtk-4.1.so.0'`、
`apt-file search libwebkit2gtk-4.1.so.0`、`pacman -F libwebkit2gtk-4.1.so.0` などです。

AppIndicator ライブラリはトレイ アイコンにのみ必要です。これがなくてもアプリは動作しますが、
トレイがなくなり、代わりにメインウィンドウが表示されたままになります。

## ビルド

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) 20 以降（インターフェースのビルド用）
- `URLCheck/Libs` にある共有 DLL とフロントエンド ブリッジ パッケージ。別プロジェクトの
  [PhotinoNETUtils](../PhotinoNETUtils) から、その `build-and-copy.ps1` でコピーしたものです。

## ビルドと実行

### 開発

インターフェースは Vite から配信されるため、両方を実行します。

```bash
# terminal 1 — the interface on http://127.0.0.1:3000
cd URLCheck/UserInterface
npm install
npm run dev

# terminal 2 — the desktop app
dotnet run --project URLCheck
```

デバッグ ビルドでは、インターフェースを開発サーバーから読み込みます。便利な引数:

```bash
dotnet run --project URLCheck -- --tray        # start hidden in the tray
dotnet run --project URLCheck -- "https://example.com/?utm_source=x"   # open the popup for a URL
```

### リリース

`npm run build` はインターフェースを `URLCheck/Resources/wwwroot` にコピーし、プロジェクトがそれを
実行ファイルに埋め込みます。そのため、公開する前にインターフェースをビルドしてください。

```bash
cd URLCheck/UserInterface && npm run build
cd ../.. && ./URLCheck/publish.sh          # publish.bat on Windows
```

これにより、`URLCheck/bin/Release/net10.0/<rid>/publish/` の下に、プラットフォームごとの
自己完結型の単一実行ファイルが生成されます。

## データの保存場所

|            | Windows                                  | Linux                                    |
|------------|------------------------------------------|------------------------------------------|
| 設定       | `%APPDATA%\URLCheck\settings.json`       | `~/.config/URLCheck/settings.json`       |
| スクリプト | `%APPDATA%\URLCheck\scripts`             | `~/.config/URLCheck/scripts`             |
| 履歴       | `%APPDATA%\URLCheck\history.db`          | `~/.config/URLCheck/history.db`          |
| デバイス キー | `%APPDATA%\URLCheck\device.key`       | `~/.config/URLCheck/device.key`          |
| ログ       | `%APPDATA%\URLCheck\logs\urlcheck-*.log` | `~/.config/URLCheck/logs/urlcheck-*.log` |

ログはファイルに書き込まれ、コンソールにも複製されるため、問題を報告するにはログ ファイルだけで
十分です。毎日ローテーションされ、直近 7 日分が保持されます。

## Linux に関する注意

Fedora 44、KDE Plasma、Wayland でテストされています。Wayland は意図的にアプリケーションが
自身のウィンドウを配置することを許可しないため、Windows や X11 とは一部の動作が異なります。

- ポップアップを画面中央に強制することはできません。コンポジターが配置し、通常はメイン
  ウィンドウを基準にした位置になります。
- 常に手前に表示は無効です。GTK の Wayland バックエンドにはその実装がないためです。

どちらも URLCheck のバグではなく、プロトコルの制限です。

KDE Plasma を使っている場合は、KWin でポップアップ ウィンドウを常に手前に表示し、画面中央に
強制することができます。
