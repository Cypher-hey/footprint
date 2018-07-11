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

**`JSONP 只能用 get 方式`**

* 原理：JSONP 的原理是利用 `<script>` 标签的 `src` 属性加载资源不受同源策略影响，其本质是向服务端请求一段 `js` 代码。

基于script 标签可做 jsonp 形式的访问, 可以通过第三方服务器生成动态的js代码来回调本地的js方法，而方法中的参数则由第三方服务器在后台获取，并以JSON的形式填充到JS方法当中. 即 JSON with Padding. 

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


###### 使用代理

虽然ajax和iframe受同源策略限制, 但服务器端代码请求却不受此限制, 我们可以基于此去伪造一个同源请求, 实现跨域的访问. 如下便是实现思路:

1. 请求同域下的web服务器;
2. web服务器像代理一样去请求真正的第三方服务器;
3. 代理拿到数据过后, 直接返回给客户端ajax.

这样, 我们便拿到了跨域数据.

###### postMessage（跨文档通信API）

ES5新增的 postMessage() 方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递.

语法: `postMessage(data,origin)`

* **data**: 要传递的数据，html5规范中提到该参数可以是JavaScript的任意基本类型或可复制的对象，然而并不是所有浏览器都做到了这点儿，部分浏览器只能处理字符串参数，所以我们在传递参数的时候建议使用JSON.stringify()方法对对象参数序列化，在低版本IE中引用json2.js可以实现类似效果.

* **origin**：字符串参数，指明目标窗口的源，协议+主机+端口号[+URL]，URL会被忽略，所以可以不写，这个参数是为了安全考虑，postMessage()方法只会将message传递给指定窗口，当然如果愿意也可以建参数设置为"*"，这样可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

父页面发送消息:

```js
window.frames[0].postMessage('message', origin)
```

iframe接受消息:

```js
window.addEventListener('message',function(e){
    // 其中 e 对象有三个重要的属性:
    console.log(e.source)  // 表示发送消息的窗口对象
    console.log(e.origin)  // 表示发送消息窗口的源(协议+主机+端口号),消息发向的网址
    console.log(e.data)    // 表示父页面传递过来的message消息内容
    if(e.source!=window.parent) return;//若消息源不是父页面则退出
      //TODO ...
});
```

###### CORS（跨域资源共享）

全称是：Cross-Origin Resource Sharing（跨域资源共享）, 它更加安全; 在上述的 JSONP, postMessage 等，资源本身没有能力保证自己不被滥用. **CORS的目标是保护资源只被可信的访问源以正确的方式访问.**

* 原理：浏览器不再一味禁止跨域访问, 而是检查目的站点的响应头域, 进而判断是否允许当前站点访问. 

    * 1、当浏览器发现我们的XHR请求不符合同源策略时，会在请求头添加 `Origin` 字段，代表请求的来源
    * 2、服务端需要处理请求头部的 `Origin` 字段，根据情况在响应头中添加
        * `Access-Control-Allow-Origin`
        * `Access-Control-Allow-Methods`
        * `Access-Control-Allow-Headers`
        * `Access-Control-Allow-Credentials`
        * `Access-Control-Expose-Headers`
        * `Access-Control-Max-Age`
        等头部信息

* 缺点
    * 兼容性问题，他是现代浏览器支持的一种跨域资源请求的一种方式

###### document.domain

通过修改document的domain属性，我们可以在域和子域或者不同的子域之间通信(即它们必须在同一个一级域名下). 同域策略认为域和子域隶属于不同的域，比如a.com和 script.a.com是不同的域，这时，我们无法在a.com下的页面中调用script.a.com中定义的JavaScript方法。但是当我们把它们document的domain属性都修改为a.com，浏览器就会认为它们处于同一个域下，那么我们就可以互相获取对方数据或者操作对方DOM了。

比如, 我们在 www.a.com/a.html 下, 现在想获取 www.script.a.com/b.html, 即主域名相同, 二级域名不同. 那么可以这么做:

```js
document.domain = 'a.com';
var iframe = document.createElement('iframe');
iframe.src = 'http://www.script.a.com/b.html';
iframe.style.display = 'none';
document.body.appendChild(iframe);
iframe.addEventListener('load',function(){
    //TODO 载入完成时做的事情
    //var _document = iframe.contentWindow.document;
     //...
},false);
```

注意: 

* 2个页面都要设置, 哪怕 a.html 页已处于 a.com 域名下, 也必须显式设置.
* document.domain只能设置为一级域名，比如这里a页不能设置为www.a.com (二级域名).

利用domain属性跨域具有以下局限性:

* 两个页面要在同一个一级域名下, 且必须同协议, 同端口, 即子域互跨;
* 只适用于iframe.

**Internet Explorer同源策略绕过**

Internet Explorer8以及前面的版本很容易通过document.domain实现同源策略绕过, 通过重写文档对象, 域属性这个问题可以十分轻松的被利用.

```js
var document;
document = {};
document.domain = 'http://www.a.com';
console.log(document.domain);
```

如果你在最新的浏览器中运行这段代码, 可能在JavaScript控制台会显示一个同源策略绕过错误.

###### window.name

window 对象的 name 属性是一个很特别的属性, 当该 window 的 location 变化, 然后重新加载, 它的 name 属性可以依然保持不变. 那么我们可以在页面 A 中用 iframe 加载其他域的页面 B , 而页面 B 中用 JavaScript 把需要传递的数据赋值给window.name, iframe 加载完成之后（iframe.onload）, 页面 A 修改 iframe 的地址, 将其变成同域的一个地址, 然后就可以读出 iframe 的 window.name 的值了(因为 A 中的 window.name 和 iframe 中的 window.name 互相独立的, 所以不能直接在 A 中获取 window.name, 而要通过 iframe 获取其 window.name). 这个方式非常适合单向的数据请求，而且协议简单、安全. 不会像 JSONP 那样不做限制地执行外部脚本.

###### 片段标识符（hash值）

** `location.hash`(两个iframe之间), 又称FIM, Fragment Identitier Messaging的简写. **

父级页面虽然不能操作 `iframe` 的 `window` 和 DOM，但是可以修改 `iframe` 的 `URL`，通过修改 `hash` 值（即：`location.hash`），监听 `hashchange` 事件进行跨文档通信

因为父窗口可以对iframe进行URL读写, iframe也可以读写父窗口的URL, URL有一部分被称为hash, 就是#号及其后面的字符, 它一般用于浏览器锚点定位, Server端并不关心这部分, 所以这部分的修改不会产生HTTP请求, 但是会产生浏览器历史记录. 此方法的原理就是改变URL的hash部分来进行双向通信. 每个window通过改变其他 window的location来发送消息（由于两个页面不在同一个域下IE、Chrome不允许修改parent.location.hash的值，所以要借助于父窗口域名下的一个代理iframe）, 并通过监听自己的URL的变化来接收消息. 这个方式的通信会造成一些不必要的浏览器历史记录, 而且有些浏览器不支持onhashchange事件, 需要轮询来获知URL的改变, 最后, 这样做也存在缺点, 比如数据直接暴露在了url中, 数据容量和类型都有限等.



#### iframe中跨域请求的方法



#### References

[由同源策略到前端跨域](https://juejin.im/post/58f816198d6d81005874fd97)