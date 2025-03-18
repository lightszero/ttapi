import { Navigator, Color, DrawLayer_GUI, DrawLayerTag, GameApp, QUI_Container, QUI_Label, Rectangle, tt } from "../ttlayer2/ttlayer2.js";
import { FileGroup } from "./filegroup.js";
export class NavState_Begin {
    constructor() {
        this.init = false;
    }
    OnInit(mgr) {
        this.app = mgr;
        this.container = new QUI_Container();
        mgr.canvas.AddChild(this.container);
        let group = this.fileGroup = new FileGroup();
        group.resizeEnable = true;
        group.dragEnable = true; //允许拖动
        let r = mgr.canvas.GetWorldRect();
        group.localRect.setByRect(new Rectangle(100, 100, 400, 300));
        this.container.AddChild(group);
        //加到一个canvas 上是一个办法
    }
    OnUpdate(delta) {
        if (!this.init && this.app.canvas.target != null) {
            let r = this.app.canvas.GetWorldRect();
            this.fileGroup.localRect.setByPosAndSize(150, 100, r.Width - 300, r.Height - 200);
            this.init = true;
        }
    }
    OnExit() {
        this.app.canvas.RemoveChild(this.container);
    }
    OnResize(width, height) {
    }
    OnKey(keycode, press) {
    }
    OnPointAfterGUI(id, x, y, press, move) {
    }
}
export class MyLogic extends Navigator {
    constructor() {
        super(...arguments);
        this.timer = 0;
        this.framecount = 0;
    }
    OnInit() {
        let guilayer = new DrawLayer_GUI(DrawLayerTag.GUI);
        //改动这个会影响canvas size，会造成不点对点
        tt.graphic.setMainScreenScale(1);
        let pr = tt.graphic.getDevicePixelRadio();
        let scaleradio = (pr * 2) | 0;
        console.log("ScaleRadio=" + scaleradio);
        //改Camera的缩放会直接缩放内容
        guilayer.GetCamera().Scale = scaleradio;
        GameApp.GetViewList().AddDrawLayer(guilayer);
        //初始化canvas 和 fps
        this.canvas = guilayer.GetCanvas();
        this.fps_txt = new QUI_Label();
        this.fps_txt.localRect.setHPosByRightBorder(100);
        this.fps_txt.localRect.setVPosByTopBorder(20, 0);
        this.fps_txt.localColor = new Color(0.9, 0.8, 0.3, 1);
        this.canvas.AddChild(this.fps_txt);
        //导航到第一个状态
        this.Push(new NavState_Begin());
        // let group2 = new QUI_Group();
        // group2.dragEnable = true;//允许拖动
        // group2.localRect.setByRect(new Rectangle(200, 200, 200, 200));
        // this.canvas.AddChild(group2);
        // let grow = new QUI_Grow();
        // grow.direction = QUI_Direction2.Vertical;
        // group2.GetContainer().AddChild(grow);
        // let label = new QUI_Label();
        // label.localRect.setBySize(100, 16);
        // grow.AddChild(label);
        // let txtprompt = new QUI_TextBox_Prompt();
        // txtprompt.localRect.setBySize(100, 20);
        // grow.AddChild(txtprompt);
        // let txtdom = new QUI_TextBox_DOM();
        // txtdom.localRect.setBySize(100, 20);
        // grow.AddChild(txtdom);
    }
    OnUpdate(delta) {
        this.timer += delta;
        this.framecount++;
        if (this.timer > 1.0) {
            let fps = (this.framecount / this.timer * 100) | 0;
            this.framecount = 0;
            this.timer = 0;
            let fps_l = (fps % 100);
            let fps_h = (fps / 100) | 0;
            let fpsstr_h = fps_h.toString();
            while (fpsstr_h.length < 3)
                fpsstr_h = "0" + fpsstr_h;
            let fpsstr_l = fps_l.toString();
            while (fpsstr_l.length < 2)
                fpsstr_l += "0";
            let fpsstr = fpsstr_h + "." + fpsstr_l;
            this.fps_txt.text = "fps=" + fpsstr;
        }
        let state = this.GetLast();
        state === null || state === void 0 ? void 0 : state.OnUpdate(delta);
    }
    OnExit() {
    }
    OnResize(width, height) {
        let state = this.GetLast();
        state === null || state === void 0 ? void 0 : state.OnResize(width, height);
    }
    OnKey(keycode, press) {
        let state = this.GetLast();
        state === null || state === void 0 ? void 0 : state.OnKey(keycode, press);
    }
    OnPointAfterGUI(id, x, y, press, move) {
        let state = this.GetLast();
        state === null || state === void 0 ? void 0 : state.OnPointAfterGUI(id, x, y, press, move);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9ybWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXRvcm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQWtELGFBQWEsRUFBb0QsU0FBUyxFQUFpRixTQUFTLEVBQTZCLEVBQUUsRUFBVSxNQUFNLHlCQUF5QixDQUFBO0FBRTdWLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUkzQyxNQUFNLE9BQU8sY0FBYztJQUEzQjtRQUlJLFNBQUksR0FBWSxLQUFLLENBQUM7SUFzQzFCLENBQUM7SUFyQ0csTUFBTSxDQUFDLEdBQVk7UUFFZixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUNyQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFcEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQzdDLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQzFCLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUEsTUFBTTtRQUM5QixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBR2xDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFL0IsbUJBQW1CO0lBQ3ZCLENBQUM7SUFDRCxRQUFRLENBQUMsS0FBYTtRQUNsQixJ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