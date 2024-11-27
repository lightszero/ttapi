import { tt } from "../../../ttapi/ttapi.js";
import { VertexFormat, VertexFormatMgr } from "../../graphics/mesh.js";
import { Vector3 } from "../../math/vector.js";
import { Render, TransformFeedBack } from "../../graphics/render/render.js";
import { GetShaderProgram } from "../../graphics/shader/shaders.js";
import { Color, GameApp, IRenderTarget, Material, Mesh } from "../../ttlayer2.js";
import { IDrawLayer, IViewComponent, IViewItem, IViewRenderItem } from "../../pipeline/drawlayer.js";
import { SceneView } from "../sceneview.js";
export class ParticleInfo {
    pos: Vector3;
    normal: Vector3
}
//基于TransformFeed 的 粒子系统,
//手机上表现不好,没解决让TransformFeed强行完成的的问题
export const ParticleSystemInstCount: number = 4096;
export class Comp_ParticleSystem implements IViewComponent, IViewRenderItem {
    sceneitem: IViewItem = null;

    webgl: WebGL2RenderingContext;
        private meshDraw: Mesh = null;
        private matDraw: Material = null;



    private instIndex: number = 0;
    private InstVbo: Uint8Array = null;
    private InstVboView: DataView = null;
    GetType(): string { return "particleSystem" };

    OnAdd(item: IViewItem) {
        this.sceneitem = item;

        this.matDraw = new Material(GetShaderProgram("simple_inst"));


        let gl = this.webgl = tt.graphic.GetWebGL();
     
        //初始化渲染用的模型
        this.InitDrawMesh();

        this.InitInstMesh();

    }
    private InitDrawMesh() {
        this.meshDraw = new Mesh();
        this.meshDraw.UpdateVertexFormat(this.webgl, VertexFormatMgr.GetFormat_Vertex_UV_Color_InstPosNormal());

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
    UpdateParticles(ps: ParticleInfo[]) {
        let len = ps.length;
        let maxlen = ParticleSystemInstCount - this.instIndex;

        let mesh = this.meshDraw;
        let stride = mesh.GetVertexFormat().vbos[1].stride;

        let range1 = Math.min(len, maxlen);
        if (range1 > 0) {



            for (var i = 0; i < range1; i++) {
                let i2 = this.instIndex + i;
                this.InstVboView.setFloat32(i2 * stride + 0, ps[i].pos.X, true);
                this.InstVboView.setFloat32(i2 * stride + 4, ps[i].pos.Y, true);
                this.InstVboView.setFloat32(i2 * stride + 8, ps[i].pos.Z, true);
                this.InstVboView.setFloat32(i2 * stride + 12, ps[i].normal.X, true);
                this.InstVboView.setFloat32(i2 * stride + 16, ps[i].normal.Y, true);
                this.InstVboView.setFloat32(i2 * stride + 20, ps[i].normal.Z, true);
            }
            // this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, mesh._vbos[1]);
            // this.webgl.bufferSubData(this.webgl.ARRAY_BUFFER, this.instIndex * stride, buf, 0, buf.byteLength);
            // this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, null);
            this.instIndex += range1;
            this.instIndex = this.instIndex % ParticleSystemInstCount;
        }


        if (len > maxlen) {
            let range2 = len - maxlen;
            let index2 = maxlen;

            for (var i = 0; i < range2; i++) {
                this.InstVboView.setFloat32(i * stride + 0, ps[index2 + i].pos.X, true);
                this.InstVboView.setFloat32(i * stride + 4, ps[index2 + i].pos.Y, true);
                this.InstVboView.setFloat32(i * stride + 8, ps[index2 + i].pos.Z, true);
                this.InstVboView.setFloat32(i * stride + 12, ps[index2 + i].normal.X, true);
                this.InstVboView.setFloat32(i * stride + 16, ps[index2 + i].normal.Y, true);
                this.InstVboView.setFloat32(i * stride + 20, ps[index2 + i].normal.Z, true);
            }

            this.instIndex += range2;
        }

    }
    private sleep: number = 0;
    private fence: WebGLSync = null;
    OnUpdate(delta: number): void {

        let mat = this.sceneitem.GetWorldMatrix();
        let mat4 = new Float32Array(16);
        mat4[0] = mat.values[0]; mat4[4] = mat.values[2]; mat4[8] = 0; mat4[12] = mat.values[4];
        mat4[1] = mat.values[1]; mat4[5] = mat.values[3]; mat4[9] = 0; mat4[13] = mat.values[5];
        mat4[2] = 0; mat4[6] = 0; mat4[10] = 1; mat4[14] = 0;
        mat4[3] = 0; mat4[7] = 0; mat4[11] = 0; mat4[15] = 1;
        this.matDraw.UpdateMatModel(mat4);//这个跟着worldmatrix走

        let stride = this.meshDraw.GetVertexFormat().vbos[1].stride;


        let vertexdata = this.InstVbo

        let dataview = this.InstVboView;
        for (var i = 0; i < ParticleSystemInstCount; i++) {
            let x = dataview.getFloat32(stride * i + 0, true);
            let y = dataview.getFloat32(stride * i + 4, true);
            let z = dataview.getFloat32(stride * i + 8, true);
            let norx = dataview.getFloat32(stride * i + 12, true);
            let nory = dataview.getFloat32(stride * i + 16, true);
            let norz = dataview.getFloat32(stride * i + 20, true);
            dataview.setFloat32(stride * i + 0, x + norx, true);//x
            dataview.setFloat32(stride * i + 4, y + nory, true);//y
            dataview.setFloat32(stride * i + 8, z + norz, true);//z

        }
        //this.meshDraw.instancecount = ParticleSystemInstCount;
        this.meshDraw.UploadVertexBuffer(this.webgl, 1, vertexdata, true, vertexdata.byteLength);

    }
    IsRender(): boolean {
        return true;
    }


    GetSortValue(): number {
        let y = this.sceneitem.GetWorldMatrix().values[5];
        return y;
    }
    OnRender(_target:IRenderTarget,view: IDrawLayer, tag: number): void {
        if (tag == 0) {
            let target = _target;
            if (target == null)
                target = GameApp.GetMainScreen();
            this.matDraw.UpdateMatView();//这个应该跟着View走
            this.matDraw.UpdateMatProj(target);
            Render.DrawMeshInstanced(this.webgl, this.meshDraw, this.matDraw);
            //this.webgl.finish();
        }
    }

    //返回一个用来识别合批的对象
    GetRenderObject(): any {
        return null;
    }
    EndRender(): void {

    }
}