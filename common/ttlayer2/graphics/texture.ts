import { tt } from "../../ttapi/ttapi.js";
import { Color, Rectangle } from "../math/vector.js";

export enum TextureFormat {
    R8,
    RGBA32,
}
export interface ITexture {
    getID(): number;
    getFormat(): TextureFormat;
    getWidth(): number;
    getHeight(): number;
    getData(): Uint8Array;
    getGLTex(): WebGLTexture;
    IsStatic(): boolean;
    IsTarget(): boolean;
    Destory(): void;
    UploadTexture(x: number, y: number,
        w: number, h: number,
        data: Uint8Array | Uint8ClampedArray): void


    ApplyTexture(TurnToStatic: boolean): void

}

export interface IRenderTarget extends ITexture {
    //RenderTarget 的观察点
    IsMainOutput(): boolean
    Begin(): void;
    End(): void;

    PushLimitRect(rect: Rectangle): void;
    PopLimitRect(): void;
    ClearLimitRect(): void;

    Resize(width: number, height: number): void;
}
let _whitetexture: ITexture = null;
export function getWhiteTexture(): ITexture {
    if (_whitetexture == null) {
        let data = new Uint8Array(64);
        for (let i = 0; i < 64; i++)
            data[i] = 255;
        _whitetexture = new Texture(tt.graphic.GetWebGL(), 4, 4, TextureFormat.RGBA32, data, true, false);
    }
    return _whitetexture;
}
export class Texture implements ITexture {
    static texid: number = 1;
    constructor(webgl: WebGLRenderingContext, width: number, height: number, format: TextureFormat, data: Uint8Array | Uint8ClampedArray | null, isstatic: boolean, nobuf: boolean) {
        this._webgl = webgl;
        this._format = format;
        this._texobj = webgl.createTexture();
        let n = (this._texobj as number)
        this._id = Texture.texid;
        this._width = width;
        this._height = height;

        Texture.texid++;
        this._webgl.bindTexture(this._webgl.TEXTURE_2D, this._texobj);
        this._webgl.pixelStorei(this._webgl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
        this._webgl.pixelStorei(this._webgl.UNPACK_FLIP_Y_WEBGL, 0);
        this._webgl.texParameteri(this._webgl.TEXTURE_2D, this._webgl.TEXTURE_MIN_FILTER, this._webgl.NEAREST);
        this._webgl.texParameteri(this._webgl.TEXTURE_2D, this._webgl.TEXTURE_MAG_FILTER, this._webgl.NEAREST);
        this._webgl.texParameteri(this._webgl.TEXTURE_2D, this._webgl.TEXTURE_WRAP_S, this._webgl.CLAMP_TO_EDGE);
        this._webgl.texParameteri(this._webgl.TEXTURE_2D, this._webgl.TEXTURE_WRAP_T, this._webgl.CLAMP_TO_EDGE);

        var formatGL = format == TextureFormat.RGBA32 ? this._webgl.RGBA : this._webgl.LUMINANCE;
        var type = this._webgl.UNSIGNED_BYTE;
        if (nobuf)
            return;
        if (isstatic && data == null)
            throw new Error("static texture must with a initdata.");
        this._webgl.bindTexture(this._webgl.TEXTURE_2D, this._texobj);
        if (data == null) {
            this._static = false;
            this._webgl.texImage2D(this._webgl.TEXTURE_2D,
                0,
                formatGL,
                width, height, 0,
                formatGL,
                type
                , null);
            let bitsize = format == TextureFormat.RGBA32 ? 4 : 1;
            this._pixelbuf = new Uint8Array(this._width * this._height * bitsize);
        }
        else {
            let bitsize = format == TextureFormat.RGBA32 ? 4 : 1;
            if (data.length != this._width * this._height * bitsize)
                throw new Error("wrong texSize");
            this._webgl.texImage2D(this._webgl.TEXTURE_2D,
                0,
                formatGL,
                width, height, 0,
                formatGL,
                type
                , data);

            this._static = isstatic
            if (isstatic) {
                this._pixelbuf = null;
            }
            else {
                this._pixelbuf = new Uint8Array(this._width * this._height * bitsize);
                for (var i = 0; i < this._pixelbuf.length; i++) {
                    this._pixelbuf[i] = data[i];
                }

            }

        }
    }
    _webgl: WebGLRenderingContext
    _format: TextureFormat
    _texobj: WebGLTexture | null;
    _id: number;
    _width: number;
    _height: number;
    _pixelbuf: Uint8Array | null;
    _static: boolean;
    getID(): number {
        return this._id;
    }
    getGLTex(): WebGLTexture {
        return this._texobj;
    }
    getFormat(): TextureFormat {
        return this._format;
    }
    getWidth(): number {
        return this._width;
    }
    getHeight(): number {
        return this._height;
    }
    getData(): Uint8Array {
        if (this._static) {
            throw new Error("not spport on static Texture.");
        }
        return this._pixelbuf;
    }
    IsStatic(): boolean {
        return this._static;
    }
    IsTarget(): boolean {
        return false;
    }

    UploadImg(img: TexImageSource): void {
        this._width = (img as any)["width"] as number;
        this._height = (img as any)["height"] as number;
        var formatGL = this._format == TextureFormat.RGBA32 ? this._webgl.RGBA : this._webgl.LUMINANCE;
        var type = this._webgl.UNSIGNED_BYTE;
        this._webgl.bindTexture(this._webgl.TEXTURE_2D, this._texobj);
        this._webgl.texImage2D(this._webgl.TEXTURE_2D, 0,
            formatGL, formatGL, type,
            img);
    }
    UploadTexture(x: number, y: number, w: number, h: number, data: Uint8Array | Uint8ClampedArray): void {
        if (this._static)
            throw new Error("this is a closed texture.");
        if (this._pixelbuf == null)
            throw new Error("this is a closed texture.");

        let bitsize = this._format == TextureFormat.RGBA32 ? 4 : 1;
        for (var dy = y; dy < y + h; dy++) {
            for (var dx = x; dx < x + w; dx++) {
                if (dx < this._width && dx >= 0 && dy < this._height && dy >= 0) {
                    var sy = dy - y;
                    var sx = dx - x;
                    var sindex = sy * w + sx;
                    var dindex = dy * this._width + dx;
                    if (bitsize == 4) {
                        this._pixelbuf[dindex * 4 + 0] = data[sindex * 4 + 0];
                        this._pixelbuf[dindex * 4 + 1] = data[sindex * 4 + 1];
                        this._pixelbuf[dindex * 4 + 2] = data[sindex * 4 + 2];
                        this._pixelbuf[dindex * 4 + 3] = data[sindex * 4 + 3];
                    }
                    else {
                        this._pixelbuf[dindex] = data[sindex];
                    }
                }
            }
        }
    }
    ApplyTexture(TurnToStatic: boolean): void {
        var formatGL = this._format == TextureFormat.RGBA32 ? this._webgl.RGBA : this._webgl.LUMINANCE;
        var type = this._webgl.UNSIGNED_BYTE;
        this._webgl.bindTexture(this._webgl.TEXTURE_2D, this._texobj);
        this._webgl.texImage2D(this._webgl.TEXTURE_2D,
            0,
            formatGL,
            this._width, this._height, 0,
            formatGL,
            //最后这个type，可以管格式
            type
            , this._pixelbuf);

        if (TurnToStatic) {
            this._static = true;
            this._pixelbuf = null;
        }
    }
    Destory(): void {
        if (this._texobj != null)
            this._webgl.deleteTexture(this._texobj);
        this._texobj = null;
    }

}
