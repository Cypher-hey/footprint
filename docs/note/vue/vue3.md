##

Vue.js 3.0 核心源码解析

#### 组件渲染：vnode 到真实 DOM 的转变

组件是一个抽象的概念，它是对一棵 DOM 树的抽象

从表现上来看，组件的模板决定了组件生成的 DOM 标签，而在 Vue.js 内部，一个组件想要真正的渲染生成 DOM，还需要经历“创建 vnode - 渲染 vnode - 生成 DOM” 这几个步骤

> 应用程序初始化

一个组件可以通过“模板加对象描述”的方式创建，整个组件树是由根组件开始渲染的

```js
// 在 Vue.js 2.x 中，初始化一个应用的方式如下
import Vue from 'vue';
import App from './App';
const app = new Vue({
    render: (h) => h(App)
});
app.$mount('#app');

// 在 Vue.js 3.0 中，初始化一个应用的方式如下
import {createApp} from 'vue';
import App from './app';
const app = createApp(App);
app.mount('#app');

// 本质上都是把 App 组件挂载到 id 为 app 的 DOM 节点上。
```

vnode 本质上是用来描述 DOM 的 JavaScript 对象，它在 Vue.js 中可以描述不同类型的节点，比如普通元素节点、组件节点等。

组件 vnode 其实是`对抽象事物的描述`

> vnode 有什么优势呢？为什么一定要设计 vnode 这样的数据结构呢？

-   首先是`抽象`，引入 vnode，可以把渲染过程抽象化，从而使得组件的抽象能力也得到提升。

-   其次是`跨平台`，因为 patch vnode 的过程不同平台可以有自己的实现，基于 vnode 再做服务端渲染、Weex 平台、小程序平台的渲染都变得容易了很多。

不过这里要特别注意，使用 vnode 并不意味着不用操作 DOM 了，很多同学会误以为 vnode 的性能一定比手动操作原生 DOM 好，这个其实是不一定的。

因为，首先这种基于 vnode 实现的 MVVM 框架，在每次 render to vnode 的过程中，渲染组件会有一定的 JavaScript 耗时，特别是大组件，比如一个 1000 _ 10 的 Table 组件，render to vnode 的过程会遍历 1000 _ 10 次去创建内部 cell vnode，整个耗时就会变得比较长，加上 patch vnode 的过程也会有一定的耗时，当我们去更新组件的时候，用户会感觉到明显的卡顿。虽然 diff 算法在减少 DOM 操作方面足够优秀，但最终还是免不了操作 DOM，所以说性能并不是 vnode 的优势。
