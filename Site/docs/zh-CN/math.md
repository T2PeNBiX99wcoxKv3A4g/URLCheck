# `math` —— 数学函数

Lua 5.2 中的每个数字都是双精度浮点数，因此这些函数都作用于浮点值。

| 名称                                                                                                                           | 类型                    |
|--------------------------------------------------------------------------------------------------------------------------------|-------------------------|
| `math.pi`, `math.huge`                                                                                                         | 数字                    |
| `math.abs`, `math.ceil`, `math.floor`, `math.fmod`, `math.modf`, `math.max`, `math.min`                                        | 取整与比较              |
| `math.exp`, `math.log`, `math.pow`, `math.sqrt`, `math.ldexp`, `math.frexp`                                                    | 幂与对数                |
| `math.deg`, `math.rad`                                                                                                         | 角度                    |
| `math.cos`, `math.sin`, `math.tan`, `math.acos`, `math.asin`, `math.atan`, `math.atan2`, `math.cosh`, `math.sinh`, `math.tanh` | 三角函数                |
| `math.random`, `math.randomseed`                                                                                               | 随机数                  |

Lua 5.2 没有 `math.tointeger`、`math.type`、`math.ult`、`math.maxinteger` 或 `math.mininteger`
（这些是 5.3+ 的）。

---

## `math.abs(x)`

返回 `x` 的绝对值。

```lua
print(math.abs(-3))        -- 3
```

## `math.ceil(x)` / `math.floor(x)`

把 `x` 向上或向下取整为整数（以双精度浮点数返回）。

```lua
print(math.ceil(1.2))      -- 2
print(math.floor(1.8))     -- 1
```

## `math.fmod(x, y)`

返回 `x / y` 的余数（对正数而言与 `%` 运算符相同）。

```lua
print(math.fmod(7, 3))     -- 1
```

## `math.modf(x)`

把 `x` 拆分为整数部分和小数部分。两者都以数字返回。

```lua
print(math.modf(3.25))     -- 3   0.25
```

## `math.max(x, ...)` / `math.min(x, ...)`

返回参数中的最大值或最小值。

```lua
print(math.max(3, 9, 2))   -- 9
print(math.min(3, 9, 2))   -- 2
```

## `math.exp(x)` / `math.log(x [, base])`

`math.exp` 返回 `e^x`。`math.log` 返回自然对数，或以 `base` 为底的对数。

```lua
print(math.log(8, 2))      -- 3
```

## `math.pow(x, y)` / `math.sqrt(x)`

`math.pow` 返回 `x^y`（与 `x ^ y` 相同）；`math.sqrt` 返回平方根。

```lua
print(math.pow(2, 10))     -- 1024
print(math.sqrt(9))        -- 3
```

## `math.frexp(x)` / `math.ldexp(m, e)`

`math.frexp` 把 `x` 拆分为规范化尾数和指数（`x = m * 2^e`）。
`math.ldexp` 做相反的操作。

```lua
print(math.frexp(8))       -- 0.5   4
print(math.ldexp(0.5, 4))  -- 8
```

## `math.deg(radians)` / `math.rad(degrees)`

在弧度和角度之间转换。

```lua
print(math.deg(math.pi))   -- 180
print(math.rad(180))       -- 3.1415926535898
```

## 三角函数

`math.cos`、`math.sin`、`math.tan`、`math.acos`、`math.asin`、`math.atan`、`math.atan2(y, x)`、
`math.cosh`、`math.sinh`、`math.tanh` —— 都接受并返回弧度。

```lua
print(math.atan2(1, 1))    -- 0.78539816339745
```

## `math.random([m [, n]])`

- 无参数：`[0, 1)` 中的数。
- 一个参数：`[1, m]` 中的整数。
- 两个参数：`[m, n]` 中的整数。

```lua
print(math.random())        -- 0.732… (example)
print(math.random(6))       -- 1 … 6
print(math.random(10, 20))  -- 10 … 20
```

## `math.randomseed(x)`

为随机数生成器设置种子。相同的种子产生相同的序列，这在测试时很方便。

```lua
math.randomseed(42)
```

## `math.pi` / `math.huge`

`math.pi` 是 π；`math.huge` 是正无穷（`-math.huge` 是负无穷）。
