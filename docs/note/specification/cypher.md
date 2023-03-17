# rules

## git 规范

git 规范包括两点：分支管理规范、git commit 规范

#### 分支管理规范

一般项目分主分支（master）和其他分支。当有团队成员要开发新功能或改 BUG 时，就从 master 分支开一个新的分支来做，feature-XXX or bugfix-XXX。

#### git commit 规范

-   scope: commit 影响的范围, 比如: route, component, utils, build...
-   subject: commit 的概述
-   body: commit 具体修改内容, 可以分为多行.
-   footer: 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.

```js
// 标题行: 必填, 描述主要修改类型和内容
<type>(<scope>): <subject>
// 空行
<BLANK LINE>
// 主题内容: 描述为什么修改, 做了什么样的修改, 以及开发的思路等等
<body>
// 空行
<BLANK LINE>
// 页脚注释: 可以写注释，BUG 号链接
<footer>
```

#### type: commit 的类型

-   feat: 新功能、新特性
-   fix: 修复 bug
-   perf: 更改代码，以提高性能
-   refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
-   docs: 文档修改
-   style: 代码格式修改, 注意不是 css 修改（例如分号修改）
-   test: 测试用例新增、修改
-   build: 影响项目构建或依赖项修改
-   revert: 恢复上一次提交
-   ci: 持续集成相关文件修改
-   chore: 其他修改（杂务，不在上述类型中的修改）
-   release: 发布新版本
-   workflow: 工作流相关文件修改

#### 验证 git commit 规范

验证 git commit 规范，主要通过 git 的 pre-commit 钩子函数来进行。当然，你还需要下载一个辅助工具来帮助你进行验证。

```shell
# 下载辅助工具
npm i -D husky
```

在 package.json 加上下面的代码

```json
"husky": {
  "hooks": {
    "pre-commit": "npm run lint",
    "commit-msg": "node script/verify-commit.js",
    "pre-push": "npm test"
  }
}
```

然后在你项目根目录下新建一个文件夹 script，并在下面新建一个文件 verify-commit.js，输入以下代码：

```js
const msgPath = process.env.HUSKY_GIT_PARAMS;
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();

const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
    console.log();
    console.error(`
        不合法的 commit 消息格式。
        请查看 git commit 提交规范：https://github.com/woai3c/Front-end-articles/blob/master/git%20commit%20style.md
    `);

    process.exit(1);
}
```

各个钩子的含义：

-   "pre-commit": "npm run lint"，在 git commit 前执行 npm run lint 检查代码格式。
-   "commit-msg": "node script/verify-commit.js"，在 git commit 时执行脚本 verify-commit.js 验证 commit 消息。如果不符合脚本中定义的格式，将会报错。
-   "pre-push": "npm test"，在你执行 git push 将代码推送到远程仓库前，执行 npm test 进行测试。如果测试失败，将不会执行这次推送。

## 项目规范

主要是项目文件的组织方式和命名方式。

用我们的 Vue 项目举个例子:

```
├─public
├─src
├─test
```

一个项目包含 public（公共资源，不会被 webpack 处理）、src（源码）、test（测试代码），其中 src 目录，又可以细分为:

```
├─api （接口）
├─assets （静态资源）
├─components （公共组件）
├─styles （公共样式）
├─router （路由）
├─store （vuex 全局数据）
├─utils （工具函数）
└─views （页面）
```

## 单元测试 UT

-   根据正确性写测试，即正确的输入应该有正常的结果。
-   根据异常写测试，即错误的输入应该是错误的结果。

1. 对一个函数做测试
2. 对一个类做测试
3. 对一个组件做测试

#### TDD 测试驱动开发

TDD（Test-Driven Development）就是根据需求提前把测试代码写好，然后根据测试代码实现功能。

## 部署 Deploy

#### 手动部署

#### 自动部署

持续部署（Continuous Deployment）：

-   轮询：构建软件每隔一段时间自动执行打包、部署操作。
-   监听 webhook 事件：webhook 钩子函数，就是在你的构建软件上进行设置，监听某一个事件（一般是监听 push 事件），当事件触发时，自动执行定义好的脚本。

## 监控

监控，又分性能监控和错误监控，它的作用是预警和追踪定位问题

#### 性能监控

性能监控一般利用 window.performance 来进行数据采集

> Performance 接口可以获取到当前页面中与性能相关的信息，它是 High Resolution Time API 的一部分，同时也融合了 Performance Timeline API、Navigation Timing API、 User Timing API 和 Resource Timing API。

这个 API 的属性 timing，包含了页面加载各个阶段的起始及结束时间:

