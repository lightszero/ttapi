var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Color, QUI_Button, QUI_Container, QUI_Direction2, QUI_Grow, QUI_Image, QUI_Overlay, QUI_Panel_Scroll, QUI_Window, Texture, TextureFormat, tt } from "../../ttlayer2/ttlayer2.js";
import { FindTool } from "../../xioext/findtool.js";
import { IOExt } from "../../xioext/ioext.js";
import { Working } from "../work/working.js";
import { Dialog_Message } from "./dialog_message.js";
import { CheckItem } from "./pickitem.js";
export class Picker_Image {
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
            btn1.SetText("取消");
            innermenu.AddChild(btn1);
            let panelScroll = new QUI_Panel_Scroll();
            let picked = [];
            btn0.OnClick = () => {
                for (var i = 0; i < panelScroll.container.GetChildCount(); i++) {
                    let item = panelScroll.container.GetChild(i);
                    if (item.checked) {
                        picked.push(item.context);
                    }
                }
                //picked = (panelScroll.container.GetPicked() as CheckItem<IOExt_FileHandle>).context;
                this.OnPick(canvas, picked);
            };
            btn1.OnClick = () => {
                this.finish = true;
            };
            group.container.AddChild(panelScroll);
            panelScroll.localRect.offsetY1 = 22;
            let fs = yield FindTool.FindAllFile(Working.editfile.parent, [".png", ".jpg", ".jpeg"], 3);
            for (var i = 0; i < fs.length; i++) {
                let con = new CheckItem(fs[i]);
                con.localRect.setBySize(500, 25);
                panelScroll.container.AddChild(con);
                //let ext = TTPathTool.GetExt(fs[i].name).toLowerCase();
                //if (ext == ".jpg" || ext == ".png") {
                //let img = new QUI_Image();
                let tex = yield this.LoadFileToTexture(fs[i]);
                con.image.SetByTexture(tex);
                //}
                con.label.text = fs[i].fullname;
            }
            if (fs.length == 0) {
                let con = new CheckItem(null);
                con.localRect.setBySize(500, 25);
                panelScroll.container.AddChild(con);
                con.label.text = "Empty";
            }
            //panelScroll.container.PickAt(0);
            this.finish = false;
            while (!this.finish) {
                yield tt.sleep(1);
            }
            canvas.RemoveChild(container);
            this.FreeTexture();
            return picked;
        });
    }
    static LoadFileToTexture(file) {
        return __awaiter(this, void 0, void 0, function* () {
            let bin = yield IOExt.File_ReadBinary(file);
            let b = new Blob([bin]);
            let texdata = yield tt.loaderex.LoadImageDataAsync(URL.createObjectURL(b));
            let tex = new Texture(tt.graphic.GetWebGL(), texdata.width, texdata.height, TextureFormat.RGBA32, texdata.data);
            this.texs.push(tex);
            return tex;
        });
    }
    static FreeTexture() {
        for (var i = 0; i < this.texs.length; i++) {
            this.texs[i].Destory();
        }
        this.texs = [];
    }
    static OnPick(canvas, picked) {
        return __awaiter(this, void 0, void 0, function* () {
            if (picked == null || picked.length == 0) {
                yield Dialog_Message.Show(canvas, "Pick Empty.");
                return;
            }
            this.finish = true;
        });
    }
}
Picker_Image.finish = false;
Picker_Image.texs = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyX2ltYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlja2VyX2ltYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQXFCLFVBQVUsRUFBYyxhQUFhLEVBQUUsY0FBYyxFQUE4QixRQUFRLEVBQWMsU0FBUyxFQUFhLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLEVBQWEsT0FBTyxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV2UixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxFQUFFLEtBQUssRUFBb0IsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJMUMsTUFBTSxPQUFPLFlBQVk7SUFFckIsTUFBTSxDQUFPLFFBQVEsQ0FBQyxNQUFrQjs7WUFDcEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUNwQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRTNCLElBQUksR0FBRyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQSxJQUFJO1lBQzlCLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDMUIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixHQUFHLENBQUMsVUFBVSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRXpDLElBQUksT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQSxNQUFNO1lBQ3RDLFNB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