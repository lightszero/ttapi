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
let lastfolder;
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
        let folder = lastfolder = yield IOExt.Picker_Folder();
        IOExt.Log("showFolderDialog=" + JSON.stringify(folder));
        let infos = yield IOExt.Directory_List(folder);
        for (var i = 0; i < infos.length; i++) {
            console.log(JSON.stringify(infos[i]));
        }
    }));
    AddBtn("create aa path in lastfolder", () => __awaiter(void 0, void 0, void 0, function* () {
        yield IOExt.Directory_Create(lastfolder, "aa");
    }));
    AddBtn("remove aa path in lastfolder", () => __awaiter(void 0, void 0, void 0, function* () {
        yield IOExt.Directory_Remove(lastfolder, "aa");
    }));
    AddBtn("create abc.json in lastfolder", () => __awaiter(void 0, void 0, void 0, function* () {
        yield IOExt.File_CreateText(lastfolder, "abc.json", "hello");
    }));
    AddBtn("remove abc.json in lastfolder", () => __awaiter(void 0, void 0, void 0, function* () {
        yield IOExt.Directory_Remove(lastfolder, "abc.json");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBeUIsTUFBTSxhQUFhLENBQUM7QUFFM0QsSUFBSSxVQUFpQyxDQUFDO0FBRXRDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO0lBRWpCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckIsSUFBSSxDQUFDLEdBQUksTUFBYyxDQUFDLFVBQVUsQ0FBQztJQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDN0MsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2IsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFFNUIsUUFBUSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBRWxELFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO0lBQ3hDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO1FBQzVCLElBQUksQ0FBQyxHQUFHLE1BQU0sVUFBVSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVELEtBQUssQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQSxDQUFDLENBQUE7SUFDRixNQUFNLENBQUMsV0FBVyxFQUFFLEdBQVMsRUFBRTtRQUMzQixJQUFJLENBQUMsR0FBRyxNQUFNLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN0QyxLQUFLLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUEsQ0FBQyxD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