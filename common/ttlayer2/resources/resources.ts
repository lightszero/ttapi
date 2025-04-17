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
export type InneerElemName = "white" | "border" | "border2" | "borderr" | "round" | "arrow" | "corner";
export class Resources {

    static Init(op: ResourceOption): void {
        let gl = tt.graphic.GetWebGL();

        this.InitInnerResource(gl, op);

    }
    private static InitInnerResource(gl: WebGL2RenderingContext, op: ResourceOption): void {
        //let gl = tt.graphic.GetWebGL();
        //准备内置shader
        InitInnerShader(gl);


        let packedduo = new PackTextureDuo();
        packedduo.packGray = new PackTexture(gl, op.packedGrayWidth, op.packedGrayHeight,
            TextureFormat.R8, op.packedGrayLayerCount, 0);
        packedduo.packRGBA = new PackTexture(gl, op.packedRGBAWidth, op.packedRGBAHeight,
            TextureFormat.RGBA32, op.packedRGBALayerCount, 0);
        this.packedelem = new PackElement(packedduo);

        this.packedelem.InitMat();
        this.deffont = new Font(gl, op.defFontName, op.defFontSize, this.packedelem);

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
        //borderround
        {
            let spdata = new SpriteData();

            spdata.format = TextureFormat.R8;
            spdata.width = 8;
            spdata.height = 8;
            spdata.data = new Uint8Array(
                [
                    0.0, 0.0, 0.0, 255, 255, 0.0, 0.0, 0.0,
                    0.0, 0.0, 255, 128, 128, 255, 128, 0.0,
                    0.0, 255, 128, 0.0, 0.0, 128, 255, 0.0,
                    255, 128, 0.0, 0.0, 0.0, 0.0, 128, 255,
                    255, 128, 0.0, 0.0, 0.0, 0.0, 128, 255,
                    0.0, 255, 128, 0.0, 0.0, 128, 255, 0.0,
                    0.0, 128, 255, 128, 128, 255, 128, 0.0,
                    0.0, 0.0, 0.0, 255, 255, 0.0, 0.0, 0.0,
                ]
            );
            spdata.pivotX = 4;
            spdata.pivotY = 4;
            this.packedelem.AddSprite(spdata, ElementFormat.GrayAsAlpha, "borderr");
        }
        //round
        {
            let spdata = new SpriteData();

            spdata.format = TextureFormat.R8;
            spdata.width = 8;
            spdata.height = 8;
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
        //arrow
        {
            let spdata = new SpriteData();

            spdata.format = TextureFormat.R8;
            spdata.width = 8;
            spdata.height = 8;
            spdata.data = new Uint8Array(
                [
                    255, 255, 255, 255, 255, 0.0, 0.0, 0.0,
                    255, 0.0, 128, 255, 0.0, 0.0, 0.0, 0.0,
                    255, 128, 0.0, 128, 255, 0.0, 0.0, 0.0,
                    255, 255, 128, 0.0, 128, 255, 0.0, 0.0,
                    255, 0.0, 255, 128, 0.0, 128, 255, 0.0,
                    0.0, 0.0, 0.0, 255, 128, 0.0, 128, 255,
                    0.0, 0.0, 0.0, 0.0, 255, 128, 255, 0.0,
                    0.0, 0.0, 0.0, 0.0, 0.0, 255, 0.0, 0.0,
                ]
            );
            spdata.pivotX = 4;
            spdata.pivotY = 4;
            this.packedelem.AddSprite(spdata, ElementFormat.GrayAsAlpha, "arrow");
        }
        //corner
        {
            let spdata = new SpriteData();

            spdata.format = TextureFormat.R8;
            spdata.width = 8;
            spdata.height = 8;
            spdata.data = new Uint8Array(
                [
                    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 255,
                    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 255, 0.0,
                    0.0, 0.0, 0.0, 0.0, 0.0, 255, 0.0, 0.0,
                    0.0, 0.0, 0.0, 0.0, 255, 0.0, 0.0, 255,
                    0.0, 0.0, 0.0, 255, 0.0, 0.0, 255, 255,
                    0.0, 0.0, 255, 0.0, 0.0, 255, 0.0, 255,
                    0.0, 255, 0.0, 0.0, 255, 0.0, 0.0, 255,
                    255, 0.0, 0.0, 255, 255, 255, 255, 255,
                ]
            );
            spdata.pivotX = 4;
            spdata.pivotY = 4;
            this.packedelem.AddSprite(spdata, ElementFormat.GrayAsAlpha, "corner");
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

    static GetWhiteBlock(): ElementSprite {
        return this.packedelem.GetElementByName("white");;

    }

    static GetBlock(name: InneerElemName): ElementSprite {
        return this.packedelem.GetElementByName(name);;

    }


    private static deffont: Font = null;
    static CreateFont(fontname: string, fontsize: number): Font {
        let font = new Font(tt.graphic.GetWebGL(), fontname, fontsize, this.packedelem);
        return font;
    }

    static GetDefFont(): Font {
        return this.deffont;
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