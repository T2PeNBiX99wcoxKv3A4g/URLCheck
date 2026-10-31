# `table` — テーブル関数

Lua のテーブル用ヘルパーです。Lua 5.2 には `table.move` や `table.maxn` はありません。`unpack` は
ここにあります（`_G` ではありません）。

| 関数           | 目的                                        |
|----------------|---------------------------------------------|
| `table.concat` | リストを文字列に結合                        |
| `table.insert` | 指定位置に値を挿入                          |
| `table.pack`   | 引数をテーブルにまとめる                    |
| `table.remove` | 指定位置の値を削除                          |
| `table.sort`   | リストをその場で並べ替え                    |
| `table.unpack` | リストの要素を複数の値として返す            |

---

## `table.concat(list [, sep [, i [, j]]])`

`list[i]` から `list[j]` までを 1 つの文字列に結合し、`sep`（既定値 `""`）で区切ります。要素は文字列
または数値である必要があります。`i` の既定値は `1`、`j` の既定値は `#list` です。

```lua
print(table.concat({ "a", "b", "c" }, "-"))    -- a-b-c
print(table.concat({ "a", "b", "c" }, "-", 2)) -- b-c
```

## `table.insert(list [, pos], value)`

`value` を `list` に挿入します。`pos` を指定すると、現在 `pos` にある要素の前に挿入され、それ以降の
要素は後ろへ移動します。`pos` を指定しない場合は末尾に追加されます。

```lua
local names = { "a", "c" }
table.insert(names, "b")        -- { "a", "c", "b" }
table.insert(names, 2, "x")     -- { "a", "x", "c", "b" }
```

## `table.pack(...)`

引数を `1..n` に持つ新しいテーブルを返します。さらに、個数を保持する `n` フィールドも付きます。
これには末尾の `nil` も含まれ、`#` では見えません。

```lua
local packed = table.pack(1, nil, 3)
print(packed.n)                 -- 3
```

## `table.remove(list [, pos])`

`pos` にある要素を削除して返します。`pos` の既定値は `#list`（最後の要素）です。それ以降の要素は
前へ移動します。

```lua
local names = { "a", "b", "c" }
print(table.remove(names))      -- c
print(table.remove(names, 1))   -- a
```

## `table.sort(list [, comp])`

`list` をその場で並べ替えます。既定では昇順です。`comp(a, b)` は、`a` が `b` より前に来るべき場合に
true を返す必要があります。

```lua
local numbers = { 3, 1, 2 }
table.sort(numbers)                                   -- 1, 2, 3
table.sort(numbers, function(a, b) return a > b end)  -- 3, 2, 1
```

## `table.unpack(list [, i [, j]])`

`list[i]` から `list[j]` までを複数の値として返します。`i` の既定値は `1`、`j` の既定値は `#list`
です。

```lua
print(table.unpack({ 1, 2, 3 }))        -- 1   2   3
local a, b = table.unpack({ 10, 20 })   -- a = 10, b = 20
```

`table.unpack` は Lua 5.1 のグローバル `unpack` を置き換えるもので、ここでは利用できません。
