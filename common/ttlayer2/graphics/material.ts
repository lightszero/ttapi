
import { ShaderProgram, uniformInfo, UniformType } from "../shader/shaders.js";
import { getWhiteTexture, IRenderTarget, ITexture } from "./texture.js";

export class UniformValue_Tex {
    loc: WebGLUniformLocation;
    value: ITexture
}
export class UniformValue_Mat4 {
    loc: WebGLUniformLocation;
    value: Float32Array
}
export class Material {
    constructor(shader: ShaderProgram) {

        let defmatrix: Float32Array = new Float32Array(16);
        {
            defmatrix[0] = 1; defmatrix[4] = 0; defmatrix[8] = 0; defmatrix[12] = 0;
            defmatrix[1] = 0; defmatrix[5] = 1; defmatrix[9] = 0; defmatrix[13] = 0;
            defmatrix[2] = 0; defmatrix[6] = 0; defmatrix[10] = 1; defmatrix[14] = 0;
            defmatrix[3] = 0; defmatrix[7] = 0; defmatrix[11] = 0; defmatrix[15] = 1;
        }
        this.shader = shader;
        for (var key in shader.uniformInfos) {
            let info = shader.uniformInfos[key];
            switch (info.type) {
                case UniformType.sampler2D:
                    this.uniformTexs[key] = {
                        loc: info.loc,
                        value: getWhiteTexture()
                    };
                    break;
                case UniformType.mat4:
                    this.uniformMats[key] = {
                        loc: info.loc,
                        value: defmatrix
                    }
                    break;
                default:
                    break;
            }

        }

    }
    private shader: ShaderProgram;
    uniformFloats: { [id: string]: number } = {};
    uniformMats: { [id: string]: UniformValue_Mat4 } = {};
    uniformTexs: { [id: string]: UniformValue_Tex } = {};
    GetShader(): ShaderProgram {
        return this.shader;
    }
    UpdateMatProj(_target: IRenderTarget) {
        let matrix: Float32Array = new Float32Array(16);
        let offx: number = 0;
        let offy: number = 0;

        let sx = 1.0 * 2 / _target.getWidth()
        let sy = 1 * 2 / _target.getHeight()
        if (_target.IsMainOutput())//isMainoutput
            sy *= -1;

        matrix[0] = sx; matrix[4] = 0; matrix[8] = 0; matrix[12] = offx;
        matrix[1] = 0; matrix[5] = sy; matrix[9] = 0; matrix[13] = offy;
        matrix[2] = 0; matrix[6] = 0; matrix[10] = 1; matrix[14] = 0;
        matrix[3] = 0; matrix[7] = 0; matrix[11] = 0; matrix[15] = 1;
        this.uniformMats["matProj"].value = matrix;
    }
    UpdateMatModel(matrix: Float32Array = null) {
        if (matrix == null) {
            matrix = new Float32Array(16);

            matrix[0] = 1; matrix[4] = 0; matrix[8] = 0; matrix[12] = 0;
            matrix[1] = 0; matrix[5] = 1; matrix[9] = 0; matrix[13] = 0;
            matrix[2] = 0; matrix[6] = 0; matrix[10] = 1; matrix[14] = 0;
            matrix[3] = 0; matrix[7] = 0; matrix[11] = 0; matrix[15] = 1;
        }
        this.uniformMats["matModel"].value = matrix;
    }
    UpdateMatView(matrix: Float32Array = null) {

        if (matrix == null) {
            matrix = new Float32Array(16);
            let sx = 1.0;// this.Scale;
            let sy = 1.0;// this.Scale;
            let offx = 0;//-this.LookAt.X;
            let offy = 0;//-this.LookAt.Y;
            matrix[0] = sx; matrix[4] = 0; matrix[8] = 0; matrix[12] = offx * sx;
            matrix[1] = 0; matrix[5] = sy; matrix[9] = 0; matrix[13] = offy * sy;
            matrix[2] = 0; matrix[6] = 0; matrix[10] = 1; matrix[14] = 0;
            matrix[3] = 0; matrix[7] = 0; matrix[11] = 0; matrix[15] = 1;
        }
        this.uniformMats["matView"].value = matrix;


    }
    Apply(webgl: WebGL2RenderingContext) {

        webgl.disable(webgl.CULL_FACE);
        webgl.depthMask(false);//这是zwrite
        webgl.disable(webgl.DEPTH_TEST);//这是ztest

        webgl.enable(webgl.BLEND);
        webgl.blendEquation(webgl.FUNC_ADD);
        webgl.blendFuncSeparate(webgl.SRC_ALPHA, webgl.ONE_MINUS_SRC_ALPHA,
            webgl.SRC_ALPHA, webgl.ONE);


        webgl.useProgram(this.shader.program);
        for (var key in this.uniformMats) {
            let uni = this.uniformMats[key];
            webgl.uniformMatrix4fv(uni.loc, false, uni.value);
        }
        let texcount = 0;
        for (var key in this.uniformTexs) {
            let uni = this.uniformTexs[key];

            webgl.activeTexture(webgl.TEXTURE0 + texcount);



            webgl.bindTexture(webgl.TEXTURE_2D, uni.value.getGLTex());
            webgl.uniform1i(uni.loc, texcount);
            texcount++;
        }

    }
}