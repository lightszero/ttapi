import { tt } from "../../ttapi/ttapi.js";
import { CompileShader, LinkShader, LinkShaderFeedBack, ShaderObj, ShaderProgram, ShaderType } from "../graphics/shader.js";

import { PackTexture, PackTextureDuo, SpriteData, ToROption } from "./packtex/packtex.js";
import { Border, Color, Font, InitInnerShader, ITexture, QUI_Button, QUI_HAlign, QUI_Image, QUI_ImageScale9, QUI_Label, QUI_Scale9, QUI_VAlign, Sprite, ElementFormat, Texture, TextureFormat, Vector2 } from "../ttlayer2.js";
import { PackElement } from "./packtex/packelement.js";
import { ElementSprite } from "../graphics/pipeline/render/elem.js";

export class ResourceOption {
    defFontName: string = "Arail";
    defFontSize: number = 32;
    packedGrayWidth: number = 1024;
    packedGrayHeight: number = 1024;
    packedGrayLayerCount: number = 8;
    packedRGBAWidth: number = 1024;
    packedRGBAHeight: number = 1024;
    packedRGBALayerCount: number = 4;
}
export class Resources {

    static Init(op: ResourceOption): void {
        let gl = tt.graphic.GetWebGL();
        let packedduo = new PackTextureDuo();
        packedduo.packGray = new PackTexture(gl, op.packedGrayWidth, op.packedGrayHeight,
            TextureFormat.R8, op.packedGrayLayerCount, 0);
        packedduo.packRGBA = new PackTexture(gl, op.packedRGBAWidth, op.packedRGBAHeight,
            TextureFormat.RGBA32, op.packedRGBALayerCount, 0);
        this.packedelem = new PackElement(packedduo);
        this.deffont = new Font(gl, op.defFontName, op.defFontSize, this.packedelem);

        this.InitInnerResource(gl);

    }
    private static InitInnerResource(gl: WebGL2RenderingContext): void {
        //let gl = tt.graphic.GetWebGL();
        //准备内置shader
        InitInnerShader(gl);

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
            spdata.pivotX = 4;
            spdata.pivotY = 4;
            this.packedelem.AddSprite(spdata, ElementFormat.GrayAsAlpha, "white");
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
            spdata.pivotX = 4;
            spdata.pivotY = 4;
            this.packedelem.AddSprite(spdata, ElementFormat.GrayAsAlpha, "border");
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
            spdata.pivotX = 4;
            spdata.pivotY = 4;
            this.packedelem.AddSprite(spdata, ElementFormat.GrayAsAlpha, "border2");
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
            spdata.pivotX = 4;
            spdata.pivotY = 4;
            this.packedelem.AddSprite(spdata, ElementFormat.GrayAsAlpha, "round");
        }
        this.packedelem.ApplyTextureData();
    }
    private static packedelem: PackElement;



    //private static packedtex: PackTextureDuo;
    // private static packed_rgb: PackTexture;
    // private static packed_gray: PackTexture;
    static GetPackElement(): PackElement {
        return this.packedelem;
    }

    static getWhiteBlock(): ElementSprite {
        return this.packedelem.GetElementByName("white");;

    }
    static GetRoundBlock(): ElementSprite {

        return this.packedelem.GetElementByName("round");;
    }
    static GetBorderBlock(): ElementSprite {

        return this.packedelem.GetElementByName("border");;

    }
    static GetBorder2Block(): ElementSprite {
        return this.packedelem.GetElementByName("border2");;

    }
    static scale_border: QUI_Scale9 = null;
    static GetBorderScale(): QUI_Scale9 {
        if (this.scale_border == null) {
            this.scale_border = new QUI_Scale9(this.GetBorderBlock(), this.packedelem, new Border(3, 3, 3, 3));
        }
        return this.scale_border;
    }
    private static deffont: Font = null;
    static CreateFont(fontname: string, fontsize: number): Font {
        let font = new Font(tt.graphic.GetWebGL(), fontname, fontsize, this.packedelem);
        return font;
    }

    static GetDefFont(): Font {
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

    private static programs: { [id: string]: ShaderProgram } = {};
    static GetShaderProgram(name: string): ShaderProgram | null {
        if (this.programs[name] == undefined) return null;
        return this.programs[name];
    }




    static CompileShader(webgl: WebGL2RenderingContext, type: ShaderType, name: string, source: string): ShaderObj | null {



        var shaderobj = CompileShader(webgl, type, name, source);
        return shaderobj;


    }

    static AddProgram(webgl: WebGL2RenderingContext, name: string, vs: ShaderObj, fs: ShaderObj): ShaderProgram | null {
        if (this.programs[name] != undefined)
            throw "have a shader program:" + name;
        let prog = LinkShader(webgl, name, vs, fs);
        this.programs[name] = prog;
        return prog;
    }
    static AddProgramFeedback(webgl: WebGL2RenderingContext, name: string, vs: ShaderObj, fs: ShaderObj, feedbackvaring: string[]): ShaderProgram | null {
        if (this.programs[name] != undefined)
            throw "have a shader program:" + name;
        let prog = LinkShaderFeedBack(webgl, name, vs, fs, feedbackvaring);
        this.programs[name] = prog;
        return prog;
    }
}