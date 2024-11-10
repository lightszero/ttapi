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

    getGLTex(): WebGLTexture;
  
    IsTarget(): boolean;
    Destory(): void;
    UploadTexture(x: number, y: number,
        w: number, h: number,
        data: Uint8Array | Uint8ClampedArray): void


}

export interface IRenderTarget extends ITexture {
    //RenderTarget 的观察点
    IsMainOutput(): boolean
    Begin(): void;
    Clear(color: Color): void
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
        _whitetexture = new Texture(tt.graphic.GetWebGL(), 4, 4, TextureFormat.RGBA32, null);
        _whitetexture.UploadTexture(0, 0, 4, 4, data);
    }
    return _whitetexture;
}
export class Texture implements ITexture {
    static texid: number = 1;
    constructor(webgl: WebGLRenderingContext, width: number, height: number, format: TextureFormat, data: Uint8Array | Uint8ClampedArray | null) {
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


        this._webgl.bindTexture(this._webgl.TEXTURE_2D, this._texobj);
        if (data == null) {
           
            this._webgl.texImage2D(this._webgl.TEXTURE_2D,
                0,
                formatGL,
                width, height, 0,
                formatGL,
                type
                , null);

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




        }
    }
    _webgl: WebGLRenderingContext
    _format: TextureFormat
    _texobj: WebGLTexture | null;
    _id: number;
    _width: number;
    _height: number;

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
     
        this._webgl.bindTexture(this._webgl.TEXTURE_2D, this._texobj);
        var formatGL = this._format == TextureFormat.RGBA32 ? this._webgl.RGBA : this._webgl.LUMINANCE;
        var type = this._webgl.UNSIGNED_BYTE;
        this._webgl.texSubImage2D(this._webgl.TEXTURE_2D, 0, x, y, w, h, formatGL, type, data);
    }

    Destory(): void {
        if (this._texobj != null)
            this._webgl.deleteTexture(this._texobj);
        this._texobj = null;
    }

}
