-- Drops the query on x.com/twitter.com and strips common tracking parameters everywhere.
--
-- u.url          the whole URL, decoded
-- u.scheme, u.host, u.port, u.path
-- u.fragment
-- u.query        decoded query parameters as a table; set one to nil to drop it
-- u.app_version  the running version
--
-- Everything arrives URL-decoded; the URL is encoded again on the way out.
-- Return u (or a URL string) to accept the changes, nil to leave the URL alone.

-- These sites do not need any query parameters at all.
local quiet = { ["x.com"] = true, ["twitter.com"] = true }

-- Parameters that only exist to follow the click.
local tracking = {
    "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
    "fbclid", "gclid", "dclid", "msclkid", "igshid", "mc_cid", "mc_eid"
}

return function(u)
    -- x.com and twitter.com work fine without a query, subdomains included.
    if quiet[u.host] or u.host:match("%.x%.com$") or u.host:match("%.twitter%.com$") then
        u.query = nil
        return u
    end

    -- Everywhere else, remove the tracking parameters and leave the rest alone.
    for _, name in ipairs(tracking) do
        u.query[name] = nil
    end

    return u
end
