import { Material } from "./material.js";
import { Mesh } from "./mesh.js";

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