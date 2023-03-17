#### Cookie 的弊端

`cookie`虽然在持久保存客户端数据提供了方便，分担了服务器存储的负担，但还是有很多局限性的:

第一：每个特定的域名下最多生成 20 个 cookie

1. IE6 或更低版本最多 20 个 cookie

2. IE7 和之后的版本最后可以有 50 个 cookie。

3. Firefox 最多 50 个 cookie

4. chrome 和 Safari 没有做硬性限制

IE 和 Opera 会清理近期最少使用的 cookie，Firefox 会随机清理 cookie。

cookie 的最大大约为 4096 字节，为了兼容性，一般不能超过 4095 字节。

IE 提供了一种存储可以持久化用户数据，叫做 userdata，从 IE5.0 就开始支持。每个数据最多 128K，每个域名下最多 1M。这个持久化数据放在缓存中，如果缓存没有清理，那么会一直存在。

优点：极高的扩展性和可用性

1. 通过良好的编程，控制保存在 cookie 中的 session 对象的大小。

2. 通过加密和安全传输技术（SSL），减少 cookie 被破解的可能性。

3. 只在 cookie 中存放不敏感数据，即使被盗也不会有重大损失。

4. 控制 cookie 的生命期，使之不会永远有效。偷盗者很可能拿到一个过期的 cookie。

缺点：

1. `Cookie`数量和长度的限制。每个 domain 最多只能有 20 条 cookie，每个 cookie 长度不能超过 4KB，否则会被截掉。

2. 安全性问题。如果 cookie 被人拦截了，那人就可以取得所有的 session 信息。即使加密也与事无补，因为拦截者并不需要知道 cookie 的意义，他只要原样转发 cookie 就可以达到目的了。

3. 有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务器端保存一个计数器。

#### 浏览器本地存储

在较高版本的浏览器中，js 提供了 sessionStorage 和 globalStorage。在 HTML5 中提供了 localStorage 来取代 globalStorage。

html5 中的 Web Storage 包括了两种存储方式：sessionStorage 和 localStorage。

`sessionStorage` 用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此 sessionStorage 不是一种持久化的本地存储，仅仅是会话级别的存储。

而 `localStorage` 用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。

> **web storage 和 cookie 的区别**

Web Storage 的概念和 cookie 相似，区别是它是为了更大容量存储设计的。Cookie 的大小是受限的，并且每次你请求一个新的页面的时候 Cookie 都会被发送过去，这样无形中浪费了带宽，另外 cookie 还需要指定作用域，不可以跨域调用。

除此之外，Web Storage 拥有 setItem,getItem,removeItem,clear 等方法，不像 cookie 需要前端开发者自己封装 setCookie，getCookie。

但是 cookie 也是不可以或缺的：`cookie` 的作用是与服务器进行交互，作为 HTTP 规范的一部分而存在 ，而 `Web Storage` 仅仅是为了在本地“存储”数据而生

浏览器的支持除了 IE ７及以下不支持外，其他标准浏览器都完全支持(ie 及 FF 需在 web 服务器里运行)，值得一提的是 IE 总是办好事，例如 IE7、IE6 中的 userData 其实就是 javascript 本地存储的解决方案。通过简单的代码封装可以统一到所有的浏览器都支持 web storage。

localStorage 和 sessionStorage 都具有相同的操作方法，例如 setItem、getItem 和 removeItem 等

> **cookie 和 session 的区别**

1. cookie 数据存放在客户的浏览器上，session 数据放在服务器上。
2. cookie 不是很安全，别人可以分析存放在本地的 COOKIE 并进行 COOKIE 欺骗
   考虑到安全应当使用 session。
3. session 会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
   考虑到减轻服务器性能方面，应当使用 COOKIE。
4. 单个 cookie 保存的数据不能超过 4K，很多浏览器都限制一个站点最多保存 20 个 cookie。
5. 所以个人建议：
   将登陆信息等重要信息存放为 SESSION
   其他信息如果需要保留，可以放在 COOKIE 中

#### XML 和 JSON 的区别？

