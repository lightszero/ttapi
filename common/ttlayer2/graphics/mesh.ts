
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
export class VertexFormat {
    constructor(id: string) {
        this.id = id;
        this.atrribs = [];
    }
    id: string;
    atrribs: VertexAttribItem[]
    hash: string;
    atrribsCount: number;
    stride: number;
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
export class VertexFormatMgr {
    private static vertexFormats: { [hash: string]: VertexFormat } = {}
    private static vertexFormatsID2Hash: { [id: string]: string } = {}
    private static vertexFormat_Vertex_Color: VertexFormat = null;
    private static vertexFormat_Vertex_UV_Color: VertexFormat = null;
    private static vertexFormat_Vertex_UV_Color_Color2: VertexFormat = null;
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
            vecf.atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 3, false));
            vecf.atrribs.push(new VertexAttribItem(VertexAttribType.UNSIGNED_BYTE, 4, true));
            this.vertexFormat_Vertex_Color = this.RegFormat(vecf);
        }
        return this.vertexFormat_Vertex_Color;
    }
    static GetFormat_Vertex_UV_Color(): VertexFormat {
        if (this.vertexFormat_Vertex_UV_Color == null) {
            let vecf = new VertexFormat("Vertex_UV_Color");
            vecf.atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 3, false));
            vecf.atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 2, false));
            vecf.atrribs.push(new VertexAttribItem(VertexAttribType.UNSIGNED_BYTE, 4, true));
            this.vertexFormat_Vertex_UV_Color = this.RegFormat(vecf);
        }
        return this.vertexFormat_Vertex_UV_Color;
    }
    static GetFormat_Vertex_UV_Color_Color2(): VertexFormat {
        if (this.vertexFormat_Vertex_UV_Color_Color2 == null) {
            let vecf = new VertexFormat("Vertex_UV_Color_Color2");
            vecf.atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 3, false));
            vecf.atrribs.push(new VertexAttribItem(VertexAttribType.FLOAT, 2, false));
            vecf.atrribs.push(new VertexAttribItem(VertexAttribType.UNSIGNED_BYTE, 4, true));
            vecf.atrribs.push(new VertexAttribItem(VertexAttribType.UNSIGNED_BYTE, 4, false));
            this.vertexFormat_Vertex_UV_Color_Color2 = this.RegFormat(vecf);
        }
        return this.vertexFormat_Vertex_UV_Color_Color2;
    }
}

export class Mesh {
    _vbo: WebGLBuffer = null;
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
            if (this._vbo == null)
                this._vbo = webgl.createBuffer();
        }
        this.vertexFormat = vecf;

        {//初始化 vao
            webgl.bindVertexArray(this._vao);
            webgl.bindBuffer(webgl.ARRAY_BUFFER, this._vbo);

            for (var i = 0; i < 10; i++) {
                if (i < vecf.atrribsCount) {
                    var vi = vecf.atrribs[i];
                    webgl.enableVertexAttribArray(i);
                    webgl.vertexAttribPointer(i, vi.size, vi.type, vi.normalize, vecf.stride, vi.offset);
                }
                else {
                    webgl.disableVertexAttribArray(i);
                }
            }
            webgl.bindVertexArray(null);
        }
    }
    UpdateVertexBuffer(webgl: WebGL2RenderingContext, vertexdata: ArrayBufferView, dynamic: boolean, bytelength: number): void {
        if (this._vbo == null) {
            this._vbo = webgl.createBuffer();
        }
        webgl.bindBuffer(webgl.ARRAY_BUFFER, this._vbo);
        webgl.bufferData(webgl.ARRAY_BUFFER, vertexdata, dynamic ? webgl.DYNAMIC_DRAW : webgl.STATIC_DRAW, 0, bytelength);
        this.vertexcount = bytelength / this.vertexFormat.stride;
    }
    UpdateIndexBuffer(webgl: WebGL2RenderingContext, element: ArrayBufferView, dynamic: boolean, bytelength: number) {
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