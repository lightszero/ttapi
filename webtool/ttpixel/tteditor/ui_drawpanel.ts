import { tt } from "../ttapi/ttapi.js";
import { SpriteData } from "../ttlayer2/resources/packtex/packtex.js";
import { Color, Color32, Material, QUI_Image, QUI_Panel, Rectangle, Resources, Sprite, Texture, TextureFormat, Vector2 } from "../ttlayer2/ttlayer2.js";
import { UI_Grid } from "./ui_grid.js";

export interface IDrawAction {
    Apply(pos: Vector2, data: SpriteData): boolean

    End(): void;
}
export class DrawAction_Pencil implements IDrawAction {
    color: Color32;
    Apply(pos: Vector2, data: SpriteData): boolean {
        let x = pos.X | 0;
        let y = pos.Y | 0;
        if (x >= 0 && y >= 0 && x < data.width && y < data.height) {
            let index = (data.width * y + x) * 4;
            data.data[index + 0] = this.color.R;
            data.data[index + 1] = this.color.G;
            data.data[index + 2] = this.color.B;
            data.data[index + 3] = this.color.A;
            return true;
        }
        return false;
    }

    End(): void {

    }
}
export class UI_DrawPanel extends QUI_Panel {
    private simpleimage: Texture;
    private data: SpriteData;
    private sprite: Sprite;
    private img: QUI_Image;//底图
    private grid: UI_Grid
    private cursor: QUI_Image;

    private drawAction: IDrawAction;
    constructor() {
        super();

        this.simpleimage = new Texture(tt.graphic.GetWebGL(), 32, 32, TextureFormat.RGBA32, null);
        this.data = new SpriteData();
        this.data.width = 32;
        this.data.height = 32;
        this.data.format = TextureFormat.RGBA32;
        this.data.data = new Uint8Array(32 * 32 * 4);
        for (let i = 0; i < this.data.data.length; i++) {
            this.data.data[i] = 255;
        }
        this.simpleimage.UploadTexture(0, 0, this.data.width, this.data.height, this.data.data);
        let mat = new Material(Resources.GetShaderProgram("simple"));
        mat.uniformTexs["tex"].value = this.simpleimage;
        this.sprite = new Sprite(mat);

        this.img = new QUI_Image(this.sprite);
        this.img.localRect.setAsFill();
        this.addChild(this.img);
        this.grid = new UI_Grid();
        this.grid.localRect.setAsFill();
        this.addChild(this.grid);
        //this._children.push(this.cursor);


        this.cursor = new QUI_Image();
        this.cursor.sprite = Resources.GetPackElement().ConvertElemToSprite(Resources.GetPackElement().GetElementByName("arrow"));

        this.cursor.localRect.setByRect(new Rectangle(0, 0, 16, 16))
        this.cursor._parent = this;
        this.addChild(this.cursor);
    }
    SetCursorPos(pos: Vector2) {
        this.grid.SetCursorPos(pos);

    }
    OnUpdate(delta: number): void {
        super.OnUpdate(delta);
        let cursor = this.cursor;
        cursor.color.R = cursor.color.G = cursor.color.B = this.grid.GetPickFlashValue();
        if (this.drawAction != null) {
            var dirty = this.drawAction.Apply(this.grid.pickPos, this.data);
            if (dirty)
                this.simpleimage.UploadTexture(0, 0, this.data.width, this.data.height, this.data.data);
        }
    }
    MoveCursor(dir: Vector2): void {
        let cursor = this.cursor;
        cursor.localRect.radioX1 = 0;
        cursor.localRect.radioX2 = 0;
        cursor.localRect.radioY1 = 0;
        cursor.localRect.radioY2 = 0;


        cursor.localRect.offsetX1 += dir.X;
        cursor.localRect.offsetY1 += dir.Y;

        //限制光标范围
        var limit = this.container.getWorldRect();
        if (cursor.localRect.offsetX1 < 0)
            cursor.localRect.offsetX1 = 0;
        if (cursor.localRect.offsetX1 > limit.Width - 1)
            cursor.localRect.offsetX1 = limit.Width - 1;
        if (cursor.localRect.offsetY1 < 0)
            cursor.localRect.offsetY1 = 0;
        if (cursor.localRect.offsetY1 > limit.Height - 1)
            cursor.localRect.offsetY1 = limit.Height - 1;
        cursor.localRect.offsetX2 = cursor.localRect.offsetX1 + 16;
        cursor.localRect.offsetY2 = cursor.localRect.offsetY1 + 16;

        let cursorpos = cursor.getWorldRect();
        this.grid.SetCursorPos(new Vector2(cursorpos.X, cursorpos.Y));

    }
    BeginPencil(c: Color): void {
        if (this.drawAction != null)
            this.drawAction.End();
        let p=new DrawAction_Pencil();
        p.color=new Color32(c.R*255,c.G*255,c.B*255,c.A*255);
        this.drawAction = p;

    }
    EndPencil() {
        if (this.drawAction != null)
            this.drawAction.End();
        this.drawAction = null;
    }
}