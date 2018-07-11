## http 相关基本概念

#### http 协议

<p class="tip">超文本传输协议（英文：`HyperText Transfer Protocol`，缩写：HTTP）是互联网上应用最为广泛的一种网络协议。设计HTTP最初的目的是为了提供一种发布和接收HTML页面的方法。通过HTTP或者HTTPS协议请求的资源由统一资源标识符（`Uniform Resource Identifiers`，URI）来标识。—— 维基百科</p>

HTTP 协议是基于请求与响应，具体如下图所示：

<img src="./asset/img/http-http-concepts1.png" width="600" />

(图片资源来源于网络)

##### http 协议主要特点
* 简单快速：当客户端向服务器端发送请求时，只是简单的填写请求路径和请求方法即可，然后就可以通过浏览器或其他方式将该请求发送就行了
* 灵活：HTTP 协议允许客户端和服务器端传输任意类型任意格式的数据对象
* 无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接，采用这种方式可以节省传输时间。(当今多数服务器支持Keep-Alive功能，使用服务器支持长连接，解决无连接的问题)
* 无状态：无状态是指协议对于事务处理没有记忆能力，服务器不知道客户端是什么状态。即客户端发送HTTP请求后，服务器根据请求，会给我们发送数据，发送完后，不会记录信息。(使用 cookie 机制可以保持 session，解决无状态的问题)

HTTP是一个属于应用层的面向对象的协议，其主要特点为：  
* 支持客户端/服务器模式；
* 简单快速的通信；
* HTTP允许传输任意类型的数据对象。类型由Content-Type加以标记。
* 无连接、无状态协议；

#### http 报文

用于HTTP协议交互的信息被称为HTTP报文。请求端（客户端）的HTTP报文叫做请求报文，响应端（服务器端）的叫做响应报文。

请求报文和响应报文的首部内容由以下数据组成。

* 请求行 包含用于请求的方法，请求URI和HTTP版本；
* 状态行 包含响应结果的状态码，原因短语和Http版本；
* 首部字段 一般有4种首部，分别是：通用首部、请求首部、响应首部和实体首部。
* 其他（Cookie等）

HTTP协议的请求和响应报文中必定包含HTTP首部。首部内容为客户端和服务器分别处理请求和响应提供 所需要的信息。

##### http 请求报文

<img src="./asset/img/http-http-concepts2.png" width="800" />

(图片资源来源于网络)

##### http 响应报文

<img src="./asset/img/http-http-concepts3.png" width="800" />

(图片资源来源于网络)

#### http Methods

HTTP 协议的请求方法有：GET、POST、HEAD、PUT、DELETE、OPTIONS、TRACE、CONNECT、PATCH、HEAD

+ 一台服务器要与HTTP1.1兼容，只要为资源实现GET和HEAD方法即可
+ `GET` 是最常用的方法，通常用于请求服务器发送某个资源,`获取资源，使用 URL 方式传递参数，大小为 2KB`。
 - `http://www.example.com/users` - 获取所有用户

+ `HEAD` 与GET类似，但服务器在响应中值`返回首部，不返回实体的主体部分`
+ `PUT`让服务器用请求的主体部分来创建一个由所请求的URL命名的新文档，或者，如果那个URL已经存在的话，就用干这个主体替代它。`资源更新`
 - `http://www.example.com/users/a-unique-id` - 更新用户
+ `POST` 起初是用来向服务器输入数据的。实际上，通常会用它来支持HTML的表单。表单中填好的数据通常会被送给服务器，然后由服务器将其发送到要去的地方。`传输资源，HTTP Body, 大小默认8M`
 - `http://www.example.com/users/a-unique-id` - 新增用户
+ `TRACE` 会在目的服务器端发起一个环回诊断，最后一站的服务器会弹回一个TRACE响应并在响应主体中携带它收到的原始请求报文。TRACE方法主要用于诊断，用于验证请求是否如愿穿过了请求/响应链。
+ `OPTIONS` 方法请求web服务器告知其支持的各种功能。可以查询服务器支持哪些方法或者对某些特殊资源支持哪些方法。
+ `DELETE` 请求服务器删除请求URL指定的资源。`删除资源`
 - `http://www.example.com/users/a-unique-id` - 删除用户

#### http Status Code

状态码由三位数字组成，第一个数字定义了响应的类别，且有五种可能取值：

* 1xx：指示信息 – 表示请求已接收，并且继续处理
* 2xx：成功 – 表示请求已被成功接收
* 3xx：`重定向` – 要完成请求必须进行更进一步的操作
* 4xx：客户端错误 – 请求有语法错误或请求无法实现
* 5xx：服务端错误 – 服务器未能实现合法的请求

常见状态代码、状态描述的说明如下：

* 200 OK：客户端请求成功
* 204 No Content：没有新文档，浏览器应该继续显示原来的文档
* 206 Partial Content：客户发送了一个带有Range头的GET请求，服务器完成了它
* `301` Moved Permanently：所请求的页面已经转移至新的url
* 302 Found：所请求的页面已经临时转移至新的url
* 304 Not Modified：客户端有缓冲的文档并发出了一个条件性的请求，服务器告诉客户，原来缓冲的文档还可以继续使用。
* 400 Bad Request：客户端请求有语法错误，不能被服务器所理解
* 401 Unauthorized：请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用
* 403 Forbidden：对被请求页面的访问被禁止
* `404` Not Found：请求资源不存在
* 500 Internal Server Error：服务器发生不可预期的错误
* 503 Server Unavailable：请求未完成，服务器临时过载或当机，一段时间后可能恢复正常

[HTTP 最强资料大全](https://segmentfault.com/a/1190000008900299)