import { Color, Rectangle, Vector2 } from "../../math/vector.js";
import * as maxrect from "../../math/maxrects_packer/src/index.js"
import { ITexture, Render_Batcher, Sprite, Texture, TextureFormat, DrawPoint, SpriteFormat, TextureArray } from "../../ttlayer2.js"


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
    format: TextureFormat

    toRgba: ToRGBAOption = ToRGBAOption.R2Alpha;
    toR: ToROption = ToROption.GRAY;
    width: number;
    height: number;
    data: Uint8Array | Uint8ClampedArray;
    CopyPixel(buf: Uint8Array | Uint8ClampedArray, index: number, format: TextureFormat, x: number, y: number): void {
        //同格式,直接copy
        if (format == TextureFormat.R8 && this.format == TextureFormat.R8) {
            let r = this.data[y * this.width + x];

            buf[index] = r;
        }
        else if (format == TextureFormat.RGBA32 && this.format == TextureFormat.RGBA32) {
            let r = this.data[(y * this.width + x) * 4 + 0];
            let g = this.data[(y * this.width + x) * 4 + 1];
            let b = this.data[(y * this.width + x) * 4 + 2];
            let a = this.data[(y * this.width + x) * 4 + 3];

            buf[index] = r;
            buf[index + 1] = g;
            buf[index + 2] = b;
            buf[index + 3] = a;
        }
        //convtor8
        else if (format == TextureFormat.R8 && this.format == TextureFormat.RGBA32) {

            let c = 0;
            if (this.toR == ToROption.R) {
                let r = this.data[(y * this.width + x) * 4 + 0];

                c = r;
            }
            else if (this.toR == ToROption.GRAY) {
                let r = this.data[(y * this.width + x) * 4 + 0];
                let g = this.data[(y * this.width + x) * 4 + 1];
                let b = this.data[(y * this.width + x) * 4 + 2];

                c = r * 0.3 + g * 0.6 + b * 0.1;
            }
            else if (this.toR == ToROption.Alpha) {
                let a = this.data[(y * this.width + x) * 4 + 3];
                c = a;
            }

            buf[index] = c;
        }
        //convtorgba
        else if (format == TextureFormat.RGBA32 && this.format == TextureFormat.R8) {
            let r = this.data[y * this.width + x];

            if (this.toRgba == ToRGBAOption.R2Gray) {
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
    }

}
export class PackTexture extends TextureArray {
    constructor(webgl: WebGL2RenderingContext, width: number, height: number, format: TextureFormat, layercount: number, border: number = 0) {
        super(webgl, width, height, 10, format);
        this.maxrect = new maxrect.MaxRectsBin(width, height, border);
        this.sprites = [];
        this.namedsprites = {};
        this.pixelbuf = new Uint8Array(width * height * (format == TextureFormat.RGBA32 ? 4 : 1));
        this.dirty = false;
    }
    sprites: Sprite[];
    namedsprites: { [id: string]: Sprite };
    maxrect: maxrect.MaxRectsBin;

    pixelbuf: Uint8Array;
    dirty: boolean = false;
    //UploadImg,必须是4x4的
    GetSprite(name: string): Sprite {
        return this.namedsprites[name];
    }
    AddSprite(data: SpriteData, effect: SpriteFormat, name: string = null): Sprite {
        if (name != null && this.namedsprites[name] != undefined)
            throw "AddSprite:Sprite Key 冲突";
        let rect = this.maxrect.add(data.width, data.height, null);
        if (rect == undefined) {
            this.maxrect.reset();
            rect = this.maxrect.add(data.width, data.height, null);
            this.Apply();
            this.curlayer++;
            if (this.curlayer >= this._layer)
                throw "AddSprite:Layer 满了"
        }

        for (let y = 0; y < data.height; y++) {
            for (let x = 0; x < data.width; x++) {
                let index = ((y + rect.y) * this._width + (rect.x + x));
                if (this._format == TextureFormat.RGBA32) {
                    //仅R通道
                    data.CopyPixel(this.pixelbuf, index * 4, TextureFormat.RGBA32, x, y);
                }
                else {
                    data.CopyPixel(this.pixelbuf, index, TextureFormat.R8, x, y);
                }
            }
        }
        this.dirty = true;
        let s = new Sprite(this, null);
        s.effect = effect;
        s.uv.U1 = rect.x / this._width;
        s.uv.V1 = rect.y / this._height;
        s.uv.U2 = (rect.x + data.width) / this._width;
        s.uv.V2 = (rect.y + data.height) / this._height;
        s.pixelwidth = data.width;
        s.pixelheight = data.height;
        s.uvlayer = this.curlayer;
        s.tex = this;
        this.sprites.push(s);
        if (name != null) {
            this.namedsprites[name] = s;
        }
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