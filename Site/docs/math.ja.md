# `math` — 数学関数

Lua 5.2 のすべての数値は double であるため、これらの関数はすべて浮動小数点値に対して動作します。

| 名前                                                                                                                           | 種類                    |
|--------------------------------------------------------------------------------------------------------------------------------|-------------------------|
| `math.pi`, `math.huge`                                                                                                         | 数値                    |
| `math.abs`, `math.ceil`, `math.floor`, `math.fmod`, `math.modf`, `math.max`, `math.min`                                        | 丸めと比較              |
| `math.exp`, `math.log`, `math.pow`, `math.sqrt`, `math.ldexp`, `math.frexp`                                                    | 累乗と対数              |
| `math.deg`, `math.rad`                                                                                                         | 角度                    |
| `math.cos`, `math.sin`, `math.tan`, `math.acos`, `math.asin`, `math.atan`, `math.atan2`, `math.cosh`, `math.sinh`, `math.tanh` | 三角関数                |
| `math.random`, `math.randomseed`                                                                                               | 乱数                    |

Lua 5.2 には `math.tointeger`、`math.type`、`math.ult`、`math.maxinteger`、`math.mininteger` は
ありません（これらは 5.3 以降）。

---

## `math.abs(x)`

`x` の絶対値を返します。

```lua
print(math.abs(-3))        -- 3
```

## `math.ceil(x)` / `math.floor(x)`

`x` を切り上げまたは切り捨てて整数にします（double として返されます）。

```lua
print(math.ceil(1.2))      -- 2
print(math.floor(1.8))     -- 1
```

## `math.fmod(x, y)`

`x / y` の余りを返します（正の数に対しては `%` 演算子と同じです）。

```lua
print(math.fmod(7, 3))     -- 1
```

## `math.modf(x)`

`x` を整数部分と小数部分に分割します。どちらも数値として返されます。

```lua
print(math.modf(3.25))     -- 3   0.25
```

## `math.max(x, ...)` / `math.min(x, ...)`

引数のうち最大または最小のものを返します。

```lua
print(math.max(3, 9, 2))   -- 9
print(math.min(3, 9, 2))   -- 2
```

## `math.exp(x)` / `math.log(x [, base])`

`math.exp` は `e^x` を返します。`math.log` は自然対数、または `base` を底とする対数を返します。

```lua
print(math.log(8, 2))      -- 3
```

## `math.pow(x, y)` / `math.sqrt(x)`

`math.pow` は `x^y` を返します（`x ^ y` と同じ）。`math.sqrt` は平方根を返します。

```lua
print(math.pow(2, 10))     -- 1024
print(math.sqrt(9))        -- 3
```

## `math.frexp(x)` / `math.ldexp(m, e)`

`math.frexp` は `x` を正規化された小数部と指数に分割します（`x = m * 2^e`）。`math.ldexp` はその
逆を行います。

```lua
print(math.frexp(8))       -- 0.5   4
print(math.ldexp(0.5, 4))  -- 8
```

## `math.deg(radians)` / `math.rad(degrees)`

ラジアンと度の間で変換します。

```lua
print(math.deg(math.pi))   -- 180
print(math.rad(180))       -- 3.1415926535898
```

## 三角関数

`math.cos`、`math.sin`、`math.tan`、`math.acos`、`math.asin`、`math.atan`、`math.atan2(y, x)`、
`math.cosh`、`math.sinh`、`math.tanh` — すべてラジアンを受け取り、ラジアンを返します。

```lua
print(math.atan2(1, 1))    -- 0.78539816339745
```

## `math.random([m [, n]])`

- 引数なし: `[0, 1)` の数値。
- 引数 1 つ: `[1, m]` の整数。
- 引数 2 つ: `[m, n]` の整数。

```lua
print(math.random())        -- 0.732… (example)
print(math.random(6))       -- 1 … 6
print(math.random(10, 20))  -- 10 … 20
```

## `math.randomseed(x)`

乱数生成器にシードを与えます。同じシードからは同じ系列が生成されるため、テストに便利です。

```lua
math.randomseed(42)
```

## `math.pi` / `math.huge`

`math.pi` は π です。`math.huge` は正の無限大です（`-math.huge` は負の無限大）。
