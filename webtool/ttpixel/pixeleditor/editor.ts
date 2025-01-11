import { tt } from "../ttapi/ttapi.js";
import { Color, DrawLayer_GUI, GameApp, IUserLogic, MainScreen, QUI_Canvas, QUI_Container, QUI_Container_AutoFill, QUI_HAlign, QUI_Image, QUI_JoyStick, QUI_Panel, QUI_VAlign, Rectangle, Resources, Vector2 } from "../ttlayer2/ttlayer2.js";
import { UI_HelpDialog } from "./ui_dialog/ui_helpdialog.js";
import { UI_MainMenu } from "./ui_dialog/ui_mainmenu.js";
import { UI_Main } from "./ui_main/ui_main.js";
import { UI_Canvas } from "./ui_pixeleditor/ui_canvas.js";
import { UI_PixelEditor } from "./ui_pixeleditor/ui_pixeleditor.js";

export class EditorApp implements IUserLogic {

    OnInit(): void {

        this.InitAsync();
    }
    layergui: DrawLayer_GUI;
    ui_editor: UI_PixelEditor;
    async InitAsync() {
        //配置绘制层
        this.layergui = new DrawLayer_GUI();
        GameApp.GetViewList().AddDrawLayer(this.layergui);
        this.layergui.GetCamera().Scale = 2.0 * tt.graphic.getDevicePixelRadio();//增加像素感
        //this.layergui.GetCanvas().scale =2.0;//增加像素感


        //主要区域限制比例
        let root = new QUI_Container_AutoFill();
        root.setAsp(9 / 16, 2 / 3);

        this.layergui.GetCanvas().addChild(root);


        {//初始化新的入口，像素编辑只是其中一个模块
            let main = new UI_Main();
            main.localRect.setAsFill();
            root.addChild(main);
            return;
        }
        {//初始化绘制区域,用悬浮式设计
            // let editorContainer = new QUI_Container();
            // editorContainer.localRect.setAsFill();
            // editorContainer.localRect.radioY1 = 0.15;
            // root.addChild(editorContainer);
            {
                this.ui_editor = new UI_PixelEditor();
                this.ui_editor.localRect.setAsFill();
                root.addChild(this.ui_editor);
            }
        }


        //初始化标题栏，固定
        {
            let header = new QUI_Container();
            header.localRect.setAsFill();
            header.localRect.radioY2 = 0.08;

            root.addChild(header);
            {//初始化标题栏按钮

                let btnmenu = Resources.CreateGUI_Button("Menu");
                header.addChild(btnmenu);
                btnmenu.localRect.setHPosByLeftBorder(36, 8);
                btnmenu.localRect.setVPosByCenter(20);
                btnmenu.OnPressDown = (id) => {
                    UI_MainMenu.Show(root, id, this.ui_editor);
                }
                let btnhelp = Resources.CreateGUI_Button("?");
                header.addChild(btnhelp);
                btnhelp.localRect.setHPosByRightBorder(20, 8);
                btnhelp.localRect.setVPosByCenter(20);
                btnhelp.OnPressDown = (id) => {

                    UI_HelpDialog.Show(root, id);
                }
            }
        }



    }


    OnUpdate(delta: number): void {

        //throw new Error("Method not implemented.");

    }
    OnExit(): void {
        //throw new Error("Method not implemented.");
    }
    OnResize(width: number, height: number): void {
        //throw new Error("Method not implemented.");
    }
    OnKey(keycode: string, press: boolean): void {
        // throw new Error("Method not implemented.");
    }
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {
        //throw new Error("Method not implemented.");
    }

}