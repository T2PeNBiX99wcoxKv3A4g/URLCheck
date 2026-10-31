# API 参考

URLCheck 运行的是 **Lua 5.2**。本节按库分组记录沙盒提供的所有函数，方便你像查阅 Lua 手册那样查找。

| 页面                   | 内容                                                              |
|------------------------|------------------------------------------------------------------|
| [_G](_G)               | 基础库：`assert`、`pairs`、`pcall`、`type`、`print` 等            |
| [table](table)         | `table.concat`、`table.insert`、`table.sort` 等                   |
| [string](string)       | `string.find`、`string.gsub`、`string.format`、Lua 模式等         |
| [math](math)           | `math.floor`、`math.random`、三角函数等                           |
| [coroutine](coroutine) | `coroutine.create`、`coroutine.wrap` 等                           |
| [bit32](bit32)         | 32 位按位运算（Lua 5.2 没有按位运算符）。                          |

参考页 [Lua 脚本](Lua-Scripts) 说明了脚本的结构、`u` 表包含什么以及 URL 编码如何工作。
[Lua 脚本示例](Lua-Script-Examples) 提供了可直接复制的完整脚本。

## 不可用的内容

沙盒只开放上述库。以下内容**不可用**，尝试使用它们的脚本会得到 `nil`：

- `os`、`io`、`debug`、`package`、`utf8` —— 没有时钟、文件、进程或模块加载。
- `dofile`、`loadfile`、`require`、`module` —— 脚本无法读取或加载其他文件。
- `unpack` —— 请改用 `table.unpack`（Lua 5.2 把它移到了那里）。

## 语言说明

由于解释器是 Lua 5.2，一些较新的特性并不存在：

- 没有 `//` 整除。请用 `math.floor(a / b)`。
- 没有按位运算符（`&`、`|`、`~`、`<<`、`>>`）。请用 [bit32](bit32) 中的函数。
- 没有 `utf8` 库，也没有整数子类型：所有数字都是双精度浮点数。
- `goto` 和标签**是**可用的。
- `#`（长度）、`..`（连接）、`and`/`or`/`not`、`==`/`~=` 以及常见的控制流都按预期工作。
- 字符串略有扩展：`s[i]` 读取单个字符，`s + t` 也能像 `..` 一样连接字符串。参见 [string](string)。

所有代码都运行在 [Lua 脚本](Lua-Scripts) 中描述的沙盒里：没有文件或网络访问，
每个脚本处理一个 URL 有两秒时间。
