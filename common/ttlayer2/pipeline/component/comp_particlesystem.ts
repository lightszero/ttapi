import { tt } from "../../../ttapi/ttapi.js";
import { VertexFormat, VertexFormatMgr } from "../../graphics/mesh.js";
import { Vector3 } from "../../math/vector.js";
import { Render, TransformFeedBack } from "../../render/render.js";
import { GetShaderProgram } from "../../shader/shaders.js";
import { Color, GameApp, Material, Mesh } from "../../ttlayer2.js";
import { ISceneComponent, ISceneItem, ISceneRenderItem } from "../scene.js";
import { SceneView } from "../sceneview.js";
export class ParticleInfo {
    pos: Vector3;
    normal: Vector3
}
export const ParticleSystemInstCount: number = 65536;
export class Comp_ParticleSystem implements ISceneComponent, ISceneRenderItem {
    sceneitem: ISceneItem = null;

    webgl: WebGL2RenderingContext;
    private meshDraw1: Mesh = null;
    private meshDraw2: Mesh = null;
    private matDraw: Material = null;
    private usedraw: number = 1;
    private feedback: TransformFeedBack;
    private meshFeed1: Mesh = null;
    private meshFeed2: Mesh = null;
    private matInst: Material = null;

    private instIndex: number = 0;
    GetType(): string { return "particleSystem" };

