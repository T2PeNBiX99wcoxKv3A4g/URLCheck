# `bit32` — 位元運算

Lua 5.2 沒有位元運算子（`&`、`|`、`~`、`<<`、`>>` 是 5.3+）。請改用這個函式庫。所有
函式都作用於 **32 位元無號整數**：引數會被轉換到該範圍，結果則是 `0` 到 `4294967295`
之間的數字。

| 函式                              | 用途                   |
|-----------------------------------|------------------------|
| `bit32.band`                      | 位元 AND               |
| `bit32.bor`                       | 位元 OR                |
| `bit32.bxor`                      | 位元 XOR               |
| `bit32.bnot`                      | 位元 NOT               |
| `bit32.btest`                     | AND 結果非零時為 true  |
| `bit32.lshift` / `bit32.rshift`   | 邏輯位移               |
| `bit32.arshift`                   | 算術位移               |
| `bit32.lrotate` / `bit32.rrotate` | 循環位移               |
| `bit32.extract`                   | 讀取位元欄位           |
| `bit32.replace`                   | 寫入位元欄位           |

---

## `bit32.band(...)`

所有引數的位元 AND。

```lua
print(bit32.band(0xFF, 0x0F))     -- 15
```

## `bit32.bor(...)`

所有引數的位元 OR。

```lua
print(bit32.bor(0x10, 0x01))      -- 17
```

## `bit32.bxor(...)`

所有引數的位元 XOR。

```lua
print(bit32.bxor(0xFF, 0x0F))     -- 240
```

## `bit32.bnot(x)`

`x` 的位元 NOT（32 位元全部反轉）。

```lua
print(bit32.bnot(0))              -- 4294967295
```

## `bit32.btest(...)`

當所有引數的位元 AND 不為零時回傳 `true`，否則回傳 `false`。

```lua
print(bit32.btest(0x01, 0x03))    -- true
print(bit32.btest(0x02, 0x01))    -- false
```

## `bit32.lshift(x, disp)` / `bit32.rshift(x, disp)`

向左或向右邏輯位移 `disp` 個位元。負的 `disp` 會往另一個方向位移，
被移出的位元會遺失。

```lua
print(bit32.lshift(1, 4))         -- 16
print(bit32.rshift(16, 4))        -- 1
```

## `bit32.arshift(x, disp)`

算術右移：符號位元會複製到空出的位元，因此最高位元為 1 的值
在以有號數讀取時仍為負數。

```lua
print(bit32.arshift(0x80000000, 1))   -- 3221225472
```

## `bit32.lrotate(x, disp)` / `bit32.rrotate(x, disp)`

將 32 個位元向左或向右循環位移；被移出的位元會從另一側回到原位。

```lua
print(bit32.lrotate(0x80000000, 1))   -- 1
print(bit32.rrotate(1, 1))            -- 2147483648
```

## `bit32.extract(n, field [, width])`

回傳 `n` 中從位元 `field` 開始（0 是最低位元）、寬度為 `width` 個位元（預設 `1`）的位元。

```lua
print(bit32.extract(0xFF, 4, 4))      -- 15
```

## `bit32.replace(n, v, field [, width])`

回傳將 `field`（以及 `width`，預設 `1`）位置的位元，以 `v` 的低位元取代後的 `n`。

```lua
print(bit32.replace(0, 0xF, 4, 4))    -- 240
```

---

## 常見範例

```lua
-- Is a bit set?
local function hasBit(value, bit)
    return bit32.band(value, bit32.lshift(1, bit)) ~= 0
end

-- Turn a bit on and off.
value = bit32.bor(value, bit32.lshift(1, bit))
value = bit32.band(value, bit32.bnot(bit32.lshift(1, bit)))
```
