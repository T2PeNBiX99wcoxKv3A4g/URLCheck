# Lua 腳本範例

每個範例都是完整的腳本檔：將它存成 `scripts` 資料夾中的 `something.lua`（腳本頁面會顯示
該資料夾在哪），它就會從下一個 URL 開始運作。API 參考請見
[Lua 腳本](Lua-Scripts.zh-TW)。

腳本依檔案名稱順序執行，因此用數字前綴是控制順序的簡單方法（`01-strip-tracking.lua`、
`02-force-https.lua`、…）。

## 移除追蹤參數

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

## 丟棄某個網站的整份查詢字串

```lua
return function(u)
    if u.host == "x.com" or u.host:match("%.x%.com$") then
        u.query = nil
    end

    return u
end
```

## 強制使用 HTTPS

```lua
return function(u)
    u.scheme = "https"

    return u
end
```

## 改寫主機

```lua
return function(u)
    if u.host == "twitter.com" then
        u.host = "x.com"
    end

    return u
end
```

## 只保留少數參數

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

## 新增參數

```lua
return function(u)
    u.query["ref"] = "urlcheck"

    return u
end
```

## 移除空值的參數

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

## 限制數值參數的範圍

```lua
return function(u)
    local page = tonumber(u.query["page"])

    if page and page > 100 then
        u.query["page"] = "100"
    end

    return u
end
```

## 完全取代 URL

回傳字串會取代 URL。該字串會為你轉義，但其結構（`/`、`?`、
`&`、…）會依原樣保留。

```lua
return function(u)
    if u.host == "old.example" then
        return "https://new.example" .. u.path
    end

    return u
end
```

## 看看腳本收到什麼

腳本頁面有測試方塊，因此這個範例很容易在不開啟任何東西的情況下試用。它印出的所有內容
都會出現在 Lua 日誌中。

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

## 合併多個步驟

一個腳本可以做到任意多的事，這通常比拆成多個檔案更簡單：

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
