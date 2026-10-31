# `table` — table functions

Helpers for Lua tables. Lua 5.2 has no `table.move` or `table.maxn`; `unpack` lives here (not in
`_G`).

| Function       | Purpose                                     |
|----------------|---------------------------------------------|
| `table.concat` | Join a list into a string                   |
| `table.insert` | Insert a value at a position                |
| `table.pack`   | Collect arguments into a table              |
| `table.remove` | Remove a value at a position                |
| `table.sort`   | Sort a list in place                        |
| `table.unpack` | Return a list's elements as multiple values |

---

## `table.concat(list [, sep [, i [, j]]])`

Joins `list[i]` through `list[j]` into one string, separated by `sep` (default `""`). The elements
must be strings or numbers. `i` defaults to `1`, `j` to `#list`.

```lua
print(table.concat({ "a", "b", "c" }, "-"))    -- a-b-c
print(table.concat({ "a", "b", "c" }, "-", 2)) -- b-c
```

## `table.insert(list [, pos], value)`

Inserts `value` into `list`. With `pos` it is inserted before the element currently at `pos` and
everything after it moves up; without `pos` it is appended.

```lua
local names = { "a", "c" }
table.insert(names, "b")        -- { "a", "c", "b" }
table.insert(names, 2, "x")     -- { "a", "x", "c", "b" }
```

## `table.pack(...)`

Returns a new table with the arguments at `1..n`, plus a field `n` holding the count — including
trailing `nil`s, which `#` cannot see.

```lua
local packed = table.pack(1, nil, 3)
print(packed.n)                 -- 3
```

## `table.remove(list [, pos])`

Removes the element at `pos` and returns it. `pos` defaults to `#list` (the last element). The
elements after it move down.

```lua
local names = { "a", "b", "c" }
print(table.remove(names))      -- c
print(table.remove(names, 1))   -- a
```

## `table.sort(list [, comp])`

Sorts `list` in place, ascending by default. `comp(a, b)` must return true when `a` should come
before `b`.

```lua
local numbers = { 3, 1, 2 }
table.sort(numbers)                                   -- 1, 2, 3
table.sort(numbers, function(a, b) return a > b end)  -- 3, 2, 1
```

## `table.unpack(list [, i [, j]])`

Returns `list[i]` through `list[j]` as multiple values. `i` defaults to `1`, `j` to `#list`.

```lua
print(table.unpack({ 1, 2, 3 }))        -- 1   2   3
local a, b = table.unpack({ 10, 20 })   -- a = 10, b = 20
```

`table.unpack` replaces the global `unpack` of Lua 5.1, which is not available here.
