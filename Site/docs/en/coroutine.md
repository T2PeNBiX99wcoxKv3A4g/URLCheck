# `coroutine` — coroutines

Coroutines let a function pause and resume. They are rarely needed in a URL script, but they are
available and behave like Lua 5.2.

| Function            | Purpose                                |
|---------------------|----------------------------------------|
| `coroutine.create`  | Create a coroutine from a function     |
| `coroutine.resume`  | Start or continue it                   |
| `coroutine.running` | The running coroutine                  |
| `coroutine.status`  | Its state                              |
| `coroutine.wrap`    | Create a coroutine as a plain function |
| `coroutine.yield`   | Pause the current coroutine            |

Lua 5.2 has no `coroutine.close` or `coroutine.isyieldable` (those are 5.4).

---

## `coroutine.create(f)`

Creates a coroutine from `f` and returns it as a `thread` value. The body does not start until it is
resumed.

```lua
local co = coroutine.create(function(a)
    return a * 2
end)
```

## `coroutine.resume(co, ...)`

Starts or continues `co`, passing the extra arguments to the function (or to `coroutine.yield`).
Returns `true` plus the values it yielded or returned, or `false` plus an error message.

```lua
local co = coroutine.create(function(a)
    coroutine.yield(a + 1)
    return a + 2
end)

print(coroutine.resume(co, 10))   -- true   11
print(coroutine.resume(co))       -- true   12
```

## `coroutine.running()`

Returns the running coroutine and whether it is the main one (two values).

```lua
local co, isMain = coroutine.running()
print(isMain)                     -- true
```

## `coroutine.status(co)`

Returns the state of `co`: `"running"`, `"suspended"`, `"normal"` or `"dead"`.

```lua
local co = coroutine.create(function() end)
print(coroutine.status(co))       -- suspended
coroutine.resume(co)
print(coroutine.status(co))       -- dead
```

## `coroutine.wrap(f)`

Returns a function that resumes the coroutine every time it is called and returns the values it
yielded. Errors are propagated to the caller (unlike `resume`, which returns `false`).

```lua
local nextValue = coroutine.wrap(function(value)
    coroutine.yield(value + 1)
end)

print(nextValue(1))               -- 2
```

## `coroutine.yield(...)`

Pauses the current coroutine and returns the arguments to whoever resumed it. The values passed to
the next `resume` become the results of `yield`.

```lua
local co = coroutine.create(function()
    local received = coroutine.yield("first")
    return received
end)

print(coroutine.resume(co))       -- true   first
print(coroutine.resume(co, "second")) -- true   second
```

Remember that a script still has two seconds per URL; a coroutine does not extend that.
