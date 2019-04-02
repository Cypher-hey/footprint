## BOX

* 概念：CSS布局的基本单位
* 解释：BOX是CSS布局的基本单位，元素的类型和dispaly属性，决定了这个元素的的BOX类型，BOX的类型分为：
	* 【block-level box】
		* display属性值为：block、list-item、table 的元素会生成 block-levle box，并且参与 block formatting context 布局
	* 【inline-level box】
		* display属性值为：inline、inline-block、inline-table 的元素会生成 inline-level box，并参与 inline formatting context 布局
	* 【run-in box】
		* CSS3中定义

## Formatting Context

* 概念：Formatting Context 【格式化上下文】
* 解释：它是一个决定如何渲染文档的容器，对应了页面中的一块渲染区域，有一套渲染规则。常见的 Formatting Context 如下：
	* 【Block formatting context】(BFC)
	* 【Inline formatting context】(IFC) 
	* 【Grid formatting context】(GFC)
	* 【Flex formatting context】(FFC)
* 补充：FC 指的是在**文档流（定位流、浮动流、普通流）**三种中的`普通流`

## 三种文档流的定位方案

**常规流(Normal flow)**

* 在常规流中，盒一个接着一个排列;

* 在块级格式化上下文里面， 它们竖着排列；

* 在行内格式化上下文里面， 它们横着排列;

* 当position为static或relative，并且float为none时会触发常规流；

* 对于静态定位(static positioning)，position: static，盒的位置是常规流布局里的位置；

* 对于相对定位(relative positioning)，position: relative，盒偏移位置由top、bottom、left、right属性定义。即使有偏移，仍然保留原有的位置，其它常规流不能占用这个位置。

**浮动(Floats)**

* 左浮动元素尽量靠左、靠上，右浮动同理

* 这导致常规流环绕在它的周边，除非设置 clear 属性

* 浮动元素不会影响块级元素的布局

* 但浮动元素会影响行内元素的布局，让其围绕在自己周围，撑大父级元素，从而间接影响块级元素布局

* 最高点不会超过当前行的最高点、它前面的浮动元素的最高点

* 不超过它的包含块，除非元素本身已经比包含块更宽

* 行内元素出现在左浮动元素的右边和右浮动元素的左边，左浮动元素的左边和右浮动元素的右边是不会摆放浮动元素的

**绝对定位(Absolute positioning)**

* 绝对定位方案，盒从常规流中被移除，不影响常规流的布局；

* 它的定位相对于它的包含块，相关CSS属性：top、bottom、left、right；

* 如果元素的属性position为absolute或fixed，它是绝对定位元素；

* 对于position: absolute，元素定位将相对于上级元素中最近的一个relative、fixed、absolute，如果没有则相对于body；

注意第四条：

定位元素相对于父元素absolute relative，如果没有则相对于body是有问题的。当给body一个2000的高度，给子元素bottom:0 试试，具体原因需要理解“包含块”，这个概念

## BFC

创建一个独立的渲染区域，并规定了 block-level box 如何布局，且与这个区域外部毫不相关

>MDN上的解释：BFC是Web页面 CSS 视觉渲染的一部分，用于决定块盒子的布局及浮动相互影响范围的一个区域。

BFC布局规则如下(注意BFC只影响块级盒)：

* 内部Box按垂直方向一个接一个的放置

* Box垂直方向的距离由margin值决定，并且属于同一个BFC的两个相邻的box的margin值会重叠

* 每个元素的 margin-box 的左边与被包含块 border-box 的左边相接触

* BFC的区域不会与浮动盒子重叠

* BFC就是一个隔绝的容器，容器里面的子元素不影响外面元素的布局，反之亦然

* 计算BFC的高度时，浮动元素也参与计算

## BFC 触发

> Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.

**`会为其内容创建新的BFC的元素`**

* 根元素，即 `<html>`

* `float` 属性值不为 none, 即为 `left`, `right`

* `position` 属性的值为 `absolute` 或 `fixed`

* `overflow` 属性值不为 visible, 即为 `auto`, `scroll`, `hidden`

* `display` 属性值为 `inline-block`, `table-cell`, `table-caption`, `table`, `inline-table`, `flex`, `inline-flex`, `grid`, `inline-grid`

注意 display:table也可以生成BFC的原因在于Table会默认生成一个匿名的table-cell，是这个匿名的table-cell生成了BFC。

**注意**：

一个BFC的范围包含创建该上下文元素的所有子元素，但`不包括创建了新BFC的子元素的内部元素`。这从另一方角度说明，一个元素不能同时存在于两个BFC中。因为如果一个元素能够同时处于两个BFC中，那么就意味着这个元素能与两个BFC中的元素发生作用，就违反了BFC的隔离作用。

## BFC 约束规则

浏览器对BFC区域的约束规则：

1. 生成BFC元素的子元素会一个接一个的放置。

2. 垂直方向上他们的起点是一个包含块的顶部，两个相邻子元素之间的垂直距离取决于元素的margin特性。在BFC中相邻的块级元素的外边距会折叠(Mastering margin collapsing)。

3. 生成BFC元素的子元素中，每一个子元素左外边距与包含块的左边界相接触（对于从右到左的格式化，右外边距接触右边界），即使浮动元素也是如此（尽管子元素的内容区域会由于浮动而压缩），除非这个子元素也创建了一个新的BFC（如它自身也是一个浮动元素）。

规则解读：

1. 内部的Box会在垂直方向上一个接一个的放置

2. 内部的Box垂直方向上的距离由margin决定(值为较大的)。（完整的说法是：属于同一个BFC的两个相邻Box的margin会发生折叠，不同BFC不会发生折叠。）

3. 每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。（这说明`BFC中子元素不会超出他的包含块`，而position为absolute的元素可以超出他的包含块边界）

4. BFC的区域不会与float的元素区域重叠

5. 计算BFC的高度时，浮动子元素也参与计算

## BFC 应用

BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然。我们可以利用BFC的这个特性来做很多事。

* 自适应两栏布局
	* 利用的是 BFC 不与浮动元素重叠的特性
* 清除浮动
	* 利用BFC内浮动元素也参与BFC高度计算的特性
* 解决margin折叠(传递)
	* 子元素的margin-top传递到父级
* 防止margin重叠
	* 因为BFC内相邻元素的margin值会重叠，如果给其中一个元素包一层，并设置为BFC，又因为BFC内子元素的布局与外部元素互不影响的特性，就可以解决重叠的问题

## IE haslayout

`IE` 是个奇葩，自己搞一个叫做 `haslayout` 的东西，类似 `BFC`，一般在 `IE` 中显示有问题的东西都可以通过触发 `haslayout` 来解决，触发方法有很多：

* `zoom` 属性设置为除 `normal` 以外的值
* `width/height` 除 `auto` 以外的值
* `float` 除 `none` 以外的值

reference

[CSS中重要的BFC](https://juejin.im/post/5b51ee276fb9a04f86062cea)