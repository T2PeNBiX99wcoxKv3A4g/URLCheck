-- Drops every query parameter on x.com and twitter.com, subdomains included.
--
-- u.url          the whole URL, decoded
-- u.scheme, u.host, u.port, u.path
-- u.fragment
-- u.query        decoded query parameters as a table; set one to nil to drop it
-- u.app_version  the running version
--
-- Everything arrives URL-decoded; the URL is encoded again on the way out.
-- Return u (or a URL string) to accept the changes, nil to leave the URL alone.

local quiet = [[^(?:.+\.)?(?:x|twitter)\.com$]]

-- The update check compares this version with the one published at scriptUrl.
scriptUrl = "https://raw.githubusercontent.com/T2PeNBiX99wcoxKv3A4g/URLCheck/master/Lua/x-twitter-remove-params.lua"
scriptVersion = "1.0.0"

return function(u)
    if u.host and u.host:regexMatch(quiet) then
        u.query = nil
    end

    return u
end
