这里记录问题,以供后续改进

## 一、特性问题

### 1.a[100%] drawinstance （优化）

    各种类型的DrawInstance 都实现了
    
    DrawInstance 在降低CPU方面很有益处

### 1.b[50%] transform feedback

    实现了通过tf实现的简单粒子系统，但是需要syncfence  
    如果用ubo信息去刷增加的顶点信息，可能可以做到 无需syncfence  

### 1.c[0%] 调色板 （功能）

缺失，暂时屏蔽了，只保留了 GrayAsAlpha 和 RGBA 模式

调色板，lut 等都有过去的代码。加上 +ZTest 和 alphatest

文字 用32 像素，要做到 2048*2048 一张 R8 =4MB

导入调色板可以缩减75%的贴图容量，但是大面积的有tiledmap

调色板图像可能就没啥用。

### 1.d[50%] tiledmap无例子 （功能）

### 1.e[50%] 粒子系统无例子 （功能）

目标，樱花飞舞

### 1.5[0%]文件系统API测试 （功能）

## 2.框架

ttlayer2目录结构还有些混乱

动画没引入，之前有配置动画的数据结构，json的，可以考虑迁移过来直接用

## 3.内容


