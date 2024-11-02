import { Color, DrawPoint, Rectangle, Vector2 } from "../math/vector.js";
import * as maxrect from "../maxrects_packer/src/index.js"
import { Render_Batcher, Texture, TextureFormat } from "../ttlayer2.js"

//精灵,为啥又重写,之前的分层做的不清晰
export class Sprite {
    name: string;
    u0: number;
    v0: number;
    u1: number;
    v1: number;
    marginx: number;//左上内缩,sprite实际尺寸可以比uv区域大
    marginy: number;
    width: number;
    height: number;
    offsetx: number; //中心点
    offsety: number;
    tex: PackTexture;
    private static _quad: DrawPoint[] = null;
    Render(bathcer: Render_Batcher, pos: Vector2, scale: Vector2, color: Color, eff: number) {
        if (Sprite._quad == null) {
            Sprite._quad = [];
            Sprite._quad.push(new DrawPoint());
            Sprite._quad.push(new DrawPoint());
            Sprite._quad.push(new DrawPoint());
            Sprite._quad.push(new DrawPoint());
        }
        let px0 = pos.X + (this.offsetx) * (scale.X);
        let py0 = pos.Y + (this.offsety) * (scale.Y);
        let px1 = pos.X + (this.u1 - this.u0 + this.offsetx) * scale.X;
        let py1 = pos.Y + (this.v1 - this.v0 + this.offsety) * scale.Y;
        let p0 = Sprite._quad[0];
        p0.x = px0;
        p0.y = py0;
        p0.z = 0;
        p0.r = color.R;
        p0.g = color.G;
        p0.b = color.B;
        p0.a = color.A;
        p0.u = this.u0 / this.tex._width;
        p0.v = this.v0 / this.tex._height;
        p0.palx = 0;
        p0.paly = 0;
        p0.anyz = 0;
        p0.eff = eff;
        let p1 = Sprite._quad[1];
        p1.x = px1;
        p1.y = py0;
        p1.z = 0;
        p1.r = color.R;
        p1.g = color.G;
        p1.b = color.B;
        p1.a = color.A;
        p1.u = this.u1 / this.tex._width;
        p1.v = this.v0 / this.tex._height;
        p1.palx = 0;
        p1.paly = 0;
        p1.anyz = 0;
        p1.eff = eff;
        let p2 = Sprite._quad[2];
        p2.x = px0;
        p2.y = py1;
        p2.z = 0;
        p2.r = color.R;
        p2.g = color.G;
        p2.b = color.B;
        p2.a = color.A;
        p2.u = this.u0 / this.tex._width;
        p2.v = this.v1 / this.tex._height;
        p2.palx = 0;
        p2.paly = 0;
        p2.anyz = 0;
        p2.eff = eff;
        let p3 = Sprite._quad[3];
        p3.x = px1;
        p3.y = py1;
        p3.z = 0;
        p3.r = color.R;
        p3.g = color.G;
        p3.b = color.B;
        p3.a = color.A;
        p3.u = this.u1 / this.tex._width;
        p3.v = this.v1 / this.tex._height;
        p3.palx = 0;
        p3.paly = 0;
        p3.anyz = 0;
        p3.eff = eff;

        bathcer.DrawQuads(this.tex, null, Sprite._quad, 1);
    }
    RenderWithLimit(bathcer: Render_Batcher, pos: Vector2, scale: Vector2, color: Color, eff: number, limitRect: Rectangle): void {

    }
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

       
        return new Vector2(rect.x,rect.y);
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
        let s = new Sprite();
        s.u0 = rect.x;
        s.v0 = rect.y;
        s.u1 = rect.x + data.width;
        s.v1 = rect.y + data.height;
        s.marginx = 0;
        s.marginy = 0;
        s.width = data.width;
        s.height = data.height;
        s.offsetx = 0;
        s.offsety = 0;
        s.name = name;
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