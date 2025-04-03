var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { QUI_Direction2, QUI_Group, QUI_HAlign, QUI_Label, QUI_Panel_Scroll, QUI_Panel_Split, SpriteData, TextureFormat, tt, TTPicData } from "../../ttlayer2/ttlayer2.js";
import { IOExt } from "../../xioext/ioext.js";
import { Working } from "../work/working.js";
import { Editor_Image } from "./editor_image.js";
import { PickItem } from "./pickitem.js";
//主编辑区，主要从这里选中要编辑的项目
//然后就分流到具体的Editor里面去了
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
            split.GetPanel1().getBorder().SetZero();
            split.GetPanel2().getBorder().SetZero();
            canvas.AddChild(split);
            let split2 = this.editArea = new QUI_Panel_Split();
            split2.getBorder().SetZero();
            split2.splitDir = QUI_Direction2.Horizontal;
            split2.splitPos = 0.66;
            split2.localRect.SetAsFill();
            split2.localRect.offsetY1 = 22;
            split2.getSplitButton().SetText("");
            split2.splitSize = 4;
            split2.GetPanel1().getBorder().SetZero();
            split2.GetPanel2().getBorder().SetZero();
            this.editTitle = new QUI_Label();
            this.editTitle.localRect.setHPosFill();
            this.editTitle.localRect.setVPosByTopBorder(22);
            this.editTitle.halign = QUI_HAlign.Left;
            this.editTitle.localRect.offsetX1 = 4;
            this.editTitle.text = "当前编辑文件";
            split.GetPanel2().container.AddChild(this.editTitle);
            split.GetPanel2().container.AddChild(split2);
        }
        {
            let picpanel = new QUI_Group();
            picpanel.title.text = "图片Sprite";
            picpanel.localRect.SetAsFill();
            picpanel.localRect.radioY2 = 0.5;
            this.scrollPic = new QUI_Panel_Scroll();
            picpanel.container.AddChild(this.scrollPic);
            split.GetPanel1().container.AddChild(picpanel);
        }
        {
            let anipanel = new QUI_Group();
            anipanel.title.text = "动画Animation";
            anipanel.localRect.SetAsFill();
            anipanel.localRect.radioY1 = 0.5;
            this.scrollAni = new QUI_Panel_Scroll();
            anipanel.container.AddChild(this.scrollAni);
            split.GetPanel1().container.AddChild(anipanel);
        }
        //选中图片则编辑图片
        this.scrollPic.container.OnPick = (_pick) => {
            let pick = _pick.context;
            this.EditImg(pick);
        };
    }
    static ClearEditArea() {
        this.editArea.GetPanel1().container.RemoveChildAll();
        this.editArea.GetPanel2().container.RemoveChildAll();
    }
    static EditImg(imgname) {
        this.ClearEditArea();
        Editor_Image.Edit(this.editArea, Working.CreateEditImage(imgname));
    }
    static EditAni(aniname) {
    }
    static GetPickPic() {
        var _a;
        let name = (_a = this.scrollPic.container.GetPicked()) === null || _a === void 0 ? void 0 : _a.context;
        return name;
    }
    static Open(canvas) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Working.editfile == null) {
                //await Dialog_Message.Show(canvas, "没选择文件");
                return;
            }
            Working.ttjson = JSON.parse(yield IOExt.File_ReadText(Working.editfile));
            this.editTitle.text = Working.editfile.fullname;
            Editor_Main.UpdatePics();
        });
    }
    // 静态方法，用于更新图片
    static UpdatePics() {
        return __awaiter(this, void 0, void 0, function* () {
            this.scrollPic.container.RemoveChildAll();
            for (var key in Working.ttjson.pics) {
                let value = TTPicData.FromText(Working.ttjson.pics[key]);
                let sprite = Working.texturePool.GetPicByFileName(value.srcfile);
                if (sprite == null) {
                    if (value.data == null) {
                        let files = yield Working.GetFileReletive(Working.editfile.parent, value.srcfile);
                        let data = yield IOExt.File_ReadBinary(files);
                        value.data = new Uint8Array(data);
                    }
                    let blob = new Blob([value.data]);
                    let imgdata = yield tt.loaderex.LoadImageDataAsync(URL.createObjectURL(blob));
                    let spritedata = new SpriteData();
                    spritedata.pivotX = value.pivotX;
                    spritedata.pivotY = value.pivotY;
                    spritedata.data = imgdata.data;
                    spritedata.format = TextureFormat.RGBA32;
                    spritedata.width = imgdata.width;
                    spritedata.height = imgdata.height;
                    sprite = yield Working.texturePool.SetPic(key, value.srcfile, spritedata);
                }
                else {
                    sprite[0].pivotX = value.pivotX;
                    sprite[0].pivotY = value.pivotY;
                }
                let item = new PickItem(key);
                item.label.text = key;
                item.image.SetBySprite(sprite[0]);
                //TTPackageMgr.LoadPic(Working.ttjson.pics[key])
                this.scrollPic.container.AddChild(item);
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yX21haW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlZGl0b3JfbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQWMsY0FBYyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFhLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBd0IsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeE4sT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxvQkFBb0I7QUFDcEIscUJBQXFCO0FBQ3JCLE1BQU0sT0FBTyxXQUFXO0lBTXBCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBa0I7UUFDMUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUNsQyxDQUFDLENBQUEsWUFBWTtZQUNULEtBQUssQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQztZQUMzQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN0QixLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzVCLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM1QixLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDOUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNuQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUNwQixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsU0FB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