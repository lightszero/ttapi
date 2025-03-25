var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Color, QUI_Button, QUI_Container, QUI_Direction2, QUI_Grow, QUI_Image, QUI_Overlay, QUI_Panel_Scroll, QUI_Window, Resources, tt } from "../../ttlayer2/ttlayer2.js";
import { Working } from "../work/working.js";
import { Dialog_Message } from "./dialog_message.js";
import { PickAbleItem } from "./pickitem.js";
export class Picker_TTJson {
    static ShowPick(canvas) {
        return __awaiter(this, void 0, void 0, function* () {
            let container = new QUI_Container();
            canvas.AddChild(container);
            let img = new QUI_Image(); //背景
            img.localRect.SetAsFill();
            container.AddChild(img);
            img.localColor = new Color(0, 0, 0, 0.5);
            let overlay = new QUI_Overlay(); //事件拦住
            container.AddChild(overlay);
            //分组
            let group = new QUI_Window();
            group.title.text = "选择编辑文件";
            container.AddChild(group);
            group.localRect.offsetX1 = 100;
            group.localRect.offsetY1 = 100;
            group.localRect.offsetX2 = -100;
            group.localRect.offsetY2 = -100;
            let innermenu = new QUI_Grow();
            innermenu.direction = QUI_Direction2.Horizontal;
            group.container.AddChild(innermenu);
            innermenu.localRect.setVPosByTopBorder(22);
            let btn0 = new QUI_Button();
            btn0.localRect.setBySize(100, 22);
            btn0.SetText("打开选中");
            innermenu.AddChild(btn0);
            let btn1 = new QUI_Button();
            btn1.localRect.setBySize(100, 22);
            btn1.SetText("新建 tt.json");
            btn1.OnClick = () => __awaiter(this, void 0, void 0, function* () {
                this.OnNewFile(canvas);
            });
            innermenu.AddChild(btn1);
            let panelScroll = new QUI_Panel_Scroll();
            let picked = null;
            btn0.OnClick = () => {
                picked = panelScroll.container.GetPicked().context;
                this.OnPick(canvas, picked);
            };
            group.container.AddChild(panelScroll);
            panelScroll.localRect.offsetY1 = 22;
            let fs = yield Working.FindFile([".tt.json"], 3);
            for (var i = 0; i < fs.length; i++) {
                let con = new PickAbleItem(fs[i]);
                con.localRect.setBySize(500, 25);
                panelScroll.container.AddChild(con);
                // let ext = TTPathTool.GetExt(result[i].name).toLowerCase();
                // if (ext == ".jpg" || ext == ".png") {
                //     let img = new QUI_Image();
                //     let tex = await this.LoadFileToTexture(result[i]);
                //     con.image.SetByTexture(tex);
                // }
                con.label.text = fs[i].fullname;
            }
            if (fs.length == 0) {
                let con = new PickAbleItem(null);
                con.localRect.setBySize(500, 25);
                panelScroll.container.AddChild(con);
                con.label.text = "Empty";
            }
            panelScroll.container.PickAt(0);
            this.finish = false;
            while (!this.finish) {
                yield tt.sleep(1);
            }
            canvas.RemoveChild(container);
            return picked;
        });
    }
    static OnPick(canvas, item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (item == null) {
                yield Dialog_Message.Show(canvas, "Pick Empty.");
                return;
            }
            this.finish = true;
        });
    }
    static OnNewFile(canvas) {
        return __awaiter(this, void 0, void 0, function* () {
            let txt = yield tt.input.Prompt("输入文件名", "new1.tt.json", 20, Resources.GetDefFont().GetFont());
            console.log("input name:" + txt);
            this.finish = true;
            Working.editfile = yield Working.CreateJsonFile(canvas, txt);
            this.finish = true;
        });
    }
}
Picker_TTJson.finish = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyX3R0anNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBpY2tlcl90dGpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBcUIsVUFBVSxFQUFjLGFBQWEsRUFBRSxjQUFjLEVBQThCLFFBQVEsRUFBYyxTQUFTLEVBQWEsV0FBVyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFL1AsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTdDLE1BQU0sT0FBTyxhQUFhO0lBRXRCLE1BQU0sQ0FBTyxRQUFRLENBQUMsTUFBa0I7O1lBQ3BDLElBQUksU0FBUyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7WUFDcEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUzQixJQUFJLEdBQUcsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUEsSUFBSTtZQUM5QixHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzFCLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEIsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUV6QyxJQUFJLE9BQU8sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUEsTUFBTTtZQUN0QyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTVCLElBQUk7WUFDSixJQUFJLEtBQUssR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1lBQzdCLEtBQUss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