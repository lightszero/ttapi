import { Material } from "../graphics/material.js";
import { Mesh } from "../graphics/mesh.js";


export class TransformFeedBack {
    obj: WebGLTransformFeedback;
    //buf: WebGLBuffer;
    //bytelength: number;
    constructor(gl: WebGL2RenderingContext) {
        this.obj = gl.createTransformFeedback();
        gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, this.obj);

        // this.buf = gl.createBuffer();
        // gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, this.buf);
        // this.bytelength = bytelength;
        // gl.bufferData(gl.TRANSFORM_FEEDBACK_BUFFER, bytelength, gl.STREAM_DRAW);
    }
    //query: WebGLQuery;
    fence: WebGLSync = null;
    Execute(gl: WebGL2RenderingContext, mesh: Mesh, mat: Material, outbufobj: WebGLBuffer, first: number, count: number) {
        gl.finish();
        
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        gl.enable(gl.RASTERIZER_DISCARD);

        mesh.Apply(gl);
        mat.Apply(gl);
        // if (this.query == null) {
        //     this.query = gl.createQuery();
        //     gl.beginQuery(gl.TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN, this.query);
        // }
        if (this.fence == null) 
        {
            this.fence = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        }
        gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, this.obj);
        gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, outbufobj);
        gl.beginTransformFeedback(gl.POINTS);
        {

            gl.drawArrays(gl.POINTS, first, count);
        }

        //let p = gl.getQueryParameter(this.query, gl.QUERY_RESULT);
        //console.log("p=" + p);
        //gl.flush();
        gl.finish();

        gl.endTransformFeedback();
        gl.disable(gl.RASTERIZER_DISCARD);

      
        
        
       
       
      
        //console.log("t=" + t);
        //var fence = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        //gl.flush();

        // let p1 = gl.getParameter(gl.MAX_CLIENT_WAIT_TIMEOUT_WEBGL);
        // let t = gl.clientWaitSync(fence, gl.SYNC_FLUSH_COMMANDS_BIT, 1000);
        // //37149 WAIT_FAILED
        // gl.endQuery(gl.TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN)


        gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null);
        gl.finish();
    }
    ReadBuf(gl: WebGL2RenderingContext, bufobj: WebGLBuffer, readbuf: Uint8Array, bytelength: number) {
        gl.bindBuffer(gl.TRANSFORM_FEEDBACK_BUFFER, bufobj);
        gl.getBufferSubData(gl.TRANSFORM_FEEDBACK_BUFFER, 0, readbuf, 0, bytelength);
    }

}
export class Render {
    static DrawMesh(gl: WebGL2RenderingContext, mesh: Mesh, mat: Material): void {
        mesh.Apply(gl);
        mat.Apply(gl);
        if (mesh._ebo == null) {
            gl.drawArrays(gl.TRIANGLES, 0, mesh.vertexcount[0]);
        }
        else {
            gl.drawElements(gl.TRIANGLES, mesh.indexcount, gl.UNSIGNED_SHORT, gl.ZERO);
        }
    }
    static DrawMeshInstanced(gl: WebGL2RenderingContext, mesh: Mesh, mat: Material): void {
        mesh.Apply(gl);
        mat.Apply(gl);

        //把ubo bind进去
        //通过改动ubo 绘制
        //ubo 用处不大，先搞定第二个vbo
        //gl.bindBufferBase(gl.UNIFORM_BUFFER,0,buffer);

        if (mesh._ebo == null) {
            gl.drawArraysInstanced(gl.TRIANGLES, 0, mesh.vertexcount[0], mesh.instancecount);
        }
        else {
            gl.drawElementsInstanced(gl.TRIANGLES, mesh.indexcount, gl.UNSIGNED_SHORT, gl.ZERO, mesh.instancecount);
        }
    }


}