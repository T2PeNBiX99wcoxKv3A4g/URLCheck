# Lua 脚本

URLCheck 可以对进入的每个 URL 运行小型 Lua 脚本。脚本可以检查 URL、修改它，然后交回 —— 这一切都发生在
检查弹窗打开之前、任何内容到达浏览器之前。

本页说明脚本如何工作。沙盒提供的所有函数见 [API 参考](API)。现成的脚本见 [Lua 脚本示例](Lua-Script-Examples)。

## 脚本存放位置

脚本就是普通的 `.lua` 文件，位于 URLCheck 的设置和日志旁边的 `scripts` 文件夹中。在
Windows 上是：

```
%APPDATA%\URLCheck\scripts
```

脚本页面会显示你系统上的确切文件夹：把鼠标悬停在列表右上角的文件夹名称上即可。

该文件夹中的每个 `.lua` 文件都会被加载。你可以用任意编辑器添加、编辑、重命名或删除文件；文件夹变化时
脚本页面会自动刷新。页面上也有创建、导入和下载脚本的按钮。

### 分享脚本

脚本可以通过链接安装，就像 VPM 链接添加包一样：

```
checkurl://script?url=<the script's URL, percent-encoded>
```

例如：

```
checkurl://script?url=https%3A%2F%2Fraw.githubusercontent.com%2FT2PeNBiX99wcoxKv3A4g%2FURLCheck%2Fmaster%2FLua%2Fx-twitter-remove-params.lua
```

点击它会把脚本下载到该文件夹并打开脚本页面。当你在 **设置 → 系统集成** 中按下 **注册 http/https** 时，
URLCheck 会连同 `http`/`https` 一起注册 `checkurl://` 协议；如果链接没有反应，请再按一次。

## 更新

脚本可以用全局变量声明来源和版本：

```lua
scriptUrl = "https://example.com/my-script.lua"
scriptVersion = "1.2.0"
```

两者都是脚本加载时设置的普通全局变量。URLCheck 只读取一次，之后脚本页可以检查 `scriptUrl`，
并在那边的版本更新时提示替换。版本号是点分数字（`1.2.3`）：改动脚本后必须递增
`scriptVersion`，否则不会提示更新。缺少其中任何一个，脚本就不参与更新检查。

检查时只读取发布端的文本，不会执行尚未安装的代码。更新由你逐个或一次全部确认执行。如果版本相同
但内容不同，URLCheck 会先确认是否覆盖本地副本。替换时保留已安装的文件名；无法编译的文件不会
覆盖正在工作的脚本。

## 脚本的结构

脚本文件在加载时执行一次，并且必须**返回一个函数**。随后该函数会为每个 URL 调用一次：

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

没有返回函数的文件会在脚本页面中带上警告列出，并且不会运行。

脚本按**文件名顺序**运行。每个脚本收到的是上一个脚本产出的 URL，因此
`01-strip-tracking.lua` 会在 `02-force-https.lua` 之前运行。每个脚本都有自己的 Lua 状态：
你在函数外设置的局部变量和全局变量在 URL 之间会一直保留。

## `u` 表

该函数接收一张表，通常称为 `u`。其中的 URL 字段都是**已解码**的，因此脚本
处理的是纯文本，永远不需要自己反转义。

| 字段            | 类型            | 说明                                                                                                                          |
|-----------------|-----------------|--------------------------------------------------------------------------------------------------------------------------------|
| `u.url`         | string          | 完整的 URL，已做百分号解码。仅供参考 —— 见下文。                                                                               |
| `u.scheme`      | string          | `http` 或 `https`。                                                                                                            |
| `u.host`        | string          | 主机名，例如 `example.com`。                                                                                                   |
| `u.port`        | number 或 `nil` | 显式端口；当 URL 使用默认端口时为 `nil`。                                                                                      |
| `u.path`        | string          | 路径，已解码；总是以 `/` 开头。                                                                                                |
| `u.fragment`    | string 或 `nil` | `#` 之后的部分，已解码；URL 没有该部分时为 `nil`。                                                                             |
| `u.query`       | table           | 解码后的查询参数，例如 `{ q = "hello world", page = "2" }`。即使 URL 没有查询，也总是表。                                      |
| `u.app_version` | string          | 正在运行的 URLCheck 版本。                                                                                                     |

