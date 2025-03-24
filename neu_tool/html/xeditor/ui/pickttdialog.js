var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Color, QUI_BaseContainer, QUI_Button, QUI_Container, QUI_Direction2, QUI_ElementType, QUI_Grow, QUI_HAlign, QUI_Image, QUI_Label, QUI_Overlay, QUI_Panel_Scroll, QUI_Window, Resources, tt } from "../../ttlayer2/ttlayer2.js";
import { WorkingDir } from "../work/workingdir.js";
export class PickAble_FileItem extends QUI_BaseContainer {
    constructor() {
        super();
        this.filehandle = null;
        let ol = new QUI_Overlay();
        this.AddChild(ol);
        ol.OnPress = () => {
            this._parent.Pick(this);
        };
        // let ext = TTPathTool.GetExt(result[i].name).toLowerCase();
        // if (ext == ".jpg" || ext == ".png") {this
        let imgback = this.imageback = new QUI_Image();
        imgback.localRect.SetAsFill();
        this.AddChild(imgback);
        imgback.localColor.A = 0;
        let img = this.image = new QUI_Image();
        //let tex = await this.LoadFileToTexture(result[i]);
        //img.SetByTexture(tex);
        img.localRect.setByPosAndSize(0, 0, 24, 24);
        img.sprite = null;
        this.AddChild(img);
        //}
        let label = this.label = new QUI_Label();
        label.localRect.SetAsFill();
        label.localRect.offsetX1 = 25;
        label.text = "pickable";
        label.halign = QUI_HAlign.Left;
        //this.contextPanel.container().AddChild(con);
        this.AddChild(label);
    }
    GetElementType() {
        return QUI_ElementType.Element_User;
    }
    OnFocus() {
        this.imageback.localColor = new Color(0.3, 0.4, 0.9, 1);
        this.label.localColor = new Color(0.9, 0.9, 0.3, 1);
    }
    OnUnFocus() {
        this.imageback.localColor.A = 0;
        this.label.localColor = Color.White;
    }
}
export class PickTTDialog {
    static Show(canvas) {
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
                this.OnNewFile();
            });
            innermenu.AddChild(btn1);
            let panelScroll = new QUI_Panel_Scroll();
            btn0.OnClick = () => {
                this.OnPick(panelScroll.container.GetPicked().filehandle);
            };
            group.container.AddChild(panelScroll);
            panelScroll.localRect.offsetY1 = 22;
            let fs = yield WorkingDir.FindFile([".tt.json"], 3);
            for (var i = 0; i < fs.length; i++) {
                let con = new PickAble_FileItem();
                con.filehandle = fs[i];
                con.localRect.setBySize(500, 25);
                panelScroll.container.AddChild(con);
                // let ext = TTPathTool.GetExt(result[i].name).toLowerCase();
                // if (ext == ".jpg" || ext == ".png") {
                //     let img = new QUI_Image();
                //     let tex = await this.LoadFileToTexture(result[i]);
                //     con.image.SetByTexture(tex);
                // }
                con.label.text = fs[i].name;
            }
            if (fs.length == 0) {
                let con = new PickAble_FileItem();
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
        });
    }
    static OnPick(item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield WorkingDir.SetEditFile(item);
            this.finish = true;
        });
    }
    static OnNewFile() {
        return __awaiter(this, void 0, void 0, function* () {
            let txt = yield tt.input.Prompt("输入文件名", "new1.tt.json", 20, Resources.GetDefFont().GetFont());
            console.log("input name:" + txt);
            this.finish = true;
            var file = yield WorkingDir.SetEditFile(yield WorkingDir.CreateJsonFile(txt));
            this.finish = true;
        });
    }
}
PickTTDialog.finish = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3R0ZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlja3R0ZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFjLGFBQWEsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFhLFFBQVEsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUvUCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFHbkQsTUFBTSxPQUFPLGlCQUFrQixTQUFRLGlCQUFpQjtJQUNwRDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBaUNaLGVBQVUsR0FBNEIsSUFBSSxDQUFDO1FBaEN2QyxJQUFJLEVBQUUsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEIsRUFBRSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUU7WUFDYixJQUFJLENBQUMsT0FBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFBO1FBRUQsNkRBQTZEO1FBQzdELDRDQUE0QztRQUM1QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDL0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV6QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDdkMs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