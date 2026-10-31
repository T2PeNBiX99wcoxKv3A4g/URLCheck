# `table` — table 函式

Lua table 的輔助函式。Lua 5.2 沒有 `table.move` 或 `table.maxn`；`unpack` 位於此處
（而非 `_G`）。

| 函式           | 用途                                   |
|----------------|----------------------------------------|
| `table.concat` | 將清單串接成字串                       |
| `table.insert` | 在指定位置插入值                       |
| `table.pack`   | 將引數收集成一個 table                 |
| `table.remove` | 移除指定位置的值                       |
| `table.sort`   | 就地排序清單                           |
| `table.unpack` | 將清單元素以多個值回傳                 |

---

## `table.concat(list [, sep [, i [, j]]])`

將 `list[i]` 到 `list[j]` 串接成一個字串，以 `sep` 分隔（預設 `""`）。元素
必須是字串或數字。`i` 預設為 `1`，`j` 預設為 `#list`。

```lua
print(table.concat({ "a", "b", "c" }, "-"))    -- a-b-c
print(table.concat({ "a", "b", "c" }, "-", 2)) -- b-c
```

## `table.insert(list [, pos], value)`

將 `value` 插入 `list`。有 `pos` 時，它會插入目前位於 `pos` 的元素之前，
之後的元素全部往後移；沒有 `pos` 時則附加在尾端。

```lua
local names = { "a", "c" }
table.insert(names, "b")        -- { "a", "c", "b" }
table.insert(names, 2, "x")     -- { "a", "x", "c", "b" }
```

## `table.pack(...)`

回傳一個新 table，引數位於 `1..n`，另有一個欄位 `n` 存放數量 — 包括
`#` 看不到的尾端 `nil`。

```lua
local packed = table.pack(1, nil, 3)
print(packed.n)                 -- 3
```

## `table.remove(list [, pos])`

移除位於 `pos` 的元素並回傳它。`pos` 預設為 `#list`（最後一個元素）。
之後的元素會往前移。

```lua
local names = { "a", "b", "c" }
print(table.remove(names))      -- c
print(table.remove(names, 1))   -- a
```

## `table.sort(list [, comp])`

就地排序 `list`，預設為遞增。當 `a` 應排在 `b` 之前時，`comp(a, b)` 必須回傳 true。

```lua
local numbers = { 3, 1, 2 }
table.sort(numbers)                                   -- 1, 2, 3
table.sort(numbers, function(a, b) return a > b end)  -- 3, 2, 1
```

## `table.unpack(list [, i [, j]])`

將 `list[i]` 到 `list[j]` 以多個值回傳。`i` 預設為 `1`，`j` 預設為 `#list`。

```lua
print(table.unpack({ 1, 2, 3 }))        -- 1   2   3
local a, b = table.unpack({ 10, 20 })   -- a = 10, b = 20
```

`table.unpack` 取代了 Lua 5.1 的全域 `unpack`，後者在此無法使用。
