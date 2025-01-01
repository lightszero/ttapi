import { tt } from "../../ttapi/ttapi.js";
import { SpriteData } from "../../ttlayer2/resources/packtex/packtex.js";
import { Color, Color32, Material, QUI_BaseElement, QUI_Canvas, QUI_Container, QUI_ElementType, QUI_IElement, QUI_Image, QUI_Panel, Rectangle, Resources, Sprite, Texture, TextureFormat, Vector2 } from "../../ttlayer2/ttlayer2.js";
import { ICanvasTool } from "./canvas_tool.js";

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

        let mat = new Material(Resources.GetShaderProgram("simple"));
        mat.uniformTexs["tex"].value = this.simpleimage;
        this.spriteImg = new Sprite(mat);



        //初始化一个32x32 透明图像
        let data = new SpriteData();
        data.width = 32;
        data.height = 32;
        data.format = TextureFormat.RGBA32;
        data.data = new Uint8Array(32 * 32 * 4);
        for (let i = 0; i < data.data.length; i++) {
            //this.data.data[i] = Math.random() * 255;

        }
        this.UpdateImg(data);

    }
    UpdateImg(data: SpriteData): void {
        this.data = data;
        if (data.width != this.simpleimage._width || data.height != this.simpleimage._height)
            this.simpleimage.ReSize(data.width, data.height);
        this.simpleimage.UploadTexture(0, 0, this.data.width, this.data.height, this.data.data);
        this.spriteImg.pixelwidth = this.data.width;
        this.spriteImg.pixelheight = this.data.height;
    }
    gridHeight: number = 32;//GridHeight 决定Grid大小，只有Zoom 和他相关
    offset: Vector2 = Vector2.Zero;//绘制左上角，会根据光标位置自动调整
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
        let sw = this.getWorldRect();
        let blocksize = (sw.Height * this._canvas.scale / this.gridHeight) | 0;
        this.pickPos.X = (posworld.X - sw.X) * this._canvas.scale / blocksize + this.offset.X;
        this.pickPos.Y = (posworld.Y - sw.Y) * this._canvas.scale / blocksize + this.offset.Y;
        if (this.pickPos.X < 0)
            this.pickPos.X = 0;
        if (this.pickPos.Y < 0)
            this.pickPos.Y = 0;
        if (this.pickPos.X > this.data.width - 1)
            this.pickPos.X = this.data.width - 1;
        if (this.pickPos.Y > this.data.height - 1)
            this.pickPos.Y = this.data.height - 1;

        let hradio = (posworld.X - sw.X) / sw.Width;
        let vradio = (posworld.Y - sw.Y) / sw.Height;
        console.log("radio=" + hradio + "," + vradio);

        let blockwidth = (sw.Width * this._canvas.scale / blocksize) | 0;
        if (hradio < 0.05) {
            this.offset.X--;
            if (this.offset.X < -5)
                this.offset.X = -5;
        }
        if (hradio >= 0.95) {
            this.offset.X++;
            if (this.offset.X > this.data.width - blockwidth - 1 + 5)
                this.offset.X = this.data.width - blockwidth - 1 + 5;
        }
        if (vradio < 0.05) {
            this.offset.Y--;
            if (this.offset.Y < -5)
                this.offset.Y = -5;
        }
        if (vradio >= 0.95) {
            this.offset.Y++;
            if (this.offset.Y > this.data.height - 32 - 1 + 5)
                this.offset.Y = this.data.height - 32 - 1 + 5;
        }
        console.log("offset=" + this.offset.X + "," + this.offset.Y);
    }
    override OnRender(_canvas: QUI_Canvas): void {
        super.OnRender(_canvas);
        this._canvas = _canvas;


        let sw = this.getWorldRectScale(_canvas.scale);
        let blocksize = (sw.Height / this.gridHeight) | 0;

        //画底图

        let pixelperfectrect = new Rectangle(
            sw.X - this.offset.X * blocksize,
            sw.Y - this.offset.Y * blocksize,
            0, 0);

        pixelperfectrect.Width = this.spriteImg.pixelwidth * blocksize;
        pixelperfectrect.Height = this.spriteImg.pixelheight * blocksize;
        this.spriteImg.RenderRect(_canvas.batcherUI, pixelperfectrect, new Color(1, 1, 11));

        //画横线
        let rect = new Rectangle(sw.X, 0, sw.Width, 1);
        let gridy = this.offset.Y;


        let X1 = sw.X;
        let XW = sw.Width;
        let Y1 = sw.Y;
        let YH = sw.Height;
        let blockwidth = (sw.Width / blocksize) | 0;
        if (this.offset.X < 0) {
            X1 = sw.X + blocksize * (-this.offset.X);
        }

        if (this.offset.X >= this.data.width - blockwidth) {
            XW = blocksize * (this.data.width - this.offset.X);
        }
        if (this.offset.Y < 0) {
            Y1 = sw.Y + blocksize * (-this.offset.Y);
        }
        //todo fix
        if (this.offset.Y >= this.data.height - this.gridHeight) {
            YH = blocksize * (this.data.height - this.offset.Y)
        }
        for (var y = sw.Y; y < sw.Y + sw.Height; y += blocksize, gridy++) {
            if (gridy < 0)
                continue;
            if (gridy > this.data.height)
                break;

            rect.Y = y;
            rect.Height = (gridy % 8 == 0) ? 2 : 1;
            rect.X = X1;
            rect.Width = XW;
            this.spriteWhite.RenderRect(_canvas.batcherUI, rect, new Color(0, 0, 0, 0.5));
            //gridy++;
        }
        //画竖线
        //blocksize = (sw.Width / this.gridWidth) | 0;
        rect.Y = sw.Y;
        rect.Height = sw.Height;
        rect.Width = 1;
        let gridx = this.offset.X;
        for (var x = sw.X; x < sw.X + sw.Width; x += blocksize, gridx++) {
            if (gridx < 0)
                continue;
            if (gridx > this.data.width)
                break;

            rect.X = x;
            rect.Width = (gridx % 8 == 0) ? 2 : 1;
            rect.Y = Y1;
            rect.Height = YH;

            this.spriteWhite.RenderRect(_canvas.batcherUI, rect, new Color(0, 0, 0, 0.5));
            //gridx++;
        }

        //画选中块
        rect.X = ((this.pickPos.X - this.offset.X) | 0) * blocksize + sw.X;
        rect.Y = ((this.pickPos.Y - this.offset.Y) | 0) * blocksize + sw.Y;
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
    tool: ICanvasTool;
    ChangeTool(tool: ICanvasTool) {
        if (this.tool == tool)
            return;
        if (this.tool != null)
            this.tool.End();
        this.tool = tool;
        if (this.tool != null)
            this.tool.Init(this);
    }
    GetTool(): ICanvasTool {
        return this.tool;
    }
}