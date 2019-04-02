# linux base

#### why linux

1. 免费

2. 很多软件原生是在Linux下运行的，庞大的社区支持，生态环境好。

3. 开源，可被定制，开放，多用户的网络操作系统。

4. 相对安全稳定

#### composed

1. linux内核（linus 团队管理）

2. shell：用户与内核交互的接口

3. 文件系统：ext3、ext4等。windows 有 fat32 、ntfs

4. 第三方应用软件

#### Linux基本目录结构

Linux 文件系统是一个目录树的结构，文件系统结构从一个根目录开始，根目录下可以有任意多个文件和子目录，子目录中又可以有任意多个文件和子目录:

* **bin   存放二进制可执行文件(ls,cat,mkdir等)**
* boot  存放用于系统引导时使用的各种文件
* dev   用于存放设备文件
* **etc    存放系统配置文件**
* home  存放所有用户文件的根目录
* lib    存放跟文件系统中的程序运行所需要的共享库及内核模块
* mnt   系统管理员安装临时文件系统的安装点
* opt    额外安装的可选应用程序包所放置的位置
* proc   虚拟文件系统，存放当前内存的映射
* **root   超级用户目录**
* sbin   存放二进制可执行文件，只有root才能访问
* tmp   用于存放各种临时文件
* usr    用于存放系统应用程序，比较重要的目录/usr/local 本地管理员软件安装目录
* var    用于存放运行时需要改变数据的文件

**用户主目录**

Linux是**多用户的网络系统**！所以，我们可以在Linux下创建多个用户，**每个用户都会有自己专属的空间**。

* 所以，在创建用户时，系统管理员**会给每个用户建立一个主目录**，通常在 `/home/` 目录下
* 比如：用户hey的主目录为：`/home/hey`

**用户对自己主目录的文件拥有所有权**，可以在自己的主目录下进行相关操作。

#### 文件类型与通配符

在Linux下文件的类型：

* **普通文件** `-`
* **目录** `d`
* **符号链接** `l`
    * 硬链接： 与普通文件没什么不同，inode 都指向同一个文件在硬盘中的区块
    * 软链接： 保存了其代表的文件的绝对路径，是另外一种文件，在硬盘上有独立的区块，访问时替换自身路径(简单地理解为 Windows 中常见的快捷方式)。
* 字符设备文件 `c`
* 块设备文件 `b`
* 套接字 `s`
* 命名管道 `p`

在Linux下的通配符：

* `*`：匹配任何字符和任何数目的字符
* `?`：匹配单一数目的任何字符
* `[ ]`：匹配[ ]之内的任意一个字符
* `[! ]`：匹配除了[! ]之外的任意一个字符，!表示非的意思

#### 命令基本格式

`cmd [options] [arguments]`，options称为选项，arguments称为参数

选项和参数都作为Shell命令执行时的输入，**它们之间用空格分隔开**。

* Linux是区分大小写的

**一般来说**，后面跟的选项如果**单字符**选项前使用一个`减号-`。**单词**选项前使用两个`减号--`

* 这是一般的情况，有些命令还是不归属这种规律的(相对较少)
例：`ls -a`和`ls -all`，`a` 单个字符使用一个`-`，一个单词 `all` 使用两个`--`

在Linux中，**可执行的文件**也进行了分类：

* **内置命令**：出于效率的考虑，将一些常用命令的解释程序**构造在Shell内部**
* **外置命令**：存放在/bin、/sbin目录下的命令
* **实用程序**：存放在/usr/bin、/usr/sbin、/usr/share、/usr/local/bin等目录下的实用程序
* **用户程序**：用户程序经过编译生成可执行文件后，可作为Shell命令运行
* **Shell脚本**：由Shell语言编写的批处理文件，可作为Shell命令运行

#### 常用命令

###### 文件、目录操作命令

是使用得最多的命令了，Linux最基础的命令！

* 可用 `pwd`命令**查看用户的当前目录**
* 可用 `cd` 命令来切换目录
* `.` 表示当前目录
* `..` 表示当前目录的上一级目录（父目录）
* `-` 表示用 cd 命令切换目录前所在的目录
* `~` 表示**用户主目录的绝对路径名**

**绝对路径：**

* **以斜线（ `/` ）开头** ，描述到文件位置的**完整说明** ，任何时候你想指定文件名的时候都可以使用

**相对路径：**

* 不以斜线（/）开头 ，指定**相对于你的当前工作目录而言的位置** ，可以被用作指定文件名的简捷方式

<p class="tip">输入命令的时候可以通过用tab键来补全</p>

* `ls` ：显示文件或目录信息
    ```shell
    ls
    # 显示隐藏文件。隐藏文件以 . 开头命名
    ls -a  
    ```
* `mkdir` ：当前目录下创建一个空目录
    ```shell
    # 当前目录创建一个文件夹
    mkdir filename 

    # 在当前目录递归创建filename1/filename2文件			 		
    mkdir -p filename1/filename2  	
    # 如 提示 mkdir: xxx: Permission denied
    # 则需要admin账号  sudo -i 输入密码 即可
    ```
