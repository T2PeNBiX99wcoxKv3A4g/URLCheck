-- Removes YouTube's share token (?si=...) and the feature/pp flags.
return function(u)
    if u.host == "youtu.be" or u.host:match("youtube%.com$") then
        u.query["si"] = nil
        u.query["feature"] = nil
        u.query["pp"] = nil
    end

    return u
end
