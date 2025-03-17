import { Color, DrawLayer_GUI, DrawLayerTag, GameApp, IUserLogic, MainScreen, QUI_Button, QUI_Canvas, QUI_Container, QUI_Direction2, QUI_Group, QUI_HAlign, QUI_Image, QUI_Label, QUI_Panel, QUI_Panel_Split, QUI_Resource, QUI_TextBox_DOM, QUI_TextBox_Prompt, Rectangle, ResourceOption, Resources, tt } from "../ttlayer2/ttlayer2.js"
import { QUI_Grow } from "../ttlayer2/ttui/ext/qui_grow.js";
import { IOExt, IOExt_DirectoryHandle, IOExt_FileHandle } from "./twoenv.js"
export class MyLogic implements IUserLogic {
    canvas: QUI_Canvas;

    titlebar_txt: QUI_Label;
    OnInit(): void {
        let guilayer = new DrawLayer_GUI(DrawLayerTag.GUI);

        //改动这个会影响canvas size，会造成不点对点
        tt.graphic.setMainScreenScale(1);

        let pr = tt.graphic.getDevicePixelRadio();

        let scaleradio = (pr * 2) | 0;
        console.log("ScaleRadio=" + scaleradio);

        //改Camera的缩放会直接缩放内容
        guilayer.GetCamera().Scale = scaleradio;

        GameApp.GetViewList().AddDrawLayer(guilayer);

        this.canvas = guilayer.GetCanvas();

        // let panelsplit1 = new QUI_Panel_Split();
        // this.canvas.container.addChild(panelsplit1);

        // let img = new QUI_Image();
        // img.color = new Color(0.3, 0.3, 0.3, 1);
        // panelsplit1.getPanel1().container.addChild(img);

        // let label = new QUI_Label();

        // panelsplit1.getPanel1().container.addChild(label);

        // let btn = new QUI_Button();
        // btn.localRect.offsetY1 += 32;
        // btn.localRect.offsetY2 += 32;
        // panelsplit1.getPanel2().container.addChild(btn);
        this.InitTitleBar();


        let group = new QUI_Group();
        group.dragEnable = true;//允许拖动
        group.localRect.setByRect(new Rectangle(0, 50, 200, 200));
        this.canvas.AddChild(group);


        let img = new QUI_Image();
        img.localColor = new Color(0.8, 0.6, 0.3, 1);
        group.GetContainer().AddChild(img);

        let btn = new QUI_Button();
        let btnlabel = btn.elemNormal.AsContainer().GetChild(1) as QUI_Label
        btnlabel.text = "Open";
        btn.localRect.offsetY1 += 132;
        btn.localRect.offsetY2 += 132;
        btn.OnClick = async () => {
            let folder = await IOExt.Picker_Folder();
            let files = await IOExt.Directory_List(folder);
            console.log(JSON.stringify(files));
        }
        group.GetContainer().AddChild(btn);

        let group2 = new QUI_Group();
        group2.dragEnable = true;//允许拖动
        group2.localRect.setByRect(new Rectangle(200, 200, 200, 200));
        this.canvas.AddChild(group2);
        let grow = new QUI_Grow();
        grow.direction = QUI_Direction2.Vertical;
        group2.GetContainer().AddChild(grow);

        let label = new QUI_Label();
        label.localRect.setBySize(100, 16);
        grow.AddChild(label);
        let txtprompt = new QUI_TextBox_Prompt();
        txtprompt.localRect.setBySize(100, 20);
        grow.AddChild(txtprompt);
        let txtdom = new QUI_TextBox_DOM();
        txtdom.localRect.setBySize(100, 20);
        grow.AddChild(txtdom);
    }
    InitTitleBar() {
        let titlebar = new QUI_Panel();
        titlebar.localRect.setHPosFill();
        titlebar.localRect.setVPosByTopBorder(22);
        this.canvas.AddChild(titlebar);

        let titlegrow = new QUI_Grow();
        titlegrow.direction = QUI_Direction2.Horizontal;
        titlebar.GetContainer().AddChild(titlegrow);

        {
            let btn = new QUI_Button();
            btn.localRect.setBySize(60, 18);
            let label = btn.elemNormal.AsContainer().GetChild(1) as QUI_Label;
            label.text = "Open";
            titlegrow.AddChild(btn);
            btn.OnClick = async () => {
                let r = await IOExt.Picker_OpenFile();
                if (r != null)
                    this.OnOpenFile(r);
            }
        }
        {
            let btn = new QUI_Button();
            btn.localRect.setBySize(60, 18);
            let label = btn.elemNormal.AsContainer().GetChild(1) as QUI_Label;
            label.text = "New";
            titlegrow.AddChild(btn);
            btn.OnClick = async () => {
                let r = await IOExt.Picker_SaveFile();

               if (r != null)
                    this.OnSaveFile(r);
            }
        }
        {
            let btn = new QUI_Button();
            btn.localRect.setBySize(60, 18);
            let label = btn.elemNormal.AsContainer().GetChild(1) as QUI_Label;
            label.text = "Save";
            titlegrow.AddChild(btn);
        }
        {
            let label = this.titlebar_txt = new QUI_Label();
            label.text = "当前没有打开tt.json"
            label.localRect.setBySize(200, 18);
            label.halign = QUI_HAlign.Left;
            titlegrow.AddChild(label);
        }
    }

    OnOpenFile(file: IOExt_FileHandle) {
        console.log("OnOpenFile:" + file);
    }
    OnSaveFile(file: IOExt_FileHandle) {
        console.log("OnCreateFile:" + file);
    }


    OnUpdate(delta: number): void {

    }
    OnExit(): void {

    }
    OnResize(width: number, height: number): void {

    }
    OnKey(keycode: string, press: boolean): void {

    }
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {

    }

}
