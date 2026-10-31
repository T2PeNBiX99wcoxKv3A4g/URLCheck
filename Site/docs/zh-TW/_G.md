# `_G` — 基礎函式庫

基礎函式庫同時可以透過 `_G` 以及直接以名稱使用（`type(...)`、`pairs(...)`、…）。
`_G` 是一般的 table，所以 `_G["type"]` 與 `type` 是同一個函式。

`dofile`、`loadfile` 與 `require` 已從沙箱中**移除**，而 `print` 則被 URLCheck 自己的版本取代
（見下文）。

| 名稱                                                                                                                                                                                                                   | 種類     |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `_G`                                                                                                                                                                                                                   | table    |
| `_VERSION`                                                                                                                                                                                                             | string   |
| `assert`, `collectgarbage`, `error`, `getmetatable`, `ipairs`, `load`, `next`, `pairs`, `pcall`, `print`, `rawequal`, `rawget`, `rawlen`, `rawset`, `select`, `setmetatable`, `tonumber`, `tostring`, `type`, `xpcall` | function |

---

## `assert(v [, message])`

當 `v` 既不是 `nil` 也不是 `false` 時，回傳它的所有引數。否則會以 `message` 引發錯誤
（預設為 `"assertion failed!"`）。

```lua
local value = assert(tonumber(u.query["page"]), "page must be a number")
```

由於它會回傳每個引數，因此常被直接內嵌使用：`local name = assert(u.query["name"])`。

## `collectgarbage([opt [, arg]])`

為了相容性而接受。在 URLCheck 中它什麼也不做、也不回傳任何東西，因此呼叫它沒有意義。

## `error(message [, level])`

以 `message` 引發錯誤。`level` 控制位置前綴：

- `1`（預設）— 在錯誤前加上呼叫者的位置。
- `0` — 不加位置，只有訊息。

引發的錯誤會中止該 URL 的腳本；該 URL 保持不變，訊息則會寫入日誌。

```lua
error("unexpected host: " .. u.host)
```

## `getmetatable(value)`

回傳 `value` 的 metatable，或 `nil`。若該 metatable 有 `__metatable` 欄位，
則改為回傳該值（真正的 metatable 受到保護）。

## `ipairs(t)`

回傳對 `t[1], t[2], …` 的迭代器，並在第一個 `nil` 處停止。這是走訪清單的常用方式：

```lua
for index, value in ipairs({ "a", "b" }) do
    print(index, value)
end
```

## `load(chunk [, chunkname [, mode [, env]]])`

編譯一個**字串**並回傳函式，或回傳 `nil` 加上錯誤訊息。僅支援字串形式的 chunk
（不支援 reader 函式）。`env` 設定編譯後 chunk 的環境。

```lua
local add = load("return 1 + 1")
print(add())                          -- 2

local f = load("return x", "chunk", "t", { x = 9 })
print(f())                            -- 9
```

## `next(t [, key])`

回傳 `key` 之後的下一個鍵與值，或在 table 走訪完畢時回傳 `nil`。`next(t)` 從第一對開始。
這是 `pairs` 背後的原始操作；一般程式碼請使用 `pairs`。

## `pairs(t)`

回傳 `next`、該 table 與 `nil`，用於迭代每個鍵：

```lua
for name, value in pairs(u.query) do
    print(name, value)
end
```

順序並未指定。若該 table 有 `__pairs` metamethod，則改用該方法。

## `pcall(f, ...)`

以受保護模式呼叫 `f`。成功時回傳 `true` 加上結果，引發錯誤時回傳 `false` 加上錯誤。

```lua
local ok, result = pcall(tonumber, u.query["page"])
```

## `print(...)`

URLCheck 取代了 Lua 的 `print`：

- 它會在腳本頁面的 **Lua 日誌**寫入一行 — 不會寫到主控台，也不會寫到彈窗。
- 引數以 tab 分隔。
- table 會被展開，而不是印出位址：
  `{ a = 1, b = "two", c = { [2] = 3, d = true } }`。table 內的字串會加上引號並
  轉義；包含自身的 table 會印成 `{...}`，
  且巢狀超過六層後即停止。
- 每一行都會標上腳本的檔案名稱。

```lua
print("host:", u.host)
print("query:", u.query)
```

## `rawequal(a, b)`

比較兩個值，但不呼叫 `__eq`。

## `rawget(t, k)`

回傳 `t[k]`，但不呼叫 `__index`。

## `rawlen(v)`

回傳 table 或字串的長度，但不呼叫 `__len`。

## `rawset(t, k, v)`

設定 `t[k] = v`，但不呼叫 `__newindex`，並回傳 `t`。

## `select(index, ...)`

- `select(n, ...)` 回傳從第 `n` 個開始的所有引數（負數 `n` 從尾端算起）。
- `select("#", ...)` 回傳引數的數量。

```lua
print(select("#", 1, nil, 3))     -- 3
print(select(2, "a", "b", "c"))   -- b   c
```

## `setmetatable(t, mt)`

設定 `t` 的 metatable 並回傳 `t`。若既有的 metatable 受 `__metatable` 保護，則引發錯誤。

```lua
local t = setmetatable({}, { __index = function() return 0 end })
print(t.missing)                  -- 0
```

## `tonumber(v [, base])`

將 `v` 轉換為數字，無法轉換時回傳 `nil`。若指定 `base`（2–36），該值必須是字串，
並會以該進位制解析。

```lua
print(tonumber("42"))             -- 42
print(tonumber("ff", 16))         -- 255
print(tonumber("0x10"))           -- 16
```

## `tostring(v)`

回傳 `v` 的字串表示；若該值有 `__tostring` 則會呼叫它。

## `type(v)`

回傳 `"nil"`、`"boolean"`、`"number"`、`"string"`、`"table"`、`"function"`、`"thread"` 或
`"userdata"` 其中之一。

```lua
if type(u.query["page"]) == "string" then
    print("page is text:", u.query["page"])
end
```

## `xpcall(f, msgh [, ...])`

類似 `pcall`，但在堆疊展開前會先呼叫 `msgh(error)`，並將額外的引數傳給
`f`（Lua 5.2）。成功時回傳 `true` 加上結果，否則回傳 `false` 加上 `msgh` 回傳的值。

```lua
local ok, message = xpcall(function(a) return a * 2 end, function(e) return e end, 21)
```

---

## `_G`

全域 table 本身。上述每個函式、標準函式庫以及腳本建立的任何全域變數都存放在這裡。

LuaCSharp 會在 `_G` 中留下一個內部值（`__lua_mathematics_library_random_instance`）；忽略它即可。

## `_VERSION`

解譯器版本：`"Lua 5.2"`。

## 無法使用

`dofile`、`loadfile`、`require`、`module`、`unpack`（請改用 `table.unpack`）、`gcinfo`、`newproxy`。
