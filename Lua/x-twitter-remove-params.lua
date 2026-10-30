-- Drops every query parameter on x.com and twitter.com, subdomains included.
--
-- x.com and twitter.com have no query parameters worth keeping, so the whole table goes.
--
-- u.url          the whole URL, decoded
-- u.scheme, u.host, u.port, u.path
-- u.fragment
-- u.query        decoded query parameters as a table; set one to nil to drop it
-- u.app_version  the running version
--
-- Everything arrives URL-decoded; the URL is encoded again on the way out.
-- Return u (or a URL string) to accept the changes, nil to leave the URL alone.

local quiet = { ["x.com"] = true, ["twitter.com"] = true }

return function(u)
    if quiet[u.host] or u.host:match("%.x%.com$") or u.host:match("%.twitter%.com$") then
        u.query = nil
    end

    return u
end
