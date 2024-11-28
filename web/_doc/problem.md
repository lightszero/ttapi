这里记录问题,以供后续改进

## 一、特性问题

### 1.b[50%] drawinstance （优化）

已经实现通过第二个vbo 作为 instance 来源的方式

还缺一个 通过ubo作为instance来源的方式

缺drawinstance 替代 render_batcher的方式，优化而已。

### 1.c[0%] 调色板 （功能）

缺失，暂时屏蔽了，只保留了 GrayAsAlpha 和 RGBA 模式

调色板，lut 等都有过去的代码。加上 +ZTest 和 alphatest

### 1.d[50%] tiledmap无例子 （功能）

### 1.e[50%] 粒子系统无例子 （功能）

目标，樱花飞舞

### 1.5[0%]文件系统API测试 （功能）

## 2.框架

ttlayer2目录结构还有些混乱

动画没引入，之前有配置动画的数据结构，json的，可以考虑迁移过来直接用

## 3.内容


