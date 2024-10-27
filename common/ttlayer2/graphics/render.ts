import { Material } from "./material.js";
import { Mesh } from "./mesh.js";

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
}