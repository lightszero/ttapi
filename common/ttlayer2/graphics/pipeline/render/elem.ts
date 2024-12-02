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

   
    instid: number;//忘了一个
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