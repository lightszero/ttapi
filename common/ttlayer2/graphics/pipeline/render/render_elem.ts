
//Render elem 是一种高性能的绘制方式
//不追求性能就用Render_Batcher 和 Sprite去折腾就好

import { Camera, Color, ILayerRender, Mesh, QUI_Canvas, Resources, UVRect, Vector2, Vector3, VertexFormatMgr } from "../../../ttlayer2.js";
import { Material } from "../../material.js";

import { IRenderTarget, ITexture } from "../../texture.js";

import { tt } from "../../../../ttapi/ttapi.js";

export class ElementSprite {
    //pos 来自Attr
    posTL: Vector2; //最常见的值 (-8,-8)
    posRB: Vector2; //最常见的值 (8,8) //这样就能构成一个 中心定位的16x16的元素
    uvCenter: Vector2;//UV中心
    uvHalfSize: Vector2;//UV半径
}
//directdraw pos3+uv+color+eff 4  *6 noebo = 42 float 最小
//ElementAttr = 8 float 1/5
export class ElementInst {
    pos: Vector3; //32
    rotate: number;
    scale: Vector2;
    color: Color;
    instid:number;//忘了一个
    eff: number;//int
}
const elementSize = 32;
const elementInstSize = 32;
export class Render_Element implements ILayerRender {
    //公共材质,所有的元素只能使用同一个材质,这也是这种渲染器效率的来源
    //降低提交元素的带宽到原来的1/5
    //元素支持povit 和 GPU旋转
    material: Material;
    mesh: Mesh;

    constructor() {
        this.ElemInit();
        this.ElemInstInit();
        this.material = new Material(Resources.GetShaderProgram("inst_full"));
        this.material.UpdateMatModel();

        let gl = tt.graphic.GetWebGL();
        this.mesh = new Mesh();
        this.mesh.UpdateVertexFormat(gl, VertexFormatMgr.GetFormat_Vertex_InstFull());
        this.InitDrawMesh(gl);
    }

    //元素管理数据部分
    //#region 元素管理
    private elemCount: number;
    private elemBufData: Uint8Array;
    private elemBufView: DataView;
    private elemDirty: boolean;
    private ElemInit() {
        this.elemBufData = new Uint8Array(1024 * elementSize + 4);
        this.elemBufView = new DataView(this.elemBufData.buffer);
        this.elemCount = 0;
        this.elemDirty = false;
    }
    GetElementCount(): number {
        return this.elemCount;
    }

    AddElement(elem: ElementSprite): number {
        //UBO 是固定尺寸的
        // if (this.elemCount * elementSize == this.elemBufData.length) {
        //     //满了,扩容
        //     let newarr = new Uint8Array(this.elemBufData.length + 1024 * elementSize);
        //     for (let i = 0; i < this.elemBufData.length; i++) {
        //         newarr[i] = this.elemBufData[i];
        //     }
        //     this.elemBufData = newarr;
        // }
        let index = this.elemCount;
        this.elemCount++;
        this.WriteElement(elem, index);
        return index;
    }
    WriteElement(elem: ElementSprite, index: number): void {
        let byteIndex = index * elementSize;
        this.elemBufView.setFloat32(byteIndex + 0, elem.posTL.X, true);
        this.elemBufView.setFloat32(byteIndex + 4, elem.posTL.Y, true);
        this.elemBufView.setFloat32(byteIndex + 8, elem.posRB.X, true);
        this.elemBufView.setFloat32(byteIndex + 12, elem.posRB.Y, true);
        this.elemBufView.setFloat32(byteIndex + 16, elem.uvCenter.X, true);
        this.elemBufView.setFloat32(byteIndex + 20, elem.uvCenter.Y, true);
        this.elemBufView.setFloat32(byteIndex + 24, elem.uvHalfSize.X, true);
        this.elemBufView.setFloat32(byteIndex + 28, elem.uvHalfSize.Y, true);
        this.elemDirty = true;
    }
    GetElement(index: number): ElementSprite {
        let byteIndex = index * elementSize;
        let elem = new ElementSprite();
        elem.posTL = new Vector2(0, 0);
        elem.posTL.X = this.elemBufView.getFloat32(byteIndex + 0, true);
        elem.posTL.Y = this.elemBufView.getFloat32(byteIndex + 4, true);
        elem.posRB.X = this.elemBufView.getFloat32(byteIndex + 8, true);
        elem.posRB.Y = this.elemBufView.getFloat32(byteIndex + 12, true);
        elem.uvCenter.X = this.elemBufView.getFloat32(byteIndex + 16, true);
        elem.uvCenter.Y = this.elemBufView.getFloat32(byteIndex + 20, true);
        elem.uvHalfSize.X = this.elemBufView.getFloat32(byteIndex + 24, true);
        elem.uvHalfSize.Y = this.elemBufView.getFloat32(byteIndex + 28, true);
        return elem;
    }
    //#endregion

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
            let newarr = new Uint8Array((1024 + index) * elementSize);
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
        this.elemInstBufView.setUint16(byteIndex + 30, elem.eff, true);
        this.elemInstDirty = true;
    }
    GetElementInst(index: number): ElementInst {
        let byteIndex = index * elementSize;
        let elem = new ElementInst();
        elem.pos = new Vector3(0, 0, 0);
        elem.scale = new Vector2(0, 0);
        elem.color = new Color(0, 0, 0, 0);
        elem.pos.X = this.elemBufView.getFloat32(byteIndex + 0, true);
        elem.pos.Y = this.elemBufView.getFloat32(byteIndex + 4, true);
        elem.pos.Z = this.elemBufView.getFloat32(byteIndex + 8, true);
        elem.rotate = this.elemBufView.getFloat32(byteIndex + 12, true);
        elem.scale.X = this.elemBufView.getFloat32(byteIndex + 16, true);
        elem.scale.Y = this.elemBufView.getFloat32(byteIndex + 20, true);
        elem.color.R = this.elemBufView.getUint8(byteIndex + 24) / 255;
        elem.color.G = this.elemBufView.getUint8(byteIndex + 25) / 255;
        elem.color.B = this.elemBufView.getUint8(byteIndex + 26) / 255;
        elem.color.A = this.elemBufView.getUint8(byteIndex + 27) / 255;
        elem.instid = this.elemBufView.getUint16(byteIndex + 28, true);
        elem.eff = this.elemBufView.getUint16(byteIndex + 30, true);
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

    OnUpdate(delta: number): void {

    }
    OnRender(target: IRenderTarget, camera: Camera, tag: number) {
        if (tag == 0) {
            let gl = tt.graphic.GetWebGL();
            if (this.mesh == null) {
                this.material = new Material(Resources.GetShaderProgram("inst_full"));

                this.mesh = new Mesh();
                this.mesh.UpdateVertexFormat(gl, VertexFormatMgr.GetFormat_Vertex_InstFull());
                this.InitDrawMesh(gl);
            }
            if (this.elemInstDirty) {
                this.mesh.UploadVertexBuffer(gl, 1, this.elemInstBufData, true, this.elemInstBufData.byteLength);
            }
            if (this.elemDirty) {//Upload Ubo size
                let uniformblock = this.material.uniformBlocks["SpritesBlock"].value;
                uniformblock.UploadData(gl, this.elemBufData, true);
            }
            this.mesh.instancecount = this.elemInstCount;

            this.material.UpdateMatProj(target);
            this.material.UpdateMatView(camera.GetViewMatrix());
            Mesh.DrawMeshInstanced(gl, this.mesh, this.material);
        }
    }
}