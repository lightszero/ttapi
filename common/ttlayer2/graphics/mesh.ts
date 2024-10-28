
export enum VertexAttribType {
    FLOAT = 0x1406,
    UNSIGNED_BYTE = 0x1401,
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
    private static vertexFormat_Vertex_Color: VertexFormat = null;
    private static vertexFormat_Vertex_UV_Color: VertexFormat = null;
    private static vertexFormat_Vertex_UV_Color_Color2: VertexFormat = null;
    private static vertexFormat_Vertex_UV_Color_InstPos: VertexFormat = null;
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
    static GetFormat_Vertex_UV_Color_Color2(): VertexFormat {
        if (this.vertexFormat_Vertex_UV_Color_Color2 == null) {
            let vecf = new VertexFormat("Vertex_UV_Color_Color2");
            vecf.vbos.push(new VBOInfo());
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 3, false));
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 2, false));
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.UNSIGNED_BYTE, 4, true));
            vecf.vbos[0].atrribs.push(new VertexAttribItem(VertexAttribType.UNSIGNED_BYTE, 4, false));
            this.vertexFormat_Vertex_UV_Color_Color2 = this.RegFormat(vecf);
        }
        return this.vertexFormat_Vertex_UV_Color_Color2;
    }
    static GetFormat_Vertex_UV_Color_InstPos(): VertexFormat {
        if (this.vertexFormat_Vertex_UV_Color_InstPos == null) {
            let vecf = new VertexFormat("Vertex_UV_Color");
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
}

export class Mesh {
    _vbos: WebGLBuffer[] = null;
    instancecount: number;//示例数量
    _ebo: WebGLBuffer = null;
    _vao: WebGLVertexArrayObject = null;
    vertexcount: number = 0;
    indexcount: number = 0;
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
            for (var j = 0; j < vecf.vbos.length; j++) {
                this._vbos.push(webgl.createBuffer());
            }
        
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
    UpdateVertexBuffer(webgl: WebGL2RenderingContext, vboindex:number,vertexdata: Uint8Array, dynamic: boolean, bytelength: number): void {


        webgl.bindBuffer(webgl.ARRAY_BUFFER, this._vbos[vboindex]);
        webgl.bufferData(webgl.ARRAY_BUFFER, vertexdata, dynamic ? webgl.DYNAMIC_DRAW : webgl.STATIC_DRAW, 0, bytelength);
        this.vertexcount = bytelength / this.vertexFormat.vbos[vboindex].stride;
    }
    UpdateIndexBuffer(webgl: WebGL2RenderingContext, element: Uint8Array, dynamic: boolean, bytelength: number) {
        if (this._ebo == null) {
            this._ebo = webgl.createBuffer();
        }
        webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, this._ebo);
        webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, element, dynamic ? webgl.DYNAMIC_DRAW : webgl.STATIC_DRAW, 0, bytelength);
        this.indexcount = bytelength / 2;
    }
    Apply(webgl: WebGL2RenderingContext) {
        webgl.bindVertexArray(this._vao);
        if (this._ebo != null) {
            webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, this._ebo);
        }
    }
}