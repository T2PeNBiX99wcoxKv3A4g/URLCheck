-- Removes Amazon's pf_rd_* and ref/ref_ parameters.
local amazon = [[(?:^|\.)amazon\.]]
local noise = [[^(?:pf_rd_|ref|utm_)]]

-- The update check compares this version with the one published at scriptUrl.
scriptUrl = "https://raw.githubusercontent.com/T2PeNBiX99wcoxKv3A4g/URLCheck/master/Lua/amazon-remove-tracking.lua"
scriptVersion = "1.0.0"

return function(u)
    if not u.host or not u.host:regexMatch(amazon) then
        return u
    end

    for name in pairs(u.query) do
        if name:regexMatch(noise) then
            u.query[name] = nil
        end
    end

    return u
end
