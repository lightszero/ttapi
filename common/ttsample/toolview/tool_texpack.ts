import { tt } from "../../ttapi/ttapi.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, QUI_Panel_Split, QUI_ImageScale9, QUI_Panel_Scroll_Unlimit, QUI_Label, QUI_Button, QUI_Image, Texture, TextureFormat, Sprite, Material, QUI_Panel_Scroll, Rectangle, QUI_DragDriection, QUI_Resource } from "../../ttlayer2/ttlayer2.js";
import { GContext, TTState_All } from "../ttstate_all.js";
import { FileItem, FolderList } from "./folderlist.js";
/// <reference types="../fileapi/wicg-file-system-access" />


export class Tool_TexPack implements IState<TTState_All> {
    nav: TTState_All;
    guilayer: DrawLayer_GUI;

    tex_preview: Texture;
    sprite_preview: Sprite;
    OnInit(nav: TTState_All): void {
        if (this.nav == null) {
            this.nav = nav;
        }






        this.AddBackButton();

        let gl = tt.graphic.GetWebGL();
        this.InitUI();

        this.btn_Open.OnClick = this.event_open.bind(this);


        this.sprite_preview = new Sprite(new Material(Resources.GetShaderProgram("simple")));

        this.panel_File.FileFilter = (name) => {
            return name.includes(".png")
                || name.includes(".jpg")
                || name.includes(".jpeg");
        }
        this.panel_File.OnPickFile = async (file: File) => {

            let b = new Blob([await file.arrayBuffer()]);
            let url = URL.createObjectURL(b);
            let imagedata = await tt.loader.LoadImageDataAsync(url);
            console.log("image size:" + imagedata.width + "," + imagedata.height);
            if (this.tex_preview != null) {
                this.tex_preview.Destory();
            }
            this.tex_preview = new Texture(gl, imagedata.width, imagedata.height, TextureFormat.RGBA32, imagedata.data);
            this.sprite_preview.material.uniformTexs["tex"].value = this.tex_preview;
            this.img_priview.sprite = this.sprite_preview;
            this.img_priview.localRect.setByRect(new Rectangle(0, 0, imagedata.width, imagedata.height));
            //设置内容区域的尺寸
            this.panel_Image.panelWidth = imagedata.width;
            this.panel_Image.panelHeight = imagedata.height;
        };
    }
    async event_open(): Promise<void> {
        await this.panel_File.OpenFolder("documents");
    }

    panel_File: FolderList;
    panel_Image: QUI_Panel_Scroll;
    img_priview: QUI_Image;
    btn_Open: QUI_Button;
    btn_Save: QUI_Button;


    InitUI(): void {
        //let p1 = new QUI_ImageScale9(Resources.GetBorderScale());
        //p1.localRect.SetAsFill();
        //this.guilayer.GetCanvas().AddChild(p1);

        //主split
        let panel1: QUI_Panel = null;
        let panel2: QUI_Panel = null;
        {
            let allpanel = new QUI_Panel_Split();
            allpanel.splitPos = 0.3;
            allpanel.splitSize = 4;
            allpanel.getBorder().XLeft = 2;
            allpanel.getBorder().XRight = 2;
            allpanel.getBorder().YTop = 2;
            allpanel.getBorder().YBottom = 10;
            allpanel.localRect.SetAsFill();
            allpanel.localRect.offsetY1 = 32;

            allpanel.getSplitButton().ElemNormal = QUI_Resource.CreateGUI_Border();
            // new QUI_ImageScale9(Resources.GetBorderScale());
            allpanel.getSplitButton().ElemNormal.localRect.SetAsFill();
            this.guilayer.GetCanvas().AddChild(allpanel);


            //allpanel.borderElement = new QUI_ImageScale9(Resources.GetBorderScale());


            panel1 = new QUI_Panel();//左边面版
            panel1.localRect.SetAsFill();
            //panel1.borderElement = new QUI_ImageScale9(Resources.GetBorderScale());



            allpanel.getPanel1().GetContainer().AddChild(panel1);

            panel2 = new QUI_Panel();
            panel2.localRect.SetAsFill();
            //panel2.borderElement = new QUI_ImageScale9(Resources.GetBorderScale());

            allpanel.getPanel2().GetContainer().AddChild(panel2);
        }
        //初始化文件列表
        {
            let label = new QUI_Label();
            label.text = "FileNames";
            label.localRect.setHPosFill();
            label.localRect.setVPosByTopBorder(16);
            let fs = 16 / label.font.GetFontSize();;
            label.fontScale = new Vector2(fs, fs);

            panel1.GetContainer().AddChild(label);
            this.panel_File = new FolderList();
            this.panel_File.localRect.SetAsFill();
            this.panel_File.localRect.offsetY1 = 16;
            panel1.GetContainer().AddChild(this.panel_File);
        }
        //Open按钮
        this.btn_Open = new QUI_Button();
        (this.btn_Open.elemNormal.GetChild(1) as QUI_Label)
            .text = "打开目录";
        this.btn_Open.localRect.setHPosByLeftBorder(100, 100);
        this.btn_Open.localRect.setVPosByTopBorder(20, 8);
        this.guilayer.GetCanvas().AddChild(this.btn_Open);
        //Save按钮
        this.btn_Save = new QUI_Button();
        (this.btn_Save.elemNormal.GetChild(1) as QUI_Label)
            .text = "保存";
        this.btn_Save.localRect.setHPosByLeftBorder(50, 210);
        this.btn_Save.localRect.setVPosByTopBorder(20, 8);
        this.guilayer.GetCanvas().AddChild(this.btn_Save);
        //PreviewImage
        {
            this.panel_Image = new QUI_Panel_Scroll();
            this.panel_Image.localRect.SetAsFill();
            this.panel_Image.dragDirection = QUI_DragDriection.Both;
            panel2.GetContainer().AddChild(this.panel_Image);
            this.img_priview = new QUI_Image();
            this.img_priview.localRect.SetAsFill();
            this.panel_Image.GetContainer().AddChild(this.img_priview);

        }

    }
    y: number = 64;
    AddLabel(text: string): void {
        let label = new QUI_Label();
        label.text = text;
        this.guilayer.GetCanvas().AddChild(label);
        label.halign = QUI_HAlign.Left;
        label.localRect.setHPosByLeftBorder(196, 16);
        label.localRect.setVPosByTopBorder(16, this.y);

        this.y += 16;
    }
    AddBackButton(): void {
        this.guilayer = new DrawLayer_GUI();
        this.guilayer.GetCamera().Scale = tt.graphic.getDevicePixelRadio() * 2.0;
        GameApp.GetViewList().AddDrawLayer(this.guilayer);
        let btn = new QUI_Button();
        (btn.elemNormal.GetChild(1) as QUI_Label)
            .text = "<--";
        btn.localRect.setHPosByLeftBorder(64, 16);
        btn.localRect.setVPosByTopBorder(20, 8);
        this.guilayer.GetCanvas().AddChild(btn);

        btn.OnClick = () => {
            this.nav.Back();
        }

        this.nav.context.TopUI2Top();
    }


    OnUpdate(delta: number): void {

    }
    OnExit(): void {
        GameApp.GetViewList().RemoveDrawLayers(this.guilayer);

    }
    OnResize(width: number, height: number): void {

    }

    OnKey(keycode: string, press: boolean): void {

    }
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {

    }
}