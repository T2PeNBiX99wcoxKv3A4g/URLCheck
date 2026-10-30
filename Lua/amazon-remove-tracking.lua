-- Removes Amazon's pf_rd_* and ref/ref_ parameters.
return function(u)
    if not u.host:match("amazon%.") then
        return u
    end

    for name in pairs(u.query) do
        if name:match("^pf_rd_") or name:match("^ref") or name:match("^utm_") then
            u.query[name] = nil
        end
    end

    return u
end
