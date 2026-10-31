# `string` — string functions

Lua's string library. Every function can also be called as a method on a string, so `s:upper()` is
the same as `string.upper(s)`.

`find`, `match`, `gsub` and `gmatch` use **Lua patterns** (cheat sheet at the bottom). The
`regex*` functions take a **.NET regular expression** instead, which supports alternation,
repetition counts and the rest of the usual regex syntax.

| Function                        | Purpose                        |
|---------------------------------|--------------------------------|
| `string.byte`                   | Character codes of a substring |
| `string.char`                   | String from character codes    |
| `string.dump`                   | Not supported (see below)      |
| `string.find`                   | Find a pattern                 |
| `string.format`                 | Build a formatted string       |
| `string.gmatch`                 | Iterate over all matches       |
| `string.gsub`                   | Replace matches                |
| `string.len`                    | Length in bytes                |
| `string.lower` / `string.upper` | Change case                    |
| `string.match`                  | Extract captures               |
| `string.regexMatch`             | .NET regex match               |
| `string.regexFind`              | .NET regex find                |
| `string.regexGsub`              | .NET regex replace             |
| `string.regexGmatch`            | .NET regex iterator            |
| `string.regexSplit`             | .NET regex split               |
| `string.rep`                    | Repeat a string                |
| `string.reverse`                | Reverse a string               |
| `string.split`                  | Split a string into a list     |
| `string.sub`                    | Extract a substring            |

Lua 5.2 has no `string.pack`, `string.unpack` or `string.packsize` (those are 5.3+).

---

## `string.byte(s [, i [, j]])`

Returns the numeric byte values of `s` from position `i` to `j`. `i` defaults to `1`, `j` to `i`.
Negative positions count from the end.

```lua
print(string.byte("A"))          -- 65
print(string.byte("ABC", 1, 3))  -- 65   66   67
```

## `string.char(...)`

Returns a string made of the given byte values.

```lua
print(string.char(65, 66, 67))   -- ABC
```

## `string.dump(function)`

Present in the library but **not supported** by URLCheck's Lua implementation: calling it raises
`stirng.dump is not supported`. Do not use it.

## `string.find(s, pattern [, init [, plain]])`

Looks for the first match of `pattern` in `s`, starting at `init` (default `1`). Returns the start
and end positions, plus any captures; returns `nil` when there is no match. With `plain = true` the
pattern is matched literally.

```lua
print(string.find("hello world", "wor"))          -- 7   9
print(string.find("a.b", ".", 1, true))           -- 2   2
```

## `string.format(formatstring, ...)`

Builds a string from a `printf`-style format. Common specifiers: `%s` (string), `%d`/`%i` (integer),
`%f` (fixed), `%e`/`%g` (scientific/shortest), `%x`/`%X` (hex), `%o` (octal), `%c` (character),
`%q` (quoted, escaped string) and `%%` (a literal `%`).

```lua
print(string.format("%s=%d (%.2f)", "page", 3, 1.5))   -- page=3 (1.50)
print(string.format("%q", 'a "quoted" line'))          -- "a \"quoted\" line"
```

## `string.gmatch(s, pattern)`

Returns an iterator over every match of `pattern` in `s`. Captures are returned as separate values.

```lua
for name, value in string.gmatch("a=1&b=2", "([^&=]+)=([^&]*)") do
    print(name, value)
end
```

## `string.gsub(s, pattern, repl [, n])`

Replaces matches of `pattern` in `s` and returns the new string plus the number of replacements.
`repl` can be:

- a **string** (`%1`, `%2`, … insert captures; `%0` inserts the whole match),
- a **table** (looked up by the first capture),
- a **function** (called with the captures; return `nil` to keep the match).

`n` limits how many replacements are made.

```lua
print(string.gsub("hello world", "o", "0"))            -- hell0 w0rld   2
print(string.gsub("a=1", "(%w+)=(%w+)", "%2=%1"))      -- 1=a   1
print(string.gsub("a b", "%s", function() return "_" end))
```

## `string.len(s)`

Returns the length of `s` in bytes. The `#` operator does the same.

```lua
print(string.len("abc"))         -- 3
```

## `string.lower(s)` / `string.upper(s)`

Returns `s` with all letters converted to lower or upper case.

```lua
print(("HeLLo"):lower())         -- hello
print(("hello"):upper())         -- HELLO
```

## `string.match(s, pattern [, init])`

Returns the captures of the first match of `pattern` in `s`, or the whole match when the pattern has
no captures. Returns `nil` when there is no match. `init` sets where to start.

```lua
print(string.match("page=42", "page=(%d+)"))   -- 42
print(string.match("abc", "b"))                -- b
```

## `string.rep(s, n [, sep])`

Returns `s` repeated `n` times, with `sep` between the copies.

