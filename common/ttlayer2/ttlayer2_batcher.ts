import { Vector2, DrawPoint } from "./math/vector.js"



import { ITexture, getWhiteTexture, IRenderTarget } from "./graphics/texture.js"
import { GetShaderProgram, ShaderProgram } from "./shader/shaders.js";
import { Mesh } from "./ttlayer2.js";
import { Material } from "./graphics/material.js";
import { VertexFormatMgr } from "./graphics/mesh.js";
import { Render } from "./graphics/render.js";

export class Render_Batcher {
    constructor(webgl: WebGL2RenderingContext) {
        this._webgl = webgl;
        this._target = null;
        this._lastshader = null;
        var _vbo = webgl.createBuffer();
        this._buffer = new Uint8Array(65536 * 28);
        this._bufferView = new DataView(this._buffer.buffer, 0, this._buffer.length);
        this._pointseek = 0;
        this._lastMode = webgl.TRIANGLES;
        // if (_vbo != null) {
        //     this._vbo = _vbo;
        // }
        // else {
        //     throw new Error("error vbo.");
        // }
        // var _vao = webgl.createVertexArray();
        // if (_vao != null) {
        //     this._vao = _vao;
        // }
        // else {
        //     throw new Error("error vao.");
        // }
        // {//初始化 vao
        //     webgl.bindVertexArray(_vao);
        //     webgl.bindBuffer(webgl.ARRAY_BUFFER, this._vbo);
        //     //if (shader.attrIndexPos >= 0) {
        //     webgl.enableVertexAttribArray(0);
        //     //36 是数据步长(字节)，就是数据结构的长度
        //     //0 是数据偏移（字节）
        //     webgl.vertexAttribPointer(0, 3, webgl.FLOAT, false, 28, 0);
        //     //}

        //     //if (shader.attrIndexColor >= 0) {
        //     webgl.enableVertexAttribArray(1);
        //     webgl.vertexAttribPointer(1, 4, webgl.UNSIGNED_BYTE, true, 28, 12);
        //     //}
        //     //if (shader.attrIndexUV >= 0) {
        //     webgl.enableVertexAttribArray(2);
        //     webgl.vertexAttribPointer(2, 2, webgl.FLOAT, false, 28, 16);
        //     //}

        //     //if (shader.attrIndexExt >= 0) {
        //     webgl.enableVertexAttribArray(3);
        //     webgl.vertexAttribPointer(3, 4, webgl.UNSIGNED_BYTE, false, 28, 24);
        //     //}
        //     webgl.bindVertexArray(null);
        // }
        this.LookAt = new Vector2(0, 0);
        this.Scale = 1.0;
        this._lastTex = null;
        this._lastTex2 = null;
        this._lastTexPal = null;
        // var shader = GetShaderProgram("default");
        // if (shader == null)
        //     throw new Error("error load shader.");
        //this._shader = shader
        // this._modelMatrix = new Float32Array(16);
        // this._viewMatrix = new Float32Array(16);
        // this._projMatrix = new Float32Array(16);
        this._mesh = new Mesh();
        this._mesh.UpdateVertexFormat(webgl, VertexFormatMgr.GetFormat_Vertex_UV_Color_Color2());
        this._mat = new Material(GetShaderProgram("default"));
    }
    //_shader: ShaderProgram;
    _webgl: WebGL2RenderingContext
    _target: IRenderTarget | null;
    _lastshader: ShaderProgram | null;
    _lastMode: number;
    _lastTex: ITexture | null;
    _lastTex2: ITexture | null;
    _lastTexPal: ITexture | null;
    //_vbo: WebGLBuffer;
    //_vao: WebGLVertexArrayObject;
    _mesh: Mesh = null;
    _mat: Material = null;
    _buffer: Uint8Array;
    _bufferView: DataView;
    _pointseek: number;
    // _modelMatrix: Float32Array;
    // _viewMatrix: Float32Array;
    // _projMatrix: Float32Array;
    DrawQuads(tex: ITexture, tex2: ITexture | null, texpal: ITexture | null, quads: DrawPoint[], quadCount: number): void {
        if (this._target == null)
            throw new Error("Render_Batcher Not in Begin-End.");

        if (this._lastMode != this._webgl.TRIANGLES || this._lastTex != tex || this._lastTex2 != tex2
            || this._lastTexPal != texpal
            || this._pointseek + quadCount * 6 >= 65536) {
            this._Render();


            this._ApplySingle(tex, tex2, texpal);
        }
        this._lastMode = this._webgl.TRIANGLES

        for (var i = 0; i < quadCount; i++) {
            this._AddBuf(quads[i * 4 + 0]);
            this._AddBuf(quads[i * 4 + 1]);
            this._AddBuf(quads[i * 4 + 2]);
            this._AddBuf(quads[i * 4 + 2]);
            this._AddBuf(quads[i * 4 + 1]);
            this._AddBuf(quads[i * 4 + 3]);
        }

    }
    DrawTris(tex: ITexture, tex2: ITexture | null, texpal: ITexture | null, tris: DrawPoint[], tricount: number): void {
        if (this._target == null)
            throw new Error("Render_Batcher Not in Begin-End.");
        if (this._lastMode != this._webgl.TRIANGLES || this._lastTex != tex || this._lastTex2 != tex2
            || this._lastTexPal != texpal
            || this._pointseek + tricount * 3 > 65536) {
            this._Render();
            this._ApplySingle(tex, tex2, texpal);
        }
        this._lastMode = this._webgl.TRIANGLES

        for (var i = 0; i < tricount; i++) {
            this._AddBuf(tris[i * 3 + 0]);
            this._AddBuf(tris[i * 3 + 1]);
            this._AddBuf(tris[i * 3 + 2]);
        }
    }
    DrawLines(tex: ITexture, tex2: ITexture | null, texpal: ITexture | null, lines: DrawPoint[], linecount: number): void {
        if (this._target == null)
            throw new Error("Render_Batcher Not in Begin-End.");
        if (this._lastMode != this._webgl.LINES || this._lastTex != tex || this._lastTex2 != tex2
            || this._lastTexPal != texpal
            || this._pointseek + linecount * 2 > 65536) {
            this._Render();
            this._ApplySingle(tex, tex2, texpal);
        }
        this._lastMode = this._webgl.LINES

        for (var i = 0; i < linecount; i++) {
            this._AddBuf(lines[i * 2 + 0]);
            this._AddBuf(lines[i * 2 + 1]);
        }
    }
    DrawPoints(tex: ITexture, tex2: ITexture | null, texpal: ITexture | null, points: DrawPoint[], pointcount: number): void {
        if (this._target == null)
            throw new Error("Render_Batcher Not in Begin-End.");
        if (this._lastMode != this._webgl.POINTS || this._lastTex != tex || this._lastTex2 != tex2
            || this._lastTexPal != texpal
            || this._pointseek + pointcount * 1 > 65536) {
            this._Render();
            this._ApplySingle(tex, tex2, texpal);
        }
        this._lastMode = this._webgl.POINTS

        for (var i = 0; i < pointcount; i++) {
            this._AddBuf(points[i]);
        }
    }

