import { tt } from "../../ttapi/ttapi.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, QUI_Panel_Split, QUI_ImageScale9, QUI_Panel_Scroll_Unlimit, QUI_IElement, QUI_Label } from "../../ttlayer2/ttlayer2.js";
import { GContext } from "../ttstate_all.js";

export class Tool_TexPack implements IState<Navigator<GContext>> {
    nav: Navigator<GContext>;
    guilayer: DrawLayer_GUI;

    OnInit(nav: Navigator<GContext>): void {
        if (this.nav == null) {
            this.nav = nav;
        }






        this.AddBackButton();

        let gl = tt.graphic.GetWebGL();
        this.InitUI();
        for (let i = 0; i < 100; i++) {
            this.panel_File.getItems().push("aasdfsdf:" + i);
        }
    }
    panel_File: QUI_Panel_Scroll_Unlimit<string>;
    updateFileElem(text: string, elem: QUI_IElement, index: number, pick: boolean): QUI_IElement {
        if (elem == null)
            elem = new QUI_Label(Resources.GetDefFont(), text);
        let label = elem as QUI_Label;
        label.text = text;
        let fs = 16 / label.font.GetFontSize();;
        label.fontScale = new Vector2(fs, fs);
        label.localRect.setVPosByTopBorder(16, 0);
        label.localRect.setHPosFill(4,4);
        label.halign= QUI_HAlign.Left;
        return elem;
    }
    InitUI(): void {
        //let p1 = new QUI_ImageScale9(Resources.GetBorderScale());
        //p1.localRect.setAsFill();
        //this.guilayer.GetCanvas().addChild(p1);

        //主split


        let allpanel = new QUI_Panel_Split();
        allpanel.splitPos = 0.3;
        allpanel.splitSize = 4;
        allpanel.getBorder().XLeft = 2;
        allpanel.getBorder().XRight = 2;
        allpanel.getBorder().YTop = 2;
        allpanel.getBorder().YBottom = 10;
        allpanel.localRect.setAsFill();
        allpanel.localRect.offsetY1 = 32;

        allpanel.getSplitButton().ElemNormal = new QUI_ImageScale9(Resources.GetBorderScale());
        allpanel.getSplitButton().ElemNormal.localRect.setAsFill();
        this.guilayer.GetCanvas().addChild(allpanel);


        allpanel.borderElement = new QUI_ImageScale9(Resources.GetBorderScale());


        let panel1 = new QUI_Panel();//左边面版
        panel1.localRect.setAsFill();
        panel1.borderElement = new QUI_ImageScale9(Resources.GetBorderScale());

 

        allpanel.getPanel1().addChild(panel1);

        let panel2 = new QUI_Panel();
        panel2.localRect.setAsFill();
        panel2.borderElement = new QUI_ImageScale9(Resources.GetBorderScale());

        allpanel.getPanel2().addChild(panel2);


        let label = new QUI_Label(Resources.GetDefFont(), "FileNames");
        label.localRect.setHPosFill();
        label.localRect.setVPosByTopBorder(16);
        let fs = 16 / label.font.GetFontSize();;
        label.fontScale = new Vector2(fs, fs);

        panel1.addChild(label);
        this.panel_File = new QUI_Panel_Scroll_Unlimit<string>(
            this.updateFileElem.bind(this)
        );
        this.panel_File.localRect.setAsFill();
        this.panel_File.localRect.offsetY1 = 16;
        panel1.addChild(this.panel_File);
    }
    y: number = 64;
    AddLabel(text: string): void {
        let label = Resources.CreateGUI_Label(text);
        this.guilayer.GetCanvas().addChild(label);
        label.halign = QUI_HAlign.Left;
        label.localRect.setHPosByLeftBorder(196, 16);
        label.localRect.setVPosByTopBorder(16, this.y);

        this.y += 16;
    }
    AddBackButton(): void {
        this.guilayer = new DrawLayer_GUI();
        this.guilayer.GetCamera().Scale = tt.graphic.getDevicePixelRadio() * 2.0;
        GameApp.GetViewList().AddDrawLayers(this.guilayer);
        let btn = Resources.CreateGUI_Button("<--", new Color(1, 1, 1, 1));
        btn.localRect.setHPosByLeftBorder(196, 16);
        btn.localRect.setVPosByTopBorder(20, 8);
        this.guilayer.GetCanvas().addChild(btn);

        btn.OnClick = () => {
            this.nav.Back();
        }

        this.nav.GetContextObj().TopUI2Top();
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