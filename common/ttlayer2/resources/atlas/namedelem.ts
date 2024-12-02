import { version } from "../../../node_modules/typescript/lib/typescript.js";
import { tt } from "../../../ttapi/ttapi.js";
import { ElementSprite } from "../../graphics/pipeline/render/elem.js";
import { Border, Sprite, SpriteFormat, Texture, TextureFormat, UVRect, Vector2 } from "../../ttlayer2.js";
import { PackTextureDuo, SpriteData } from "./packtex.js";

export class NamedElementSprite extends ElementSprite {
    name: string;
    owner: NamedElementPacked;

}

export class NamedElementPacked {
    private packTexDuo: PackTextureDuo;

    private mapName2Index: { [id: string]: number } = {};
    constructor(packtexduo: PackTextureDuo) {
        this.packTexDuo = packtexduo;
        this.ElemInit(512, 512);
    }
    ConvertElemToSprite(elem: ElementSprite): Sprite {
        let s = new Sprite(this.GetPackTexDuo().packRGBA, this.GetPackTexDuo().packGray);
        s.effect = elem.eff;
        s.uv = new UVRect(elem.uvCenter.X - elem.uvHalfSize.X, elem.uvCenter.Y - elem.uvHalfSize.Y
            ,
            elem.uvCenter.X + elem.uvHalfSize.X, elem.uvCenter.Y + elem.uvHalfSize.Y
        );

        s.border = new Border(0, 0, 0, 0);
        s.pixelwidth = elem.sizeRB.X - elem.sizeTL.X;
        s.pixelheight = elem.sizeRB.Y - elem.sizeTL.Y;

        s.uvlayer = elem.uvLayer;
        return s;
    }
    private elemCount: number;
    private elemBufData: Float32Array;
    private elemTex: Texture;
    private elemDirty: boolean;
    private maxElemCount: number;
    private ElemInit(width: number, height: number) {
        this.elemBufData = new Float32Array(width * height * 4);
        let gl = tt.graphic.GetWebGL();
        this.elemTex = new Texture(gl, width, height, TextureFormat.F_RGBA32, null);
        this.maxElemCount = width / 4 * height;
        this.elemCount = 0;
        this.elemDirty = false;
    }
    GetPackTexDuo(): PackTextureDuo {
        return this.packTexDuo;
    }
    GetElementCount(): number {
        return this.elemCount;
    }
    GetMaxElementCount(): number {
        return this.maxElemCount;
    }
    private WriteElement(elem: ElementSprite, index: number): void {
        elem.index = index;
        const ElemFSize = 16;
        let Findex = index * ElemFSize;
        this.elemBufData[Findex + 0] = elem.sizeTL.X;
        this.elemBufData[Findex + 1] = elem.sizeTL.Y;
        this.elemBufData[Findex + 2] = elem.sizeRB.X;
        this.elemBufData[Findex + 3] = elem.sizeRB.Y;

        this.elemBufData[Findex + 4] = elem.uvCenter.X;
        this.elemBufData[Findex + 5] = elem.uvCenter.Y;
        this.elemBufData[Findex + 6] = elem.uvHalfSize.X;
        this.elemBufData[Findex + 7] = elem.uvHalfSize.Y;;

        this.elemBufData[Findex + 8] = elem.uvLayer;
        this.elemBufData[Findex + 11] = elem.eff;
        this.elemDirty = true;
    }
    private GetElementByIndex(index: number): ElementSprite {
        const ElemFSize = 16;
        let Findex = index * ElemFSize;
        let elem = new ElementSprite();
        elem.sizeTL = new Vector2(0, 0);
        elem.sizeRB = new Vector2(0, 0);
        elem.uvCenter = new Vector2(0, 0);
        elem.uvHalfSize = new Vector2(0, 0);
        elem.sizeTL.X = this.elemBufData[Findex + 0];
        elem.sizeTL.Y = this.elemBufData[Findex + 1];
        elem.sizeRB.X = this.elemBufData[Findex + 2];
        elem.sizeRB.Y = this.elemBufData[Findex + 3];

        elem.uvCenter.X = this.elemBufData[Findex + 4];
        elem.uvCenter.Y = this.elemBufData[Findex + 5];
        elem.uvHalfSize.X = this.elemBufData[Findex + 6];
        elem.uvHalfSize.Y = this.elemBufData[Findex + 7];

        elem.uvLayer = this.elemBufData[Findex + 8];
        elem.eff = this.elemBufData[Findex + 11];
        return elem;
    }

    AddSprite(data: SpriteData, eff: SpriteFormat, name: string): NamedElementSprite {
        let s = this.packTexDuo.AddSprite(data, eff, null);
        let e = new ElementSprite();

        e.sizeTL = new Vector2(s.pixelwidth / -2, s.pixelheight / -2);
        e.sizeRB = new Vector2(s.pixelwidth / 2, s.pixelheight / 2);
        e.uvCenter = new Vector2(s.uv.U1 * 0.5 + s.uv.U2 * 0.5, s.uv.V1 * 0.5 + s.uv.V2*0.5);
        e.uvHalfSize = new Vector2((s.uv.U2 - s.uv.U1) * 0.5, (s.uv.V2 - s.uv.V1) * 0.5);
        e.uvLayer = s.uvlayer;
        e.eff = eff;

        return this.AddElement(name, e);
    }
    AddElement(name: string, element: ElementSprite): NamedElementSprite {
        let index = this.mapName2Index[name];
        if (index == undefined) {//不存在，真插入
            if (this.elemCount == 65536)
                throw "[NamedElementPacked.AddElement]full element";
            index = this.elemCount;


            this.mapName2Index[name] = index;
            this.elemCount++;
        }

        this.WriteElement(element, index);//覆盖
        let e = this.GetElementByIndex(index) as NamedElementSprite;
        e.name = name;
        e.owner = this;
        return e;
    }
    GetElementByName(name: string): NamedElementSprite {
        let index = this.mapName2Index[name];
        if (index != undefined) {
            let e = this.GetElementByIndex(index) as NamedElementSprite;
            e.name = name;
            e.owner = this;
            return e;
        }
        return null;
    }
    Apply(): void {
        this.packTexDuo.packRGBA.Apply();
        this.packTexDuo.packGray.Apply();
        if (this.elemDirty) {//Upload tbo
            this.elemTex.UploadTexture(0, 0, this.elemTex.getWidth(), this.elemTex.getHeight(),
                this.elemBufData
            );

            this.elemDirty = false;
        }
    }
}