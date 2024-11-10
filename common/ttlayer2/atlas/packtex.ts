import { Color, Rectangle, Vector2 } from "../math/vector.js";
import * as maxrect from "../maxrects_packer/src/index.js"
import { ITexture, Render_Batcher, Sprite, Texture, TextureFormat, DrawPoint } from "../ttlayer2.js"
import { RenderEffect } from "./sprite.js";

//精灵,为啥又重写,之前的分层做的不清晰

export class SpriteData {
    format: TextureFormat
    width: number;
    height: number;
    data: Uint8Array | Uint8ClampedArray;
    CopyPixel(buf: Uint8Array | Uint8ClampedArray, index: number, format: TextureFormat, x: number, y: number): void {
        if (format == TextureFormat.R8 && this.format == TextureFormat.R8) {
            buf[index] = this.data[y * this.width + x];
        }
        else if (format == TextureFormat.R8 && this.format == TextureFormat.RGBA32) {
            let r = this.data[(y * this.width + x) * 4 + 0];
            let g = this.data[(y * this.width + x) * 4 + 1];
            let b = this.data[(y * this.width + x) * 4 + 2];
            buf[index] = r * 0.3 + g * 0.6 + b * 0.1;
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
        else if (format == TextureFormat.RGBA32 && this.format == TextureFormat.R8) {
            let r = this.data[y * this.width + x];

            buf[index] = r;
            buf[index + 1] = r;
            buf[index + 2] = r;
            buf[index + 3] = 255;
        }
    }
    CopyPixelR(buf: Uint8Array | Uint8ClampedArray, index: number, format: TextureFormat, x: number, y: number): void {
        if (format == TextureFormat.R8 && this.format == TextureFormat.R8) {
            buf[index] = this.data[y * this.width + x];
        }
        else if (format == TextureFormat.R8 && this.format == TextureFormat.RGBA32) {
            let r = this.data[(y * this.width + x) * 4 + 0];
            buf[index] = (r / 255 * r / 255) * 255;
        }
        else if (format == TextureFormat.RGBA32 && this.format == TextureFormat.RGBA32) {
            let r = this.data[(y * this.width + x) * 4 + 0];

            buf[index] = r;
            buf[index + 1] = r;
            buf[index + 2] = r;
            buf[index + 3] = 255;
        }
        else if (format == TextureFormat.RGBA32 && this.format == TextureFormat.R8) {
            let r = this.data[y * this.width + x];

            buf[index] = r;
            buf[index + 1] = r;
            buf[index + 2] = r;
            buf[index + 3] = 255;
        }
    }
}
export class PackTexture extends Texture {
    constructor(webgl: WebGL2RenderingContext, width: number, height: number, format: TextureFormat, border: number = 1) {
        super(webgl, width, height, format, null);
        this.maxrect = new maxrect.MaxRectsPacker(width, height, border);
        this.sprites = [];
        this.namedsprites = {};
        this.pixelbuf = new Uint8Array(width * height * (format == TextureFormat.RGBA32 ? 4 : 1));
        this.dirty = false;
    }
    sprites: Sprite[];
    namedsprites: { [id: string]: Sprite };
    maxrect: maxrect.MaxRectsPacker;
    pixelbuf: Uint8Array;
    dirty: boolean = false;
    //UploadImg,必须是4x4的
    AddSprite(data: SpriteData, name: string = null): Vector2 {
        if (name != null && this.namedsprites[name] != undefined)
            throw "Sprite Key 冲突";
        let rect = this.maxrect.add(data.width, data.height, null);
        for (let y = 0; y < data.height; y++) {
            for (let x = 0; x < data.width; x++) {
                let index = ((y + rect.y) * this._width + (rect.x + x));
                if (this._format == TextureFormat.RGBA32) {
                    data.CopyPixel(this.pixelbuf, index * 4, TextureFormat.RGBA32, x, y);
                }
                else {
                    data.CopyPixel(this.pixelbuf, index, TextureFormat.R8, x, y);
                }
            }
        }
        this.dirty = true;


        return new Vector2(rect.x, rect.y);
    }
    AddfontSprite(data: SpriteData, name: string = null): Sprite {
        if (name != null && this.namedsprites[name] != undefined)
            throw "Sprite Key 冲突";
        let rect = this.maxrect.add(data.width, data.height, null);
        for (let y = 0; y < data.height; y++) {
            for (let x = 0; x < data.width; x++) {
                let index = ((y + rect.y) * this._width + (rect.x + x));
                if (this._format == TextureFormat.RGBA32) {
                    //仅R通道
                    data.CopyPixelR(this.pixelbuf, index * 4, TextureFormat.RGBA32, x, y);
                }
                else {
                    data.CopyPixelR(this.pixelbuf, index, TextureFormat.R8, x, y);
                }
            }
        }
        this.dirty = true;
        let s = new Sprite(this, null);
        s.effect = RenderEffect.GrayAsAlpha;
        s.uv.U1 = rect.x / this._width;
        s.uv.V1 = rect.y / this._height;
        s.uv.U2 = (rect.x + data.width) / this._width;
        s.uv.V2 = (rect.y + data.height) / this._height;
        s.pixelwidth = data.width;
        s.pixelheight = data.height;

        s.tex = this;
        this.sprites.push(s);
        if (name != null) {
            this.namedsprites[name] = s;
        }
        return s;
    }
    Apply(force: boolean = false): void {
        if (this.dirty || force) {
            this.UploadTexture(0, 0, this._width, this._height, this.pixelbuf);
            this.dirty = false;
        }
    }


}