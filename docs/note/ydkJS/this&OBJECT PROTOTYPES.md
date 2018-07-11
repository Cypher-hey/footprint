note for learning you don't know JS

## 1、this or That

[git地址](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch1.md)

`this` 既不是对函数本身的一种引用，也不是对这个函数的词法域（lexical scope）的引用，它实际上是一种绑定（binding）：当函数被 invoked 时，它的引用完全取决于函数是在哪被 called 时的 call-site。


 `Why use it` : the  this  mechanism provides a more elegant way of implicitly "passing along(转送、传递)" an object reference, leading to cleaner API design and easier reuse. 更加优雅的隐式传递，可简化API设计和复用。

`this` is not an author-time binding but a runtime binding. It is contextual based on the conditions of the function's invocation. this binding has nothing to do with where a function is declared, but has instead everything to do with the manner in which the function is called.

When a function is invoked, an activation record, otherwise known as an execution context, is created. This record contains information about where the function was called from (the call-stack), how the function was invoked, what parameters were passed, etc. One of the properties of this record is the `this` reference which will be used for the duration of that function's execution.



