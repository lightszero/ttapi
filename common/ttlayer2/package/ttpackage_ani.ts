import { Rectangle } from "../ttlayer2.js";
import { TTJsonAni } from "./ttpackage_json.js";


export class TTAni {
    // constructor(a) {

    //     if (ani.import != undefined) {
    //         this.InitFromImport(ani.import);
    //         return;
    //     }
    //     else {
    //         this.InitFromAniJson(ani);
    //     }
    // }
    InitFromAniJson(ani: TTJsonAni) {
        // 初始化循环
        this.loop = ani.loop;
        // 初始化帧率
        this.fps = ani.fps;

        // 如果帧率未定义，则默认为30
        if (this.fps == undefined)
            this.fps = 30;

        // 创建一个映射表，用于存储帧id和帧索引的对应关系
        let mapkey: { [id: number]: number } = {};
        // 遍历所有帧，将帧id和帧索引存入映射表
        for (let i = 0; i < ani.frames.length; i++) {
            mapkey[ani.frames[i].frameid] = i;
        }
        // 如果映射表中没有第一帧，则抛出异常
        if (mapkey[0] == undefined)
            throw "你至少得指定第一帧吧";
        // 初始化最后一帧的索引
        let lastid = -1;
        // 初始化帧数
        let framecount = ani.framecount;
        // 如果帧数未定义，则抛出异常
        if (framecount == undefined)
            throw "no ani.framecount value.";
        // 遍历所有帧
        for (let i = 0; i < framecount; i++) {
            // 获取当前帧的信息
            let finfo = ani.frames[mapkey[i]];

            // 创建一个帧对象
            let f = new TTAniFrame();
            // 如果当前帧信息未定义，则将当前帧的引用帧设置为上一帧
            if (finfo == undefined) {
                f.refframe = lastid;
            }
            // 否则，将当前帧的引用帧设置为-1，并将最后一帧的索引设置为当前帧的索引
            else {
                f.refframe = -1;
                lastid = i;
                // 初始化当前帧的图片信息
                f.pics = [];
                //name,x,y[,scalex,scaley,rotate]
                // 遍历当前帧的所有图片信息
                for (let j = 0; j < finfo.pics.length; j++) {

                    // 创建一个图片信息对象
                    let p = new TTAniPicInfo();
                    // 将图片信息字符串按分号分割，得到图片名称和属性
                    let pwords = finfo.pics[j].split(";");
                    // 设置图片名称
                    p.name = pwords[0];
                    // 遍历图片的属性
                    for (let k = 1; k < pwords.length; k++) {
                        // 将属性按等号分割，得到属性名和属性值
                        let wss = pwords[k].split("=");
                        let key = wss[0];
                        let value = wss[1];
                        // 如果属性名为pos，则将属性值按逗号分割，得到x和y坐标，并转换为整数
                        if (key == "pos") {
                            let values = value.split(",");
                            p.x = parseInt(values[0]);
                            p.y = parseInt(values[1]);
                        }
                        // 如果属性名为scale，则将属性值按逗号分割，得到scalex和scaley，并转换为整数
                        else if (key == "scale") {
                            let values = value.split(",");
                            p.scaleX = parseInt(values[0]);
                            p.scaleY = parseInt(values[1]);
                        }
                        // 如果属性名为rot，则将属性值转换为整数
                        else if (key == "rot") {
                            p.rotate = parseInt(value);
                        }
                    }
                    // 将图片信息对象添加到当前帧的图片信息列表中
                    f.pics.push(p);
                }
                // 初始化当前帧的矩形信息
                f.rects = [];
            }
            // 将当前帧添加到帧列表中
            this.frames.push(f);
        }
    }
    frames: TTAniFrame[] = [];
    fps: number;
    loop: boolean;
}
export class TTRectInfo {
    tag: string;
    rect: Rectangle;
}
export class TTAniFrame {
    refframe: number = -1;//是否引用另一个引用
    pics: TTAniPicInfo[] = null;
    rects: TTRectInfo[] = null;
}
export class TTAniPicInfo {
    name: string = "";
    cacheobj: any = null;
    x: number = 0;
    y: number = 0;
    scaleX: number = 1;
    scaleY: number = 1;
    rotate: number = 0;
}
