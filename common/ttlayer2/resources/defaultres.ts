import { tt } from "../../ttapi/ttapi.js";
import { Atlas } from "../atlas/atlas.js";
import { PackTexture, SpriteData } from "../atlas/packtex";
import { InitInnerShader, ITexture, Sprite, Texture, TextureFormat } from "../ttlayer2.js";

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
            this._whitetexture.UploadTexture(0, 0, 4, 4, data);
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
            this._blackTexture.UploadTexture(0, 0, 4, 4, data);
        }
        this.atlas = new Atlas();
        this.packed_r = new PackTexture(gl, 2048, 2048, TextureFormat.R8, 0);
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
            this.packed_r.AddSprite(spdata, "white");
        }
        //border
        {
            let spdata = new SpriteData();
            spdata.format = TextureFormat.R8;
            spdata.width = 8;
            spdata.height = 8;
            spdata.data = new Uint8Array(
                [
                    1, 1, 1, 1, 1, 1, 1, 1,
                    1, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 1,
                    1, 1, 1, 1, 1, 1, 1, 1,
                ]
            );
            this.packed_r.AddSprite(spdata, "border");
        }
        //border2
        {
            let spdata = new SpriteData();
            spdata.format = TextureFormat.R8;
            spdata.width = 8;
            spdata.height = 8;
            spdata.data = new Uint8Array(
                [
                    1, 1, 1, 1, 1, 1, 1, 1,
                    1, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 1, 1, 1, 1, 0, 1,
                    1, 0, 1, 0, 0, 1, 0, 1,
                    1, 0, 1, 0, 0, 1, 0, 1,
                    1, 0, 1, 1, 1, 1, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 1,
                    1, 1, 1, 1, 1, 1, 1, 1,
                ]
            );
            this.packed_r.AddSprite(spdata, "border2");
        }
    }

    private static _whitetexture: ITexture = null;
    private static _blackTexture: ITexture = null;
    private static packed_r: PackTexture;
    private static atlas: Atlas;
    static getWhiteTexture(): ITexture {

        return this._whitetexture;
    }
    static getBlackTexture(): ITexture {

        return this._blackTexture;
    }
    static getWhiteBlock(): Sprite {
        return this.atlas.GetSprite("white");
    }
    static GetBorderBlock(): Sprite {
        return this.atlas.GetSprite("border");
    }
    static GetBorder2Block(): Sprite {
        return this.atlas.GetSprite("border2");
    }
}