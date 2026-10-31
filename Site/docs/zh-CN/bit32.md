# `bit32` —— 按位运算

Lua 5.2 没有按位运算符（`&`、`|`、`~`、`<<`、`>>` 是 5.3+ 的）。请改用这个库。所有
函数都作用于 **32 位无符号整数**：参数会被转换到该范围，结果是 `0` 到 `4294967295`
之间的数字。

| 函数                              | 用途                  |
|-----------------------------------|-----------------------|
| `bit32.band`                      | 按位与                |
| `bit32.bor`                       | 按位或                |
| `bit32.bxor`                      | 按位异或              |
| `bit32.bnot`                      | 按位取反              |
| `bit32.btest`                     | 与运算结果非零时为真  |
| `bit32.lshift` / `bit32.rshift`   | 逻辑移位              |
| `bit32.arshift`                   | 算术移位              |
| `bit32.lrotate` / `bit32.rrotate` | 循环移位              |
| `bit32.extract`                   | 读取位域              |
| `bit32.replace`                   | 写入位域              |

---

## `bit32.band(...)`

所有参数的按位与。

```lua
print(bit32.band(0xFF, 0x0F))     -- 15
```

## `bit32.bor(...)`

所有参数的按位或。

```lua
print(bit32.bor(0x10, 0x01))      -- 17
```

## `bit32.bxor(...)`

所有参数的按位异或。

```lua
print(bit32.bxor(0xFF, 0x0F))     -- 240
```

## `bit32.bnot(x)`

`x` 的按位取反（全部 32 位取反）。

```lua
print(bit32.bnot(0))              -- 4294967295
```

## `bit32.btest(...)`

当所有参数的按位与结果不为零时返回 `true`，否则返回 `false`。

```lua
print(bit32.btest(0x01, 0x03))    -- true
print(bit32.btest(0x02, 0x01))    -- false
```

## `bit32.lshift(x, disp)` / `bit32.rshift(x, disp)`

逻辑左移或右移 `disp` 位。负的 `disp` 会向相反方向移位，移出的位
会被丢弃。

```lua
print(bit32.lshift(1, 4))         -- 16
print(bit32.rshift(16, 4))        -- 1
```

## `bit32.arshift(x, disp)`

算术右移：符号位会复制到空出的位中，因此最高位为 1 的值
按有符号数读取时仍为负数。

```lua
print(bit32.arshift(0x80000000, 1))   -- 3221225472
```

## `bit32.lrotate(x, disp)` / `bit32.rrotate(x, disp)`

把 32 位循环左移或右移；移出的位会从另一侧回来。

```lua
print(bit32.lrotate(0x80000000, 1))   -- 1
print(bit32.rrotate(1, 1))            -- 2147483648
```

## `bit32.extract(n, field [, width])`

返回 `n` 中从第 `field` 位开始的位（0 是最低位），宽度为 `width` 位（默认 `1`）。

```lua
print(bit32.extract(0xFF, 4, 4))      -- 15
```

## `bit32.replace(n, v, field [, width])`

返回 `n`，其中第 `field` 位处（宽度 `width`，默认 `1`）的位被替换为 `v` 的低位。

```lua
print(bit32.replace(0, 0xF, 4, 4))    -- 240
```

---

## 常用写法

```lua
-- Is a bit set?
local function hasBit(value, bit)
    return bit32.band(value, bit32.lshift(1, bit)) ~= 0
end

-- Turn a bit on and off.
value = bit32.bor(value, bit32.lshift(1, bit))
value = bit32.band(value, bit32.bnot(bit32.lshift(1, bit)))
```
