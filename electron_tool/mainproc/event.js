var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
///<reference path="../node_modules/electron/electron.d.ts"/>
import * as electron from "electron";
import * as fs from "fs";
import * as path from "path";
//本地能力，对话框
function dialog_msgbox(evt, title, message, buttons) {
    return __awaiter(this, void 0, void 0, function* () {
        let win = electron.BrowserWindow.getFocusedWindow();
        let rd = yield electron.dialog.showMessageBox(win, { title: title, message: message, buttons: buttons });
        return rd.response;
    });
}
function dialog_savefile(evt, filters) {
    return __awaiter(this, void 0, void 0, function* () {
        let win = electron.BrowserWindow.getFocusedWindow();
        var d = yield electron.dialog.showSaveDialog(win, { "filters": filters });
        return d.filePath;
    });
}
function dialog_openfile(evt, filters) {
    return __awaiter(this, void 0, void 0, function* () {
        let win = electron.BrowserWindow.getFocusedWindow();
        var d = yield electron.dialog.showOpenDialog(win, { "filters": filters, });
        return d.filePaths;
    });
}
function path_getcurrent(evt) {
    return __awaiter(this, void 0, void 0, function* () {
        let curpath = path.resolve("./");
        return curpath;
    });
}
class fileInfo {
}
function path_list(evt, _path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let dir = fs.readdirSync(_path);
            let result = [];
            for (var i = 0; i < dir.length; i++) {
                let stat = fs.statSync(dir[i]);
                let isdir = stat.isDirectory();
                result.push({ "isdir": isdir, "name": dir[i], 'size': stat.size, "time": stat.atimeMs });
            }
            return result;
        }
        catch (_a) {
            return null;
        }
    });
}
function path_stat(evt, _path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let stat = fs.statSync(_path);
            let r = new fileInfo();
            r.isdir = stat.isDirectory();
            r.size = stat.size;
            r.time = stat.atimeMs;
            return r;
        }
        catch (_a) {
            return null;
        }
    });
}
function path_delete(evt, _path, recursive) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            fs.rmdirSync(_path, { recursive: recursive });
            return true;
        }
        catch (_a) {
            return false;
        }
    });
}
function file_readtext(evt, _path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let txt = fs.readFileSync(_path, { encoding: "utf-8" });
            return txt;
        }
        catch (_a) {
            return null;
        }
    });
}
function file_readbin(evt, _path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let bin = fs.readFileSync(_path);
            return bin.buffer;
        }
        catch (_a) {
            return null;
        }
    });
}
function file_writetext(evt, _path, text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //let buffer =Buffer.from(text,"utf-8")
            fs.writeFileSync(_path, text, { "encoding": "utf-8" });
            return true;
        }
        catch (_a) {
            return false;
        }
    });
}
function file_appendtext(evt, _path, text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //let buffer =Buffer.from(text,"utf-8")
            fs.appendFileSync(_path, text, { "encoding": "utf-8" });
            return true;
        }
        catch (_a) {
            return false;
        }
    });
}
function file_writebin(evt, _path, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let buffer = Buffer.from(data);
            fs.writeFileSync(_path, buffer);
            return true;
        }
        catch (_a) {
            return false;
        }
    });
}
function file_delete(evt, _path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            fs.rmSync(_path);
            return true;
        }
        catch (_a) {
            return false;
        }
    });
}
export function RegEvent() {
    electron.ipcMain.handle("msgbox", (evt, args) => {
        console.log("recv evt.");
        let win = electron.BrowserWindow.getFocusedWindow();
        let txt_t = args[0];
        let msg = args[1];
        electron.dialog.showMessageBox(win, { title: txt_t, message: msg });
    });
    electron.ipcMain.handle("dialog_msgbox", dialog_msgbox);
    electron.ipcMain.handle("dialog_openfile", dialog_openfile);
    electron.ipcMain.handle("dialog_savefile", dialog_savefile);
    electron.ipcMain.handle("path_getcurrent", path_getcurrent);
    electron.ipcMain.handle("path_list", path_list);
    electron.ipcMain.handle("path_stat", path_stat); //同样可查文件
    electron.ipcMain.handle("path_delete", path_delete);
    electron.ipcMain.handle("file_readtext", file_readtext);
    electron.ipcMain.handle("file_readbin", file_readbin);
    electron.ipcMain.handle("file_writetext", file_writetext);
    electron.ipcMain.handle("file_appendtext", file_appendtext);
    electron.ipcMain.handle("file_writebin", file_writebin);
    electron.ipcMain.handle("file_delete", file_delete);
    console.log("reg event ok.");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw2REFBNkQ7QUFDN0QsT0FBTyxLQUFLLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUE7QUFDeEIsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUE7QUFFNUIsVUFBVTtBQUNWLFNBQWUsYUFBYSxDQUFDLEdBQWdDLEVBQUUsS0FBYSxFQUFFLE9BQWUsRUFBRSxPQUF3Qjs7UUFFbkgsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXBELElBQUksRUFBRSxHQUFHLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQWUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRW5ILE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0NBQUE7QUFDRCxTQUFlLGVBQWUsQ0FBQyxHQUFnQyxFQUFFLE9BQThCOztRQUUzRixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFcEQsSUFBSSxDQUFDLEdBQUcsTUFBTSxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUMxRSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDdEIsQ0FBQztDQUFBO0FBQ0QsU0FBZSxlQUFlLENBQUMsR0FBZ0MsRUFBRSxPQUE4Qjs7UUFDM0YsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXBELElBQUksQ0FBQyxHQUFHLE1B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