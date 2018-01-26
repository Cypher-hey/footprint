## 避免使用 eval 或 Function 构造器

每次进行 `eval` 或调用 `Function` 构造器，脚本引擎都会启动一些机制来将字符串形式的源代码转换为可执行的代码。这通常会严重影响性能 —— 比如说，直接调用函数的性能是它的 100 倍。

`eval` 函数尤其糟糕，因为 eval `无法预知传递给它的字符串的内容`。代码是在调用 eval 的上下文档中解释，这就意味着编译器无法优化相关上下文，就会留给浏览器很多需要在运行时解释的内容。这就造成了额外的性能影响。

`Function` 构造器比 eval 要好一点，因为它不影响周围代码的使用，但它仍然相当缓慢。

## 改写 eval 与 Function

`eval` 不仅仅是低效，它几乎不用存在。多数使用它的情况都是另存为信息是通过字符串提供的，这些信息被假定用于 `eval`。下面的示例展示了一些常见的错误：

```js
function getProperty(oString) {
  var oReference;
  eval('oReference = test.prop.' + oString);
  return oReference;
}
```

这段代码完成了同样的功能，是它没有使用 `eval`：

```js
function getProperty(oString) {
  return test.prop[oString];
}
```

在 Opera9、Firefox 和 Internet Explorer 中，没有使用 eval 的代码比用了 eval 的代码快 95% 左右，在 Safari 中快 85% 左右。(注意这不包含调函数本身所需要的时间。)

`如果你需要函数，使用 function`

这个例子展示了使用 Function 构造器常见的用法：

```js
function addMethod(oObject, oProperty, oFunctionCode) {
  oObject[oProperty] = new Function(oFunctionCode);
}
addMethod(
  myObject,
  'rotateBy90',
  'this.angle = (this.angle + 90) % 360'
);
addMethod(
  myObject,
  'rotateBy60',
  'this.angle = (this.angle + 60) % 360'
);
```

下面的代码实现了同样的功能，但没有用 Function 构造林。它通过`匿名函数`实现，匿名函数可以像其它对象一样被引用：

```js
function addMethod(oObject, oProperty, oFunction) {
  oObject[oProperty] = oFunction;
}
addMethod(
  myObject,
  'rotateBy90',
  function() {
    this.angle = (this.angle + 90) % 360;
  }
);
addMethod(
  myObject,
  'rotateBy60',
  function() {
    this.angle = (this.angle + 60) % 360;
  }
);
```

## 不要使用 with

虽然 `with` 能给开发者带来便利，但它可能会影响性能。`with` 会在引用变量时为脚本引擎构造一个额外的作用域。仅此，会造成少许性能下降。然而，编译期并不能获知这个作用域的内容，所以编译器不会像优化普通的作用域(比如由函数创建的作用域)那样优化它。

有更多的方法给开发者提供使得，比如使用一个普通变量来引用对象，然后通过这个变量来访问其属性。显然只有当属性不是字面类型，比如字符串或布尔型的时候，才能这样做。

看看这段代码：

```js
with(test.information.settings.files) {
  primary = 'names';
  secondary = 'roles';
  tertiary = 'references';
}
```

下面的代码会让脚本引擎更有效率：

```js
var testObject = test.information.settings.files;
testObject.primary = 'names';
testObject.secondary = 'roles';
testObject.tertiary = 'references';
```

## 不要在要求性能的函数中使用 try-catch-finally

`try-catch-finally` 结构相当独特。与其它结构不同，它运行时会在当前作用域创建一个新变量。在每次 `catch` 子句运行的时候，这个变量会引用捕捉到的异常对象。这个变量不会存在于脚本的其它部分，哪怕是在相同的作用域中。它在 `catch` 子句开始的时候创建，并在这个子句结束的时候销毁。

因为这个变量在运行时创建和销毁，并且在语句中代表着一种特殊的情况，某些浏览器不能很有效地处理它。因此如果把它放在一个要求性能的循环中，在捕捉到异常时可能造成性能问题。

**异常处理应该尽可能地放在更高层次的脚本中**，在这里异常可能不会频繁发生，或者可以先检查操作是否可行以避免异常发生。下面的示例展示了一个循环，在访问的属性不存在时有可能抛出几个异常：

