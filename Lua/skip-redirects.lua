-- Jumps straight to the destination hidden in a redirect link (?q=, ?url=, ?u=, ?uddg= ...).
--
-- Only well-known intermediaries are handled, so a search page that happens to use "q" is left
-- alone. A parameter that does not hold an absolute http(s) URL is ignored as well.

local rules = {
    { host = [[^(?:.+\.)?youtube\.com$]], path = [[^/redirect]], params = { "q" } },
    { host = [[^(?:.+\.)?google\.[a-z.]+$]], path = [[^/url$]], params = { "q", "url" } },
    { host = [[^(?:lm?\.)?facebook\.com$]], path = [[^/l\.php$]], params = { "u" } },
    { host = [[^l\.instagram\.com$]], path = [[^/$]], params = { "u" } },
    { host = [[^out\.reddit\.com$]], path = [[^/]], params = { "url" } },
    { host = [[^steamcommunity\.com$]], path = [[^/linkfilter]], params = { "url" } },
    { host = [[^(?:www\.)?duckduckgo\.com$]], path = [[^/l/]], params = { "uddg" } },
    { host = [[^away\.vk\.com$]], path = [[^/away]], params = { "to" } },
    { host = [[^link\.zhihu\.com$]], path = [[^/$]], params = { "target" } },
    { host = [[.+\.safelinks\.protection\.outlook\.com$]], path = [[^/$]], params = { "url" } }
}

local function destination(u, params)
    for _, name in ipairs(params) do
        local value = u.query[name]
        if type(value) == "string" and value:regexMatch([[^https?://]]) then
            return value
        end
    end

    return nil
end

return function(u)
    for _, rule in ipairs(rules) do
        if u.host:regexMatch(rule.host) and u.path:regexMatch(rule.path) then
            local target = destination(u, rule.params)
            if target then
                return target
            end
        end
    end

    return u
end
