#### display:none 和 visibility:hidden 的区别

```
display:none 隐藏对应的元素，在文档布局中不再给它分配空间，它各边的元素会合拢，就当他从来不存在。

visibility:hidden 隐藏对应的元素，但是在文档布局中仍保留原来的空间。
```

#### CSS 中 link 和@import 的区别

```
(1) link属于HTML标签，而@import是CSS提供的;
(2) 页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载;
(3) import只在IE5以上才能识别，而link是HTML标签，无兼容问题;
(4) link方式的样式的权重 高于@import的权重.
```

#### position:absolute 和 float 属性的异同

```
共同点：
对内联元素设置`float`和`absolute`属性，可以让元素脱离文档流，并且可以设置其宽高。

不同点：
float 仍会占据位置，position 会覆盖文档流中的其他元素。
```

#### box-sizing 属性

`box-sizing` 属性主要用来控制元素的盒模型的解析模式。默认值是 content-box。

-   `content-box`：让元素维持 W3C 的标准盒模型。元素的宽度/高度由 border + padding + content 的宽度/高度决定，设置 width/height 属性指的是 `content` 部分的宽/高

-   `border-box`：让元素维持 IE 传统盒模型（IE6 以下版本和 IE6~7 的怪异模式）。设置 width/height 属性指的是 `border + padding + content`

标准浏览器下，按照 W3C 规范对盒模型解析，一旦修改了元素的边框或内距，就会影响元素的盒子尺寸，就不得不重新计算元素的盒子尺寸，从而影响整个页面的布局。

#### CSS 选择符有哪些？哪些属性可以继承？优先级算法如何计算？CSS3 新增伪类有那些？

```
1.id选择器（ # myid）
2.类选择器（.myclassname）
3.标签选择器（div, h1, p）
4.相邻选择器（h1 + p）
5.子选择器（ul > li）
6.后代选择器（li a）
7.通配符选择器（ * ）
8.属性选择器（a[rel = "external"]）
9.伪类选择器（a: hover, li:nth-child）
```

-   可继承的样式：font-size font-family color, text-indent;

-   不可继承的样式：border padding margin width height ;

-   优先级就近原则，同权重情况下样式定义最近者为准;

-   载入样式以最后载入的定位为准;

优先级为:

```
!important >  id > class > tag

important 比 内联优先级高,但内联比 id 要高
```

CSS3 新增伪类举例：

```
p:first-of-type 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
p:last-of-type  选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
p:only-of-type  选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
p:only-child    选择属于其父元素的唯一子元素的每个 <p> 元素。
p:nth-child(2)  选择属于其父元素的第二个子元素的每个 <p> 元素。
:enabled  :disabled 控制表单控件的禁用状态。
:checked        单选框或复选框被选中。
```

#### position 的值， relative 和 absolute 分别是相对于谁进行定位的？

```
absolute
    生成绝对定位的元素， 相对于最近一级的 定位不是 static 的父元素来进行定位。

fixed （老IE不支持）
    生成绝对定位的元素，相对于浏 览器窗口进行定位。

relative
    生成相对定位的元素，相对于其在普通流中的位置进行定位。

static
    默认值。没有定位，元素出现在正常的流中
```

#### CSS3 有哪些新特性？

```
CSS3实现圆角（border-radius），阴影（box-shadow），
对文字加特效（text-shadow、），线性渐变（gradient），旋转（transform）
transform:rotate(9deg) scale(0.85,0.90) translate(0px,-30px) skew(-9deg,0deg);//旋转,缩放,定位,倾斜
增加了更多的CSS选择器  多背景 rgba
在CSS3中唯一引入的伪元素是::selection.
媒体查询，多栏布局
border-image
```

#### 对 BFC 规范的理解？

`BFC，块级格式化上下文`，一个创建了新的 BFC 的盒子是独立布局的，`盒子里面的子元素的样式不会影响到外面的元素`。在同一个 BFC 中的两个毗邻的块级盒在垂直方向（和布局方向有关系）的 margin 会发生折叠。
（W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行布局，以及与其他元素的关系和相互作用。）

#### 解释下 CSS sprites，以及你要如何在页面或网站中使用它。

CSS Sprites 其实就是把网页中一些背景图片整合到一张图片文件中，再利用 CSS 的“background-image”，“background- repeat”，“background-position”的组合进行背景定位，background-position 可以用数字能精确的定位出背景图片的位置。这样可以减少很多图片请求的开销，因为请求耗时比较长；请求虽然可以并发，但是也有限制，一般浏览器都是 6 个。对于未来而言，就不需要这样做了，因为有了`http2`。


#### HexColor

