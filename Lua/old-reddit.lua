-- Sends Reddit to the old interface, which is lighter and has no login wall.
return function(u)
    if u.host == "reddit.com" or u.host == "www.reddit.com" then
        u.host = "old.reddit.com"
    end

    return u
end
