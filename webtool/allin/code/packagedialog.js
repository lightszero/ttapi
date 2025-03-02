var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Button, Label, Splitter } from "../dom/domtool.js";
import { ListBox } from "../dom/listbox.js";
import { BaseDialog } from "../domdialog/valuesdialog.js";
import { ttwin } from "./ttwin.js";
export class PackageDialog extends BaseDialog {
    constructor(workingpath) {
        super();
        this._value = null;
        this.InitAsync(workingpath);
    }
    InitAsync(workingpath) {
        return __awaiter(this, void 0, void 0, function* () {
            let sp1 = new Splitter();
            sp1.Style_Fill();
            sp1.SetBorder(10);
            this._panel.AddChild(sp1);
            sp1.SetSplitPosTop(50);
            {
                let label = new Label("选择一个 tt.json 文件进行编辑.");
                label._root.style.textAlign = "center";
                //label.Style_Fill();
                sp1._panel1.AddChild(label);
            }
            {
                let label1 = new Label("当前workingpath:" + workingpath);
                label1._root.style.textAlign = "center";
                //label1.Style_Fill();
                sp1._panel1.AddChild(label1);
            }
            let sp2 = new Splitter();
            sp2.Style_Fill();
            sp1._panel2.AddChild(sp2);
            sp2.SetSplitPosBottom(50);
            let filegroup = new ListBox();
            filegroup.Style_Fill();
            filegroup.OnPick = (value) => {
                this._value = value;
            };
            sp2._panel1.AddChild(filegroup);
            let btn1 = new Button("Edit it", () => {
                if (this._value != null) {
                    this._done = true;
                }
            });
            let btn2 = new Button("Cancel", () => {
                this._value = null;
                this._done = true;
            });
            sp2._panel2.AddChild(btn1);
            sp2._panel2.AddChild(btn2);
            let file = yield ttwin.Path_List(workingpath, true, "*.tt.json");
            for (var f in file.files) {
                let _fullfile = file.files[f];
                let _file = _fullfile.substring(workingpath.length + 1);
                filegroup.AddItem(_file, _fullfile);
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZWRpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhY2thZ2VkaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXNCLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFlBQVksQ0FBQztBQUVuQyxNQUFNLE9BQU8sYUFBYyxTQUFRLFVBQWtCO0lBQ2pELFlBQVksV0FBbUI7UUFDM0IsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRWhDLENBQUM7SUFDSyxTQUFTLENBQUMsV0FBbUI7O1lBQy9CLElBQUksR0FBRyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7WUFDekIsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2pCLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUV2QixDQUFDO2dCQUNHLElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQzlDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7Z0JBQ3ZDLHFCQUFxQjtnQkFFckIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsQ0FBQztZQUNELENBQUM7Z0JBRUcsSUFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7Z0JBQ3hDLHNCQUFzQjtnQkFDdEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUdELElBQUksR0FBRyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7WUFDekIsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2pCLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRTFCLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUkxQixJQUFJLFNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzlCLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN2QixTQUFTLENBQUMsTUFBTSxHQUFDLENBQUMsS0FBSyxFQUFDLEVBQUU7Z0JBRXRCLElBQUksQ0FBQyxNQUFNLEdBQUUsS0FBSyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQTtZQUNELEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRWhDLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7Z0JBQ2xDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUUsQ0FBQztvQkFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztZQUVILEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTNCLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTNCLElBQUksSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ2pFLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUV2QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7UUFFTCxDQUFDO0tBQUE7Q0FDSiJ9