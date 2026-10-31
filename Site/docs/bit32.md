# `bit32` — bitwise operations

Lua 5.2 has no bitwise operators (`&`, `|`, `~`, `<<`, `>>` are 5.3+). Use this library instead. All
functions work on **32-bit unsigned integers**: arguments are converted to that range, and results
are numbers between `0` and `4294967295`.

| Function                          | Purpose                      |
|-----------------------------------|------------------------------|
| `bit32.band`                      | Bitwise AND                  |
| `bit32.bor`                       | Bitwise OR                   |
| `bit32.bxor`                      | Bitwise XOR                  |
| `bit32.bnot`                      | Bitwise NOT                  |
| `bit32.btest`                     | True when an AND is non-zero |
| `bit32.lshift` / `bit32.rshift`   | Logical shifts               |
| `bit32.arshift`                   | Arithmetic shift             |
| `bit32.lrotate` / `bit32.rrotate` | Rotations                    |
| `bit32.extract`                   | Read a bit field             |
| `bit32.replace`                   | Write a bit field            |

---

## `bit32.band(...)`

Bitwise AND of all arguments.

```lua
print(bit32.band(0xFF, 0x0F))     -- 15
```

## `bit32.bor(...)`

Bitwise OR of all arguments.

```lua
print(bit32.bor(0x10, 0x01))      -- 17
```

## `bit32.bxor(...)`

Bitwise XOR of all arguments.

```lua
print(bit32.bxor(0xFF, 0x0F))     -- 240
```

## `bit32.bnot(x)`

Bitwise NOT of `x` (all 32 bits inverted).

```lua
print(bit32.bnot(0))              -- 4294967295
```

## `bit32.btest(...)`

Returns `true` when the bitwise AND of all arguments is not zero, otherwise `false`.

```lua
print(bit32.btest(0x01, 0x03))    -- true
print(bit32.btest(0x02, 0x01))    -- false
```

## `bit32.lshift(x, disp)` / `bit32.rshift(x, disp)`

Logical left or right shift by `disp` bits. A negative `disp` shifts the other way, and bits shifted
out are lost.

```lua
print(bit32.lshift(1, 4))         -- 16
print(bit32.rshift(16, 4))        -- 1
```

## `bit32.arshift(x, disp)`

Arithmetic right shift: the sign bit is copied into the vacated bits, so a value with the top bit
set stays negative when read as a signed number.

```lua
print(bit32.arshift(0x80000000, 1))   -- 3221225472
```

## `bit32.lrotate(x, disp)` / `bit32.rrotate(x, disp)`

Rotate the 32 bits left or right; bits shifted out come back on the other side.

```lua
print(bit32.lrotate(0x80000000, 1))   -- 1
print(bit32.rrotate(1, 1))            -- 2147483648
```

## `bit32.extract(n, field [, width])`

Returns the bits of `n` starting at bit `field` (0 is the least significant bit), `width` bits wide (default `1`).

```lua
print(bit32.extract(0xFF, 4, 4))      -- 15
```

## `bit32.replace(n, v, field [, width])`

Returns `n` with the bits at `field` (and `width`, default `1`) replaced by the low bits of `v`.

```lua
print(bit32.replace(0, 0xF, 4, 4))    -- 240
```

---

## Common recipes

```lua
-- Is a bit set?
local function hasBit(value, bit)
    return bit32.band(value, bit32.lshift(1, bit)) ~= 0
end

-- Turn a bit on and off.
value = bit32.bor(value, bit32.lshift(1, bit))
value = bit32.band(value, bit32.bnot(bit32.lshift(1, bit)))
```
