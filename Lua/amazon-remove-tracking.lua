-- Removes Amazon's pf_rd_* and ref/ref_ parameters.
local amazon = [[(?:^|\.)amazon\.]]
local noise = [[^(?:pf_rd_|ref|utm_)]]

return function(u)
    if not u.host:regexMatch(amazon) then
        return u
    end

    for name in pairs(u.query) do
        if name:regexMatch(noise) then
            u.query[name] = nil
        end
    end

    return u
end
