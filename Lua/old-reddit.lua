-- Sends Reddit to the old interface, which is lighter and has no login wall.
local reddit = [[^(?:www\.)?reddit\.com$]]

return function(u)
    if u.host:regexMatch(reddit) then
        u.host = "old.reddit.com"
    end

    return u
end
