# `string` — 字串函式

Lua 的字串函式庫。每個函式也可以用方法的形式在字串上呼叫，因此 `s:upper()` 與
`string.upper(s)` 相同。

`find`、`match`、`gsub` 與 `gmatch` 使用 **Lua 模式**（速查表在頁尾）。
`regex*` 系列的函式則接受 **.NET 正規表示式**，支援交替、重複次數以及其餘常見的
regex 語法。

| 函式                            | 用途                           |
|---------------------------------|--------------------------------|
| `string.byte`                   | 子字串的字元碼                 |
| `string.char`                   | 由字元碼組成字串               |
| `string.dump`                   | 不支援（見下文）               |
| `string.find`                   | 尋找模式                       |
| `string.format`                 | 建立格式化的字串               |
| `string.gmatch`                 | 迭代所有符合項目               |
| `string.gsub`                   | 取代符合項目                   |
| `string.len`                    | 以位元組計算長度               |
| `string.lower` / `string.upper` | 轉換大小寫                     |
| `string.match`                  | 取出擷取群組                   |
| `string.regexMatch`             | .NET regex 比對                |
| `string.regexFind`              | .NET regex 尋找                |
| `string.regexGsub`              | .NET regex 取代                |
| `string.regexGmatch`            | .NET regex 迭代器              |
| `string.regexSplit`             | .NET regex 分割                |
| `string.rep`                    | 重複字串                       |
| `string.reverse`                | 反轉字串                       |
| `string.split`                  | 將字串分割成清單               |
| `string.sub`                    | 取出子字串                     |

Lua 5.2 沒有 `string.pack`、`string.unpack` 或 `string.packsize`（那些是 5.3+）。

---

## `string.byte(s [, i [, j]])`

回傳 `s` 從位置 `i` 到 `j` 的數值位元組值。`i` 預設為 `1`，`j` 預設為 `i`。
負數位置從尾端算起。

```lua
print(string.byte("A"))          -- 65
print(string.byte("ABC", 1, 3))  -- 65   66   67
```

## `string.char(...)`

回傳由給定位元組值組成的字串。

```lua
print(string.char(65, 66, 67))   -- ABC
```

## `string.dump(function)`

函式庫中存在，但 URLCheck 的 Lua 實作**不支援**：呼叫它會引發
`stirng.dump is not supported`。請勿使用。

## `string.find(s, pattern [, init [, plain]])`

在 `s` 中尋找 `pattern` 的第一個符合項目，從 `init` 開始（預設 `1`）。回傳開始與結束
位置，以及任何擷取群組；沒有符合項目時回傳 `nil`。當 `plain = true` 時，
模式會以字面方式比對。

```lua
print(string.find("hello world", "wor"))          -- 7   9
print(string.find("a.b", ".", 1, true))           -- 2   2
```

## `string.format(formatstring, ...)`

依 `printf` 風格的格式建立字串。常見的指定符：`%s`（字串）、`%d`/`%i`（整數）、
`%f`（定點）、`%e`/`%g`（科學記號／最短表示）、`%x`/`%X`（十六進位）、`%o`（八進位）、
`%c`（字元）、`%q`（加引號並轉義的字串）以及 `%%`（字面的 `%`）。

```lua
print(string.format("%s=%d (%.2f)", "page", 3, 1.5))   -- page=3 (1.50)
print(string.format("%q", 'a "quoted" line'))          -- "a \"quoted\" line"
```

## `string.gmatch(s, pattern)`

回傳對 `s` 中每個 `pattern` 符合項目的迭代器。擷取群組會以個別的值回傳。

```lua
for name, value in string.gmatch("a=1&b=2", "([^&=]+)=([^&]*)") do
    print(name, value)
end
```

## `string.gsub(s, pattern, repl [, n])`

取代 `s` 中 `pattern` 的符合項目，並回傳新字串與取代次數。`repl` 可以是：

- 一個**字串**（`%1`、`%2`、… 會插入擷取群組；`%0` 會插入整個符合項目），
- 一個 **table**（以第一個擷取群組查找），
- 一個**函式**（以擷取群組呼叫；回傳 `nil` 以保留該符合項目）。

`n` 限制最多進行幾次取代。

```lua
print(string.gsub("hello world", "o", "0"))            -- hell0 w0rld   2
print(string.gsub("a=1", "(%w+)=(%w+)", "%2=%1"))      -- 1=a   1
print(string.gsub("a b", "%s", function() return "_" end))
```

## `string.len(s)`

回傳 `s` 以位元組計的長度。`#` 運算子的作用相同。

```lua
print(string.len("abc"))         -- 3
```

## `string.lower(s)` / `string.upper(s)`

回傳將所有字母轉為小寫或大寫的 `s`。

```lua
print(("HeLLo"):lower())         -- hello
print(("hello"):upper())         -- HELLO
```

## `string.match(s, pattern [, init])`

回傳 `s` 中 `pattern` 第一個符合項目的擷取群組；若模式沒有擷取群組，則回傳整個符合項目。
沒有符合項目時回傳 `nil`。`init` 設定起始位置。

```lua
print(string.match("page=42", "page=(%d+)"))   -- 42
print(string.match("abc", "b"))                -- b
```

## `string.rep(s, n [, sep])`

回傳重複 `n` 次的 `s`，各份之間以 `sep` 分隔。

