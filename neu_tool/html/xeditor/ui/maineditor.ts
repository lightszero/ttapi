import { QUI_Canvas, QUI_Direction2, QUI_Group, QUI_Panel, QUI_Panel_Scroll, QUI_Panel_Split } from "../../ttlayer2/ttlayer2.js";

export class MainEditor {

    static scrollPic: QUI_Panel_Scroll
    static scrollAni: QUI_Panel_Scroll
    static Init(canvas: QUI_Canvas) {
        let split = new QUI_Panel_Split();
        {//root split
            split.splitDir = QUI_Direction2.Horizontal;
            split.splitPos = 0.25;
            split.localRect.SetAsFill();
            split.localRect.offsetY1 = 22;
            split.getSplitButton().SetText("");
            split.splitSize = 4;
            split.getPanel1().getBorder().XLeft = 0;
            split.getPanel1().getBorder().XRight = 0;
            split.getPanel1().getBorder().YTop = 0;
            split.getPanel1().getBorder().YBottom = 0;
            canvas.AddChild(split);
        }
        {
            let picpanel = new QUI_Group();
            picpanel.title.text = "图片Sprite"
            picpanel.localRect.SetAsFill();

            picpanel.localRect.radioY2 = 0.5;
            this.scrollPic = new QUI_Panel_Scroll();
            picpanel.container.AddChild(this.scrollPic);
            split.getPanel1().container.AddChild(picpanel);
        }
        {
            let anipanel = new QUI_Group();
            anipanel.title.text = "动画Animation"
            anipanel.localRect.SetAsFill();

            anipanel.localRect.radioY1 = 0.5;
            this.scrollAni = new QUI_Panel_Scroll();
            anipanel.container.AddChild(this.scrollAni);
            split.getPanel1().container.AddChild(anipanel);
        }
    }
    static Open(): void {

    }
}