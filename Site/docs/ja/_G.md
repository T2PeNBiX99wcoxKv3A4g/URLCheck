# `_G` — 基本ライブラリ

基本ライブラリは `_G` としても、名前で直接（`type(...)`、`pairs(...)` など）も利用できます。
`_G` は通常のテーブルであるため、`_G["type"]` と `type` は同じ関数です。

`dofile`、`loadfile`、`require` はサンドボックスから **削除** されており、`print` は URLCheck 独自の
バージョンに置き換えられています（後述）。

| 名前                                                                                                                                                                                                                   | 種類     |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `_G`                                                                                                                                                                                                                   | table    |
| `_VERSION`                                                                                                                                                                                                             | string   |
| `assert`, `collectgarbage`, `error`, `getmetatable`, `ipairs`, `load`, `next`, `pairs`, `pcall`, `print`, `rawequal`, `rawget`, `rawlen`, `rawset`, `select`, `setmetatable`, `tonumber`, `tostring`, `type`, `xpcall` | function |

---

## `assert(v [, message])`

`v` が `nil` でも `false` でもない場合、すべての引数を返します。そうでなければ `message`
（既定値: `"assertion failed!"`）を伴うエラーを発生させます。

```lua
local value = assert(tonumber(u.query["page"]), "page must be a number")
```

すべての引数を返すため、インラインでよく使われます: `local name = assert(u.query["name"])`。

## `collectgarbage([opt [, arg]])`

互換性のために受け付けられています。URLCheck では何もせず、何も返さないため、呼び出す意味は
ありません。

## `error(message [, level])`

`message` を伴うエラーを発生させます。`level` は位置のプレフィックスを制御します。

- `1`（既定） — 呼び出し元の位置をエラーのプレフィックスとして付けます。
- `0` — 位置を付けず、メッセージのみ。

発生したエラーはその URL に対するスクリプトを停止します。URL は変更されず、メッセージはログに
記録されます。

```lua
error("unexpected host: " .. u.host)
```

## `getmetatable(value)`

`value` のメタテーブル、または `nil` を返します。メタテーブルに `__metatable` フィールドがある
場合は、その値が代わりに返されます（実際のメタテーブルは保護されています）。

## `ipairs(t)`

`t[1], t[2], …` をたどるイテレーターを返し、最初の `nil` で停止します。これはリストを走査する
通常の方法です。

```lua
for index, value in ipairs({ "a", "b" }) do
    print(index, value)
end
```

## `load(chunk [, chunkname [, mode [, env]]])`

**文字列** をコンパイルして関数を返すか、`nil` とエラー メッセージを返します。文字列のチャンク
のみがサポートされます（リーダー関数は不可）。`env` はコンパイルされたチャンクの環境を設定します。

```lua
local add = load("return 1 + 1")
print(add())                          -- 2

local f = load("return x", "chunk", "t", { x = 9 })
print(f())                            -- 9
```

## `next(t [, key])`

`key` の次のキーと値を返し、テーブルの最後まで到達したら `nil` を返します。`next(t)` は最初の
ペアから始まります。これは `pairs` の基盤となるプリミティブです。通常のコードでは `pairs` を
使ってください。

## `pairs(t)`

すべてのキーを反復するために、`next`、テーブル、`nil` を返します。

```lua
for name, value in pairs(u.query) do
    print(name, value)
end
```

順序は不定です。テーブルに `__pairs` メタメソッドがある場合は、それが代わりに使われます。

## `pcall(f, ...)`

`f` を保護モードで呼び出します。成功した場合は `true` と結果を、エラーが発生した場合は `false` と
エラーを返します。

```lua
local ok, result = pcall(tonumber, u.query["page"])
```

## `print(...)`

URLCheck は Lua の `print` を置き換えています。

- Scripts ページの **Lua ログ** に 1 行書き込みます。コンソールにもポップアップにも書き込みません。
- 引数はタブで区切られます。
- テーブルはアドレスを表示する代わりに展開されます:
  `{ a = 1, b = "two", c = { [2] = 3, d = true } }`。テーブル内の文字列は引用符で囲まれ、
  エスケープされます。自身を含むテーブルは `{...}` として表示され、ネストは 6 階層で停止します。
- 各行にはスクリプトのファイル名が付きます。

```lua
print("host:", u.host)
print("query:", u.query)
```

## `rawequal(a, b)`

`__eq` を呼び出さずに 2 つの値を比較します。

## `rawget(t, k)`

`__index` を呼び出さずに `t[k]` を返します。

## `rawlen(v)`

`__len` を呼び出さずにテーブルまたは文字列の長さを返します。

## `rawset(t, k, v)`

`__newindex` を呼び出さずに `t[k] = v` を設定し、`t` を返します。

## `select(index, ...)`

- `select(n, ...)` は `n` 以降のすべての引数を返します（負の `n` は末尾から数えます）。
- `select("#", ...)` は引数の個数を返します。

```lua
print(select("#", 1, nil, 3))     -- 3
print(select(2, "a", "b", "c"))   -- b   c
```

## `setmetatable(t, mt)`

`t` のメタテーブルを設定し、`t` を返します。既存のメタテーブルが `__metatable` で保護されている
場合はエラーを発生させます。

```lua
local t = setmetatable({}, { __index = function() return 0 end })
print(t.missing)                  -- 0
```

## `tonumber(v [, base])`

`v` を数値に変換するか、変換できない場合は `nil` を返します。`base`（2〜36）を指定する場合、
値は文字列である必要があり、その基数で解析されます。

```lua
print(tonumber("42"))             -- 42
print(tonumber("ff", 16))         -- 255
print(tonumber("0x10"))           -- 16
```

## `tostring(v)`

`v` の文字列表現を返します。値に `__tostring` がある場合はそれを呼び出します。

## `type(v)`

`"nil"`、`"boolean"`、`"number"`、`"string"`、`"table"`、`"function"`、`"thread"`、`"userdata"` の
いずれかを返します。

```lua
if type(u.query["page"]) == "string" then
    print("page is text:", u.query["page"])
end
```

## `xpcall(f, msgh [, ...])`

`pcall` に似ていますが、スタックが巻き戻される前に `msgh(error)` を呼び出し、追加の引数を `f` に
渡します（Lua 5.2）。`true` と結果、または `false` と `msgh` が返した値を返します。

```lua
local ok, message = xpcall(function(a) return a * 2 end, function(e) return e end, 21)
```

---

## `_G`

グローバル テーブルそのもの。上記のすべての関数、標準ライブラリ、スクリプトが作成したグローバルは
ここに存在します。

LuaCSharp は `_G` に内部値を 1 つ残します（`__lua_mathematics_library_random_instance`）。これは
無視してください。

## `_VERSION`

インタープリターのバージョン: `"Lua 5.2"`。

## 利用できないもの

`dofile`、`loadfile`、`require`、`module`、`unpack`（`table.unpack` を使用）、`gcinfo`、`newproxy`。
