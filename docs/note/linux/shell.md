
**shell是什么**，shell是 Linux/Unix 的一个外壳，Linux/Unix 通过 shell 与内核交互，shell 接收用户或程序的命令进而转化成内核明白的命令，内核完成任务后再返回有用的信息给用户或者程序。

>Shell是系统的用户界面，提供了用户与内核进行交互操作的一种接口(命令解释器)

`cat /etc/shells` : 查看电脑上安装了哪些 shell

```js
// 举例
# List of acceptable shells for chpass(1).
# Ftpd will not allow users to connect who are not using
# one of these shells.

/bin/bash
/bin/csh
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

`echo $SHELL` : 查看电脑默认启动的 shell 类型