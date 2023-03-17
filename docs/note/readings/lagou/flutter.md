# Flutter

## 大前端

大前端的概念：

大前端概念对于编程开发者来说早已耳熟能详，从我的角度来理解这个概念的话，主要是通过同一套编程代码，经过框架编译转化能够适应于多端平台的前端交互界面。当然这里只介绍目前应用较广的三个方面，即 iOS、Andorid 和 Web H5，之后可以再延伸到小程序、TV、Watch 等其他智能设备

核心是为了解决多端不一致和人力的问题。比如在一些交互复杂度不高的应用中，通过这种模式可以更好地节省人力成本，特别是在一些前期快速发展的创业公司，可以使用较少的人力来支撑一些核心业务功能。

## 跨端技术

跨端技术的发展过程

技术 核心 原生支持 动态性 性能 体验
Ionic/Cordova JSBridge 封装给 Web 调用 90% 中 差 差
React Native/Weex JIT 模式应用 JS 与原生通信 20% 好 中 中
Flutter 自渲染 5% 优 良 优

-   Ionic/Cordova（Hybrid），在技术原理上的核心是，将原生的一些能力通过 JSBridge 封装给 Web 来调用，扩充了 Web 应用能力。但是这种方法有两个不足，一是依赖客户端，二是在性能和体验上都非常依赖于 Web 端。因此，整体上的体验不可预知。目前这个技术还经常被应用到，例如，当前 App 内会提供白名单域名和可调用的 JSBridge 方法，由此来增强 H5 与客户端交互能力，从而提升 App 内 H5 的灵活性。

-   React Native/Weex，在原来的 Hybrid 的 JSBridge 基础上进行改进，将 JavaScript 的界面以及交互转化为 Native 的控件，从而在体验上和原生界面基本一致。但因为是 JIT 模式，因此需要频繁地在 JavaScript 与 Native 之间进行通信，从而会有一定的性能损耗影响，导致体验上与原生会有一些差异。

-   Flutter，取长补短，结合了之前的一些优点，解决了与 Native 之间通信的问题，同时也有了自渲染模式（框架自身实现了一套 UI 基础框架，与原来的渲染模式基本一致）。从而在体验和性能上相对之前的两种框架表现都较好

## 选择 Flutter 的思考

解决一些场景问题，`节省人力成本，同时不影响用户体验。`

选择 Flutter 并不是为了代替 iOS 或者 Android，而是做一个技术互补，比如，Flutter 负责业务功能，而 iOS 和 Android 则负责部分的底层交互提供服务给到 Flutter 应用。Flutter 也是在这两年刚刚兴起的，在应用起步初期还需要部分底层的服务与原生平台进行交互。相信再经过一段时间的发展，Flutter 在这方面会不断地优化和提升，也将能够独立覆盖到更多复杂的业务场景。因此希望你能够明白大前端的概念，以及 Flutter 目前的应用场景。

## Flutter Dart 语法：从 JavaScript 角度

#### 基础数据类型

###### Symbol 的区别

在 JavaScript 中，Symbol 是将基础数据类型转换为唯一标识符，核心应用是可以将复杂引用数据类型转换为对象数据类型的键名。

在 Dart 中，Symbol 是不透明的动态字符串名称，用于反映库中的元数据。用 Symbol 可以获得或引用类的一个镜像，概念比较复杂，但其实和 JavaScript 的用法基本上是一致的。例如，下面代码首先 new 了一个 test 为 Map 数据类型，设置一个属性 #t（Symbol 类型），然后分别打印 test、test 的 #t、test 的 Symbol("t") 和 #t。

```dart
void main() {

  Map test = new Map();

  test[#t] = 'symbol test';

  print(test);

  print(test[#t]);

  print(test[Symbol('t')]);

  print(#t);

}
```