```lua
print(string.rep("ab", 3))        -- ababab
print(string.rep("ab", 3, "-"))   -- ab-ab-ab
```

## `string.reverse(s)`

Returns `s` with its bytes in reverse order.

```lua
print(string.reverse("abc"))      -- cba
```

## `string.sub(s, i [, j])`

Returns the substring of `s` from `i` to `j`. `j` defaults to `-1` (the end); negative positions
count from the end.

```lua
print(string.sub("hello", 2, 4))  -- ell
print(string.sub("hello", -3))    -- llo
```

## `string.split(s [, sep])`

Splits `s` on the literal string `sep` and returns the parts as a list (a table). Without `sep` —
or with an empty one — it splits on whitespace and drops empty pieces. The separator is literal;
use `string.gmatch` when you need a pattern.

```lua
print(table.concat(("a,b,c"):split(","), "|"))   -- a|b|c
print(table.concat(("a,,b"):split(","), "|"))    -- a||b
print(table.concat(("  a  b "):split(), "|"))    -- a|b
```

## String metatable extensions

URLCheck adds two conveniences on top of the standard string metatable. Everything else — methods
such as `s:sub(1, 1)` and `s:upper()`, the `..` operator, `#s` — works exactly as before.

**Indexing.** `s[i]` returns the character at position `i`, the same as `string.sub(s, i, i)`.
Negative positions count from the end, and anything out of range is `nil`:

```lua
local s = "abc"
print(s[1], s[3], s[-1], s[4])   -- a   c   c   nil
```

**`+` concatenation.** `a + b` concatenates when normal arithmetic cannot: `"a" + "b"` is `"ab"`
and `"a" + 1` is `"a1"`.

```lua
print("hello" + " " + "world")   -- hello world
```

One caveat: Lua's string-to-number coercion still wins first, so `"1" + "2"` is `3`, not `"12"`.
Use `..` (or a non-numeric string) when you really mean concatenation.

## Regex functions

Lua patterns are limited — no alternation, no `{2,4}` counts. These functions take a **.NET regular
expression** instead and are otherwise shaped like their Lua counterparts. Write the pattern as a
normal string (`"\\d+"`) or as a long string (`[[\d+]]`), which avoids the escaping.

| Function | Like | What it does |
| --- | --- | --- |
| `string.regexMatch(s, pattern [, init])` | `string.match` | Captures, or the whole match |
| `string.regexFind(s, pattern [, init])` | `string.find` | Start and end positions, then captures |
| `string.regexGsub(s, pattern, repl [, n])` | `string.gsub` | Replace matches |
| `string.regexGmatch(s, pattern)` | `string.gmatch` | Iterator over the matches |
| `string.regexSplit(s, pattern)` | — | Split into a list |

```lua
("2026-10-30"):regexMatch("(\\d+)-(\\d+)-(\\d+)")   -- 2026   10   30
("cat"):regexMatch("^(cat|dog)$")                  -- cat
("a1b22"):regexGsub("\\d+", "<$0>")                -- a<1>b<22>   2
("a1b22"):regexGsub("\\d+", { ["1"] = "one" })     -- aoneb22     2
("a, b ,c"):regexSplit("\\s*,\\s*")                -- { "a", "b", "c" }
```

- `init` is 1-based and counts from the end when negative, like `string.find`.
- Replacement strings use .NET syntax: `$0` is the whole match, `$1` a group, `${name}` a named
  group. A table replacement is looked up by the whole match (or by the first capture).
- Each pattern gets one second; a pattern that backtracks longer than that is stopped.
- An invalid pattern raises an error.

---

## Lua patterns

Patterns look like regular expressions but are simpler. These are the pieces you will use most:

| Pattern            | Matches                                                      |
|--------------------|--------------------------------------------------------------|
| `.`                | Any character                                                |
| `%a`               | A letter                                                     |
| `%d`               | A digit                                                      |
| `%s`               | A space character                                            |
| `%w`               | A letter or digit                                            |
| `%l` / `%u`        | A lower-case / upper-case letter                             |
| `%x`               | A hexadecimal digit                                          |
| `%p`               | Punctuation                                                  |
| `%c`               | A control character                                          |
| `%%`               | A literal `%`                                                |
| `[abc]` / `[^abc]` | Any / none of the listed characters                          |
| `[a-z]`            | A character in the range                                     |
| `*`, `+`, `-`, `?` | Zero or more, one or more, zero or more (shortest), optional |
| `^`, `$`           | Start / end of the subject                                   |
| `( )`              | A capture                                                    |
| `%1` … `%9`        | A back-reference to an earlier capture                       |
| `%` + magic char   | The literal character, for example `%.` or `%-`              |

```lua
print(("2026-10-30"):match("(%d+)-(%d+)-(%d+)"))   -- 2026   10   30
print(("  hi  "):gsub("^%s+", ""):gsub("%s+$", "")) -- hi
```
