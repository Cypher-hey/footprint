# npm：依赖范围、锁文件与可复现安装

> 核查日期：2026-10-08。参考 npm CLI v11 文档；实际项目按自身 Node/npm 版本执行。
> 状态：知识修订；没有安装、更新、删除依赖或修改 registry。

## 1. 三类文件

package.json 声明项目与依赖范围，package-lock.json 记录解析结果，node_modules 是安装产物。只有 package.json 不代表能重建完全相同的依赖树。

## 2. install 与 ci

| 命令 | 主要用途 | 注意 |
| --- | --- | --- |
| npm install | 开发时安装并解析依赖 | 可能更新锁文件 |
| npm ci | 按锁文件做干净安装 | 要求清单匹配；会移除已有 node_modules |
| npm install 包名 --save-dev | 增加开发依赖 | 会修改清单与锁文件 |
| npm uninstall 包名 | 移除依赖 | 默认行为涉及清单，依配置而定 |

现代 npm 安装指定包通常默认保存依赖，不必再把 --save 当作所有版本的必要条件。install 也不是永远忽略锁文件去装最新版本。

## 3. 版本范围

| 写法 | 常见含义 |
| --- | --- |
| 1.2.3 | 精确版本 |
| ~1.2.3 | 通常允许 1.2.x 补丁更新 |
| ^1.2.3 | 通常允许 1.x 兼容更新 |
| ^0.2.3 | 上界通常到 0.3.0 之前 |
| latest | 发布者维护的 dist-tag，不是单纯取最大数字 |

缺省段、预发布与 0.x 有额外规则。语义化版本表达作者意图，不能替代升级测试。

## 4. 本地工具优先

项目工具优先作为项目依赖和脚本管理，减少全局版本漂移。npm exec/npx 可能下载安装并执行包，不是天然只读命令。

安装生命周期脚本可以执行代码，依赖来源、锁文件、完整性和安全审查都重要。不要用 --force 或 sudo 作为解决未知安装错误的第一步。

## 5. Registry 与凭据

旧镜像域名、固定内网地址和“十分钟同步”不是长期有效合同。先核查当前服务，再决定是否更换 registry。不要将私有包访问令牌发送到错误镜像或写入公开 .npmrc。

## 6. 验证

记录 Node/npm 版本、锁文件、安装参数和结果。生产只安装运行依赖时，要确认构建发生在哪里。npm audit 是风险线索，不能代替可利用性判断；自动强制修复可能造成破坏性升级。

## 7. 练习与来源

解释为什么两人相同 package.json 仍可能安装不同版本；为什么 npm ci 会失败而 install 能继续；比较 ^0.2.3 与 ^1.2.3。

- [npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci)
- [npm install](https://docs.npmjs.com/cli/v11/commands/npm-install)
- [node-semver](https://github.com/npm/node-semver)
