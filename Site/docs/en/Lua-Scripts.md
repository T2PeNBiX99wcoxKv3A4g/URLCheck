# Lua scripts

URLCheck can run small Lua scripts over every URL that comes in. A script can inspect the URL,
change it, and hand it back — before the inspection popup opens and before anything reaches the
browser.

This page explains how scripting works. For every function the sandbox provides, see the
[API reference](API). For ready-made scripts see [Lua script examples](Lua-Script-Examples).

## Where scripts live

Scripts are plain `.lua` files in the `scripts` folder beside URLCheck's settings and logs. On
Windows that is:

```
%APPDATA%\URLCheck\scripts
```

The Scripts page shows the exact folder for your system: hover the folder name in the top-right of
the list.

Every `.lua` file in that folder is loaded. You can add, edit, rename or delete files with any
editor; the Scripts page refreshes by itself when the folder changes. The page also has buttons to
create, import and download scripts.

### Sharing a script

A script can be installed with a link, the same way a VPM link adds a package:

```
checkurl://script?url=<the script's URL, percent-encoded>
```

For example:

```
checkurl://script?url=https%3A%2F%2Fraw.githubusercontent.com%2FT2PeNBiX99wcoxKv3A4g%2FURLCheck%2Fmaster%2FLua%2Fx-twitter-remove-params.lua
```

Clicking it downloads the script into the folder and opens the Scripts page. URLCheck registers the
`checkurl://` scheme together with `http`/`https` when you press **Register http/https** in
**Settings → System integration**; if the link does nothing, press it once.

## The shape of a script

A script file is executed once when it is loaded and must **return a function**. That function is
then called once for every URL:

```lua
-- This part runs once, when the script is loaded.
local tracking = { "utm_source", "utm_medium", "utm_campaign", "fbclid", "gclid" }

-- This is the part that runs for every URL.
return function(u)
    for _, name in ipairs(tracking) do
        u.query[name] = nil
    end

    return u
end
```

A file that does not return a function is listed in the Scripts page with a warning and is not run.

Scripts run in **file-name order**. Each script receives the URL the previous one produced, so
`01-strip-tracking.lua` runs before `02-force-https.lua`. Every script has its own Lua state: the
locals and globals you set outside the function stay alive between URLs.

## The `u` table

The function receives one table, usually called `u`. Its URL fields are **URL-decoded**, so scripts
work with plain text and never have to unescape anything themselves.

| Field           | Type            | Description                                                                                                                    |
|-----------------|-----------------|--------------------------------------------------------------------------------------------------------------------------------|
| `u.url`         | string          | The whole URL, percent-decoded. Informational — see below.                                                                     |
| `u.scheme`      | string          | `http` or `https`.                                                                                                             |
| `u.host`        | string          | The host name, for example `example.com`.                                                                                      |
| `u.port`        | number or `nil` | The explicit port, or `nil` when the URL uses the default one.                                                                 |
| `u.path`        | string          | The path, decoded; always starts with `/`.                                                                                     |
| `u.fragment`    | string or `nil` | The part after `#`, decoded; `nil` when the URL has none.                                                                      |
| `u.query`       | table           | The decoded query parameters, for example `{ q = "hello world", page = "2" }`. Always a table, even when the URL has no query. |
| `u.app_version` | string          | The running URLCheck version.                                                                                                  |

For a URL like

```
https://example.com/a%20b?q=hello%20world&plus=a+b&x=%2B#frag%20ment
```

a script sees:

```lua
u.url       -- "https://example.com/a b?q=hello world&plus=a+b&x=+#frag ment"
u.scheme    -- "https"
u.host      -- "example.com"
u.port      -- nil
u.path      -- "/a b"
u.fragment  -- "frag ment"
u.query     -- { q = "hello world", plus = "a b", x = "+" }
```

### `u.query`

`u.query` is the part scripts touch most:

```lua
u.query["utm_source"] = nil      -- remove one parameter
u.query["ref"] = "urlcheck"      -- add one (or replace its value)
u.query = nil                    -- drop the whole query
u.query = {}                     -- same thing, with an empty table
```

- Keys and values are always strings. `a=1` gives `u.query["a"] == "1"`; use `tonumber()` if you
  need a number.
- `%XX` escapes and `+` are decoded (`+` becomes a space, `%2B` becomes `+`).
- A parameter that appears twice in the URL keeps its **last** value.
- A value that is not a string (a number, a boolean) is converted to text when the URL is rebuilt.
- The original parameters keep their order; parameters a script adds come after them, sorted by
  name. The same input always produces the same URL.
