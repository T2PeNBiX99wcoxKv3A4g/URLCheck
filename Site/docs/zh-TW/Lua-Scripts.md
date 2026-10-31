# Lua 腳本

URLCheck 可以對每個進來的 URL 執行小型的 Lua 腳本。腳本可以檢視 URL、修改它，然後交回去 —
這一切都發生在檢查彈窗開啟之前、也在任何東西送達瀏覽器之前。

本頁說明腳本如何運作。沙箱提供的每個函式請見 [API 參考](API)。現成的腳本請見
[Lua 腳本範例](Lua-Script-Examples)。

## 腳本存放位置

腳本是 URLCheck 設定與日誌旁邊 `scripts` 資料夾中的純 `.lua` 檔案。在 Windows 上是：

```
%APPDATA%\URLCheck\scripts
```

腳本頁面會顯示你系統上的確切資料夾：將游標移到清單右上角的資料夾名稱上即可。

該資料夾中的每個 `.lua` 檔案都會被載入。你可以用任何編輯器新增、編輯、重新命名或刪除檔案；
資料夾變更時腳本頁面會自動重新整理。該頁面也有建立、匯入與下載腳本的按鈕。

### 分享腳本

腳本可以透過連結安裝，就像 VPM 連結會加入套件一樣：

```
checkurl://script?url=<the script's URL, percent-encoded>
```

例如：

```
checkurl://script?url=https%3A%2F%2Fraw.githubusercontent.com%2FT2PeNBiX99wcoxKv3A4g%2FURLCheck%2Fmaster%2FLua%2Fx-twitter-remove-params.lua
```

點擊它會將腳本下載到該資料夾並開啟腳本頁面。當你在
**設定 → 系統整合** 按下 **Register http/https** 時，URLCheck 會連同 `http`/`https` 一起註冊
`checkurl://` scheme；如果該連結沒有作用，請再按一次。

## 腳本的結構

腳本檔會在載入時執行一次，並且必須**回傳一個函式**。該函式接著會對每個 URL 呼叫一次：

```lua
-- This part runs once, when the script is loaded.
local tracking = { "utm_source", "utm_medium", "utm_campaign", "fbclid", "gclid" }

-- This is the part that runs for every URL.
return function(u)
    for _, name in ipairs(tracking) do
        u.query[name] = nil
    end

    return u
end
```

沒有回傳函式的檔案會在腳本頁面中被列出並加上警告，且不會執行。

腳本依**檔案名稱順序**執行。每個腳本會收到前一個腳本產生的 URL，因此
`01-strip-tracking.lua` 會比 `02-force-https.lua` 先執行。每個腳本都有自己的 Lua 狀態：
你在函式外設定的區域變數與全域變數會在 URL 之間持續存在。

## `u` 表

該函式會收到一個 table，通常稱為 `u`。它的 URL 欄位都是**已 URL 解碼**的，
因此腳本可直接處理純文字，永遠不必自行做任何 unescape。

| 欄位            | 型別            | 說明                                                                                                                           |
|-----------------|-----------------|--------------------------------------------------------------------------------------------------------------------------------|
| `u.url`         | string          | 完整的 URL，已百分比解碼。僅供參考 — 見下文。                                                                                  |
| `u.scheme`      | string          | `http` 或 `https`。                                                                                                            |
| `u.host`        | string          | 主機名稱，例如 `example.com`。                                                                                                 |
| `u.port`        | number 或 `nil` | 明確指定的連接埠，或當 URL 使用預設值時為 `nil`。                                                                              |
| `u.path`        | string          | 路徑，已解碼；一律以 `/` 開頭。                                                                                                |
| `u.fragment`    | string 或 `nil` | `#` 之後的部分，已解碼；當 URL 沒有時為 `nil`。                                                                                |
| `u.query`       | table           | 已解碼的查詢參數，例如 `{ q = "hello world", page = "2" }`。一律是 table，即使 URL 沒有查詢字串。                              |
| `u.app_version` | string          | 執行中的 URLCheck 版本。                                                                                                       |

對於像這樣的 URL

```
https://example.com/a%20b?q=hello%20world&plus=a+b&x=%2B#frag%20ment
```

腳本看到的會是：

```lua
u.url       -- "https://example.com/a b?q=hello world&plus=a+b&x=+#frag ment"
u.scheme    -- "https"
u.host      -- "example.com"
u.port      -- nil
u.path      -- "/a b"
u.fragment  -- "frag ment"
u.query     -- { q = "hello world", plus = "a b", x = "+" }
```

### `u.query`

`u.query` 是腳本最常動到的部分：

```lua
u.query["utm_source"] = nil      -- remove one parameter
u.query["ref"] = "urlcheck"      -- add one (or replace its value)
u.query = nil                    -- drop the whole query
u.query = {}                     -- same thing, with an empty table
```

- 鍵與值一律是字串。`a=1` 會得到 `u.query["a"] == "1"`；若需要數字請使用 `tonumber()`。
- `%XX` 轉義與 `+` 都會被解碼（`+` 變成空格，`%2B` 變成 `+`）。
- URL 中出現兩次的參數會保留其**最後**一個值。
- 不是字串的值（數字、布林值）會在重建 URL 時轉為文字。
- 原始參數會保持其順序；腳本新增的參數會接在後面，並依名稱排序。
  相同的輸入永遠會產生相同的 URL。
