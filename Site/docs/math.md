# `math` — mathematical functions

Every number in Lua 5.2 is a double, so these functions all work on floating-point values.

| Name                                                                                                                           | Kind                    |
|--------------------------------------------------------------------------------------------------------------------------------|-------------------------|
| `math.pi`, `math.huge`                                                                                                         | numbers                 |
| `math.abs`, `math.ceil`, `math.floor`, `math.fmod`, `math.modf`, `math.max`, `math.min`                                        | rounding and comparison |
| `math.exp`, `math.log`, `math.pow`, `math.sqrt`, `math.ldexp`, `math.frexp`                                                    | powers and logs         |
| `math.deg`, `math.rad`                                                                                                         | angles                  |
| `math.cos`, `math.sin`, `math.tan`, `math.acos`, `math.asin`, `math.atan`, `math.atan2`, `math.cosh`, `math.sinh`, `math.tanh` | trigonometry            |
| `math.random`, `math.randomseed`                                                                                               | random numbers          |

Lua 5.2 has no `math.tointeger`, `math.type`, `math.ult`, `math.maxinteger` or `math.mininteger`
(those are 5.3+).

---

## `math.abs(x)`

Returns the absolute value of `x`.

```lua
print(math.abs(-3))        -- 3
```

## `math.ceil(x)` / `math.floor(x)`

Round `x` up or down to a whole number (returned as a double).

```lua
print(math.ceil(1.2))      -- 2
print(math.floor(1.8))     -- 1
```

## `math.fmod(x, y)`

Returns the remainder of `x / y` (the same as the `%` operator for positive numbers).

```lua
print(math.fmod(7, 3))     -- 1
```

## `math.modf(x)`

Splits `x` into its integral and fractional parts. Both are returned as numbers.

```lua
print(math.modf(3.25))     -- 3   0.25
```

## `math.max(x, ...)` / `math.min(x, ...)`

Returns the largest or smallest of the arguments.

```lua
print(math.max(3, 9, 2))   -- 9
print(math.min(3, 9, 2))   -- 2
```

## `math.exp(x)` / `math.log(x [, base])`

`math.exp` returns `e^x`. `math.log` returns the natural logarithm, or the logarithm in `base`.

```lua
print(math.log(8, 2))      -- 3
```

## `math.pow(x, y)` / `math.sqrt(x)`

`math.pow` returns `x^y` (the same as `x ^ y`); `math.sqrt` returns the square root.

```lua
print(math.pow(2, 10))     -- 1024
print(math.sqrt(9))        -- 3
```

## `math.frexp(x)` / `math.ldexp(m, e)`

`math.frexp` splits `x` into a normalized fraction and an exponent (`x = m * 2^e`).
`math.ldexp` does the reverse.

```lua
print(math.frexp(8))       -- 0.5   4
print(math.ldexp(0.5, 4))  -- 8
```

## `math.deg(radians)` / `math.rad(degrees)`

Convert between radians and degrees.

```lua
print(math.deg(math.pi))   -- 180
print(math.rad(180))       -- 3.1415926535898
```

## Trigonometry

`math.cos`, `math.sin`, `math.tan`, `math.acos`, `math.asin`, `math.atan`, `math.atan2(y, x)`,
`math.cosh`, `math.sinh`, `math.tanh` — all take and return radians.

```lua
print(math.atan2(1, 1))    -- 0.78539816339745
```

## `math.random([m [, n]])`

- No arguments: a number in `[0, 1)`.
- One argument: an integer in `[1, m]`.
- Two arguments: an integer in `[m, n]`.

```lua
print(math.random())        -- 0.732… (example)
print(math.random(6))       -- 1 … 6
print(math.random(10, 20))  -- 10 … 20
```

## `math.randomseed(x)`

Seeds the random generator. The same seed produces the same sequence, which is handy for tests.

```lua
math.randomseed(42)
```

## `math.pi` / `math.huge`

`math.pi` is π; `math.huge` is positive infinity (and `-math.huge` is negative infinity).
