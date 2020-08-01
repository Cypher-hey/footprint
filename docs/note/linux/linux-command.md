# 常用命令

## 系统信息

- arch 显示机器的处理器架构(1)
- uname -m 显示机器的处理器架构(2)
- uname -r 显示正在使用的内核版本
- dmidecode -q 显示硬件系统部件 - (SMBIOS / DMI)
- hdparm -i /dev/hda 罗列一个磁盘的架构特性
- hdparm -tT /dev/sda 在磁盘上执行测试性读取操作
- cat /proc/cpuinfo 显示 CPU info 的信息
- cat /proc/interrupts 显示中断
- cat /proc/meminfo 校验内存使用
- cat /proc/swaps 显示哪些 swap 被使用
- cat /proc/version 显示内核的版本
- cat /proc/net/dev 显示网络适配器及统计
- cat /proc/mounts 显示已加载的文件系统
- lspci -tv 罗列 PCI 设备
- lsusb -tv 显示 USB 设备
- date 显示系统日期
- cal 2007 显示 2007 年的日历表
- date 041217002007.00 设置日期和时间 - 月日时分年.秒
- clock -w 将时间修改保存到 BIOS

## 文件、目录操作

**绝对路径：**

**以斜线（ `/` ）开头** ，描述到文件位置的**完整说明** ，任何时候你想指定文件名的时候都可以使用

**相对路径：**

不以斜线（/）开头 ，指定**相对于你的当前工作目录而言的位置** ，可以被用作指定文件名的简捷方式

<p class="tip">输入命令的时候可以通过用tab键来补全</p>

#### pwd

`查看用户的当前目录`

#### cd

切换目录

```shell
# 当前目录
cd .
# 当前目录的上一级目录（父目录）
cd ..
# 切换到切换前的上一次目录
cd -
# 切换到当前用户主目录的绝对路径
cd ~
```

#### ls

显示文件或目录信息

```shell
# 显示文件和目录的详细资料
ls -l
# 显示隐藏文件。隐藏文件以 . 开头命名
ls -a
# 查看目录中的文件
ls -F
```

#### mkdir

当前目录下创建一个空目录

```shell
# 当前目录创建一个文件夹
mkdir filename

# 在当前目录递归创建filename1/filename2文件
mkdir -p filename1/filename2
# 如 提示 mkdir: xxx: Permission denied
# 则需要admin账号  sudo -i 输入密码 即可
```

#### rmdir

删除文件夹，要求目录为空

#### touch

生成一个空文件或更改文件的时间（access time、modify time、change time）

```shell
# 查看abc.txt 如果不存在则自动创建
touch abc.txt
```

#### cp

复制文件或目录

```shell
# 复制filename文件至home目录下
cp filename /home

# 复制filename1文件夹和其所有子文件 至 /home/dirname目录下
cp -r filename /home/dirname

# 复制filename1文件夹和其所有子文件 至 /home/dirname目录下并重命名为filename2
cp -r filename1 /home/dirname/filename2
```

#### mv

移动文件或目录、文件或目录改名

```shell
# 把filename1文件的名字修改为filename2
mv filename1 filename2

# 将filename1文件 移动到/home/dirname 目录下
mv filename1 /home/dirname/
```

#### rm

删除文件或目录

```shell
# 删除filename文件(存在子文件时不可删除)
rm filename

# 删除file文件下的所有目录文件
rm -r /filename

# 删库跑路专用命令 :)
rm -rf ./*
```

- `ln` ：建立链接文件

- `file/stat` ：查看文件类型或文件属性信息

- `more` ：可以分页看
- `less` ：不仅可以分页，还可以方便地搜索，回翻等操作
- `tail -10` ： 查看文件的尾部的 10 行
- `head -20` ：查看文件的头部 20 行
- `echo` ：把内容重定向到指定的文件中 ，有则打开，无则创建
- 管道命令 `|` ：将前面的结果给后面的命令，例如：ls -la | wc，将 ls 的结果加油 wc 命令来统计字数
- 重定向 `>` 是**覆盖**模式，`>>` 是**追加**模式，例如：echo "hey, world" > hello.txt 把左边的输出放到右边的文件里去
- `cmod`：修改文件权限
  ```shell
  # 每个人都可以对filename文件进行读写和执行的权限
  chmod 777 filename
  # 每个人都可以对filename文件进行读写操作
  chmod 666 filename
  ```

