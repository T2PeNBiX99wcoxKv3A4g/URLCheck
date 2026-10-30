-- Removes common tracking parameters from every URL, whatever the host.
--
-- Each entry is a .NET regex tested against the parameter name. A pattern without `$` also matches
-- longer names, which is how the prefixes work.

local tracking = {
    "^utm_",
    "^pk_",
    "^mtm_",
    "^matomo_",
    "^hsa_",
    "^fbclid$",
    "^gclid$",
    "^dclid$",
    "^gbraid$",
    "^wbraid$",
    "^msclkid$",
    "^twclid$",
    "^yclid$",
    "^ttclid$",
    "^igshid$",
    "^li_fat_id$",
    "^mc_cid$",
    "^mc_eid$",
    "^mkt_tok$",
    "^_hsenc$",
    "^_hsmi$",
    "^vero_id$",
    "^vero_conv$",
    "^oly_anon_id$",
    "^oly_enc_id$",
    "^rb_clickid$",
    "^s_cid$",
    "^wickedid$",
    "^epik$"
}

local function isTracking(name)
    for _, pattern in ipairs(tracking) do
        if name:regexMatch(pattern) then
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
