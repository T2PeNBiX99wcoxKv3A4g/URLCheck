# API reference

URLCheck runs **Lua 5.2**. This section documents every function the sandbox provides, grouped by
library, so you can look things up the same way you would in the Lua manual.

| Page                   | What is in it                                                    |
|------------------------|------------------------------------------------------------------|
| [_G](_G)               | The base library: `assert`, `pairs`, `pcall`, `type`, `print`, … |
| [table](table)         | `table.concat`, `table.insert`, `table.sort`, …                  |
| [string](string)       | `string.find`, `string.gsub`, `string.format`, Lua patterns, …   |
| [math](math)           | `math.floor`, `math.random`, trigonometry, …                     |
| [coroutine](coroutine) | `coroutine.create`, `coroutine.wrap`, …                          |
| [bit32](bit32)         | 32-bit bitwise operations (Lua 5.2 has no bitwise operators).    |

The reference page [Lua scripts](Lua-Scripts) explains how a script is structured, what the `u`
table contains and how URL encoding works. [Lua script examples](Lua-Script-Examples) has complete
scripts you can copy.

## What is not available

The sandbox opens only the libraries above. These are **not** available, and a script that tries to
use them gets a `nil` value:

- `os`, `io`, `debug`, `package`, `utf8` — no clocks, files, processes or module loading.
- `dofile`, `loadfile`, `require`, `module` — a script cannot read or load other files.
- `unpack` — use `table.unpack` instead (Lua 5.2 moved it there).

## Language notes

Because the interpreter is Lua 5.2, a few newer things do not exist:

- No `//` integer division. Use `math.floor(a / b)`.
- No bitwise operators (`&`, `|`, `~`, `<<`, `>>`). Use the [bit32](bit32) functions.
- No `utf8` library and no integer subtype: every number is a double.
- `goto` and labels **are** available.
- `#` (length), `..` (concatenation), `and`/`or`/`not`, `==`/`~=` and the usual control flow work
  as expected.
- Strings are extended a little: `s[i]` reads one character and `s + t` concatenates as well as
  `..`. See [string](string).

Everything runs in the sandbox described on [Lua scripts](Lua-Scripts): no file or network access,
and each script has two seconds per URL.
