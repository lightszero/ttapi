var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { tt } from "../ttapi/ttapi.js";
import { Color, DrawLayer_GUI, GameApp, Resources } from "../ttlayer2/ttlayer2.js";
import { HelpDialog } from "./helpdialog.js";
export class EditorApp {
    OnInit() {
        this.InitAsync();
    }
    InitAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            //配置绘制层
            this.layergui = new DrawLayer_GUI();
            GameApp.GetViewList().AddDrawLayer(this.layergui);
            this.layergui.GetCamera().Scale = 2.0 * tt.graphic.getDevicePixelRadio(); //增加像素感
            //this.layergui.GetCanvas().scale =2.0;//增加像素感
            this.guicanvas = this.layergui.GetCanvas();
            let border = Resources.CreateGUI_Border();
            this.guicanvas.addChild(border);
            let btn = Resources.CreateGUI_Button("Help", new Color(1, 1, 1, 1));
            btn.localRect.setVPosByTopBorder(20, 8);
            btn.localRect.setHPosByLeftBorder(100, 100);
            this.guicanvas.addChild(btn);
            btn.OnClick = () => {
                HelpDialog.Show(this.guicanvas);
                console.log("show");
            };
        });
    }
    OnUpdate(delta) {
        //throw new Error("Method not implemented.");
    }
    OnExit() {
        //throw new Error("Method not implemented.");
    }
    OnResize(width, height) {
        //throw new Error("Method not implemented.");
    }
    OnKey(keycode, press) {
        // throw new Error("Method not implemented.");
    }
    OnPointAfterGUI(id, x, y, press, move) {
        //throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN2QyxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQTBCLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNHLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxNQUFNLE9BQU8sU0FBUztJQUVsQixNQUFNO1FBRUYsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFHSyxTQUFTOztZQUNYLE9BQU87WUFDUCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7WUFDcEMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFBLE9BQU87WUFDaEYsOENBQThDO1lBRTlDLElBQUksQ0FBQyxTQUFTLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMxQyxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVoQyxJQUFJLEdBQUcsR0FBRSxTQUFTLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFDLElBQUksS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0QsR0FBRyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsR0FBRyxDQUFDLE9BQU8sR0FBQyxHQUFFLEVBQUU7Z0JBRVosVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEIsQ0FBQyxDQUFDO1FBQ04sQ0FBQztLQUFBO0lBQ0QsUUFBUSxDQUFDLEtBQWE7UUFDbEIsNkNBQTZDO0lBQ2pELENBQUM7SUFDRCxNQUFNO1FBQ0YsNkNBQTZDO0lBQ2pELENBQUM7SUFDRCxRQUFRLENBQUMsS0FBYSxFQUFFLE1BQWM7UUFDbEMsNkNBQTZDO0lBQ2pELENBQUM7SUFDRCxLQUFLLENBQUMsT0FBZSxFQUFFLEtBQWM7UUFDakMsOENBQThDO0lBQ2xELENBQUM7SUFDRCxlQUFlLENBQUMsRUFBVSxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsS0FBYyxFQUFFLElBQWE7UUFDM0UsNkNBQTZDO0lBQ2pELENBQUM7Q0FFSiJ9