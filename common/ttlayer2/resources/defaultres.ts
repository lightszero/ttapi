import { tt } from "../../ttapi/ttapi.js";
import { Atlas } from "../atlas/atlas.js";
import { PackTexture, SpriteData, ToROption } from "../atlas/packtex.js";
import { Border, Color, Font, InitInnerShader, ITexture, QUI_Button, QUI_HAlign, QUI_Image, QUI_ImageScale9, QUI_Label, QUI_Scale9, QUI_VAlign, Sprite, SpriteFormat, Texture, TextureFormat, Vector2 } from "../ttlayer2.js";

export class Resources {
    static InitInnerResource(): void {
        let gl = tt.graphic.GetWebGL();
        //准备内置shader
        InitInnerShader(gl);

        //white Texture
        {
            let data = new Uint8Array(64);

            for (let i = 0; i < 64; i++)
                data[i] = 255;
            this._whitetexture = new Texture(gl, 4, 4, TextureFormat.RGBA32, null);
            this._whitetexture.UploadTexture(0, 0.0, 4, 4, data);
        }
        //Black Texture
        {
            let data = new Uint8Array(64);
            for (let i = 0; i < 16; i++) {
                data[i * 4 + 0] = 0;
                data[i * 4 + 1] = 0;
                data[i * 4 + 2] = 0;
                data[i * 4 + 3] = 255;
            }
            this._blackTexture = new Texture(gl, 4, 4, TextureFormat.RGBA32, null);
            this._blackTexture.UploadTexture(0, 0.0, 4, 4, data);
        }
        this.atlas = new Atlas();
        this.packed_r = new PackTexture(gl, 1024, 1024, TextureFormat.R8, 0);
        //WhiteSprite
        {
            let spdata = new SpriteData();
            spdata.format = TextureFormat.R8;
            spdata.width = 8;
            spdata.height = 8;
            spdata.data = new Uint8Array(8 * 8);
            for (var y = 0; y < spdata.height; y++) {
                for (var x = 0; x < spdata.width; x++) {
                    spdata.data[y * spdata.width + x] = 255;
                }
            }
            this.packed_r.AddSprite(spdata, SpriteFormat.GrayAsAlpha, "white");
        }
        //border
        {
            let spdata = new SpriteData();

            spdata.format = TextureFormat.R8;
            spdata.width = 8;
            spdata.height = 8;
            spdata.data = new Uint8Array(
                [
                    255, 255, 255, 255, 255, 255, 255, 255,
                    255, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 255,
                    255, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 255,
                    255, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 255,
                    255, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 255,
                    255, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 255,
                    255, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 255,
                    255, 255, 255, 255, 255, 255, 255, 255,
                ]
            );
            this.packed_r.AddSprite(spdata, SpriteFormat.GrayAsAlpha, "border");
        }
        //border2
        {
            let spdata = new SpriteData();

            spdata.format = TextureFormat.R8;
            spdata.width = 8;
            spdata.height = 8;
            spdata.data = new Uint8Array(
                [
                    255, 255, 255, 255, 255, 255, 255, 255,
                    255, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 255,
                    255, 0.0, 255, 255, 255, 255, 0.0, 255,
                    255, 0.0, 255, 0.0, 0.0, 255, 0.0, 255,
                    255, 0.0, 255, 0.0, 0.0, 255, 0.0, 255,
                    255, 0.0, 255, 255, 255, 255, 0.0, 255,
                    255, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 255,
                    255, 255, 255, 255, 255, 255, 255, 255,
                ]
            );
            this.packed_r.AddSprite(spdata, SpriteFormat.GrayAsAlpha, "border2");
        }
        //round
        {
            let spdata = new SpriteData();

            spdata.format = TextureFormat.R8;
            spdata.width = 8;
            spdata.height = 8;
            spdata.toR = ToROption.Alpha;
            spdata.data = new Uint8Array(
                [
                    0.0, 0.0, 0.0, 255, 255, 0.0, 0.0, 0.0,
                    0.0, 0.0, 255, 255, 255, 255, 0.0, 0.0,
                    0.0, 255, 255, 128, 128, 255, 255, 0.0,
                    255, 255, 128, 200, 200, 128, 255, 255,
                    255, 255, 128, 200, 200, 128, 255, 255,
                    0.0, 255, 255, 128, 128, 255, 255, 0.0,
                    0.0, 0.0, 255, 255, 255, 255, 0.0, 0.0,
                    0.0, 0.0, 0.0, 255, 255, 0.0, 0.0, 0.0,
                ]
            );
            this.packed_r.AddSprite(spdata, SpriteFormat.GrayAsAlpha, "round");
        }
        this.packed_r.Apply();
    }

