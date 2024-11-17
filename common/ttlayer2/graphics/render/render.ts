import { Material } from "../material.js";
import { Mesh } from "../mesh.js";


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
        this.query = gl.createQuery();
    }
    query: WebGLQuery;

    //fence: WebGLSync = null;
    Execute(gl: WebGL2RenderingContext, mesh: Mesh, mat: Material, outbufobj: WebGLBuffer, first: number, count: number) {
      

        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        gl.enable(gl.RASTERIZER_DISCARD);

        mesh.Apply(gl);
        mat.Apply(gl);



        gl.beginQuery(gl.TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN, this.query);
        {
            gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, this.obj);
            gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, outbufobj);


            gl.beginTransformFeedback(gl.POINTS);
            {

                gl.drawArrays(gl.POINTS, first, count);
                gl.flush();
                gl.finish();
            }

            gl.endTransformFeedback();
            gl.disable(gl.RASTERIZER_DISCARD);


            //gl.flush();
            //gl.finish();
        }
        
 
        gl.endQuery(gl.TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN)
        //搞清楚了 endquery 也需要endfetch

        gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null);
        gl.finish();
    }
    End(gl:WebGL2RenderingContext)
    {
        


        //gl.endQuery(gl.TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN);
        let p = gl.getQueryParameter(this.query, gl.QUERY_RESULT);
        console.log("====>query tran=" + p);
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