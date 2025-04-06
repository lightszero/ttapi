// import { Navigator, Color, DrawLayer_GUI, DrawLayerTag, GameApp, IUserLogic, MainScreen, QUI_Button, QUI_Canvas, QUI_Direction2, QUI_Group, QUI_HAlign, QUI_Image, QUI_Label, QUI_Panel, QUI_Panel_Split, QUI_Resource, QUI_TextBox_DOM, QUI_TextBox_Prompt, Rectangle, ResourceOption, Resources, tt, IState, QUI_Menu, QUI_MenuItem, QUI_Window } from "../../ttlayer2/ttlayer2.js"


// import { Menu_Main } from "./ui/menu_main.js";
// import { Editor_Main } from "./ui/editor_main.js";



// export class MainLogic implements IUserLogic {

//     canvas: QUI_Canvas;

//     fps_txt: QUI_Label;

//     OnInit(): void {
//         let guilayer = new DrawLayer_GUI();

//         //这个设为1就会强行点对点，忽略windows 缩放
//         tt.graphic.setMainScreenScale(1);

//         let pr = tt.graphic.getDevicePixelRadio();//得到windows 缩放

//         let scaleradio = pr * 1.5;//windows多大我多大 (pr | 0)*2 ;//比windows大两倍
//         console.log("ScaleRadio=" + scaleradio);

//         //改Camera的缩放会直接缩放内容
//         guilayer.GetCamera().Scale = scaleradio;

//         GameApp.GetViewList().AddDrawLayer(guilayer);


//         //初始化canvas 和 fps
//         this.canvas = guilayer.GetCanvas();

//         this.fps_txt = new QUI_Label();
//         this.fps_txt.localRect.setHPosByRightBorder(100);
//         this.fps_txt.localRect.setVPosByTopBorder(20, 0);
//         this.fps_txt.localColor = new Color(0.9, 0.8, 0.3, 1);
//         this.canvas.AddChild(this.fps_txt);


//         Menu_Main.Init(this.canvas);
//         Editor_Main.Init(this.canvas);



//     }

//     timer: number = 0;
//     framecount: number = 0;
//     OnUpdate(delta: number): void {
//         this.timer += delta;
//         this.framecount++;
//         if (this.timer > 1.0) {
//             let fps = (this.framecount / this.timer * 100) | 0;
//             this.framecount = 0;
//             this.timer = 0;

//             let fps_l = (fps % 100);
//             let fps_h = (fps / 100) | 0;
//             let fpsstr_h = fps_h.toString();
//             while (fpsstr_h.length < 3)
//                 fpsstr_h = "0" + fpsstr_h;
//             let fpsstr_l = fps_l.toString();
//             while (fpsstr_l.length < 2)
//                 fpsstr_l += "0";
//             let fpsstr = fpsstr_h + "." + fpsstr_l;
//             this.fps_txt.text = "fps=" + fpsstr;
//         }


//     }
//     OnExit(): void {

//     }
//     OnResize(width: number, height: number): void {

//     }

//     OnKey(keycode: string, press: boolean): void {

//     }
//     OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {

//     }
//     OnWheelAfterGUI(dx: number, dy: number, dz: number): void {

//     }

// }
