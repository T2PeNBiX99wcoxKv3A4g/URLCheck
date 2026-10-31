# `string` —— 字符串函数

Lua 的字符串库。每个函数也可以作为字符串的方法调用，因此 `s:upper()` 与
`string.upper(s)` 相同。

`find`、`match`、`gsub` 和 `gmatch` 使用 **Lua 模式**（速查表见文末）。`regex*`
系列函数则接受 **.NET 正则表达式**，支持交替、重复次数以及其他常见正则语法。

| 函数                            | 用途                           |
|---------------------------------|--------------------------------|
| `string.byte`                   | 子串的字符编码                 |
| `string.char`                   | 由字符编码构建字符串           |
| `string.dump`                   | 不支持（见下文）               |
| `string.find`                   | 查找模式                       |
| `string.format`                 | 构建格式化字符串               |
| `string.gmatch`                 | 遍历所有匹配                   |
| `string.gsub`                   | 替换匹配                       |
| `string.len`                    | 字节长度                       |
| `string.lower` / `string.upper` | 改变大小写                     |
| `string.match`                  | 提取捕获                       |
| `string.regexMatch`             | .NET 正则匹配                  |
| `string.regexFind`              | .NET 正则查找                  |
| `string.regexGsub`              | .NET 正则替换                  |
| `string.regexGmatch`            | .NET 正则迭代器                |
| `string.regexSplit`             | .NET 正则拆分                  |
| `string.rep`                    | 重复字符串                     |
| `string.reverse`                | 反转字符串                     |
| `string.split`                  | 把字符串拆分为列表             |
| `string.sub`                    | 提取子串                       |

Lua 5.2 没有 `string.pack`、`string.unpack` 或 `string.packsize`（那些是 5.3+ 的）。

---

## `string.byte(s [, i [, j]])`

返回 `s` 中从位置 `i` 到 `j` 的字节数值。`i` 默认为 `1`，`j` 默认为 `i`。
负数位置从末尾计数。

```lua
print(string.byte("A"))          -- 65
print(string.byte("ABC", 1, 3))  -- 65   66   67
```

## `string.char(...)`

返回由给定字节值组成的字符串。

```lua
print(string.char(65, 66, 67))   -- ABC
```

## `string.dump(function)`

该函数存在于库中，但 URLCheck 的 Lua 实现**不支持**它：调用会抛出
`stirng.dump is not supported`。请勿使用。

## `string.find(s, pattern [, init [, plain]])`

在 `s` 中从 `init`（默认 `1`）开始查找 `pattern` 的第一个匹配。返回起始
和结束位置，以及所有捕获；没有匹配时返回 `nil`。当 `plain = true` 时，
模式按字面匹配。

```lua
print(string.find("hello world", "wor"))          -- 7   9
print(string.find("a.b", ".", 1, true))           -- 2   2
```

## `string.format(formatstring, ...)`

用 `printf` 风格的格式构建字符串。常见说明符：`%s`（字符串）、`%d`/`%i`（整数）、
`%f`（定点）、`%e`/`%g`（科学计数/最短）、`%x`/`%X`（十六进制）、`%o`（八进制）、`%c`（字符）、
`%q`（带引号、转义的字符串）以及 `%%`（字面 `%`）。

```lua
print(string.format("%s=%d (%.2f)", "page", 3, 1.5))   -- page=3 (1.50)
print(string.format("%q", 'a "quoted" line'))          -- "a \"quoted\" line"
```

## `string.gmatch(s, pattern)`

返回遍历 `s` 中 `pattern` 所有匹配的迭代器。捕获会作为单独的值返回。

```lua
for name, value in string.gmatch("a=1&b=2", "([^&=]+)=([^&]*)") do
    print(name, value)
end
```

## `string.gsub(s, pattern, repl [, n])`

替换 `s` 中 `pattern` 的匹配，并返回新字符串以及替换次数。
`repl` 可以是：

- 一个**字符串**（`%1`、`%2` 等插入捕获；`%0` 插入整个匹配），
- 一张**表**（按第一个捕获查找），
- 一个**函数**（以捕获为参数调用；返回 `nil` 表示保留匹配）。

`n` 限制替换的次数。

```lua
print(string.gsub("hello world", "o", "0"))            -- hell0 w0rld   2
print(string.gsub("a=1", "(%w+)=(%w+)", "%2=%1"))      -- 1=a   1
print(string.gsub("a b", "%s", function() return "_" end))
```

## `string.len(s)`

返回 `s` 的字节长度。`#` 运算符作用相同。

```lua
print(string.len("abc"))         -- 3
```

## `string.lower(s)` / `string.upper(s)`

返回把所有字母转换为小写或大写的 `s`。

```lua
print(("HeLLo"):lower())         -- hello
print(("hello"):upper())         -- HELLO
```

## `string.match(s, pattern [, init])`

返回 `s` 中 `pattern` 第一个匹配的捕获；模式没有捕获时返回整个匹配。
没有匹配时返回 `nil`。`init` 设置起始位置。

```lua
print(string.match("page=42", "page=(%d+)"))   -- 42
print(string.match("abc", "b"))                -- b
```

## `string.rep(s, n [, sep])`

返回重复 `n` 次的 `s`，各副本之间用 `sep` 分隔。

