var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { QUI_Direction2, QUI_Group, QUI_HAlign, QUI_Label, QUI_Panel_Scroll, QUI_Panel_Split } from "../../ttlayer2/ttlayer2.js";
import { IOExt } from "../../xioext/ioext.js";
import { Working } from "../work/working.js";
import { Dialog_Message } from "./dialog_message.js";
import { PickItem } from "./pickitem.js";
export class Editor_Main {
    static Init(canvas) {
        let split = new QUI_Panel_Split();
        { //root split
            split.splitDir = QUI_Direction2.Horizontal;
            split.splitPos = 0.25;
            split.localRect.SetAsFill();
            split.getBorder().SetZero();
            split.localRect.offsetY1 = 22;
            split.getSplitButton().SetText("");
            split.splitSize = 4;
            split.getPanel1().getBorder().SetZero();
            split.getPanel2().getBorder().SetZero();
            canvas.AddChild(split);
            let split2 = new QUI_Panel_Split();
            split2.getBorder().SetZero();
            split2.splitDir = QUI_Direction2.Horizontal;
            split2.splitPos = 0.66;
            split2.localRect.SetAsFill();
            split2.localRect.offsetY1 = 22;
            split2.getSplitButton().SetText("");
            split2.splitSize = 4;
            split2.getPanel1().getBorder().SetZero();
            split2.getPanel2().getBorder().SetZero();
            this.editTitle = new QUI_Label();
            this.editTitle.localRect.setHPosFill();
            this.editTitle.localRect.setVPosByTopBorder(22);
            this.editTitle.halign = QUI_HAlign.Left;
            this.editTitle.localRect.offsetX1 = 4;
            this.editTitle.text = "当前编辑文件";
            split.getPanel2().container.AddChild(this.editTitle);
            split.getPanel2().container.AddChild(split2);
        }
        {
            let picpanel = new QUI_Group();
            picpanel.title.text = "图片Sprite";
            picpanel.localRect.SetAsFill();
            picpanel.localRect.radioY2 = 0.5;
            this.scrollPic = new QUI_Panel_Scroll();
            picpanel.container.AddChild(this.scrollPic);
            split.getPanel1().container.AddChild(picpanel);
        }
        {
            let anipanel = new QUI_Group();
            anipanel.title.text = "动画Animation";
            anipanel.localRect.SetAsFill();
            anipanel.localRect.radioY1 = 0.5;
            this.scrollAni = new QUI_Panel_Scroll();
            anipanel.container.AddChild(this.scrollAni);
            split.getPanel1().container.AddChild(anipanel);
        }
    }
    static Open(canvas) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Working.editfile == null) {
                yield Dialog_Message.Show(canvas, "没选择文件");
            }
            Working.ttjson = JSON.parse(yield IOExt.File_ReadText(Working.editfile));
            this.editTitle.text = Working.editfile.fullname;
        });
    }
    // 静态方法，用于更新图片
    static UpdatePics() {
        return __awaiter(this, void 0, void 0, function* () {
            this.scrollPic.container.RemoveChildAll();
            for (var key in Working.ttjson.pics) {
                let item = new PickItem(key);
                item.label.text = key;
                //TTPackageMgr.LoadPic(Working.ttjson.pics[key])
                this.scrollPic.container.AddChild(item);
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yX21haW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlZGl0b3JfbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQWMsY0FBYyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFhLGdCQUFnQixFQUFFLGVBQWUsRUFBd0IsTUFBTSw0QkFBNEIsQ0FBQztBQUM5SyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE1BQU0sT0FBTyxXQUFXO0lBS3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBa0I7UUFDMUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUNsQyxDQUFDLENBQUEsWUFBWTtZQUNULEtBQUssQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQztZQUMzQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN0QixLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzVCLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM1QixLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDOUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNuQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNwQixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRXhDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFdkIsSUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUNuQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDN0IsTUFBTSxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDN0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3pDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUV6QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztZQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztZQUMvQixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckQsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUNELENBQUM7WUFDRyxJQUFJLFFBQVEsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQy9CLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQTtZQUNoQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBRS9CLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUNELENBQUM7WUFDRyxJQUFJLFFBQVEsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQy9CLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQTtZQUNuQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBRS9CLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsQ0FBQztJQUNMLENBQUM7SUFDRCxNQUFNLENBQU8sSUFBSSxDQUFDLE1BQWtCOztZQUNoQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQzNCLE1BQU0sY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUNELE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFXLENBQUM7WUFDbkYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFHcEQsQ0FBQztLQUFBO0lBQ0QsY0FBYztJQUNkLE1BQU0sQ0FBTyxVQUFVOztZQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMxQyxLQUFLLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2xDLElBQUksSUFBSSxHQUFHLElBQUksUUFBUSxDQUFTLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7Z0JBQ3RCLGdEQUFnRDtnQkFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLENBQUM7UUFFTCxDQUFDO0tBQUE7Q0FDSiJ9