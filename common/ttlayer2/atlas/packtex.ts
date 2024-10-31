import * as maxrect from "../maxrects_packer/src/index.js"
import { Texture, TextureFormat } from "../ttlayer2.js"

//精灵,为啥又重写,之前的分层做的不清晰
export class Sprite {
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    tex: PackTexture;
}
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
    AddSprite(data: SpriteData, name: string = null): Sprite {
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
        let s = new Sprite();
        s.x = rect.x;
        s.y = rect.y;
        s.width = data.width;
        s.height = data.height;
        s.name = name;
        s.tex = this;
        this.sprites.push(s);
        if (name != null) {
            this.namedsprites[name] = s;
        }
        return s;
    }
    Apply(): void {
        if (this.dirty) {
            this.UploadTexture(0, 0, this._width, this._height, this.pixelbuf);
            this.dirty = false;
        }
    }


}