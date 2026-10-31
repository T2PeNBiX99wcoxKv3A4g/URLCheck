# Lua script examples

Every example is a complete script file: save it as `something.lua` in the `scripts` folder (the
Scripts page shows where that is) and it starts working with the next URL. See
[Lua scripts](Lua-Scripts) for the API reference.

Scripts run in file-name order, so a numeric prefix is an easy way to control it (`01-strip-tracking.lua`,
`02-force-https.lua`, …).

## Strip tracking parameters

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

## Drop the whole query for a site

```lua
return function(u)
    if u.host == "x.com" or u.host:match("%.x%.com$") then
        u.query = nil
    end

    return u
end
```

## Force HTTPS

```lua
return function(u)
    u.scheme = "https"

    return u
end
```

## Rewrite a host

```lua
return function(u)
    if u.host == "twitter.com" then
        u.host = "x.com"
    end

    return u
end
```

## Keep only a few parameters

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

## Add a parameter

```lua
return function(u)
    u.query["ref"] = "urlcheck"

    return u
end
```

## Remove parameters that are empty

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

## Clamp a numeric parameter

```lua
return function(u)
    local page = tonumber(u.query["page"])

    if page and page > 100 then
        u.query["page"] = "100"
    end

    return u
end
```

## Replace the URL entirely

Returning a string replaces the URL. The string is escaped for you, but its structure (`/`, `?`,
`&`, …) is kept as written.

```lua
return function(u)
    if u.host == "old.example" then
        return "https://new.example" .. u.path
    end

    return u
end
```

## See what a script receives

The Scripts page has a test box, so this one is easy to try without opening anything. Everything it
prints shows up in the Lua log.

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

## Combine several steps

One script can do as much as it likes, which is often simpler than several files:

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