```js
var oProperties = [
  'first',
  'second',
  'third',
  …
  'nth'
];
for(var i = 0; i < oProperties.length; i++) {
  try {
    test[oProperties[i]].someproperty = somevalue;
  } catch(e) {
    …
  }
}
```

多数情况下，`try-catch-finally` 结构可以移动到循环外层。这对语义略有改动，因为如果异常发生，循环就中止了，不管之后的代码是否能继续运行：

```js
var oProperties = [
  'first',
  'second',
  'third',
  …
  'nth'
];
try {
  for(var i = 0; i < oProperties.length; i++) {
    test[oProperties[i]].someproperty = somevalue;
  }
} catch(e) {
  …
}
```

某些情况下，`try-catch-finally` 结构可以通过检查属性或者其它适当的测试来完全规避：

```js
var oProperties = [
  'first',
  'second',
  'third',
  …
  'nth'
];
for(var i = 0; i < oProperties.length; i++) {
  if(test[oProperties[i]]) {
    test[oProperties[i]].someproperty = somevalue;
  }
}
```

## 隔离 eval 和 with 的使用

由于这些结构会对性能造成显著影响，应该尽可能的少用它们。但有时候你可能仍然需要使用到它们。如果某个函数被反复调用，或者某个循环在重复执行，那最好不要在它们内部使用这些结构。它们只适合在执行一次或很少几次的代码中使用，还要注意这些代码对性能要求不高。

无论什么情况，尽量将它们与其它代码隔离开来，这样就不会影响到其它代码的性能。比如，把它们放在一个顶层函数中，或者只运行一次并把结果保存下来，以便稍后可以使用其结果而不必再运行这些代码。

`try-catch-finally` 结构可能会在某些浏览器对性能产生影响，包括 Opera，所以你最好以同样的方式对其进行隔离。

## 尽量不用全局变量

创建临时变量很简单，所以很诱人。然而，因为某些原因，它可能会让脚本运行缓慢。

首先，如果代码在函数或另一个作用域中引用全局变量，脚本引擎会依次通过每个作用域直到全局作用域。局部变量找起来会快得多。

全局作用域中的变量存在于脚本的整个生命周期。而局部变量会在离开局部作用域的时候被销毁，它们占用的内存可以被垃圾收集器回收。

最后，全局作用域由 window 对象共享，也就是说它本质上是两个作用域而不是一个。在全局作用域中，变量总是通过其名称来定位，而不是像局部变量那样经过优化，通过预定义的索引来定位。这最终导致脚本引擎需要花更多时间来找到全局变量。

函数通常也在全局作用域中创建。因此一个函数调另一个函数，另一个函数再接着调其它函数，如此深入下去，脚本引擎就会不断增加往回定位全局变量的时间。

来看个简单的示例，i 和 s 定义在全局作用域中，而函数会使用这些全局变量：

```js
var i, s = '';
function testfunction() {
  for(i = 0; i < 20; i++) {
    s += i;
  }
}
testfunction();
```

下面的替代版本执行得更快。在多数当今的浏览器中，包括 Opera 9、最新的 Internet Explorer、Firefox、Konqueror 和 Safari，它的执行速度会比之前的版本快 30% 左右。

```js
function testfunction() {
  var i, s = '';
  for(i = 0; i < 20; i++) {
    s += i;
  }
}
testfunction();
```

## 注意对象的隐式转换

字面量，比如字符中、数、和布尔值，在 ECMAScript 中有两种表现形式。它们每种类型都可以作为值创建，也可以作为对象创建。比如，
```js
var oString = 'some content'; // 创建了一个字符串值，
```
而 
```js
var oString = new String('some content'); //创建了等价的字符串对象。
```

所有属性和方法都是在字符串对象而不是值上定义的。如果你对字符串值调用属性和方法，ECMAScript 引擎必须用相同的字符串值隐式地创建一个新的字符串对象，然后才能调用方法。这个对象仅用于这一个需求，如果下次再对字符串值调用某个方法，会再次类似地创建字符串对象。

下面的示例的让脚本引擎创建 21 个新的字符串对象。每次访问 length 属性和每次调用 charAt 方法的时候都会创建对象：

