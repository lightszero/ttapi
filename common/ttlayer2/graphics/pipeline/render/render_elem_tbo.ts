
//Render elem 是一种高性能的绘制方式
//不追求性能就用Render_Batcher 和 Sprite去折腾就好

import { Camera, Color, ILayerRender, Mesh, QUI_Canvas, Resources, UVRect, VBOInfo, Vector2, Vector3, VertexAttribItem, VertexAttribType, VertexFormat, VertexFormatMgr } from "../../../ttlayer2.js";
import { Material } from "../../material.js";

import { IRenderTarget, ITexture, Texture, TextureFormat } from "../../texture.js";

import { tt } from "../../../../ttapi/ttapi.js";
import { ElementInst, ElementSprite, ElementUtil } from "./elem.js";
import { PackTextureDuo } from "../../../resources/packtex/packtex.js";
import { PackElement as PackElement } from "../../../resources/packtex/packelement.js";


const elementInstSize = 32;
export class Render_Element_Tbo implements ILayerRender {
    //公共材质,所有的元素只能使用同一个材质,这也是这种渲染器效率的来源
    //降低提交元素的带宽到原来的1/5
    //元素支持povit 和 GPU旋转
    material: Material;
    mesh: Mesh;

    constructor() {

        this.material = new Material(Resources.GetShaderProgram("inst_tbo"));
        this.material.UpdateMatModel();

        this.ElemInstInit();

        let gl = tt.graphic.GetWebGL();
        this.mesh = new Mesh();
        this.mesh.UpdateVertexFormat(gl, ElementUtil.GetFormat_Vertex_Ubo());
        this.InitDrawMesh(gl);
    }
    static inst_ubo: VertexFormat;
    static GetFormat_Vertex_Ubo(): VertexFormat {
        if (this.inst_ubo == null) {
            let vecf = new VertexFormat("Vertex_InstFull");
            vecf.vbos.push(new VBOInfo());
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 2, false));//basemesh uv only

            vecf.vbos.push(new VBOInfo());
            vecf.vbos[1].vertexAttribDivisor = 1;//instanced data
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
    private packelem: PackElement;
    SetPackElement(tex: PackElement): void {
        this.packelem = tex;

        this.material.uniformTexs["texRGBA"].value = tex.GetPackTexDuo().packRGBA;
        this.material.uniformTexs["texGray"].value = tex.GetPackTexDuo().packGray;
        let uni = this.material.uniformTexs["texelem"];
        if (uni != undefined)
            uni.value = tex.GetElemTex();
    }
    GetPackElement(): PackElement {
        return this.packelem;
    }


    //元素实例数据部分
    //#region 元素实例管理

    private elemInstCount: number;
    private elemInstBufData: Uint8Array;
    private elemInstBufView: DataView;
    private elemInstDirty: boolean;
    private ElemInstInit() {
        this.elemInstBufData = new Uint8Array(1024 * elementInstSize);
        this.elemInstBufView = new DataView(this.elemInstBufData.buffer);
        this.elemInstCount = 0;
        this.elemInstDirty = false;
    }
    GetElementInstCount(): number {
        return this.elemInstCount;
    }

