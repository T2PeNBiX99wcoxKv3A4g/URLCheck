-- Removes YouTube's share token (?si=...) and the feature/pp flags.
local youtube = [[^(?:(?:.+\.)?youtube\.com|youtu\.be)$]]

return function(u)
    if u.host:regexMatch(youtube) then
        u.query["si"] = nil
        u.query["feature"] = nil
        u.query["pp"] = nil
    end

    return u
end
