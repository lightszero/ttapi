import { QUI_Canvas, QUI_Direction2, QUI_Group, QUI_HAlign, QUI_Label, QUI_Panel, QUI_Panel_Scroll, QUI_Panel_Split, TTJson } from "../../ttlayer2/ttlayer2.js";
import { IOExt } from "../../xioext/ioext.js";
import { Working } from "../work/working.js";
import { Dialog_Message } from "./dialog_message.js";
import { PickItem } from "./pickitem.js";

export class Editor_Main {

    static scrollPic: QUI_Panel_Scroll
    static scrollAni: QUI_Panel_Scroll
    static editTitle: QUI_Label;
    static Init(canvas: QUI_Canvas) {
        let split = new QUI_Panel_Split();
        {//root split
            split.splitDir = QUI_Direction2.Horizontal;
            split.splitPos = 0.25;
            split.localRect.SetAsFill();
            split.getBorder().SetZero();
            split.localRect.offsetY1 = 22;
            split.getSplitButton().SetText("");
            split.splitSize = 4;
            split.getPanel1().getBorder().SetZero();
            split.getPanel2().getBorder().SetZero();

            canvas.AddChild(split);

            let split2 = new QUI_Panel_Split();
            split2.getBorder().SetZero();
            split2.splitDir = QUI_Direction2.Horizontal;
            split2.splitPos = 0.66;
            split2.localRect.SetAsFill();
            split2.localRect.offsetY1 = 22;
            split2.getSplitButton().SetText("");
            split2.splitSize = 4;
            split2.getPanel1().getBorder().SetZero();
            split2.getPanel2().getBorder().SetZero();

            this.editTitle = new QUI_Label();
            this.editTitle.localRect.setHPosFill();
            this.editTitle.localRect.setVPosByTopBorder(22);
            this.editTitle.halign = QUI_HAlign.Left;
            this.editTitle.localRect.offsetX1 = 4;
            this.editTitle.text = "当前编辑文件";
            split.getPanel2().container.AddChild(this.editTitle);
            split.getPanel2().container.AddChild(split2);
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
    static async Open(canvas:QUI_Canvas) {
        if(Working.editfile==null)
        {
            await Dialog_Message.Show(canvas,"没选择文件");
        }
        Working.ttjson = JSON.parse(await IOExt.File_ReadText(Working.editfile)) as TTJson;
        this.editTitle.text = Working.editfile.fullname;

        this.scrollPic.container.RemoveChildAll();
        for (var key in Working.ttjson.pics) {
            let item = new PickItem<string>(key);
            this.scrollPic.container.AddChild(item);
        }
        this.scrollAni.container.RemoveChildAll();
    }
    // 静态方法，用于更新图片
    static async UpdatePics()
    {

    }
}