例：

- 命令 ls /usr/bin/w\* 的效果是： 列出指定目录下的所有以 w 开头的文件或目录
- 命令 ls /usr/bin/w?? 的效果是： 列出指定目录下的以 w 开头名称长度为 3 的所有文件或目录
- 命令 ls /usr/bin/[xyz]\* 的效果是： 列出指定目录下的文件名以 x 或 y 或 z 开头的所有文件或目录
- 命令 ls /usr/bin/[!a-h]\* 的效果是： 列出指定目录下的文件名不以 a 到 h 区间字母开头的所有文件或目录

## 文件搜索

#### find

查找文件

```shell
# .代表当前目录
# 查找当前目录及其子目录下扩展名为txt的文件
find . -name '*.txt'

# 列出两天内修改过的文件
find . -mtime -2

# 列出三天内被存取的文件
find . -atime -3

# 半个小时内被修改过的文件
find . -mmin +30

# 四十分钟内被存取过的文件
find . -amin +40

# 查找当前目录超过1M的文件
find . -size +1M

# 查找当前目录超过1M的文件
find .  -size -1M

# 超过512k的文件
find .  -size   +512k

# 查找当前目录为空的文件或者文件夹
find . -empty
```

## 文件内容

#### cat

查看文本文件内容

```shell
# 查看test.log 的文件内容
cat test.log

# 查看test.log的文件内容并显示行号
cat -n test.log

# more、less和cat作用基本相同，只不过more可以按页码来查看。 都是按q退出查看
# 使用命令时，空格键翻页(显示下一屏内容)
# 回车：显示下一行内容
```

## 文本处理

#### grep 命令

grep(global search regular expression)是一个**强大的文本搜索工具**。grep 使用正则表达式搜索文本，并把匹配的行打印出来。

格式：`grep [options] PATTERN [FILE...]`

- PATTERN 是查找条件：**可以是普通字符串、可以是正则表达式**，通常用单引号将 RE 括起来。
- FILE 是要查找的文件，可以是用空格间隔的多个文件，也可是使用 Shell 的通配符在多个文件中查找 PATTERN，省略时表示在标准输入中查找。
- grep 命令**不会对输入文件进行任何修改或影响**，可以使用输出重定向将结果存为文件

```shell
// 应用

# 查看nginx的进程
ps -ef|grep nginx

# 查看nginx的进程个数
ps -ef|grep nginx -c

# 查找test.log 中以o开头的内容
cat test.log | grep ^o

# 查找test.log中以K结尾的内容
cat test.log | grep $k

# 在test.log中搜索bd4f63cc918611e8a14f7c04d0d7fdcc并高亮，等同于 grep 'bd4f63cc918611e8a14f7c04d0d7fdcc' test.log --color
cat test.log | grep 'bd4f63cc918611e8a14f7c04d0d7fdcc' --color

# 搜索结果显示行数
grep -n 'abc' test.log

# 从多个文件中查找abc
grep 'abc' test1.log test2.log
```

## 网络

## 压缩与解压

打包和压缩：

- 打包是指将一大堆文件或目录什么的变成一个总的文件
- 压缩则是将一个大的文件通过一些压缩算法变成一个小文件

常用的压缩的命令：

- `gzip filename`
- `bzip2 filename`
- `tar -zcvf filename`

常用的解压命令:

- `gzip -d filename.gz`
- `bzip2 -d filename.bz2`
- `tar cvf filename.tar dirname` 打包一个 tar
- `tar xvf filename.tar` 解开一个 tar
- `tar zcvf filename.tar.gz dirname` 打包压缩一个 tar
- `tar zxvf filename.tar.gz` 解压一个 tar

## 文件权限

## 用户和群组

## 磁盘空间

## 挂载系统

## 关机

- shutdown -h now 关闭系统(1)
- init 0 关闭系统(2)
- telinit 0 关闭系统(3)
- shutdown -h hours:minutes & 按预定时间关闭系统
- shutdown -c 取消按预定时间关闭系统
- shutdown -r now 重启(1)
- reboot 重启(2)
- logout 注销
