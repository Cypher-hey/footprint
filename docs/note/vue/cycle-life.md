<p class="tip">Vue 框架的入口就是 Vue 实例，其实就是框架中的 view model ，它包含页面中的业务处理逻辑、数据模型等，它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的
过程时更容易形成好的逻辑。
</p>

## Vue 实例

#### 构造函数

每个 Vue 应用程序都是通过 `Vue` 构造函数创建出一个 Vue `根实例`来引导辅助的：

```js
var vm = new Vue({
  // 选项
})
```

尽管没有完全遵循 `MVVM 模式`，但是 Vue 的设计仍然受到了它的启发。作为约定，通常我们使用变量 vm (ViewModel 的简称) 来表示 Vue 实例。
在实例化 Vue 实例时，你需要传入一个`选项对象`，它可以包含数据(data)、模板(template)、挂载元素(element to mount on)、方法(methods)、生命周期函数(lifecycle callbacks)和其他选项。全部选项列表可以在[ API 参考文档](https://vuefe.cn/v2/api/#Options-Misc)中查看。
可以通过预先定义选项`扩展 Vue 构造函数`，从而创建可复用的`组件构造函数`：

```js
var MyComponent = Vue.extend({
  // 扩展选项
})
// `MyComponent` 的所有实例，都将由预先定义的扩展选项来创建
var myComponentInstance = new MyComponent()
```
尽管可以命令式地创建扩展实例，不过，在多数情况下，推荐声明式地注册组件，并在模板中作为自定义元素组合在一起。我们将在后面详细说明组件系统。现在，你只需知道`所有的 Vue 组件，本质上都是 Vue 对象扩展后的实例。`

#### 实例API简介

构造器(实例化)

var vm = new Vue({　
    //选项

###### DOM（3）

* [el](https://vuefe.cn/v2/api/?#el) 

    * 类型： string | HTMLElement

    * 限制： 只在由 new 创建的实例中遵守。

    * 详细：提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。在实例挂载之后， 元素可以用 `vm.$el` 访问。

* [template](https://vuefe.cn/v2/api/?#template) 

    * 类型： string

    * 详细：一个字符串模板作为 Vue 实例的标识使用。模板将会 替换 挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发 slot。

* [render](https://vuefe.cn/v2/api/?#render) 

    * 类型： `(createElement: () => VNode) => VNode`

    * 详细：字符串模板的代替方案，render 函数接收一个 createElement 方法作为第一个参数用来创建 VNode。

###### 数据（6）

* [data](https://vuefe.cn/v2/api/?#data)    

    * 类型： Object | Function

    * 限制: 组件的定义只接受 function。

    * 详细:
    Vue实例的数据对象。Vue 将会递归将 data 的属性转换为 getter/setter，从而让 data 的属性能够响应数据变化。`对象必须是纯粹的对象(含有零个或多个的key/value对)：`

    实例创建之后，可以通过 vm.$data 访问原始数据对象。Vue 实例也代理了 data 对象上所有的属性，因此访问 vm.a 等价于访问 vm.$data.a。

    <p class = 'tip'>
    当一个组件被定义， data 必须声明为`返回一个初始数据对象的函数`，因为组件可能被用来创建多个实例。如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，从而返回初始数据的一个全新副本数据对象。
    <br><br>
    如果需要，可以通过将 vm.$data 传入 JSON.parse(JSON.stringify(...)) 得到深拷贝的原始数据对象。
    </p>

* [props](https://vuefe.cn/v2/api/?#props)　

    * 类型: Array<string> | Object

    * 详细:
    props 可以是数组或对象，用于`接收来自父组件的数据`。props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义校验和设置默认值。


* [propsData](https://vuefe.cn/v2/api/?#propsData)

    * 类型: { [key: string]: any }

    * 限制: 只用于 new 创建的实例中。

    * 详细:
    创建实例时传递 props。主要作用是方便测试。

* [computed](https://vuefe.cn/v2/api/?#computed)

    * 类型： `{ [key: string]: Function | { get: Function, set: Function } }`

    * 详细:
    计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。

    <p class="tip">
    注意，不应该使用箭头函数来定义计算属性函数 (例如 aDouble: () => this.a * 2)。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.a 将是 undefined。
    </p>



* [methods](https://vuefe.cn/v2/api/?#methods) 

    * 类型: { [key: string]: Function }

    * 详细:
    methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。

* [watch](https://vuefe.cn/v2/api/?#methods) 

    * 类型: { [key: string]: string | Function | Object }

    * 详细:
    一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。


###### 生命周期钩子（10）

* beforeCreate(在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。)

* create(实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见)

* beforeMount(在挂载开始之前被调用：相关的 render 函数首次被调用。)

* mounted(el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。)

* beforeUpdate(数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。)

* updated(由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。)

* activated(keep-alive 组件激活时调用。)

* deactivated(keep-alive 组件停用时调用。)

* beforeDestroy(实例销毁之前调用。在这一步，实例仍然完全可用。)

* destroyed(Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。)

###### 资源（3）

* directives(包含 Vue 实例可用指令的哈希表。)

* filters(包含 Vue 实例可用过滤器的哈希表。)

* components(包含 Vue 实例可用组件的哈希表。)

###### 杂项（6）

* parent(指定已创建的实例之父实例，在两者之间建立父子关系。子实例可以用 this.$parent 访问父实例，子实例被推入父实例的 $children 数组中。)

* mixins(mixins 选项接受一个混合对象的数组。Mixin钩子按照传入顺序依次调用,并在调用组件自身的钩子之前被调用。)

* name(允许组件模板递归地调用自身。注意，组件在全局用 Vue.component() 注册时，全局 ID 自动作为组件的 name。)

* extends（允许声明扩展另一个组件。这主要是为了便于扩展单文件组件。这和 mixins 类似，区别在于，组件自身的选项会比要扩展的源组件具有更高的优先级。）

* delimiters（改变纯文本插入分隔符。）

* functional（使组件无状态（没有 data ）和无实例（没有 this 上下文）。他们用一个简单的 render 函数返回虚拟节点使他们更容易渲染。）

)}


#### 属性与方法

每个 Vue 实例都会`代理`其 `data` 对象的所有属性：

```js
var data = { a: 1 }
var vm = new Vue({
  data: data
})
vm.a === data.a // -> true
// 设置属性也会影响到原始数据
vm.a = 2
data.a // -> 2
// ... 反之亦然
data.a = 3
vm.a // -> 3
```

应当注意，只有这些以上这种代理属性是`响应式`的，也就是说，在 data 中所有属性值的更新，都会触发视图重新渲染。如果在实例创建之后，再对实例添加新的属性，将不会触发任何视图更新。

除了 data 属性， Vue 实例还暴露了`一些有用的实例属性和方法`。这些属性与方法都具有`前缀 $`，以便与所代理的 data 属性有所区分。例如：

```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})
vm.$data === data // -> true
vm.$el === document.getElementById('example') // -> true
// $watch 是一个实例方法
vm.$watch('a', function (newVal, oldVal) {
  // 这个回调函数将在 `vm.a` 改变后调用
})
```

<p class = "tip">
不要在实例属性或者回调函数中（例如，vm.$watch('a', newVal => this.myMethod())）使用箭头函数。因为`箭头函数会绑定父级上下文`，所以 this 不会按照预期指向 Vue 实例，然后 this.myMethod 将是未定义。
</p>

###### 实例属性(10)

　　* vm.$data（Vue 实例观察的数据对象。Vue 实例代理了对其 data 对象属性的访问。）

　　* vm.$el（Vue 实例使用的根 DOM 元素。）

　　* vm.$options（用于当前 Vue 实例的初始化选项。需要在选项中包含自定义属性时会有用处）

　　* vm.$parent（父实例，如果当前实例有的话。）

　　* vm.$root（当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自已。）

　　* vm.$children（当前实例的直接子组件。）

　　* vm.$slots（用来访问被 slot 分发的内容。每个具名 slot 有其相应的属性（例如：slot="foo" 中的内容将会在 vm.$slots.foo中被找到）。default 属性包括了所有没有被包含在具名 slot 中的节点。）

　　* vm.$scopedSlots（用来访问 scoped slots.）

　　* vm.$refs（一个对象，其中包含了所有拥有 ref 注册的子组件。）

　　* vm.$isServer（当前 Vue 实例是否运行于服务器。）

###### 实例方法/数据（3）

　　* vm.$watch（观察 Vue 实例变化的一个表达式或计算属性函数。回调函数得到的参数为新值和旧值。）

　　* vm.$set（这是全局 Vue.set 的别名。）

　　* vm.$delete（这是全局 Vue.delete 的别名。）

###### 实例方法/事件（4）

　　* vm.$on（监听当前实例上的自定义事件。事件可以由vm.$emit触发。回调函数会接收所有传入事件触发函数的额外参数。）

　　* vm.$once（监听一个自定义事件，但是只触发一次，在第一次触发之后移除监听器。）

　　* vm.$off（移除事件监听器。）

　　* vm.$emit（触发当前实例上的事件。附加参数都会传给监听器回调。）

###### 实例方法/生命周期（4）

　　* vm.$mount（如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount()手动地挂载一个未挂载的实例。）

　　* vm.$forceUpdate（迫使Vue实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。）

　　* vm.$nextTick（将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。）

　　* vm.$destroy（完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。）

#### 全局API（10）

　　* Vue.extend　------使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

　　* Vue.nextTick ------在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

　　* Vue.set          ------设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。这个方法主要用于避开 Vue 不能检测属性被添加的限制。

　　* Vue.delete     ------删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到属性被删除的限制，但是你应该很少会使用它。

　　* Vue.directive  ------注册或获取全局指令。

　　* Vue.filter        ------注册或获取全局过滤器。

　　* Vue.component----注册或获取全局组件。注册还会自动使用给定的id设置组件的名称

　　* Vue.use         ------安装 Vue.js 插件。

　　* Vue.mixin　　------全局注册一个混合，影响注册之后所有创建的每个 Vue 实例。

　　* Vue.compile  ------在render函数中编译模板字符串。只在独立构建时有效

#### 全局配置 Vue.config　（6）

　　* Vue.config.silent = true   　　　　　　　------取消 Vue 所有的日志与警告。

　　* Vue.config.optionMergeStrategies.metho------自定义合并策略的选项。

　　* Vue.config.devtools= true   　　　　------配置是否允许vue-devtools检查代码。

　　* Vue.config.errorHandler= functiono(err, vm){}  ------指定组件的渲染和观察期间未捕获错误的处理函数。

　　* Vue.config.ignoredElements = ['my-custom-web-component', 'another-web-component']　　　------忽略在Vue 之外的自定义元素。

　　* Vue.config.keyCodes   　　　　　　　------给v-on自定义键位别名



## 实例生命周期钩子函数

每个 Vue 实例在被创建之前，都要经过一系列的初始化过程 - 例如，Vue 实例需要配置数据观察(data observation)、编译模版(compile the template)、在 DOM 挂载实例(mount the instance to the DOM)，以及在数据变化时更新 DOM(update the DOM when data change)。在这个过程中，Vue 实例还会调用执行一些生命周期钩子函数，这就为我们提供了执行自定义逻辑的时机。例如，在实例创建后将调用 `created` 钩子函数

```js
var vm = new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
// -> "a is: 1"
```

也有一些其它的钩子，在实例生命周期的不同阶段调用，如 `mounted`、`updated` 和 `destroyed`。钩子的 `this` 指向调用它的 Vue 实例。一些用户可能会问 Vue.js 是否有“控制器(controller)”的概念？答案是，没有。组件的自定义逻辑可以分布在这些钩子中。

#### 生命周期示意图

Vue实例有一个完整的生命周期，从开始创建、初始化数据、编译模板、挂载Dom、渲染→更新→渲染、卸载等一系列过程，我们称这是Vue的生命周期。通俗说就是Vue实例从创建到销毁的过程，就是生命周期。

<img src="./asset/img/vue-cycle-life2.png" width="600" />

* beforeCreate 此时$el、data 的值都为undefined

* create之后，此时可以拿到data的值，但是$el依旧为undefined

* mount之前，$el的值为“虚拟”的元素节点

* mount之后，mounted之前，“虚拟”的dom节点被真实的dom节点替换，并将其插入到dom树中，于是在触发mounted时，可以获取到$el为真实的dom元素()
