-- Upgrades http:// links to https://.
-- The update check compares this version with the one published at scriptUrl.
scriptUrl = "https://raw.githubusercontent.com/T2PeNBiX99wcoxKv3A4g/URLCheck/master/Lua/force-https.lua"
scriptVersion = "1.0.0"

return function(u)
    if u.scheme == "http" then
        u.scheme = "https"
    end

    return u
end
