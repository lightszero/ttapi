import { tt } from "../ttapi/ttapi.js";
import { SpriteData } from "../ttlayer2/resources/packtex/packtex.js";
import { Color, Color32, Material, QUI_BaseElement, QUI_Canvas, QUI_Container, QUI_ElementType, QUI_IElement, QUI_Image, QUI_Panel, Rectangle, Resources, Sprite, Texture, TextureFormat, Vector2 } from "../ttlayer2/ttlayer2.js";

export interface ITool {
    Init(c: UI_Canvas): void
    Begin(): void;
    End(): void;
    Update(): void;
}
export class Pen implements ITool {
    color: Color32=new Color32(0,0,0,255);
    canvas: UI_Canvas;
    Init(c: UI_Canvas): void {
        this.canvas = c;
    }
    private begin: boolean = false;
    Begin(): void {
        this.begin = true;
    }
    End(): void {
        this.begin = false;
    }
    Update(): void {
        if (this.begin) {
            let x = this.canvas.pickPos.X | 0;
            let y = this.canvas.pickPos.Y | 0;
            let index = (this.canvas.data.width * y + x) * 4;
            this.canvas.data.data[index + 0] = this.color.R;
            this.canvas.data.data[index + 1] = this.color.G;
            this.canvas.data.data[index + 2] = this.color.B;
            this.canvas.data.data[index + 3] = this.color.A;
            this.canvas.simpleimage.UploadTexture(0, 0, this.canvas.data.width, this.canvas.data.height, this.canvas.data.data);

        }
    }

}
//一个画板
export class UI_Canvas extends QUI_Container {
    private spriteWhite: Sprite;
    private spritePick: Sprite;
    private spriteImg: Sprite;

    simpleimage: Texture;
    data: SpriteData;

    constructor() {
        super();
        this.spriteWhite = Resources.GetPackElement().ConvertElemToSprite(Resources.getWhiteBlock());

        this.spritePick = Resources.GetPackElement().ConvertElemToSprite(Resources.getWhiteBlock());

        this.simpleimage = new Texture(tt.graphic.GetWebGL(), 32, 32, TextureFormat.RGBA32, null);
        this.data = new SpriteData();
        this.data.width = 32;
        this.data.height = 32;
        this.data.format = TextureFormat.RGBA32;
        this.data.data = new Uint8Array(32 * 32 * 4);
        for (let i = 0; i < this.data.data.length; i++) {
            this.data.data[i] = Math.random() * 255;
        }
        this.simpleimage.UploadTexture(0, 0, this.data.width, this.data.height, this.data.data);
        let mat = new Material(Resources.GetShaderProgram("simple"));
        mat.uniformTexs["tex"].value = this.simpleimage;
        this.spriteImg = new Sprite(mat);
    }
    gridHeight: number = 32;
    bigGrid: number = 8;
    pickPos: Vector2 = Vector2.Zero;

    private pickValue: number = 1;
    GetPickFlashValue(): number {
        return this.pickValue;
    }
    private _canvas: QUI_Canvas = null;
    PickByWorld(posworld: Vector2): void {
        if (this._canvas == null)
            return;
        let sw = this.getWorldRectScale(this._canvas.scale);
        let blocksize = (sw.Height / this.gridHeight) | 0;
        this.pickPos.X = (posworld.X * this._canvas.scale - sw.X) / blocksize;
        this.pickPos.Y = (posworld.Y * this._canvas.scale - sw.Y) / blocksize;
    }
    override OnRender(_canvas: QUI_Canvas): void {
        super.OnRender(_canvas);
        this._canvas = _canvas;


        let sw = this.getWorldRectScale(_canvas.scale);
        let blocksize = (sw.Height / this.gridHeight) | 0;

        //画底图

        let pixelperfectrect = new Rectangle(sw.X, sw.Y, 0, 0);
        pixelperfectrect.Width = this.spriteImg.pixelwidth * blocksize;
        pixelperfectrect.Height = this.spriteImg.pixelheight * blocksize;
        this.spriteImg.RenderRect(_canvas.batcherUI, pixelperfectrect, new Color(1, 1, 11));

        //画横线
        let rect = new Rectangle(sw.X, 0, sw.Width, 1);
        let gridy = 0;
        for (var y = sw.Y; y < sw.Y + sw.Height; y += blocksize) {

            rect.Y = y;
            rect.Height = (gridy % 8 == 0) ? 2 : 1;
            this.spriteWhite.RenderRect(_canvas.batcherUI, rect, new Color(0, 0, 0, 0.5));
            gridy++;
        }
        //画竖线
        //blocksize = (sw.Width / this.gridWidth) | 0;
        rect.Y = sw.Y;
        rect.Height = sw.Height;
        rect.Width = 1;
        let gridx = 0;
        for (var x = sw.X; x < sw.X + sw.Width; x += blocksize) {
            rect.X = x;
            rect.Width = (gridx % 8 == 0) ? 2 : 1;
            this.spriteWhite.RenderRect(_canvas.batcherUI, rect, new Color(0, 0, 0, 0.5));
            gridx++;
        }
        rect.X = (this.pickPos.X | 0) * blocksize + sw.X;
        rect.Y = (this.pickPos.Y | 0) * blocksize + sw.Y;
        rect.Width = blocksize;
        rect.Height = blocksize;
        this.spritePick.RenderRect(_canvas.batcherUI, rect, new Color(this.pickValue, this.pickValue, this.pickValue, 0.5));
    }
    private timer: number = 0;
    OnUpdate(delta: number): void {
        this.timer += delta;
        const total = 1.0;
        if (this.timer > total)
            this.timer -= total;
        //do pingpang
        let percent = 2.0 / total * Math.abs(total / 2 - this.timer);

        this.pickValue = percent;


        if (this.tool != null) {
            this.tool.Update();
        }
    }
    tool: ITool;
    ChangeTool(tool: ITool) {
        if (this.tool != null)
            this.tool.End();
        this.tool = tool;
        if (this.tool != null)
            this.tool.Init(this);
    }
    GetTool(): ITool {
        return this.tool;
    }
}