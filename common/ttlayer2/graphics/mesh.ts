import { Material } from "./material.js";

export enum VertexAttribType {
    UNSIGNED_BYTE = 0x1401,
    UNSIGNED_SHORT = 0x1403,
    UNSIGNED_INT = 0x1405,
    FLOAT = 0x1406,
}
export class VertexAttribItem {
    constructor(type: VertexAttribType, size: number, normalize: boolean) {
        this.type = type;
        this.size = size;
        this.normalize = normalize;
    }
    type: VertexAttribType;
    size: number;//元素数量
    normalize: boolean;

    offset: number;

}
export class VBOInfo {
    vertexAttribDivisor: number = 0;
    atrribs: VertexAttribItem[] = [];
    atrribsCount: number;
    stride: number;
    hash: string;
    Update(): void {
        this.atrribsCount = this.atrribs.length;
        this.stride = 0;
        this.hash = "";
        for (var i = 0; i < this.atrribs.length; i++) {
            var a = this.atrribs[i];
            a.offset = this.stride;
            if (a.type == VertexAttribType.FLOAT) {
                this.stride += 4 * a.size;
            }
            else if (a.type == VertexAttribType.UNSIGNED_BYTE) {
                this.stride += 1 * a.size;
            }
            else if (a.type == VertexAttribType.UNSIGNED_SHORT) {
                this.stride += 2 * a.size;
            }
            else if (a.type == VertexAttribType.UNSIGNED_INT) {
                this.stride += 4 * a.size;
            }
            else {
                throw "unknown stride";
            }
            this.hash += a.type + "(" + a.size + ");";
        }
    }
}
//这个顶点格式描述方法，还不够强
export class VertexFormat {
    constructor(id: string) {
        this.id = id;
        this.vbos = [];
    }
    id: string;
    vbos: VBOInfo[]
    hash: string;

