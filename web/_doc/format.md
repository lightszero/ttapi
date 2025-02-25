这是一个描述格式，他可以用来描述所有的资源

该格式称为TTPackage

扩展名为

.tt.json或者.tt.bin

本文介绍.tt.json 是基于json的描述格式  
将来可能会扩展.tt.bin 格式，为二进制版本,.tt.bin可以内嵌二进制部分。


所有的资源都可以用它描述


## tt.json 文本

tt.json 可以嵌入文本或者 文本文件,嵌入文本可简写

```json
{
    "txts":[
        "txt1":{"file":"data/1.txt"},
        "txt2":{"text":"data/1.txt"},
        "txt3":"HelloWorld"
    ]
}
```

## tt.json 二进制

tt.json 可以嵌入二进制base64字串，hex字串，文件引用 

```json
{
    "bins":[
        "bin1":{"file":"data/1.bin"},
        "bin2":{"base64","YXNmc2RmZA=="},
        "bin3":{"hex","1234ff6678"}
    ]
}
```

## tt.json 图片

ttjson对图片的描述，使用一个 name  和 文件名的对应  
对文件名字符串有一个扩展
可以指定pivot位置。  
将来可能还会扩展别的参数

```json
{
    "pics":[
        "dot1":"data/media/cross.png",
        "dot2":"data/media/cross.png,8,8"
    ]
}
```

## tt.json 引用


tt.json 可以引用 另外的 tt.json 或者 tt.bin

如下两个json，加载p01.tt.json 就会自动加载 p02，最终的效果和 上面直接描述两个pic是一样的

当管理很多资源时，引用可以进行适当的分组。

在所有的引用中，同类资源的key 不能重复。

比如 pics 的 key，重复就会导致有一个找不到了

Json p01.tt.json
```json
{
    "refs": [
        "p02.tt.json"
    ],
    "pics": {
        "dot2": "media/dot2.png,8,8"
    }
}
```
json p02.tt.json
```json
{
    "pics": {
        "dot1":"data/media/cross.png",
    }
}
```

## tt.json 动画

ttjson对图片的描述,是一个key 对应一个动画的描述

一个动画首先包括三个属性,均为可选

framecount,总帧数,可选，默认=frames的最大值+1

fps，帧速，可选，默认=32

loop ，是否循环，可选，默认=false

然后frames 是必选，不可为空,表示帧的数组

每帧的数据 用 frameid 和 pics 描述

frameid 表示帧号，从0开始，必须从第0帧开始，在json中不需要顺序，加载后会处理。

pics表示每帧的图像，是个字符串数组

每个字符串表示一个图片

如”p1,3,4,1,1,0"
表示：  
名为p1的图片，必须在本package或者引用的package中能找到。  
3,4 表示该图片在本动画中的位置。动画采用左上0,0的坐标系。动画锚点就在0,0点，图片可以取负位置。  
1,1 表示该图片的缩放值，1，1就是 x y 均为1倍缩放，可选  
0 表示该图片的逆时针旋转量，单位度数，可以取负，可选

"p1,3,4"也是一个合法的动画图片描述

无论是动画参数，还是图片信息，将来还可以扩展


```json
{
    "refs": [
        "图片元素.tt.json"
    ],
    "anis":{
        "ani1":{
            "framecount":30,
            "fps":30,
            "loop":false,
            "frames":[
                {
                    "frameid":0,
                    "pics":[
                        "p1,3,4,1,1,0"
                    ]
                },
                {
                    "frameid":10,
                    "pics":[
                        "p2,5,5,1,1,0"
                    ]
                }
            ]
        }
    }
}