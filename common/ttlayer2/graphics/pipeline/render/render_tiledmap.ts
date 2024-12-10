import { tt } from "../../../../ttapi/ttapi.js";
import { PackTexture } from "../../../resources/packtex/packtex.js";
import { IRenderTarget, QUI_Canvas, Resources, Texture } from "../../../ttlayer2.js";
import { Material } from "../../material.js";
import { Mesh, VertexFormatMgr } from "../../mesh.js";
import { Camera, ILayerRender } from "../drawlayer.js";

export class Render_Tiledmap implements ILayerRender {
    mesh: Mesh;
    mat: Material;

    SetTiledmap(indexTex: Texture, tiledTex: Texture, tiledSize: number, scale: number = 1.0) {
        this.scale = scale;

        let gl = tt.graphic.GetWebGL();
        this.mat = new Material(Resources.GetShaderProgram("tiledmap"));
        this.mat.UpdateMatModel();
        this.mesh = new Mesh();
        this.mesh.UpdateVertexFormat(gl, VertexFormatMgr.GetFormat_Vertex_UV_Color());
        this.UpdateMesh(indexTex.getWidth(), indexTex.getHeight(), tiledSize * scale);
        //uniform sampler2D texIndex; 
        //uniform sampler2D texTile; 
        //uniform float   tilesize;
        //uniform vec4     mapinfo;//xy map size, zw=tile texturesize
        this.mat.uniformTexs["texTile"].value = tiledTex;
        this.mat.uniformTexs["texIndex"].value = indexTex;
        this.mat.uniformFloats["tilesize"].value = tiledSize;
        this.mat.uniformVecs["mapinfo"].value = new Float32Array([indexTex.getWidth(), indexTex.getHeight()
            , tiledTex.getWidth(), tiledTex.getHeight()
        ]);
    }
    private scale: number = 1.0;
    GetScale(): number {
        return this.scale;
    }

    private UpdateMesh(width: number, height: number, scale: number): void {

        let gl = tt.graphic.GetWebGL();
        let stride = this.mesh.GetVertexFormat().vbos[0].stride;
        let vertexdata = new Uint8Array(stride * 6);
        let datavbo = new DataView(vertexdata.buffer);
        datavbo.setFloat32(0 * stride, 0, true);//x
        datavbo.setFloat32(0 * stride + 4, 0, true);//y
        datavbo.setFloat32(0 * stride + 8, 0, true);//z
        datavbo.setFloat32(0 * stride + 12, 0, true);//u
        datavbo.setFloat32(0 * stride + 16, 0, true);//v



        datavbo.setFloat32(1 * stride, width * scale, true);//x
        datavbo.setFloat32(1 * stride + 4, 0, true);//y
        datavbo.setFloat32(1 * stride + 8, 0, true);//z
        datavbo.setFloat32(1 * stride + 12, 1, true);//u
        datavbo.setFloat32(1 * stride + 16, 0, true);//v


        datavbo.setFloat32(2 * stride, 0, true);//x
        datavbo.setFloat32(2 * stride + 4, height * scale, true);//y
        datavbo.setFloat32(2 * stride + 8, 0, true);//z
        datavbo.setFloat32(2 * stride + 12, 0, true);//u
        datavbo.setFloat32(2 * stride + 16, 1, true);//v

        datavbo.setFloat32(3 * stride, 0, true);//x
        datavbo.setFloat32(3 * stride + 4, height * scale, true);//y
        datavbo.setFloat32(3 * stride + 8, 0, true);//z
        datavbo.setFloat32(3 * stride + 12, 0, true);//u
        datavbo.setFloat32(3 * stride + 16, 1, true);//v

        datavbo.setFloat32(4 * stride, width * scale, true);//x
        datavbo.setFloat32(4 * stride + 4, 0, true);//y
        datavbo.setFloat32(4 * stride + 8, 0, true);//z
        datavbo.setFloat32(4 * stride + 12, 1, true);//u
        datavbo.setFloat32(4 * stride + 16, 0, true);//v

        datavbo.setFloat32(5 * stride, width * scale, true);//x
        datavbo.setFloat32(5 * stride + 4, height * scale, true);//y
        datavbo.setFloat32(5 * stride + 8, 0, true);//z
        datavbo.setFloat32(5 * stride + 12, 1, true);//u
        datavbo.setFloat32(5 * stride + 16, 1, true);//v


        this.mesh.UploadVertexBuffer(gl, 0, vertexdata, false, vertexdata.byteLength);


    }

    GetGUI(): QUI_Canvas {
        return null;
    }
    OnUpdate(delta: number): void {

    }
    OnRender(target: IRenderTarget, camera: Camera, rendertag: number): void {
        if (this.mat == null || this.mesh == null)
            return;
        let gl = tt.graphic.GetWebGL();
        if (rendertag == 0) {
            //this.canvas.batcherUI.LookAt = camera.LookAt;
            this.mat.UpdateMatProj(target);
            this.mat.UpdateMatView(camera.GetViewMatrix());
            Mesh.DrawMesh(gl, this.mesh, this.mat);
        }
    }

}