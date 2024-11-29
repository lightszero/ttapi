import { tt } from "../../ttapi/ttapi";


export class UniformBlock {
    private static _empty: UniformBlock;
    static GetEmpty(): UniformBlock {
        if (this._empty == null) {
            let gl =tt.graphic.GetWebGL();
            this._empty = new UniformBlock(gl);
        }
        return this._empty;
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