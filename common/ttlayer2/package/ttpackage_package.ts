import { GifReader } from "../ts-gif/omggif.js";
import { Rectangle, Sha256, SpriteData, TextureFormat, tt, TTAni, TTAniFrame, TTAniPicInfo, TTPathTool, Vector2 } from "../ttlayer2.js";
import { TTJson } from "./ttpackage_json.js";

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

                    // if (pic.srcrect != null) {
                    //     imgdata = imgdata.Cut(pic.srcrect.X, pic.srcrect.Y, pic.srcrect.Width, pic.srcrect.Height);
                    // }

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
                let ttanijson = ttjson.anis[key];
                let ani = null;
                if (ttanijson.import != undefined) {
                    //导入选项开着
                    ani = await this.ImportGIF(pack, ttanijson.import, rootpath, loader);
                    ani.loop = ttanijson.loop;
                }
                else {
                    ani = new TTAni();
                    ani.InitFromAniJson(ttanijson);
                }
                pack.anis[key] = ani;
            }
        }
        return pack;
    }
    //可能会往包里加图片
    static async ImportGIF(pack: TTPackage, importstr: string, rootpath: string, loader: tt.ILoader): Promise<TTAni> {
        let ani = new TTAni();
        ani.fps = 100;//GIF的设计为固定一百帧
        let words = importstr.split(";");
        let filename = words[0];
        let ext = TTPathTool.GetExt(filename);
        console.log("InitFromImport ext=" + ext);
        let srcscale = 1;//这个指的是原始缩放
        let pivot = Vector2.Zero;
        for (var i = 1; i < words.length; i++) {
            let line = words[i];
            let lwords = line.split("=");
            let key = lwords[0];
            let value = lwords[1];
            if (key == "srcscale") {
                srcscale = parseFloat(value);
            }
            else if (key == "pivot") {
                let vwords = value.split(",");
                pivot.X = parseFloat(vwords[0]);
                pivot.Y = parseFloat(vwords[1]);
            }
        }
        console.log("InitFromImport srcscale=" + srcscale + " pivot=" + pivot.X + "," + pivot.Y)
        let gifbs = await loader.LoadBinaryAsync(rootpath + "/" + filename);

        let gifRender = new GifReader(new Uint8Array(gifbs));
        // let realw = gifRender.width / srcscale;
        // let realh = gifRender.height / srcscale;
        for (var i = 0; i < gifRender.numFrames(); i++) {
            let finfo = gifRender.frameInfo(i);

            let data = new Uint8Array(gifRender.width * gifRender.height * 4);
            gifRender.decodeAndBlitFrameRGBA(i, data);

            //利用spriteData来做转换
            let spdata = new SpriteData()
            spdata.width = gifRender.width;
            spdata.height = gifRender.height;
            spdata.data = data;
            spdata.format = TextureFormat.RGBA32;
            spdata = spdata.ScaleToSmall(srcscale);
            spdata.pivotX = pivot.X;
            spdata.pivotY = pivot.Y;
            spdata = spdata.CutByTransparent();
            let pic = TTPicData.FromData(spdata.width, spdata.height, spdata.data);
            pic.pivotX = spdata.pivotX;
            pic.pivotY = spdata.pivotY;

            pack.pics[pic.srcfile] = pic;

            let picinfo = new TTAniPicInfo();
            picinfo.name = pic.srcfile;

            let aniFrame = new TTAniFrame();
            aniFrame.pics = [];
            aniFrame.pics.push(picinfo);

            let lastframe = ani.frames.length;
            ani.frames.push(aniFrame);

            for (var d = 1; d < finfo.delay; d++) {
                let aniFrameSame = new TTAniFrame();
                aniFrameSame.refframe = lastframe;
                ani.frames.push(aniFrameSame);
            }
        }
        return ani;
    }


    // 静态方法，异步加载图片
    static async LoadPic(filename: string, loader: tt.ILoader): Promise<SpriteData> {


        // 异步加载二进制文件
        let bin = await loader.LoadBinaryAsync(filename);
        // 将二进制文件转换为Blob对象
        let blob = new Blob([bin]);
        // 异步加载图片数据
        let imgdata = await tt.loaderex.LoadImageDataAsync(URL.createObjectURL(blob));
        // 创建SpriteData对象
        let spdata = new SpriteData();
        // 将图片数据赋值给SpriteData对象的data属性
        spdata.data = imgdata.data;
        // 将图片宽度赋值给SpriteData对象的width属性
        spdata.width = imgdata.width;
        // 将图片高度赋值给SpriteData对象的height属性
        spdata.height = imgdata.height;
        // 将图片格式赋值给SpriteData对象的format属性
        spdata.format = TextureFormat.RGBA32;
        // 返回SpriteData对象
        return spdata;

    }

}

export class TTPackage {
    private _name: string
    get Name(): string {
        return this._name;
    }
    constructor(name: string) {
        this._name = name;
    }
    refs: TTPackage[] = [];
    pics: { [id: string]: TTPicData } = {};
    anis: { [id: string]: TTAni } = {};
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

export class TTPicData {
    width: number;
    height: number;
    pivotX: number;
    pivotY: number;
    data: Uint8Array | Uint8ClampedArray | null; //if data=null srcfile 就是文件 ，否则srcfile 是 data 的 hash
    srcfile: string | null;//运行时要这东西干什么?为了让资源可以晚点加载?好像没啥大用
    IsInnerHex(): boolean {
        if (this.srcfile.indexOf("hex:") == 0 || this.srcfile.indexOf("HEX:") == 0) {

            return true;
        }
    }
    FillHexSrcName(data: Uint8Array | Uint8ClampedArray): void {
        this.srcfile = "hex:";
        for (var i = 0; i < data.length; i++) {
            let hstr = data[i].toString(16);
            if (hstr.length == 1) {
                this.srcfile += "0" + hstr;
            }
            else {
                this.srcfile += hstr;
            }
        }
    }
    //srcrect: Rectangle | null;
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
                // else if (key == "rect") {
                //     let value = wss[1].split(",");
                //     let x = parseInt(value[0]);
                //     let y = parseInt(value[1]);
                //     let w = parseInt(value[2]);
                //     let h = parseInt(value[3]);
                //     rect = new Rectangle(x, y, w, h);
                // }
            }
        }
        let data = new TTPicData();
        //可以硬填hex数据
        if (picname.indexOf("hex:") == 0 || picname.indexOf("HEX:") == 0) {

            let width = parseInt(picname.substring(4, 6), 16);
            let height = parseInt(picname.substring(6, 8), 16);
            //data.srcrect = new Rectangle(0, 0, width, height);
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
        //data.srcrect = rect;
        return data;
    }
    static FromData(width: number, height: number, data: Uint8Array | Uint8ClampedArray): TTPicData {

        let picdata = new TTPicData();
        picdata.width = width;
        picdata.height = height;
        picdata.data = data;
        picdata.pivotX = 0;
        picdata.pivotY = 0;
        let sha256 = new Sha256();
        sha256.update(data);
        picdata.srcfile = sha256.hex();
        return picdata;
    }
}