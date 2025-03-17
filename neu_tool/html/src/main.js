var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { IOExt } from "../xioext/ioext.js";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBeUIsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRSxJQUFJLFVBQWlDLENBQUM7QUFFdEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7SUFFakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQixJQUFJLENBQUMsR0FBSSxNQUFjLENBQUMsVUFBVSxDQUFDO0lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM3QyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUU1QixRQUFRLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFFbEQsUUFBUSxDQUFDLDhCQUE4QixDQUFDLENBQUE7SUFDeEMsTUFBTSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7UUFDNUIsSUFBSSxDQUFDLEdBQUcsTUFBTSxVQUFVLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDNUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFBLENBQUMsQ0FBQTtJQUNGLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBUyxFQUFFO1FBQzNCLElBQUksQ0FBQyxHQUFHLE1BQU0sS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3RDLEtBQUssQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQSxDQUFD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