    getTarget(): IRenderTarget | null {
        return this._target;
    }
    getName(): string {
        return "Batcher";
    }
    LookAt: Vector2;
    Scale: number;

    ResetMatrix(): void {
        this._Render();
        this._mat.UpdateMatModel();
        this._mat.UpdateMatView();
        this._mat.UpdateMatProj(this._target);
        // this._MatDefault(this._modelMatrix);
        // this._MatView(this._viewMatrix);
        // this._MatProj(this._projMatrix, 0, 0);
    }

    ApplyBatch(): void {
        this._Render();
    }
    BeginDraw(target: IRenderTarget): void {
        this._target = target;

        //update viewmatrix & modelmatrxi projmatrix

        // this._MatDefault(this._modelMatrix);
        // this._MatView(this._viewMatrix);
        // this._MatProj(this._projMatrix, 0, 0);
        this._mat.UpdateMatProj(this._target);
        let webgl = this._webgl;

        webgl.disable(webgl.CULL_FACE);
        webgl.depthMask(false);//这是zwrite
        webgl.disable(webgl.DEPTH_TEST);//这是ztest

        webgl.enable(webgl.BLEND);
        webgl.blendEquation(webgl.FUNC_ADD);
        webgl.blendFuncSeparate(webgl.SRC_ALPHA, webgl.ONE_MINUS_SRC_ALPHA,
            webgl.SRC_ALPHA, webgl.ONE);

    }