    ClearElementInst(): void {
        this.elemInstCount = 0;
    }
    AddElementInst(elem: ElementInst): number {

        let index = this.elemInstCount;
        this.elemInstCount++;
        this.WriteElementInst(elem, index);
        return index;
    }
    WriteElementInst(elem: ElementInst, index: number): void {


        if (index * elementInstSize >= this.elemInstBufData.length) {//满了,扩容
            let newarr = new Uint8Array((1024 + index) * elementInstSize);
            for (let i = 0; i < this.elemInstBufData.length; i++) {
                newarr[i] = this.elemInstBufData[i];
            }
            this.elemInstBufData = newarr;
            this.elemInstBufView = new DataView(this.elemInstBufData.buffer);
        }
        let byteIndex = index * elementInstSize;
        this.elemInstBufView.setFloat32(byteIndex + 0, elem.pos.X, true);
        this.elemInstBufView.setFloat32(byteIndex + 4, elem.pos.Y, true);
        this.elemInstBufView.setFloat32(byteIndex + 8, elem.pos.Z, true);
        this.elemInstBufView.setFloat32(byteIndex + 12, elem.rotate, true);
        this.elemInstBufView.setFloat32(byteIndex + 16, elem.scale.X, true);
        this.elemInstBufView.setFloat32(byteIndex + 20, elem.scale.Y, true);
        this.elemInstBufView.setUint8(byteIndex + 24, elem.color.R * 255);
        this.elemInstBufView.setUint8(byteIndex + 25, elem.color.G * 255);
        this.elemInstBufView.setUint8(byteIndex + 26, elem.color.B * 255);
        this.elemInstBufView.setUint8(byteIndex + 27, elem.color.A * 255);

        this.elemInstBufView.setUint16(byteIndex + 28, elem.instid, true);
        //this.elemInstBufView.setUint16(byteIndex + 30, elem.eff, true);
        this.elemInstDirty = true;
    }
    GetElementInst(index: number): ElementInst {
        let byteIndex = index * elementInstSize;
        let elem = new ElementInst();
        elem.pos = new Vector3(0, 0, 0);
        elem.scale = new Vector2(0, 0);
        elem.color = new Color(0, 0, 0, 0);
        elem.pos.X = this.elemInstBufView.getFloat32(byteIndex + 0, true);
        elem.pos.Y = this.elemInstBufView.getFloat32(byteIndex + 4, true);
        elem.pos.Z = this.elemInstBufView.getFloat32(byteIndex + 8, true);
        elem.rotate = this.elemInstBufView.getFloat32(byteIndex + 12, true);
        elem.scale.X = this.elemInstBufView.getFloat32(byteIndex + 16, true);
        elem.scale.Y = this.elemInstBufView.getFloat32(byteIndex + 20, true);
        elem.color.R = this.elemInstBufView.getUint8(byteIndex + 24) / 255;
        elem.color.G = this.elemInstBufView.getUint8(byteIndex + 25) / 255;
        elem.color.B = this.elemInstBufView.getUint8(byteIndex + 26) / 255;
        elem.color.A = this.elemInstBufView.getUint8(byteIndex + 27) / 255;
        let instid = this.elemInstBufView.getUint16(byteIndex + 28, true);
        elem.instid = instid;
        //elem.eff = this.elemBufView.getUint16(byteIndex + 30, true);
        return elem;
    }
    //#endregion

    //初始化模型
    private InitDrawMesh(gl: WebGL2RenderingContext) {


        let stride = this.mesh.GetVertexFormat().vbos[0].stride;
        let vertexdata = new Uint8Array(stride * 6);
        let datavbo = new DataView(vertexdata.buffer);
        datavbo.setFloat32(0 * stride, -1, true);//x
        datavbo.setFloat32(0 * stride + 4, -1, true);//y


        datavbo.setFloat32(1 * stride, 1, true);//x
        datavbo.setFloat32(1 * stride + 4, -1, true);//y


        datavbo.setFloat32(2 * stride, -1, true);//x
        datavbo.setFloat32(2 * stride + 4, 1, true);//y



        datavbo.setFloat32(3 * stride, -1, true);//x
        datavbo.setFloat32(3 * stride + 4, 1, true);//y


        datavbo.setFloat32(4 * stride, 1, true);//x
        datavbo.setFloat32(4 * stride + 4, -1, true);//y



        datavbo.setFloat32(5 * stride, 1, true);//x
        datavbo.setFloat32(5 * stride + 4, 1, true);//y


        this.mesh.UploadVertexBuffer(gl, 0, vertexdata, false, vertexdata.byteLength);


    }
    GetGUI(): QUI_Canvas {
        return null;
    }
    lasttag: number = 0;
    OnUpdate(delta: number, target: IRenderTarget, camera: Camera, tag: number): void {
        if (tag == 0) {
            this.lasttag = tag;
            let gl = tt.graphic.GetWebGL();

            this.packelem.ApplyTextureData();

            if (this.elemInstDirty) {
                this.mesh.UploadVertexBuffer(gl, 1, this.elemInstBufData, true, this.elemInstBufData.byteLength);
                this.elemInstDirty = false;
            }

            this.mesh.instancecount = this.elemInstCount;

            this.material.UpdateMatProj(target);
            this.material.UpdateMatView(camera.GetViewMatrix());
            Mesh.DrawMeshInstanced(gl, this.mesh, this.material);
        }
    }
    OnRender() {
        if (this.lasttag == 0) {
            let gl = tt.graphic.GetWebGL();
            Mesh.DrawMeshInstanced(gl, this.mesh, this.material);
        }
    }
}