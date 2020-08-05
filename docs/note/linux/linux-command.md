# 常用命令

## ctrl +

- `Ctrl+c` 结束正在运行的程序
- `Ctrl+d` 退出 shell
- `Ctrl+l` 清屏 Clear
- `Ctrl+a` 切换到命令行开始
- `Ctrl+e` 切换到命令行末尾
- `Ctrl+u` 清除鼠标之前的内容
- `Ctrl+k` 清除鼠标及之后的内容
- `Ctrl+y` 在鼠标处粘贴剪切的内容
- `Ctrl+x+u` 撤销操作
- `Ctrl+x+e` 打开编辑器输入命令并自动执行。如果未安装 emacs 编辑器，无法执行“ctrl+x+e”命令
- `fc` 编辑并执行最近一条命令
- `!!` 调用最近一次执行的命令

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

**以斜线（ `/` ）开头** ，描述到文件位置的**完整路径名或绝对路径名** ，它指定了从根目录开始的完整路径信息，任何时候你想指定文件名的时候都可以使用

**相对路径：**

不以斜线（/）开头 ，指定**相对于你的当前工作目录而言的位置** ，可以被用作指定文件名的快捷方式

<p class="tip">输入命令的时候可以通过用tab键来补全</p>

#### pwd

return working directory name

`查看用户的当前目录的名字`, print working directory

#### cd

使用 cd 命名更改当前的工作目录，该命令使用目标目录名作为参数

```shell
# SYNOPSIS
cd [path]

# 指向当前目录
cd .

# 总是指向上一级目录
cd ..

# 指向切换前的上一次目录
cd -

# 切换到当前用户主目录的绝对路径
cd ~
```

#### ls

list directory contents

显示文件或目录信息

```shell
# SYNOPSIS
ls [-ABCFGHLOPRSTUW@abcdefghiklmnopqrstuwx1%] [file ...]

# 显示文件和目录的详细资料
ls -l
# 显示隐藏文件。隐藏文件以 . 开头命名
ls -a
# 查看目录中的文件
ls -F
```

#### mkdir

make directories

当前目录下创建一个空目录

```shell
# SYNOPSIS
mkdir [-pv] [-m mode] directory_name ...

# 当前目录创建一个文件夹
mkdir filename

# 在当前目录递归创建filename1/filename2文件
mkdir -p filename1/filename2
# 如 提示 mkdir: xxx: Permission denied
# 则需要admin账号  sudo -i 输入密码 即可
```

#### rmdir

remove directories

删除文件夹，要求目录为空

```shell
# SYNOPSIS
rmdir [-p] directory ...
```

#### touch

change file access and modification times

生成一个空文件或更改文件的时间（access time、modify time、change time）

```shell
# SYNOPSIS
touch [-A [-][[hh]mm]SS] [-acfhm] [-r file]
      [-t [[CC]YY]MMDDhhmm[.SS]] file ...

# 查看abc.txt 如果不存在则自动创建
touch abc.txt
```

#### cp

copy files

复制文件或目录

```shell
# SYNOPSIS
cp [-R [-H | -L | -P]] [-fi | -n] [-apvX] source_file target_file
cp [-R [-H | -L | -P]] [-fi | -n] [-apvX] source_file ... target_directory

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

walk a file hierarchy

查找文件

```shell
# SYNOPSIS
find [-H | -L | -P] [-EXdsx] [-f path] path ... [expression]
find [-H | -L | -P] [-EXdsx] -f path [path ...] [expression]

# .代表当前目录
# 查找当前目录及其子目录下扩展名为txt的文件
find . -name '*.txt'

# 搜索当前目录含子目录中，所有文件名以my开头的文件
find . -name 'my*'

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

concatenate and print files

查看文本文件内容，cat 命令是整个文件的内容从上到下显示在屏幕上。还可以将多个文件连接起来显示，它常与重定向符号配合使用，适用于文件内容少的情况

```shell
# SYNOPSIS
cat [-benstuv] [file ...]

# 查看test.log 的文件内容
cat test.log

# 查看test.log的文件内容并显示行号，--number    对输出的所有行编号
cat -n test.log

# 查看test.log的文件内容并不输出多行空行， --squeeze-blank    不输出多行空行
cat -n test.log

# 如果你想要使cat命令显示非打印字符。可以使用-v命令行选项来完成，--number   对输出的所有行编号
cat -v [filename]

# cat是一次性显示整个文件的内容，more和less一般用于显示文件内容超过一屏的内容，并且提供翻页的功能。more比cat强大，提供分页显示的功能，less比more更强大，提供翻页，跳转，查找等命令。而且more和less都支持：用空格显示下一页，按键b显示上一页。

# cat 有创建文件的功能，创建文件后，要以EOF或STOP结束；
cat > cypher.txt << EOF
```

#### more

more 命令会以一页一页的显示方便使用者逐页阅读，而最基本的指令就是按空白键（space）就往下一页显示，按 b 键就会往回（back）一页显示，而且还有搜寻字串的功能 。more 命令从前向后读取文件，因此在启动时就加载整个文件