    OnAdd(item: ISceneItem) {
        this.sceneitem = item;

        this.matDraw = new Material(GetShaderProgram("simple_inst"));


        let gl = this.webgl = tt.graphic.GetWebGL();
        this.meshDraw1 = new Mesh();
        this.meshDraw1.UpdateVertexFormat(gl, VertexFormatMgr.GetFormat_Vertex_UV_Color_InstPosNormal());

        this.meshDraw2 = new Mesh();
        this.meshDraw2.UpdateVertexFormat(gl, VertexFormatMgr.GetFormat_Vertex_UV_Color_InstPosNormal());
        //初始化渲染用的模型
        this.InitDrawMesh();

        this.InitInstMesh();

        this.meshFeed1 = new Mesh();
        this.meshFeed1.SetVertexBuffer(gl, 0, this.meshDraw1._vbos[1], this.meshDraw1.instancecount);
        this.meshFeed1.UpdateVertexFormat(gl, VertexFormatMgr.GetFormat_Vertex_Normal());

        this.meshFeed2 = new Mesh();
        this.meshFeed2.SetVertexBuffer(gl, 0, this.meshDraw2._vbos[1], this.meshDraw1.instancecount);
        this.meshFeed2.UpdateVertexFormat(gl, VertexFormatMgr.GetFormat_Vertex_Normal());

        this.matInst = new Material(GetShaderProgram("feedback"));
    }
    private InitDrawMesh() {

        let stride = this.meshDraw1.GetVertexFormat().vbos[0].stride;
        let vertexdata = new Uint8Array(stride * 6);
        let datavbo = new DataView(vertexdata.buffer);
        datavbo.setFloat32(0 * stride, -0.5, true);//x
        datavbo.setFloat32(0 * stride + 4, -0.5, true);//y
        datavbo.setFloat32(0 * stride + 8, 0, true);//z
        datavbo.setFloat32(0 * stride + 12, 0, true);//u
        datavbo.setFloat32(0 * stride + 16, 0, true);//v
        datavbo.setUint8(0 * stride + 20, 255);//r
        datavbo.setUint8(0 * stride + 21, 255);//g
        datavbo.setUint8(0 * stride + 22, 255);//b
        datavbo.setUint8(0 * stride + 23, 255);//a

        datavbo.setFloat32(1 * stride, 0.5, true);//x
        datavbo.setFloat32(1 * stride + 4, -0.5, true);//y
        datavbo.setFloat32(1 * stride + 8, 0, true);//z
        datavbo.setFloat32(1 * stride + 12, 0, true);//u
        datavbo.setFloat32(1 * stride + 16, 0, true);//v
        datavbo.setUint8(1 * stride + 20, 255);//r
        datavbo.setUint8(1 * stride + 21, 255);//g
        datavbo.setUint8(1 * stride + 22, 255);//b
        datavbo.setUint8(1 * stride + 23, 255);//a

        datavbo.setFloat32(2 * stride, -0.5, true);//x
        datavbo.setFloat32(2 * stride + 4, 0.5, true);//y
        datavbo.setFloat32(2 * stride + 8, 0, true);//z
        datavbo.setFloat32(2 * stride + 12, 0, true);//u
        datavbo.setFloat32(2 * stride + 16, 1, true);//v
        datavbo.setUint8(2 * stride + 20, 255);//r
        datavbo.setUint8(2 * stride + 21, 255);//g
        datavbo.setUint8(2 * stride + 22, 255);//b
        datavbo.setUint8(2 * stride + 23, 255);//a


        datavbo.setFloat32(3 * stride, -0.5, true);//x
        datavbo.setFloat32(3 * stride + 4, 0.5, true);//y
        datavbo.setFloat32(3 * stride + 8, 0, true);//z
        datavbo.setFloat32(3 * stride + 12, 0, true);//u
        datavbo.setFloat32(3 * stride + 16, 1, true);//v
        datavbo.setUint8(3 * stride + 20, 255);//r
        datavbo.setUint8(3 * stride + 21, 255);//g
        datavbo.setUint8(3 * stride + 22, 255);//b
        datavbo.setUint8(3 * stride + 23, 255);//a

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

        this.meshDraw1.UploadVertexBuffer(this.webgl, 0, vertexdata, false, vertexdata.byteLength);

        datavbo.setUint8(0 * stride + 20, 0);//r
        datavbo.setUint8(0 * stride + 21, 0);//g
        datavbo.setUint8(0 * stride + 22, 255);//b
        datavbo.setUint8(0 * stride + 23, 255);//a

        this.meshDraw2.UploadVertexBuffer(this.webgl, 0, vertexdata, false, vertexdata.byteLength);
    }
    private InitInstMesh() {
        let stride = this.meshDraw1.GetVertexFormat().vbos[1].stride;

        let vertexdata = new Uint8Array(stride * ParticleSystemInstCount);

        let dataview = new DataView(vertexdata.buffer);
        for (var i = 0; i < ParticleSystemInstCount; i++) {
            dataview.setFloat32(stride * i + 0, 0, true);//x
            dataview.setFloat32(stride * i + 4, 0, true);//y
            dataview.setFloat32(stride * i + 8, 0, true);//z
            dataview.setFloat32(stride * i + 12, 1, true);//norx
            dataview.setFloat32(stride * i + 16, 0, true);//nory
            dataview.setFloat32(stride * i + 20, 0, true);//norz
        }
        this.meshDraw1.instancecount = ParticleSystemInstCount;
        this.meshDraw1.UploadVertexBuffer(this.webgl, 1, vertexdata, true, vertexdata.byteLength);
        this.meshDraw2.instancecount = ParticleSystemInstCount;
        this.meshDraw2.UploadVertexBuffer(this.webgl, 1, vertexdata, true, vertexdata.byteLength);

        this.feedback = new TransformFeedBack(this.webgl);
    }
    UpdateParticles(ps: ParticleInfo[]) {
        let len = ps.length;
        let maxlen = ParticleSystemInstCount - this.instIndex;

        let mesh = this.usedraw == 1 ? this.meshDraw1 : this.meshDraw2;
        let stride = mesh.GetVertexFormat().vbos[1].stride;

        let range1 = Math.min(len, maxlen);
        if (range1 > 0) {

            let buf = new Uint8Array(range1 * stride);
            let dv1 = new DataView(buf.buffer);
            for (var i = 0; i < range1; i++) {
                dv1.setFloat32(i * stride + 0, ps[i].pos.X, true);
                dv1.setFloat32(i * stride + 4, ps[i].pos.Y, true);
                dv1.setFloat32(i * stride + 8, ps[i].pos.Z, true);
                dv1.setFloat32(i * stride + 12, ps[i].normal.X, true);
                dv1.setFloat32(i * stride + 16, ps[i].normal.Y, true);
                dv1.setFloat32(i * stride + 20, ps[i].normal.Z, true);
            }
            this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, mesh._vbos[1]);
            this.webgl.bufferSubData(this.webgl.ARRAY_BUFFER, this.instIndex * stride, buf, 0, buf.byteLength);
            this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, null);
            this.instIndex += range1;
            this.instIndex = this.instIndex % ParticleSystemInstCount;
        }


        if (len > maxlen) {
            let range2 = len - maxlen;
            let index2 = maxlen;
            let buf = new Uint8Array(range2 * stride);
            let dv1 = new DataView(buf.buffer);
            for (var i = 0; i < range2; i++) {
                dv1.setFloat32(i * stride + 0, ps[index2 + i].pos.X, true);
                dv1.setFloat32(i * stride + 4, ps[index2 + i].pos.Y, true);
                dv1.setFloat32(i * stride + 8, ps[index2 + i].pos.Z, true);
                dv1.setFloat32(i * stride + 12, ps[index2 + i].normal.X, true);
                dv1.setFloat32(i * stride + 16, ps[index2 + i].normal.Y, true);
                dv1.setFloat32(i * stride + 20, ps[index2 + i].normal.Z, true);
            }
            this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, mesh._vbos[1]);
            this.webgl.bufferSubData(this.webgl.ARRAY_BUFFER, this.instIndex * stride, buf, 0, buf.byteLength);
            this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, null);
            this.instIndex += range2;
        }
    }
    OnUpdate(delta: number): void {
        let mat = this.sceneitem.GetWorldMatrix();
        let mat4 = new Float32Array(16);
        mat4[0] = mat.values[0]; mat4[4] = mat.values[2]; mat4[8] = 0; mat4[12] = mat.values[4];
        mat4[1] = mat.values[1]; mat4[5] = mat.values[3]; mat4[9] = 0; mat4[13] = mat.values[5];
        mat4[2] = 0; mat4[6] = 0; mat4[10] = 1; mat4[14] = 0;
        mat4[3] = 0; mat4[7] = 0; mat4[11] = 0; mat4[15] = 1;
        this.matDraw.UpdateMatModel(mat4);//这个跟着worldmatrix走

        if (this.usedraw == 1) {
            this.feedback.Execute(this.webgl, this.meshFeed1, this.matInst, this.meshDraw2._vbos[1], 0, this.meshDraw1.instancecount);
            this.usedraw = 2;
        }
        else {
            this.feedback.Execute(this.webgl, this.meshFeed2, this.matInst, this.meshDraw1._vbos[1], 0, this.meshDraw1.instancecount);
            this.usedraw = 1;
        }
    }
    IsRender(): boolean {
        return true;
    }


    GetSortValue(): number {
        let y = this.sceneitem.GetWorldMatrix().values[5];
        return y;
    }
    OnRender(view: SceneView, tag: number): void {
        if (tag == 0) {
            let target = view.target;
            if (target == null)
                target = GameApp.GetMainScreen();
            this.matDraw.UpdateMatView();//这个应该跟着View走
            this.matDraw.UpdateMatProj(target);
            Render.DrawMeshInstanced(this.webgl, this.usedraw == 1 ? this.meshDraw1 : this.meshDraw2, this.matDraw);
        }
    }

    //返回一个用来识别合批的对象
    GetRenderObject(): any {
        return null;
    }
    EndRender(): void {

    }
}