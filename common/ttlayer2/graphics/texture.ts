import { tt } from "../../ttapi/ttapi.js";
import { Color, Rectangle } from "../math/vector.js";

export enum TextureFormat {
    R8,
    RGBA32,
    F_R8,
    F_RGBA32,
}
export interface ITexture {
    getID(): number;
    getFormat(): TextureFormat;
    getWidth(): number;
    getHeight(): number;

    getGLTex(): WebGLTexture;

    IsTarget(): boolean;
    IsArray(): boolean;
    GetLayer(): number;
    Destory(): void;

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

export class Texture implements ITexture {
    static texid: number = 1;
    IsArray(): boolean {
        return false;
    }
    GetLayer(): number {
        return 0;
    }
    constructor(webgl: WebGL2RenderingContext, width: number, height: number, format: TextureFormat, data: Uint8Array | Uint8ClampedArray | null) {
        this._webgl = webgl;
        this._format = format;
        this._texobj = webgl.createTexture();

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





        if (this._format == TextureFormat.F_R8 || this._format == TextureFormat.F_RGBA32) {
            this._typeGL = this._webgl.FLOAT;

            if (this._format == TextureFormat.F_RGBA32) {
                this._formatInnerGL = this._webgl.RGBA32F;
                this._formatGL = this._webgl.RGBA;
            }
            else {
                this._formatInnerGL = this._webgl.R32F;
                this._formatGL = this._webgl.RED;
            }
        }
        else {
            this._typeGL = this._webgl.UNSIGNED_BYTE;

            if (this._format == TextureFormat.RGBA32) {
                this._formatInnerGL = this._webgl.RGBA;
                this._formatGL = this._webgl.RGBA;
            }
            else {
                this._formatInnerGL = this._webgl.R8;//用R8 也行
                this._formatGL = this._webgl.RED;//用RED也行
            }
        }
        this._webgl.bindTexture(this._webgl.TEXTURE_2D, this._texobj);
        if (data == null) {
            this._webgl
            this._webgl.texImage2D(this._webgl.TEXTURE_2D,
                0,
                this._formatInnerGL,
                width, height, 0,
                this._formatGL,
                this._typeGL
                , null);

        }
        else {
            let bitsize = format == TextureFormat.RGBA32 ? 4 : 1;
            if (data.length != this._width * this._height * bitsize)
                throw new Error("wrong texSize");
            this._webgl.texImage2D(this._webgl.TEXTURE_2D,
                0,
                this._formatInnerGL,
                width, height, 0,
                this._formatGL,
                this._typeGL
                , data);




        }
    }
    _webgl: WebGL2RenderingContext
    _format: TextureFormat
    _formatGL: GLenum;
    _formatInnerGL: GLenum;
    _typeGL: GLenum;
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



        this._webgl.bindTexture(this._webgl.TEXTURE_2D, this._texobj);
        this._webgl.texImage2D(this._webgl.TEXTURE_2D, 0,
            this._formatInnerGL, this._formatGL, this._typeGL,
            img);
    }
    UploadTexture(x: number, y: number, w: number, h: number, data: ArrayBufferView): void {

        this._webgl.bindTexture(this._webgl.TEXTURE_2D, this._texobj);

        this._webgl.texSubImage2D(this._webgl.TEXTURE_2D, 0, x, y, w, h,
            this._formatGL, this._typeGL
            , data);
    }

    Destory(): void {
        if (this._texobj != null)
            this._webgl.deleteTexture(this._texobj);
        this._texobj = null;
    }

}

export class TextureArray implements ITexture {
    IsArray(): boolean {
        return true;
    }
    GetLayer(): number {
        return this._layer;
    }
    //默认一层，可以慢慢扩
    constructor(webgl: WebGL2RenderingContext, width: number, height: number, layer: number, format: TextureFormat) {
        this._webgl = webgl;
        this._format = format;
        this._layer = layer;
        this._texobj = webgl.createTexture();
        let n = (this._texobj as number)
        this._id = Texture.texid;
        this._width = width;
        this._height = height;

        Texture.texid++;
        this._webgl.bindTexture(this._webgl.TEXTURE_2D_ARRAY, this._texobj);
        this._webgl.pixelStorei(this._webgl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
        this._webgl.pixelStorei(this._webgl.UNPACK_FLIP_Y_WEBGL, 0);
        this._webgl.texParameteri(this._webgl.TEXTURE_2D_ARRAY, this._webgl.TEXTURE_MIN_FILTER, this._webgl.NEAREST);
        this._webgl.texParameteri(this._webgl.TEXTURE_2D_ARRAY, this._webgl.TEXTURE_MAG_FILTER, this._webgl.NEAREST);
        this._webgl.texParameteri(this._webgl.TEXTURE_2D_ARRAY, this._webgl.TEXTURE_WRAP_S, this._webgl.CLAMP_TO_EDGE);
        this._webgl.texParameteri(this._webgl.TEXTURE_2D_ARRAY, this._webgl.TEXTURE_WRAP_T, this._webgl.CLAMP_TO_EDGE);



        if (this._format == TextureFormat.F_R8 || this._format == TextureFormat.F_RGBA32) {
            this._typeGL = this._webgl.FLOAT;

            if (this._format == TextureFormat.F_RGBA32) {
                this._formatInnerGL = this._webgl.RGBA32F;
                this._formatGL = this._webgl.RGBA;
            }
            else {
                this._formatInnerGL = this._webgl.R32F;
                this._formatGL = this._webgl.RED;
            }
        }
        else {
            this._typeGL = this._webgl.UNSIGNED_BYTE;

            if (this._format == TextureFormat.RGBA32) {
                this._formatInnerGL = this._webgl.RGBA;
                this._formatGL = this._webgl.RGBA;
            }
            else {
                this._formatInnerGL = this._webgl.R8;//用R8 也行
                this._formatGL = this._webgl.RED;//用RED也行
            }
        }

        //var formatGL = format == TextureFormat.RGBA32 ? this._webgl.RGBA : this._webgl.R8;
        //var type = this._webgl.UNSIGNED_BYTE;


        this._webgl.bindTexture(this._webgl.TEXTURE_2D_ARRAY, this._texobj);
        {
            this._webgl
            this._webgl.texImage3D(this._webgl.TEXTURE_2D_ARRAY,
                0,
                this._formatInnerGL,
                width, height, this._layer,
                0,
                this._formatGL,
                this._typeGL
                , null);

        }
    }
    _webgl: WebGL2RenderingContext
    _format: TextureFormat
    _formatGL: GLenum;
    _formatInnerGL: GLenum;
    _typeGL: GLenum;
    _texobj: WebGLTexture | null;
    _layer: number
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
    // ResetLayer(layer: number): void {
    //     throw "webgl 暂时没办法读取TextureArray,存一份内存镜像顶不住";
    // }
    UploadSubTexture(layer: number, x: number, y: number, w: number, h: number, data: Uint8Array | Uint8ClampedArray): void {

        this._webgl.bindTexture(this._webgl.TEXTURE_2D_ARRAY, this._texobj);
        var formatGL = this._format == TextureFormat.RGBA32 ? this._webgl.RGBA : this._webgl.R8;
        var type = this._webgl.UNSIGNED_BYTE;
        this._webgl.texSubImage3D(this._webgl.TEXTURE_2D_ARRAY, 0,
            x, y, layer,
            w, h, 1,
            this._formatGL,
            this._typeGL, data);
    }

    Destory(): void {
        if (this._texobj != null)
            this._webgl.deleteTexture(this._texobj);
        this._texobj = null;
    }

}