```
(1).数据体积方面。
JSON相对于XML来讲，数据的体积小，传递的速度更快些。
(2).数据交互方面。
JSON与JavaScript的交互更加方便，更容易解析处理，更好的数据交互。
(3).数据描述方面。
JSON对数据的描述性比XML较差。
(4).传输速度方面。
JSON的速度要远远快于XML。
```

#### 什么是 Etag？

浏览器下载组件的时候，会将它们存储到浏览器缓存中。如果需要再次获取相同的组件，浏览器将检查组件的缓存时间，
假如已经过期，那么浏览器将发送一个条件 GET 请求到服务器，服务器判断缓存还有效，则发送一个 304 响应，
告诉浏览器可以重用缓存组件。

那么服务器是根据什么判断缓存是否还有效呢?

答案有两种方式，
一种是前面提到的 ETag，
另一种是根据`Last-Modified`

#### Expires 和 Cache-Control

`Expires` 要求客户端和服务端的时钟严格同步。HTTP1.1 引入 Cache-Control 来克服 Expires 头的限制。如果 max-age 和 Expires 同时出现，则 `max-age` 有更高的优先级。

```
Cache-Control: no-cache, private, max-age=0
ETag: abcde
Expires: Thu, 15 Apr 2014 20:00:00 GMT
Pragma: private
Last-Modified: $now // RFC1123 format
```

#### Http 2.0

-   HTTP/2 引入了“服务端推（serverpush）”的概念，它允许服务端在客户端需要数据之前就主动地将数据发送到客户端缓存中，从而提高性能。
-   HTTP/2 提供更多的加密支持
-   HTTP/2 使用多路技术，允许多个消息在一个连接上同时交差。
    它增加了头压缩（header compression），因此即使非常小的请求，其请求和响应的 header 都只会占用很小比例的带宽。

#### TCP 传输的三次握手策略

为了准确无误地把数据送达目标处，TCP 协议采用了三次握手策略。用 TCP 协议把数据包送出去后，TCP 不会对传送 后的情况置之不理，它一定会向对方确认是否成功送达。握手过程中使用了 TCP 的标志：SYN 和 ACK。

1. 发送端首先发送一个带 `SYN` 标志的数据包给对方。
2. 接收端收到后，回传一个带有 `SYN/ACK` 标志的数据包以示传达确认信息。
3. 最后，发送端再回传一个带 `ACK` 标志的数据包，代表“握手”结束

若在握手过程中某个阶段莫名中断，TCP 协议会再次以相同的顺序发送相同的数据包。

#### HTTP 状态码

状态码由三位数字组成，第一个数字定义了响应的类别，且有五种可能取值：

-   1xx：`指示信息` – 表示请求已接收，并且继续处理
-   2xx：`成功` – 表示请求已被成功接收
-   3xx：`重定向` – 要完成请求必须进行更进一步的操作
-   4xx：`客户端错误` – 请求有语法错误或请求无法实现
-   5xx：`服务端错误` – 服务器未能实现合法的请求

常见状态代码、状态描述的说明如下：

-   200 OK：客户端请求成功
-   204 No Content：没有新文档，浏览器应该继续显示原来的文档
-   206 Partial Content：客户发送了一个带有 Range 头的 GET 请求，服务器完成了它
-   301 Moved Permanently：所请求的页面已经转移至新的 url
-   302 Found：所请求的页面已经临时转移至新的 url
-   304 Not Modified：客户端有缓冲的文档并发出了一个条件性的请求，服务器告诉客户，原来缓冲的文档还可以继续使用。
-   400 Bad Request：客户端请求有语法错误，不能被服务器所理解
-   401 Unauthorized：请求未经授权，这个状态代码必须和 WWW-Authenticate 报头域一起使用
-   403 Forbidden：对被请求页面的访问被禁止
-   404 Not Found：请求资源不存在
-   500 Internal Server Error：服务器发生不可预期的错误
-   503 Server Unavailable：请求未完成，服务器临时过载或当机，一段时间后可能恢复正常
