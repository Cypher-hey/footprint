# Git 基础：工作区、暂存区、提交与远端

> 核查日期：2026-10-08。状态：命令语义审阅，未执行。下文修改、删除、合并和推送命令是学习示例，不是自动执行指令。
> reset --hard、checkout/restore 覆盖与分支删除可能丢失未提交工作；先检查状态、备份并确认目标。

## git 简明指南

### 创建新仓库 init

1. 创建新文件夹，打开，然后执行 

2. `git init`

3. 以创建新的 git 仓库。

### 检出仓库 clone

* 克隆本地仓库：`git clone /path/to/repository`

* 克隆远端服务器仓库： `git clone username@host:/path/to/repository`

### 工作流描述

每一个的本地仓库由 git 维护的三棵“树”组成。

* 第一个是你的 `工作目录`，它持有实际文件；

* 第二个是 `暂存区（Index）`，它像个缓存区域，临时保存你的改动<add>；

* 最后是 `HEAD`，它指向你最后一次提交的结果<commit>。

### 添加和提交 add & commit

* 添加:

    你可以提出更改（把它们添加到暂存区），使用如下命令：

    `git add <filename>`

    `git add -- <明确的文件路径>`

    这是 git 基本工作流程的第一步；

* 提交:

    以实际提交改动：

    `git commit -m "代码提交信息"`

    现在，你的改动已经提交到了 HEAD，但是还没到你的远端仓库。

### 推送改动 push

你的改动现在已经在本地仓库的 HEAD 中了。执行如下命令以将这些改动提交到远端仓库：

`git push origin master`

可以把 master 换成你想要推送的任何分支。

`git push`

无参数 push 的目标取决于 upstream、remote 和 push.default 等配置，并不是默认推送全部分支。

### 将本地仓库连接到远端服务器 remote add origin

如果你还没有克隆现有仓库，并欲将你的仓库连接到某个远程服务器，你可以使用如下命令添加：

`git remote add origin <server>`

如此你就能够将你的改动推送到所添加的服务器上去了。

### 分支 checkout

分支是用来将特性开发绝缘开来的。初始分支名取决于配置和托管平台，可能是 main、master 或其他名称。在其他分支上进行开发，完成后再将它们合并到主分支上。

创建一个叫做“hey”的分支，并切换过去：

`git checkout -b hey`

切换回主分支：

`git checkout master`

可以再把新建的分支删掉：

`git branch -d hey`

除非你将分支推送到远端仓库，不然该分支就是 不为他人所见的：

`git push origin <branch>`

### 更新与合并 pull、merge

* 更新：

要更新你的本地仓库至最新改动，执行：

`git pull`

以在你的工作目录中 获取（fetch）并按配置整合（merge 或 rebase 等） 远端的改动。

* 差异对比：

在合并改动之前，你可以使用如下命令预览差异：

`git diff <source_branch> <target_branch>`

* 合并：

要合并其他分支到你的当前分支（例如 master），执行：

`git merge <branch>`

在这两种情况下，git 都会尝试去自动合并改动。遗憾的是，这可能并非每次都成功，并可能出现冲突（conflicts）。 这时候就需要你修改这些文件来手动合并这些冲突（conflicts）。改完之后，你需要执行如下命令以将它们标记为合并成功：

`git add <filename>`

### 替换本地改动 checkout、fetch & reset

假如你操作失误（当然，这最好永远不要发生），你可以使用如下命令替换掉本地改动：

* 从本地 HEAD 替换：

`git checkout -- <filename>`

未指定提交时，git checkout -- <path> 从暂存区恢复工作区，不是总从 HEAD 恢复。会丢弃目标文件未暂存修改；先检查 diff。

* 从远端服务器替换：

假如你想丢弃你在本地的所有改动与提交，可以到服务器上获取最新的版本历史，并将你本地主分支指向它：

`git fetch origin`

`git reset --hard origin/master`



## 补充验证

HEAD 通常引用当前分支，也可能处于 detached HEAD。fetch 更新远端跟踪信息不等于整合当前分支。现代 Git 可用 switch 切换分支、restore 恢复路径，执行前区分来源和目标。

- [git push](https://git-scm.com/docs/git-push)
