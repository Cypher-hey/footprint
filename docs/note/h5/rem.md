#### Rem与em

rem和em很容易混淆，其实两个都是css的单位，并且也都是相对单位，先有的em，css3才引入rem，在介绍rem之前，我们先来了解下em

em取值分为两种情况:

* 作为font-size的单位时，其代表父元素的字体大小
* 作为其他属性单位时，代表自身字体大小


rem取值分为两种情况:

* 作用于非根元素时，相对于根元素字体大小
* 作用于根元素字体大小时，相对于其初始字体大小

em就是为字体和行高而生的，有些时候子元素字体就应该相对于父元素，元素行高就应该相对于字体大小；而rem的有点在于统一的参考系

#### Rem布局原理

rem布局的本质是等比缩放，一般是基于宽度

#### 比Rem更好的方案

想让页面元素随着页面宽度变化，需要一个新的单位x，x等于屏幕宽度的百分之一，css3带来了rem的同时，也带来了vw和vh

`vw —— 视口宽度的 1/100；vh —— 视口高度的 1/100 —— MDN`

```js
/* rem方案 */
html {font-size: width / 100}
p {width: 15.625rem}
// font-size 计算
document.documentElement.style.fontSize = document.documentElement.clientWidth / 100 + 'px'; 

/* vw方案 */
p {width: 15.625vw}

/* vw与rem方案结合 */
html {fons-size: 1vw} /* 1vw = width / 100 */
p {width: 15.625rem}
```

vw缺点：

1. vw的兼容性不如rem好
2. 在使用弹性布局时，一般会限制最大宽度，比如在pc端查看我们的页面，此时vw就无法力不从心了，因为除了width有max-width，其他单位都没有，而rem可以通过控制html根元素的font-size最大值，而轻松解决这个问题

#### Rem局限性

###### 字体大小并不能使用rem

字体的大小和字体宽度，并不成线性关系，所以字体大小不能使用rem；由于设置了根元素字体的大小，会影响所有没有设置字体大小的元素，因为字体大小是会继承的，可以在body上做字体修正

```js
//用户的默认字体大小
html {fons-size: width / 100}
body {font-size: 16px} 

//字体的大小通过修改body字体的大小来实现响应式,同时所有设置字体大小的地方都是用em单位
@media screen and (min-width: 320px) {
	body {font-size: 16px}
}
@media screen and (min-width: 481px) and (max-width:640px) {
	body {font-size: 18px}
}
@media screen and (min-width: 641px) {
	body {font-size: 20px}
}

p {font-size: 1.2em}
p a {font-size: 1.2em}
```

###### 用户在PC端浏览，页面过宽

```js
//设置一个最大宽度，大于这个宽度的话页面居中，两边留白
var clientWidth = document.documentElement.clientWidth;
clientWidth = clientWidth < 780 ? clientWidth : 780;
document.documentElement.style.fontSize = clientWidth / 100 + 'px';

// 设置body的宽度为100rem，并水平居中
body { margin: auto; width: 100rem } 
```

###### 用户禁用js
```js
// 首先可以添加noscript标签提示用户
<noscript>开启JavaScript，获得更好的体验</noscript> 

// 给html添加一个320时的默认字体大小，保证页面可以显示
html {fons-size: 3.2px} 

// 如果你想要更好的体验，不如添加媒体查询

@media screen and (min-width: 320px) {
	html {font-size: 3.2px}
}
@media screen and (min-width: 481px) and (max-width:640px) {
	html {font-size: 4.8px}
}
@media screen and (min-width: 641px) {
	html {font-size: 6.4px}
}
```