    Update(): void {

        this.hash = "";
        for (var i = 0; i < this.vbos.length; i++) {
            var a = this.vbos[i];
            a.Update();
            this.hash += "{" + a.hash + "}";
        }
    }
}
export class VertexFormatMgr {
    private static vertexFormats: { [hash: string]: VertexFormat } = {}
    private static vertexFormatsID2Hash: { [id: string]: string } = {}
    private static vertexFormat_Vertex_Normal: VertexFormat = null;
    private static vertexFormat_Vertex_Color: VertexFormat = null;
    private static vertexFormat_Vertex_UV: VertexFormat = null;
    private static vertexFormat_Vertex_UV_Color: VertexFormat = null;
    private static vertexFormat_Vertex_UV_Color_Color2: VertexFormat = null;
    private static vertexFormat_Vertex_UV_Color_InstPos: VertexFormat = null;
    private static vertexFormat_Vertex_UV_Color_InstPosNormal: VertexFormat = null;
    private static vertexFormat_Vertex_UV_Color_InstXYZRUVRectColor: VertexFormat = null;
    private static vertexFormat_Vertex_InstFull: VertexFormat = null;
    static RegFormat(format: VertexFormat): VertexFormat {
        format.Update();
        let f: VertexFormat = format;
        if (this.vertexFormats[format.hash] == undefined)
            this.vertexFormats[format.hash] = format;
        else
            f = this.vertexFormats[format.hash];//已经存在,节约一下
        this.vertexFormatsID2Hash[format.id] = format.hash;

        return f;
    }
    static GetFormat(id: string): VertexFormat {
        let hash = this.vertexFormatsID2Hash[id];
        return this.vertexFormats[hash];
    }
    static GetFormat_Vertex_Normal(): VertexFormat {
        if (this.vertexFormat_Vertex_Normal == null) {
            let vecf = new VertexFormat("Vertex_Normal");
            vecf.vbos.push(new VBOInfo());
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 3, false));
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 3, true));
            this.vertexFormat_Vertex_Normal = this.RegFormat(vecf);
        }
        return this.vertexFormat_Vertex_Normal;
    }
    static GetFormat_Vertex_Color(): VertexFormat {
        if (this.vertexFormat_Vertex_Color == null) {
            let vecf = new VertexFormat("Vertex_Color");
            vecf.vbos.push(new VBOInfo());
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 3, false));
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.UNSIGNED_BYTE, 4, true));
            this.vertexFormat_Vertex_Color = this.RegFormat(vecf);
        }
        return this.vertexFormat_Vertex_Color;
    }
    static GetFormat_Vertex_UV(): VertexFormat {
        if (this.vertexFormat_Vertex_UV == null) {
            let vecf = new VertexFormat("Vertex_UV_Color");
            vecf.vbos.push(new VBOInfo());
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 3, false));
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 2, false));
            this.vertexFormat_Vertex_UV = this.RegFormat(vecf);
        }
        return this.vertexFormat_Vertex_UV;
    }
    static GetFormat_Vertex_UV_Color(): VertexFormat {
        if (this.vertexFormat_Vertex_UV_Color == null) {
            let vecf = new VertexFormat("Vertex_UV_Color");
            vecf.vbos.push(new VBOInfo());
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 3, false));
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 2, false));
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.UNSIGNED_BYTE, 4, true));
            this.vertexFormat_Vertex_UV_Color = this.RegFormat(vecf);
        }
        return this.vertexFormat_Vertex_UV_Color;
    }
    static GetFormat_Vertex_UV_Color_Ext(): VertexFormat {
        if (this.vertexFormat_Vertex_UV_Color_Color2 == null) {
            let vecf = new VertexFormat("Vertex_UV_Color_Color2");
            vecf.vbos.push(new VBOInfo());
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 3, false));
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 2, false));
          
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.UNSIGNED_BYTE, 4, true));
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.UNSIGNED_BYTE, 4, false));
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 4, false));
            this.vertexFormat_Vertex_UV_Color_Color2 = this.RegFormat(vecf);
        }
        return this.vertexFormat_Vertex_UV_Color_Color2;
    }
    static GetFormat_Vertex_UV_Color_InstPos(): VertexFormat {
        if (this.vertexFormat_Vertex_UV_Color_InstPos == null) {
            let vecf = new VertexFormat("Vertex_UV_Color_InstPos");
            vecf.vbos.push(new VBOInfo());
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 3, false));
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 2, false));
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.UNSIGNED_BYTE, 4, true));
            vecf.vbos.push(new VBOInfo());
            vecf.vbos[1].vertexAttribDivisor = 1;//instanced data
            vecf.vbos[1].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 3, false));
            this.vertexFormat_Vertex_UV_Color_InstPos = this.RegFormat(vecf);
        }
        return this.vertexFormat_Vertex_UV_Color_InstPos;
    }
    static GetFormat_Vertex_UV_Color_InstPosNormal(): VertexFormat {
        if (this.vertexFormat_Vertex_UV_Color_InstPosNormal == null) {
            let vecf = new VertexFormat("Vertex_UV_Color_InstPosNormal");
            vecf.vbos.push(new VBOInfo());
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 3, false));
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 2, false));
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.UNSIGNED_BYTE, 4, true));
            vecf.vbos.push(new VBOInfo());
            vecf.vbos[1].vertexAttribDivisor = 1;//instanced data
            vecf.vbos[1].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 3, false));
            vecf.vbos[1].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 3, true));
            this.vertexFormat_Vertex_UV_Color_InstPosNormal = this.RegFormat(vecf);
        }
        return this.vertexFormat_Vertex_UV_Color_InstPosNormal;
    }

    //in test
    //普通 顶点信息(pos XYZ + uv +COLOR+ext)*6= 28*6 = 168 
    //32/168 <20%, 带宽只需要1/5
    //InstFull //实例信息32字节
    //{
    //  Pos XYZ  :12
    //  Roate    :4
    //  Scale    :8
    //  Color    :4
    //  Ext      :4
    //}使用InstFull 则刷新带宽只有原来的36%，旋转计算被移到GPU
    static GetFormat_Vertex_InstFull(): VertexFormat {
        if (this.vertexFormat_Vertex_InstFull == null) {
            let vecf = new VertexFormat("Vertex_InstFull");
            vecf.vbos.push(new VBOInfo());
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 2, false));//basemesh uv only

            vecf.vbos.push(new VBOInfo());
            vecf.vbos[1].vertexAttribDivisor = 1;//instanced data
            vecf.vbos[1].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 4, false));//Pos xyz + rotate
            vecf.vbos[1].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 2, false));//Scale
            vecf.vbos[1].atrribs.push(new VertexAttribItem(VertexAttribType.UNSIGNED_BYTE, 4, true));//color
            vecf.vbos[1].atrribs.push(new VertexAttribItem(VertexAttribType.UNSIGNED_SHORT, 2, false));//INSTid&ext
            this.vertexFormat_Vertex_InstFull = this.RegFormat(vecf);
        }
        return this.vertexFormat_Vertex_InstFull;
    }
    static GetFormat_Vertex_UV_Color_InstXYZRUVRectColor(): VertexFormat {
        if (this.vertexFormat_Vertex_UV_Color_InstXYZRUVRectColor == null) {
            let vecf = new VertexFormat("Vertex_UV_Color_InstXYZRUVRectColor");
            vecf.vbos.push(new VBOInfo());
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 3, false));
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 2, false));
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.UNSIGNED_BYTE, 4, true));
            vecf.vbos.push(new VBOInfo());
            vecf.vbos[1].vertexAttribDivisor = 1;//instanced data
            vecf.vbos[1].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 4, false));//xyzr
            vecf.vbos[1].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 4, false));//uvrect xywh
            vecf.vbos[1].atrribs.push(new VertexAttribItem(VertexAttribType.UNSIGNED_BYTE, 4, true));//color
            this.vertexFormat_Vertex_UV_Color_InstXYZRUVRectColor = this.RegFormat(vecf);
        }
        return this.vertexFormat_Vertex_UV_Color_InstPosNormal;
    }
}