```lua
print(string.rep("ab", 3))        -- ababab
print(string.rep("ab", 3, "-"))   -- ab-ab-ab
```

## `string.reverse(s)`

返回字节顺序反转的 `s`。

```lua
print(string.reverse("abc"))      -- cba
```

## `string.sub(s, i [, j])`

返回 `s` 中从 `i` 到 `j` 的子串。`j` 默认为 `-1`（末尾）；负数位置
从末尾计数。

```lua
print(string.sub("hello", 2, 4))  -- ell
print(string.sub("hello", -3))    -- llo
```

## `string.split(s [, sep])`

按字面字符串 `sep` 拆分 `s`，并以列表（表）返回各部分。没有 `sep` ——
或为空 —— 时按空白拆分并丢弃空片段。分隔符是字面量；
需要模式时请使用 `string.gmatch`。

```lua
print(table.concat(("a,b,c"):split(","), "|"))   -- a|b|c
print(table.concat(("a,,b"):split(","), "|"))    -- a||b
print(table.concat(("  a  b "):split(), "|"))    -- a|b
```

## 字符串元表扩展

URLCheck 在标准字符串元表之上增加了两个便利功能。其他一切 —— 诸如
`s:sub(1, 1)` 和 `s:upper()` 的方法、`..` 运算符、`#s` —— 都照旧工作。

**索引。** `s[i]` 返回位置 `i` 处的字符，等同于 `string.sub(s, i, i)`。
负数位置从末尾计数，越界的任何内容都是 `nil`：

```lua
local s = "abc"
print(s[1], s[3], s[-1], s[4])   -- a   c   c   nil
```

**`+` 连接。** 当普通算术无法进行时，`a + b` 会连接字符串：`"a" + "b"` 是 `"ab"`，
`"a" + 1` 是 `"a1"`。

```lua
print("hello" + " " + "world")   -- hello world
```

有一点需要注意：Lua 的字符串转数字强制转换仍然优先，因此 `"1" + "2"` 是 `3`，而不是 `"12"`。
当你确实想连接时，请使用 `..`（或非数字字符串）。

## 正则函数

Lua 模式能力有限 —— 没有交替，没有 `{2,4}` 次数。这些函数改为接受 **.NET 正则
表达式**，其余方面与其 Lua 对应函数形状相同。把模式写成
普通字符串（`"\\d+"`）或长字符串（`[[\d+]]`），后者可避免转义。

| 函数 | 类似 | 作用 |
| --- | --- | --- |
| `string.regexMatch(s, pattern [, init])` | `string.match` | 捕获，或整个匹配 |
| `string.regexFind(s, pattern [, init])` | `string.find` | 起始和结束位置，然后是捕获 |
| `string.regexGsub(s, pattern, repl [, n])` | `string.gsub` | 替换匹配 |
| `string.regexGmatch(s, pattern)` | `string.gmatch` | 遍历匹配的迭代器 |
| `string.regexSplit(s, pattern)` | — | 拆分为列表 |

```lua
("2026-10-30"):regexMatch("(\\d+)-(\\d+)-(\\d+)")   -- 2026   10   30
("cat"):regexMatch("^(cat|dog)$")                  -- cat
("a1b22"):regexGsub("\\d+", "<$0>")                -- a<1>b<22>   2
("a1b22"):regexGsub("\\d+", { ["1"] = "one" })     -- aoneb22     2
("a, b ,c"):regexSplit("\\s*,\\s*")                -- { "a", "b", "c" }
```

- `init` 从 1 开始计数，为负数时从末尾计数，与 `string.find` 相同。
- 替换字符串使用 .NET 语法：`$0` 是整个匹配，`$1` 是分组，`${name}` 是命名
  分组。表替换按整个匹配（或按第一个捕获）查找。
- 每个模式有一秒时间；回溯时间超过该限制的模式会被停止。
- 无效的模式会抛出错误。

---

## Lua 模式

模式看起来像正则表达式，但更简单。以下是最常用的部分：

| 模式               | 匹配                                                          |
|--------------------|--------------------------------------------------------------|
| `.`                | 任意字符                                                      |
| `%a`               | 一个字母                                                      |
| `%d`               | 一个数字                                                      |
| `%s`               | 一个空白字符                                                  |
| `%w`               | 一个字母或数字                                                |
| `%l` / `%u`        | 小写 / 大写字母                                               |
| `%x`               | 一个十六进制数字                                              |
| `%p`               | 标点                                                          |
| `%c`               | 一个控制字符                                                  |
| `%%`               | 字面 `%`                                                      |
| `[abc]` / `[^abc]` | 所列字符中的任意一个 / 都不匹配                               |
| `[a-z]`            | 范围内的一个字符                                              |
| `*`, `+`, `-`, `?` | 零次或多次、一次或多次、零次或多次（最短）、可选              |
| `^`, `$`           | 主体的开头 / 结尾                                             |
| `( )`              | 一个捕获                                                      |
| `%1` … `%9`        | 对先前捕获的反向引用                                          |
| `%` + 魔法字符     | 字面字符，例如 `%.` 或 `%-`                                   |

```lua
print(("2026-10-30"):match("(%d+)-(%d+)-(%d+)"))   -- 2026   10   30
print(("  hi  "):gsub("^%s+", ""):gsub("%s+$", "")) -- hi
```
