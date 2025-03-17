var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { QUI_Grow, QUI_Button, QUI_Direction2, QUI_Group, QUI_HAlign, QUI_Image, QUI_Label, QUI_Panel, QUI_Panel_Scroll, QUI_Container, tt, Texture, TextureFormat } from "../ttlayer2/ttlayer2.js";
import { TTPathTool } from "../ttlayer2/utils/path/pathtool.js";
import { FindTool } from "../xioext/findtool.js";
import { IOExt } from "../xioext/ioext.js";
export class FileGroup extends QUI_Group {
    constructor() {
        super();
        this.title.text = "File_List";
        this.InitTitleBar();
        let panelScroll = this.contextPanel = new QUI_Panel_Scroll();
        panelScroll.localRect.SetAsFill();
        panelScroll.localRect.offsetY1 = 22;
        this.GetContainer().AddChild(panelScroll);
    }
    InitTitleBar() {
        let titlebar = new QUI_Panel();
        titlebar.localRect.setHPosFill();
        titlebar.localRect.setVPosByTopBorder(22);
        this.GetContainer().AddChild(titlebar);
        let titlegrow = new QUI_Grow();
        titlegrow.direction = QUI_Direction2.Horizontal;
        titlebar.GetContainer().AddChild(titlegrow);
        {
            let btn = new QUI_Button();
            btn.localRect.setBySize(60, 18);
            let label = btn.elemNormal.GetChild(1);
            label.text = "Open";
            titlegrow.AddChild(btn);
            btn.OnClick = () => __awaiter(this, void 0, void 0, function* () {
                let r = yield IOExt.Picker_Folder();
                if (r != null)
                    this.OnOpenFolder(r);
            });
        }
        // {
        //     let btn = new QUI_Button();
        //     btn.localRect.setBySize(60, 18);
        //     let label = btn.elemNormal.GetChild(1) as QUI_Label;
        //     label.text = "New";
        //     titlegrow.AddChild(btn);
        //     btn.OnClick = async () => {
        //         let r = await IOExt.Picker_SaveFile();
        //         if (r != null)
        //             this.OnSaveFile(r);
        //     }
        // }
        // {
        //     let btn = new QUI_Button();
        //     btn.localRect.setBySize(60, 18);
        //     let label = btn.elemNormal.GetChild(1) as QUI_Label;
        //     label.text = "Save";
        //     titlegrow.AddChild(btn);
        // }
        // {
        //     let label = this.titlebar_txt = new QUI_Label();
        //     label.text = "当前没有打开文件编辑"
        //     label.localRect.setBySize(200, 18);
        //     label.halign = QUI_HAlign.Left;
        //     titlegrow.AddChild(label);
        // }
    }
    LoadFileToTexture(file) {
        return __awaiter(this, void 0, void 0, function* () {
            let idata = yield IOExt.File_ReadBinary(file);
            let b = new Blob([idata]);
            let imagedata = yield tt.loader.LoadImageDataAsync(URL.createObjectURL(b));
            let tex = new Texture(tt.graphic.GetWebGL(), imagedata.width, imagedata.height, TextureFormat.RGBA32, imagedata.data);
            return tex;
        });
    }
    OnOpenFolder(file) {
        return __awaiter(this, void 0, void 0, function* () {
            this.dir = file;
            this.contextPanel.GetContainer().RemoveChildAll();
            let result = yield FindTool.FindAllFile(file, [".json", ".jpg", ".png"], 3);
            for (var i = 0; i < result.length; i++) {
                let con = new QUI_Container();
                con.localRect.setBySize(200, 24);
                this.contextPanel.GetContainer().AddChild(con);
                let ext = TTPathTool.GetExt(result[i].name).toLowerCase();
                if (ext == ".jpg" || ext == ".png") {
                    let img = new QUI_Image();
                    let tex = yield this.LoadFileToTexture(result[i]);
                    img.SetByTexture(tex);
                    img.localRect.setByPosAndSize(0, 0, 24, 24);
                    con.AddChild(img);
                }
                let label = new QUI_Label();
                label.localRect.setByPosAndSize(24, 0, 200 - 24, 20);
                label.text = (result[i].isfile ? "[File]" : "[Path]")
                    + result[i].name;
                label.halign = QUI_HAlign.Left;
                //this.contextPanel.GetContainer().AddChild(con);
                con.AddChild(label);
            }
        });
    }
    OnSaveFile(file) {
        console.log("OnCreateFile:" + file);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZWdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZWdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQVMsVUFBVSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNNLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFakQsT0FBTyxFQUFFLEtBQUssRUFBMkMsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRixNQUFNLE9BQU8sU0FBVSxTQUFRLFNBQVM7SUFDcEM7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUU5QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7UUFDN0QsV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNsQyxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBR0QsWUFBWTtRQUNSLElBQUksUUFBUSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDL0IsUUFBUSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxRQUFRLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FB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