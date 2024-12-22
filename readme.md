
# TTAPI是什么

TTAPI 是一组typescirpt 接口  
他抽象了开发小游戏所需的基本接口,并提供多种平台的实现  
其中包括:Web 微信小游戏等.

# TTLayer2

在TTAPI之上,抽象了一些更高级的功能,主要基于 Webgl2 实现

# 工具

ver 0.02

[像素 编辑器](./webtool/ttpixel/index.html)

[TiledMap 编辑器](./webtool/tiled/index.html)

# 示例
[基本示例](./web/index.html)


# 注意

由于 windows 符号链接 仅支持NTFS分区.  

各个路径,不同程度的通过链接方式使用了common目录的代码  

所以对于 ttxxx 这些路径都是忽略的  

你可根据自己的情况,通过执行不同环境的link.bat 或者 link.sh 创建符号链接

或者直接copy对应的代码.

## 测试环境

所有代码都会经过 NTFS 分区+link.bat 的方式测试.

# WEB平台
