var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { IOExt } from "./twoenv.js";
window.onload = () => {
    console.log("hello");
    let n = window.Neutralino;
    console.log("Is Neutralino env:" + typeof n);
    IOExt.Init();
    AddLabel("退出只在window 模式有效");
    AddLabel("Neu init.IsWebEnv=" + IOExt.IsWebEnv());
    AddLabel("Neu 的 Messagebox 有问题，不是模式对话框");
    AddBtn("messagebox", () => __awaiter(void 0, void 0, void 0, function* () {
        let r = yield Neutralino.os.showMessageBox("选文件", "hihihi");
        IOExt.Log("showMessageBox=" + JSON.stringify(r));
    }));
    AddBtn("open file", () => __awaiter(void 0, void 0, void 0, function* () {
        let r = yield IOExt.Picker_OpenFile();
        IOExt.Log("showOpenDialog=" + JSON.stringify(r));
    }));
    AddBtn("save file", () => __awaiter(void 0, void 0, void 0, function* () {
        let r = yield IOExt.Picker_SaveFile();
        IOExt.Log("showSaveDialog=" + JSON.stringify(r));
    }));
    AddBtn("show dir", () => __awaiter(void 0, void 0, void 0, function* () {
        let folder = yield IOExt.Picker_Folder();
        IOExt.Log("showFolderDialog=" + JSON.stringify(folder));
        let infos = yield IOExt.Directory_List(folder);
        for (var i = 0; i < infos.length; i++) {
            console.log(JSON.stringify(infos[i]));
        }
    }));
};
function AddBtn(text, action) {
    let btn = document.createElement('button');
    btn.textContent = text;
    btn.onclick = () => {
        action();
    };
    document.body.appendChild(btn);
    document.body.appendChild(document.createElement("br"));
}
function AddLabel(text) {
    let label = document.createElement("span");
    label.textContent = text;
    document.body.appendChild(label);
    document.body.appendChild(document.createElement("br"));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUdwQyxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtJQUVqQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JCLElBQUksQ0FBQyxHQUFJLE1BQWMsQ0FBQyxVQUFVLENBQUM7SUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzdDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRTVCLFFBQVEsQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUVsRCxRQUFRLENBQUMsOEJBQThCLENBQUMsQ0FBQTtJQUN4QyxNQUFNLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtRQUM1QixJQUFJLENBQUMsR0FBRyxNQUFNLFVBQVUsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM1RCxLQUFLLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUEsQ0FBQyxDQUFBO0lBQ0YsTUFBTSxDQUFDLFdBQVcsRUFBRSxHQUFTLEVBQUU7UUFDM0IsSUFBSSxDQUFDLEdBQUcsTUFBTSxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFBLENBQUMsQ0FBQTtJQUNGLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBUyxFQUFFO1FBQzNCLElBQUksQ0FBQyxHQUFHLE1BQU0sS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3RDLEtBQUssQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQSxDQUFDLENBQUE7SUFDRixNQUFNLENBQUMsVUFBVSxFQUFFLEdBQVMsRUFBRTtRQUMxQixJQUFJLE1BQU0sR0FBRyxNQUFNLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QyxLQUFLLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLEtBQUssR0FBRyxNQUFNLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQyxDQUFDO0lBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQTtBQUNELFNBQVMsTUFBTSxDQUFDLElBQVksRUFBRSxNQUFrQjtJQUM1QyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO1FBQ2YsTUFBTSxFQUFFLENBQUM7SUFDYixDQUFDLENBQUE7SUFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUvQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUNELFNBQVMsUUFBUSxDQUFDLElBQVk7SUFDMUIsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQyxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUN6QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDNUQsQ0FBQyJ9