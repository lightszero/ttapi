var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { QUI_Grow, QUI_Button, QUI_Direction2, QUI_Group, QUI_HAlign, QUI_Label, QUI_Panel, QUI_Panel_Scroll } from "../ttlayer2/ttlayer2.js";
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
    OnOpenFolder(file) {
        return __awaiter(this, void 0, void 0, function* () {
            this.dir = file;
            let result = yield FindTool.FindAllFile(file, "*.json", 3);
            for (var i = 0; i < result.length; i++) {
                let label = new QUI_Label();
                label.localRect.setBySize(200, 20);
                label.text = (result[i].isfile ? "[File]" : "[Path]")
                    + result[i].name;
                label.halign = QUI_HAlign.Left;
                this.contextPanel.GetContainer().AddChild(label);
            }
        });
    }
    OnSaveFile(file) {
        console.log("OnCreateFile:" + file);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZWdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZWdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQVMsVUFBVSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFhLFNBQVMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoSyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFakQsT0FBTyxFQUFFLEtBQUssRUFBMkMsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRixNQUFNLE9BQU8sU0FBVSxTQUFRLFNBQVM7SUFDcEM7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUU5QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7UUFDN0QsV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNsQyxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBR0QsWUFBWTtRQUNSLElBQUksUUFBUSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDL0IsUUFBUSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxRQUFRLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdkMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FB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