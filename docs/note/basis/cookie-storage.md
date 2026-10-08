# Cookie、Web Storage 与浏览器会话

> 核查日期：2026-10-08。适用：现代浏览器；容量和隐私限制以目标环境为准。
> 状态：官方文档核查，示例未执行。

## 1. 核心模型

HTTP 无状态指请求语义不自动维持应用会话，不是指每次请求必须新建连接。Cookie 是浏览器按规则保存并在匹配请求中携带的键值状态，可用于会话标识，也可用于偏好等用途。

## 2. 三类机制对比

| 机制 | 是否自动随请求发送 | JavaScript 访问 | 生命周期 |
| --- | --- | --- | --- |
| Cookie | 满足域、路径、协议、SameSite 与凭据策略时发送 | HttpOnly 的不可读写 | 会话或指定有效期，可能被清理 |
| localStorage | 否 | 可访问，同步字符串 API | 跨页面会话保存，但不保证永久 |
| sessionStorage | 否 | 可访问，同步字符串 API | 与源和顶层浏览上下文关联 |
| IndexedDB | 否 | 异步结构化存储 | 受配额、清理和浏览器策略约束 |

容量不是统一的跨浏览器合同。约 4 KB 通常描述单个 Cookie 的大小级别，不是一个站点所有 Cookie 的总量。大数据不要塞进 Cookie。

## 3. Cookie 属性

```http
Set-Cookie: __Host-session=opaque-value; Path=/; Secure; HttpOnly; SameSite=Lax
```

示例由服务器设置虚构会话值，不是前端 JavaScript 代码。

- Secure：限制安全传输场景；不是内容加密算法。
- HttpOnly：阻止脚本通过 document.cookie 访问；必须由服务器设置，客户端封装无法创建真正的 HttpOnly Cookie。
- SameSite：约束跨站上下文发送；跨站与跨源是不同概念。None 通常需要 Secure。
- Domain：省略时为 host-only；Cookie 不按端口隔离。
- Path：参与发送匹配，不是可靠的安全隔离边界。
- Max-Age / Expires：控制有效期；会话恢复和浏览器策略可能影响“关闭窗口就消失”的直觉。

Cookie 名称区分大小写。名称和值必须符合允许字符规则，百分号编码是常见策略，并非所有值强制采用 encodeURIComponent。

## 4. Web Storage 示例

```js
function readPreference() {
  try {
    const raw = localStorage.getItem("ui-preference");
    return raw === null ? { theme: "system" } : JSON.parse(raw);
  } catch {
    return { theme: "system" };
  }
}
```

这是容错演示；实际项目还要验证反序列化后的结构。JSON.parse 成功不证明字段合法。配额不足、禁用存储、损坏数据都需要处理。

## 5. 安全与工程边界

HttpOnly 降低脚本直接窃取会话值的风险，但 XSS 仍可能以当前身份发起请求。Cookie 登录仍要考虑 CSRF、会话轮换和服务端授权。把令牌搬到 localStorage 也不能自动解决安全问题。

登录态不应仅靠“本地存在一个字符串”判断；真实授权在服务端完成。清理存储时优先删除自己的键，不要无理由调用 clear 清掉同源其他功能的数据。

## 6. 自测

1. 为什么 document.cookie 设置 HttpOnly 的封装是误导？
2. 页面无法读取 Cookie，为什么仍可能发送带登录态的请求？
3. 为什么 localStorage 不适合表述为“永久保存”？

## 7. 来源与修订

本轮纠正了无状态与连接混淆、Cookie 总容量、HttpOnly 客户端设置、名称大小写、永久存储等旧结论。

- [Cookies 指南](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies)
- [Set-Cookie 参考](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie)