当输入不是绝对 URL 时（例如在弹窗里只输入 `google.com`），`u.scheme`、`u.host` 和 `u.path` 不存在。
使用前请先检查：

```lua
if u.host and u.host == "example.com" then
    u.query["ref"] = nil
end
```

对于这样的 URL

```
https://example.com/a%20b?q=hello%20world&plus=a+b&x=%2B#frag%20ment
```

脚本看到的是：

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

`u.query` 是脚本最常操作的部分：

```lua
u.query["utm_source"] = nil      -- remove one parameter
u.query["ref"] = "urlcheck"      -- add one (or replace its value)
u.query = nil                    -- drop the whole query
u.query = {}                     -- same thing, with an empty table
```

- 键和值始终是字符串。`a=1` 得到 `u.query["a"] == "1"`；如果需要数字，请使用 `tonumber()`。
- `%XX` 转义和 `+` 会被解码（`+` 变为空格，`%2B` 变为 `+`）。
- 在 URL 中出现两次的参数保留其**最后一个**值。
- 不是字符串的值（数字、布尔值）在重建 URL 时会转换为文本。
- 原有参数保持顺序；脚本添加的参数排在其后，并按名称排序。相同的输入总是产生相同的 URL。
- 使用 `pairs` 迭代时删除键只对当前键安全；如果要删除多个，请先收集名称。

## 返回结果

返回值决定 URL 的命运：

| 返回值                                             | 效果                                                                                          |
|----------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `u`                                                | 由 `u.scheme`、`u.host`、`u.port`、`u.path`、`u.query` 和 `u.fragment` 重建 URL。             |
| 一个 URL 字符串，例如 `"https://example.com/"`     | URL 被替换为该字符串。                                                                        |
| `nil`（或什么都不返回）                            | URL 保持原样。                                                                                |

```lua
return function(u)
    if u.host == "old.example" then
        return "https://new.example" .. u.path
    end

    return u
end
```

有两点值得了解：

- **返回 `u` 时修改 `u.url` 没有任何效果。** URL 由上述字段重建；
  `u.url` 只是用来读取的。如果想替换整个 URL，请返回字符串。
- 如果 `u.scheme` 或 `u.host` 最终为空，原始 URL 会保持不变。

## 编码

约定很简单：**进来时解码，出去时编码。**

- `u.url`、`u.path`、`u.fragment` 以及 `u.query` 的每个键和值都以解码形式到达。
- 重建 URL 时，空格和非 ASCII 文本会重新编码（`%20`、`%E4%B8%AD` 等），
  路径段会逐个转义，因此 `/` 仍作分隔符，查询的键和值也分别转义。因此包含 `&` 或 `=` 的值
  仍是单个值。
- 作为字符串返回的 URL 只会转义 URL 无法承载的字符（空格、控制字符、
  非 ASCII 以及 `` " < > \ ^ ` { | } ``）。结构字符 —— `: / ? # & = %` —— 保持
  不变，因此你可以用解码后的各部分构建 URL 并交回。

因此，优先修改 `u.query`，而不是手工拼接查询字符串：

```lua
-- good: the value is escaped for you
u.query["q"] = "a b&c"           -- -> q=a%20b%26c

-- avoid: the & and the spaces are ambiguous
return "https://example.com/?q=" .. u.query["q"]
```

## `print`

`print` 向脚本页面底部的 **Lua 日志**写入一行。它不会显示在弹窗中，也不会打开任何东西。

```lua
return function(u)
    print("host:", u.host)
    print("query:", u.query)

    return u
end
```

- 值之间用制表符分隔，与 Lua 自带的 `print` 一样。
- 与 Lua 不同，表会被**展开**而不是打印地址：
  `{ a = 1, b = "two", c = { [2] = 3, d = true } }`。表内的字符串会被加引号并
  转义；包含自身的表打印为 `{...}`，
  嵌套超过六层后停止。
- 每行都带有脚本文件名的标记，因此多个脚本可以共用该日志。

日志保留最后 200 行；**清除**按钮会清空它。

