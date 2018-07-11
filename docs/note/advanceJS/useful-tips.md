## 按位非运算符(~)及双非(~~)

#### 按位非运算符 “~”

w3c的定义：

>位运算 NOT 由否定号（~）表示，它是 ECMAScript 中为数不多的与二进制算术有关的运算符之一。

>位运算 NOT 是三步的处理过程：

>1. 把运算数转换成 32 位数字
>2. 把二进制数转换成它的二进制反码（0->1, 1->0）
>3. 把二进制数转换成浮点数

简单的理解，对任一数值 x 进行按位非操作的结果为 `-(x + 1)`:

```js
console.log('~null: ', ~null);       // => -1
console.log('~undefined: ', ~undefined);  // => -1
console.log('~0: ', ~0);          // => -1
console.log('~{}: ', ~{});         // => -1
console.log('~[]: ', ~[]);         // => -1
console.log('~(1/0): ', ~(1/0));      // => -1
console.log('~false: ', ~false);      // => -1
console.log('~true: ', ~true);       // => -2
console.log('~1.2543: ', ~1.2543);     // => -2
console.log('~4.9: ', ~4.9);       // => -5
console.log('~(-2.999): ', ~(-2.999));   // => 1
```

~value的使用：

```js
//判断数值中是否有某元素时，以前这样判断：
if(arr.indexOf(ele) > -1){...} //易读

//现在可以这样判断，两者效率：
if(~arr.indexOf(ele)){...} //简洁
```

#### 按位双非运算符 “~~”

~~x就为 `-(-(x+1) + 1)`

```js
console.log('~~null: ', ~~null);       // => 0
console.log('~~undefined: ', ~~undefined);  // => 0
console.log('~~0: ', ~~0);          // => 0
console.log('~~{}: ', ~~{});         // => 0
console.log('~~[]: ', ~~[]);         // => 0
console.log('~~(1/0): ', ~~(1/0));      // => 0
console.log('~~false: ', ~~false);      // => 0
console.log('~~true: ', ~~true);       // => 1
console.log('~~1.2543: ', ~~1.2543);     // => 1
console.log('~~4.9: ', ~~4.9);       // => 4
console.log('~~(-2.999): ', ~~(-2.999));   // => -2
```

~~value的使用：
```js
// 对于浮点数，~~value可以代替parseInt(value)，而且前者效率更高些

parseInt(-2.99) //-2
~~(-2.99) //-2
```

## !与!!

#### !!

```js
!5 === false // true

!!5 === true // true

var a; // a = undefined
var b=!!a; // !a是true，!!a则是false，所以b的值是false，而不再是undefined，也非其它值.
``` 

!!一般用来将后面的表达式强制转换为布尔类型的数据（boolean），也就是只能是true或者false;
因为javascript是弱类型的语言（变量没有固定的数据类型）所以有时需要强制转换为相应的类型.

类似的如：

```js
a=parseInt('1234')  // 显式转换

a='1234'-0 //转换为数字, 隐式转换

b=1234+'' //转换为字符串, 隐式转换

c=someObject.toString() //将对象转换为字符串, 显式转换
```

布尔型的转换，javascript约定规则为:

1. false、undefinded、null、0、'' 为 false

2. true、1、'somestring'、[Object] 为 true

** 对null与undefined等其他用隐式转换的值，用!操作符时都会产生true的结果，所以用两个感叹号的作用就在于将这些值转换为`“等价”`的布尔值; **

```js
var foo;  
alert(!foo);//undifined情况下，一个感叹号返回的是true;  
alert(!goo);//null情况下，一个感叹号返回的也是true;  
var o={flag:true};  
var test=!!o.flag;//等效于var test=o.flag||false;  
alert(test); // true
```
这段例子，演示了在undifined和null时，用一个感叹号返回的都是true,用两个感叹号返回的就是false,所以两个感叹号的作用就在于，如果明确设置了变量的值（非null/undifined/0/''等值),结果就会根据变量的实际值来返回，如果没有设置，结果就会返回false。

## == 与 ===

### == 比较

可以转自动换数据类型，undefined和null与其他数在进行相等判断时不进行类型转换。

The ECMAScript language types are Undefined, Null, Boolean, String, Symbol, Number, and Object. An ECMAScript language value is a value that is characterized by an ECMAScript language type.

0 == null // false (不满足前21条，跳到22，return false) [ECMAScript Spec](http://interglacial.com/javascript_spec/a-11.html#a-11.9.3)

1. undefined == null，且与其他类型比较时，都不会转化，即为false；

2. 基本类型比较。向Number转。NaN不等于任何。

3. 引用数据类型比较。比较指针地址。

4. 2和3之间比较，引用数据类型会先调用valueOf()方法，再调用toString方法(已经是String则不调)，然后调用Number()方法转为Number类型。需要注意的是Date类型会直接调用toString。
