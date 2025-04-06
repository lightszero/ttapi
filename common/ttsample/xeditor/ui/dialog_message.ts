import { Color, QUI_Button, QUI_Canvas, QUI_Container, QUI_Direction2, QUI_Grow, QUI_HAlign, QUI_Image, QUI_Label, QUI_Overlay, QUI_Window, tt } from "../../../ttlayer2/ttlayer2.js";


export class Dialog_Message {

    static finish: boolean = false;
    static async Show(canvas: QUI_Canvas, message: string) {

        let container = new QUI_Container();
        {
            canvas.AddChild(container);

            let img = new QUI_Image();//背景
            img.localRect.SetAsFill();
            container.AddChild(img);
            img.localColor = new Color(0, 0, 0, 0.5);

            let overlay = new QUI_Overlay();//事件拦住
            container.AddChild(overlay);

            let label = new QUI_Label();
            label.text = message;
            label.localRect.SetAsFill();
            container.AddChild(label);

            //分组
            let group = new QUI_Window();
            group.title.text = "信息"
            container.AddChild(group);
            group.localRect.offsetX1 = 120;
            group.localRect.offsetY1 = 120;
            group.localRect.offsetX2 = -120;
            group.localRect.offsetY2 = -120

            let innermenu = new QUI_Grow();
            innermenu.direction = QUI_Direction2.Horizontal;
            group.container.AddChild(innermenu);
            innermenu.localRect.setVPosByBottomBorder(22);

            let btn0 = new QUI_Button();
            btn0.localRect.setBySize(100, 22);
            btn0.SetText("关闭");
            btn0.OnClick = () => {
                this.finish = true;
            }
            innermenu.AddChild(btn0);

            let grow = new QUI_Grow();
            group.container.AddChild(grow);
            grow.direction = QUI_Direction2.Vertical;
            grow.localRect.SetAsFill();
            grow.localRect.offsetY2 = -22;

            let lines = message.split("\n");
            let width = canvas.GetWorldRect().Width - 200;
            for (var i = 0; i < lines.length; i++) {
                let label = new QUI_Label();
                label.text = lines[i];
                label.localRect.setBySize(width, 16);
                //label.halign = QUI_HAlign.Left;
                grow.AddChild(label);
            }

        }
        this.finish = false;
        while (!this.finish) {
            await tt.sleep(1);
        }
        canvas.RemoveChild(container);
    }
}