import { Color, Rectangle, Vector2 } from "../../math/vector.js";
import * as maxrect from "../../math/maxrects_packer/src/index.js"
import { ITexture, Render_Batcher, Texture, TextureFormat, DrawPoint, ElementFormat, TextureArray } from "../../ttlayer2.js"
import { ElementSprite } from "../../graphics/pipeline/render/elem.js";


//精灵,为啥又重写,之前的分层做的不清晰
export enum ToRGBAOption {
    R2Gray,//R转灰度
    R2Alpha,//R转Alpha
}
export enum ToROption {
    R,//取R通道
    GRAY,//算灰度
    Alpha,//取Alpha
}
export class SpriteData {
    format: TextureFormat;

    // toRgba: ToRGBAOption = ToRGBAOption.R2Alpha;
    // toR: ToROption = ToROption.GRAY;
    width: number;
    height: number;
    pivotX: number = 0;
    pivotY: number = 0;
    data: Uint8Array | Uint8ClampedArray;
    ConvPixelToR(buf: Uint8Array | Uint8ClampedArray, index: number, format: TextureFormat, x: number, y: number, option: ToROption): void {

        //convtor8
        if (format == TextureFormat.R8 && this.format == TextureFormat.RGBA32) {

            let c = 0;
            if (option == ToROption.R) {
                let r = this.data[(y * this.width + x) * 4 + 0];

                c = r;
            }
            else if (option == ToROption.GRAY) {
                let r = this.data[(y * this.width + x) * 4 + 0];
                let g = this.data[(y * this.width + x) * 4 + 1];
                let b = this.data[(y * this.width + x) * 4 + 2];

                c = r * 0.3 + g * 0.6 + b * 0.1;
            }
            else if (option == ToROption.Alpha) {
                let a = this.data[(y * this.width + x) * 4 + 3];
                c = a;
            }

            buf[index] = c;
        }
        else throw "error conv.";
    }
    ConvPixelToRGBA(buf: Uint8Array | Uint8ClampedArray, index: number, format: TextureFormat, x: number, y: number, option: ToRGBAOption): void {

        //convtorgba
        if (format == TextureFormat.RGBA32 && this.format == TextureFormat.R8) {
            let r = this.data[y * this.width + x];

            if (option == ToRGBAOption.R2Gray) {
                buf[index] = r;
                buf[index + 1] = r;
                buf[index + 2] = r;
                buf[index + 3] = 255;
            }
            else {
                buf[index] = 255;
                buf[index + 1] = 255;
                buf[index + 2] = 255;
                buf[index + 3] = r;
            }
        }
        else throw "error conv.";
    }
    CopyPixel(buf: Uint8Array | Uint8ClampedArray, index: number, x: number, y: number): void {
        //同格式,直接copy
        if (this.format == TextureFormat.R8) {
            let r = this.data[y * this.width + x];

            buf[index] = r;
        }
        else {
            let r = this.data[(y * this.width + x) * 4 + 0];
            let g = this.data[(y * this.width + x) * 4 + 1];
            let b = this.data[(y * this.width + x) * 4 + 2];
            let a = this.data[(y * this.width + x) * 4 + 3];

            buf[index] = r;
            buf[index + 1] = g;
            buf[index + 2] = b;
            buf[index + 3] = a;
        }
    }
    ConvertToR(option: ToROption): SpriteData {
        if (this.format != TextureFormat.RGBA32)
            throw "only rgba can convert to R";

        let data = new SpriteData();
        data.format = TextureFormat.R8;
        data.width = this.width;
        data.height = this.height;
        data.pivotX = this.pivotX;
        data.pivotY = this.pivotY;
        data.data = new Uint8Array(this.width * this.height);
        for (let y = 0; y < this.height; y++)
            for (let x = 0; x < this.width; x++) {
                let i = y * this.width + x;

                this.ConvPixelToR(data.data, i, TextureFormat.R8, x, y, option);
            }


        return data;
    }
    ConvertToRGBA(option: ToRGBAOption): SpriteData {
        if (this.format != TextureFormat.R8)
            throw "only r8 can convert to Rgba";

        let data = new SpriteData();
        data.format = TextureFormat.RGBA32;
        data.width = this.width;
        data.height = this.height;
        data.pivotX = this.pivotX;
        data.pivotY = this.pivotY;
        data.data = new Uint8Array(this.width * this.height);
        for (let y = 0; y < this.height; y++)
            for (let x = 0; x < this.width; x++) {
                let i = (y * this.width + x) * 4;
                this.ConvPixelToRGBA(data.data, i, TextureFormat.RGBA32, x, y, option);
            }


        return data;

    }