## 沙盒与限制

脚本运行在一个处理文本和数字的沙盒中：

- **可用：** 基础库（[_G](_G)）、[string](string)、[table](table)、[math](math)、
  [bit32](bit32)、[coroutine](coroutine)，以及 `base64`、`json`、`http`、`js`（见下）。
- **不可用：** `io`、`os`、`debug`、`package`、`require`、`dofile` 和 `loadfile`。脚本
  无法读取文件或启动程序。
- 每个脚本处理一个 URL 有 **8 秒**（包含网络请求）。运行更久的脚本会被停止并按错误处理。

## 额外库

### `base64`

```lua
base64.encode("hello")        -- "aGVsbG8="
base64.decode("aGVsbG8=")     -- "hello"；也接受 URL-safe 和缺少填充的输入
```

`decode` 遇到非法输入时返回 `nil`。

### `json`

```lua
local value = json.parse('{"a":[1,2]}')  -- { a = { 1, 2 } }
local text = json.stringify(value)       -- '{"a":[1,2]}'
```

`parse` 遇到非法 JSON 时返回 `nil, message`。

### `http`

网络默认关闭。要使用它，请在 **设置 → 脚本网络访问** 中开启，并在脚本开头设置
`scriptNetwork = true`：

```lua
scriptNetwork = true

return function(u)
    local response = http.get("https://example.com/api?url=" .. u.url)
    if not response then
        return u
    end

    print(response.status, response.headers["content-type"])
    local data = json.parse(response.body)
    ...
end
```

`http.get(url [, options])` 和 `http.request(url [, options])` 返回
`{ status, body, headers, url }`，失败时返回 `nil, message`。只接受 `http`/`https` 与
`GET`/`POST`/`HEAD`；正文上限 512 KB，请求共用 8 秒预算。`options` 可包含 `method`、`body`、
`headers` 和 `timeout`（1–7 秒）。

允许联网的脚本可以把看到的网址发送到任何地方。只对你信任的脚本开启；下载来的脚本也可以自行
声明 `scriptNetwork`。

### `js`

`js.eval(source [, bindings])` 运行一个裸 JavaScript 引擎：

```lua
local target = js.eval([[
    decodeURIComponent(new URL(input).searchParams.get("next"))
]], { input = u.url })
```

没有 DOM、`setTimeout`、`fetch` 或页面环境，所以页面自身的脚本无法运行。它适合表达式和小片段
（解码、正则、字符串处理）；要取文本请先用 `http.get`。返回字符串、数字、布尔值或 `nil`；
出错会抛出异常。

## 错误

- **文件无法编译：** 会带上警告图标列出；悬停可查看消息。
  编辑器会拒绝保存无法解析的脚本。
- **文件没有返回函数：** 列表显示“脚本必须返回一个函数”。
- **函数抛出错误或超时：** URL 保持不变，其余脚本仍会运行，
  弹窗显示该错误，完整消息写入 Lua 日志。

## 脚本页面

脚本页面就是这个文件夹的编辑器。

- **左侧：** 磁盘上的脚本，无法加载的脚本旁会有警告图标。
  底部浮动卡片可以新建脚本、导入文件，或从 URL 下载脚本。
- **右侧：** 所选脚本的编辑器。
  - **铅笔**重命名文件（Enter 确认，Escape 取消）。
  - **打开**把文件交给系统处理 `.lua` 文件的默认程序。
  - **保存**（或 `Ctrl`/`Cmd` + `S`）写入文件。
  - **垃圾桶**删除文件；点两次确认。
- **测试框：** 输入 URL 并按下 **测试**（或 Enter）。脚本会完全按编辑器中的内容运行 ——
  包括未保存的改动 —— 结果显示最终 URL 或错误。不会打开任何东西，也不会加入历史记录；
  脚本 `print` 的内容会进入 Lua 日志。
- **Lua 日志：** 脚本打印的内容或失败信息，最新的在最后。

列表跟随文件夹：用其他程序添加、重命名或删除的文件会自动出现。
如果你正在编辑的文件在有未保存改动时被删除，编辑器会保留它并
标记警告；保存时会重新写入该文件。
