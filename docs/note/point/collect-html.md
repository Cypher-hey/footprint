#### 语义化的理解？

1. 去掉或者丢失样式的时候能够让页面呈现出清晰的结构
2. 有利于 SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；
3. 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页；
4. 便于团队开发和维护，语义化更具可读性，是下一步吧网页的重要动向，遵循 W3C 标准的团队都遵循这个标准，可以减少差异化。

#### Doctype 作用? 严格模式与混杂模式如何区分？它们有何意义?

```
（1）<!DOCTYPE> 声明位于文档中的最前面，处于 <html> 标签之前。告知浏览器以何种模式来渲染文档。

（2）严格模式的排版和 JS 运作模式是 以该浏览器支持的最高标准运行。

（3）在混杂模式中，页面以宽松的向后兼容的方式显示。模拟老式浏览器的行为以防止站点无法工作。

（4）DOCTYPE 不存在或格式不正确会导致文档以混杂模式呈现。

```

Doctype 文档类型:

```
该标签可声明三种 DTD 类型，分别表示严格版本、过渡版本以及基于框架的 HTML 文档。
 HTML 4.01 规定了三种文档类型：Strict、Transitional 以及 Frameset。
 XHTML 1.0 规定了三种 XML 文档类型：Strict、Transitional 以及 Frameset。
Standards （标准）模式（也就是严格呈现模式）用于呈现遵循最新标准的网页，而 Quirks
 （包容）模式（也就是松散呈现模式或者兼容模式）用于呈现为传统浏览器而设计的网页。
```

#### HTML 与 XHTML——二者有什么区别

```
区别：
1.所有的标记都必须要有一个相应的结束标记
2.所有标签的元素和属性的名字都必须使用小写
3.所有的XML标记都必须合理嵌套
4.所有的属性必须用引号""括起来
5.把所有<和&特殊符号用编码表示
6.给所有属性赋一个值
7.不要在注释内容中使“--”
8.图片必须有说明文字
```