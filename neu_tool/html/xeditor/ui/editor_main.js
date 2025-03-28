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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yX21haW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlZGl0b3JfbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQWMsY0FBYyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFhLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBd0IsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeE4sT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxNQUFNLE9BQU8sV0FBVztJQU1wQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQWtCO1FBQzFCLElBQUksS0FBSyxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDbEMsQ0FBQyxDQUFBLFlBQVk7WUFDVCxLQUFLLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUM7WUFDM0MsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDdEIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUM1QixLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDNUIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQzlCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDcEIsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFD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