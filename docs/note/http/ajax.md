# 异步请求：XHR、Fetch、状态与错误

> 核查日期：2026-10-08。状态：正文与关键示例静态审阅，未启动服务。

## 现代使用要点

Fetch 的 HTTP 4xx/5xx 通常不会自动 reject，应检查 response.ok。取消使用请求支持的 AbortSignal；超时、业务失败、解析失败和 CORS 读取失败要分开。XHR 的 load 表示请求完成而不保证业务成功。上传进度仍是 XHR 的常见使用场景。

## ajax

<p class="tip">本文将不会讨论IE7之前版本浏览器的兼容实现，以标准的 XMLHttpRequest 实现</p>

## 最小 XHR 示例

假设已有安全的同源测试服务提供 /test.txt。这里只展示客户端读取，不提供可对外开放的静态文件服务器。

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "/test.txt");
xhr.timeout = 5000;
xhr.addEventListener("load", () => {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log(xhr.responseText);
  } else {
    console.error("HTTP 状态", xhr.status);
  }
});
xhr.addEventListener("error", () => console.error("网络或访问失败"));
xhr.addEventListener("timeout", () => console.error("超时"));
xhr.addEventListener("abort", () => console.log("已取消"));
xhr.send();
```

open 配置请求，send 发出请求。readystate 为 4 只代表操作结束，成功判断还需看状态和业务内容。原文的 Node 服务直接拼接请求路径读文件，缺少边界与错误处理，不继续作为教学模板。

#### XHR 属性、方法、事件 汇总

一下列出的属性、方法以及事件，包含XHR1级以及2级的全部规范内容，由于浏览器对2级规范的实现并不完善，所以对于XHR2级规范会标注出来。

##### 属性

###### responseText

* 描述：保存中响应主体返回的文本
* 类型：`String`

###### responseXML

* 描述：如果响应的内容类型(Content-Type)为 `text/xml` 或者 `application/xml` 那么这个属性保存着包含响应内容的XML DOM文档。

###### status

* 描述：响应的HTTP状态码，如：`200`、`304` 等
* 类型：`Number`

###### statusText

* 描述：对 `status` 状态码的文本描述
* 类型：`String`

###### readyState

* 描述：一个数字，标示着当前请求/响应的某一个阶段
    * 0：未初始化，即还没有调用 `open` 方法
    * 1：启动，已经调用 `open`，但还没有调用 `send`
    * 2：HEADERS_RECEIVED，已收到状态及响应头
    * 3：接收，已经接收到数据，但还没有接收完成
    * 4：DONE，操作结束；仍需检查成功、失败与状态
* 类型：`Number`

###### 【XHR2】timeout

* 描述：可以给 `xhr.timeout` 属性设置一个数字值，代表请求多少毫秒之后超时，超时后将触发同样是XHR2级规范定义的 `timeout` 事件。
* 示例：
```js
xhr.timeout = 1000  // 1秒后超时
```

###### upload

* 描述：`xhr.upload` 属性返回一个 `XMLHttpRequestUpload` 对象，用来表示上传的进度，该对象是不透明的，可以通过为其绑定事件来跟踪进度。
* 示例：

```js
const xhr = new XMLHttpRequest()
xhr.open('POST', url)
xhr.onreadystatechange = () => {
    // ...
}
xhr.upload.addEventListener('progress', event => {
    // event.lengthComputable 文件是否可计算
    if (event.lengthComputable) {
        // 计算上传进度百分比
        let percentage = Math.round(event.loaded / event.total * 100)
    } else {
        console.log('无法计算')
    }
})
xhr.upload.addEventListener('load', () => {})
xhr.upload.addEventListener('error', () => {})
```

能够在 `xhr.upload` 上监听的事件有：

| 事件        | 描述           |
| ------------- |:-------------:|
| loadstart     | 开始上传 |
| progress      | 传输中      |
| abort | 终止操作      |
| error | 失败      |
| load | 成功      |
| timeout | 超时      |
| loadend | 完成（不论成功与否）      |

##### 方法

###### open(method, url[, async])

* 描述：启动一个请求，但不会发送。

* 参数：
    * `{String} method` 请求的方法，如：`get`、`post` 等
    * `{String} url` 请求的URL
    * `{Boolean} async` 一个布尔值，代表着是否异步发送请求，默认 `true` 异步

###### send(data)

* 描述：发送通过 `open` 方法启动的请求

* 参数：
    * `{String/FormData} data` 作为请求主体发送的数据

* 【XHR2】扩展：XHR2允许给 `send` 方法传递一个 `FormData` 实例。`FormData` 接收一个可选的参数，参数为 form 表单元素，如下：

```js
var form = document.forms[0]
var data = new FormData(form)
```

在XHR1级的时候，我们要手动序列化表单的数据然后构造一个合适的字符串。而 `FormData` 会自动序列化表单，用于创建与表单格式相同的数据用于XHR传输，这样服务端接收数据的时候就能够对传统的表单提交一视同仁，为我们节省了不少事情。

`FormData` 除了上述好处之外，也不需要我们手动设置请求头部，在XHR1级的时候，除了手动序列化表单，为了模拟真正的表单提交，我们需要设置相应的请求头部信息才行，比如：

```js
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
```

###### setRequestHeader(key, val)

* 描述：设置要发送的请求头部信息

* 参数：
    * `{String} key` 头部字段的名称
    * `{String} val` 头部字段的值

* 注意：该方法必须要在调用 `open` 方法之后且调用 `send` 方法之前发送才能生效

###### getResponseHeader(key)

* 描述：根据指定的响应头部字段名称，获取响应头部字段的值

* 参数：
    * `{String} key` 响应头部字段的名称

###### getAllResponseHeaders()

* 描述：获取所有头部信息作为一个长字符串

* 示例：如第一小节的例子中，调用该方法将得到如下内容：
```
Date: Fri, 09 Jun 2017 08:37:44 GMT
Connection: keep-alive
Transfer-Encoding: chunked
Content-Type: text/txt
```

###### 【XHR2】overrideMimeType()

* 描述：重写响应数据的mime类型
* 意义：我们知道 `xhr` 对象拥有 `responseXML` 属性，当服务端返回的数据的内容类型是 `text/xml` 或 `application/xml` 时，数据将最为XML DOM保存在 `responseXML` 属性中，但是，如果服务端响应的内容类型是：`text/plain`，而事实上数据确实是可以作为 XML 解析的，此时 `responseXML` 属性为空，为了重新让该属性保存着能够用于 XML 解析的数据，我们就可以使用 `overrideMimeType` 方法重写mime类型：

```js
var xhr = new XMLHttpRequest()
xhr.open('get', 'xml.php')
xhr.overrideMimeType('text/xml')
xhr.send()
```

##### 事件

###### readystatechange

* 描述：当 `xhr.readyState` 属性值变化时触发。
* 注意：监听器需要在相关事件发生前注册；若要观察 open 触发的状态变化，应在 open 前注册，不能概括为所有情况都必须

###### 【XHR2】timeout

* 描述：当请求在 `xhr.timeout` 属性所设置的规定事件内没有完成，将触发该事件，代表请求超时

##### 进度事件

###### loadstart

* 描述：接收到响应数据的第一个字节时触发

###### progress

* 描述：接收响应数据期间持续触发
* 事件对象的重要属性：
    * `event.lengthComputable` ---- 一个boolean值，表示进度信息是否可用
    * `event.loaded` ---- 表示已经接收的字节数
    * `event.total` ---- 表示根据 `Content-Length` 响应头部确定的预期字节数

###### error

* 描述：请求发生错误时触发

###### abort

* 描述：调用 `xhr.abort()` 方法终止连接时触发

###### load

* 描述：响应数据接受完毕时触发
* 注意：实际上 `load` 事件是为了取代 `readystatechange` 事件而定义的，`load` 事件的好处是，我们不需要手动判断 `readyState` 属性的值。

###### loadend

* 描述：触发 `error`、`abort`、`load` 事件后触发

#### ajax的优缺点

###### ajax的优点

* 无刷新更新数据，不影响用户交互
* 传统方式每次与服务器交互都返回整个HTML页面内容，ajax仅获取必要的数据，减少带宽
* ajax是前后端分离能够实现的重要桥梁

###### ajax的缺点

* 异步更新不自动建立业务历史；可通过路由和 History API 设计返回行为
* 搜索可见性取决于渲染和抓取策略，不是 AJAX 一律不可索引
## 练习与来源

分别模拟 HTTP 404、网络中断、非法 JSON 和用户取消，说明每种错误在哪层捕获。请求成功但页面已切换时，如何避免迟到结果覆盖？

- [XHR readyState](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState)
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch)
