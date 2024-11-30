import { Border, Color, Rectangle, UVRect, Vector2 } from "../../math/vector.js";
import { ITexture, Render_Batcher, DrawPoint, SpriteFormat } from "../../ttlayer2.js";


export class Sprite {
    constructor(tex: ITexture, texpal: ITexture) {
        this.texrgba = tex;
        this.texgray = texpal;
        this.effect = SpriteFormat.RGBA;
        this.uv = new UVRect(0, 0, 1, 1);
        this.border = new Border(0, 0, 0, 0);
        this.pixelwidth = tex.getWidth();
        this.pixelheight = tex.getHeight();
     
        this.uvlayer = 0;
    }
    texrgba: ITexture;
    texgray: ITexture;
    effect: SpriteFormat;

    uv: UVRect;//xywz
    uvlayer: number = 0;
    //border
    border: Border;
    //total width
    get totalWidth(): number {
        return this.pixelwidth + this.border.XLeft + this.border.XRight;
    }
    //total height
    get totalHeight(): number {
        return this.pixelheight + this.border.YTop + this.border.YBottom;
    }
    pixelwidth: number;
    pixelheight: number;
    static _rectbuf: DrawPoint[] = [];
    static _colorbuf: Color;
    RenderRectWithLimit(batcher: Render_Batcher, rect: Rectangle, limitRect: Rectangle, color: Color | null = null, palindex: number = -1): void {
        let rectbuf = Sprite._rectbuf
        while (rectbuf.length < 4) {
            rectbuf.push(new DrawPoint());
        }
        if (Sprite._colorbuf == null) {
            Sprite._colorbuf = Color.White;
        }
        let _color = color == null ? Sprite._colorbuf : color;

   
        let sx = rect.Width / this.totalWidth;
        let sy = rect.Height / this.totalHeight;

        let x1 = rect.X + sx * this.border.XLeft;
        let x2 = rect.X + rect.Width - sx * this.border.XRight;
        let y1 = rect.Y + sy * this.border.YTop;
        let y2 = rect.Y + rect.Height - sy * this.border.YBottom
        let u1 = this.uv.U1;
        let v1 = this.uv.V1
        let u2 = this.uv.U2
        let v2 = this.uv.V2
        let wx = x2 - x1;
        let wy = y2 - y1;
        //检查是否整体抹去
        if (x1 >= limitRect.X + limitRect.Width || x2 < limitRect.X
            ||
            y1 >= limitRect.Y + limitRect.Height || y2 < limitRect.Y) {
            x1 = x2 = y1 = y2 = 0;
        }
        else if (wx != 0 && wy != 0) {
            let nx1 = x1;
            let nx2 = x2;
            let ny1 = y1;
            let ny2 = y2;
            let change = false;
            if (x1 < limitRect.X) {
                nx1 = limitRect.X;
                change = true;
            }
            if (x2 > limitRect.X + limitRect.Width) {
                nx2 = limitRect.X + limitRect.Width;
                change = true;
            }
            if (y1 < limitRect.Y) {
                ny1 = limitRect.Y;
                change = true;
            }
            if (y2 > limitRect.Y + limitRect.Height) {
                ny2 = limitRect.Y + limitRect.Height;
                change = true;
            }
            if (change) {
                let uw = u2 - u1;
                let vw = v2 - v1;
                let sx1 = (nx1 - x1) / wx;
                let sx2 = (nx2 - x2) / wx;
                let sy1 = (ny1 - y1) / wy;
                let sy2 = (ny2 - y2) / wy;

                u1 = u1 + uw * sx1;
                v1 = v1 + vw * sy1;
                u2 = u2 + uw * sx2;
                v2 = v2 + vw * sy2;
                x1 = nx1;
                y1 = ny1;
                x2 = nx2;
                y2 = ny2;


            }
        }

        rectbuf[0].x = x1;
        rectbuf[0].y = y1;
        rectbuf[0].u = u1;
        rectbuf[0].v = v1;
        rectbuf[0].r = _color.R;
        rectbuf[0].g = _color.G;
        rectbuf[0].b = _color.B;
        rectbuf[0].a = _color.A;
        rectbuf[0].palx = this.uvlayer;
        rectbuf[0].paly = 0;
        rectbuf[0].eff = this.effect

        rectbuf[1].x = x2;
        rectbuf[1].y = y1;
        rectbuf[1].u = u2;
        rectbuf[1].v = v1;
        rectbuf[1].r = _color.R
        rectbuf[1].g = _color.G
        rectbuf[1].b = _color.B
        rectbuf[1].a = _color.A
        rectbuf[1].palx = this.uvlayer;
        rectbuf[1].paly = 0;
        rectbuf[1].eff = this.effect;

        rectbuf[2].x = x1;
        rectbuf[2].y = y2;
        rectbuf[2].u = u1;
        rectbuf[2].v = v2;
        rectbuf[2].r = _color.R
        rectbuf[2].g = _color.G
        rectbuf[2].b = _color.B
        rectbuf[2].a = _color.A
        rectbuf[2].palx = this.uvlayer;
        rectbuf[2].paly = 0;
        rectbuf[2].eff = this.effect;

        rectbuf[3].x = x2;
        rectbuf[3].y = y2;
        rectbuf[3].u = u2;
        rectbuf[3].v = v2;
        rectbuf[3].r = _color.R
        rectbuf[3].g = _color.G
        rectbuf[3].b = _color.B
        rectbuf[3].a = _color.A
        rectbuf[3].palx = this.uvlayer;
        rectbuf[3].paly = 0;
        rectbuf[3].eff = this.effect;
        batcher.DrawQuads(this.texrgba, this.texgray, rectbuf, 1);
    }
    RenderRect(batcher: Render_Batcher, rect: Rectangle, color: Color | null = null, palindex: number = -1) {
        let rectbuf = Sprite._rectbuf
        while (rectbuf.length < 4) {
            rectbuf.push(new DrawPoint());
        }
        if (Sprite._colorbuf == null) {
            Sprite._colorbuf = Color.White;
        }
        let _color = color == null ? Sprite._colorbuf : color;


        let sx = rect.Width / this.totalWidth;
        let sy = rect.Height / this.totalHeight;
        rectbuf[0].x = rect.X + sx * this.border.XLeft;
        rectbuf[0].y = rect.Y + sy * this.border.YTop;
        rectbuf[0].u = this.uv.U1;
        rectbuf[0].v = this.uv.V1;
        rectbuf[0].r = _color.R;
        rectbuf[0].g = _color.G;
        rectbuf[0].b = _color.B;
        rectbuf[0].a = _color.A;
        rectbuf[0].palx = this.uvlayer;
        rectbuf[0].paly = 0;
        rectbuf[0].eff = this.effect

        rectbuf[1].x = rect.X + rect.Width - sx * this.border.XRight;
        rectbuf[1].y = rect.Y + sy * this.border.YTop;
        rectbuf[1].u = this.uv.U2;
        rectbuf[1].v = this.uv.V1;
        rectbuf[1].r = _color.R
        rectbuf[1].g = _color.G
        rectbuf[1].b = _color.B
        rectbuf[1].a = _color.A
        rectbuf[1].palx = this.uvlayer;
        rectbuf[1].paly = 0;
        rectbuf[1].eff = this.effect;

        rectbuf[2].x = rect.X + sx * this.border.XLeft;
        rectbuf[2].y = rect.Y + rect.Height - sy * this.border.YBottom;
        rectbuf[2].u = this.uv.U1;
        rectbuf[2].v = this.uv.V2;
        rectbuf[2].r = _color.R
        rectbuf[2].g = _color.G
        rectbuf[2].b = _color.B
        rectbuf[2].a = _color.A
        rectbuf[2].palx = this.uvlayer;
        rectbuf[2].paly = 0;
        rectbuf[2].eff = this.effect;

        rectbuf[3].x = rect.X + rect.Width - sx * this.border.XRight;
        rectbuf[3].y = rect.Y + rect.Height - sy * this.border.YBottom;
        rectbuf[3].u = this.uv.U2;
        rectbuf[3].v = this.uv.V2;
        rectbuf[3].r = _color.R
        rectbuf[3].g = _color.G
        rectbuf[3].b = _color.B
        rectbuf[3].a = _color.A
        rectbuf[3].palx = this.uvlayer;
        rectbuf[3].paly = 0;
        rectbuf[3].eff = this.effect;
        batcher.DrawQuads(this.texrgba, this.texgray, rectbuf, 1);
    }
    RenderRect2(batcher: Render_Batcher, x1: number, y1: number, x2: number, y2: number, color: Color | null = null, palindex: number = -1) {
        let rectbuf = Sprite._rectbuf
        while (rectbuf.length < 4) {
            rectbuf.push(new DrawPoint());
        }
        if (Sprite._colorbuf == null) {
            Sprite._colorbuf = Color.White;
        }
        let _color = color == null ? Sprite._colorbuf : color;


        let sx = (x2 - x1) / this.totalWidth;
        let sy = (y2 - y1) / this.totalHeight;
        rectbuf[0].x = x1 + sx * this.border.XLeft;
        rectbuf[0].y = y1 + sy * this.border.YTop;
        rectbuf[0].u = this.uv.U1;
        rectbuf[0].v = this.uv.V1;
        rectbuf[0].r = _color.R;
        rectbuf[0].g = _color.G;
        rectbuf[0].b = _color.B;
        rectbuf[0].a = _color.A;
        rectbuf[0].palx = this.uvlayer;
        rectbuf[0].paly = 0;
        rectbuf[0].eff = this.effect

        rectbuf[1].x = x2 - sx * this.border.XRight;
        rectbuf[1].y = y1 + sy * this.border.YTop;
        rectbuf[1].u = this.uv.U2;
        rectbuf[1].v = this.uv.V1;
        rectbuf[1].r = _color.R
        rectbuf[1].g = _color.G
        rectbuf[1].b = _color.B
        rectbuf[1].a = _color.A
        rectbuf[1].palx = this.uvlayer;
        rectbuf[1].paly = 0;
        rectbuf[1].eff = this.effect;

        rectbuf[2].x = x1 + sx * this.border.XLeft;
        rectbuf[2].y = y2 - sy * this.border.YBottom;
        rectbuf[2].u = this.uv.U1;
        rectbuf[2].v = this.uv.V2;
        rectbuf[2].r = _color.R
        rectbuf[2].g = _color.G
        rectbuf[2].b = _color.B
        rectbuf[2].a = _color.A
        rectbuf[2].palx = this.uvlayer;
        rectbuf[2].paly = 0;
        rectbuf[2].eff = this.effect;

        rectbuf[3].x = x2 - sx * this.border.XRight;
        rectbuf[3].y = y2 - sy * this.border.YBottom;
        rectbuf[3].u = this.uv.U2;
        rectbuf[3].v = this.uv.V2;
        rectbuf[3].r = _color.R
        rectbuf[3].g = _color.G
        rectbuf[3].b = _color.B
        rectbuf[3].a = _color.A
        rectbuf[3].palx = this.uvlayer;
        rectbuf[3].paly = 0;
        rectbuf[3].eff = this.effect;
        batcher.DrawQuads(this.texrgba, this.texgray, rectbuf, 1);
    }
    Render(batcher: Render_Batcher, pos: Vector2, scale: Vector2, color: Color | null = null, palindex: number = -1): void {
        let rectbuf = Sprite._rectbuf
        while (rectbuf.length < 4) {
            rectbuf.push(new DrawPoint());
        }
        if (Sprite._colorbuf == null) {
            Sprite._colorbuf = Color.White;
        }
        let _color = color == null ? Sprite._colorbuf : color;

  

        //  let rect = new Rectangle(x, y, s.totalWidth * scale.X, s.totalHeight * scale.Y);
        //   rectbuf[0].x = rect.X + sx * this.border.XLeft;
        //   rectbuf[0].y = rect.Y + sy * this.border.YTop;
        // rectbuf[1].x = rect.X + rect.Width - sx * this.border.XRight;
        // rectbuf[1].y = rect.Y + sy * this.border.YTop;
        rectbuf[0].x = pos.X + scale.X * this.border.XLeft;
        rectbuf[0].y = pos.Y + scale.Y * this.border.YTop;
        rectbuf[0].u = this.uv.U1;
        rectbuf[0].v = this.uv.V1;
        rectbuf[0].r = _color.R;
        rectbuf[0].g = _color.G;
        rectbuf[0].b = _color.B;
        rectbuf[0].a = _color.A;
        rectbuf[0].palx = this.uvlayer;
        rectbuf[0].paly = 0;
        rectbuf[0].eff = this.effect

        //(this.totalWidth - this.border.XRight) * scale.X;
        rectbuf[1].x = pos.X + scale.X * (this.totalWidth - this.border.XRight);
        rectbuf[1].y = pos.Y + scale.Y * this.border.YTop;
        rectbuf[1].u = this.uv.U2;
        rectbuf[1].v = this.uv.V1;
        rectbuf[1].r = _color.R
        rectbuf[1].g = _color.G
        rectbuf[1].b = _color.B
        rectbuf[1].a = _color.A
        rectbuf[1].palx = this.uvlayer;
        rectbuf[1].paly = 0;
        rectbuf[1].eff = this.effect;

        rectbuf[2].x = pos.X + scale.X * this.border.XLeft;
        rectbuf[2].y = pos.Y + scale.Y * (this.totalHeight - this.border.YBottom);
        rectbuf[2].u = this.uv.U1;
        rectbuf[2].v = this.uv.V2;
        rectbuf[2].r = _color.R
        rectbuf[2].g = _color.G
        rectbuf[2].b = _color.B
        rectbuf[2].a = _color.A
        rectbuf[2].palx = this.uvlayer;
        rectbuf[2].paly = 0;
        rectbuf[2].eff = this.effect;

        rectbuf[3].x = pos.X + scale.X * (this.totalWidth - this.border.XRight);
        rectbuf[3].y = pos.Y + scale.Y * (this.totalHeight - this.border.YBottom);
        rectbuf[3].u = this.uv.U2;
        rectbuf[3].v = this.uv.V2;
        rectbuf[3].r = _color.R
        rectbuf[3].g = _color.G
        rectbuf[3].b = _color.B
        rectbuf[3].a = _color.A
        rectbuf[3].palx = this.uvlayer;
        rectbuf[3].paly = 0;
        rectbuf[3].eff = this.effect;
        batcher.DrawQuads(this.texrgba, this.texgray, rectbuf, 1);
    }
    RenderWithRotate(batcher: Render_Batcher, pos: Vector2, scale: Vector2, rotate: number, rotate_povit_x: number, rotate_povit_y: number, color: Color | null = null, palindex: number = -1): void {
        let rectbuf = Sprite._rectbuf
        while (rectbuf.length < 4) {
            rectbuf.push(new DrawPoint());
        }
        if (Sprite._colorbuf == null) {
            Sprite._colorbuf = Color.White;
        }
        let _color = color == null ? Sprite._colorbuf : color;


        let x1 = pos.X + scale.X * this.border.XLeft;
        let x2 = pos.X + scale.X * (this.totalWidth - this.border.XRight);
        let y1 = pos.Y + scale.Y * this.border.YTop;
        let y2 = pos.Y + scale.Y * (this.totalHeight - this.border.YBottom);

        //旋转逻辑
        let cx = pos.X + rotate_povit_x * scale.X;
        let cy = pos.Y + rotate_povit_y * scale.Y;//中心点
        let dx1 = x1 - cx;//偏移
        let dy1 = y1 - cy;
        let dx2 = x2 - cx;
        let dy2 = y2 - cy;
        //矩阵变换
        let sinr = Math.sin(rotate);
        let cosr = Math.cos(rotate);
        let p0x = cx + dx1 * cosr - dy1 * sinr;
        let p0y = cy + dx1 * sinr + dy1 * cosr;
        let p1x = cx + dx2 * cosr - dy1 * sinr;
        let p1y = cy + dx2 * sinr + dy1 * cosr;
        let p2x = cx + dx1 * cosr - dy2 * sinr;
        let p2y = cy + dx1 * sinr + dy2 * cosr;
        let p3x = cx + dx2 * cosr - dy2 * sinr;
        let p3y = cy + dx2 * sinr + dy2 * cosr;


        rectbuf[0].x = p0x;
        rectbuf[0].y = p0y;
        rectbuf[0].u = this.uv.U1;
        rectbuf[0].v = this.uv.V1;
        rectbuf[0].r = _color.R;
        rectbuf[0].g = _color.G;
        rectbuf[0].b = _color.B;
        rectbuf[0].a = _color.A;
        rectbuf[0].palx = this.uvlayer;
        rectbuf[0].paly = 0;
        rectbuf[0].eff = this.effect

        //(this.totalWidth - this.border.XRight) * scale.X;
        rectbuf[1].x = p1x;
        rectbuf[1].y = p1y;
        rectbuf[1].u = this.uv.U2;
        rectbuf[1].v = this.uv.V1;
        rectbuf[1].r = _color.R
        rectbuf[1].g = _color.G
        rectbuf[1].b = _color.B
        rectbuf[1].a = _color.A
        rectbuf[1].palx = this.uvlayer;
        rectbuf[1].paly = 0;
        rectbuf[1].eff = this.effect;

        rectbuf[2].x = p2x;
        rectbuf[2].y = p2y;
        rectbuf[2].u = this.uv.U1;
        rectbuf[2].v = this.uv.V2;
        rectbuf[2].r = _color.R
        rectbuf[2].g = _color.G
        rectbuf[2].b = _color.B
        rectbuf[2].a = _color.A
        rectbuf[2].palx = this.uvlayer;
        rectbuf[2].paly = 0;
        rectbuf[2].eff = this.effect;

        rectbuf[3].x = p3x;
        rectbuf[3].y = p3y;
        rectbuf[3].u = this.uv.U2;
        rectbuf[3].v = this.uv.V2;
        rectbuf[3].r = _color.R
        rectbuf[3].g = _color.G
        rectbuf[3].b = _color.B
        rectbuf[3].a = _color.A
        rectbuf[3].palx = this.uvlayer;
        rectbuf[3].paly = 0;
        rectbuf[3].eff = this.effect;
        batcher.DrawQuads(this.texrgba, this.texgray, rectbuf, 1);
    }
}