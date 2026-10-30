-- Upgrades http:// links to https://.
return function(u)
    if u.scheme == "http" then
        u.scheme = "https"
    end

    return u
end
