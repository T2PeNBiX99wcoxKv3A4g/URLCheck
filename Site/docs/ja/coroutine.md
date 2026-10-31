# `coroutine` — コルーチン

コルーチンを使うと、関数を一時停止して再開できます。URL スクリプトで必要になることはほとんど
ありませんが、利用可能であり、Lua 5.2 と同様に動作します。

| 関数                | 目的                                    |
|---------------------|-----------------------------------------|
| `coroutine.create`  | 関数からコルーチンを作成                |
| `coroutine.resume`  | 開始または再開                          |
| `coroutine.running` | 実行中のコルーチン                      |
| `coroutine.status`  | その状態                                |
| `coroutine.wrap`    | コルーチンを通常の関数として作成        |
| `coroutine.yield`   | 現在のコルーチンを一時停止              |

Lua 5.2 には `coroutine.close` や `coroutine.isyieldable` はありません（これらは 5.4）。

---

## `coroutine.create(f)`

`f` からコルーチンを作成し、`thread` 値として返します。本体は再開されるまで開始されません。

```lua
local co = coroutine.create(function(a)
    return a * 2
end)
```

## `coroutine.resume(co, ...)`

`co` を開始または再開し、追加の引数を関数（または `coroutine.yield`）に渡します。yield または
return した値とともに `true` を返すか、エラー メッセージとともに `false` を返します。

```lua
local co = coroutine.create(function(a)
    coroutine.yield(a + 1)
    return a + 2
end)

print(coroutine.resume(co, 10))   -- true   11
print(coroutine.resume(co))       -- true   12
```

## `coroutine.running()`

実行中のコルーチンと、それがメインのものであるかどうか（2 つの値）を返します。

```lua
local co, isMain = coroutine.running()
print(isMain)                     -- true
```

## `coroutine.status(co)`

`co` の状態を返します: `"running"`、`"suspended"`、`"normal"`、`"dead"` のいずれかです。

```lua
local co = coroutine.create(function() end)
print(coroutine.status(co))       -- suspended
coroutine.resume(co)
print(coroutine.status(co))       -- dead
```

## `coroutine.wrap(f)`

呼び出されるたびにコルーチンを再開し、yield された値を返す関数を返します。エラーは呼び出し元に
伝播します（`false` を返す `resume` とは異なります）。

```lua
local nextValue = coroutine.wrap(function(value)
    coroutine.yield(value + 1)
end)

print(nextValue(1))               -- 2
```

## `coroutine.yield(...)`

現在のコルーチンを一時停止し、引数を再開した側へ返します。次の `resume` に渡された値は、`yield` の
結果になります。

```lua
local co = coroutine.create(function()
    local received = coroutine.yield("first")
    return received
end)

print(coroutine.resume(co))       -- true   first
print(coroutine.resume(co, "second")) -- true   second
```

スクリプトには依然として URL ごとに 2 秒の制限があることを忘れないでください。コルーチンによって
それが延びることはありません。
