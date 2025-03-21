var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { QUI_Grow, Color, QUI_Button, QUI_Direction2, QUI_HAlign, QUI_Image, QUI_Label, QUI_Panel, QUI_Panel_Scroll, QUI_Container, tt, Texture, TextureFormat, QUI_Overlay, QUI_Window } from "../ttlayer2/ttlayer2.js";
import { TTPathTool } from "../ttlayer2/utils/path/pathtool.js";
import { FindTool } from "../xioext/findtool.js";
import { IOExt } from "../xioext/ioext.js";
export class PickAble_FileItem extends QUI_Container {
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
            let imagedata = yield tt.loader.LoadImageDataAsync(URL.createObjectURL(b));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZWdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZWdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQWEsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcE8sT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsS0FBSyxFQUEyQyxNQUFNLG9CQUFvQixDQUFDO0FBRXBGLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxhQUFhO0lBQ2hEO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLEVBQUUsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEIsRUFBRSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUU7WUFDYixJQUFJLENBQUMsT0FBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFBO1FBRUQsNkRBQTZEO1FBQzdELDRDQUE0QztRQUM1QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDL0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV6QixJQUFJLEdBQUcsR0FB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