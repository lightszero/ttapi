import { Color, QUI_Canvas, QUI_Container, Rectangle, Sprite } from "../ttlayer2/ttlayer2.js";
//允许四个角颜色不同的Image控件
export class UI_4Color extends QUI_Container {
    constructor(sprite: Sprite = null) {
        super();
        this.sprite = sprite;
        if (this.sprite != null) {
            this.localRect.setByRect(new Rectangle(0, 0, this.sprite.pixelwidth, this.sprite.pixelheight));
        }
        else {
            this.localRect.setByRect(new Rectangle(0, 0, 100, 100));
        }
        this.colors = [];
        for (var i = 0; i < 4; i++)
            this.colors[i] = Color.White;
    }
    sprite: Sprite;
    colors: Color[];
    OnRender(_canvas: QUI_Canvas): void {

        this.colors[0].A = this.alpha;
        this.colors[1].A = this.alpha;
        this.colors[2].A = this.alpha;
        this.colors[3].A = this.alpha;
        //this.Render_impl();
        if (this.sprite != null) {
            this.sprite.RenderRect4Color(_canvas.batcherUI, this.getWorldRectScale(_canvas.scale), this.colors);
        }
        super.OnRender(_canvas);
    }

}