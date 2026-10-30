-- Removes common tracking parameters from every URL, whatever the host.
--
-- Only the parameters below are touched; everything else is left alone.

-- Prefixes that only exist for tracking.
local prefixes = { "utm_", "pk_", "mtm_", "matomo_", "hsa_" }

-- Exact names that only exist for tracking.
local exact = {
    ["fbclid"] = true, ["gclid"] = true, ["dclid"] = true, ["gbraid"] = true,
    ["wbraid"] = true, ["msclkid"] = true, ["twclid"] = true, ["yclid"] = true,
    ["ttclid"] = true, ["igshid"] = true, ["li_fat_id"] = true,
    ["mc_cid"] = true, ["mc_eid"] = true, ["mkt_tok"] = true,
    ["_hsenc"] = true, ["_hsmi"] = true,
    ["vero_id"] = true, ["vero_conv"] = true,
    ["oly_anon_id"] = true, ["oly_enc_id"] = true,
    ["rb_clickid"] = true, ["s_cid"] = true, ["wickedid"] = true, ["epik"] = true
}

local function isTracking(name)
    if exact[name] then
        return true
    end

    for _, prefix in ipairs(prefixes) do
        if name:sub(1, #prefix) == prefix then
            return true
        end
    end

    return false
end

return function(u)
    for name in pairs(u.query) do
        if isTracking(name) then
            u.query[name] = nil
        end
    end

    return u
end
