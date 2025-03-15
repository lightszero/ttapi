import { Color, DrawLayer_GUI, DrawLayerTag, GameApp, QUI_Button, QUI_Group, QUI_Image, Rectangle, tt } from "./ttlayer2/ttlayer2.js";
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
        btn.localRect.offsetY1 += 132;
        btn.localRect.offsetY2 += 132;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9ybWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXRvcm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBMEIsVUFBVSxFQUFjLFNBQVMsRUFBRSxTQUFTLEVBQThCLFNBQVMsRUFBNkIsRUFBRSxFQUFFLE1BQU0sd0JBQXdCLENBQUE7QUFFaE8sTUFBTSxPQUFPLE9BQU87SUFFaEIsTUFBTTtRQUNGLElBQUksUUFBUSxHQUFHLElBQUksYUFBYSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVuRCw0QkFBNEI7UUFDNUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFMUMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxDQUFDO1FBRXhDLG1CQUFtQjtRQUNuQixRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztRQUV4QyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRW5DLDJDQUEyQztRQUMzQywrQ0FBK0M7UUFFL0MsNkJBQTZCO1FBQzdCLDJDQUEyQztRQUMzQyxtREFBbUQ7UUFFbkQsK0JBQStCO1FBRS9CLHFEQUFxRDtRQUVyRCw4QkFBOEI7UUFDOUIsZ0NBQWdDO1FBQ2hDLGdDQUFnQztRQUNoQyxtREFBbUQ7UUFFbkQsSUFBSSxLQUFLLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUM1QixLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFBLE1BQU07UUFDOUIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUczQyxJQUFJLEdBQUcsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQzFCLEdBQUcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVuQyxJQUFJLEdBQUcsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQztRQUM5QixHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUM7UUFFOUIsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsUUFBUSxDQUFDLEtBQWE7SUFFdEIsQ0FBQztJQUNELE1BQU07SUFFTixDQUFDO0lBQ0QsUUFBUSxDQUFDLEtBQWEsRUFBRSxNQUFjO0lBRXRDLENBQUM7SUFDRCxLQUFLLENBQUMsT0FBZSxFQUFFLEtBQWM7SUFFckMsQ0FBQztJQUNELGVBQWUsQ0FBQyxFQUFVLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFjLEVBQUUsSUFBYTtJQUUvRSxDQUFDO0NBRUoifQ==