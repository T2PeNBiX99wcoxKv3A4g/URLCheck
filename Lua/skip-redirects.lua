-- Jumps straight to the destination hidden in a redirect link (?q=, ?url=, ?u=, ?uddg= ...).
--
-- Only well-known intermediaries are handled, so a search page that happens to use "q" is left
-- alone. A parameter that does not hold an absolute http(s) URL is ignored as well.

-- The update check compares this version with the one published at scriptUrl.
scriptUrl = "https://raw.githubusercontent.com/T2PeNBiX99wcoxKv3A4g/URLCheck/master/Lua/skip-redirects.lua"
scriptVersion = "1.1.0"

local rules = {
    { host = [[^(?:.+\.)?youtube\.com$]], path = [[^/redirect]], params = { "q" } },
    { host = [[^(?:.+\.)?google\.[a-z.]+$]], path = [[^/url$]], params = { "q", "url" } },
    { host = [[^(?:[a-z]+\.)?facebook\.com$]], path = [[^/l\.php$]], params = { "u" } },
    { host = [[^l\.instagram\.com$]], path = [[^/$]], params = { "u" } },
    { host = [[^out\.reddit\.com$]], path = [[^/]], params = { "url" } },
    { host = [[^steamcommunity\.com$]], path = [[^/linkfilter]], params = { "url" } },
    { host = [[^(?:www\.)?duckduckgo\.com$]], path = [[^/l/]], params = { "uddg" } },
    { host = [[^away\.vk\.com$]], path = [[^/away]], params = { "to" } },
    { host = [[^link\.zhihu\.com$]], path = [[^/$]], params = { "target" } },
    { host = [[.+\.safelinks\.protection\.outlook\.com$]], path = [[^/$]], params = { "url" } },
    { host = [[^(?:[a-z]{2,3}\.)?linkedin\.com$]], path = [[^/redir/redirect$]], params = { "url" } },
    { host = [[^slack-redir\.net$]], path = [[^/link$]], params = { "url" } },
    { host = [[^(?:[a-z]+\.)?googleadservices\.com$]], path = [[^/pagead/aclk$]], params = { "adurl", "url" } },
    { host = [[^(?:[a-z]+\.)?google\.[a-z.]+$]], path = [[^/aclk$]], params = { "adurl", "url" } },
    { host = [[^(?:.+\.)?amazon\.[a-z.]+$]], path = [[^/gp/r\.html$]], params = { "U" } },
    { host = [[^(?:www\.)?tiktok\.com$]], path = [[^/link/v2$]], params = { "target" } }
}

local base64Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

-- Bing wraps the target as a1 + base64url, so it needs a decoder rather than a plain parameter.
local function decodeBase64(value)
    value = value:gsub("-", "+"):gsub("_", "/"):gsub("[^%w%+/=]", "")

    local bits = 0
    local buffer = 0
    local bytes = {}

    for index = 1, #value do
        local character = value:sub(index, index)
        if character == "=" then
            break
        end

        local digit = base64Alphabet:find(character, 1, true)
        if not digit then
            return nil
        end

        buffer = buffer * 64 + (digit - 1)
        bits = bits + 6

        if bits >= 8 then
            bits = bits - 8
            local byte = math.floor(buffer / (2 ^ bits))
            bytes[#bytes + 1] = string.char(byte % 256)
            buffer = buffer % (2 ^ bits)
        end
    end

    return table.concat(bytes)
end

local function isUrl(value)
    return type(value) == "string" and value:regexMatch([[^https?://]])
end

local function destination(u, params)
    for _, name in ipairs(params) do
        local value = u.query[name]
        if isUrl(value) then
            return value
        end
    end

    return nil
end

local function fromPath(u)
    -- Yahoo keeps the target in the path: /RU=<target>/RK=...
    if u.host:regexMatch([[^r\.search\.yahoo\.com$]]) then
        local target = u.path:match("/RU=(.-)/R[KS]=")
        if isUrl(target) then
            return target
        end
    end

    -- Google AMP: /amp/s/example.com/page -> https://example.com/page
    if u.host:regexMatch([[^(?:www\.)?google\.[a-z.]+$]]) and u.path:regexMatch([[^/amp/s/]]) then
        local target = u.path:sub(8)
        return isUrl(target) and target or "https://" .. target
    end

    return nil
end

local function fromUrl(u)
    -- href.li puts the whole target after "?", without a parameter name.
    if u.host:regexMatch([[^href\.li$]]) then
        local target = u.url:match("%?(https?://.+)$")
        if isUrl(target) then
            return target
        end
    end

    return nil
end

return function(u)
    -- A bare host such as "google.com" arrives without scheme, host or path, so both are checked.
    if u.host and u.path then
        for _, rule in ipairs(rules) do
            if u.host:regexMatch(rule.host) and u.path:regexMatch(rule.path) then
                local target = destination(u, rule.params)
                if target then
                    return target
                end
            end
        end

        local pathTarget = fromPath(u)
        if pathTarget then
            return pathTarget
        end
    end

    if u.host then
        -- Bing: /ck/a?...&u=a1<base64url of the target>
        if u.host:regexMatch([[^(?:www\.)?bing\.com$]]) and u.path == "/ck/a" then
            local value = u.query["u"]
            if type(value) == "string" and value:sub(1, 2) == "a1" then
                local target = decodeBase64(value:sub(3))
                if isUrl(target) then
                    return target
                end
            end
        end

        local urlTarget = fromUrl(u)
        if urlTarget then
            return urlTarget
        end
    end

    return u
end
