# `bit32` — ビット演算

Lua 5.2 にはビット演算子がありません（`&`、`|`、`~`、`<<`、`>>` は 5.3 以降）。代わりにこの
ライブラリを使ってください。すべての関数は **32 ビット符号なし整数** に対して動作します。引数は
その範囲に変換され、結果は `0` から `4294967295` までの数値になります。

| 関数                              | 目的                            |
|-----------------------------------|---------------------------------|
| `bit32.band`                      | ビット単位 AND                  |
| `bit32.bor`                       | ビット単位 OR                   |
| `bit32.bxor`                      | ビット単位 XOR                  |
| `bit32.bnot`                      | ビット単位 NOT                  |
| `bit32.btest`                     | AND が 0 でないときに true      |
| `bit32.lshift` / `bit32.rshift`   | 論理シフト                      |
| `bit32.arshift`                   | 算術シフト                      |
| `bit32.lrotate` / `bit32.rrotate` | 回転                            |
| `bit32.extract`                   | ビット フィールドを読み取る     |
| `bit32.replace`                   | ビット フィールドを書き込む     |

---

## `bit32.band(...)`

すべての引数のビット単位 AND。

```lua
print(bit32.band(0xFF, 0x0F))     -- 15
```

## `bit32.bor(...)`

すべての引数のビット単位 OR。

```lua
print(bit32.bor(0x10, 0x01))      -- 17
```

## `bit32.bxor(...)`

すべての引数のビット単位 XOR。

```lua
print(bit32.bxor(0xFF, 0x0F))     -- 240
```

## `bit32.bnot(x)`

`x` のビット単位 NOT（32 ビットすべてを反転）。

```lua
print(bit32.bnot(0))              -- 4294967295
```

## `bit32.btest(...)`

すべての引数のビット単位 AND が 0 でない場合に `true`、それ以外は `false` を返します。

```lua
print(bit32.btest(0x01, 0x03))    -- true
print(bit32.btest(0x02, 0x01))    -- false
```

## `bit32.lshift(x, disp)` / `bit32.rshift(x, disp)`

`disp` ビットの論理左シフトまたは右シフト。負の `disp` は逆方向にシフトし、シフトアウトした
ビットは失われます。

```lua
print(bit32.lshift(1, 4))         -- 16
print(bit32.rshift(16, 4))        -- 1
```

## `bit32.arshift(x, disp)`

算術右シフト: 符号ビットが空いたビットにコピーされるため、最上位ビットが立っている値は符号付き
数値として読むと負のままになります。

```lua
print(bit32.arshift(0x80000000, 1))   -- 3221225472
```

## `bit32.lrotate(x, disp)` / `bit32.rrotate(x, disp)`

32 ビットを左または右に回転します。シフトアウトしたビットは反対側に戻ってきます。

```lua
print(bit32.lrotate(0x80000000, 1))   -- 1
print(bit32.rrotate(1, 1))            -- 2147483648
```

## `bit32.extract(n, field [, width])`

`n` の `field` ビット目（0 が最下位ビット）から `width` ビット幅（既定値 `1`）のビットを返します。

```lua
print(bit32.extract(0xFF, 4, 4))      -- 15
```

## `bit32.replace(n, v, field [, width])`

`n` の `field`（および `width`、既定値 `1`）のビットを `v` の下位ビットで置き換えたものを返します。

```lua
print(bit32.replace(0, 0xF, 4, 4))    -- 240
```

---

## よく使うレシピ

```lua
-- Is a bit set?
local function hasBit(value, bit)
    return bit32.band(value, bit32.lshift(1, bit)) ~= 0
end

-- Turn a bit on and off.
value = bit32.bor(value, bit32.lshift(1, bit))
value = bit32.band(value, bit32.bnot(bit32.lshift(1, bit)))
```
