## Why React?

React 是一个 Facebook 和 Instagram 用来创建用户界面的 JavaScript 库。很多人选择将 React 认为是 `MVC` 中的 `V`（视图view）

创造 React 是为了解决一个问题：`构建随着时间数据不断变化的大规模应用程序`。

#### 简单

仅仅只要表达出你的应用程序在任一个时间点应该呈现的样子，然后当底层的数据变了，React 会自动处理所有用户界面的更新。

#### 声明式 (Declarative)

数据变化后，React 概念上与点击“刷新”按钮类似，但仅会更新变化的部分。

#### 构建可组合的组件

React 都是关于构建可复用的组件。事实上，通过 React 你唯一要做的事情就是构建组件。得益于其良好的封装性，组件使代码复用、测试和关注分离（separation of concerns）更加简单。

## React 的工作方式

与市面上其他框架不同的是，React 把每一个组件当成了一个`状态机`，组件内部通过state来维护组件状态的变化，当组件的状态发生变化时，React通过虚拟DOM技术来增量并且高效的更新真实DOM。

React相对于jQuery的比较：（`无论何种事件，引发的都是React组件的重新渲染`）
<img src="./asset/img/react-react-base2.png" width="600" />

<img src="./asset/img/react-react-base3.png" width="600" />

#### 虚拟DOM（Virtual DOM）

<p class="tip">React 利用 Virtual DOM，让每次渲染都只重新渲染最少的DOM元素</p>

在前端开发的过程中，我们经常会做的一件事就是将变化的数据实时更新到UI上，这时就需要对DOM进行更新和重新渲染，而频繁的DOM操作通常是性能瓶颈产生的原因之一,针对于减少不必要的DOM操作产生的性能开销，

React为此引入了虚拟DOM（Virtual DOM）机制：对于每一个组件，React会在内存中构建一个相对应的DOM树，基于React开发时所有的DOM构造都是通过虚拟DOM进行，每当组件的状态发生变化时，React都会重新构建整个DOM数据，然后将当前的整个DOM树和上一次的DOM树进行对比，得出DOM结构变化的部分(Patchs)，然后将这些Patchs 再更新到真实DOM中。整个过程都是在内存中进行，因此是非常高效的。借用一张图可以清晰的表示虚拟DOM的工作机制：

<img src="./asset/img/react-react-base1.jpg" width="800" />

## 渲染 render

<p class = 'tip'>React元素是 不可突变（immutable） 的. 一旦你创建了一个元素, 就不能再修改其子元素或任何属性。一个元素就像电影里的一帧: 它表示在某一特定时间点的 UI 。

就我们所知, 更新 UI 的唯一方法是创建一个新的元素, 并将其传入ReactDOM.render()方法.
</p>

## JSX 语法

<p class="tip">JSX 是一种 JavaScript 语法的扩展，能够让你可以用 HTML 语法去写 JavaScript 函数调用， recommend using it with React `to describe what the UI should look like.`</p>

###### 在 JSX 中植入 JavaScript 表达式

by wrapping it in curly braces.  ->like this:   {}

###### JSX 作为表达式

## 组件(Components) 和 属性(Props)

组件使你可以将 UI 划分为一个一个独立，可复用的小部件，并可以对每个部件进行单独的设计。

从定义上来说， 组件就像JavaScript的函数。组件可以接收任意输入(称为"props")， 并返回 React 元素，用以描述屏幕显示内容。

<p class='tip'>组件必须返回一个单独的根元素</p>

###### 函数式组件

