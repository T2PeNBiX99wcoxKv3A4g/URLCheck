# `string` — 文字列関数

Lua の文字列ライブラリです。すべての関数は文字列のメソッドとしても呼び出せるため、`s:upper()` は
`string.upper(s)` と同じです。

`find`、`match`、`gsub`、`gmatch` は **Lua パターン** を使います（チートシートは末尾）。`regex*` 系の
関数は代わりに **.NET 正規表現** を受け取り、選択、繰り返し回数、その他の通常の正規表現構文を
サポートします。

| 関数                            | 目的                            |
|---------------------------------|---------------------------------|
| `string.byte`                   | 部分文字列の文字コード          |
| `string.char`                   | 文字コードから文字列を作成      |
| `string.dump`                   | 非サポート（後述）              |
| `string.find`                   | パターンを検索                  |
| `string.format`                 | 書式設定された文字列を構築      |
| `string.gmatch`                 | すべてのマッチを反復            |
| `string.gsub`                   | マッチを置換                    |
| `string.len`                    | バイト単位の長さ                |
| `string.lower` / `string.upper` | 大文字小文字の変換              |
| `string.match`                  | キャプチャを抽出                |
| `string.regexMatch`             | .NET 正規表現のマッチ           |
| `string.regexFind`              | .NET 正規表現の検索             |
| `string.regexGsub`              | .NET 正規表現の置換             |
| `string.regexGmatch`            | .NET 正規表現のイテレーター     |
| `string.regexSplit`             | .NET 正規表現による分割         |
| `string.rep`                    | 文字列を繰り返す                |
| `string.reverse`                | 文字列を逆順にする              |
| `string.split`                  | 文字列をリストに分割            |
| `string.sub`                    | 部分文字列を抽出                |

Lua 5.2 には `string.pack`、`string.unpack`、`string.packsize` はありません（これらは 5.3 以降）。

---

## `string.byte(s [, i [, j]])`

`s` の位置 `i` から `j` までの数値バイト値を返します。`i` の既定値は `1`、`j` の既定値は `i` です。
負の位置は末尾から数えます。

```lua
print(string.byte("A"))          -- 65
print(string.byte("ABC", 1, 3))  -- 65   66   67
```

## `string.char(...)`

指定されたバイト値から作られた文字列を返します。

```lua
print(string.char(65, 66, 67))   -- ABC
```

## `string.dump(function)`

ライブラリには存在しますが、URLCheck の Lua 実装では **サポートされていません**。呼び出すと
`stirng.dump is not supported` が発生します。使用しないでください。

## `string.find(s, pattern [, init [, plain]])`

`s` 内で `pattern` の最初のマッチを、`init`（既定値 `1`）から検索します。開始位置と終了位置、および
キャプチャを返します。マッチがない場合は `nil` を返します。`plain = true` の場合、パターンは
リテラルとしてマッチされます。

```lua
print(string.find("hello world", "wor"))          -- 7   9
print(string.find("a.b", ".", 1, true))           -- 2   2
```

## `string.format(formatstring, ...)`

`printf` 形式の書式から文字列を構築します。よく使う指定子: `%s`（文字列）、`%d`/`%i`（整数）、
`%f`（固定小数点）、`%e`/`%g`（指数/最短）、`%x`/`%X`（16 進）、`%o`（8 進）、`%c`（文字）、
`%q`（引用符で囲んだエスケープ済み文字列）、`%%`（リテラルの `%`）。

```lua
print(string.format("%s=%d (%.2f)", "page", 3, 1.5))   -- page=3 (1.50)
print(string.format("%q", 'a "quoted" line'))          -- "a \"quoted\" line"
```

## `string.gmatch(s, pattern)`

`s` 内の `pattern` のすべてのマッチを反復するイテレーターを返します。キャプチャは個別の値として
返されます。

```lua
for name, value in string.gmatch("a=1&b=2", "([^&=]+)=([^&]*)") do
    print(name, value)
end
```

## `string.gsub(s, pattern, repl [, n])`

`s` 内の `pattern` のマッチを置換し、新しい文字列と置換回数を返します。`repl` には次を指定できます。

- **文字列**（`%1`、`%2`、… はキャプチャを挿入、`%0` はマッチ全体を挿入）
- **テーブル**（最初のキャプチャで参照）
- **関数**（キャプチャを引数に呼び出され、マッチを保持するには `nil` を返す）

`n` は置換の最大回数を制限します。

```lua
print(string.gsub("hello world", "o", "0"))            -- hell0 w0rld   2
print(string.gsub("a=1", "(%w+)=(%w+)", "%2=%1"))      -- 1=a   1
print(string.gsub("a b", "%s", function() return "_" end))
```

## `string.len(s)`

`s` の長さをバイト単位で返します。`#` 演算子も同じことを行います。

```lua
print(string.len("abc"))         -- 3
```

## `string.lower(s)` / `string.upper(s)`

すべての文字を小文字または大文字に変換した `s` を返します。

```lua
print(("HeLLo"):lower())         -- hello
print(("hello"):upper())         -- HELLO
```

## `string.match(s, pattern [, init])`

`s` 内の `pattern` の最初のマッチのキャプチャを返します。パターンにキャプチャがない場合はマッチ
全体を返します。マッチがない場合は `nil` を返します。`init` は開始位置を設定します。

```lua
print(string.match("page=42", "page=(%d+)"))   -- 42
print(string.match("abc", "b"))                -- b
```

## `string.rep(s, n [, sep])`

`s` を `n` 回繰り返した文字列を返します。コピーの間には `sep` が入ります。

