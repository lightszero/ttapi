var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Color, DrawLayer_GUI, DrawLayerTag, GameApp, QUI_Button, QUI_Group, QUI_Image, QUI_Label, QUI_TextBox_Prompt, Rectangle, tt } from "./ttlayer2/ttlayer2.js";
import { ElectronFunc } from "./x_editor/electronfunc.js";
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
        let group = new QUI_Group();
        group.DragEnable = true; //允许拖动
        group.localRect.setByRect(new Rectangle(0, 0, 200, 200));
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
        group2.DragEnable = true; //允许拖动
        group2.localRect.setByRect(new Rectangle(200, 200, 200, 200));
        this.canvas.AddChild(group2);
        let label = new QUI_Label();
        label.localRect.setByPosAndSize(0, 0, 100, 16);
        group2.GetContainer().AddChild(label);
        let txtprompt = new QUI_TextBox_Prompt();
        txtprompt.localRect.setByPosAndSize(0, 20, 100, 20);
        group2.GetContainer().AddChild(txtprompt);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9ybWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXRvcm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBMEIsVUFBVSxFQUFjLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFtQixrQkFBa0IsRUFBRSxTQUFTLEVBQTZCLEVBQUUsRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBQ3BQLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxNQUFNLE9BQU8sT0FBTztJQUVoQixNQUFNO1FBQ0YsSUFBSSxRQUFRLEdBQUcsSUFBSSxhQUFhLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5ELDRCQUE0QjtRQUM1QixFQUFFLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUUxQyxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLENBQUM7UUFFeEMsbUJBQW1CO1FBQ25CLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBRXhDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFbkMsMkNBQTJDO1FBQzNDLCtDQUErQztRQUUvQyw2QkFBNkI7UUFDN0IsMkNBQTJDO1FBQzNDLG1EQUFtRDtRQUVuRCwrQkFBK0I7UUFFL0IscURBQXFEO1FBRXJELDhC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