    EndDraw(): void {
        this._Render();
        this._target = null;
        this._ApplySingle(null, null, null);
    }
    _Render(): void {
        if (this._pointseek == 0)
            return;
        let webgl = this._webgl;

        //this._mat.Apply(webgl);
        //this._mesh.Apply(webgl);
        // let shader = this._shader;

        // webgl.useProgram(shader.program);

        // webgl.bindVertexArray(this._vao);
        this._mat.uniformTexs["tex"].value = this._lastTex;
        this._mesh.UpdateVertexBuffer(webgl, this._buffer, true, this._pointseek * 28);
        this._pointseek = 0;
        //webgl.bindBuffer(webgl.ARRAY_BUFFER, this._vbo);
        //webgl.bufferData(webgl.ARRAY_BUFFER, this._buffer, webgl.DYNAMIC_DRAW, 0, this._pointseek * 28);

        //webgl.bindBuffer(webgl.ARRAY_BUFFER, this._vbo);

        Render.DrawMesh(webgl, this._mesh, this._mat);
        //webgl.drawArrays(this._lastMode, 0, this._pointseek);

        // if (this._lastMode == webgl.TRIANGLES)
        //     webgl.drawArrays(this._lastMode, 0, this._pointseek / 3);
        // if (this._lastMode == webgl.LINES)
        //     webgl.drawArrays(this._lastMode, 0, this._pointseek / 2);
        // if (this._lastMode == webgl.POINTS)
        //     webgl.drawArrays(this._lastMode, 0, this._pointseek / 1);

    }
    _AddBuf(p: DrawPoint): void {
        this._bufferView.setFloat32(this._pointseek * 28 + 0, p.x, true);
        this._bufferView.setFloat32(this._pointseek * 28 + 4, p.y, true);
        this._bufferView.setFloat32(this._pointseek * 28 + 8, p.z, true);
        this._bufferView.setFloat32(this._pointseek * 28 + 12, p.u, true);
        this._bufferView.setFloat32(this._pointseek * 28 + 16, p.v, true);


        this._bufferView.setUint8(this._pointseek * 28 + 20, (p.r * 255) | 0);
        this._bufferView.setUint8(this._pointseek * 28 + 21, (p.g * 255) | 0);
        this._bufferView.setUint8(this._pointseek * 28 + 22, (p.b * 255) | 0);
        this._bufferView.setUint8(this._pointseek * 28 + 23, (p.a * 255) | 0);



        this._bufferView.setUint8(this._pointseek * 28 + 24, p.palx);
        this._bufferView.setUint8(this._pointseek * 28 + 25, p.paly);
        this._bufferView.setUint8(this._pointseek * 28 + 26, 0);//p.texid); will be auto
        this._bufferView.setUint8(this._pointseek * 28 + 27, p.eff);
        this._pointseek++;
    }

    _ApplySingle(tex: ITexture, tex2: ITexture | null, texpal: ITexture | null): void {
        this._lastTex = tex;
        this._lastTex2 = tex2;
        this._lastTexPal = texpal;
    }

}