    private static _whitetexture: ITexture = null;
    private static _blackTexture: ITexture = null;
    private static packed_r: PackTexture;

    private static atlas: Atlas;
    static GetWhiteTexture(): ITexture {

        return this._whitetexture;
    }
    static GetBlackTexture(): ITexture {

        return this._blackTexture;
    }

    static getWhiteBlock(): Sprite {
        return this.packed_r.GetSprite("white");
    }
    static GetRoundBlock(): Sprite {
        return this.packed_r.GetSprite("round");
    }
    static GetBorderBlock(): Sprite {
        return this.packed_r.GetSprite("border");
    }
    static GetBorder2Block(): Sprite {
        return this.packed_r.GetSprite("border2");
    }
    static scale_border: QUI_Scale9 = null;
    static GetBorderScale(): QUI_Scale9 {
        if (this.scale_border == null) {
            this.scale_border = new QUI_Scale9(this.GetBorderBlock(), new Border(3, 3, 3, 3));
        }
        return this.scale_border;
    }
    private static deffont: Font = null;
    static SetDefFont(font: Font) {
        if (this.deffont != null)
            throw "已经初始化过了,要指定deffont就赶早";
        this.deffont = font;
    }
    static GetDefFont(): Font {
        if (this.deffont == null) {
            this.deffont == new Font(tt.graphic.GetWebGL(), "Arial", 32);
        }
        return this.deffont;
    }
    static CreateGUI_Label(text: string, color: Color = new Color(1, 1, 1, 1)) {
        let txt = new QUI_Label(this.deffont, text);
        txt.color = color;
        txt.localRect.setAsFill();
        let fs = 16 / this.deffont.GetFontSize();;
        txt.fontScale = new Vector2(fs, fs);
        txt.valign = QUI_VAlign.Middle;
        txt.halign = QUI_HAlign.Middle;

        return txt;
    }
    static CreateGUI_Button(text: string, color: Color): QUI_Button {
        let btn = new QUI_Button();
        let normal = new QUI_ImageScale9(this.GetBorderScale());
        let press = new QUI_ImageScale9(this.GetBorderScale());
        {
            normal.color = color;
            normal.localRect.setAsFill();

            let txt = new QUI_Label(this.deffont, text);
            txt.color = color;
            txt.localRect.setAsFill();
            let fs = 16 / this.deffont.GetFontSize();;
            txt.fontScale = new Vector2(fs, fs);
            normal.addChild(txt)
        }
        {
            let nc = color.Clone();
            nc.R *= 0.5;
            nc.G *= 0.5;
            nc.B *= 0.5;
            press.color = nc;
            press.localRect.setAsFill();

            let txt = new QUI_Label(this.deffont, text);
            txt.color = nc;
            txt.localRect.setAsFill();
            let fs = 16 / this.deffont.GetFontSize();;
            txt.fontScale = new Vector2(fs, fs);
            press.addChild(txt)
        }
        btn.ElemNormal = normal;
        btn.ElemPress = press;
        btn.localRect.setHPosByLeftBorder(100, 100);
        btn.localRect.setVPosByTopBorder(25, 100);
        return btn;
    }
}