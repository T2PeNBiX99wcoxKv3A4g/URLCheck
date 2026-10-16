# URLCheck

**Check the URL before it opens in your browser.**

URLCheck registers itself as a link handler, so clicking an `http`/`https` link opens a small
inspection popup instead of going straight to a browser. You get to see where the link really
goes, strip the tracking junk, and only then hand it to the browser you actually want.

## Why

Links arrive with a lot of baggage: `utm_*` and `fbclid` parameters, shorteners that hide the
destination, and `http://` URLs that should have been `https://`. URLCheck puts a step in
between so you can look and clean up first, without changing how you browse.

## Features

- **Intercept links** — installed as the default handler for `http`/`https`, so every clicked
  link passes through the popup. Stays resident in the tray.
- **Inspect before opening** — a borderless popup that fits its own content, on top of the
  other windows, showing the URL broken into scheme, host, parameters and fragment.
- **Clean the URL** — edit or remove any query parameter, clear the fragment, drop the whole
  parameter list, or strip well-known tracking parameters in one click.
- **Check before trusting** — ask for the HTTP status of the URL (following redirects), or step
  through redirects one hop at a time to see where a shortener leads.
- **Open where you want** — pick a browser per link, optionally in a private/incognito window.
  The most-used browser becomes the default button.
- **History** — every intercepted URL is recorded locally in SQLite and can be searched, and
  clicking an entry reopens the popup for it.
- **Localised** — English, Traditional Chinese, Simplified Chinese and Japanese, switchable at
  runtime and shared between the interface and the backend.

## How it works

The desktop backend is C# (.NET 10) and holds *all* of the logic. The interface is a React +
TypeScript app rendered in a Photino window, and it is presentation only: the two sides talk in
JSON over Photino's `window.external.sendMessage` / `receiveMessage` bridge.

```
URLCheck/
├── Program.cs            composition root: single instance, windows, tray
├── Messaging/            the JSON bridge and its source-generated serialization context
├── Services/             settings, history, browsers, protocol registration, localisation
├── Inspect/              HTTP status checks and redirect lookups
├── Platform/             everything that differs per OS (browsers, windows, protocols, GTK)
├── Interop/              Win32 and GTK/tray plumbing
├── Resources/i18n/       translations, embedded as JSONC
└── UserInterface/        the React app (embedded into the executable for release builds)
```

Platform differences are kept behind small interfaces (`IBrowserLocator`, `IWindowPlatform`,
`IProtocolRegistrar`), and each implementation is marked with the OS it belongs to.

- **Windows** registers itself in the registry as a candidate browser. Windows protects the
  default-handler choice, so you still confirm it once in *Default apps*.
- **Linux** writes a `urlcheck.desktop` entry and sets the handler through `xdg-mime`, and uses
  the StatusNotifierItem protocol for its tray icon.

## Requirements

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) 20 or newer, to build the interface

On Linux the app also needs the runtime libraries the web view and tray use:

```bash
# Fedora
sudo dnf install webkit2gtk4.1 libayatana-appindicator-gtk3
```

## Build and run

### Development

The interface is served by Vite, so run both:

```bash
# terminal 1 — the interface on http://127.0.0.1:3000
cd URLCheck/UserInterface
npm install
npm run dev

# terminal 2 — the desktop app
dotnet run --project URLCheck
```

Debug builds load the interface from the dev server. Useful arguments:

```bash
dotnet run --project URLCheck -- --tray        # start hidden in the tray
dotnet run --project URLCheck -- "https://example.com/?utm_source=x"   # open the popup for a URL
```

### Release

`npm run build` copies the interface into `URLCheck/Resources/wwwroot`, which the project embeds
into the executable — so build the interface before publishing.

```bash
cd URLCheck/UserInterface && npm run build
cd ../.. && ./URLCheck/publish.sh          # publish.bat on Windows
```

That produces a single self-contained executable per platform under
`URLCheck/bin/Release/net10.0/<rid>/publish/`.

## Where things are stored

| | Windows | Linux |
|---|---|---|
| Settings | `%APPDATA%\URLCheck\settings.json` | `~/.config/URLCheck/settings.json` |
| History | `%APPDATA%\URLCheck\history.db` | `~/.config/URLCheck/history.db` |
| Logs | `%APPDATA%\URLCheck\logs\urlcheck-*.log` | `~/.config/URLCheck/logs/urlcheck-*.log` |

Logs are written to the file and mirrored to the console, so a log file is enough to report a
problem. They roll daily and the last seven are kept.

## Notes on Linux

Wayland deliberately does not let an application place its own windows, so a few things behave
differently there than on Windows or X11:

- the popup cannot be forced to the centre of the screen — the compositor positions it, usually
  relative to the main window;
- always-on-top is a no-op, because the Wayland backend has no implementation for it.

Neither is a bug in URLCheck; both are limitations of the protocol.

## License

[MIT](LICENSE)
