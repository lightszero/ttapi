import { Color, FindTool, IOExt, IOExt_FileHandle, QUI_BaseContainer, QUI_Button, QUI_Canvas, QUI_Container, QUI_Direction2, QUI_ElementType, QUI_Group, QUI_Grow, QUI_HAlign, QUI_Image, QUI_Label, QUI_Overlay, QUI_Panel_Scroll, QUI_Window, Resources, Texture, TextureFormat, tt } from "../../../ttlayer2/ttlayer2.js";

import { Working } from "../work/working.js";
import { Dialog_Message } from "./dialog_message.js";
import { CheckItem } from "./pickitem.js";



export class Picker_Image {
    static finish: boolean = false;
    static async ShowPick(canvas: QUI_Canvas): Promise<IOExt_FileHandle[]> {
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
        btn1.SetText("取消");
        innermenu.AddChild(btn1);


        let panelScroll = new QUI_Panel_Scroll();

        let picked: IOExt_FileHandle[] = [];
        btn0.OnClick = () => {
            for(var i=0;i<panelScroll.container.GetChildCount();i++){
                let item = panelScroll.container.GetChild(i) as CheckItem<IOExt_FileHandle>;
                if(item.checked){
                    picked.push(item.context);
                }
            }
            //picked = (panelScroll.container.GetPicked() as CheckItem<IOExt_FileHandle>).context;
            this.OnPick(canvas, picked);
        }

        btn1.OnClick = () => {
            this.finish = true;
        }
        group.container.AddChild(panelScroll);
        panelScroll.localRect.offsetY1 = 22;


        let fs = await FindTool.FindAllFile(Working.editfile.parent, [".png", ".jpg", ".jpeg"], 3);



        for (var i = 0; i < fs.length; i++) {
            let con = new CheckItem<IOExt_FileHandle>(fs[i]);
            con.localRect.setBySize(500, 25);
            panelScroll.container.AddChild(con);
            //let ext = TTPathTool.GetExt(fs[i].name).toLowerCase();
            //if (ext == ".jpg" || ext == ".png") {
            //let img = new QUI_Image();
            let tex = await this.LoadFileToTexture(fs[i]);
            con.image.SetByTexture(tex);
            //}


            con.label.text = fs[i].fullname;
        }
        if (fs.length == 0) {
            let con = new CheckItem<IOExt_FileHandle>(null);
            con.localRect.setBySize(500, 25);
            panelScroll.container.AddChild(con);
            con.label.text = "Empty";
        }
        //panelScroll.container.PickAt(0);
        this.finish = false;
        while (!this.finish) {
            await tt.sleep(1);
        }

        canvas.RemoveChild(container);
        this.FreeTexture();
        return picked;
    }
    private static texs: Texture[] = []
    private static async LoadFileToTexture(file: IOExt_FileHandle) {
        let bin = await IOExt.File_ReadBinary(file);
        let b = new Blob([bin]);
        let texdata = await tt.loaderex.LoadImageDataAsync(URL.createObjectURL(b));
        let tex = new Texture(tt.graphic.GetWebGL(), texdata.width, texdata.height, TextureFormat.RGBA32, texdata.data);
        this.texs.push(tex);
        return tex;
    }
    private static FreeTexture() {
        for (var i = 0; i < this.texs.length; i++) {
            this.texs[i].Destory();
        }
        this.texs = [];
    }
    private static async OnPick(canvas: QUI_Canvas, picked: IOExt_FileHandle[]) {

        if (picked == null || picked.length == 0) {
            await Dialog_Message.Show(canvas, "Pick Empty.");
            return;
        }

        this.finish = true;
    }

}