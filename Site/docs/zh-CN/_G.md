# `_G` —— 基础库

基础库既可以通过 `_G` 使用，也可以直接按名称使用（`type(...)`、`pairs(...)` 等）。
`_G` 是一张普通表，因此 `_G["type"]` 和 `type` 是同一个函数。

沙盒中已**移除** `dofile`、`loadfile` 和 `require`，`print` 则被替换为 URLCheck 自己的版本（见下文）。

| 名称                                                                                                                                                                                                                   | 类型     |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `_G`                                                                                                                                                                                                                   | table    |
| `_VERSION`                                                                                                                                                                                                             | string   |
| `assert`, `collectgarbage`, `error`, `getmetatable`, `ipairs`, `load`, `next`, `pairs`, `pcall`, `print`, `rawequal`, `rawget`, `rawlen`, `rawset`, `select`, `setmetatable`, `tonumber`, `tostring`, `type`, `xpcall` | function |

---

## `assert(v [, message])`

当 `v` 既不是 `nil` 也不是 `false` 时返回它的所有参数。否则用 `message` 抛出错误
（默认：`"assertion failed!"`）。

```lua
local value = assert(tonumber(u.query["page"]), "page must be a number")
```

由于它会返回每一个参数，常被内联使用：`local name = assert(u.query["name"])`。

## `collectgarbage([opt [, arg]])`

为兼容性而接受。在 URLCheck 中它什么也不做，也不返回任何值，因此调用它没有意义。

## `error(message [, level])`

用 `message` 抛出错误。`level` 控制位置前缀：

- `1`（默认）—— 在错误前加上调用者的位置。
- `0` —— 不加位置，只有消息。

抛出的错误会终止该 URL 的脚本执行；URL 保持不变，消息会被记录到日志。

```lua
error("unexpected host: " .. u.host)
```

## `getmetatable(value)`

返回 `value` 的元表，或 `nil`。如果元表带有 `__metatable` 字段，则返回该值
（真正的元表受到保护）。

## `ipairs(t)`

返回遍历 `t[1], t[2], …` 的迭代器，遇到第一个 `nil` 停止。这是遍历列表的常用方式：

```lua
for index, value in ipairs({ "a", "b" }) do
    print(index, value)
end
```

## `load(chunk [, chunkname [, mode [, env]]])`

编译一个**字符串**并返回函数，或返回 `nil` 加一条错误消息。只支持字符串形式的代码块
（不支持读取函数）。`env` 设置被编译代码块的环境。

```lua
local add = load("return 1 + 1")
print(add())                          -- 2

local f = load("return x", "chunk", "t", { x = 9 })
print(f())                            -- 9
```

## `next(t [, key])`

返回 `key` 之后的下一个键和值，表遍历完时返回 `nil`。`next(t)` 从第一对开始。
这是 `pairs` 背后的原语；正常代码中请使用 `pairs`。

## `pairs(t)`

返回 `next`、该表以及 `nil`，用于遍历所有键：

```lua
for name, value in pairs(u.query) do
    print(name, value)
end
```

顺序是未指定的。如果表有 `__pairs` 元方法，则改用该元方法。

## `pcall(f, ...)`

以保护模式调用 `f`。成功时返回 `true` 加结果，抛出错误时返回 `false` 加错误信息。

```lua
local ok, result = pcall(tonumber, u.query["page"])
```

## `print(...)`

URLCheck 替换了 Lua 的 `print`：

- 它向脚本页面上的 **Lua 日志**写入一行 —— 不写入控制台，也不写入弹窗。
- 参数之间用制表符分隔。
- 表会被展开，而不是打印地址：
  `{ a = 1, b = "two", c = { [2] = 3, d = true } }`。表内的字符串会被加引号并
  转义；包含自身的表打印为 `{...}`，
  嵌套超过六层后停止。
- 每行都带有脚本文件名的标记。

```lua
print("host:", u.host)
print("query:", u.query)
```

## `rawequal(a, b)`

比较两个值，不调用 `__eq`。

## `rawget(t, k)`

返回 `t[k]`，不调用 `__index`。

## `rawlen(v)`

返回表或字符串的长度，不调用 `__len`。

## `rawset(t, k, v)`

设置 `t[k] = v`，不调用 `__newindex`，并返回 `t`。

## `select(index, ...)`

- `select(n, ...)` 返回从第 `n` 个起的所有参数（负数 `n` 从末尾计数）。
- `select("#", ...)` 返回参数的个数。

```lua
print(select("#", 1, nil, 3))     -- 3
print(select(2, "a", "b", "c"))   -- b   c
```

## `setmetatable(t, mt)`

设置 `t` 的元表并返回 `t`。当已有元表受 `__metatable` 保护时会抛出错误。

```lua
local t = setmetatable({}, { __index = function() return 0 end })
print(t.missing)                  -- 0
```

## `tonumber(v [, base])`

把 `v` 转换为数字，无法转换时返回 `nil`。指定 `base`（2–36）时，值必须是字符串，
并按该进制解析。

```lua
print(tonumber("42"))             -- 42
print(tonumber("ff", 16))         -- 255
print(tonumber("0x10"))           -- 16
```

## `tostring(v)`

返回 `v` 的字符串表示，当值有 `__tostring` 时会调用它。

## `type(v)`

返回 `"nil"`、`"boolean"`、`"number"`、`"string"`、`"table"`、`"function"`、`"thread"` 或
`"userdata"` 之一。

```lua
if type(u.query["page"]) == "string" then
    print("page is text:", u.query["page"])
end
```

## `xpcall(f, msgh [, ...])`

类似 `pcall`，但在栈展开之前调用 `msgh(error)`，并把额外参数传给
`f`（Lua 5.2）。成功时返回 `true` 加结果，失败时返回 `false` 加 `msgh` 返回的值。

```lua
local ok, message = xpcall(function(a) return a * 2 end, function(e) return e end, 21)
```

---

## `_G`

全局表本身。上述每个函数、标准库以及脚本创建的任何全局变量都存放在这里。

LuaCSharp 在 `_G` 中留下了一个内部值（`__lua_mathematics_library_random_instance`），请忽略它。

## `_VERSION`

解释器版本：`"Lua 5.2"`。

## 不可用

`dofile`、`loadfile`、`require`、`module`、`unpack`（请用 `table.unpack`）、`gcinfo`、`newproxy`。
