import { tt } from "../ttapi/ttapi.js";
import { Material } from "../ttlayer2/graphics/material.js";
import { VertexFormatMgr } from "../ttlayer2/graphics/mesh.js";
import { Render } from "../ttlayer2/graphics/render.js";
import { GetShaderProgram } from "../ttlayer2/shader/shaders.js";


import {
    GameApp, IState, TextTool, Render_Batcher, DrawPoint, MainScreen, Color, ITexture, Texture, TextureFormat,
    Mesh,
} from "../ttlayer2/ttlayer2.js";

export class TTState_Draw implements IState {
    private pts: DrawPoint[] = [];
    private tex: ITexture = null;
    private _quadbatcher: Render_Batcher = null;
    _mainscreen: MainScreen = null;

    private mesh: Mesh = null;

    private mat: Material = null;
    private mesh2: Mesh = null;

    private mat2: Material = null;

    OnInit(): void {
        let gl = tt.graphic.GetWebGL();

        this.InitMesh(gl);
        this.InitMesh2(gl);
        this._mainscreen = GameApp.GetMainScreen();
        this._mainscreen.ClearColor = new Color(0.5, 0.5, 1, 1);
        this._quadbatcher = new Render_Batcher(gl);

        let p0 = new DrawPoint();
        p0.x = 0;
        p0.y = 0;
        p0.u = 0;
        p0.v = 0;

        let p1 = new DrawPoint();
        p1.x = 50
        p1.y = 0;
        p1.u = 1;
        p1.v = 0;
        p1.eff = 0;
        let p2 = new DrawPoint();
        p2.x = 0;
        p2.y = 50;
        p2.u = 0;
        p2.v = 1;
        p2.eff = 0;
        let p3 = new DrawPoint();
        p3.x = 50;
        p3.y = 50;
        p3.u = 1;
        p3.v = 1;
        p3.eff = 0;
        this.pts.push(p0);
        this.pts.push(p1);
        this.pts.push(p2);
        this.pts.push(p3);

        let data = TextTool.LoadTextPixel("中国123你好H2o", "v16", 16, 160, 16, 0, 0);
        let bdata = new Uint8Array(data.width * data.height * 4);
        for (let i = 0; i < data.width * data.height; i++) {

            let r = data.data[i * 4 + 0];
            // let g = data.data[i * 4 + 1];
            // let b = data.data[i * 4 + 2];
            // let a = data.data[i * 4 + 3];

            bdata[i * 4 + 0] = 255;
            bdata[i * 4 + 1] = 255;
            bdata[i * 4 + 2] = 255;
            bdata[i * 4 + 3] = r;
        }
        this.tex = new Texture(gl, data.width, data.height, TextureFormat.RGBA32, bdata, true, false);

    }
    InitMesh(gl: WebGL2RenderingContext): void {

        this.mesh = new Mesh();
        this.mesh.UpdateVertexFormat(gl, VertexFormatMgr.GetFormat_Vertex_UV_Color());
        let stride = this.mesh.GetVertexFormat().vbos[0].stride;
        let vertexdata = new Uint8Array(stride * 4);
        let element = new Uint8Array(12);
        let datavbo = new DataView(vertexdata.buffer);
        datavbo.setFloat32(0 * stride, 0, true);//x
        datavbo.setFloat32(0 * stride + 4, 0, true);//y
        datavbo.setFloat32(0 * stride + 8, 0, true);//z
        datavbo.setFloat32(0 * stride + 12, 0, true);//u
        datavbo.setFloat32(0 * stride + 16, 0, true);//v
        datavbo.setUint8(0 * stride + 20, 255);//r
        datavbo.setUint8(0 * stride + 21, 255);//g
        datavbo.setUint8(0 * stride + 22, 255);//b
        datavbo.setUint8(0 * stride + 23, 255);//a

        datavbo.setFloat32(1 * stride, 50, true);//x
        datavbo.setFloat32(1 * stride + 4, 0, true);//y
        datavbo.setFloat32(1 * stride + 8, 0, true);//z
        datavbo.setFloat32(1 * stride + 12, 0, true);//u
        datavbo.setFloat32(1 * stride + 16, 0, true);//v
        datavbo.setUint8(1 * stride + 20, 255);//r
        datavbo.setUint8(1 * stride + 21, 255);//g
        datavbo.setUint8(1 * stride + 22, 255);//b
        datavbo.setUint8(1 * stride + 23, 255);//a

        datavbo.setFloat32(2 * stride, 0, true);//x
        datavbo.setFloat32(2 * stride + 4, 50, true);//y
        datavbo.setFloat32(2 * stride + 8, 0, true);//z
        datavbo.setFloat32(2 * stride + 12, 0, true);//u
        datavbo.setFloat32(2 * stride + 16, 1, true);//v
        datavbo.setUint8(2 * stride + 20, 255);//r
        datavbo.setUint8(2 * stride + 21, 0);//g
        datavbo.setUint8(2 * stride + 22, 255);//b
        datavbo.setUint8(2 * stride + 23, 255);//a

        datavbo.setFloat32(3 * stride, 50, true);//x
        datavbo.setFloat32(3 * stride + 4, 50, true);//y
        datavbo.setFloat32(3 * stride + 8, 0, true);//z
        datavbo.setFloat32(3 * stride + 12, 1, true);//u
        datavbo.setFloat32(3 * stride + 16, 1, true);//v
        datavbo.setUint8(3 * stride + 20, 0);//r
        datavbo.setUint8(3 * stride + 21, 255);//g
        datavbo.setUint8(3 * stride + 22, 255);//b
        datavbo.setUint8(3 * stride + 23, 255);//a
        let dataebo = new DataView(element.buffer);
        dataebo.setUint16(0, 0, true);
        dataebo.setUint16(2, 1, true);
        dataebo.setUint16(4, 2, true);
        dataebo.setUint16(6, 2, true);
        dataebo.setUint16(8, 1, true);
        dataebo.setUint16(10, 3, true);


        //创建实例数据
        // let strideinst = this.mesh.GetVertexFormat().vbos[1].stride;
        // let vertexdatainst = new Uint8Array(strideinst * 3);
        // let datavboinst = new DataView(vertexdatainst.buffer);
        //this.mesh.UpdateVertexBuffer(gl, 1,vertexdatainst, false, vertexdatainst.byteLength);
        this.mesh.UpdateVertexBuffer(gl, 0, vertexdata, false, vertexdata.byteLength);

        this.mesh.UpdateIndexBuffer(gl, element, false, 12);
        this.mat = new Material(GetShaderProgram("simple"));
        this.mat.UpdateMatModel();
        this.mat.UpdateMatView();
    }
    InitMesh2(gl: WebGL2RenderingContext) {
        this.mesh2 = new Mesh();
        this.mesh2.UpdateVertexFormat(gl, VertexFormatMgr.GetFormat_Vertex_UV_Color_InstPos());
        {
            let stride = this.mesh.GetVertexFormat().vbos[0].stride;
            let vertexdata = new Uint8Array(stride * 4);

            let datavbo = new DataView(vertexdata.buffer);
            datavbo.setFloat32(0 * stride, 0, true);//x
            datavbo.setFloat32(0 * stride + 4, 0, true);//y
            datavbo.setFloat32(0 * stride + 8, 0, true);//z
            datavbo.setFloat32(0 * stride + 12, 0, true);//u
            datavbo.setFloat32(0 * stride + 16, 0, true);//v
            datavbo.setUint8(0 * stride + 20, 255);//r
            datavbo.setUint8(0 * stride + 21, 255);//g
            datavbo.setUint8(0 * stride + 22, 255);//b
            datavbo.setUint8(0 * stride + 23, 255);//a

            datavbo.setFloat32(1 * stride, 50, true);//x
            datavbo.setFloat32(1 * stride + 4, 0, true);//y
            datavbo.setFloat32(1 * stride + 8, 0, true);//z
            datavbo.setFloat32(1 * stride + 12, 0, true);//u
            datavbo.setFloat32(1 * stride + 16, 0, true);//v
            datavbo.setUint8(1 * stride + 20, 255);//r
            datavbo.setUint8(1 * stride + 21, 255);//g
            datavbo.setUint8(1 * stride + 22, 255);//b
            datavbo.setUint8(1 * stride + 23, 255);//a

            datavbo.setFloat32(2 * stride, 0, true);//x
            datavbo.setFloat32(2 * stride + 4, 50, true);//y
            datavbo.setFloat32(2 * stride + 8, 0, true);//z
            datavbo.setFloat32(2 * stride + 12, 0, true);//u
            datavbo.setFloat32(2 * stride + 16, 1, true);//v
            datavbo.setUint8(2 * stride + 20, 255);//r
            datavbo.setUint8(2 * stride + 21, 0);//g
            datavbo.setUint8(2 * stride + 22, 255);//b
            datavbo.setUint8(2 * stride + 23, 255);//a

            datavbo.setFloat32(3 * stride, 50, true);//x
            datavbo.setFloat32(3 * stride + 4, 50, true);//y
            datavbo.setFloat32(3 * stride + 8, 0, true);//z
            datavbo.setFloat32(3 * stride + 12, 1, true);//u
            datavbo.setFloat32(3 * stride + 16, 1, true);//v
            datavbo.setUint8(3 * stride + 20, 0);//r
            datavbo.setUint8(3 * stride + 21, 255);//g
            datavbo.setUint8(3 * stride + 22, 255);//b
            datavbo.setUint8(3 * stride + 23, 255);//a


            this.mesh2.UpdateVertexBuffer(gl, 0, vertexdata, false, vertexdata.byteLength);


        }

        //创建实例数据
        // let strideinst = this.mesh.GetVertexFormat().vbos[1].stride;
        // let vertexdatainst = new Uint8Array(strideinst * 3);
        // let datavboinst = new DataView(vertexdatainst.buffer);
        //this.mesh.UpdateVertexBuffer(gl, 1,vertexdatainst, false, vertexdatainst.byteLength);


        {
            let stride2 = this.mesh2.GetVertexFormat().vbos[1].stride;
            let instcount = 100;
            let vertexdata2 = new Uint8Array(stride2 * instcount);
            let datavbo2 = new DataView(vertexdata2.buffer);
            for (var i = 0; i < instcount; i++) {
                datavbo2.setFloat32(stride2 * i + 0, Math.random() * 100, true);
                datavbo2.setFloat32(stride2 * i + 4, Math.random() * 100, true);
                datavbo2.setFloat32(stride2 * i + 8, 0, true);
            }

            datavbo2.setFloat32(16, 22, true);
            datavbo2.setFloat32(20, 0, true);
            datavbo2.setFloat32(24, 33, true);
            datavbo2.setFloat32(28, 33, true);
            datavbo2.setFloat32(32, 0, true);
            this.mesh2.UpdateVertexBuffer(gl, 1, vertexdata2, false, vertexdata2.byteLength);
            this.mesh2.instancecount = instcount;
        }
        {
            let element = new Uint8Array(12);
            let dataebo = new DataView(element.buffer);
            dataebo.setUint16(0, 0, true);
            dataebo.setUint16(2, 1, true);
            dataebo.setUint16(4, 2, true);
            dataebo.setUint16(6, 2, true);
            dataebo.setUint16(8, 1, true);
            dataebo.setUint16(10, 3, true);
            this.mesh2.UpdateIndexBuffer(gl, element, false, 12);
        }

        this.mat2 = new Material(GetShaderProgram("simple_inst"));
        this.mat2.UpdateMatModel();
        this.mat2.UpdateMatView();
    }
    OnUpdate(delta: number): void {

    }
    OnExit(): void {

    }
    OnResize(width: number, height: number): void {

    }
    OnRender(): void {

        let gl = tt.graphic.GetWebGL();

        this._mainscreen.Begin();
        {
            this._quadbatcher.BeginDraw(this._mainscreen);

            for (var i = 0; i < 10; i++) {
                // for (var k = 0; k < 4; k++) {
                //     this.pts[k].r = Math.random();
                //     this.pts[k].g = Math.random();
                //     this.pts[k].b = Math.random();
                // }
                this.pts[0].x = this.pts[2].x = - 150;
                this.pts[1].x = this.pts[3].x = this.pts[0].x + this.tex.getWidth() * 8;

                this.pts[0].y = this.pts[1].y = - 150;
                //let y =this.pts[0].y;
                this.pts[2].y = this.pts[3].y = this.pts[0].y + this.tex.getHeight() * 8;
                this._quadbatcher.DrawQuads(this.tex, null, null, this.pts, 1);
            }


            this._quadbatcher.EndDraw();
        }

        this.mat.UpdateMatProj(this._mainscreen);
        this.mat.UpdateMatModel();
        this.mat.UpdateMatView();
        Render.DrawMesh(gl, this.mesh, this.mat);

        this.mat2.UpdateMatProj(this._mainscreen);
        this.mat2.UpdateMatModel();
        this.mat2.UpdateMatView();
        Render.DrawMeshInstanced(gl, this.mesh2, this.mat2);

        this._mainscreen.End();
    }
    OnPostRender(): void {

    }
}