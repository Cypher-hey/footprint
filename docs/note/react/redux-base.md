## Redux core

#### 适用场景

Redux 的适用场景：多交互、多数据源：

* 用户的使用方式复杂

* 不同身份的用户有不同的使用方式（比如普通用户和管理员）

* 多个用户之间可以协作

* 与服务器大量交互，或者使用了WebSocket

* View要从多个来源获取数据

从组件角度看，如果你的应用有以下场景，可以考虑使用 Redux：

* 某个组件的状态，需要共享

* 某个状态需要在任何地方都可以拿到

* 一个组件需要改变全局状态

* 一个组件需要改变另一个组件的状态

提供一种机制，可以在同一个地方查询状态、改变状态、传播状态的变化。

#### 设计思想

<p class = 'tip'>
（1）Web 应用是一个状态机，视图与状态是一一对应的。

（2）所有的状态，保存在一个对象里面。
</p>

#### 基础概念 & API

###### 1. Store

Store 就是`保存数据`的地方，你可以把它看成一个`容器`。整个应用只能有一个 Store`(唯一)`。

```js
// Redux 提供createStore这个函数，用来生成 Store。
import { createStore } from 'redux';

//createStore函数接受另一个函数作为参数，返回新生成的 Store 对象。
const store = createStore(fn);
```

###### 2. State

Store对象包含所有数据。如果想得到某个时点的数据，就要对` Store` 生成`快照`。这种时点的数据集合，就叫做 State。

```js
import { createStore } from 'redux';
const store = createStore(fn);

// 当前时刻的 State，可以通过store.getState()拿到。
const state = store.getState();
```

Redux 规定， `一个 State 对应一个 View。只要 State 相同，View 就相同`。你知道 State，就知道 View 是什么样，反之亦然。

###### 3. Action

State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。`Action 就是 View 发出的通知`，`表示 State 应该要发生变化了。`

Action 是一个`对象`。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置，社区有一个[规范](https://github.com/acdlite/flux-standard-action)可以参考。
```js
// Action object
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};

// View 要发送多少种消息，就会有多少种 Action,可以定义一个函数来生成 Action
// Action Creator
const ADD_TODO = '添加 TODO';

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

const action = addTodo('Learn Redux');
```

** Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。**

store.dispatch()是 View 发出 Action 的唯一方法。
```js
// store.dispatch接受一个 Action 对象作为参数，将它发送出去
import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});

// 结合 Action Creator, 可以改写为：
store.dispatch(addTodo('Learn Redux'));
```

###### 4.Reducer

Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的`计算过程`就叫做 Reducer。

```js
// Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
const reducer = function (state, action) {
  // ...
  return new_state;
};

// 整个应用的初始状态，可以作为 State 的默认值。下面是一个实际的例子。
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default: 
      return state;
  }
};

const state = reducer(1, {
  type: 'ADD',
  payload: 2
});
// 上面代码中，reducer函数收到名为ADD的 Action 以后，就返回一个新的 State，作为加法的计算结果。其他运算的逻辑（比如减法），也可以根据 Action 的不同来实现。
```
实际应用中，Reducer 函数不用像上面这样手动调用，store.dispatch方法会触发 Reducer 的`自动`执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。

```js
import { createStore } from 'redux';
const store = createStore(reducer);
// 上面代码中，createStore接受 Reducer 作为参数，生成一个新的 Store。以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。
```

<p class="tip">Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。</p>

纯函数是函数式编程的概念，必须遵守以下一些约束:

* 不得改写参数

* 不能调用系统 I/O 的API

* 不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果

由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，`必须返回一个全新的对象`

```js
// State 是一个对象
function reducer(state, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}

// State 是一个数组
function reducer(state, action) {
  return [...state, newItem];
}
//最好把 State 对象设成只读。你没法改变它，要得到新的 State，唯一办法就是生成一个新对象。这样的好处是，任何时候，与某个 View 对应的 State 总是一个不变的对象。
```

## history

#### MVC 框架 in front

把应用分为了三个部分：

* Model（模型）负责 管理数据，大部分业务也应该放在Model中

* View（视图）