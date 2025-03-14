这个目录删干净，仅保持 在这里 执行
electron .
的能力

需要 
npm install -g electron

打包和编译electron所需内容，进入electron_init 项目处理


为什么这么别扭呢
因为electron 太复杂了

mainproc 是一个编译环境
preload 是一个编译环境
每一个页面，又是一个编译环境

所以把他拆开了

在开发业务的时候，只需要一个最简的electron 拉起环境。

业务代码在data\allin\