## concepts

#### Evaluation strategy

[wiki: Evaluation strategy](https://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_sharing)

###### Call by sharing

Call by sharing (also known as "call by object" or "call by object-sharing")

It is used by languages such as Python, Java (for object references), Ruby, `JavaScript`, Scheme, OCaml, AppleScript, and many others.

Call by sharing implies that values in the language are based on objects rather than primitive types, i.e., that all values are "boxed". Because they are boxed they can be said to pass by copy of reference (where primitives are boxed before passing and unboxed at called function).

-   In particular it is not call by value because mutations of arguments performed by the called routine will be visible to the caller.

-   it is not call by reference because access is not given to the variables of the caller, but merely to certain objects

复杂数据类型在传入函数时，传递的是内存之中数据引用的副本，它在内存中重新开辟区域存储这个引用的副本，在使用时调用这个引用，理论上就是直接使用原本的数据

对一个变量赋值，这是变量层面的行为，不会对值产生任何影响，也不会对别的变量产生任何影响。

修改对象内的键值对，那是针对值的操作，和变量没有关系。之所以另一个变量下的内容变了，不是因为两个变量相互引用，而是因为这两个独立的变量指向的是同一个对象。