- 使用 `pairs` 迭代時移除鍵，只有對目前的鍵是安全的；若要移除多個，
  請先收集名稱。

## 回傳結果

回傳值決定 URL 會如何處理：

| 回傳值                                             | 效果                                                                                          |
|----------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `u`                                                | 由 `u.scheme`、`u.host`、`u.port`、`u.path`、`u.query` 與 `u.fragment` 重建 URL。             |
| 一個 URL 字串，例如 `"https://example.com/"`       | URL 會被該字串取代。                                                                          |
| `nil`（或什麼都不回傳）                            | URL 完全保持原樣。                                                                            |

```lua
return function(u)
    if u.host == "old.example" then
        return "https://new.example" .. u.path
    end

    return u
end
```

有兩件事值得知道：

- **回傳 `u` 時，編輯 `u.url` 不會有任何效果。** URL 是由上述欄位重建的；
  `u.url` 只是用來讀取。若想取代整個 URL，請回傳字串。
- 若 `u.scheme` 或 `u.host` 最後變成空值，原始 URL 會保持不變。

## 編碼

規則很簡單：**進來的已解碼，出去的要編碼。**

- `u.url`、`u.path`、`u.fragment` 以及 `u.query` 的每個鍵與值送進來時都是已解碼的。
- 重建 URL 時，空格與非 ASCII 文字會再次被編碼（`%20`、`%E4%B8%AD`、…），
  路徑區段會逐段轉義，因此 `/` 仍為分隔符，查詢的鍵與值也會個別轉義。
  因此含有 `&` 或 `=` 的值仍會是單一值。
- 以字串回傳的 URL，只會轉義 URL 無法承載的字元（空格、控制字元、
  非 ASCII 以及 `` " < > \ ^ ` { | } ``）。結構 — `: / ? # & = %` — 會保持原樣，
  因此你可以用已解碼的部分組成 URL 再交回去。

因此，請優先修改 `u.query`，而不是手動組出查詢字串：

```lua
-- good: the value is escaped for you
u.query["q"] = "a b&c"           -- -> q=a%20b%26c

-- avoid: the & and the spaces are ambiguous
return "https://example.com/?q=" .. u.query["q"]
```

## `print`

`print` 會在腳本頁面底部的 **Lua 日誌**寫入一行。它不會顯示在彈窗中，也不會開啟任何東西。

```lua
return function(u)
    print("host:", u.host)
    print("query:", u.query)

    return u
end
```

- 值以 tab 分隔，與 Lua 自己的 `print` 相同。
- 與 Lua 不同，table 會被**展開**，而不是印出位址：
  `{ a = 1, b = "two", c = { [2] = 3, d = true } }`。table 內的字串會加上引號並
  轉義；包含自身的 table 會印成 `{...}`，
  且巢狀超過六層後即停止。
- 每一行都會標上腳本的檔案名稱，因此多個腳本可以共用同一份日誌。

日誌只保留最後 200 行；**Clear** 按鈕會清空它。

## 沙箱與限制

腳本在只能處理文字與數字的沙箱中執行，別無其他：

- **可用：** 基礎函式庫（[_G](_G)）、[string](string)、[table](table)、[math](math)、
  [bit32](bit32) 與 [coroutine](coroutine)。
- **無法使用：** `io`、`os`、`debug`、`package`、`require`、`dofile` 與 `loadfile`。
  腳本無法讀取檔案、連上網路或啟動程式。
- 每個腳本對每個 URL 有 **2 秒鐘**。執行超過時間的腳本會被中止並視為錯誤。

## 錯誤

- **檔案無法編譯：** 會列出並加上警告圖示；將游標移上去會顯示訊息。
  編輯器會拒絕儲存無法解析的腳本。
- **檔案沒有回傳函式：** 清單會顯示「The script must return a function.」。
- **函式拋出錯誤或逾時：** URL 會保持原樣，其餘腳本仍會執行，
  彈窗會顯示錯誤，完整訊息則會寫入 Lua 日誌。

## 腳本頁面

腳本頁面就是這個資料夾的編輯器。

- **左側：** 磁碟上的腳本，無法載入的腳本旁會有警告圖示。
  底部的浮動卡片可建立新腳本、匯入檔案，或從 URL 下載腳本。
- **右側：** 所選腳本的編輯器。
  - **鉛筆** 會重新命名檔案（Enter 確認、Escape 取消）。
  - **Open** 會將檔案交給系統中 `.lua` 檔案的預設程式。
  - **Save**（或 `Ctrl`/`Cmd` + `S`）會寫入檔案。
  - **垃圾桶** 會刪除它；點兩次以確認。
- **測試方塊：** 輸入 URL 並按下 **Test**（或 Enter）。腳本會完全依照編輯器中的內容執行 —
  包括尚未儲存的變更 — 結果會顯示最終 URL 或錯誤。不會開啟任何東西，也不會加入歷史紀錄；
  腳本 `print` 的任何內容都會進入 Lua 日誌。
- **Lua 日誌：** 腳本印出或失敗的內容，最新的在最後。

清單會跟隨資料夾變動：以其他程式新增、重新命名或刪除的檔案會自行出現。
若你正在編輯的檔案在尚有未儲存變更時被刪除，編輯器會保留它並標上警告；
儲存時會再次寫入該檔案。
