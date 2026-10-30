-- Removes parameters that have an empty value, such as ?a=&b=2.
return function(u)
    for name, value in pairs(u.query) do
        if value == "" then
            u.query[name] = nil
        end
    end

    return u
end
