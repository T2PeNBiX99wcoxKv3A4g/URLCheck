# `math` — 數學函式

Lua 5.2 中的每個數字都是 double，因此這些函式全都作用於浮點值。

| 名稱                                                                                                                           | 種類             |
|--------------------------------------------------------------------------------------------------------------------------------|-------------------------|
| `math.pi`, `math.huge`                                                                                                         | 數值                     |
| `math.abs`, `math.ceil`, `math.floor`, `math.fmod`, `math.modf`, `math.max`, `math.min`                                        | 捨入與比較               |
| `math.exp`, `math.log`, `math.pow`, `math.sqrt`, `math.ldexp`, `math.frexp`                                                    | 次方與對數               |
| `math.deg`, `math.rad`                                                                                                         | 角度                     |
| `math.cos`, `math.sin`, `math.tan`, `math.acos`, `math.asin`, `math.atan`, `math.atan2`, `math.cosh`, `math.sinh`, `math.tanh` | 三角函式                 |
| `math.random`, `math.randomseed`                                                                                               | 隨機數                   |

Lua 5.2 沒有 `math.tointeger`、`math.type`、`math.ult`、`math.maxinteger` 或 `math.mininteger`
（那些是 5.3+）。

---

## `math.abs(x)`

回傳 `x` 的絕對值。

```lua
print(math.abs(-3))        -- 3
```

## `math.ceil(x)` / `math.floor(x)`

將 `x` 向上或向下捨入為整數（以 double 回傳）。

```lua
print(math.ceil(1.2))      -- 2
print(math.floor(1.8))     -- 1
```

## `math.fmod(x, y)`

回傳 `x / y` 的餘數（對正數而言與 `%` 運算子相同）。

```lua
print(math.fmod(7, 3))     -- 1
```

## `math.modf(x)`

將 `x` 拆成整數部分與小數部分。兩者都以數字回傳。

```lua
print(math.modf(3.25))     -- 3   0.25
```

## `math.max(x, ...)` / `math.min(x, ...)`

回傳引數中的最大值或最小值。

```lua
print(math.max(3, 9, 2))   -- 9
print(math.min(3, 9, 2))   -- 2
```

## `math.exp(x)` / `math.log(x [, base])`

`math.exp` 回傳 `e^x`。`math.log` 回傳自然對數，或以 `base` 為底的對數。

```lua
print(math.log(8, 2))      -- 3
```

## `math.pow(x, y)` / `math.sqrt(x)`

`math.pow` 回傳 `x^y`（與 `x ^ y` 相同）；`math.sqrt` 回傳平方根。

```lua
print(math.pow(2, 10))     -- 1024
print(math.sqrt(9))        -- 3
```

## `math.frexp(x)` / `math.ldexp(m, e)`

`math.frexp` 將 `x` 拆成正規化的分數與指數（`x = m * 2^e`）。
`math.ldexp` 則是反向操作。

```lua
print(math.frexp(8))       -- 0.5   4
print(math.ldexp(0.5, 4))  -- 8
```

## `math.deg(radians)` / `math.rad(degrees)`

在弧度與角度之間轉換。

```lua
print(math.deg(math.pi))   -- 180
print(math.rad(180))       -- 3.1415926535898
```

## 三角函式

`math.cos`、`math.sin`、`math.tan`、`math.acos`、`math.asin`、`math.atan`、`math.atan2(y, x)`、
`math.cosh`、`math.sinh`、`math.tanh` — 全部都以弧度為輸入與輸出。

```lua
print(math.atan2(1, 1))    -- 0.78539816339745
```

## `math.random([m [, n]])`

- 沒有引數：`[0, 1)` 之間的數字。
- 一個引數：`[1, m]` 之間的整數。
- 兩個引數：`[m, n]` 之間的整數。

```lua
print(math.random())        -- 0.732… (example)
print(math.random(6))       -- 1 … 6
print(math.random(10, 20))  -- 10 … 20
```

## `math.randomseed(x)`

設定隨機產生器的種子。相同的種子會產生相同的序列，這對測試很方便。

```lua
math.randomseed(42)
```

## `math.pi` / `math.huge`

`math.pi` 是 π；`math.huge` 是正無限大（而 `-math.huge` 是負無限大）。