```shell
# 命令格式
more [-dlfpcsu][-num] [+/pattern][+linenum] [file ...]

# 命令功能
more 命令和 cat 的功能一样都是查看文件里的内容，但有所不同的是 more 可以按页来查看文件的内容，还支持直接跳转行等功能。

# 常用参数列表
+num 从第 num 行开始显示
-num 定义屏幕大小，为num行
-d 在每屏的底部显示友好的提示信息
-l 忽略 Ctrl+l （换页符）。如果没有给出这个选项，则 more 命令在显示了一个包含有 Ctrl+l 字符的行后将暂停显示，并等待接收命令。
-f 计算行数时，以实际上的行数，而非自动换行过后的行数（有些单行字数太长的会被扩展为两行或两行以上）
-p 显示下一屏之前先清屏。
-c 从顶部清屏然后显示。
-s 文件中连续的空白行压缩成一个空白行显示。
-u 不显示下划线
+/pattern 先搜索 pattern 字符串，然后从字符串之后显示?
```

#### less

opposite of more

less 工具也是对文件或其它输出进行分页显示的工具，应该说是 linux 正统查看文件内容的工具，功能极其强大。less 的用法比起 more 更加的有弹性。在 more 的时候，我们并没有办法向前面翻， 只能往后面看，但若使用了 less 时，就可以使用 [pageup][pagedown] 等按键的功能来往前往后翻看文件，更容易用来查看一个文件的内容！除此之外，在 less 里头可以拥有更多的搜索功能，不止可以向下搜，也可以向上搜。

```shell
#SYNOPSIS
less -?
less --help
less -V
less --version
less [-[+]aABcCdeEfFgGiIJKLmMnNqQrRsSuUVwWX~]
    [-b space] [-h lines] [-j line] [-k keyfile]
    [-{oO} logfile] [-p pattern] [-P prompt] [-t tag]
    [-T tagsfile] [-x tab,...] [-y lines] [-[z] lines]
    [-# shift] [+[+]cmd] [--] [filename]...

# 命令格式：
less [参数]  文件

# 命令功能：
less 与 more 类似，但使用 less 可以随意浏览文件，而 more 仅能向前移动，却不能向后移动，而且 less 在查看之前不会加载整个文件。

# 命令参数：
-b <缓冲区大小> 设置缓冲区的大小
-e  当文件显示结束后，自动离开
-f  强迫打开特殊文件，例如外围设备代号、目录和二进制文件
-g  只标志最后搜索的关键词
-i  忽略搜索时的大小写
-m  显示类似more命令的百分比
-N  显示每行的行号
-o <文件名> 将less 输出的内容在指定文件中保存起来
-Q  不使用警告音
-s  显示连续空行为一行
-S  行过长时间将超出部分舍弃
-x <数字> 将“tab”键显示为规定的数字空格

# 命令动作：
/字符串：向下搜索“字符串”的功能
?字符串：向上搜索“字符串”的功能
n：重复前一个搜索（与 / 或 ? 有关）
N：反向重复前一个搜索（与 / 或 ? 有关）
b  向后翻一页
d  向后翻半页
h  显示帮助界面
q  退出 less 命令
v  调用 vim 编辑器
u  向前滚动半页
y  向前滚动一行
g 跳到第一行
G 跳到最后一行
空格键 滚动一页
回车键 滚动一行
```

#### head

display first lines of a file

显示一个文件的内容的前多少行

```shell
# SYNOPSIS
head [-n count | -c bytes] [file ...]

# 显示文件前10行
head -n 10 cypher.txt
```

#### tail

display the last part of a file

显示一个文件的内容的最后多少行

```shell
# SYNOPSIS
tail [-F | -f | -r] [-q] [-b number | -c number | -n number] [file ...]

# 显示文件的最后五行
tail -n 5 cypher.txt

# 显示文件的动态最后五行
tail -f 5 cypher.txt

# tail -f 等同于--follow=descriptor，根据文件描述符进行追踪，当文件改名或被删除，追踪停止
# tail -F 等同于--follow=name  --retry，根据文件名进行追踪，并保持重试，即该文件被删除或改名后，如果再次创建相同的文件名，会继续追踪
# tailf 等同于tail -f -n 10（貌似tail -f或-F默认也是打印最后10行，然后追踪文件），与tail -f不同的是，如果文件不增长，它不会去访问磁盘文件，所以 tailf 特别适合那些便携机上跟踪日志文件，因为它减少了磁盘访问，可以省电
```

## 文本处理

#### grep

grep（global search regular expression）是一个**强大的文本搜索工具**。grep 使用正则表达式搜索文本，并把匹配的行打印出来。

格式：`grep [options] PATTERN [FILE...]`

- PATTERN 是查找条件：**可以是普通字符串、可以是正则表达式**，通常用单引号将 RE 括起来。
- FILE 是要查找的文件，可以是用空格间隔的多个文件，也可是使用 Shell 的通配符在多个文件中查找 PATTERN，省略时表示在标准输入中查找。
- grep 命令**不会对输入文件进行任何修改或影响**，可以使用输出重定向将结果存为文件

思维导图

<img src="./asset/img/linux-shell-grep.jpg" width="1000" />

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
