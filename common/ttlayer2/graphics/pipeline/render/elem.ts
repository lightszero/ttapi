import { tt } from "../../../../ttapi/ttapi.js";
import { PackTextureDuo } from "../../../resources/atlas/packtex.js";
import { Color, SpriteFormat, Texture, TextureFormat, VBOInfo, Vector2, Vector3, VertexAttribItem, VertexAttribType, VertexFormat } from "../../../ttlayer2.js";

export class ElementSprite {
    index: number = -1;//未分配索引
    //pos 来自Attr
    sizeTL: Vector2; //最常见的值 (-8,-8)
    sizeRB: Vector2; //最常见的值 (8,8) //这样就能构成一个 中心定位的16x16的元素
    uvCenter: Vector2;//UV中心
    uvHalfSize: Vector2;//UV半径
    uvLayer: number;
    eff: SpriteFormat;
}
//directdraw pos3+uv+color+eff 4  *6 noebo = 42 float 最小
//ElementAttr = 8 float 1/5
export class ElementInst {
    pos: Vector3; //32
    rotate: number;
    scale: Vector2;
    color: Color;

    elem: ElementSprite;
    //instid: number;//忘了一个
}

export class NamedElementSprite extends ElementSprite {
    name: string;
    owner: NamedElementPacked;
}
export class NamedElementPacked {
    private packTexDuo: PackTextureDuo;

    private mapName2Index: { [id: string]: number };
    constructor(packtexduo: PackTextureDuo) {
        this.packTexDuo = packtexduo;
    }
    private elemCount: number;
    private elemBufData: Float32Array;
    private elemTex: Texture;
    private elemDirty: boolean;
    private ElemInit() {
        this.elemBufData = new Float32Array(512 * 512 * 4);
        let gl = tt.graphic.GetWebGL();
        this.elemTex = new Texture(gl, 512, 512, TextureFormat.F_RGBA32, null);
        this.elemCount = 0;
        this.elemDirty = false;
    }
    GetPackTexDuo(): PackTextureDuo {
        return this.packTexDuo;
    }
    GetElementCount(): number {
        return this.elemCount;
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
    AddElement(name: string, element: ElementSprite): NamedElementSprite {
        let index = this.mapName2Index[name];
        if (index == undefined) {//不存在，真插入
            if (this.elemCount == 65536)
                throw "[NamedElementPacked.AddElement]full element";
            let index = this.elemCount;


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
        if (this.elemDirty) {//Upload tbo
            this.elemTex.UploadTexture(0, 0, this.elemTex.getWidth(), this.elemTex.getHeight(),
                this.elemBufData
            );

            this.elemDirty = false;
        }
    }
}
export class ElementUtil {
    static CalcElementSpriteStr(elem: ElementSprite): string {
        let str = elem.sizeTL.X + "," + elem.sizeTL.Y + "," + elem.sizeRB.X + "," + elem.sizeRB.Y +
            elem.uvCenter.X + "," + elem.uvCenter.Y + "," + elem.uvHalfSize.X + "," + elem.uvHalfSize.Y +
            elem.uvLayer + "," + elem.index;
        return str;
    }
    static GetElementInstSize() { return 32; }
    static inst_ubo: VertexFormat;
    static GetFormat_Vertex_Ubo(): VertexFormat {
        if (this.inst_ubo == null) {
            let vecf = new VertexFormat("Vertex_InstFull");
            vecf.vbos.push(new VBOInfo());
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 2, false));//basemesh uv only

            vecf.vbos.push(new VBOInfo());
            vecf.vbos[1].vertexAttribDivisor = 4;//instanced data
            //vbo 存在四字节对齐要求
            vecf.vbos[1].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 4, false));//Pos xyz + rotate
            vecf.vbos[1].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 2, false));//Scale
            vecf.vbos[1].atrribs.push(new VertexAttribItem(VertexAttribType.UNSIGNED_BYTE, 4, true));//color
            vecf.vbos[1].atrribs.push(new VertexAttribItem(VertexAttribType.UNSIGNED_SHORT, 2, false));//INSTid&ext
            this.inst_ubo = vecf;
            vecf.Update();
        }
        return this.inst_ubo;
    }
}