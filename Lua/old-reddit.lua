-- Sends Reddit to the old interface, which is lighter and has no login wall.
local reddit = [[^(?:www\.)?reddit\.com$]]

-- The update check compares this version with the one published at scriptUrl.
scriptUrl = "https://raw.githubusercontent.com/T2PeNBiX99wcoxKv3A4g/URLCheck/master/Lua/old-reddit.lua"
scriptVersion = "1.0.0"

return function(u)
    if u.host and u.host:regexMatch(reddit) then
        u.host = "old.reddit.com"
    end

    return u
end
