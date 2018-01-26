## 跨域

#### 跨域(定义)

跨域是指一个域下的文档或脚本试图去请求另一个域下的资源，这里跨域是广义的:
```
1. 资源跳转： A链接、重定向、表单提交

2. 资源嵌入： <link>、<script>、<img>、<frame>等dom标签，还有样式中background:url()、@font-face()等文件外链

3. 脚本请求： js 发起的 ajax 请求、dom 和 js 对象的跨域操作等
```
狭义的跨域：是由浏览器同源策略限制的一类请求场景。

#### 同源策略

###### 定义

同源策略/SOP（Same origin policy）是一种约定,

指三个相同：协议相同、域名相同、端口相同，有一个不同即非同源。


** 常见跨域场景 **
```
URL                                      说明                    是否允许通信
http://www.domain.com/a.js
http://www.domain.com/b.js         同一域名，不同文件或路径           允许
http://www.domain.com/lab/c.js

http://www.domain.com:8000/a.js
http://www.domain.com/b.js         同一域名，不同端口                不允许
 
http://www.domain.com/a.js
https://www.domain.com/b.js        同一域名，不同协议                不允许
 
http://www.domain.com/a.js
http://192.168.4.12/b.js           域名和域名对应相同ip              不允许
 
http://www.domain.com/a.js
http://x.domain.com/b.js           主域相同，子域不同                不允许
http://domain.com/c.js
 
http://www.domain1.com/a.js
http://www.domain2.com/b.js        不同域名                         不允许
```

<p class="tip">主域与子域、域名与域名对应的IP。都是非同源的</p>

###### 意义

如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。

同源策略可以算是web安全的基石，没有同源策略就么有安全可言。

###### 非同源的限制

* 无法共享 cookie/Storage/indexDB
* 无法操作彼此的 DOM
* 无法发送 ajax 请求
* 无法通过 flash 发送 http 请求

#### 跨域解决方案


1. 通过jsonp跨域

2. document.domain + iframe跨域

3. location.hash + iframe

4. window.name + iframe跨域

5. postMessage跨域

6. 跨域资源共享（CORS）

7. nginx代理跨域

8. nodejs中间件代理跨域

9. WebSocket协议跨域

###### JSONP

<p class='tip'>通常为了减轻web服务器的负载，我们把js、css，img等静态资源分离到另一台独立域名的服务器上，在html页面中再通过相应的标签从不同域名下加载静态资源，而被浏览器允许，基于此原理，我们可以通过动态创建script，再请求一个带参网址实现跨域通信。</p>

* 原理：JSONP 的原理是利用 `<script>` 标签的 `src` 属性加载资源不受同源策略影响，其本质是向服务端请求一段 `js` 代码。

* 1、原生实现：

```js
<script>
    var script = document.createElement('script');
    script.type = 'text/javascript';

    // 传参并指定回调执行函数为onRecall,要与服务端沟通定义
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=onRecall';
    document.head.appendChild(script);

    // 回调执行函数
    function onRecall(res) {
        alert(JSON.stringify(res));
    }
 </script>

// 服务端返回如下（返回时即执行全局函数）：
onReCall({"status": true, "user": "admin"})
```

* 2、jquery ajax：

```js
$.ajax({
    url: 'http://www.domain2.com:8080/login',
    type: 'get',
    dataType: 'jsonp',  // 请求方式为jsonp
    jsonpCallback: "onRecall",    // 自定义回调函数名
    data: {}
});
```

* 3、vue.js：

```js
this.$http.jsonp('http://www.domain2.com:8080/login', {
    params: {},
    jsonp: 'onRecall'
}).then((res) => {
    console.log(res); 
})
```

* 后端node.js代码示例：

```js
var querystring = require('querystring');
var http = require('http');
var server = http.createServer();

server.on('request', function(req, res) {
    var params = qs.parse(req.url.split('?')[1]);
    var fn = params.callback;

    // jsonp返回设置
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.write(fn + '(' + JSON.stringify(params) + ')');

    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');
```

* 优点
    * 1、可跨域
    * 2、兼容性好，基本全部兼容

* 缺点
    * 只支持 `GET` 请求
    * 确定JSONP请求是否失败并不容易，一般根据超时时间来判断

###### CORS

全称是：Cross-Origin Resource Sharing（跨域资源共享）

* 原理：

    * 1、当浏览器发现我们的XHR请求不符合同源策略时，会在请求头添加 `Origin` 字段，代表请求的来源
    * 2、服务端需要处理请求头部的 `Origin` 字段，根据情况在响应头中添加
        * `Access-Control-Allow-Origin`
        * `Access-Control-Allow-Methods`
        * `Access-Control-Allow-Headers`
        等头部信息

* 缺点
    * 兼容性问题，他是现代浏览器支持的一种跨域资源请求的一种方式

#### iframe中跨域请求的方法

###### 跨文档通信API（postMessage）

```js
// Page Foo
iframe.contentWindow.postMessage('Hello from foo', '/path/to/bar')

// Page Bar
window.parent.addEventListener('message', function (e) {
    console.log(e.source)    // 发送消息的窗口
    console.log(e.origin)  // 消息发向的网址
    console.log(e.data)    // 消息内容
})
```

###### 片段标识符（hash值）

父级页面虽然不能操作 `iframe` 的 `window` 和 DOM，但是可以修改 `iframe` 的 `URL`，通过修改 `hash` 值（即：`location.hash`），监听 `hashchange` 事件进行跨文档通信

###### window.name
