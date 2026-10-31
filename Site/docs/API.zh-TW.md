# API 參考

URLCheck 執行的是 **Lua 5.2**。本節說明沙箱提供的每一個函式，並依函式庫分組，
讓你就像查閱 Lua 手冊一樣地查找。

| 頁面                   | 內容                                                             |
|------------------------|------------------------------------------------------------------|
| [_G](_G.zh-TW)               | 基礎函式庫：`assert`、`pairs`、`pcall`、`type`、`print`、…       |
| [table](table.zh-TW)         | `table.concat`、`table.insert`、`table.sort`、…                  |
| [string](string.zh-TW)       | `string.find`、`string.gsub`、`string.format`、Lua 模式、…       |
| [math](math.zh-TW)           | `math.floor`、`math.random`、三角函式、…                         |
| [coroutine](coroutine.zh-TW) | `coroutine.create`、`coroutine.wrap`、…                          |
| [bit32](bit32.zh-TW)         | 32 位元位元運算（Lua 5.2 沒有位元運算子）。                      |

參考頁面 [Lua 腳本](Lua-Scripts.zh-TW) 說明腳本的結構、`u` 表包含什麼，以及 URL 編碼如何運作。
[Lua 腳本範例](Lua-Script-Examples.zh-TW) 則有可直接複製的完整腳本。

## 無法使用的項目

沙箱只開放上述函式庫。下列項目**無法**使用，嘗試使用它們的腳本會取得 `nil`：

- `os`、`io`、`debug`、`package`、`utf8` — 沒有時鐘、檔案、行程或模組載入。
- `dofile`、`loadfile`、`require`、`module` — 腳本無法讀取或載入其他檔案。
- `unpack` — 請改用 `table.unpack`（Lua 5.2 將它移到了那裡）。

## 語言注意事項

由於解譯器是 Lua 5.2，有些較新的功能並不存在：

- 沒有 `//` 整數除法。請使用 `math.floor(a / b)`。
- 沒有位元運算子（`&`、`|`、`~`、`<<`、`>>`）。請使用 [bit32](bit32.zh-TW) 的函式。
- 沒有 `utf8` 函式庫，也沒有整數子型別：每個數字都是 double。
- `goto` 與標籤**可以**使用。
- `#`（長度）、`..`（串接）、`and`/`or`/`not`、`==`/`~=` 以及一般控制流程
  都如預期運作。
- 字串有少許擴充：`s[i]` 會讀取一個字元，`s + t` 也能像 `..` 一樣串接。
  請見 [string](string.zh-TW)。

所有程式都在 [Lua 腳本](Lua-Scripts.zh-TW) 所述的沙箱中執行：沒有檔案或網路存取，
且每個腳本對每個 URL 有兩秒鐘的時間。
