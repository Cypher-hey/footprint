# 内存管理与泄露

[links](https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec)

## memory management

other languages, like C: have low-level memory management primitives such as malloc() and free(), used by the developer to explicitly allocate and free memory from and to the operating system.

`JS`: allocates memory when things (objects, strings, etc.) are created and “automatically” frees it up when they are not used anymore, a process called `garbage collection` (note: but “automatically” is not saying needn't to care about.. Sometimes there are issues with the automatic memory management (such as bugs or implementation limitations in the garbage collectors, etc.) )

### Memory life cycle

memory life cycle is pretty much always the same:

Allocate memory(explicit or auto) => Use memory(actually makes use of it) => Release memory(explicit or auto)

procedures：

When you compile your code, the compiler can examine primitive data types and calculate ahead of time how much memory they will need. The required amount is then allocated to the program in the **call stack** space. The space in which these variables are allocated is called the stack space because as functions get called, their memory gets added on top of the existing memory. As they terminate, they are removed in a LIFO (last-in, first-out) order. 

When functions call other functions, each gets its own chunk of the stack when it is called. It keeps all its local variables there, but also a program counter that remembers where in its execution it was. When the function finishes, its memory block is once again made available for other purposes.（函数执行的内存分配过程）

#### Dynamic allocation

when we don’t know at compile time how much memory a variable will need: 

```js
// it is determined by the value provided by the user.
int n = readInput(); // reads input from the user
...
// create an array with "n" elements
```

therefore, cannot allocate room for a variable on the `stack`. Instead, our program needs to explicitly ask the operating system for the right amount of space at run-time. This memory is assigned from the `heap` space.(静态栈，动态堆分配) 

Differences between statically and dynamically allocated memory：

| static allocation | dynamic allocation    |
| -------------     | -------------         |
| size must be known at compile time | size may be unknown at compile time             |
| performed at compile time 编译时  | performed at run time 运行时  |
| assigned to the stack | assigned to the heap   |
| FILO(first in, last out) | no particular order of assignment   |

#### Allocation in JavaScript

JavaScript does allocation by itself:

```js
// 1. declaring values:
var n = 374; // allocates memory for a number
var s = 'sessionstack'; // allocates memory for a string

var o = {
  a: 1,
  b: null
}; // allocates memory for an object and its contained values

var a = [1, null, 'str'];  // (like object) allocates memory for the
                           // array and its contained values
function f(a) {
  return a + 3;
} // allocates a function (which is a callable object)

// function expressions also allocate an object
someElement.addEventListener('click', function() {
  someElement.style.backgroundColor = 'blue';
}, false);

// 2. function calls result
// Some function calls result in object allocation as well:
var d = new Date(); // allocates a Date object
var e = document.createElement('div'); // allocates a DOM element

// 3. Methods invoking
// Methods can allocate new values or objects:
var s1 = 'sessionstack';
var s2 = s1.substr(0, 3); // s2 is a new string
// Since strings are immutable,
// JavaScript may decide to not allocate memory,
// but just store the [0, 3] range.
var a1 = ['str1', 'str2'];
var a2 = ['str3', 'str4'];
var a3 = a1.concat(a2);
// new array with 4 elements being
// the concatenation of a1 and a2 elements
```

#### Using memory in JavaScript

This can be done by reading or writing the value of a variable or an object property or even passing an argument to a function.

Release when the memory is not needed anymore, for most of the memory management issues come at this stage.

难点在于如何判断一段内存是否需要在这个时间被释放呢？（is undecidable (can’t be solved by an algorithm)）

Most garbage collectors work by collecting memory which can no longer be accessed, e.g.例如 all variables pointing to it went out of scope.（这也只是一种under-approximation大概，因为仍然存在情况是，存在引用，但是再也不会被访问的情况）。

### Garbage collection

a restriction of a solution

#### Memory references

an object is said to reference another object if the former has an access to the latter (can be implicit or explicit)

>For instance, a JavaScript object has a reference to its prototype (implicit reference) and to its properties’ values (explicit reference).

In this context, the idea of an “object” is extended to =>

regular JavaScript objects + function scopes (or the global lexical scope)

>Lexical Scoping(静态、词法作用域) defines how variable names are resolved in nested functions: inner functions contain the scope of parent functions even if the parent function has returned.

* Reference-counting algorithm: An object is considered “garbage collectible” if there are zero references pointing to it. (注意 caused cycle references)

* Mark-and-sweep algorithm(better):  determines whether the object is reachable.
  1. Roots: garbage collector built a complete list of all global variable as roots;
  2. inspects all roots and their children and marks them as active, `a root cannot reach will be marked as garbage.`
  3. frees all memory pieces that are not marked as active and returns that memory to the OS.

之后说了下，most GCs 是惰性的，尽管依据算法有需要可以释放的内存空间，但当无需分配更多的内存空间给变量时，不会主动的去执行之前空间的释放，这样，就有可能导致，实际上使用的内存占用比理论上的多。。

### Memory leaks

definitions:  memory leaks are pieces of memory that the application have used in the past but is not needed any longer but has `not yet been return back` to the OS or the pool of free memory.

基于一块内存空间释放的不可预见性，寄希望于开发者明确explicit when a piece of memory is unused, and can be returned to the operating system or not.

The four types of common JavaScript leaks: 

#### 1. Global variables

JavaScript handles undeclared variables in an interesting way: when a undeclared variable is referenced, a new variable gets created in the global object. In a browser, the global object would be window:

```js
function foo(arg) {
    // A redundant global variable will be created
    bar = "some text";
}

// is the equivalent of :
function foo(arg) {
    window.bar = "some text";
}

// or accidentally create a global variable using this:
function foo() {
    this.var1 = "potential accidental global";
}
// Foo called on its own, this points to the global object (window)
// rather than being undefined.
foo();
```

>avoid all this by adding ‘use strict’; 严格模式预防此类问题

Use global variables to store data if you must but when you do, make sure to `assign it as null or reassign it` once you are done with it.

#### 2. Timers or callbacks that are forgotten

```js
// problems caused: 
// 1. setInterval 一直在运行
// 2. 引用的 serverData 不能被释放，即使在renderer 不存在后
var serverData = loadData();
setInterval(function() {
    var renderer = document.getElementById('renderer');
    if(renderer) {
        renderer.innerHTML = JSON.stringify(serverData);
    }
}, 5000); //This will be executed every ~5 seconds.
```

it’s in line with best practices to remove the observers once the object becomes obsolete(废弃则释放).

```js
var element = document.getElementById('launch-button');
var counter = 0;
function onClick(event) {
   counter++;
   element.innerHtml = 'text ' + counter;
}
element.addEventListener('click', onClick);
// Do stuff
element.removeEventListener('click', onClick);
element.parentNode.removeChild(element);
// Now when element goes out of scope,
// both element and onClick will be collected even in old browsers // that don't handle cycles well.
```

#### 3. Closures

`closures`: an inner function that has access to the outer (enclosing) function’s variables.

Due to the implementation details of the JavaScript runtime, it is possible to leak memory in the following way:

```js
var theThing = null;
var replaceThing = function () {
  var originalThing = theThing;
  var unused = function () {
    if (originalThing) // a reference to 'originalThing'
      console.log("hi");
  };
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log("message");
    }
  };
};
setInterval(replaceThing, 1000);
```

#### 4. Out of DOM references

