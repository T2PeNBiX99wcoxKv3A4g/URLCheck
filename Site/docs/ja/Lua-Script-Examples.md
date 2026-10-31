# Lua スクリプトの例

どの例も完全なスクリプト ファイルです。`scripts` フォルダー（場所は Scripts ページに表示されます）に
`something.lua` として保存すれば、次の URL から動作します。API リファレンスについては
[Lua スクリプト](Lua-Scripts) を参照してください。

スクリプトはファイル名順に実行されるため、数値の接頭辞を付けるのが順序を制御する簡単な方法です
（`01-strip-tracking.lua`、`02-force-https.lua` など）。

## トラッキング パラメーターを削除する

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

## サイトのクエリ全体を削除する

```lua
return function(u)
    if u.host == "x.com" or u.host:match("%.x%.com$") then
        u.query = nil
    end

    return u
end
```

## HTTPS を強制する

```lua
return function(u)
    u.scheme = "https"

    return u
end
```

## ホストを書き換える

```lua
return function(u)
    if u.host == "twitter.com" then
        u.host = "x.com"
    end

    return u
end
```

## 一部のパラメーターだけを残す

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

## パラメーターを追加する

```lua
return function(u)
    u.query["ref"] = "urlcheck"

    return u
end
```

## 空のパラメーターを削除する

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

## 数値パラメーターを制限する

```lua
return function(u)
    local page = tonumber(u.query["page"])

    if page and page > 100 then
        u.query["page"] = "100"
    end

    return u
end
```

## URL を完全に置き換える

文字列を返すと URL が置き換えられます。文字列は自動的にエスケープされますが、その構造
（`/`、`?`、`&` など）は書いたとおりに保持されます。

```lua
return function(u)
    if u.host == "old.example" then
        return "https://new.example" .. u.path
    end

    return u
end
```

## スクリプトが受け取る内容を確認する

Scripts ページにはテスト ボックスがあるため、何も開かずにこれを簡単に試せます。出力したものは
すべて Lua ログに表示されます。

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

## 複数の手順を組み合わせる

1 つのスクリプトで好きなだけ処理を行えます。多くの場合、複数のファイルに分けるより簡単です。

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
