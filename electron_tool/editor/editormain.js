var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Color, DrawLayer_GUI, DrawLayerTag, GameApp, QUI_Button, QUI_Direction2, QUI_Group, QUI_HAlign, QUI_Image, QUI_Label, QUI_Panel, QUI_TextBox_DOM, QUI_TextBox_Prompt, Rectangle, tt } from "./ttlayer2/ttlayer2.js";
import { QUI_Grow } from "./ttlayer2/ttui/ext/qui_grow.js";
import { ElectronFunc, FileFilter, OpenFileOption } from "./x_editor/electronfunc.js";
export class MyLogic {
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
        group.dragEnable = true; //允许拖动
        group.localRect.setByRect(new Rectangle(0, 50, 200, 200));
        this.canvas.AddChild(group);
        let img = new QUI_Image();
        img.localColor = new Color(0.8, 0.6, 0.3, 1);
        group.GetContainer().AddChild(img);
        let btn = new QUI_Button();
        let btnlabel = btn.elemNormal.AsContainer().GetChild(1);
        btnlabel.text = "Open";
        btn.localRect.offsetY1 += 132;
        btn.localRect.offsetY2 += 132;
        btn.OnClick = () => __awaiter(this, void 0, void 0, function* () {
            let files = yield ElectronFunc.Instance.dialog_openfile(null);
            console.log(JSON.stringify(files));
        });
        group.GetContainer().AddChild(btn);
        let group2 = new QUI_Group();
        group2.dragEnable = true; //允许拖动
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
            let label = btn.elemNormal.AsContainer().GetChild(1);
            label.text = "Open";
            titlegrow.AddChild(btn);
            btn.OnClick = () => __awaiter(this, void 0, void 0, function* () {
                let op = new OpenFileOption();
                op.multiSelect = false;
                op.filters = [];
                op.filters.push(new FileFilter());
                op.filters[0].name = "TT.JSON";
                op.filters[0].extensions = ["tt.json"];
                let r = yield ElectronFunc.Instance.dialog_openfile(op);
                if (r != null && r.length > 0)
                    this.OnOpenFile(r[0]);
            });
        }
        {
            let btn = new QUI_Button();
            btn.localRect.setBySize(60, 18);
            let label = btn.elemNormal.AsContainer().GetChild(1);
            label.text = "New";
            titlegrow.AddChild(btn);
            btn.OnClick = () => __awaiter(this, void 0, void 0, function* () {
                let filter = new FileFilter();
                filter.name = "TT.JSON";
                filter.extensions = ["tt.json"];
                let r = yield ElectronFunc.Instance.dialog_savefile([filter]);
                if (r != null || r != "")
                    this.OnSaveFile(r);
            });
        }
        {
            let btn = new QUI_Button();
            btn.localRect.setBySize(60, 18);
            let label = btn.elemNormal.AsContainer().GetChild(1);
            label.text = "Save";
            titlegrow.AddChild(btn);
        }
        {
            let label = this.titlebar_txt = new QUI_Label();
            label.text = "当前没有打开tt.json";
            label.localRect.setBySize(200, 18);
            label.halign = QUI_HAlign.Left;
            titlegrow.AddChild(label);
        }
    }
    OnOpenFile(file) {
        console.log("OnOpenFile:" + file);
    }
    OnSaveFile(file) {
        console.log("OnCreateFile:" + file);
    }
    OnUpdate(delta) {
    }
    OnExit() {
    }
    OnResize(width, height) {
    }
    OnKey(keycode, press) {
    }
    OnPointAfterGUI(id, x, y, press, move) {
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9ybWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXRvcm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBMEIsVUFBVSxFQUE2QixjQUFjLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBaUMsZUFBZSxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBNkIsRUFBRSxFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFDelUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RGLE1BQU0sT0FBTyxPQUFPO0lBSWhCLE1BQU07UUFDRixJQUFJLFFBQVEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkQsNEJBQTRCO1FBQzVCLEVBQUUsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRTFDLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsQ0FBQztRQUV4QyxtQkFBbUI7UUFDbkIsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFFeEMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLEVBQUUs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