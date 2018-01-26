## 传统盒模型布局方式

传统布局方式s是通过盒模型，使用 display 属性（文档流布局） + position 属性（定位布局） + float属性（浮动布局）。

#### 文档流布局

最基本的布局方式，就是按照文档的顺序一个一个显示出来，块元素独占一行，行内元素共享一行。

#### 浮动布局

浮动方式布局就是使用 `float` 属性，使元素脱离文档流，浮动起来。

#### 定位布局

我们也可以通过 `position` 属性来进行定位。

## flex 布局

仅仅通过上述的三种传统布局方式还是有一些缺陷，比如我们不能只使用一个属性来实现垂直居中布局，所以就产生了第四种布局方式：flex 布局。

#### flex -起源

<p class="tip">2009年，由W3C 提出了一种新的方案----Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。

Flex 是 `Flexible Box` 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。</p>

flex 是一种新型的布局方式，使用该布局方式可以实现几乎所有你想要的效果。但是要注意其浏览器的兼容性，flex `只支持 ie 10+`。

#### flex -使用

flex 的使用方法很简单，只需要将其 display 属性设置为 flex 就可以，也可以设置行内的 flex，记得 Webkit 内核的浏览器，必须加上 -webkit 前缀。注意，当设为 Flex 布局以后，`子元素的 float、clear 和 vertical-align 属性将失效。`

`js

`

<p class="tip">
在 flex 中，最核心的概念就是容器和轴，所有的属性都是围绕容器和轴设置的。其中，容器分为父容器和子容器。轴分为主轴和交叉轴（`主轴默认为水平方向，方向向右，交叉轴为主轴顺时针旋转 90°`）。
</p>

###### 父容器属性

父容器上有六个属性

* flex-direction：主轴的方向。

```js
  * flex-direction: row;                // 默认值，主轴为水平方向，起点在左端。
  
  * flex-direction: row-reverse;        // 主轴为水平方向，起点在右端。
  
  * flex-direction: column;             // 主轴为垂直方向，起点在上。
  
  * flex-direction: column-reverse;     // 主轴为垂直方向，起点在下。
```
* flex-wrap：超出父容器子容器的排列样式（决定子容器如果在一条轴线排不下时，如何换行。）。
```js 
  * flex-wrap: nowrap;          // 默认，不换行
  
  * flex-wrap: wrap;            // 换行，第一行在上方。
  
  * flex-wrap: wrap-reverse     // 换行，第一行在下方。
```
* flex-flow：flex-direction 属性和 flex-wrap 属性的简写形式。
```js
  * flex-flow: <flex-direction> || <flex-wrap>;（默认值为 row nowrap。）
```
* justify-content：子容器在主轴的排列方向。
```js  
  * justify-content: flex-start;      // 默认，左对齐
  
  * justify-content: flex-end;        // 右对齐
  
  * justify-content: center;          // 居中
  
  * justify-content: space-between;   // 两端对齐，项目之间的间隔都相等。
  
  * justify-content: space-around;    // 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
```
* align-items：子容器在交叉轴的排列方向（具体的对齐方式与交叉轴的方向有关）。
```js 
  * align-items: flex-start;    // 交叉轴的起点对齐。
  
  * align-items: flex-end;      // 交叉轴的终点对齐。
  
  * align-items: center;        // 交叉轴的中点对齐。
  
  * align-items: baseline;      // 项目的第一行文字的基线对齐。
  
  * align-items: stretch;       // 默认，如果项目未设置高度或设为auto，将占满整个容器的高度。
```
* align-content：多根轴线的对齐方式（只有一根轴线，该属性不起作用）。
```js
  * align-content: flex-start;   // 与交叉轴的起点对齐
  
  * align-content; flex-end;     // 与交叉轴的终点对齐。
  
  * align-content: center;       // 与交叉轴的中点对齐。
  
  * align-content: space-between;// 与交叉轴两端对齐，轴线之间的间隔平均分布。
  
  * align-content: space-around; // 每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
  
  * align-content: stretch;     // 默认 轴线占满整个交叉轴。
```
###### 子容器属性

子容器也有 6 个属性：


* order：子容器的排列顺序（数值越小，排列越靠前，默认为 0）
```js
  * order: num; 
```
* flex-grow：子容器剩余空间的拉伸比例，按照该比例给子容器分配空间。
```js
  * flex-grow: <number>; /* default 0 */
```
* flex-shrink：子容器超出空间的压缩比例
```js
  * flex-shrink: <number>; /* default 0 */
```
* flex-basis：子容器在不伸缩情况下的原始尺寸（主轴为横向时代表宽度，主轴为纵向时代表高度）
```js
  * flex-basis: <length> | auto; /* default auto */
```
* flex：子元素的 flex 属性是 flex-grow,flex-shrink 和 flex-basis 的简写,两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
```js
  * flex：<number> ,(<number>, （ auto ）) /* default 0 1 auto */
```
* align-self：允许单个项目有与其他项目不一样的对齐方式，可覆盖父容器 align-items 属性。默认值为 auto，表示继承父元素的 align-items属性，如果没有父元素，则等同于 stretch。
```js
  * align-self: auto;             // 继承父元素的 align-items 属性
  
  * align-self: flex-start;       // 交叉轴的起点对齐。
  
  * align-self: flex-end;         // 交叉轴的终点对齐。
  
  * align-self: center;           // 交叉轴的中点对齐。
  
  * align-self: baseline;         // 项目的第一行文字的基线对齐。
  
  * align-self: stretch;          // 默认，如果项目未设置高度或设为auto，将占满整个容器的高度。
```

