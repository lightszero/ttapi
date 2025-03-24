import { Color, QUI_BaseContainer, QUI_Button, QUI_Canvas, QUI_Container, QUI_Direction2, QUI_ElementType, QUI_Group, QUI_Grow, QUI_HAlign, QUI_Image, QUI_Label, QUI_Overlay, QUI_Panel_Scroll, QUI_Window, Resources, tt } from "../../ttlayer2/ttlayer2.js";
import { IOExt, IOExt_FileHandle } from "../../xioext/ioext.js";
import { WorkingDir } from "../work/workingdir.js";


export class PickAble_FileItem extends QUI_BaseContainer {
    constructor() {
        super();
        let ol = new QUI_Overlay();
        this.AddChild(ol);
        ol.OnPress = () => {
            (this._parent as QUI_BaseContainer).Pick(this);
        }

        // let ext = TTPathTool.GetExt(result[i].name).toLowerCase();
        // if (ext == ".jpg" || ext == ".png") {this
        let imgback = this.imageback = new QUI_Image();
        imgback.localRect.SetAsFill();
        this.AddChild(imgback);
        imgback.localColor.A = 0;

        let img = this.image = new QUI_Image();
        //let tex = await this.LoadFileToTexture(result[i]);
        //img.SetByTexture(tex);
        img.localRect.setByPosAndSize(0, 0, 24, 24);
        img.sprite = null;
        this.AddChild(img);
        //}
        let label = this.label = new QUI_Label();
        label.localRect.SetAsFill();

        label.localRect.offsetX1 = 25;
        label.text = "pickable"
        label.halign = QUI_HAlign.Left;
        //this.contextPanel.container().AddChild(con);
        this.AddChild(label);
    }
    GetElementType(): QUI_ElementType {
        return QUI_ElementType.Element_User
    }
    filehandle: IOExt_FileHandle | null = null;
    image: QUI_Image;
    imageback: QUI_Image;
    label: QUI_Label;

    OnFocus(): void {
        this.imageback.localColor = new Color(0.3, 0.4, 0.9, 1);
        this.label.localColor = new Color(0.9, 0.9, 0.3, 1);
    }
    OnUnFocus(): void {
        this.imageback.localColor.A = 0;
        this.label.localColor = Color.White
    }
}
export class PickTTDialog {
    static finish: boolean = false;
    static async Show(canvas: QUI_Canvas) {
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
        btn1.OnClick = async () => {
            this.OnNewFile();

        }
        innermenu.AddChild(btn1);

        let panelScroll = new QUI_Panel_Scroll();

        btn0.OnClick = () => {
            this.OnPick((panelScroll.container.GetPicked() as PickAble_FileItem).filehandle);
        }

        group.container.AddChild(panelScroll);
        panelScroll.localRect.offsetY1 = 22;

        let fs = await WorkingDir.FindFile([".tt.json"], 3);



        for (var i = 0; i < fs.length; i++) {
            let con = new PickAble_FileItem();
            con.filehandle = fs[i];
            con.localRect.setBySize(500, 25);
            panelScroll.container.AddChild(con);
            // let ext = TTPathTool.GetExt(result[i].name).toLowerCase();
            // if (ext == ".jpg" || ext == ".png") {
            //     let img = new QUI_Image();
            //     let tex = await this.LoadFileToTexture(result[i]);
            //     con.image.SetByTexture(tex);
            // }


            con.label.text = fs[i].name;
        }
        if (fs.length == 0) {
            let con = new PickAble_FileItem();
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
    }
    private static async OnPick(item: IOExt_FileHandle) {
        await WorkingDir.SetEditFile(item);
        this.finish = true;
    }
    private static async OnNewFile() {
        let txt = await tt.input.Prompt("输入文件名", "new1.tt.json", 20, Resources.GetDefFont().GetFont());
        console.log("input name:" + txt);
        this.finish = true;
        var file = await WorkingDir.SetEditFile(await WorkingDir.CreateJsonFile(txt));
        this.finish = true;
    }
}