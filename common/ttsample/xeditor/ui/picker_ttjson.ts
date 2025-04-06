import { IOExt_FileHandle } from "../../../ttlayer2/ttlayer2.js";
import { Color, QUI_BaseContainer, QUI_Button, QUI_Canvas, QUI_Container, QUI_Direction2, QUI_ElementType, QUI_Group, QUI_Grow, QUI_HAlign, QUI_Image, QUI_Label, QUI_Overlay, QUI_Panel_Scroll, QUI_Window, Resources, tt } from "../../../ttlayer2/ttlayer2.js";

import { Working } from "../work/working.js";
import { Dialog_Message } from "./dialog_message.js";
import { PickItem } from "./pickitem.js";



export class Picker_TTJson {
    static finish: boolean = false;
    static async ShowPick(canvas: QUI_Canvas): Promise<IOExt_FileHandle> {
        let container = new QUI_Container();
        canvas.AddChild(container);

        let img = new QUI_Image();//背景
        img.localRect.SetAsFill();
        container.AddChild(img);
        img.localColor = new Color(0, 0, 0, 0.5);

        let overlay = new QUI_Overlay();//事件拦住
        container.AddChild(overlay);

        //分组
        let group = new QUI_Window();
        group.title.text = "选择编辑文件"
        container.AddChild(group);
        group.localRect.offsetX1 = 100;
        group.localRect.offsetY1 = 100;
        group.localRect.offsetX2 = -100;
        group.localRect.offsetY2 = -100

        let innermenu = new QUI_Grow();
        innermenu.direction = QUI_Direction2.Horizontal;
        group.container.AddChild(innermenu);
        innermenu.localRect.setVPosByTopBorder(22);

        let btn0 = new QUI_Button();
        btn0.localRect.setBySize(100, 22);
        btn0.SetText("打开选中");
        innermenu.AddChild(btn0);


        let btn1 = new QUI_Button();
        btn1.localRect.setBySize(100, 22);
        btn1.SetText("新建 tt.json");

        let picked: IOExt_FileHandle = null;
        btn1.OnClick = async () => {
            picked = await this.OnNewFile(canvas);
        }
        innermenu.AddChild(btn1);


        let btn2 = new QUI_Button();
        btn2.localRect.setBySize(100, 22);
        btn2.SetText("取消");
        innermenu.AddChild(btn2);

        let panelScroll = new QUI_Panel_Scroll();


        btn0.OnClick = () => {
            picked = (panelScroll.container.GetPicked() as PickItem<IOExt_FileHandle>).context;
            this.OnPick(canvas, picked);
        }
        btn2.OnClick = () => {
            picked = null;

            this.finish = true;
        }

        group.container.AddChild(panelScroll);
        panelScroll.localRect.offsetY1 = 22;

        let fs = await Working.FindFile([".tt.json"], 3);



        for (var i = 0; i < fs.length; i++) {
            let con = new PickItem<IOExt_FileHandle>(fs[i]);
            con.localRect.setBySize(500, 25);
            panelScroll.container.AddChild(con);
            // let ext = TTPathTool.GetExt(result[i].name).toLowerCase();
            // if (ext == ".jpg" || ext == ".png") {
            //     let img = new QUI_Image();
            //     let tex = await this.LoadFileToTexture(result[i]);
            //     con.image.SetByTexture(tex);
            // }


            con.label.text = fs[i].fullname;
        }
        if (fs.length == 0) {
            let con = new PickItem<IOExt_FileHandle>(null);
            con.localRect.setBySize(500, 25);
            panelScroll.container.AddChild(con);
            con.label.text = "Empty";
        }
        panelScroll.container.PickAt(0);
        this.finish = false;
        while (!this.finish) {
            await tt.sleep(1);
        }

        canvas.RemoveChild(container);

        return picked;
    }
    private static async OnPick(canvas: QUI_Canvas, item: IOExt_FileHandle) {

        if (item == null) {
            await Dialog_Message.Show(canvas, "Pick Empty.");
            return;
        }

        this.finish = true;
    }
    private static async OnNewFile(canvas: QUI_Canvas): Promise<IOExt_FileHandle> {

        let txt = await tt.input.Prompt("输入文件名", "new1.tt.json", 20, Resources.GetDefFont().GetFont());
        console.log("input name:" + txt);

        let file = await Working.CreateJsonFile(canvas, txt);
        this.finish = true;
        return file;
    }
}