```lua
print(string.rep("ab", 3))        -- ababab
print(string.rep("ab", 3, "-"))   -- ab-ab-ab
```

## `string.reverse(s)`

バイトを逆順にした `s` を返します。

```lua
print(string.reverse("abc"))      -- cba
```

## `string.sub(s, i [, j])`

`s` の `i` から `j` までの部分文字列を返します。`j` の既定値は `-1`（末尾）です。負の位置は末尾から
数えます。

```lua
print(string.sub("hello", 2, 4))  -- ell
print(string.sub("hello", -3))    -- llo
```

## `string.split(s [, sep])`

`s` をリテラル文字列 `sep` で分割し、その部分をリスト（テーブル）として返します。`sep` がない場合、
または空の場合は空白で分割し、空の部分は削除します。区切り文字はリテラルです。パターンが必要な
場合は `string.gmatch` を使ってください。

```lua
print(table.concat(("a,b,c"):split(","), "|"))   -- a|b|c
print(table.concat(("a,,b"):split(","), "|"))    -- a||b
print(table.concat(("  a  b "):split(), "|"))    -- a|b
```

## 文字列メタテーブルの拡張

URLCheck は標準の文字列メタテーブルに 2 つの便利機能を追加します。それ以外 — `s:sub(1, 1)` や
`s:upper()` などのメソッド、`..` 演算子、`#s` — はこれまでどおり動作します。

**インデックス参照。** `s[i]` は位置 `i` の文字を返します。`string.sub(s, i, i)` と同じです。
負の位置は末尾から数え、範囲外のものは `nil` です。

```lua
local s = "abc"
print(s[1], s[3], s[-1], s[4])   -- a   c   c   nil
```

**`+` による連結。** 通常の算術ができない場合、`a + b` は連結します。`"a" + "b"` は `"ab"`、
`"a" + 1` は `"a1"` です。

```lua
print("hello" + " " + "world")   -- hello world
```

1 つ注意点があります。Lua の文字列から数値への強制変換が依然として優先されるため、`"1" + "2"` は
`"12"` ではなく `3` になります。本当に連結したい場合は `..`（または数値でない文字列）を使って
ください。

## 正規表現関数

Lua パターンには限界があります — 選択も `{2,4}` の回数指定もありません。これらの関数は代わりに
**.NET 正規表現** を受け取り、それ以外は Lua の対応する関数と同じ形をしています。パターンは通常の
文字列（`"\\d+"`）または長い文字列（`[[\d+]]`）として書くことができ、後者ならエスケープを避けられます。

| 関数 | 同様のもの | 内容 |
| --- | --- | --- |
| `string.regexMatch(s, pattern [, init])` | `string.match` | キャプチャ、またはマッチ全体 |
| `string.regexFind(s, pattern [, init])` | `string.find` | 開始位置と終了位置、その後にキャプチャ |
| `string.regexGsub(s, pattern, repl [, n])` | `string.gsub` | マッチを置換 |
| `string.regexGmatch(s, pattern)` | `string.gmatch` | マッチを反復するイテレーター |
| `string.regexSplit(s, pattern)` | — | リストに分割 |

```lua
("2026-10-30"):regexMatch("(\\d+)-(\\d+)-(\\d+)")   -- 2026   10   30
("cat"):regexMatch("^(cat|dog)$")                  -- cat
("a1b22"):regexGsub("\\d+", "<$0>")                -- a<1>b<22>   2
("a1b22"):regexGsub("\\d+", { ["1"] = "one" })     -- aoneb22     2
("a, b ,c"):regexSplit("\\s*,\\s*")                -- { "a", "b", "c" }
```

- `init` は 1 始まりで、負の場合は `string.find` と同様に末尾から数えます。
- 置換文字列は .NET の構文を使います。`$0` はマッチ全体、`$1` はグループ、`${name}` は名前付き
  グループです。テーブルによる置換は、マッチ全体（または最初のキャプチャ）で参照されます。
- 各パターンには 1 秒が与えられます。それより長くバックトラックするパターンは停止されます。
- 無効なパターンはエラーを発生させます。

---

## Lua パターン

パターンは正規表現に似ていますが、より単純です。最もよく使う要素は次のとおりです。

| パターン           | マッチするもの                                               |
|--------------------|--------------------------------------------------------------|
| `.`                | 任意の文字                                                   |
| `%a`               | 文字                                                         |
| `%d`               | 数字                                                         |
| `%s`               | 空白文字                                                     |
| `%w`               | 文字または数字                                               |
| `%l` / `%u`        | 小文字 / 大文字の文字                                        |
| `%x`               | 16 進数字                                                    |
| `%p`               | 句読点                                                       |
| `%c`               | 制御文字                                                     |
| `%%`               | リテラルの `%`                                               |
| `[abc]` / `[^abc]` | 列挙した文字のいずれか / いずれでもない                      |
| `[a-z]`            | 範囲内の文字                                                 |
| `*`, `+`, `-`, `?` | 0 回以上、1 回以上、0 回以上（最短）、省略可能               |
| `^`, `$`           | 対象の先頭 / 末尾                                            |
| `( )`              | キャプチャ                                                   |
| `%1` … `%9`        | 以前のキャプチャへの後方参照                                 |
| `%` + マジック文字 | リテラルの文字。たとえば `%.` や `%-`                        |

```lua
print(("2026-10-30"):match("(%d+)-(%d+)-(%d+)"))   -- 2026   10   30
print(("  hi  "):gsub("^%s+", ""):gsub("%s+$", "")) -- hi
```
