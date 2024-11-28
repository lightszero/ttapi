ttapi 核心接口定义

ttimpl_web  核心接口实现

ttlayer2  平台无关通用实现  
-->app 核心框架和 一些逻辑组件 状态机 导航器什么的  
-->atlas **图集相关，命名有些混乱    
-->graphics 核心图形元素 texture shader 之类  
---->pipeline 管线，这个毫无疑问算graphic

-->math  数学库  
---->maxrects_packer 三方打包库 
---->perlin 柏林噪声

-->resources ** 资源相关，这和图集有点冲突，要再理一理  

-->ttui 界面

-->utils //辅助类的东西往工具搬运，纯数学的辅助类进math
---->text ** 动态字体的封装
---->stream ** IO流的封装，好像没屁用