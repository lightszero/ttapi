//图片编辑模块

import { Border, Color, GameApp, QUI_Canvas, QUI_Container, QUI_Image, QUI_Label, QUI_Panel_Split, QUI_Resource, Rectangle, tt } from "../../../ttlayer2/ttlayer2.js";
import { QUI_CustomRender } from "../../../ttlayer2/ttui/qui_rendercontainer.js";
import { EditImage, Working } from "../work/working.js";


//edit 区域分为一个 主编辑区 和 副编辑区，分别是split 的 panel1 和 panel2
export class Editor_Image {
    static edititem: EditImage;
    static Edit(split: QUI_Panel_Split, edititem: EditImage): void {
        this.edititem = edititem;
        let r = new QUI_CustomRender();
        split.GetPanel1().container.AddChild(r);
        r.OnCustomRender = (canvas) => {
            this.OnRender(canvas, r.GetWorldRect());
        }
        r.OnUpdate = (canvas, delta) => {
            this.OnUpdate(delta);
        }

        //这个东西直接从这里抢不太对劲，GameApp的包装有点2
        tt.input.OnKey = (keycode, press) => {
            this.OnKey(keycode, press);
        }

        let label = new QUI_Label();
        label.text = "用 上下左右或者 wasd 移动pivot,图片定轴以后才方便替换";
        label.localRect.setHPosFill();
        label.localRect.setVPosByTopBorder(20, 2);
        split.GetPanel1().container.AddChild(label);
        //给留个边
        // let bordercontainer = new QUI_Container();
        // let w = edititem.sprite.pixelwidth * 2;
        // let h = edititem.sprite.pixelheight * 2;
        // let border = 32;
        // bordercontainer.localRect.setByPosAndSize(0, 0, w + border * 2, h + border * 2);


        // let image = new QUI_Image;
        // image.SetBySprite(edititem.sprite);
        // image.localRect.setByPosAndSize(border, border, w, h);
        // bordercontainer.AddChild(image)

    }
    static color: Color = Color.White;
    static timer: number = 0;
    static OnUpdate(delta: number) {
        this.timer += delta;
        while (this.timer > 1)
            this.timer -= 1;

        let a = this.timer > 0.5 ? 1 - this.timer : this.timer;
        this.color.A = a * 2;
    }
    static OnRender(canvas: QUI_Canvas, rect: Rectangle): void {

        let scale = 2;
        let srect = new Rectangle(rect.X + 32, rect.Y + 32, this.edititem.sprite.pixelwidth * scale, this.edititem.sprite.pixelheight * scale);
        this.edititem.sprite.RenderRect(canvas.batcherUI, srect);
        let spritewhite = QUI_Resource.GetWhiteSprite();
        let pivotX = this.edititem.data.pivotX;
        let pivotY = this.edititem.data.pivotY;

        //画个pivot 十字
        spritewhite.RenderRect(canvas.batcherUI, new Rectangle(rect.X, srect.Y + pivotY - 1, rect.Width, 2), this.color);
        spritewhite.RenderRect(canvas.batcherUI, new Rectangle(srect.X + pivotX - 1, rect.Y, 2, rect.Height), this.color);
    }
    static OnKey(keycode: string, press: boolean) {
        console.log("--key " + keycode + "," + press);
        if (keycode == "KeyW" || keycode == "ArrowUp") {
            this.edititem.data.pivotY--;
        }
        if (keycode == "KeyA" || keycode == "ArrowLeft") {
            this.edititem.data.pivotX--;
        }
        if (keycode == "KeyS" || keycode == "ArrowDown") {
            this.edititem.data.pivotY++;
        }
        if (keycode == "KeyD" || keycode == "ArrowRight") {
            this.edititem.data.pivotX++;
        }
        this.edititem.sprite.pivotX = this.edititem.data.pivotX;
        this.edititem.sprite.pivotY = this.edititem.data.pivotY;
        this.edititem.Apply();
        Working.Save();
    }
}