export class Mesh {
    _vbos: WebGLBuffer[] = null;
    instancecount: number;//示例数量
    _ebo: WebGLBuffer = null;
    _vao: WebGLVertexArrayObject = null;
    vertexcount: number[];
    indexcount: number = 0;
    mode: number = -1;
    private vertexFormat: VertexFormat;
    constructor() {

    }
    GetVertexFormat(): VertexFormat {
        return this.vertexFormat;
    }
    UpdateVertexFormat(webgl: WebGL2RenderingContext, vecf: VertexFormat): void {
        if (this._vao == null) {
            this._vao = webgl.createVertexArray();

        }
        if (this._vbos == null) {
            this._vbos = [];
            this.vertexcount = [];

        }
        while (this._vbos.length < vecf.vbos.length) {
            this._vbos.push(null);
        }
        while (this.vertexcount.length < vecf.vbos.length) {
            this.vertexcount.push(0);
        }
        for (var j = 0; j < vecf.vbos.length; j++) {

            if (this._vbos[j] == null)
                this._vbos[j] = webgl.createBuffer();
        }


        this.vertexFormat = vecf;

        {//初始化 vao
            webgl.bindVertexArray(this._vao);

            let iatt = 0;
            for (var j = 0; j < vecf.vbos.length; j++) {
                let vf = vecf.vbos[j];
                webgl.bindBuffer(webgl.ARRAY_BUFFER, this._vbos[j]);

                for (var i = 0; i < vf.atrribsCount; i++) {
                    let vi = vf.atrribs[i];

                    webgl.enableVertexAttribArray(iatt);
                    webgl.vertexAttribPointer(iatt, vi.size, vi.type, vi.normalize, vf.stride, vi.offset);
                    webgl.vertexAttribDivisor(iatt, vf.vertexAttribDivisor);
                    iatt++;
                }

            }
            for (var i = iatt; i < 10; i++) {
                webgl.disableVertexAttribArray(i);
            }
            webgl.bindVertexArray(null);
        }
    }
    SetVertexBuffer(webgl: WebGL2RenderingContext, vboindex: number, bufobj: WebGLBuffer, vertexcount: number): void {
        if (this._vbos == null) {
            this._vbos = [];
            this.vertexcount = [];

        }
        while (this._vbos.length <= vboindex) {
            this._vbos.push(null);
        }
        while (this.vertexcount.length <= vboindex) {
            this.vertexcount.push(0);
        }


        this._vbos[vboindex] = bufobj
        //webgl.bindBuffer(webgl.ARRAY_BUFFER, this._vbos[vboindex]);
        this.vertexcount[vboindex] = vertexcount;
    }
    SetIndexBuffer(webgl: WebGL2RenderingContext, bufobj: WebGLBuffer, dynamic: boolean, indexcount: number) {
        this._ebo = bufobj;
        //webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, this._ebo);
        this.indexcount = indexcount;
    }
    UploadVertexBuffer(webgl: WebGL2RenderingContext, vboindex: number, vertexdata: Uint8Array, dynamic: boolean, bytelength: number): void {
        if (this._vbos[vboindex] == null) {
            this._vbos[vboindex] = webgl.createBuffer()
        }

        webgl.bindBuffer(webgl.ARRAY_BUFFER, this._vbos[vboindex]);
        webgl.bufferData(webgl.ARRAY_BUFFER, vertexdata, dynamic ? webgl.DYNAMIC_DRAW : webgl.STATIC_DRAW, 0, bytelength);
        this.vertexcount[vboindex] = bytelength / this.vertexFormat.vbos[vboindex].stride;
        webgl.bindBuffer(webgl.ARRAY_BUFFER, null);
    }
    UploadIndexBuffer(webgl: WebGL2RenderingContext, element: Uint8Array, dynamic: boolean, bytelength: number) {
        if (this._ebo == null) {
            this._ebo = webgl.createBuffer();
        }
        webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, this._ebo);
        webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, element, dynamic ? webgl.DYNAMIC_DRAW : webgl.STATIC_DRAW, 0, bytelength);
        this.indexcount = bytelength / 2;
        webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, null);
    }
    Apply(webgl: WebGL2RenderingContext) {
        webgl.bindVertexArray(this._vao);
        if (this._ebo != null) {
            webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, this._ebo);
        }
    }

    static DrawMesh(gl: WebGL2RenderingContext, mesh: Mesh, mat: Material): void {
        let mode = mesh.mode;
        if (mode == -1)
            mode = gl.TRIANGLES;
        mesh.Apply(gl);
        mat.Apply(gl);
        if (mesh._ebo == null) {
            gl.drawArrays(mode, 0, mesh.vertexcount[0]);
        }
        else {
            gl.drawElements(mode, mesh.indexcount, gl.UNSIGNED_SHORT, gl.ZERO);
        }
    }
    static DrawMeshInstanced(gl: WebGL2RenderingContext, mesh: Mesh, mat: Material): void {
        let mode = mesh.mode;
        if (mode == -1)
            mode = gl.TRIANGLES;
        
        mesh.Apply(gl);
        mat.Apply(gl);

        //这里instancecount 要乘以定点数，就很迷惑
        if (mesh._ebo == null) {
            //为什么乘以4 是正确的，原型是 六个顶点两个三角形啊
            gl.drawArraysInstanced(mode, 0, mesh.vertexcount[0], mesh.instancecount);
        }
        else {
            gl.drawElementsInstanced(mode, mesh.indexcount, gl.UNSIGNED_SHORT, gl.ZERO, mesh.instancecount);
        }
    }

}