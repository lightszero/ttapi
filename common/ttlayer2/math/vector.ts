

//#region   ------Code From Color
export class Color {
    constructor(r: number, g: number, b: number, a: number = 1) {
        this.R = r;
        this.G = g;
        this.B = b;
        this.A = a;
    }
    R: number
    G: number
    B: number
    A: number
    static get White(): Color {
        return new Color(1, 1, 1, 1);
    }
    static get Black(): Color {
        return new Color(0, 0, 0, 1);
    }
    static get Tran(): Color {
        return new Color(0, 0, 0, 0);
    }
    static Mul(a: Color, b: Color): Color {
        return new Color(a.R * b.R, a.G * b.G, a.B * b.B, a.A * b.A);
    }
    Clone(): Color {
        return new Color(this.R, this.G, this.B, this.A);

    }
    static Lerp(c1: Color, c2: Color, value: number): Color {
        return new Color(
            c1.R * (1 - value) + c2.R * value,
            c1.G * (1 - value) + c2.G * value,
            c1.B * (1 - value) + c2.B * value,
            c1.A * (1 - value) + c2.A * value,
        );
    }
    static FromH360(h360: number): Color//输入一个0到360的值
    {
        let c = Color.White;
        //h360 = 60
        //sin插值
        let v = (h360 % 120 / 120);
        if (v < 0) v += 1;

        let f = Math.sin(v * Math.PI) * 0.5;
        if (v > 0.5)
            f = 1 - f;
        //直接插值
        //let f = h360 % 120 / 120;
        if (h360 < 120)  //b->r
        {

            if (f <= 0.5) {
                c.B = 1;
                c.R = (f) / (1 - f);
            }
            else {
                c.R = 1;
                c.B = 1 * (1 - f) / f;
            }
            c.G = 0;
        }
        else if (h360 < 240) //r->g
        {

            if (f <= 0.5) {
                c.R = 1;
                c.G = 1 * f / (1 - f);
            }
            else {
                c.G = 1
                c.R = 1 * (1 - f) / f;
            }
            c.B = 0;

        }
        else //g->b
        {

            c.R = 0;
            if (f <= 0.5) {
                c.G = 1;
                c.B = 1 * f / (1 - f);
            }
            else {
                c.B = 1
                c.G = 1 * (1 - f) / f;
            }
        }
        return c;
    }
}
//不一定用的到，保证RGBA取值的玩意儿罢了
export class Color32 {
    constructor(r: number, g: number, b: number, a: number = 255) {
        this.data = new Uint8Array(4);
        this.R = r;
        this.G = g;
        this.B = b;
        this.A = a;
    }
    data: Uint8Array
    get R(): number {
        return this.data[0];
    }
    set R(v: number) {
        this.data[0] = v;
    }
    get G(): number {
        return this.data[1];
    }
    set G(v: number) {
        this.data[1] = v;
    }
    get B(): number {
        return this.data[2];
    }
    set B(v: number) {
        this.data[2] = v;
    }
    get A(): number {
        return this.data[3];
    }
    set A(v: number) {
        this.data[3] = v;
    }
    public Clone(): Color32 {
        return new Color32(this.data[0], this.data[1], this.data[2], this.data[3]);
    }
    public static Equal(c1: Color32, c2: Color32): boolean {
        return c1.R == c2.R && c1.G == c2.G && c1.B == c2.B && c1.A == c2.A;
    }
    public ToColor(): Color {
        return new Color(this.R / 255, this.G / 255, this.B / 255, this.A / 255);
    }
}
//#endregion

//#region  -----Code From Vector
export class Vector2 {
    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }
    X: number;
    Y: number;
    Clone(): Vector2 {
        return new Vector2(this.X, this.Y);
    }
    static get One(): Vector2 {
        return new Vector2(1, 1);
    }
    static get Zero(): Vector2 {
        return new Vector2(0, 0);
    }
    static Length(v1: Vector2): number {
        return Math.sqrt((v1.X) * (v1.X) + (v1.Y) * (v1.Y));
    }
    static Dist(v1: Vector2, v2: Vector2): number {
        return Math.sqrt((v1.X - v2.X) * (v1.X - v2.X) + (v1.Y - v2.Y) * (v1.Y - v2.Y));
    }
    static Dir(from: Vector2, to: Vector2): Vector2 {
        let dist = Vector2.Dist(from, to);
        return new Vector2((to.X - from.X) / dist, (to.Y - from.Y) / dist);
    }
    static Add(v1: Vector2, v2: Vector2): Vector2 {
        return new Vector2(v1.X + v2.X, v1.Y + v2.Y);
    }

    static Normal(src: Vector2): Vector2 {
        let len = Vector2.Length(src);
        return new Vector2(src.X / len, src.Y / len);
    }
}
export class Vector3 {
    constructor(x: number, y: number, z: number) {
        this.X = x;
        this.Y = y;
        this.Z = z;
    }
    X: number;
    Y: number;
    Z: number;

    Clone(): Vector3 {
        return new Vector3(this.X, this.Y, this.Z);
    }
    static get One(): Vector3 {
        return new Vector3(1, 1, 1);
    }
    static get Zero(): Vector3 {
        return new Vector3(0, 0, 0);
    }
}
//#endregion 


//#region -----Code From Rectangle
export class Rectangle {
    constructor(x: number, y: number, w: number, h: number) {
        this.X = x;
        this.Y = y;
        this.Width = w;
        this.Height = h;
    }
    X: number;
    Y: number;
    Width: number;
    Height: number;

}
export class RectangleMath {
    static Clone(r: Rectangle): Rectangle {
        return new Rectangle(r.X, r.Y, r.Width, r.Height);
    }
    static Intersect(left: Rectangle, r: Rectangle): Rectangle {
        let x1 = left.X;
        let x2 = left.X + left.Width;
        let y1 = left.Y;
        let y2 = left.Y + left.Height;
        let rx1 = r.X;
        let ry1 = r.Y;
        let rx2 = rx1 + r.Width;
        let ry2 = ry1 + r.Height;
        if (x1 >= rx2 || rx1 >= x2 || y1 >= ry2 || ry1 >= y2)
            return new Rectangle(0, 0, 0, 0);
        let nx1 = Math.max(x1, rx1);
        let ny1 = Math.max(y1, ry1);
        let nx2 = Math.min(x2, rx2);
        let ny2 = Math.min(y2, ry2);
        return new Rectangle(nx1, ny1, nx2 - nx1, ny2 - ny1);
    }
}
export class Border {
    constructor(xLeft: number, yTop: number, xRight: number, yBottom: number) {
        this.XLeft = xLeft;
        this.YTop = yTop;
        this.XRight = xRight;
        this.YBottom = yBottom;
    }
    XLeft: number;
    XRight: number;
    YTop: number;
    YBottom: number;
}
export class UVRect {
    constructor(u1: number, v1: number, u2: number, v2: number) {
        this.U1 = u1;
        this.V1 = v1;
        this.U2 = u2;
        this.V2 = v2;
    }
    U1: number;
    V1: number;
    U2: number;
    V2: number;
}