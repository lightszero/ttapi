
import { tt } from "../../../../ttapi/ttapi.js";
import { IRenderTarget, Material, Mesh, QUI_Canvas, Resources, VertexFormatMgr } from "../../../ttlayer2.js";
import { MeshRender } from "../../render/render.js";
import { GetShaderProgram } from "../../shader/shaders.js";
import { Camera, ILayerRender } from "../drawlayer.js";

const MaxInstCount = 65536;
//实例渲染器
export class Render_Inst implements ILayerRender {

    constructor() {
        this.matDraw = new Material(GetShaderProgram("simple_inst"));//Inst 材质

        let gl = this.webgl = tt.graphic.GetWebGL();
        this.meshDraw = new Mesh();
        //这个Mesh里会有两套vbo，第一套vbo被配置成每个元素会步进，vertex shader 里访问这个元素就可以实例化了
        this.meshDraw.UpdateVertexFormat(gl, VertexFormatMgr.GetFormat_Vertex_UV_Color_InstPosNormal());
        this.matDraw.UpdateMatModel();
        this.matDraw.uniformTexs["tex"].value = Resources.GetWhiteTexture();
        this.InitPrimativeMesh();
        this.InitInstMesh();
    }
    //初始化绘制原型
    private InitPrimativeMesh() {


        let r = 255;
        let g = 255;
        let b = 255;
        let a = 255;
        let stride = this.meshDraw.GetVertexFormat().vbos[0].stride;
        let vertexdata = new Uint8Array(stride * 6);
        let datavbo = new DataView(vertexdata.buffer);
        datavbo.setFloat32(0 * stride, -5, true);//x
        datavbo.setFloat32(0 * stride + 4, -5, true);//y
        datavbo.setFloat32(0 * stride + 8, 0, true);//z
        datavbo.setFloat32(0 * stride + 12, 0, true);//u
        datavbo.setFloat32(0 * stride + 16, 0, true);//v
        datavbo.setUint8(0 * stride + 20, r);//r
        datavbo.setUint8(0 * stride + 21, g);//g
        datavbo.setUint8(0 * stride + 22, b);//b
        datavbo.setUint8(0 * stride + 23, a);//a

        datavbo.setFloat32(1 * stride, 5, true);//x
        datavbo.setFloat32(1 * stride + 4, -5, true);//y
        datavbo.setFloat32(1 * stride + 8, 0, true);//z
        datavbo.setFloat32(1 * stride + 12, 0, true);//u
        datavbo.setFloat32(1 * stride + 16, 0, true);//v
        datavbo.setUint8(1 * stride + 20, r);//r
        datavbo.setUint8(1 * stride + 21, g);//g
        datavbo.setUint8(1 * stride + 22, b);//b
        datavbo.setUint8(1 * stride + 23, a);//a

        datavbo.setFloat32(2 * stride, -5, true);//x
        datavbo.setFloat32(2 * stride + 4, 5, true);//y
        datavbo.setFloat32(2 * stride + 8, 0, true);//z
        datavbo.setFloat32(2 * stride + 12, 0, true);//u
        datavbo.setFloat32(2 * stride + 16, 1, true);//v
        datavbo.setUint8(2 * stride + 20, r);//r
        datavbo.setUint8(2 * stride + 21, g);//g
        datavbo.setUint8(2 * stride + 22, b);//b
        datavbo.setUint8(2 * stride + 23, a);//a


        datavbo.setFloat32(3 * stride, -5, true);//x
        datavbo.setFloat32(3 * stride + 4, 5, true);//y
        datavbo.setFloat32(3 * stride + 8, 0, true);//z
        datavbo.setFloat32(3 * stride + 12, 0, true);//u
        datavbo.setFloat32(3 * stride + 16, 1, true);//v
        datavbo.setUint8(3 * stride + 20, r);//r
        datavbo.setUint8(3 * stride + 21, g);//g
        datavbo.setUint8(3 * stride + 22, b);//b
        datavbo.setUint8(3 * stride + 23, a);//a

        datavbo.setFloat32(4 * stride, 5, true);//x
        datavbo.setFloat32(4 * stride + 4, -5, true);//y
        datavbo.setFloat32(4 * stride + 8, 0, true);//z
        datavbo.setFloat32(4 * stride + 12, 0, true);//u
        datavbo.setFloat32(4 * stride + 16, 0, true);//v
        datavbo.setUint8(4 * stride + 20, r);//r
        datavbo.setUint8(4 * stride + 21, g);//g
        datavbo.setUint8(4 * stride + 22, b);//b
        datavbo.setUint8(4 * stride + 23, a);//a


        datavbo.setFloat32(5 * stride, 5, true);//x
        datavbo.setFloat32(5 * stride + 4, 5, true);//y
        datavbo.setFloat32(5 * stride + 8, 0, true);//z
        datavbo.setFloat32(5 * stride + 12, 1, true);//u
        datavbo.setFloat32(5 * stride + 16, 1, true);//v
        datavbo.setUint8(5 * stride + 20, r);//r
        datavbo.setUint8(5 * stride + 21, g);//g
        datavbo.setUint8(5 * stride + 22, b);//b
        datavbo.setUint8(5 * stride + 23, a);//a

        this.meshDraw.UploadVertexBuffer(this.webgl, 0, vertexdata, false, vertexdata.byteLength);


    }

    //初始化实例模型
    private InitInstMesh() {
        let stride = this.meshDraw.GetVertexFormat().vbos[1].stride;

        let vertexdata = this.InstVbo = new Uint8Array(stride * MaxInstCount);

        let dataview = this.InstVboView = new DataView(vertexdata.buffer);
        for (var i = 0; i < 100; i++) {
            dataview.setFloat32(stride * i + 0, i * 8, true);//x
            dataview.setFloat32(stride * i + 4, i * 8, true);//y
            dataview.setFloat32(stride * i + 8, 0, true);//z
            dataview.setFloat32(stride * i + 12, 1, true);//norx
            dataview.setFloat32(stride * i + 16, 0, true);//nory
            dataview.setFloat32(stride * i + 20, 0, true);//norz
        }
        this.meshDraw.instancecount = 100;
        this.meshDraw.UploadVertexBuffer(this.webgl, 1, vertexdata, true, vertexdata.byteLength);

    }
    private webgl: WebGL2RenderingContext;
    private meshDraw: Mesh = null;
    private matDraw: Material = null;
    private InstVbo: Uint8Array = null;
    private InstVboView: DataView = null;
    GetGUI(): QUI_Canvas {
        return null;
    }
    OnUpdate(delta: number): void {

    }
    OnRender(target: IRenderTarget, camera: Camera, rendertag: number): void {
        if (rendertag == 0) {

            this.matDraw.UpdateMatProj(target);
            this.matDraw.UpdateMatView(camera.GetViewMatrix());

            MeshRender.DrawMeshInstanced(this.webgl, this.meshDraw, this.matDraw);
        }
    }

}