```lua
print(string.rep("ab", 3))        -- ababab
print(string.rep("ab", 3, "-"))   -- ab-ab-ab
```

## `string.reverse(s)`

回傳位元組順序反轉的 `s`。

```lua
print(string.reverse("abc"))      -- cba
```

## `string.sub(s, i [, j])`

回傳 `s` 從 `i` 到 `j` 的子字串。`j` 預設為 `-1`（結尾）；負數位置從尾端算起。

```lua
print(string.sub("hello", 2, 4))  -- ell
print(string.sub("hello", -3))    -- llo
```

## `string.split(s [, sep])`

以字面字串 `sep` 分割 `s`，並將各部分以清單（table）回傳。若沒有 `sep` —
或它為空字串 — 則以空白分割並丟棄空的部分。分隔符是字面的；
需要模式時請使用 `string.gmatch`。

```lua
print(table.concat(("a,b,c"):split(","), "|"))   -- a|b|c
print(table.concat(("a,,b"):split(","), "|"))    -- a||b
print(table.concat(("  a  b "):split(), "|"))    -- a|b
```

## 字串 metatable 擴充

URLCheck 在標準字串 metatable 之上加了兩項便利功能。其餘一切 — 例如
`s:sub(1, 1)` 與 `s:upper()` 之類的方法、`..` 運算子、`#s` — 都與以往完全相同。

**索引。** `s[i]` 回傳位置 `i` 的字元，與 `string.sub(s, i, i)` 相同。
負數位置從尾端算起，超出範圍則為 `nil`：

```lua
local s = "abc"
print(s[1], s[3], s[-1], s[4])   -- a   c   c   nil
```

**`+` 串接。** 當一般算術無法進行時，`a + b` 會進行串接：`"a" + "b"` 是 `"ab"`，
而 `"a" + 1` 是 `"a1"`。

```lua
print("hello" + " " + "world")   -- hello world
```

有一個注意事項：Lua 的字串轉數字強制轉換仍會優先發生，因此 `"1" + "2"` 是 `3`，而非 `"12"`。
當你確實想要串接時，請使用 `..`（或非數字字串）。

## Regex 函式

Lua 模式有所限制 — 沒有交替，也沒有 `{2,4}` 次數。這些函式改為接受 **.NET 正規表示式**，
其餘形狀則與對應的 Lua 函式相同。模式可以寫成一般字串（`"\\d+"`）或長字串（`[[\d+]]`），
後者可避免轉義。

| 函式 | 類似 | 作用 |
| --- | --- | --- |
| `string.regexMatch(s, pattern [, init])` | `string.match` | 擷取群組，或整個符合項目 |
| `string.regexFind(s, pattern [, init])` | `string.find` | 開始與結束位置，然後是擷取群組 |
| `string.regexGsub(s, pattern, repl [, n])` | `string.gsub` | 取代符合項目 |
| `string.regexGmatch(s, pattern)` | `string.gmatch` | 對符合項目的迭代器 |
| `string.regexSplit(s, pattern)` | — | 分割成清單 |

```lua
("2026-10-30"):regexMatch("(\\d+)-(\\d+)-(\\d+)")   -- 2026   10   30
("cat"):regexMatch("^(cat|dog)$")                  -- cat
("a1b22"):regexGsub("\\d+", "<$0>")                -- a<1>b<22>   2
("a1b22"):regexGsub("\\d+", { ["1"] = "one" })     -- aoneb22     2
("a, b ,c"):regexSplit("\\s*,\\s*")                -- { "a", "b", "c" }
```

- `init` 從 1 開始計數，負數時從尾端算起，與 `string.find` 相同。
- 取代字串使用 .NET 語法：`$0` 是整個符合項目、`$1` 是群組、`${name}` 是具名
  群組。table 形式的取代會以整個符合項目（或第一個擷取群組）查找。
- 每個模式有一秒鐘的時間；回溯超過該時間的模式會被中止。
- 無效的模式會引發錯誤。

---

## Lua 模式

模式的樣子和正規表示式很像，但更簡單。以下是你最常用到的部分：

| 模式               | 符合                                                         |
|--------------------|--------------------------------------------------------------|
| `.`                | 任何字元                                                     |
| `%a`               | 一個字母                                                     |
| `%d`               | 一個數字                                                     |
| `%s`               | 一個空白字元                                                 |
| `%w`               | 一個字母或數字                                               |
| `%l` / `%u`        | 小寫／大寫字母                                               |
| `%x`               | 一個十六進位數字                                             |
| `%p`               | 標點符號                                                     |
| `%c`               | 一個控制字元                                                 |
| `%%`               | 字面的 `%`                                                   |
| `[abc]` / `[^abc]` | 所列字元中的任一個／皆非所列字元                             |
| `[a-z]`            | 範圍內的一個字元                                             |
| `*`, `+`, `-`, `?` | 零或更多、一或更多、零或更多（最短）、可有可無               |
| `^`, `$`           | 目標字串的開頭／結尾                                         |
| `( )`              | 一個擷取群組                                                 |
| `%1` … `%9`        | 對先前擷取群組的反向參照                                     |
| `%` + 特殊字元     | 該字元本身，例如 `%.` 或 `%-`                                |

```lua
print(("2026-10-30"):match("(%d+)-(%d+)-(%d+)"))   -- 2026   10   30
print(("  hi  "):gsub("^%s+", ""):gsub("%s+$", "")) -- hi
```
