-- Removes parameters that have an empty value, such as ?a=&b=2.
-- The update check compares this version with the one published at scriptUrl.
scriptUrl = "https://raw.githubusercontent.com/T2PeNBiX99wcoxKv3A4g/URLCheck/master/Lua/remove-empty-params.lua"
scriptVersion = "1.0.0"

return function(u)
    for name, value in pairs(u.query) do
        if value == "" then
            u.query[name] = nil
        end
    end

    return u
end
