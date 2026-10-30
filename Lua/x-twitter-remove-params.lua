-- Runs once for every URL that comes in.
--
-- u.url          the whole URL, decoded
-- u.scheme, u.host, u.port, u.path
-- u.fragment
-- u.query        decoded query parameters as a table; set one to nil to drop it
-- u.app_version  the running version
--
-- Everything arrives URL-decoded; the URL is encoded again on the way out.
-- Return u (or a URL string) to accept the changes, nil to leave the URL alone.

return function(u)
    if u.host == "x.com" then
        u.query = nil
    end

    return u
end
