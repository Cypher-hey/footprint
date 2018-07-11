
Node Package Manager: npm 是一个用来安装和管理Node包和前端包的一个工具

>包其实就是一些模块组织到一起，放到一个目录中的一个称呼。

npm 有两层含义：
* [npm 官方网站](https://www.npmjs.com/)
    * 提供了一个用来共性或者检索的平台
    * 托管 node 环境或者浏览器环境用的的一些第三方包
* 作为一个命令行管理工具，可以用来下载 npm 网站上托管的包
    * CLI: Command Line Interface 命令行窗口
    * GUI: 图形化界面

Node 是一个执行环境，Node 可以用来执行 JavaScript 代码（ECMAScript），npm 基于 node 环境的 API（网络操作API、文件操作API）编写的工具，可以用来下载第三方包到指定的目录中。

安装node环境的时候，已经自动安装了 npm 命令行工具，不需要单独安装。可以通过 `npm -v` 测试 npm 是否可用。

#### npm 基本使用

**本地安装**

一般在项目中，安装项目使用的依赖包，例如 underscore、less、jQuery；可以在终端中，切换到项目的根目录，然后执行 `npm install` 包名，比如：npm install jquery，npm 工具会自动将 jQuery 这个包下载，然后放到 `node_modules` 目录中。node_modules 目录如果不存在会新建，如果已存在，则直接将下载的包放到该目录中。

```js
// 在安装的时候加上 --save 参数就会自动将包依赖项添加到 dependencies 属性中
npm install [--save] 包名

// 安装之前，npm install会先检查，node_modules目录之中是否已经存在指定模块。如果存在，就不再重新安装了，即使远程仓库已经有了一个新版本，也是如此。

// 如果希望一个模块不管是否安装过，npm 都要强制重新安装，可以使用-f或--force参数
npm install  --force

// 如果你希望，所有模块都要强制重新安装，那就删除node_modules目录，重新执行npm install
rm -rf node_modules
npm install
```

**全局安装**

全局安装： 一般用于安装一些命令行工具（这些工具也是基于Node开发的）全局安装使用 `npm install --global` 包名（工具名），在**任意目录执行**该命令都可以。

```js
npm install --global 包名（工具名）

// 简写
npm i -g 包名（工具名）
// or
npm install -g 包名（工具名）
```

查看当前全局安装的所有包名：

```js
npm ls -g --depth 0
```

**安装不同版本**

`install 命令总是安装模块的最新版本` ，如果要安装模块的特定版本，可以在模块名后面加上@和版本号。

```js
npm install sax@latest
npm install sax@0.1.1
npm install sax@">=0.1.0 
```

如果使用 `--save-exact` 参数，会在package.json文件**指定安装模块的确切版本**。

```js
npm install readable-stream --save --save-exact
```

install命令可以使用不同参数，指定所安装的模块属于哪一种性质的依赖关系，即出现在packages.json文件的哪一项中。

* `–save`：模块名将被添加到 dependencies，可以简化为参数 `-S`。
* `–save-dev`: 模块名将被添加到 devDependencies，可以简化为参数 `-D`。

npm install 默认会安装 dependencies 字段和 devDependencies 字段中的**所有模块**，`如果使用production参数，可以只安装dependencies字段的模块`。

```js
npm install --production
// 或者
NODE_ENV=production npm install
```

一旦安装了某个模块，就可以在代码中用require命令调用这个模块

```js
var backbone = require('backbone');
console.log(backbone.VERSION);
```


**包说明文件：`package.json`简介**

* 产品的说明书：package.json 文件。该文件一般只存在于**项目的根路径**下，定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、依赖项等信息）。可以通过` npm init [-y] `命令使用向导的形式创建该文件。

* 该文件中描述了项目的一些元数据，例如 `name、version、author` 等信息。

* 其中一个非常重要的属性，叫做：`dependencies`，该属性是一个对象，里面保存了当前项目的`依赖项`，该字段一般不要手动修改，它需要结合 npm install --save 包名 来使用，只要在安装的时候加上 --save 参数就会自动将包依赖项添加到该属性中，很方便。

* 甚至可以完全把 node_modules 目录删除掉，只要 package.json 文件还在，就可以执行 npm install 安装包说明文件中的所有的依赖项。执行 npm install 命令的时候，它会自动查询当前目录下的 package.json 文件，然后找到里面的 dependencies 属性，依次下载到 node_modules 目录下。

* 建议的使用方法：使用 npm 的时候，首先用 npm init -y 初始化一个 package.json， 然后使用 npm install 包名 --save

#### 常用命令

* `npm help` 查看 npm 命令列表

* `npm -l` 查看各个命名的简单用法

* `npm -v` 查看 npm 的版本

* `npm root -g` 查看全局包安装目录。

* `npm init [-y]` 初始化一个 package.json 文件

* `npm info 包名 [字段名]` 查看指定模块的 package.json 信息

* `npm search 包名` 该命令用于搜索 npm 仓库

* `npm list` 以树型结构列出当前项目安装的所有模块，以及它们依赖的模块

* `npm list 包名` 列出单个模块

* `npm list -g` 列出全局安装的模块

* `npm install [--save] 包名[#版本号]`

    * `npm install 包名` 安装包到当前项目下的 node_modules 目录下

    * `npm install|i --save|-S 包名` 安装包的同时把依赖项保存到 包说明文件中

    * 本地项目安装：目的是为了辅助你的代码功能开发

* `npm uninstall [--save] 包名`

    * `npm uninstall 包名` 删除包，但是如果包说明文件中有依赖项，那么不会删除

    * `npm uninstall --save 包名` 删除包，同时将 package.json 文件中的依赖项也删除

* `npm install`

* `npm install -g 包名`

* `npm uninstall -g 包名`

* `npm install -g http-server --registry=http://192.168.32.59:7001` **设置服务器镜像源地址**

* `npm set` 用来设置环境变量

* **`npm config`**

    * `npm config list` 查看 npm 配置项

    * `npm config set init.author.name $name` 使用 npm init 时，默认的 name

    * `npm config set init.author.email $email` 使用 npm init 时，默认的 email

    * `npm congig set prefix "路径"` 改变全局包安装路径

    * `npm config set registry` **"镜像路径"**

* `http-server` 开启服务器

* `http-server-o` 开启服务器并直接在浏览器中打开

#### 使用镜像源地址解决被墙

国内的淘宝：克隆了国外的服务器，跟国外的 npm 每10分钟保持同步一次；

* `npm install 包名 --registry=https://registry.npm.taobao.org ` 本次安装通过指定镜像源地址下载

* `npm config set registry=https://registry.npm.taobao.org` 

    * 这是将 npm 的下载镜像源地址改为淘宝的 cpnm 镜像源
    * 这样执行该命令，以后所有的 install 都会通过指定的地址下载

* `npm install -g cnpm` 还提供了 `cnpm` 命令

    * 安装了 cnpm 之后，就可以使用 cnmp 命令安装和管理包了
    * cnpm 默认 就会走淘宝的 npm 镜像源地址
    * cnpm install -g 包名
    * cnpm install 包名
    * npm 的命令都可以通过 cnpm 来代替

* 通过在用户目录： `~/.npmrc` 文件中，可写入镜像源地址 : registry=https://registry.npm.taobao.org

* npm install -g nrm 下载安装 `nrm`(nmp registry manager)

#### 避免系统权限

默认情况下，npm **全局模块**都安装在**系统目录**（比如`/usr/local/lib/`），**普通用户没有写入权限**，需要用到`sudo` 命令。这不是很方便，我们可以在没有root权限的情况下，安装全局模块:

方法一：

首先，在主目录下新建配置文件.npmrc，然后在该文件中将prefix变量定义到主目录下面



references:

1. [npm 包管理工具](https://juejin.im/entry/583d425161ff4b007eda246d)
2. [npm 模块管理器](https://juejin.im/entry/57620a67816dfa00544096a6)



