import { VertexFormatMgr } from "../graphics/mesh.js";
import { Matrix3x2, Matrix3x2Math } from "../math/Matrix3x2.js";
import { PerlinNoise } from "../perlin/perlin.js";
import { Render } from "../render/render.js";
import { GetShaderProgram } from "../shader/shaders.js";
import { GameApp, Material, Mesh, TextureFormat } from "../ttlayer2.js";
import { PackTexture, SpriteData } from "./packtex.js";

export class Tiled {
    name: string;
    u0: number;
    v0: number;
    u1: number;
    v1: number;
}
export class TiledMap {
    tiledsprite: PackTexture = null;
    mapinfo: PackTexture = null;
    tiledsize: number = 0;

    private _mesh: Mesh;
    private _mat: Material;
    GetMat(): Material {
        return this._mat;
    }
    constructor(gl: WebGL2RenderingContext, mapWidth: number, mapHeight: number, tiledSize: number) {
        let tildetexSize = 1024;
        this.tiledsprite = new PackTexture(gl, tildetexSize, tildetexSize, TextureFormat.RGBA32, 0);
        this.tiledsize = tiledSize;

        this.mapinfo = new PackTexture(gl, mapWidth, mapHeight, TextureFormat.RGBA32, 0);


        this._mat = new Material(GetShaderProgram("tiledmap"));
        if (this._mat.uniformTexs["tex"] != undefined)
            this._mat.uniformTexs["tex"].value = this.mapinfo;
        if (this._mat.uniformTexs["tex2"] != undefined)
            this._mat.uniformTexs["tex2"].value = this.tiledsprite;

        if (this._mat.uniformVecs["texsize"] != undefined) {
            let tsize = new Float32Array(4);
            tsize[0] = mapWidth;
            tsize[1] = mapHeight;
            tsize[2] = tiledSize;
            tsize[3] = tildetexSize;
            this._mat.uniformVecs["texsize"].value = tsize;
        }
        this._InitMesh(gl);

        //Model 矩阵 默认
        this._mat.UpdateMatModel(null);

        let matrix = new Float32Array(16);
        let offx = 0;
        let offy = 0;
        let sx = 1 / 4;
        let sy = 1 / 4;
        matrix[0] = sx; matrix[4] = 0; matrix[8] = 0; matrix[12] = offx * sx;
        matrix[1] = 0; matrix[5] = sy; matrix[9] = 0; matrix[13] = offy * sy;
        matrix[2] = 0; matrix[6] = 0; matrix[10] = 1; matrix[14] = 0;
        matrix[3] = 0; matrix[7] = 0; matrix[11] = 0; matrix[15] = 1;

        this._mat.UpdateMatView(matrix);//跟着camera走
        this._mat.UpdateMatProj(GameApp.GetMainScreen());
        this._InitMapInfo();
    }
    _InitMesh(gl: WebGL2RenderingContext,): void {
        this._mesh = new Mesh();
        this._mesh.UpdateVertexFormat(gl, VertexFormatMgr.GetFormat_Vertex_UV_Color());
        let stride = this._mesh.GetVertexFormat().vbos[0].stride;
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

        datavbo.setFloat32(1 * stride, this.mapinfo._width * this.tiledsize, true);//x
        datavbo.setFloat32(1 * stride + 4, 0, true);//y
        datavbo.setFloat32(1 * stride + 8, 0, true);//z
        datavbo.setFloat32(1 * stride + 12, 1, true);//u
        datavbo.setFloat32(1 * stride + 16, 0, true);//v
        datavbo.setUint8(1 * stride + 20, 255);//r
        datavbo.setUint8(1 * stride + 21, 255);//g
        datavbo.setUint8(1 * stride + 22, 255);//b
        datavbo.setUint8(1 * stride + 23, 255);//a

        datavbo.setFloat32(2 * stride, 0, true);//x
        datavbo.setFloat32(2 * stride + 4, this.mapinfo._height * this.tiledsize, true);//y
        datavbo.setFloat32(2 * stride + 8, 0, true);//z
        datavbo.setFloat32(2 * stride + 12, 0, true);//u
        datavbo.setFloat32(2 * stride + 16, 1, true);//v
        datavbo.setUint8(2 * stride + 20, 255);//r
        datavbo.setUint8(2 * stride + 21, 255);//g
        datavbo.setUint8(2 * stride + 22, 255);//b
        datavbo.setUint8(2 * stride + 23, 255);//a

        datavbo.setFloat32(3 * stride, this.mapinfo._width * this.tiledsize, true);//x
        datavbo.setFloat32(3 * stride + 4, this.mapinfo._height * this.tiledsize, true);//y
        datavbo.setFloat32(3 * stride + 8, 0, true);//z
        datavbo.setFloat32(3 * stride + 12, 1, true);//u
        datavbo.setFloat32(3 * stride + 16, 1, true);//v
        datavbo.setUint8(3 * stride + 20, 255);//r
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

        this._mesh.UploadVertexBuffer(gl, 0, vertexdata, false, vertexdata.byteLength);

        this._mesh.UploadIndexBuffer(gl, element, false, 12);
    }
    _InitMapInfo(): void {

        let reddata = new SpriteData();
        reddata.format = TextureFormat.RGBA32;
        reddata.width = this.tiledsize;
        reddata.height = this.tiledsize;
        reddata.data = new Uint8Array(this.tiledsize * this.tiledsize * 4);
        for (let i = 0; i < this.tiledsize * this.tiledsize; i++) {
            reddata.data[i * 4] = i * 3;
            reddata.data[i * 4 + 1] = 0;
            reddata.data[i * 4 + 2] = 0;
            reddata.data[i * 4 + 3] = 255;
        }
        let sred = this.tiledsprite.AddSprite(reddata, "red");


        let bluedata = new SpriteData();
        bluedata.format = TextureFormat.RGBA32;
        bluedata.width = this.tiledsize;
        bluedata.height = this.tiledsize;
        bluedata.data = new Uint8Array(this.tiledsize * this.tiledsize * 4);
        for (let i = 0; i < this.tiledsize * this.tiledsize; i++) {
            bluedata.data[i * 4] = 0;
            bluedata.data[i * 4 + 1] = 0;
            bluedata.data[i * 4 + 2] = i * 3;
            bluedata.data[i * 4 + 3] = 255;
        }
        let sblue = this.tiledsprite.AddSprite(bluedata, "blue");
        this.tiledsprite.Apply();

        PerlinNoise.Reset();
        for (let y = 0; y < this.mapinfo._height; y++) {
            for (let x = 0; x < this.mapinfo._width; x++) {
                let index = (y * this.mapinfo._width + x) * 4;
                let z = PerlinNoise.GenNoise(x / 128, y / 128, 0, 3, 2);
                let c = z > 0.5;
                this.mapinfo.pixelbuf[index] = c ? sred.X / this.tiledsize : sblue.X / this.tiledsize;
                this.mapinfo.pixelbuf[index + 1] = c ? sred.Y / this.tiledsize : sblue.Y / this.tiledsize;
                this.mapinfo.pixelbuf[index + 2] = 255;
                this.mapinfo.pixelbuf[index + 3] = 255;
            }
        }

        this.mapinfo.Apply(true);
    }

    Render(gl: WebGL2RenderingContext): void {

        Render.DrawMesh(gl, this._mesh, this._mat);
    }
}