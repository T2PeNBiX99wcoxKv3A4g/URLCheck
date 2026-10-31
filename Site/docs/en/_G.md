# `_G` — the base library

The base library is available both as `_G` and directly by name (`type(...)`, `pairs(...)`, …).
`_G` is a normal table, so `_G["type"]` and `type` are the same function.

`dofile`, `loadfile` and `require` are **removed** from the sandbox, and `print` is replaced by
URLCheck's own version (see below).

| Name                                                                                                                                                                                                                   | Kind     |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `_G`                                                                                                                                                                                                                   | table    |
| `_VERSION`                                                                                                                                                                                                             | string   |
| `assert`, `collectgarbage`, `error`, `getmetatable`, `ipairs`, `load`, `next`, `pairs`, `pcall`, `print`, `rawequal`, `rawget`, `rawlen`, `rawset`, `select`, `setmetatable`, `tonumber`, `tostring`, `type`, `xpcall` | function |

---

## `assert(v [, message])`

Returns all of its arguments when `v` is neither `nil` nor `false`. Otherwise it raises an error
with `message` (default: `"assertion failed!"`).

```lua
local value = assert(tonumber(u.query["page"]), "page must be a number")
```

Because it returns every argument, it is often used inline: `local name = assert(u.query["name"])`.

## `collectgarbage([opt [, arg]])`

Accepted for compatibility. In URLCheck it does nothing and returns nothing, so there is no point
calling it.

## `error(message [, level])`

Raises an error with `message`. `level` controls the position prefix:

- `1` (default) — prefix the error with the position of the caller.
- `0` — no position, just the message.

A raised error stops the script for that URL; the URL is left unchanged and the message is logged.

```lua
error("unexpected host: " .. u.host)
```

## `getmetatable(value)`

Returns the metatable of `value`, or `nil`. If the metatable has a `__metatable` field, that value
is returned instead (the real metatable is protected).

## `ipairs(t)`

Returns an iterator over `t[1], t[2], …`, stopping at the first `nil`. This is the usual way to walk
a list:

```lua
for index, value in ipairs({ "a", "b" }) do
    print(index, value)
end
```

## `load(chunk [, chunkname [, mode [, env]]])`

Compiles a **string** and returns a function, or `nil` plus an error message. Only string chunks are
supported (a reader function is not). `env` sets the environment of the compiled chunk.

```lua
local add = load("return 1 + 1")
print(add())                          -- 2

local f = load("return x", "chunk", "t", { x = 9 })
print(f())                            -- 9
```

## `next(t [, key])`

Returns the next key and value after `key`, or `nil` when the table is exhausted. `next(t)` starts
at the first pair. This is the primitive behind `pairs`; use `pairs` in normal code.

## `pairs(t)`

Returns `next`, the table and `nil`, for iterating every key:

```lua
for name, value in pairs(u.query) do
    print(name, value)
end
```

The order is unspecified. If the table has a `__pairs` metamethod, it is used instead.

## `pcall(f, ...)`

Calls `f` in protected mode. Returns `true` plus the results when it succeeds, or `false` plus the
error when it raises.

```lua
local ok, result = pcall(tonumber, u.query["page"])
```

## `print(...)`

URLCheck replaces Lua's `print`:

- It writes one line to the **Lua log** on the Scripts page — not to a console, not to the popup.
- Arguments are separated by a tab.
- Tables are expanded instead of printing an address:
  `{ a = 1, b = "two", c = { [2] = 3, d = true } }`. Strings inside a table are quoted and
  escaped; a table that contains itself prints as `{...}`,
  and nesting stops after six levels.
- Each line is tagged with the script's file name.

```lua
print("host:", u.host)
print("query:", u.query)
```

## `rawequal(a, b)`

Compares two values without calling `__eq`.

## `rawget(t, k)`

Returns `t[k]` without calling `__index`.

## `rawlen(v)`

Returns the length of a table or string without calling `__len`.

## `rawset(t, k, v)`

Sets `t[k] = v` without calling `__newindex`, and returns `t`.

## `select(index, ...)`

- `select(n, ...)` returns all arguments from `n` on (a negative `n` counts from the end).
- `select("#", ...)` returns how many arguments there are.

```lua
print(select("#", 1, nil, 3))     -- 3
print(select(2, "a", "b", "c"))   -- b   c
```

## `setmetatable(t, mt)`

Sets the metatable of `t` and returns `t`. Raises an error when the existing metatable is protected
by `__metatable`.

```lua
local t = setmetatable({}, { __index = function() return 0 end })
print(t.missing)                  -- 0
```

## `tonumber(v [, base])`

Converts `v` to a number, or returns `nil` when it cannot. With `base` (2–36) the value must be a
string, which is parsed in that base.

```lua
print(tonumber("42"))             -- 42
print(tonumber("ff", 16))         -- 255
print(tonumber("0x10"))           -- 16
```

## `tostring(v)`

Returns a string for `v`, calling `__tostring` when the value has one.

## `type(v)`

Returns one of `"nil"`, `"boolean"`, `"number"`, `"string"`, `"table"`, `"function"`, `"thread"` or
`"userdata"`.

```lua
if type(u.query["page"]) == "string" then
    print("page is text:", u.query["page"])
end
```

## `xpcall(f, msgh [, ...])`

Like `pcall`, but calls `msgh(error)` before the stack unwinds, and passes the extra arguments to
`f` (Lua 5.2). Returns `true` plus results, or `false` plus the value returned by `msgh`.

```lua
local ok, message = xpcall(function(a) return a * 2 end, function(e) return e end, 21)
```

---

## `_G`

The global table itself. Every function above, the standard libraries and any global a script
creates live here.

LuaCSharp leaves one internal value in `_G` (`__lua_mathematics_library_random_instance`); ignore it.

## `_VERSION`

The interpreter version: `"Lua 5.2"`.

## Not available

`dofile`, `loadfile`, `require`, `module`, `unpack` (use `table.unpack`), `gcinfo`, `newproxy`.
