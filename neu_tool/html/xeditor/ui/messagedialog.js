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
export class MessageDialog {
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
                group.localRect.offsetX1 = 100;
                group.localRect.offsetY1 = 100;
                group.localRect.offsetX2 = -100;
                group.localRect.offsetY2 = -100;
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
MessageDialog.finish = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZWRpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lc3NhZ2VkaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQWMsYUFBYSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQWMsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR25MLE1BQU0sT0FBTyxhQUFhO0lBR3RCLE1BQU0sQ0FBTyxJQUFJLENBQUMsTUFBa0IsRUFBRSxPQUFlOztZQUVqRCxJQUFJLFNBQVMsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1lBQ3BDLENBQUM7Z0JBQ0csTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFM0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQyxDQUFBLElBQUk7Z0JBQzlCLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQzFCLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hCLEdBQUcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBRXpDLElBQUksT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQSxNQUFNO2dCQUN0QyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUU1QixJQUFJLEtBQUssR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO2dCQUM1QixLQUFLLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztnQkFDckIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDNUIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFMUIsSUFBSTtn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