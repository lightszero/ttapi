import { Vector2 } from "./vector.js";

export class Matrix3x2 {
    constructor() {

        this.values = new Float32Array(6);
        let m = this.values;
        m[0] = 1; //0,0
        m[1] = 0;

        m[2] = 0;
        m[3] = 1;//1,1

        m[4] = 0;
        m[5] = 0;
        this.withrotate = false;
    }
    values: Float32Array = new Float32Array(6);
    withrotate: boolean = false;
}
export class Matrix3x2Math {

    static ToMatrix4x4(mat: Matrix3x2, mat4x4: Float32Array) {

        let m = mat.values;
        mat4x4[0] = m[0];//scale x
        mat4x4[1] = m[1];
        mat4x4[2] = 0;
        mat4x4[3] = 0;

        mat4x4[4] = m[2];
        mat4x4[5] = m[3];//scale y
        mat4x4[6] = 0;
        mat4x4[7] = 0;

        mat4x4[8] = 0;
        mat4x4[9] = 0;
        mat4x4[10] = 1; //sacle z
        mat4x4[11] = 0;

        mat4x4[12] = m[4];
        mat4x4[13] = m[5];
        mat4x4[14] = 0;
        mat4x4[15] = 1;
    }
    static MulVec2(mat: Matrix3x2, vec2: Vector2): Vector2 {
        let m11 = mat.values[0];
        let m12 = mat.values[1];

        let m21 = mat.values[2];
        let m22 = mat.values[3];

        let m31 = mat.values[4];
        let m32 = mat.values[5];

        let x = vec2.X;
        let y = vec2.Y;
        return new Vector2(x * m11 + y * m21 + m31, x * m12 + y * m22 + m32);
    }
    static Mul(out: Matrix3x2, lhs: Matrix3x2, rhs: Matrix3x2): void {
        var a00 = lhs.values[0], a01 = lhs.values[1]//, a02 = lhs.rawData[2], a03 = lhs.rawData[3];
        var a10 = lhs.values[2], a11 = lhs.values[3]//, a12 = lhs.rawData[6], a13 = lhs.rawData[7];
        //var a20 = lhs.rawData[8], a21 = lhs.rawData[9], a22 = lhs.rawData[10], a23 = lhs.rawData[11];
        //var a30 = lhs.values[12], a31 = lhs.values[13]//, a32 = lhs.rawData[14], a33 = lhs.rawData[15];
        var a30 = lhs.values[4], a31 = lhs.values[5];

        var b0 = rhs.values[0],
            b1 = rhs.values[1]//,
        //b2 = rhs.rawData[2],
        //b3 = rhs.rawData[3];

        out.values[0] = b0 * a00 + b1 * a10;// + b2 * a20 + b3 * a30;
        out.values[1] = b0 * a01 + b1 * a11;// + b2 * a21 + b3 * a31;
        //out.rawData[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        //out.rawData[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = rhs.values[2];
        b1 = rhs.values[3];
        //b2 = rhs.rawData[6];
        //b3 = rhs.rawData[7];

        out.values[2] = b0 * a00 + b1 * a10;// + b2 * a20 + b3 * a30;
        out.values[3] = b0 * a01 + b1 * a11;// + b2 * a21 + b3 * a31;


        b0 = rhs.values[4];
        b1 = rhs.values[5];
        // b2 = rhs.rawData[14];
        // b3 = rhs.rawData[15];

        out.values[4] = b0 * a00 + b1 * a10 + a30;// + b2 * a20 + b3 * a30;
        out.values[5] = b0 * a01 + b1 * a11 + a31;// + b2 * a21 + b3 * a31;
        out.withrotate = lhs.withrotate || rhs.withrotate;
    }
    static Clone(out: Matrix3x2, src: Matrix3x2) {
        for (var i = 0; i < 6; i++)
            out.values[i] = src.values[i];
    }
    static MakeScale(mat: Matrix3x2, scale: Vector2): void {
        let m = mat.values;
        m[0] = scale.X; //0,0
        m[1] = 0;


        m[2] = 0;
        m[3] = scale.Y;//1,1




        m[4] = 0;
        m[5] = 0;
        mat.withrotate = false;
    }
    static MakeTran(mat: Matrix3x2, tran: Vector2): void {
        let m = mat.values;
        m[0] = 1; //0,0
        m[1] = 0;


        m[2] = 0;
        m[3] = 1;//1,1




        m[4] = tran.X;
        m[5] = tran.Y;
        mat.withrotate = false;
    }
    static MakeScaleAndTran(mat: Matrix3x2, scale: Vector2, tran: Vector2): void {
        let m = mat.values;
        m[0] = Math.cos(scale.X); //0,0
        m[1] = Math.sin(0);


        m[2] = -Math.sin(0);
        m[3] = Math.cos(scale.Y);//1,1




        m[4] = tran.X;
        m[5] = tran.Y;
        mat.withrotate = false;
    }
    static MakeRotate(mat: Matrix3x2, rotate: number): void {
        let m = mat.values;
        m[0] = Math.cos(rotate); //0,0
        m[1] = Math.sin(rotate);


        m[2] = -Math.sin(rotate);
        m[3] = Math.cos(rotate);//1,1




        m[4] = 0;
        m[5] = 0;
        if (rotate != 0)
            mat.withrotate = true;

    }
    static MakeTRS(mat: Matrix3x2, tran: Vector2, rotate: number, scale: Vector2): void {

        let ts = new Matrix3x2();
        let tr = new Matrix3x2();
        this.MakeScale(ts, scale);
        this.MakeRotate(tr, rotate);
        this.Mul(mat, ts, tr);
        mat.values[4] = tran.X;
        mat.values[5] = tran.Y;
        if (rotate != 0)
            mat.withrotate = true;
    }
}