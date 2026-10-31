# Lua 脚本示例

每个示例都是一个完整的脚本文件：把它保存为 `scripts` 文件夹中的 `something.lua`（
脚本页面会显示该文件夹的位置），它就会对下一个 URL 生效。API 参考见
[Lua 脚本](Lua-Scripts.zh-CN)。

脚本按文件名顺序运行，因此用数字前缀是控制顺序的简便方法（`01-strip-tracking.lua`、
`02-force-https.lua` 等）。

## 剥离跟踪参数

```lua
local tracking = {
    "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
    "fbclid", "gclid", "dclid", "msclkid", "igshid", "mc_cid", "mc_eid"
}

return function(u)
    for _, name in ipairs(tracking) do
        u.query[name] = nil
    end

    return u
end
```

## 丢弃某个站点的整个查询

```lua
return function(u)
    if u.host == "x.com" or u.host:match("%.x%.com$") then
        u.query = nil
    end

    return u
end
```

## 强制使用 HTTPS

```lua
return function(u)
    u.scheme = "https"

    return u
end
```

## 重写主机

```lua
return function(u)
    if u.host == "twitter.com" then
        u.host = "x.com"
    end

    return u
end
```

## 只保留少数参数

```lua
local keep = { id = true, q = true }

return function(u)
    for name in pairs(u.query) do
        if not keep[name] then
            u.query[name] = nil
        end
    end

    return u
end
```

## 添加一个参数

```lua
return function(u)
    u.query["ref"] = "urlcheck"

    return u
end
```

## 移除值为空的参数

```lua
return function(u)
    for name, value in pairs(u.query) do
        if value == "" then
            u.query[name] = nil
        end
    end

    return u
end
```

## 限制数值参数的范围

```lua
return function(u)
    local page = tonumber(u.query["page"])

    if page and page > 100 then
        u.query["page"] = "100"
    end

    return u
end
```

## 完全替换 URL

返回字符串会替换 URL。该字符串会为你转义，但其结构（`/`、`?`、
`&` 等）会按原样保留。

```lua
return function(u)
    if u.host == "old.example" then
        return "https://new.example" .. u.path
    end

    return u
end
```

## 查看脚本收到什么

脚本页面有一个测试框，因此这个示例很容易尝试，而且不会打开任何东西。它打印的所有内容
都会出现在 Lua 日志中。

```lua
return function(u)
    print("url:", u.url)
    print("host:", u.host)
    print("path:", u.path)
    print("fragment:", u.fragment)
    print("query:", u.query)

    return u
end
```

## 组合多个步骤

一个脚本可以做任意多的事，这往往比多个文件更简单：

```lua
local tracking = { "utm_source", "utm_medium", "utm_campaign", "fbclid", "gclid" }

return function(u)
    -- Always use https.
    u.scheme = "https"

    -- Drop tracking parameters.
    for _, name in ipairs(tracking) do
        u.query[name] = nil
    end

    -- Point the old domain at the new one.
    if u.host == "twitter.com" then
        u.host = "x.com"
    end

    -- No fragment needed for this site.
    if u.host == "x.com" then
        u.fragment = nil
    end

    return u
end
```
