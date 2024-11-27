这里记录问题,以供后续改进
## 1.特性

动态字体,支持自定义TTF,可以canvas 没有办法控制字体Mint 效果
  
### 1.a[50%] transform feedback  
    
已经搞清楚 tf 进行 A -> B -> A的交替操作 和 upload buffer 混用时,需要fence.

在移动平台, tf 的操作当帧不能立即完成,需要用fence机制去确认.

*已经搞清楚了webgl 进行 fence 的代码

### 1.b[50%] drawinstance

已经实现通过第二个vbo 作为 instance 来源的方式

还缺一个 通过ubo作为instance来源的方式

### 1.c[0%] texturearray

该特性基本上没有价值,回收

## 2.框架

### 2.a UI没必要独立在ttlayer2 之外

### 2.b 更简洁的场景系统
    
[待改]View 改名 DrawLayer 绘制层

一个代表一层

GUI 和 Canvas,只保留两种层


Canvas 下面的Node一定要轻
GameObject+ComponentList 的模式太重,不适合js.堆栈太深,切for循环没有命中

如果需要SceneTree,使用者自己组织也并没有什么难度

但是太轻的设计,又没办法组织出 对象 这个概念



## 3.内容