import { IRenderTarget, Material, Mesh, Render_Batcher, Resources, VertexFormatMgr } from "../../../ttlayer2.js";
import { Camera, DrawLayer, DrawLayerTag, ILayerRender } from "../drawlayer.js"
import { QUI_Canvas } from "../../../ttui/ttui.js"
import { tt } from "../../../../ttapi/ttapi.js";




export class ISprite {
    x: number;
    y: number;
    u0: number;
    v0: number;
    u1: number;
    v1: number;
}
export const ParticleSystemInstCount: number = 4096;
export class ParticleView implements ILayerRender {
    constructor(tag: DrawLayerTag = DrawLayerTag.Main) {
        this.tag = tag;


        this.matDraw = new Material(Resources.GetShaderProgram("simple_inst"));


        let gl = this.webgl = tt.graphic.GetWebGL();
        this.meshDraw = new Mesh();
        this.meshDraw.UpdateVertexFormat(gl, VertexFormatMgr.GetFormat_Vertex_UV_Color_InstPosNormal());
        this.InitDrawMesh();
        this.InitInstMesh();
        this.matDraw.UpdateMatModel();
    }
    webgl: WebGL2RenderingContext;
    private meshDraw: Mesh = null;
    private matDraw: Material = null;
    private instIndex: number = 0;
    private InstVbo: Uint8Array = null;
    private InstVboView: DataView = null;

    private InitDrawMesh() {


        let r = 255;
        let g = 128;
        let b = 100;
        let a = 128;
        let stride = this.meshDraw.GetVertexFormat().vbos[0].stride;
        let vertexdata = new Uint8Array(stride * 6);
        let datavbo = new DataView(vertexdata.buffer);
        datavbo.setFloat32(0 * stride, -0.5, true);//x
        datavbo.setFloat32(0 * stride + 4, -0.5, true);//y
        datavbo.setFloat32(0 * stride + 8, 0, true);//z
        datavbo.setFloat32(0 * stride + 12, 0, true);//u
        datavbo.setFloat32(0 * stride + 16, 0, true);//v
        datavbo.setUint8(0 * stride + 20, r);//r
        datavbo.setUint8(0 * stride + 21, g);//g
        datavbo.setUint8(0 * stride + 22, b);//b
        datavbo.setUint8(0 * stride + 23, a);//a

        datavbo.setFloat32(1 * stride, 0.5, true);//x
        datavbo.setFloat32(1 * stride + 4, -0.5, true);//y
        datavbo.setFloat32(1 * stride + 8, 0, true);//z
        datavbo.setFloat32(1 * stride + 12, 0, true);//u
        datavbo.setFloat32(1 * stride + 16, 0, true);//v
        datavbo.setUint8(1 * stride + 20, r);//r
        datavbo.setUint8(1 * stride + 21, g);//g
        datavbo.setUint8(1 * stride + 22, b);//b
        datavbo.setUint8(1 * stride + 23, a);//a

        datavbo.setFloat32(2 * stride, -0.5, true);//x
        datavbo.setFloat32(2 * stride + 4, 0.5, true);//y
        datavbo.setFloat32(2 * stride + 8, 0, true);//z
        datavbo.setFloat32(2 * stride + 12, 0, true);//u
        datavbo.setFloat32(2 * stride + 16, 1, true);//v
        datavbo.setUint8(2 * stride + 20, r);//r
        datavbo.setUint8(2 * stride + 21, g);//g
        datavbo.setUint8(2 * stride + 22, b);//b
        datavbo.setUint8(2 * stride + 23, a);//a


        datavbo.setFloat32(3 * stride, -0.5, true);//x
        datavbo.setFloat32(3 * stride + 4, 0.5, true);//y
        datavbo.setFloat32(3 * stride + 8, 0, true);//z
        datavbo.setFloat32(3 * stride + 12, 0, true);//u
        datavbo.setFloat32(3 * stride + 16, 1, true);//v
        datavbo.setUint8(3 * stride + 20, r);//r
        datavbo.setUint8(3 * stride + 21, g);//g
        datavbo.setUint8(3 * stride + 22, b);//b
        datavbo.setUint8(3 * stride + 23, a);//a

        datavbo.setFloat32(4 * stride, 0.5, true);//x
        datavbo.setFloat32(4 * stride + 4, -0.5, true);//y
        datavbo.setFloat32(4 * stride + 8, 0, true);//z
        datavbo.setFloat32(4 * stride + 12, 0, true);//u
        datavbo.setFloat32(4 * stride + 16, 0, true);//v
        datavbo.setUint8(4 * stride + 20, 255);//r
        datavbo.setUint8(4 * stride + 21, 255);//g
        datavbo.setUint8(4 * stride + 22, 255);//b
        datavbo.setUint8(4 * stride + 23, 255);//a


        datavbo.setFloat32(5 * stride, 0.5, true);//x
        datavbo.setFloat32(5 * stride + 4, 0.5, true);//y
        datavbo.setFloat32(5 * stride + 8, 0, true);//z
        datavbo.setFloat32(5 * stride + 12, 1, true);//u
        datavbo.setFloat32(5 * stride + 16, 1, true);//v
        datavbo.setUint8(5 * stride + 20, 255);//r
        datavbo.setUint8(5 * stride + 21, 255);//g
        datavbo.setUint8(5 * stride + 22, 255);//b
        datavbo.setUint8(5 * stride + 23, 255);//a

        this.meshDraw.UploadVertexBuffer(this.webgl, 0, vertexdata, false, vertexdata.byteLength);


    }
    private InitInstMesh() {
        let stride = this.meshDraw.GetVertexFormat().vbos[1].stride;

        let vertexdata = this.InstVbo = new Uint8Array(stride * ParticleSystemInstCount);

        let dataview = this.InstVboView = new DataView(vertexdata.buffer);
        for (var i = 0; i < ParticleSystemInstCount; i++) {
            dataview.setFloat32(stride * i + 0, 0, true);//x
            dataview.setFloat32(stride * i + 4, 0, true);//y
            dataview.setFloat32(stride * i + 8, 0, true);//z
            dataview.setFloat32(stride * i + 12, 1, true);//norx
            dataview.setFloat32(stride * i + 16, 0, true);//nory
            dataview.setFloat32(stride * i + 20, 0, true);//norz
        }
        this.meshDraw.instancecount = ParticleSystemInstCount;
        this.meshDraw.UploadVertexBuffer(this.webgl, 1, vertexdata, true, vertexdata.byteLength);

    }
    private tag: DrawLayerTag;
    GetTag(): DrawLayerTag {
        return this.tag;
    }


    viewmatrix: Float32Array = new Float32Array(16);
    GetViewMatrix(): Float32Array {
        return this.viewmatrix;
    }

    GetGUI(): QUI_Canvas {
        return null;
    }
    OnUpdate(delta: number,target: IRenderTarget, camera: Camera, rendertag: number): void {
        this.matDraw.UpdateMatView();//这个应该跟着View走
        this.matDraw.UpdateMatProj(target);
    }
    OnRender(): void {
        Mesh.DrawMeshInstanced(this.webgl, this.meshDraw, this.matDraw);
    }


}