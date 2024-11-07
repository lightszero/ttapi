import { tt } from "../../../ttapi/ttapi.js";
import { Matrix3x2Math } from "../../math/Matrix3x2.js";
import { Color, Rectangle, UVRect, Vector2 } from "../../math/vector.js";
import { GameApp, getWhiteTexture, ITexture, Render_Batcher , DrawPoint} from "../../ttlayer2.js";
import { IView, IViewComponent, IViewItem, IViewRenderItem } from "../viewlist.js";
import { SceneView } from "../../scene/sceneview.js";

export class Comp_Sprite implements IViewComponent, IViewRenderItem {
    GetType(): string { return "sprite" };
    sceneitem: IViewItem = null;
    tex: ITexture = null;
    uv: UVRect = new UVRect(0, 0, 1, 1);
    size: Vector2 = new Vector2(16, 16);
    color: Color = Color.White;
    quad: DrawPoint[] = null;
    static _batcher: Render_Batcher = null;
    static _begin: boolean = false;
    OnAdd(item: IViewItem) {
        this.sceneitem = item;
        if (Comp_Sprite._batcher == null) {
            let gl = tt.graphic.GetWebGL();
            Comp_Sprite._batcher = new Render_Batcher(gl);
        }
        this.quad = []
        this.quad.push(new DrawPoint());
        this.quad.push(new DrawPoint());
        this.quad.push(new DrawPoint());
        this.quad.push(new DrawPoint());
        this.quad[0].u = this.uv.U1;
        this.quad[0].v = this.uv.V1;
        this.quad[1].u = this.uv.U2;
        this.quad[1].v = this.uv.V1;
        this.quad[2].u = this.uv.U1;
        this.quad[2].v = this.uv.V2;
        this.quad[3].u = this.uv.U2;
        this.quad[3].v = this.uv.V2;
    }
    OnUpdate(delta: number): void {
        let mat = this.sceneitem.GetWorldMatrix();
        this.quad[0].r = this.quad[1].r = this.quad[2].r = this.quad[3].r = this.color.R;
        this.quad[0].g = this.quad[1].g = this.quad[2].g = this.quad[3].g = this.color.G;
        this.quad[0].b = this.quad[1].b = this.quad[2].b = this.quad[3].b = this.color.B;
        this.quad[0].a = this.quad[1].a = this.quad[2].a = this.quad[3].a = this.color.A;
        if (mat.withrotate) {
            let p0 = new Vector2(0, 0);
            let p1 = new Vector2(this.size.X, 0);
            let p2 = new Vector2(0, this.size.Y);
            let p3 = new Vector2(this.size.X, this.size.Y);
            let np0 = Matrix3x2Math.MulVec2(mat, p0);
            let np1 = Matrix3x2Math.MulVec2(mat, p1);
            let np2 = Matrix3x2Math.MulVec2(mat, p2);
            let np3 = Matrix3x2Math.MulVec2(mat, p3);
            this.quad[0].x = np0.X;
            this.quad[0].y = np0.Y;
            this.quad[1].x = np1.X;
            this.quad[1].y = np1.Y;
            this.quad[2].x = np2.X;
            this.quad[2].y = np2.Y;
            this.quad[3].x = np3.X;
            this.quad[3].y = np3.Y;
        }
        else {
            let x1 = 0 * mat.values[0] + mat.values[4];
            let y1 = 0 * mat.values[3] + mat.values[5];
            let w = this.size.X * mat.values[0];
            let h = this.size.Y * mat.values[3];
            this.quad[0].x = x1;
            this.quad[0].y = y1;
            this.quad[1].x = x1 + w;
            this.quad[1].y = y1;
            this.quad[2].x = x1;
            this.quad[2].y = y1 + h;
            this.quad[3].x = x1 + w;
            this.quad[3].y = y1 + h;
        }
    }
    IsRender(): boolean {
        return true;
    }


    GetSortValue(): number {
        let y = this.sceneitem.GetWorldMatrix().values[5];
        return y;
    }
    OnRender(view: IView, tag: number): void {
        if (tag == 0) {
            if (!Comp_Sprite._begin) {
                let target = view.GetTarget();
                if (target == null)
                    target = GameApp.GetMainScreen();
                Comp_Sprite._batcher.BeginDraw(target);
                Comp_Sprite._begin = true;
            }
            let tex = this.tex;
            if (tex == null) {
                tex = getWhiteTexture();
            }
            Comp_Sprite._batcher.DrawQuads(tex, null, this.quad, 1);
        }
    }

    //返回一个用来识别合批的对象
    GetRenderObject(): any {
        return Comp_Sprite._batcher;
    }
    EndRender(): void {
        if (Comp_Sprite._begin) {
            Comp_Sprite._batcher.EndDraw();
            Comp_Sprite._begin = false;
        }
    }
}