```js
var s = '0123456789';
for(var i = 0; i < s.length; i++) {
  s.charAt(i);
}
```

下面的示例与上面那个示例等价，但只创建了一个对象，它的执行结果更好：

```js
var s = new String('0123456789');
for(var i = 0; i < s.length; i++) {
  s.charAt(i);
}
```

如果你的代码经常调用字面量值的方法，你就应该考虑把它们转换为对象，就像上面的例子那样。

注意，虽然本文中大部分观点都与所有浏览器相关，但这种优化主要针对 Opera。它也可能影响其它一些浏览器，但在 Internet Explorer 和 Firefox 中可能会慢一些。

## 在要求性能的函数中避免使用 for-in

`for-in` 循环经常被误用，有时候普通的 `for` 循环会更合适。`for-in` 循环需要脚本引擎为所有可枚举的属性创建一个列表，然后检查其中的重复项，之后才开始遍历。

很多时候脚本本身已经知道需要遍历哪些属性。多数情况下，简单的 `for` 循环可以逐个遍历那些属性，特别是它们使用有序的数字作为名称的时候，比如数组，或者伪数组(像由 DOM 创建的 NodeList 就是伪数组)。

下面有一个未正确使用 for-in 循环的示例：

```js
var oSum = 0;
for(var i in oArray) {
  oSum += oArray[i];
}
```

使用 for 循环会更有效率：

```js
var oSum = 0;
var oLength = oArray.length;
for(var i = 0; i < oLength; i++) {
  oSum += oArray[i];
}
```

## 使用累加形式连接字符串

字符串连接可以非常消耗性能。使用 `+` 运算符不会直接把结果赋值给变量，它会在内存中创建一个新的字符串用于保存结果，这个新的字符串可以赋值给变量。下面的代码展示了一个常见的字符串连接：

```js
`a += 'x' + 'y';`
```

这段代码首先会在内存中创建一个临时的字符串保存连接的结果 xy，然后将它连接到 a 的当前值，再将最终的连接结果赋值给 a。下面的代码使用了两条命令，但因为它每次都是直接赋值，所以不会使用临时字符串。当今许多浏览器中运行这段代码速度会快 20%，而且只需要更少的内存，因为它不需要暂存连接结果的临时字符串：

```js
a += 'x';
a += 'y';
```

## 基本运算比调用函数更快

虽然普通代码中不需要太注意，但在要求性能的循环和函数中还有办法提高性能——把函数调用替换为等价的基本调用。比如对数组调用 push 方法就会比直接通过数组的尾部索引添加元素更慢。再比如对于 Math 对象来说，多数时候，简单的数学计算会比调用方法更恰当。

```js
var min = Math.min(a,b);
A.push(v);
```

下面的代码做了同样的事情，但性能更好：

```js
var min = a < b ? a : b;
A[A.length] = v;
```

## 为 setTimeout() 和 setInterval() 传入函数而不是字符串

`setTimeout()` 和 `setInterval()` 方法与 `eval` 类似。如果传递给它们的是字符串，在等待指定的时间之后，会跟 `eval` 一样进行计算，也会对性能造成同样的影响。

不过这些方法都会接收函数作为第一个参数，所以可以不用传入字符串。**作为参数传入的函数会在一定延迟之后调用，但它们可以在编译期进行解释和优化**，最终会带来性能提升。

这里有个使用字符串作为参数的典型示例：

```js
setInterval('updateResults()', 1000);
setTimeout('x+=3; prepareResult(); if(!hasCancelled){ runmore() }', 500);
```

下例中第一种情况可以直接引用函数。第二种情况可以使用匿名函数来封装代码：

```js
setInterval(updateResults, 1000);
setTimeout(function () {
  x += 3;
  prepareResult();
  if(!hasCancelled) {
    runmore();
  }
}, 500);
```

注意，所有情况下超时和间隔时间都可能不准确。一般来说，浏览器延迟的时间可能会略长一些。有些人会把请求时间稍微提前一点来进行补偿，其他人会尝试每次都等待正确的时间。像 CPU 速度、线程状态和 JavaScript 加载等因素都会影响延迟的准确性。多数浏览器不会按 0 毫秒进行延迟，它们会施以最小的延迟来代替，这个延迟一般在 10 到100 毫秒之间。



