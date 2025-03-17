var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { QUI_Grow, QUI_Button, QUI_Direction2, QUI_Group, QUI_Panel } from "../ttlayer2/ttlayer2.js";
import { IOExt } from "./twoenv.js";
export class FileGroup extends QUI_Group {
    constructor() {
        super();
        this.title.text = "File_List";
        this.InitTitleBar();
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
            let label = btn.elemNormal.AsContainer().GetChild(1);
            label.text = "Open";
            titlegrow.AddChild(btn);
            btn.OnClick = () => __awaiter(this, void 0, void 0, function* () {
                let r = yield IOExt.Picker_Folder();
                if (r != null)
                    this.OnOpenFile(r);
            });
        }
        // {
        //     let btn = new QUI_Button();
        //     btn.localRect.setBySize(60, 18);
        //     let label = btn.elemNormal.AsContainer().GetChild(1) as QUI_Label;
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
        //     let label = btn.elemNormal.AsContainer().GetChild(1) as QUI_Label;
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
    OnOpenFile(file) {
        this.title.text = "FileGroup 当前编辑目录=" + file.name;
    }
    OnSaveFile(file) {
        console.log("OnCreateFile:" + file);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZWdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZWdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQVMsVUFBVSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQW9DLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTlJLE9BQU8sRUFBRSxLQUFLLEVBQTJDLE1BQU0sYUFBYSxDQUFDO0FBRTdFLE1BQU0sT0FBTyxTQUFVLFNBQVEsU0FBUztJQUNwQztRQUNJLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO1FBRTlCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUV4QixDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksUUFBUSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFDL0IsUUFBUSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxRQUFRLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdkMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMvQixTQUFTLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUM7UUFDaEQsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU1QyxDQUFDO1lBQ0csSUFBSSxHQUFHLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUMzQixHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDaEMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFjLENBQUM7WUFDbEUsS0FBSyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7WUFDcEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixHQUFHLENBQUMsT0FBTyxHQUFHLEdBQVMsRUFBRTtnQkFDckIsSUFBSSxDQUFDLEdBQUcsTUFBTSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxJQUFJLElBQUk7b0JBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUEsQ0FBQTtRQUNMLENBQUM7UUFDRCxJQUFJO1FBQ0osa0NBQWtDO1FBQ2xDLHVDQUF1QztRQUN2Qyx5RUFBeUU7UUFDekUsMEJBQTBCO1FBQzFCLCtCQUErQjtRQUMvQixrQ0FBa0M7UUFDbEMsaURBQWlEO1FBRWpELHlCQUF5QjtRQUN6QixrQ0FBa0M7UUFDbEMsUUFBUTtRQUNSLElBQUk7UUFDSixJQUFJO1FBQ0osa0NBQWtDO1FBQ2xDLHVDQUF1QztRQUN2Qyx5RUFBeUU7UUFDekUsMkJBQTJCO1FBQzNCLCtCQUErQjtRQUMvQixJQUFJO1FBQ0osSUFBSTtRQUNKLHVEQUF1RDtRQUN2RCxnQ0FBZ0M7UUFDaEMsMENBQTBDO1FBQzFDLHNDQUFzQztRQUN0QyxpQ0FBaUM7UUFDakMsSUFBSTtJQUNSLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBMkI7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN0RCxDQUFDO0lBQ0QsVUFBVSxDQUFDLElBQXNCO1FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Q0FFSiJ9