import { Material } from "./material.js";
import { Mesh } from "./mesh.js";

export class UniformBuffer
{
    buf:WebGLBuffer;
    stride:number;
}
export class UniformBufferArray
{
    bufs:UniformBuffer[];
    count:number;
}
export class Render {
    static DrawMesh(gl: WebGL2RenderingContext, mesh: Mesh, mat: Material): void {
        mesh.Apply(gl);
        mat.Apply(gl);
        if (mesh._ebo == null) {
            gl.drawArrays(gl.TRIANGLES, 0, mesh.vertexcount);
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
            gl.drawArraysInstanced(gl.TRIANGLES, 0, mesh.vertexcount, mesh.instancecount);
        }
        else {
            gl.drawElementsInstanced(gl.TRIANGLES, mesh.indexcount, gl.UNSIGNED_SHORT, gl.ZERO, mesh.instancecount);
        }
    }
}