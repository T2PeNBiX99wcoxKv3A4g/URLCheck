# `coroutine` — 協程

協程讓函式可以暫停與繼續。在 URL 腳本中很少需要用到，但它們可以使用，
且行為與 Lua 5.2 相同。

| 函式                | 用途                             |
|---------------------|----------------------------------|
| `coroutine.create`  | 由函式建立協程                   |
| `coroutine.resume`  | 啟動或繼續它                     |
| `coroutine.running` | 目前執行中的協程                 |
| `coroutine.status`  | 它的狀態                         |
| `coroutine.wrap`    | 將協程建立為一般函式             |
| `coroutine.yield`   | 暫停目前的協程                   |

Lua 5.2 沒有 `coroutine.close` 或 `coroutine.isyieldable`（那些是 5.4）。

---

## `coroutine.create(f)`

由 `f` 建立協程，並以 `thread` 值回傳。在它被 resume 之前，主體不會開始執行。

```lua
local co = coroutine.create(function(a)
    return a * 2
end)
```

## `coroutine.resume(co, ...)`

啟動或繼續 `co`，將額外的引數傳給該函式（或傳給 `coroutine.yield`）。
成功時回傳 `true` 加上它 yield 或 return 的值，失敗時回傳 `false` 加上錯誤訊息。

```lua
local co = coroutine.create(function(a)
    coroutine.yield(a + 1)
    return a + 2
end)

print(coroutine.resume(co, 10))   -- true   11
print(coroutine.resume(co))       -- true   12
```

## `coroutine.running()`

回傳目前執行中的協程，以及它是否為主協程（兩個值）。

```lua
local co, isMain = coroutine.running()
print(isMain)                     -- true
```

## `coroutine.status(co)`

回傳 `co` 的狀態：`"running"`、`"suspended"`、`"normal"` 或 `"dead"`。

```lua
local co = coroutine.create(function() end)
print(coroutine.status(co))       -- suspended
coroutine.resume(co)
print(coroutine.status(co))       -- dead
```

## `coroutine.wrap(f)`

回傳一個函式，每次呼叫時都會 resume 該協程，並回傳它 yield 的值。錯誤會
傳播給呼叫者（不像 `resume` 會回傳 `false`）。

```lua
local nextValue = coroutine.wrap(function(value)
    coroutine.yield(value + 1)
end)

print(nextValue(1))               -- 2
```

## `coroutine.yield(...)`

暫停目前的協程，並將引數回傳給 resume 它的一方。傳給下一次 `resume` 的值
會成為 `yield` 的結果。

```lua
local co = coroutine.create(function()
    local received = coroutine.yield("first")
    return received
end)

print(coroutine.resume(co))       -- true   first
print(coroutine.resume(co, "second")) -- true   second
```

請記住，腳本對每個 URL 仍只有兩秒鐘；協程並不會延長這個限制。
