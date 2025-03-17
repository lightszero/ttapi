var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Color, DrawLayer_GUI, DrawLayerTag, GameApp, QUI_Button, QUI_Direction2, QUI_Group, QUI_HAlign, QUI_Image, QUI_Label, QUI_Panel, QUI_TextBox_DOM, QUI_TextBox_Prompt, Rectangle, tt } from "../ttlayer2/ttlayer2.js";
import { QUI_Grow } from "../ttlayer2/ttui/ext/qui_grow.js";
import { IOExt } from "./twoenv.js";
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
            let folder = yield IOExt.Picker_Folder();
            let files = yield IOExt.Directory_List(folder);
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
                let r = yield IOExt.Picker_OpenFile();
                if (r != null)
                    this.OnOpenFile(r);
            });
        }
        {
            let btn = new QUI_Button();
            btn.localRect.setBySize(60, 18);
            let label = btn.elemNormal.AsContainer().GetChild(1);
            label.text = "New";
            titlegrow.AddChild(btn);
            btn.OnClick = () => __awaiter(this, void 0, void 0, function* () {
                let r = yield IOExt.Picker_SaveFile();
                if (r != null)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9ybWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXRvcm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBMEIsVUFBVSxFQUE2QixjQUFjLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBaUMsZUFBZSxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBNkIsRUFBRSxFQUFFLE1BQU0seUJBQXlCLENBQUE7QUFDMVUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzVELE9BQU8sRUFBRSxLQUFLLEVBQTJDLE1BQU0sYUFBYSxDQUFBO0FBQzVFLE1BQU0sT0FBTyxPQUFPO0lBSWhCLE1BQU07UUFDRixJQUFJLFFBQVEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkQsNEJBQTRCO1FBQzVCLEVBQUUsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRTFDLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsQ0FBQztRQUV4QyxtQkFBbUI7UUFDbkIsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFFeEMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVuQywyQ0FBMkM7UUFD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