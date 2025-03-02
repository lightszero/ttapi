import { Button, Label, LabelButton, Panel, Splitter } from "../dom/domtool.js";
import { ListBox } from "../dom/listbox.js";
import { BaseDialog } from "../domdialog/valuesdialog.js";
import { ttwin } from "./ttwin.js";

export class PackageDialog extends BaseDialog<string> {
    constructor(workingpath: string) {
        super();
        this._value = null;
        this.InitAsync(workingpath);

    }
    async InitAsync(workingpath: string) {
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
        filegroup.OnPick=(value)=>
        {
            this._value =value;
        }
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

        let file = await ttwin.Path_List(workingpath, true, "*.tt.json");
        for (var f in file.files) {

            let _fullfile = file.files[f];
            let _file = _fullfile.substring(workingpath.length + 1);
            filegroup.AddItem(_file,_fullfile);
        }

    }
}