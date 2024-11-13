import { tt } from "../../../ttapi/ttapi.js";
import { Font } from "../../atlas/font.js";
import { Matrix3x2Math } from "../../math/Matrix3x2.js";
import { Color, Vector2 } from "../../math/vector.js";
import { GameApp, IRenderTarget, Render_Batcher } from "../../ttlayer2.js";
import { IView, IViewComponent, IViewItem, IViewRenderItem } from "../viewlist.js";
import { SceneView } from "../../scene/sceneview.js";
import { Comp_Sprite } from "./comp_sprite.js";

export class Comp_Label implements IViewComponent, IViewRenderItem {
    font: Font;
    private _text: string = "";
    get text(): string {
        return this._text;
    }
    set text(t: string) {
        this._text = t;
    }
    GetType(): string { return "label"; }
    sceneitem: IViewItem;
    OnAdd(item: IViewItem): void {
        this.sceneitem = item;
        if (Comp_Sprite._batcher == null) {
            let gl = tt.graphic.GetWebGL();
            Comp_Sprite._batcher = new Render_Batcher(gl);
        }
    }
    OnUpdate(delta: number): void {
        this.font.SureText(this._text);
    }
    IsRender(): boolean { return true; }
    GetSortValue(): number {
        let y = this.sceneitem.GetWorldMatrix().values[5];
        return y;
    }
    OnRender(_target:IRenderTarget,view: IView, tag: number): void {
        if (tag == 0) {
            if (!Comp_Sprite._begin) {
                let target = _target;
                if (target == null)
                    target = GameApp.GetMainScreen();
                Comp_Sprite._batcher.BeginDraw(target);
                Comp_Sprite._begin = true;
            }
            let p0 = new Vector2(0, 0);
            let mat = this.sceneitem.GetWorldMatrix();
            let np0 = Matrix3x2Math.MulVec2(mat, p0);
            this.font.RenderText(Comp_Sprite._batcher, this.text, np0, Vector2.One, Color.White);
            //Comp_Sprite._batcher.DrawQuads(tex, null, null, this.quad, 1);
        }
    }
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