## grid 网格布局

flex 布局虽然强大，但是只能是一维布局，如果要进行二维布局，那么我们还需要使用 grid。

grid 布局又称为“网格布局”，可以`实现二维布局方式`，和之前的 表格table布局差不多，然而，这是`使用 CSS 控制`的，不是使用 HTML 控制的，和 table 布局不同的是，grid 布局不需要在 HTML 中使用特定的标签布局，所有的布局都是在 CSS 中完成的，你可以随意定义你的 grid 网格。同时还可以依赖于媒体查询根据不同的上下文得新定义布局。

## 常用的 CSS 布局

#### 水平居中

先看子元素是固定宽度还是宽度未知

###### 固定宽度

使用绝对定位：
1. margin + auto
```js
magin:0 auto；
```

2. margin
```js
.container{
    width: 300px;
    height: 200px;
    background: pink;
    position: relative;
}
.inner{
    width: 100px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -25px;
    margin-left: -50px;
    background: #fff;
    text-align: center;
}
```

3. transform (适用于 ie9+)
```js
.container{
    width: 300px;
    height: 200px;
    background: pink;
    position: relative;
}
.inner{
    width: 100px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    text-align: center;
}
```

###### 宽度未知

1. 将子元素设置为行内元素，然后父元素设置 text-align: center:
```js
.container{
    width: 300px;
    height: 200px;
    background: pink;
    position: relative;
    text-align: center;
}
.inner{
    display: inline-block;
}
```

2.  使用flex布局，让子元素在主轴上的对齐方式设置为居中(justify-content: center):
```js
.container{
    width: 250px;
    height: 200px;
    background: pink;
    display: flex;
    justify-content: center;
    padding: 20px;
}
.inner{
    background: #fff;
    width: 50px;
    height: 150px;
    margin-left: 10px;
}
```

#### 垂直居中

###### 单行行内元素

1. 将子元素的行高设置等于高度(height == line-height)
```js
.container {
    height: 400px;
    background: pink;
}
.inner{
    display: inline-block;
    height: 200px;
    line-height: 200px;
}
```

###### 多行元素

1.table-cell
```js
.container {
  width: 200px;
  height: 400px;
  background: pink;
  position: absolute;
  display: table;
  vertical-align:middle;
}

.inner{
  display: table-cell;
  vertical-align:middle;
}
```

2.设置一个空的行内元素，高度和父元素相等，并且设置垂直居中的属性。
```js
只是用与所有的行内元素的宽度和不超过父元素的宽度的情况:

p{
  display: inline-block;
  height: 100%;
  line-height: 100%;
  vertical-align: middle;
  font-size: 0;
}
```

3.使用flex布局，让子元素在副轴(交叉轴)上的对齐方式设置为垂直(item-items: center)


总结一下其中的原理：

* 我们要实现水平或者垂直居中，应该从两方面下手：元素自带居中的效果或者强制让其显示在中间。

* 所以我们先考虑，哪些元素有自带的居中效果，最先想到的应该就是 text-align:center 了，但是这个只对行内元素有效，所以我们要使用 text-align:center 就必须将子元素设置为 display: inline; 或者 display: inline-block;；

* 接下来我们可能会想既然有 text-align 那么会不会对应也有自带垂直居中的呢，答案是有的 vertical-align:，我一直不是很喜欢使用这个属性，因为十次用，9.9 次都没有垂直居中，一度让我怀疑人生。现在貌似也搞得不是很清楚，看了 张鑫旭的文章 居然看得也不是很懂，笑哭。目前就在 table 中设置有效，因为 table 元素 的特性，打娘胎里面带的就是好用。还有一种可以有效的方式是前面提到的空元素的方式，不过感觉多设置一个元素还不如使用 table。

* 还有一只设置垂直居中的是将行内元素的 line-height 和 height 设置为相同（只适用于单行行内元素）
固定宽度或者固定高度的情况个人认为设置水平垂直居最简单，可以直接使用绝对定位。使用绝对定位就是子元素相对于父元素的位置，所以将父元素设置 position:reletive 对应的子元素要设置 position:absolute，然后使用 top:50%;left:50%，将子元素的左上角和父元素的中点对齐，之后再设置偏移 margin-top: 1/2 子元素高度;margin-left: 1/2 子元素宽度;。这种方式也很好理解。

* 上面的绝对定位方法只要将 margin 改为 transform 就可以实现宽度和高度未知的居中（兼容性啊兄弟们！(ಥ_ಥ)）transformX:50%;transformY:50%；



