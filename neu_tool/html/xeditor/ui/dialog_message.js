var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Color, QUI_Button, QUI_Container, QUI_Direction2, QUI_Grow, QUI_Image, QUI_Label, QUI_Overlay, QUI_Window, tt } from "../../ttlayer2/ttlayer2.js";
export class Dialog_Message {
    static Show(canvas, message) {
        return __awaiter(this, void 0, void 0, function* () {
            let container = new QUI_Container();
            {
                canvas.AddChild(container);
                let img = new QUI_Image(); //背景
                img.localRect.SetAsFill();
                container.AddChild(img);
                img.localColor = new Color(0, 0, 0, 0.5);
                let overlay = new QUI_Overlay(); //事件拦住
                container.AddChild(overlay);
                let label = new QUI_Label();
                label.text = message;
                label.localRect.SetAsFill();
                container.AddChild(label);
                //分组
                let group = new QUI_Window();
                group.title.text = "信息";
                container.AddChild(group);
                group.localRect.offsetX1 = 120;
                group.localRect.offsetY1 = 120;
                group.localRect.offsetX2 = -120;
                group.localRect.offsetY2 = -120;
                let innermenu = new QUI_Grow();
                innermenu.direction = QUI_Direction2.Horizontal;
                group.container.AddChild(innermenu);
                innermenu.localRect.setVPosByBottomBorder(22);
                let btn0 = new QUI_Button();
                btn0.localRect.setBySize(100, 22);
                btn0.SetText("关闭");
                btn0.OnClick = () => {
                    this.finish = true;
                };
                innermenu.AddChild(btn0);
                let grow = new QUI_Grow();
                group.container.AddChild(grow);
                grow.direction = QUI_Direction2.Vertical;
                grow.localRect.SetAsFill();
                grow.localRect.offsetY2 = -22;
                let lines = message.split("\n");
                let width = canvas.GetWorldRect().Width - 200;
                for (var i = 0; i < lines.length; i++) {
                    let label = new QUI_Label();
                    label.text = lines[i];
                    label.localRect.setBySize(width, 16);
                    //label.halign = QUI_HAlign.Left;
                    grow.AddChild(label);
                }
            }
            this.finish = false;
            while (!this.finish) {
                yield tt.sleep(1);
            }
            canvas.RemoveChild(container);
        });
    }
}
Dialog_Message.finish = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nX21lc3NhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWFsb2dfbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBYyxhQUFhLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBYyxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHbkwsTUFBTSxPQUFPLGNBQWM7SUFHdkIsTUFBTSxDQUFPLElBQUksQ0FBQyxNQUFrQixFQUFFLE9BQWU7O1lBRWpELElBQUksU0FBUyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7WUFDcEMsQ0FBQztnQkFDRyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUUzQixJQUFJLEdBQUcsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUEsSUFBSTtnQkFDOUIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDMUIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEIsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFFekMsSUFBSSxPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQyxDQUFBLE1BQU07Z0JBQ3RDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBRTVCLElBQUksS0FBSyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7Z0JBQzVCLEtBQUssQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO2dCQUNyQixLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUM1QixTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUUxQixJQUFJO2dCQUNKLElBQUksS0FBSyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7Z0JBQzdCLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtnQkFDdkIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO2dCQUMvQixLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7Z0JBQy9CLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDO2dCQUNoQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQTtnQkFFL0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztnQkFDL0IsU0FBUyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDO2dCQUNoRCxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDcEMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFOUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRTtvQkFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQTtnQkFDRCxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUV6QixJQUFJLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUMxQixLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDO2dCQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFFOUIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7Z0JBQzlDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ3BDLElBQUksS0FBSyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7b0JBQzVCLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QixLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3JDLGlDQUFpQztvQkFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIsQ0FBQztZQUVMLENBQUM7WUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNsQixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsQ0FBQztZQUNELE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEMsQ0FBQztLQUFBOztBQWhFTSxxQkFBTSxHQUFZLEtBQUssQ0FBQyJ9