    // 复制当前SpriteData对象，并返回一个新的SpriteData对象
    Copy(): SpriteData {
        // 创建一个新的SpriteData对象
        let data = new SpriteData();
        // 将当前对象的格式赋值给新对象的格式
        data.format = this.format;
        // 将当前对象的宽度赋值给新对象的宽度
        data.width = this.width;
        // 将当前对象的高度赋值给新对象的高度
        data.height = this.height;
        // 将当前对象的X轴锚点赋值给新对象的X轴锚点
        data.pivotX = this.pivotX;
        // 将当前对象的Y轴锚点赋值给新对象的Y轴锚点
        data.pivotY = this.pivotY;
        // 将当前对象的数据赋值给新对象的数据
        data.data = new Uint8Array(this.data.length);
        for (var i = 0; i < this.data.length; i++) {
            data.data[i] = this.data[i];
        }
        // 返回新对象
        return data;
    }
    //裁剪
    Cut(x: number, y: number, w: number, h: number): SpriteData {
        let sp = new SpriteData();
        sp.format = this.format;
        sp.width = w;
        sp.height = h;
        sp.pivotX = this.pivotX - x;
        sp.pivotY = this.pivotY - y;
        let len = TextureFormat.RGBA32 ? 4 : 1;
        sp.data = new Uint8Array(w * h * len);
        for (let j = 0; j < h; j++) {
            for (let i = 0; i < w; i++) {
                let targetindex = j * w + i;
                let srcindex = (j + y) * this.width + (i + x);
                if (len == 1) {
                    sp.data[targetindex] = this.data[srcindex];
                }
                else {

                    sp.data[targetindex * 4 + 0] = this.data[srcindex * 4 + 0];
                    sp.data[targetindex * 4 + 1] = this.data[srcindex * 4 + 1];
                    sp.data[targetindex * 4 + 2] = this.data[srcindex * 4 + 2];
                    sp.data[targetindex * 4 + 3] = this.data[srcindex * 4 + 3];
                }
            }
        }
        return sp;
    }
    //裁剪空白区
    CutByTransparent(): SpriteData {
        //寻边
        let x1 = this.width;
        let y1 = this.height;
        let x2 = 0;
        let y2 = 0;
        let len = TextureFormat.RGBA32 ? 4 : 1;
        for (let j = 0; j < this.height; j++) {
            for (let i = 0; i < this.width; i++) {

                let srcindex = (j) * this.width + (i);
                if (len == 1) {
                    if (this.data[srcindex] > 0) {
                        if (i < x1)
                            x1 = i;
                        if (j < y1)
                            y1 = j;
                        if (i > x2)
                            x2 = i;
                        if (j > y2)
                            y2 = j;
                    }
                }
                else {

                    if (this.data[srcindex * 4 + 3] > 0) {
                        if (i < x1)
                            x1 = i;
                        if (j < y1)
                            y1 = j;
                        if (i > x2)
                            x2 = i;
                        if (j > y2)
                            y2 = j;
                    }
                }
            }
        }

        if (x1 == x2 || y1 == y2) {
            //空白图像
            return null;
        }
        return this.Cut(x1, x2, x2 - x1 + 1, y2 - y1 + 1);
    }
    //往小了缩
    ScaleToSmall(srcscale: number): SpriteData {
        let w = Math.floor(this.width / srcscale);
        let h = Math.floor(this.height / srcscale);
        let sp = new SpriteData();
        sp.format = this.format;
        sp.width = w;
        sp.height = h;
        sp.pivotX = this.pivotX / srcscale;
        sp.pivotY = this.pivotY / srcscale;

        let len = TextureFormat.RGBA32 ? 4 : 1;
        sp.data = new Uint8Array(w * h * len);

        for (let j = 0; j < h; j++) {
            for (let i = 0; i < w; i++) {
                let targetindex = (j * w + i) * len;

                this.CopyPixel(sp.data, targetindex, i * srcscale, j * srcscale);
            }
        }
        return sp;
    }
}
export class PackTexture extends TextureArray {
    constructor(webgl: WebGL2RenderingContext, width: number, height: number, format: TextureFormat, layercount: number, border: number = 0) {
        super(webgl, width, height, layercount, format);
        this.maxrect = new maxrect.MaxRectsBin(width, height, border);
        //this.sprites = [];
        //this.namedsprites = {};
        this.pixelbuf = new Uint8Array(width * height * (format == TextureFormat.RGBA32 ? 4 : 1));
        this.dirty = false;
    }
    // sprites: Sprite[];
    // namedsprites: { [id: string]: Sprite };
    maxrect: maxrect.MaxRectsBin;

    pixelbuf: Uint8Array;
    dirty: boolean = false;

    AddSprite(data: SpriteData, effect: ElementFormat): ElementSprite {

        if (this._format != data.format)
            throw "error sprite format.";

        let rect = this.maxrect.add(data.width, data.height, null);
        if (rect == undefined) {
            this.maxrect.reset();
            rect = this.maxrect.add(data.width, data.height, null);
            this.Apply();
            this.curlayer++;
            if (this.curlayer >= this._layer)
                throw "AddSprite:Layer 满了"
        }

        let len = this._format == TextureFormat.RGBA32 ? 4 : 1;

        for (let y = 0; y < data.height; y++) {
            for (let x = 0; x < data.width; x++) {
                let index = ((y + rect.y) * this._width + (rect.x + x)) * len;
                data.CopyPixel(this.pixelbuf, index, x, y);
            }
        }
        this.dirty = true;
        let s = new ElementSprite();
        s.sizeTL = new Vector2(-data.pivotX, -data.pivotY);
        s.sizeRB = new Vector2(data.width - data.pivotX, data.height - data.pivotY);
        let u1 = rect.x / this._width;
        let v1 = rect.y / this._height;
        let u2 = (rect.x + data.width) / this._width;
        let v2 = (rect.y + data.height) / this._height;
        s.uvCenter = new Vector2((u1 + u2) * 0.5, (v1 + v2) * 0.5);
        s.uvHalfSize = new Vector2((u2 - u1) * 0.5, (v2 - v1) * 0.5);
        s.uvLayer = this.curlayer;
        s.eff = effect;
        return s;
    }
    curlayer: number = 0;
    Apply(force: boolean = false): void {
        if (this.dirty || force) {
            this.UploadSubTexture(this.curlayer, 0, 0, this._width, this._height, this.pixelbuf);
            this.dirty = false;
        }
    }


}

export class PackTextureDuo {
    packRGBA: PackTexture;
    packGray: PackTexture;

    AddSprite(data: SpriteData, effect: ElementFormat): ElementSprite {
        if (effect == ElementFormat.RGBA) {
            let s = this.packRGBA.AddSprite(data, effect);
            return s;
        }
        else {
            let s = this.packGray.AddSprite(data, effect);
            return s;
        }
    }
}