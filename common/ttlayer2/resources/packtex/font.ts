import { Color, Rectangle, Vector2 } from "../../math/vector.js";
import { Render_Batcher, Sprite, ElementFormat, TextTool, Texture, TextureFormat } from "../../ttlayer2.js";
import { PackElement } from "./packelement.js";
import { PackTexture, PackTextureDuo, SpriteData, ToROption } from "./packtex.js";

export class Font {
    constructor(webgl: WebGL2RenderingContext, font: string, size: number, packtex: PackElement) {
        this.fonttex = packtex;
        this.fontsize = size;
        this.fontname = font;
    }
    private fontname: string;
    private fontsize: number;
    private fonttex: PackElement;
    //     private _pool: Texture8Pool
    //     private _fontdata: TTFontData
    //     private _mapSprites: { [id: number]: Sprite } = {}
    GetFont(): string {
        return this.fontname;
    }
    GetFontSize(): number {
        return this.fontsize;
    }
    GetCharSprite(charCode: number): Sprite | null {

        let s = this._CacheCharSprite(charCode);
        if (s != null) {
            this.fonttex.ApplyTextureData();
        }
        return s;
    }
    private _CacheCharSprite(charCode: number): Sprite | null {


        let txt = String.fromCharCode(charCode);
        let e = this.fonttex.GetElementByName(txt);
        //  let s = this.fonttex.packGray.namedsprites[txt];
        if (e == null) {

            try {
                let imgdata = TextTool.LoadTextPixel(txt, this.fontname, this.fontsize, this.fontsize + 2, this.fontsize + 2, 0, 0);
                if (imgdata.height == 0 || imgdata.width == 0)
                    return null;

                let data = new SpriteData()
                data.format = TextureFormat.RGBA32;
                //data.toR = ToROption.Alpha;
                data.data = imgdata.data;
                data.width = imgdata.width;
                data.height = imgdata.height;

                let data2 = data.ConvertToR(ToROption.Alpha);
                //data2.toR = ToROption.Alpha;
                e = this.fonttex.AddSprite(data2, ElementFormat.GrayAsAlpha, txt);


            }
            catch (e) {
                console.error("cache char error:" + e);
                return null;
            }
        }
        //if (e != null) {
            let s = this.fonttex.ConvertElemToSprite(e);
            s.material = this.fonttex.GetMaterialCut();
            return s;
        //}

    }
    SureText(text: string,): number {
        let width = 0;
        for (var i = 0; i < text.length; i++) {
            let _s = this._CacheCharSprite(text.charCodeAt(i));
            if (_s != null) {
                width += _s.pixelwidth;
            }
            else {
                width += this.fontsize / 2;
            }

        }
        this.fonttex.ApplyTextureData();
        return width;
    }
    RenderText(bathcer: Render_Batcher, text: string, pos: Vector2, scale: Vector2, color: Color): void {
        //tt.platform.Log("==render"+text);
        let xadd = 0;
        for (var i = 0; i < text.length; i++) {
            let s = this.GetCharSprite(text.charCodeAt(i));
            if (s != null) {
                let rect = new Rectangle(pos.X + xadd, pos.Y, s.pixelwidth * scale.X, s.pixelheight * scale.Y);
                s.RenderRect(bathcer, rect, color)
                //s.Render(bathcer, new Vector2((pos.X | 0) + xadd, pos.Y | 0), scale, color);
                xadd += (s.pixelwidth * scale.X);
            }
            else {
                xadd += this.fontsize / 2 * scale.X;
            }
        }
    }

    RenderTextWithLimit(bathcer: Render_Batcher, text: string, pos: Vector2, scale: Vector2, color: Color, limitRect: Rectangle): void {
        let xadd = 0;
        for (var i = 0; i < text.length; i++) {
            let s = this.GetCharSprite(text.charCodeAt(i));
            if (s != null) {
                let rect = new Rectangle(pos.X + xadd, pos.Y, s.pixelwidth * scale.X, s.pixelheight * scale.Y);
                s.RenderRectWithLimit(bathcer, rect, limitRect, color);

                //s.Render(bathcer, new Vector2(pos.X + xadd, pos.Y), scale, color);
                xadd += (s.pixelwidth * scale.X);
            }
            else {
                xadd += this.fontsize / 2 * scale.X;
            }
        }
    }


}