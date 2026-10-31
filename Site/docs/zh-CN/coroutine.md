# `coroutine` —— 协程

协程让函数可以暂停和恢复。在 URL 脚本中很少需要它们，但它们可用，
行为与 Lua 5.2 一致。

| 函数                | 用途                          |
|---------------------|-------------------------------|
| `coroutine.create`  | 从函数创建协程                |
| `coroutine.resume`  | 启动或继续它                  |
| `coroutine.running` | 正在运行的协程                |
| `coroutine.status`  | 它的状态                      |
| `coroutine.wrap`    | 把协程创建为普通函数          |
| `coroutine.yield`   | 暂停当前协程                  |

Lua 5.2 没有 `coroutine.close` 或 `coroutine.isyieldable`（那些是 5.4 的）。

---

## `coroutine.create(f)`

从 `f` 创建协程，并以 `thread` 值返回。在被恢复之前，函数体不会开始执行。

```lua
local co = coroutine.create(function(a)
    return a * 2
end)
```

## `coroutine.resume(co, ...)`

启动或继续 `co`，把额外参数传给函数（或传给 `coroutine.yield`）。
返回 `true` 加它让出或返回的值，或返回 `false` 加错误消息。

```lua
local co = coroutine.create(function(a)
    coroutine.yield(a + 1)
    return a + 2
end)

print(coroutine.resume(co, 10))   -- true   11
print(coroutine.resume(co))       -- true   12
```

## `coroutine.running()`

返回正在运行的协程以及它是否为主协程（两个值）。

```lua
local co, isMain = coroutine.running()
print(isMain)                     -- true
```

## `coroutine.status(co)`

返回 `co` 的状态：`"running"`、`"suspended"`、`"normal"` 或 `"dead"`。

```lua
local co = coroutine.create(function() end)
print(coroutine.status(co))       -- suspended
coroutine.resume(co)
print(coroutine.status(co))       -- dead
```

## `coroutine.wrap(f)`

返回一个函数，每次调用都会恢复该协程并返回它让出的值。错误会传播给
调用者（与 `resume` 返回 `false` 不同）。

```lua
local nextValue = coroutine.wrap(function(value)
    coroutine.yield(value + 1)
end)

print(nextValue(1))               -- 2
```

## `coroutine.yield(...)`

暂停当前协程，并把参数返回给恢复它的调用者。传给下一次 `resume` 的值
会成为 `yield` 的结果。

```lua
local co = coroutine.create(function()
    local received = coroutine.yield("first")
    return received
end)

print(coroutine.resume(co))       -- true   first
print(coroutine.resume(co, "second")) -- true   second
```

请记住，脚本处理一个 URL 仍只有两秒；协程并不会延长这个限制。
