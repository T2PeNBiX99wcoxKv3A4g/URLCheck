-- Removes Bilibili's share and tracking parameters.
local tracking = {
    "spm_id_from", "vd_source", "from_spmid", "share_source", "share_medium",
    "share_plat", "share_session_id", "share_tag", "timestamp", "unique_k"
}

return function(u)
    if u.host == "b23.tv" or u.host:match("bilibili%.com$") then
        for _, name in ipairs(tracking) do
            u.query[name] = nil
        end
    end

    return u
end