* `rmdir` ：要求目录为空
* `touch` ：生成一个空文件或更改文件的时间（access time、modify time、change time）
    ```shell
    # 查看abc.txt 如果不存在则自动创建
    touch abc.txt                   
    ```
* `cp` ：复制文件或目录
    ```shell
    # 复制filename文件至home目录下
    cp filename /home 

    # 复制filename1文件夹和其所有子文件 至 /home/dirname目录下 				    
    cp -r filename /home/dirname  

    # 复制filename1文件夹和其所有子文件 至 /home/dirname目录下并重命名为filename2		    
    cp -r filename1 /home/dirname/filename2  	
    ```
* `mv` ：移动文件或目录、文件或目录改名
    ```shell
    # 把filename1文件的名字修改为filename2
    mv filename1 filename2

    # 将filename1文件 移动到/home/dirname 目录下					
    mv filename1 /home/dirname/  			
    ```
* `rm` ：删除文件或目录
    ```shell
    # 删除filename文件(存在子文件时不可删除)
    rm filename 

    # 删除file文件下的所有目录文件						
    rm -r /filename	

    # 删库跑路专用命令 :)		 	    
    rm -rf ./*  					
    ```
* `ln` ：建立链接文件
* `find` ：查找文件
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
* `file/stat` ：查看文件类型或文件属性信息
* `cat` ：查看文本文件内容
    ```shell
    # 查看test.log 的文件内容
    cat test.log  	

    # 查看test.log的文件内容并显示行号
    cat -n test.log 			

    # more、less和cat作用基本相同，只不过more可以按页码来查看。 都是按q退出查看
    # 使用命令时，空格键翻页(显示下一屏内容)
    # 回车：显示下一行内容
    ```
* `more` ：可以分页看
* `less` ：不仅可以分页，还可以方便地搜索，回翻等操作
* `tail -10` ： 查看文件的尾部的10行
* `head -20` ：查看文件的头部20行
* `echo` ：把内容重定向到指定的文件中 ，有则打开，无则创建
* 管道命令 `|` ：将前面的结果给后面的命令，例如：ls -la | wc，将ls的结果加油wc命令来统计字数
* 重定向 `>` 是**覆盖**模式，`>>` 是**追加**模式，例如：echo "hey, world" > hello.txt把左边的输出放到右边的文件里去
* `cmod`：修改文件权限
    ```shell
    # 每个人都可以对filename文件进行读写和执行的权限
    chmod 777 filename		
    # 每个人都可以对filename文件进行读写操作
    chmod 666 filename 		
    ```


例：

* 命令 ls /usr/bin/w* 的效果是： 列出指定目录下的所有以w开头的文件或目录
* 命令 ls /usr/bin/w?? 的效果是： 列出指定目录下的以w开头名称长度为3的所有文件或目录
* 命令 ls /usr/bin/[xyz]* 的效果是： 列出指定目录下的文件名以x或y或z开头的所有文件或目录
* 命令 ls /usr/bin/[!a-h]* 的效果是： 列出指定目录下的文件名不以a到h区间字母开头的所有文件或目录

###### 文件打包和压缩命令

打包和压缩：

* 打包是指将一大堆文件或目录什么的变成一个总的文件
* 压缩则是将一个大的文件通过一些压缩算法变成一个小文件

常用的压缩的命令：

* `gzip filename`
* `bzip2 filename`
* `tar -zcvf filename`

常用的解压命令:

* `gzip -d filename.gz`
* `bzip2 -d filename.bz2`
* `tar cvf filename.tar dirname`  打包一个tar
* `tar xvf filename.tar`         解开一个tar
* `tar zcvf filename.tar.gz dirname` 打包压缩一个tar
* `tar zxvf filename.tar.gz ` 解压一个tar

###### grep命令

grep(global search regular expression)是一个**强大的文本搜索工具**。grep 使用正则表达式搜索文本，并把匹配的行打印出来。

格式：`grep [options] PATTERN [FILE...]`

* PATTERN 是查找条件：**可以是普通字符串、可以是正则表达式**，通常用单引号将RE括起来。
* FILE 是要查找的文件，可以是用空格间隔的多个文件，也可是使用Shell的通配符在多个文件中查找PATTERN，省略时表示在标准输入中查找。
* grep 命令**不会对输入文件进行任何修改或影响**，可以使用输出重定向将结果存为文件


```shell
ps -ef|grep nginx  			    查看nginx的进程
ps -ef|grep nginx -c			查看nginx的进程个数
cat test.log | grep ^a  		查找test.log 中以o开头的内容
cat test.log | grep $k  		查找test.log中以K结尾的内容
cat test.log | grep 'bd4f63cc918611e8a14f7c04d0d7fdcc' --color     在test.log中搜索bd4f63cc918611e8a14f7c04d0d7fdcc并高亮
等同于 grep 'bd4f63cc918611e8a14f7c04d0d7fdcc' test.log --color

grep -n 'abc' test.log  		搜索结果显示行数
grep 'abc' test1.log test2.log  	从多个文件中查找abc
```




