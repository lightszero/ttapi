var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Color, DrawLayer_GUI, DrawLayerTag, GameApp, QUI_Button, QUI_Group, QUI_Image, Rectangle, tt } from "./ttlayer2/ttlayer2.js";
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
        this.canvas.GetContainer().AddChild(group);
        let img = new QUI_Image();
        img.localColor = new Color(0.8, 0.6, 0.3, 1);
        group.GetContainer().AddChild(img);
        let btn = new QUI_Button();
        let btnlabel = btn.elemNormal.GetContainer().GetChild(1);
        btnlabel.text = "Open";
        btn.localRect.offsetY1 += 132;
        btn.localRect.offsetY2 += 132;
        btn.OnClick = () => __awaiter(this, void 0, void 0, function* () {
            let files = yield ElectronFunc.Instance.dialog_openfile(null);
            console.log(JSON.stringify(files));
        });
        group.GetContainer().AddChild(btn);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9ybWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXRvcm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBMEIsVUFBVSxFQUFjLFNBQVMsRUFBRSxTQUFTLEVBQThCLFNBQVMsRUFBNkIsRUFBRSxFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFDaE8sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE1BQU0sT0FBTyxPQUFPO0lBRWhCLE1BQU07UUFDRixJQUFJLFFBQVEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkQsNEJBQTRCO1FBQzVCLEVBQUUsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRTFDLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsQ0FBQztRQUV4QyxtQkFBbUI7UUFDbkIsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFFeEMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVuQywyQ0FBMkM7UUFDM0MsK0NBQStDO1FBRS9DLDZCQUE2QjtRQUM3QiwyQ0FBMkM7UUFDM0MsbURBQW1EO1FBRW5ELCtCQUErQjtRQUUvQixxREFBcUQ7UUFFckQsOEJBQThCO1FBQzlCLGdDQUFnQztRQUNoQyxnQ0FBZ0M7UUFDaEMsbURBQW1EO1FBRW5ELElBQUksS0FBSyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDNUIsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBQzlCLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFHM0MsSUFBSSxHQUFHLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUMxQixHQUFHLENBQUMsVUFBVSxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkMsSUFBSSxHQUFHLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUMzQixJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQWMsQ0FBQTtRQUNyRSxRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUN2QixHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUM7UUFDOUIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsR0FBUyxFQUFFO1lBQ3JCLElBQUksS0FBSyxHQUFHLE1BQU0sWUFBWSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFBLENBQUE7UUFDRCxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxRQUFRLENBQUMsS0FBYTtJQUV0QixDQUFDO0lBQ0QsTUFBTTtJQUVOLENBQUM7SUFDRCxRQUFRLENBQUMsS0FBYSxFQUFFLE1BQWM7SUFFdEMsQ0FBQztJQUNELEtBQUssQ0FBQyxPQUFlLEVBQUUsS0FBYztJQUVyQyxDQUFDO0lBQ0QsZUFBZSxDQUFDLEVBQVUsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWMsRUFBRSxJQUFhO0lBRS9FLENBQUM7Q0FFSiJ9