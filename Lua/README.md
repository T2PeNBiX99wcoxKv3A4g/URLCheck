# Lua scripts

Scripts in this folder are examples you can copy into URLCheck. They run over every URL before it
opens; the API is documented in the wiki:

- [Lua scripts](https://github.com/T2PeNBiX99wcoxKv3A4g/URLCheck/wiki/Lua-Scripts) — how a script is
  structured, the `u` table, return values and URL encoding.
- [API reference](https://github.com/T2PeNBiX99wcoxKv3A4g/URLCheck/wiki/API) — every function the
  sandbox provides, grouped by library.
- [Lua script examples](https://github.com/T2PeNBiX99wcoxKv3A4g/URLCheck/wiki/Lua-Script-Examples) —
  more recipes.

## Install with one click

URLCheck registers the `urlcheck://` scheme. When URLCheck is installed, this link downloads the
script into the `scripts` folder and opens the Scripts page:

```
urlcheck://script?url=https%3A%2F%2Fraw.githubusercontent.com%2FT2PeNBiX99wcoxKv3A4g%2FURLCheck%2Fmaster%2FLua%2Fx-twitter-remove-params.lua
```

The form is always the same, so any script on the web can be shared the same way:

```
urlcheck://script?url=<the script's URL, percent-encoded>
```

Without the scheme, download the `.lua` file and copy it into the folder shown on the Scripts page.

## `x-twitter-remove-params.lua`

- Drops the whole query on `x.com` and `twitter.com`, subdomains included.
- Removes the usual tracking parameters (`utm_*`, `fbclid`, `gclid`, …) from every other URL.
- Doubles as a small tour of the API: a host lookup table, `string.match`, `ipairs`, and the
  `u.query` table.

```lua
return function(u)
    if u.host:match("%.x%.com$") then
        u.query = nil
    end

    return u
end
```

## Writing your own

A script is a `.lua` file that returns a function taking `u`:

```lua
return function(u)
    u.query["utm_source"] = nil

    return u
end
```

Save it in the `scripts` folder and it starts working with the next URL. The Scripts page has an
editor and a test box, so there is no need to restart the app while working on one.
