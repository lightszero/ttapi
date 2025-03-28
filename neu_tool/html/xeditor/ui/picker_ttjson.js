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
import { PickItem } from "./pickitem.js";
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
            let picked = null;
            btn1.OnClick = () => __awaiter(this, void 0, void 0, function* () {
                picked = yield this.OnNewFile(canvas);
            });
            innermenu.AddChild(btn1);
            let btn2 = new QUI_Button();
            btn2.localRect.setBySize(100, 22);
            btn2.SetText("取消");
            innermenu.AddChild(btn2);
            let panelScroll = new QUI_Panel_Scroll();
            btn0.OnClick = () => {
                picked = panelScroll.container.GetPicked().context;
                this.OnPick(canvas, picked);
            };
            btn2.OnClick = () => {
                picked = null;
                this.finish = true;
            };
            group.container.AddChild(panelScroll);
            panelScroll.localRect.offsetY1 = 22;
            let fs = yield Working.FindFile([".tt.json"], 3);
            for (var i = 0; i < fs.length; i++) {
                let con = new PickItem(fs[i]);
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
                let con = new PickItem(null);
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
            let file = yield Working.CreateJsonFile(canvas, txt);
            this.finish = true;
            return file;
        });
    }
}
Picker_TTJson.finish = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyX3R0anNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBpY2tlcl90dGpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBcUIsVUFBVSxFQUFjLGFBQWEsRUFBRSxjQUFjLEVBQThCLFFBQVEsRUFBYyxTQUFTLEVBQWEsV0FBVyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFL1AsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSXpDLE1BQU0sT0FBTyxhQUFhO0lBRXRCLE1BQU0sQ0FBTyxRQUFRLENBQUMsTUFBa0I7O1lBQ3BDLElBQUksU0FBUyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7WUFDcEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUzQixJQUFJLEdBQUcsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUEsSUFBSTtZQUM5QixHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzFCLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEIsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUV6QyxJQUFJLE9BQU8sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUEsTUFBTTtZQUN0QyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTVCLElBQUk7WUFDSixJQUFJLEtBQUssR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1lBQzdCLEtBQUss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