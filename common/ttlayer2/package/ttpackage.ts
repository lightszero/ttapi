import { tt } from "../../ttapi/ttapi.js"
import { Rectangle, Sha256, SpriteData, TextureFormat } from "../ttlayer2.js";
import { TTPathTool } from "../utils/path/pathtool.js";

//Json 格式描述
export class TTJson {
    refs: string[];//引用
    pics: { [id: string]: string };
    anis: { [id: string]: TTJsonAni };
}
export class TTJsonAni {
    fps: number;
    framecount: number;
    loop: boolean;
    frames: TTJsonFrame[];
}
export class TTJsonFrame {
    frameid: number;
    pics: string[];
}
//包管理器
export class TTPackageMgr {

    static packages: { [id: string]: TTPackage } = {};
    static async Load(filename: string, loader: tt.ILoader): Promise<TTPackage> {
        let root = TTPathTool.GetPathName(filename);
        let name = TTPathTool.GetFileName(filename);
        let pack = this.packages[name];
        if (pack != undefined)
            return pack;

        //pack = this.packages[name] = new TTPackage(name);

        let ttjson = JSON.parse(await loader.LoadStringAsync(filename)) as TTJson;
        pack = await this.LoadFromJson(ttjson, name, root, loader);
        this.packages[name] = pack;
        return pack;
    }
    static async LoadFromJson(ttjson: TTJson, name: string, rootpath: string, loader: tt.ILoader): Promise<TTPackage> {
        //let root = TTPathTool.GetPathName(filename);
        //let name = TTPathTool.GetFileName(filename);
        //let pack = this.packages[name];
        //if (pack != undefined)
        //    return pack;

        let pack = new TTPackage(name);

        //let ttjson = JSON.parse(await loader.LoadStringAsync(filename)) as TTJson;
        //加载引用
        if (ttjson.refs != undefined) {
            pack.refs = []
            for (var i = 0; i < ttjson.refs.length; i++) {
                let pakname = ttjson.refs[i];
                if (this.packages[pakname] != undefined)
                    continue;

                let refpack = await this.Load(rootpath + "/" + pakname, loader);
                pack.refs.push(refpack);
            }
        }
        //加载pic
        if (ttjson.pics != undefined) {
            pack.pics = {}
            for (var key in ttjson.pics) {
                let picname = ttjson.pics[key];

                let pic: TTPicData = TTPicData.FromText(picname);
                if (pic.srcfile != null) {
                    let imgdata = await this.LoadPic(rootpath + "/" + pic.srcfile, loader);

                    if (pic.srcrect != null) {
                        imgdata = imgdata.Cut(pic.srcrect.X, pic.srcrect.Y, pic.srcrect.Width, pic.srcrect.Height);
                    }

                    pic.data = imgdata.data;
                    pic.width = imgdata.width;
                    pic.height = imgdata.height;

                }


                pack.pics[key] = pic;
            }
        }
        //加载动画
        if (ttjson.anis != undefined) {
            pack.anis = {};
            for (var key in ttjson.anis) {

                let ani = new TTAni(ttjson.anis[key]);
                pack.anis[key] = ani;
            }
        }
        return pack;
    }
    static async LoadPic(filename: string, loader: tt.ILoader): Promise<SpriteData> {


        let bin = await loader.LoadBinaryAsync(filename);
        let blob = new Blob([bin]);
        let imgdata = await tt.loaderex.LoadImageDataAsync(URL.createObjectURL(blob));
        let spdata = new SpriteData();
        spdata.data = imgdata.data;
        spdata.width = imgdata.width;
        spdata.height = imgdata.height;
        spdata.format = TextureFormat.RGBA32;
        return spdata;

    }

}
export class TTPicData {
    width: number;
    height: number;
    pivotX: number;
    pivotY: number;
    data: Uint8Array | Uint8ClampedArray | null; //if data=null srcfile 就是文件 ，否则srcfile 是 data 的 hash
    srcfile: string | null;
    srcrect: Rectangle | null;
    // 从文本中解析出TTPicData对象
    static FromText(picinfo: string): TTPicData {
        let picname = picinfo;
        let pivotX = 0;
        let pivotY = 0;
        let rect: Rectangle = null;
        if (picinfo.includes(";")) {
            let ws = picinfo.split(";");
            picname = ws[0];
            for (var i = 1; i < ws.length; i++) {
                let wss = ws[i].split("=");
                let key = wss[0];
                if (key == "pivot") {
                    let value = wss[1].split(",");
                    pivotX = parseInt(value[0]);
                    pivotY = parseInt(value[1]);
                }
                else if (key == "rect") {
                    let value = wss[1].split(",");
                    let x = parseInt(value[0]);
                    let y = parseInt(value[1]);
                    let w = parseInt(value[2]);
                    let h = parseInt(value[3]);
                    rect = new Rectangle(x, y, w, h);
                }
            }
        }
        let data = new TTPicData();
        //可以硬填hex数据
        if (picname.indexOf("hex:") == 0 || picname.indexOf("HEX:") == 0) {

            let width = parseInt(picname.substring(4, 6), 16);
            let height = parseInt(picname.substring(6, 8), 16);
            data.srcrect = new Rectangle(0, 0, width, height);
            data.data = new Uint8Array(width * height * 4);
            for (let i = 8; i <= picname.length - 2; i += 2) {
                data.data[i / 2 - 4] = parseInt(picname.substring(i, i + 2), 16);
            }
            let sha256 = new Sha256();
            sha256.update(data.data);
            data.srcfile = sha256.hex();//srcfile 是hash
        }
        else {
            data.srcfile = picname;//srcfile 是 file
            data.data = null;
        }
        data.pivotX = pivotX;
        data.pivotY = pivotY;
        data.srcrect = rect;
        return data;
    }
}
export class TTAni {
    constructor(ani: TTJsonAni) {
        this.fps = ani.fps;
        this.loop = ani.loop;
        if (this.fps == undefined)
            this.fps = 30;

        let mapkey: { [id: number]: number } = {};
        for (let i = 0; i < ani.frames.length; i++) {
            mapkey[ani.frames[i].frameid] = i;
        }
        if (mapkey[0] == undefined)
            throw "你至少得指定第一帧吧";
        let lastid = -1;
        let framecount = ani.framecount;
        if (framecount == undefined)
            throw "no ani.framecount value.";
        for (let i = 0; i < framecount; i++) {
            let finfo = ani.frames[mapkey[i]];

            let f = new TTAniFrame();
            if (finfo == undefined) {
                f.refframe = lastid;
            }
            else {
                f.refframe = -1;
                lastid = i;
                f.pics = [];
                //name,x,y[,scalex,scaley,rotate]
                for (let j = 0; j < finfo.pics.length; j++) {

                    let p = new TTAniPicInfo();
                    let pwords = finfo.pics[j].split(";");
                    p.name = pwords[0];
                    for (let k = 1; k < pwords.length; k++) {
                        let wss = pwords[k].split("=");
                        let key = wss[0];
                        let value = wss[1];
                        if (key == "pos") {
                            let values = value.split(",");
                            p.x = parseInt(values[0]);
                            p.y = parseInt(values[1]);
                        }
                        else if (key == "scale") {
                            let values = value.split(",");
                            p.scaleX = parseInt(values[0]);
                            p.scaleY = parseInt(values[1]);
                        }
                        else if (key == "rot") {
                            p.rotate = parseInt(value);
                        }
                    }
                    f.pics.push(p);
                }
                f.rects = [];
            }
            this.frame.push(f);
        }
    }
    frame: TTAniFrame[] = [];
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
export class TTPackage {
    private _name: string
    get Name(): string {
        return this._name;
    }
    constructor(name: string) {
        this._name = name;
    }
    refs: TTPackage[];
    pics: { [id: string]: TTPicData };
    anis: { [id: string]: TTAni };
    GetPicKey(searched: TTPackage[] = null, list: string[] = null): string[] {
        if (list == null)
            list = [];
        //避免递归
        if (searched == null)
            searched = [];
        searched.push(this);

        if (this.pics != undefined)
            for (var key in this.pics) {
                if (list.indexOf(key) < 0)
                    list.push(key);
            }

        if (this.refs != undefined) {
            for (var i = 0; i < this.refs.length; i++) {
                if (searched.includes(this.refs[i]))
                    continue;
                this.refs[i].GetPicKey(searched, list);
            }
        }
        return list;
    }
    GetAniKey(searched: TTPackage[] = null, list: string[] = null): string[] {
        if (list == null)
            list = [];
        //避免递归
        if (searched == null)
            searched = [];
        searched.push(this);

        if (this.anis != undefined)
            for (var key in this.anis) {
                if (list.indexOf(key) < 0)
                    list.push(key);
            }

        if (this.refs != undefined) {
            for (var i = 0; i < this.refs.length; i++) {
                if (searched.includes(this.refs[i]))
                    continue;
                this.refs[i].GetAniKey(searched, list);
            }
        }

        return list;
    }
    GetPic(name: string, searched: TTPackage[] = null): TTPicData {
        if (this.pics != undefined && this.pics[name] != undefined)
            return this.pics[name];

        //避免递归
        if (searched == null)
            searched = [];
        searched.push(this);

        for (var i = 0; i < this.refs.length; i++) {
            if (searched.includes(this.refs[i]))
                continue;
            let pic = this.refs[i].GetPic(name);
            if (pic != undefined)
                return pic;
        }
        return null;
    }
    GetAni(name: string, searched: TTPackage[] = null): TTAni {
        if (this.anis != undefined && this.anis[name] != undefined)
            return this.anis[name];

        //避免递归
        if (searched == null)
            searched = [];
        searched.push(this);

        for (var i = 0; i < this.refs.length; i++) {
            if (searched.includes(this.refs[i]))
                continue;
            let ani = this.refs[i].GetAni(name);
            if (ani != null)
                return ani;
        }
        return null;
    }

}