- Removing keys while iterating with `pairs` is safe only for the current key; collect the names
  first if you want to remove several.

## Returning a result

The return value decides what happens to the URL:

| Return value                                       | Effect                                                                                        |
|----------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `u`                                                | The URL is rebuilt from `u.scheme`, `u.host`, `u.port`, `u.path`, `u.query` and `u.fragment`. |
| a URL string, for example `"https://example.com/"` | The URL is replaced by that string.                                                           |
| `nil` (or nothing)                                 | The URL is left exactly as it was.                                                            |

```lua
return function(u)
    if u.host == "old.example" then
        return "https://new.example" .. u.path
    end

    return u
end
```

Two things are worth knowing:

- **Editing `u.url` does nothing when you return `u`.** The URL is rebuilt from the fields above;
  `u.url` is there to read. Return a string if you want to replace the whole URL.
- If `u.scheme` or `u.host` ends up empty, the original URL is kept unchanged.

## Encoding

The contract is simple: **decoded going in, encoded going out.**

- `u.url`, `u.path`, `u.fragment` and every key and value of `u.query` arrive decoded.
- When the URL is rebuilt, spaces and non-ASCII text are encoded again (`%20`, `%E4%B8%AD`, …),
  path segments are escaped one by one so `/` stays a separator, and query keys and values are
  escaped individually. A value containing `&` or `=` therefore stays a single value.
- A URL returned as a string only has the characters a URL cannot carry escaped (spaces, control
  characters, non-ASCII and `` " < > \ ^ ` { | } ``). The structure — `: / ? # & = %` — is left
  alone, so you can build a URL from decoded parts and hand it back.

Because of that, prefer changing `u.query` over building a query string by hand:

```lua
-- good: the value is escaped for you
u.query["q"] = "a b&c"           -- -> q=a%20b%26c

-- avoid: the & and the spaces are ambiguous
return "https://example.com/?q=" .. u.query["q"]
```

## `print`

`print` writes a line to the **Lua log** at the bottom of the Scripts page. It is not shown in the
popup and does not open anything.

```lua
return function(u)
    print("host:", u.host)
    print("query:", u.query)

    return u
end
```

- Values are separated by a tab, like Lua's own `print`.
- Unlike Lua, tables are **expanded** instead of printing an address:
  `{ a = 1, b = "two", c = { [2] = 3, d = true } }`. Strings inside a table are quoted and
  escaped; a table that contains itself prints as `{...}`,
  and nesting stops after six levels.
- Each line is tagged with the script's file name, so several scripts can share the log.

The log keeps the last 200 lines; the **Clear** button empties it.

## Sandbox and limits

Scripts run in a sandbox that can work on text and numbers, and nothing else:

- **Available:** the base library ([_G](_G)), [string](string), [table](table), [math](math),
  [bit32](bit32) and [coroutine](coroutine).
- **Not available:** `io`, `os`, `debug`, `package`, `require`, `dofile` and `loadfile`. A script
  cannot read files, reach the network or start programs.
- Each script gets **2 seconds** per URL. A script that runs longer is stopped and treated as an
  error.

## Errors

- **The file does not compile:** it is listed with a warning icon; hovering shows the message. The
  editor refuses to save a script that does not parse.
- **The file does not return a function:** the list shows “The script must return a function.”
- **The function throws or times out:** the URL is left as it was, the remaining scripts still run,
  the popup shows the error, and the full message is written to the Lua log.

## The Scripts page

The Scripts page is the editor for this folder.

- **Left:** the scripts on disk, with a warning icon next to a script that does not load. The
  floating card at the bottom creates a new script, imports files, or downloads a script from a
  URL.
- **Right:** the editor for the selected script.
  - **Pencil** renames the file (Enter to confirm, Escape to cancel).
  - **Open** hands the file to the system's default program for `.lua` files.
  - **Save** (or `Ctrl`/`Cmd` + `S`) writes the file.
  - **Trash** deletes it; click twice to confirm.
- **Test box:** type a URL and press **Test** (or Enter). The script runs exactly as it is in the
  editor — including unsaved changes — and the result shows the final URL, or the error. Nothing
  opens and nothing is added to the history; anything the script `print`s lands in the Lua log.
- **Lua log:** what the scripts printed or failed with, newest last.

The list follows the folder: a file added, renamed or deleted with another program shows up on its
own. If the file you are editing is deleted while it has unsaved changes, the editor keeps it and
marks it with a warning; saving writes the file again.
