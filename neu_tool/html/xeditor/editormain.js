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
        let scaleradio = 3; // (pr * ) | 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9ybWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXRvcm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQWtELGFBQWEsRUFBb0QsU0FBUyxFQUFpRixTQUFTLEVBQTZCLEVBQUUsRUFBVSxNQUFNLHlCQUF5QixDQUFBO0FBRTdWLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUkzQyxNQUFNLE9BQU8sY0FBYztJQUEzQjtRQUlJLFNBQUksR0FBWSxLQUFLLENBQUM7SUFzQzFCLENBQUM7SUFyQ0csTUFBTSxDQUFDLEdBQVk7UUFFZixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUNyQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFcEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQzdDLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQzFCLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUEsTUFBTTtRQUM5QixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBR2xDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFL0IsbUJBQW1CO0lBQ3ZCLENBQUM7SUFDRCxRQUFRLENBQUMsS0FBYTtRQUNsQixJ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QUNsQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDMUIsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNELEtBQUssQ0FBQyxPQUFlLEVBQUUsS0FBYztRQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDMUIsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNELGVBQWUsQ0FBQyxFQUFVLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFjLEVBQUUsSUFBYTtRQUMzRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDMUIsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLGVBQWUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztDQUVKIn0=