```js
timing: {
        // 同一个浏览器上一个页面卸载(unload)结束时的时间戳。如果没有上一个页面，这个值会和fetchStart相同。
	navigationStart: 1543806782096,

	// 上一个页面unload事件抛出时的时间戳。如果没有上一个页面，这个值会返回0。
	unloadEventStart: 1543806782523,

	// 和 unloadEventStart 相对应，unload事件处理完成时的时间戳。如果没有上一个页面,这个值会返回0。
	unloadEventEnd: 1543806782523,

	// 第一个HTTP重定向开始时的时间戳。如果没有重定向，或者重定向中的一个不同源，这个值会返回0。
	redirectStart: 0,

	// 最后一个HTTP重定向完成时（也就是说是HTTP响应的最后一个比特直接被收到的时间）的时间戳。
	// 如果没有重定向，或者重定向中的一个不同源，这个值会返回0.
	redirectEnd: 0,

	// 浏览器准备好使用HTTP请求来获取(fetch)文档的时间戳。这个时间点会在检查任何应用缓存之前。
	fetchStart: 1543806782096,

	// DNS 域名查询开始的UNIX时间戳。
        //如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和fetchStart一致。
	domainLookupStart: 1543806782096,

	// DNS 域名查询完成的时间.
	//如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
	domainLookupEnd: 1543806782096,

	// HTTP（TCP） 域名查询结束的时间戳。
        //如果使用了持续连接(persistent connection)，或者这个信息存储到了缓存或者本地资源上，这个值将和 fetchStart一致。
	connectStart: 1543806782099,

	// HTTP（TCP） 返回浏览器与服务器之间的连接建立时的时间戳。
        // 如果建立的是持久连接，则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。
	connectEnd: 1543806782227,

	// HTTPS 返回浏览器与服务器开始安全链接的握手时的时间戳。如果当前网页不要求安全连接，则返回0。
	secureConnectionStart: 1543806782162,

	// 返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的时间戳。
	requestStart: 1543806782241,

	// 返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的时间戳。
        //如果传输层在开始请求之后失败并且连接被重开，该属性将会被数制成新的请求的相对应的发起时间。
	responseStart: 1543806782516,

	// 返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时
        //（如果在此之前HTTP连接已经关闭，则返回关闭时）的时间戳。
	responseEnd: 1543806782537,

	// 当前网页DOM结构开始解析时（即Document.readyState属性变为“loading”、相应的 readystatechange事件触发时）的时间戳。
	domLoading: 1543806782573,

	// 当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为“interactive”、相应的readystatechange事件触发时）的时间戳。
	domInteractive: 1543806783203,

	// 当解析器发送DOMContentLoaded 事件，即所有需要被执行的脚本已经被解析时的时间戳。
	domContentLoadedEventStart: 1543806783203,

	// 当所有需要立即执行的脚本已经被执行（不论执行顺序）时的时间戳。
	domContentLoadedEventEnd: 1543806783216,

	// 当前文档解析完成，即Document.readyState 变为 'complete'且相对应的readystatechange 被触发时的时间戳
	domComplete: 1543806783796,

	// load事件被发送时的时间戳。如果这个事件还未被发送，它的值将会是0。
	loadEventStart: 1543806783796,

	// 当load事件结束，即加载事件完成时的时间戳。如果这个事件还未被发送，或者尚未完成，它的值将会是0.
	loadEventEnd: 1543806783802
}
```

```js
// 重定向耗时
redirect: timing.redirectEnd - timing.redirectStart,
// DOM 渲染耗时
dom: timing.domComplete - timing.domLoading,
// 页面加载耗时
load: timing.loadEventEnd - timing.navigationStart,
// 页面卸载耗时
unload: timing.unloadEventEnd - timing.unloadEventStart,
// 请求耗时
request: timing.responseEnd - timing.requestStart,
// 获取性能信息时当前时间
time: new Date().getTime()
```

#### 错误监控

现在能捕捉的错误有三种。

-   资源加载错误，通过 addEventListener('error', callback, true) 在捕获阶段捕捉资源加载失败错误。
-   js 执行错误，通过 window.onerror 捕捉 js 错误。
-   promise 错误，通过 addEventListener('unhandledrejection', callback)捕捉 promise 错误，但是没有发生错误的行数，列数等信息，只能手动抛出相关错误信息。

## 用户信息收集

navigator
使用 window.navigator 可以收集到用户的设备信息，操作系统，浏览器信息...

UV（Unique visitor）
是指通过互联网访问、浏览这个网页的自然人。访问您网站的一台电脑客户端为一个访客。00:00-24:00 内相同的客户端只被计算一次。一天内同个访客多次访问仅计算一个 UV。在用户访问网站时，可以生成一个随机字符串+时间日期，保存在本地。在网页发生请求时（如果超过当天 24 小时，则重新生成），把这些参数传到后端，后端利用这些信息生成 UV 统计报告。

PV（Page View）
即页面浏览量或点击量，用户每 1 次对网站中的每个网页访问均被记录 1 个 PV。用户对同一页面的多次访问，访问量累计，用以衡量网站用户访问的网页数量。

页面停留时间

-   传统网站
    用户在进入 A 页面时，通过后台请求把用户进入页面的时间捎上。过了 10 分钟，用户进入 B 页面，这时后台可以通过接口捎带的参数可以判断出用户在 A 页面停留了 10 分钟。
-   SPA
    可以利用 router 来获取用户停留时间，拿 Vue 举例，通过 router.beforeEach destroyed 这两个钩子函数来获取用户停留该路由组件的时间。

浏览深度
通过 document.documentElement.scrollTop 属性以及屏幕高度，可以判断用户是否浏览完网站内容。

页面跳转来源
通过 document.referrer 属性，可以知道用户是从哪个网站跳转而来。
