electron

1.Main 进程

可以完整的nodejs

mainproc/main.js

2.preload 进程

用于在web 和 main 之间通讯

mainproc/preload.js

3.web 进程
标准的web进程


问题，进程在不同的空间

package.json
中指定 的main.js 是启动入口