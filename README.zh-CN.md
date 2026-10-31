<div align="center">
  <img src="icon.svg" alt="" width="120">
  <h1>URLCheck</h1>
  <p><strong>在浏览器打开链接之前先检查 URL。</strong></p>
  <p>
    <a href="README.md">English</a> ·
    <a href="README.ja.md">日本語</a> ·
    <a href="README.zh-TW.md">繁體中文</a>
  </p>
</div>

URLCheck 会把自身注册为链接处理器，因此点击 `http`/`https` 链接时不会直接进入浏览器，而是先打开一个小巧的
检查弹窗。你可以看清链接究竟指向哪里，去掉其中的跟踪垃圾参数，然后再把它交给真正想用的浏览器。

<div align="center">
  <a href="docs/popup.png"><img src="docs/popup.png" alt="检查弹窗" width="440"></a>
  <br>
  <em>检查弹窗</em>
  <br><br>
  <a href="docs/main-window.png"><img src="docs/main-window.png" alt="主窗口" width="880"></a>
  <br>
  <em>主窗口</em>
</div>

## 为什么需要它

如果不先检查 URL，链接可能会带来危险。本软件让这项检查发生在浏览器做任何事之前。

它还填补了一个空白：[URLCheck](https://github.com/TrianguloY/URLCheck) 只覆盖 Android，没有桌面版。

## 功能

- **拦截链接** —— 注册为 `http`/`https` 的默认处理器，因此每个被点击的链接都会经过弹窗。程序常驻系统托盘。
- **打开前检查** —— 一个无边框弹窗，大小自适应内容，显示在其他窗口之上，把 URL 拆分为协议、主机、
  参数和片段。
- **清理 URL** —— 编辑或删除任意查询参数、清除片段、丢弃整个参数列表，或一键剥离已知的跟踪参数。
- **脚本化** —— Lua 脚本可以在每个 URL 打开前改写它；示例和一键安装请见
  [Lua/README.md](Lua/README.md)。
- **信任前先验证** —— 查询 URL 的 HTTP 状态（跟随重定向），或逐跳查看重定向，弄清短链接最终指向哪里。
- **想在哪打开就在哪打开** —— 为每个链接单独选择浏览器，可选隐私/无痕窗口。最常用的浏览器会成为默认按钮。
- **历史记录** —— 每个被拦截的 URL 都会记录在本地 SQLite 中并可搜索，点击某条记录会重新打开它的弹窗。
- **在复制的链接旁浮动按钮** —— 在任何地方复制 `http(s)` URL 时，指针旁会出现一个小按钮；点一下即可打开检查弹窗，
  无需切换应用。可在设置中关闭。
- **转发到另一台设备** —— 从弹窗把 URL 发送到局域网内的另一个 URLCheck，在对方那里以自己的检查弹窗打开。
  设备会自动发现彼此，并通过确认一次性验证码完成配对，所有传输都是端到端加密的；数据不会离开局域网。

## 技术构成

- **.NET 10 上的 C#** —— 全部逻辑：拦截链接、托盘、URL 的解析与清理、启动浏览器以及历史记录。
- **React 19 + TypeScript**，由 **Vite** 打包，使用 **styled-components** 设置样式 —— 即界面部分。它只负责呈现：
  与 C# 端交换 JSON 消息，自身不做任何实际工作。
- **Photino.NET** —— 桌面外壳。它使用操作系统自带的 Web 视图显示界面，因此 Web 视图是运行时依赖：
  Windows 上是 WebView2，Linux 上是 WebKitGTK。

## 运行

已发布的构建是**自包含**的 —— 它们打包了 .NET 运行时，因此无需额外安装任何东西。操作系统仍需提供以下内容：

除普通压缩包外，还发布四种包格式：

| 文件                                      | 作用                                                                                                                                                                      |
|-------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `URLCheck-<version>-win-x64.msi`          | 单用户 Windows 安装包：安装到 `%LOCALAPPDATA%\Programs\URLCheck`，添加开始菜单项和桌面快捷方式，且从不请求管理员权限。    |
| `urlcheck-<version>-1.fcXX.x86_64.rpm`    | Fedora 包：`sudo dnf install ./urlcheck-<version>-*.rpm`。安装到 `/opt/URLCheck`，并提供 `urlcheck` 命令、桌面项和图标。                       |
| `urlcheck_<version>_amd64.deb`            | Debian/Ubuntu 包：`sudo apt install ./urlcheck_<version>_amd64.deb`。布局与 RPM 相同。                                                                        |
| `urlcheck-<version>-1-x86_64.pkg.tar.zst` | Arch Linux 包：`sudo pacman -U urlcheck-<version>-1-x86_64.pkg.tar.zst`。布局与 RPM 相同。                                                                    |

### Windows

1. Microsoft Edge **WebView2 运行时**。如果你用的不是 Windows 11，就需要它。
   参见[微软页面](https://developer.microsoft.com/microsoft-edge/webview2/)。
2. 低于 Windows 11 的任何版本均不受官方支持。
   如果遇到任何问题，你需要自行解决。
3. 平铺式窗口管理器需要被告知不要接管浮动按钮：它的 Web 视图需要窗口短暂可见才能启动，因此会平铺它的窗口管理器
   会给出错误的尺寸和位置。对于 GlazeWM，以下规则会同时忽略它和弹窗：

```yaml
window_rules:
  - commands: ['ignore']
    match:
      - window_process: { equals: 'URLCheck' }
        window_title: { regex: '^(Popup|SelectionButton)$' }
```

### Linux

1. GTK 的 Web 视图。
2. AppIndicator 库，仅用于托盘图标。
3. `wl-clipboard` 2.3 或更高版本，仅用于复制链接时的浮动按钮。Wayland 不向未聚焦的应用暴露剪贴板，
   `wl-paste --watch` 是绕过这一限制的办法。没有它，该按钮在那里根本不会出现。
4. 仅在 **Fedora 44 + KDE Plasma + Wayland** 上测试过。其他发行版均未测试，而运行时库是最麻烦的部分，
   所以请从库名而非包名入手。
5. 目前仅支持 Wayland。如果你是那种在 X11 上跑着老式窗口管理器的超级极客，遇到问题请自行解决。

| 发行版          | 软件包                                                            |
|-----------------|-------------------------------------------------------------------|
| Fedora 44       | `sudo dnf install webkit2gtk4.1 libayatana-appindicator-gtk3`     |
| Debian / Ubuntu | `sudo apt install libwebkit2gtk-4.1-0 libayatana-appindicator3-1` |
| 其他            | 自行找到提供下列库的包                                            |

```
libwebkit2gtk-4.1.so.0          libjavascriptcoregtk-4.1.so.0
libgtk-3.so.0                   libglib-2.0.so.0
libayatana-appindicator3.so.1   (or the older libappindicator3.so.1)
```

缺少 Web 视图库时，启动会显示 `Unable to load shared library 'Photino.Native'`。要找出提供某个缺失 soname 的包，
请询问你的包管理器 —— 例如 `dnf provides 'libwebkit2gtk-4.1.so.0'`、`apt-file search libwebkit2gtk-4.1.so.0` 或
`pacman -F libwebkit2gtk-4.1.so.0`。

AppIndicator 库仅用于托盘图标：没有它应用仍能运行，只是没有托盘，并保持主窗口可见。

## 构建

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) 20 或更高版本，用于构建界面
- `URLCheck/Libs` 中的共享 DLL 和前端桥接包，从独立的
  [PhotinoNETUtils](../PhotinoNETUtils) 项目用其 `build-and-copy.ps1` 复制而来

## 构建并运行

### 开发

界面由 Vite 提供，因此两者都要运行：

```bash
# terminal 1 — the interface on http://127.0.0.1:3000
cd URLCheck/UserInterface
npm install
npm run dev

# terminal 2 — the desktop app
dotnet run --project URLCheck
```

调试构建会从开发服务器加载界面。常用参数：

```bash
dotnet run --project URLCheck -- --tray        # start hidden in the tray
dotnet run --project URLCheck -- "https://example.com/?utm_source=x"   # open the popup for a URL
```

### 发布

`npm run build` 会把界面复制到 `URLCheck/Resources/wwwroot`，项目再把它嵌入可执行文件 —— 因此发布前要先构建界面。

```bash
cd URLCheck/UserInterface && npm run build
cd ../.. && ./URLCheck/publish.sh          # publish.bat on Windows
```

这会在 `URLCheck/bin/Release/net10.0/<rid>/publish/` 下为每个平台生成单个自包含可执行文件。

## 文件存放位置

|            | Windows                                  | Linux                                    |
|------------|------------------------------------------|------------------------------------------|
| 设置       | `%APPDATA%\URLCheck\settings.json`       | `~/.config/URLCheck/settings.json`       |
| 脚本       | `%APPDATA%\URLCheck\scripts`             | `~/.config/URLCheck/scripts`             |
| 历史记录   | `%APPDATA%\URLCheck\history.db`          | `~/.config/URLCheck/history.db`          |
| 设备密钥   | `%APPDATA%\URLCheck\device.key`          | `~/.config/URLCheck/device.key`          |
| 日志       | `%APPDATA%\URLCheck\logs\urlcheck-*.log` | `~/.config/URLCheck/logs/urlcheck-*.log` |

日志写入文件并同步到控制台，因此仅凭一个日志文件就足以报告问题。日志按天轮转，保留最近七天。

## Linux 说明

已在 Fedora 44、KDE Plasma、Wayland 上测试。Wayland 有意不允许应用自行放置窗口，因此有几点行为与 Windows 或 X11 上不同：

- 弹窗无法强制居中到屏幕 —— 由合成器决定位置，通常相对于主窗口；
- 置顶无效，因为 GTK 的 Wayland 后端没有实现该功能。

这两者都不是 URLCheck 的缺陷，而是协议的限制。

如果你使用 KDE Plasma，可以在 KWin 中让弹窗始终置顶并强制居中到屏幕。
