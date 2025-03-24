var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { QUI_Grow, Color, QUI_Button, QUI_Direction2, QUI_HAlign, QUI_Image, QUI_Label, QUI_Panel, QUI_Panel_Scroll, tt, Texture, TextureFormat, QUI_Overlay, QUI_Window, QUI_BaseContainer, QUI_ElementType } from "../ttlayer2/ttlayer2.js";
import { TTPathTool } from "../ttlayer2/utils/path/pathtool.js";
import { FindTool } from "../xioext/findtool.js";
import { IOExt } from "../xioext/ioext.js";
export class PickAble_FileItem extends QUI_BaseContainer {
    constructor() {
        super();
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
export class FileGroup extends QUI_Window {
    constructor() {
        super();
        this.title.text = "File_List";
        this.InitTitleBar();
        let panelScroll = this.contextPanel = new QUI_Panel_Scroll();
        panelScroll.localRect.SetAsFill();
        panelScroll.localRect.offsetY1 = 22;
        this.container.AddChild(panelScroll);
    }
    InitTitleBar() {
        let titlebar = new QUI_Panel();
        titlebar.localRect.setHPosFill();
        titlebar.localRect.setVPosByTopBorder(22);
        this.container.AddChild(titlebar);
        let titlegrow = new QUI_Grow();
        titlegrow.direction = QUI_Direction2.Horizontal;
        titlebar.container.AddChild(titlegrow);
        {
            let btn = new QUI_Button();
            btn.localRect.setBySize(90, 18);
            let label = btn.elemNormal.GetChild(1);
            label.text = "打开目录";
            titlegrow.AddChild(btn);
            btn.OnClick = () => __awaiter(this, void 0, void 0, function* () {
                let r = yield IOExt.Picker_Folder();
                if (r != null)
                    this.OnOpenFolder(r);
            });
        }
        {
            let btn = new QUI_Button();
            btn.localRect.setBySize(90, 18);
            let label = btn.elemNormal.GetChild(1);
            label.text = "编辑选中";
            titlegrow.AddChild(btn);
            btn.OnClick = () => __awaiter(this, void 0, void 0, function* () {
                console.log("编辑选中");
            });
        }
    }
    LoadFileToTexture(file) {
        return __awaiter(this, void 0, void 0, function* () {
            let idata = yield IOExt.File_ReadBinary(file);
            let b = new Blob([idata]);
            let imagedata = yield tt.loaderex.LoadImageDataAsync(URL.createObjectURL(b));
            let tex = new Texture(tt.graphic.GetWebGL(), imagedata.width, imagedata.height, TextureFormat.RGBA32, imagedata.data);
            return tex;
        });
    }
    OnOpenFolder(file) {
        return __awaiter(this, void 0, void 0, function* () {
            this.dir = file;
            this.contextPanel.container.RemoveChildAll();
            let result = yield FindTool.FindAllFile(file, [".json", ".jpg", ".png"], 3);
            for (var i = 0; i < result.length; i++) {
                let con = new PickAble_FileItem();
                con.localRect.setBySize(500, 25);
                this.contextPanel.container.AddChild(con);
                let ext = TTPathTool.GetExt(result[i].name).toLowerCase();
                if (ext == ".jpg" || ext == ".png") {
                    let img = new QUI_Image();
                    let tex = yield this.LoadFileToTexture(result[i]);
                    con.image.SetByTexture(tex);
                }
                con.label.text = (result[i].isfile ? "[File]" : "[Path]")
                    + result[i].name;
            }
        });
    }
    OnSaveFile(file) {
        console.log("OnCreateFile:" + file);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZWdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZWdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQWEsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDelAsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsS0FBSyxFQUEyQyxNQUFNLG9CQUFvQixDQUFDO0FBRXBGLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxpQkFBaUI7SUFDcEQ7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksRUFBRSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQixFQUFFLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRTtZQUNiLElBQUksQ0FBQyxPQUE2QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUE7UUFFRCw2REFBNkQ7UUFDN0QsNENBQTRDO1FBQzVDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUMvQyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXpC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