import { Color, Rectangle, Vector2 } from "../math/vector.js";
import { Render_Batcher, TextTool, Texture, TextureFormat } from "../ttlayer2.js";
import { PackTexture, Sprite, SpriteData } from "./packtex.js";

export class Font {
    constructor(webgl: WebGL2RenderingContext, font: string, size: number) {
        this.fonttex = new PackTexture(webgl, 1024, 1024, TextureFormat.R8, 0);
        this.fontsize = size;
        this.fontname = font;
    }
    private fontname: string;
    private fontsize: number;
    private fonttex: PackTexture;
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
            this.fonttex.Apply();
        }
        return s;
    }
    private _CacheCharSprite(charCode: number): Sprite | null {


        let txt = String.fromCharCode(charCode);
        let s = this.fonttex.namedsprites[txt];
        if (s != null)
            return s;

        try {
            let imgdata = TextTool.LoadTextPixel(txt, this.fontname, this.fontsize, this.fontsize + 2, this.fontsize + 2, 0, 0);
            if (imgdata.height == 0 || imgdata.width == 0)
                return null;
            let data = new SpriteData()
            data.format = TextureFormat.RGBA32;
            data.data = imgdata.data;
            data.width = imgdata.width;
            data.height = imgdata.height;

            s = this.fonttex.AddfontSprite(data, txt);

            return s;
        }
        catch {
            return null;
        }


    }
    SureText(text: string): void {

        for (var i = 0; i < text.length; i++) {
            this._CacheCharSprite(text.charCodeAt(i));
        }
        this.fonttex.Apply();
    }
    RenderText(bathcer: Render_Batcher, text: string, pos: Vector2, scale: Vector2, color: Color): void {
        //tt.platform.Log("==render"+text);
        let xadd = 0;
        for (var i = 0; i < text.length; i++) {
            let s = this.GetCharSprite(text.charCodeAt(i));
            if (s != null) {
                //let rect = new Rectangle(pos.X + xadd, pos.Y, s.totalWidth * scale.X, s.totalHeight * scale.Y);
                //s.RenderRect(bathcer, rect, color)
                s.Render(bathcer, new Vector2(pos.X + xadd, pos.Y), scale, color, 4);
                xadd += (s.width * scale.X);
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
                let rect = new Rectangle(pos.X + xadd, pos.Y, s.width * scale.X, s.height * scale.Y);
                s.RenderWithLimit(bathcer, new Vector2(pos.X + xadd, pos.Y), scale, color, 4, limitRect);

                //s.Render(bathcer, new Vector2(pos.X + xadd, pos.Y), scale, color);
                xadd += (s.width * scale.X);
            }
            else {
                xadd += this.fontsize / 2 * scale.X;
            }
        }
    }
}