最简单的定义组件的方法是写一个 JavaScript 函数, 称之为函数式组件：
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
// or 
const Welcome = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);
```
这个函数是一个合法的 React 组件，因为它接收一个 props 参数, 并返回一个 React 元素。 我们把此类组件称为"函数式(Functional)"组件， 因为从字面上看来它就是一个 JavaScript 函数。

函数式组件又称为无状态（stateless）组件，它不存在自身的状态，并且没有普通组件中的各种生命周期方法，同时其函数式的写法决定了其渲染只由属性决定；

优点：

* 简化代码、专注于 render；
* 组件不需要被实例化，无生命周期，提升性能；
* 输出（渲染）只取决于输入（属性），无副作用；
* 视图和数据的解耦分离；

缺点：

* 无法使用 ref；
* 无生命周期方法；
* 无法控制组件的重渲染，因为无法使用 shouldComponentUpdate 方法，当组件接受到新的属性时则会重渲染；

那么何时使用函数式组件呢？

1. 对于函数式组件，由于它不需要处理复杂的生命周期函数，因此它在性能上也有一定优势。
2. 当一个展示性组件的渲染仅仅依赖于其属性，使用函数式组件可以保证它的“纯”，并且对组件本身无任何副作用；
3. 由于它无法控制它的重渲染（无 shouldComponentUpdate 生命周期），因此我们希望该组件的属性数据相对较少，同时组件本身结构相对简单；
4. 函数式组件能够更好地与业务抽离，并且易于测试。

因此对于简单的通用性组件，比如自定义的 Button、Input 等组件选择函数式组件是再好不过的了。

###### 类组件

用一个 ES6 的 class 来定义一个组件:

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

函数组件和类组件从 React 的角度来看是等效的

但用类定义的组件有一些额外的特性。 这个"类专有的特性"， 指的就是`局部状态（state）`。

###### PureComponent

首先我们来理解下 React 组件执行重渲染（re-render）更新的时机，一般当一个组件的 props （属性）或者 state （状态）发生改变的时候，也就是父组件传递进来的 props 发生变化或者使用 this.setState 函数时，组件会进行重新渲染（re-render）；

而在接受到新的 props 或者 state 到组件更新之间会执行其生命周期中的一个函数 shouldComponentUpdate，当该函数返回 true 时才会进行重渲染，如果返回 false 则不会进行重渲染，在这里 shouldComponentUpdate 默认返回 true；

因此当组件遇到性能瓶颈的时候可以在 shouldComponentUpdate 中进行逻辑判断，来自定义组件是否需要重渲染。

PureComponent 是在 react v15.3.0 中新加的一个组件，从 React 源码中可以看到它是继承了 Component 组件：

```js
/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}
function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
var pureComponentPrototype = (ReactPureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
Object.assign(pureComponentPrototype, ReactComponent.prototype);
pureComponentPrototype.isPureReactComponent = true;
```
同时在 shouldComponentUpdate 函数中有一段这样的逻辑：
```js
if (type.prototype && type.prototype.isPureReactComponent) {
  return (
    !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
  );
}
```

因此 PureReactComponent 组件和 ReactComponent 组件的区别就是它在 shouldComponentUpdate 中会默认判断新旧属性和状态是否相等，如果没有改变则返回 false，因此它得以减少组件的重渲染。
当然，这里对新旧属性和状态的比较都为类的浅比较。



###### 把函数式组件转化为类组件

你可以遵从以下5步, 把一个类似 Clock 这样的函数式组件转化为类组件：

* 创建一个继承自 React.Component 类的 ES6 class 同名类。

* 添加一个名为 render() 的空方法。

* 把原函数中的所有内容移至 render() 中。

* 在 render() 方法中使用 this.props 替代 props。

* 删除保留的空函数声明。

```
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

类允许我们在其中添加本地状态(state)和生命周期钩子。

###### 在类组件中添加本地状态(state)

我们现在通过以下3步, 把date从属性(props) 改为 状态(state)：

We will move the date from props to state in three steps:

1. `替换` render() 方法中的 this.props.date 为 `this.state.date`:
```
class Clock extends React.Component {
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
}
```
2. 添加一个 `类构造函数(class constructor)` 初始化 this.state:
```
class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }

    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
}
```

注意我们如何将 props 传递给基础构造函数：
```
constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```
类组件应始终使用 props 调用基础构造函数

## 组件生命周期

组件的生命周期:

* Mounting, 加载
* Updating, 更新
* Unmountion, 卸载

为了细化生命周期的执行过程, react又提供了will, did两种方法, will这个是在生命周期开始之前调用, did是在生命周期已经执行了后调用.

对生命周期细分:

###### Mounting 加载

These methods are called when an instance of a component is being created and inserted into the DOM:

1. [constructor()](https://facebook.github.io/react/docs/react-component.html#constructor),   这一步会在组件加载之前调用, 它的作用是初始化state数据.（已取代getInitialState）
```
constructor(props) {
    super(props); //  implementing the constructor for a React.Component subclass
    this.state = {
      color: props.initialColor
    };
}
```

2. componentWillMount(),  组件被加载之前执行.

3. [render()](https://facebook.github.io/react/docs/react-component.html#render)

4. componentDidMount(),  组件已经被加载后调用.

###### updating 更新

An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:

1. componentWillReceiveProps(object nextProps), 这个是在被加载的组件接受到一个新的Props时调用, 这个方法可以用来比较this.props和nextProps的值, 以此来确定是否要使用this.setState()方法.

2. shouldComponentUpdate(object nextProps, object nextState), 这个方法返回一个boolean值, 用来确定组件是否要更新. 通过比较this.props和nextProps, this.state和nextState, 如果返回为true, 则重新渲染页面, 如果返回为false, 则不会重新渲染页面.

3. componentWillUpdate(object nextProps, object nextState), 这个方法在组件要更新之前调用.

4. render()

5. componentDidUpate(object prevProps, object prevState), 方法在组件更新后调用.

###### Unmounting 卸载

1. componentWillUnmount(), 这个在组件要被DOM卸载前立刻会被调用.

`加载复合组件支持以下方法:`

1. component.forceUpate(), 这个方法可以在任何已经加载了的组件的比较深的state在不通过使用this.setState()的情况下发生改变时调用


