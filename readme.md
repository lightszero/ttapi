
注意,本仓库使用了符号链接

不同平台共享的代码,都在Common中

各个平台使用 符号链接或者目录链接 引用

在windows 上 仅限NTFS分区使用

如果非NTFS分区要用,需要手动去Common目录复制对应平台的代码到平台项目目录

# WEB平台




//可以用下述指令 clone

```
git clone https://gitee.com/lightsever/thinapi.git thinapi -c core.symlinks=true
```

```
git config --global core.symlinks true 有时不会生效
```

## WEGAME 平台

微信小游戏 的开发环境,对符号链接很不友好,所以使用了目录链接

这些目录被忽略,不会提交

首次使用时,执行wegame/link.bat 建立链接