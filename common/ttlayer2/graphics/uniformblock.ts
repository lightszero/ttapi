import { tt } from "../../ttapi/ttapi.js";


export class UniformBlock {
    private static _empty: UniformBlock;
    static GetEmpty(): UniformBlock {
        if (this._empty == null) {
            let gl = tt.graphic.GetWebGL();
            this._empty = new UniformBlock(gl);
        }
        return this._empty;
    }
    static GetMax(): number {
        let gl = tt.graphic.GetWebGL();
        let v = gl.getParameter(gl.MAX_UNIFORM_BLOCK_SIZE);
        if(v==null)
            return -1;
        return v as number;
    }

    constructor(gl: WebGL2RenderingContext) {
        this.buf = gl.createBuffer();

    }
    private buf: WebGLBuffer
    GetGLBuf(): WebGLBuffer {
        return this.buf;
    }
    UploadData(gl: WebGL2RenderingContext, buf: Uint8Array, dynamic: boolean): void {
        gl.bindBuffer(gl.UNIFORM_BUFFER, this.buf);
        gl.bufferData(gl.UNIFORM_BUFFER, buf, dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW);
    }
}