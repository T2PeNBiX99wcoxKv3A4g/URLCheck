-- Removes Bilibili's share and tracking parameters.
local hosts = [[^(?:(?:.+\.)?bilibili\.com|b23\.tv)$]]

local tracking = {
    "spm_id_from", "vd_source", "from_spmid", "share_source", "share_medium",
    "share_plat", "share_session_id", "share_tag", "timestamp", "unique_k"
}

-- The update check compares this version with the one published at scriptUrl.
scriptUrl = "https://raw.githubusercontent.com/T2PeNBiX99wcoxKv3A4g/URLCheck/master/Lua/bilibili-remove-tracking.lua"
scriptVersion = "1.0.0"

return function(u)
    if u.host and u.host:regexMatch(hosts) then
        for _, name in ipairs(tracking) do
            u.query[name] = nil
        end
    end

    return u
end
