-- Removes YouTube's share token (?si=...) and the feature/pp flags.
local youtube = [[^(?:(?:.+\.)?youtube\.com|youtu\.be)$]]

-- The update check compares this version with the one published at scriptUrl.
scriptUrl = "https://raw.githubusercontent.com/T2PeNBiX99wcoxKv3A4g/URLCheck/master/Lua/youtube-remove-si.lua"
scriptVersion = "1.0.0"

return function(u)
    if u.host and u.host:regexMatch(youtube) then
        u.query["si"] = nil
        u.query["feature"] = nil
        u.query["pp"] = nil
    end

    return u
end
