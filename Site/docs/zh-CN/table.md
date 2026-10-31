# `table` —— 表函数

用于 Lua 表的辅助函数。Lua 5.2 没有 `table.move` 或 `table.maxn`；`unpack` 位于这里（不在
`_G` 中）。

| 函数           | 用途                              |
|----------------|-----------------------------------|
| `table.concat` | 把列表连接成字符串                |
| `table.insert` | 在某个位置插入值                  |
| `table.pack`   | 把参数收集到表中                  |
| `table.remove` | 移除某个位置的值                  |
| `table.sort`   | 就地排序列表                      |
| `table.unpack` | 把列表元素作为多个值返回          |

---

## `table.concat(list [, sep [, i [, j]]])`

把 `list[i]` 到 `list[j]` 连接成一个字符串，以 `sep` 分隔（默认 `""`）。元素
必须是字符串或数字。`i` 默认为 `1`，`j` 默认为 `#list`。

```lua
print(table.concat({ "a", "b", "c" }, "-"))    -- a-b-c
print(table.concat({ "a", "b", "c" }, "-", 2)) -- b-c
```

## `table.insert(list [, pos], value)`

把 `value` 插入 `list`。带 `pos` 时插入到当前位于 `pos` 的元素之前，
其后的元素依次后移；不带 `pos` 时追加到末尾。

```lua
local names = { "a", "c" }
table.insert(names, "b")        -- { "a", "c", "b" }
table.insert(names, 2, "x")     -- { "a", "x", "c", "b" }
```

## `table.pack(...)`

返回一张新表，参数放在 `1..n`，另有一个字段 `n` 保存数量 —— 包括
末尾的 `nil`，那是 `#` 看不到的。

```lua
local packed = table.pack(1, nil, 3)
print(packed.n)                 -- 3
```

## `table.remove(list [, pos])`

移除 `pos` 处的元素并返回它。`pos` 默认为 `#list`（最后一个元素）。
其后的元素依次前移。

```lua
local names = { "a", "b", "c" }
print(table.remove(names))      -- c
print(table.remove(names, 1))   -- a
```

## `table.sort(list [, comp])`

就地排序 `list`，默认升序。当 `a` 应排在 `b` 之前时，`comp(a, b)` 必须返回 true。

```lua
local numbers = { 3, 1, 2 }
table.sort(numbers)                                   -- 1, 2, 3
table.sort(numbers, function(a, b) return a > b end)  -- 3, 2, 1
```

## `table.unpack(list [, i [, j]])`

把 `list[i]` 到 `list[j]` 作为多个值返回。`i` 默认为 `1`，`j` 默认为 `#list`。

```lua
print(table.unpack({ 1, 2, 3 }))        -- 1   2   3
local a, b = table.unpack({ 10, 20 })   -- a = 10, b = 20
```

`table.unpack` 取代了 Lua 5.1 的全局 `unpack`，后者在这里不可用。
