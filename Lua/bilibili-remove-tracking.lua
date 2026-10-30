-- Removes Bilibili's share and tracking parameters.
local hosts = [[^(?:(?:.+\.)?bilibili\.com|b23\.tv)$]]

local tracking = {
    "spm_id_from", "vd_source", "from_spmid", "share_source", "share_medium",
    "share_plat", "share_session_id", "share_tag", "timestamp", "unique_k"
}

return function(u)
    if u.host:regexMatch(hosts) then
        for _, name in ipairs(tracking) do
            u.query[name] = nil
        end
    end

    return u
end
