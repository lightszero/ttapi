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
export function GetRootPath() {
    let apppath = electron.app.getAppPath();
    let apppath2 = path.resolve(apppath);
    if (electron.app.isPackaged) {
        apppath2 = path.dirname(apppath2);
    }
    return apppath2;
}
export function StartLocalWin(url) {
    let curpathm = import.meta.dirname; //模块路径
    //启动窗口
    let win = new electron.BrowserWindow({
        width: 800, height: 600, webPreferences: {
            preload: path.join(curpathm, "preload.js"),
            //devTools: false,这会禁止开发工具，快捷键也打不开
        },
        autoHideMenuBar: true,
        titleBarStyle: "customButtonsOnHover", // hidden 会禁用菜单，alt  也没用
    });
    win.webContents.openDevTools();
    win.loadURL(url);
}
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
        let curpath = GetRootPath();
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
function path_create(evt, _path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            fs.mkdirSync(_path);
            return true;
        }
        catch (e) {
            console.error("path_create error:" + e);
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
            var p = path.dirname(_path);
            yield path_create(null, p);
            //let buffer =Buffer.from(text,"utf-8")
            fs.writeFileSync(_path, text, { "encoding": "utf-8" });
            return true;
        }
        catch (e) {
            console.error("file_writetext error." + e);
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
            console.log("file_writebin path=" + _path);
            var p = path.dirname(_path);
            yield path_create(null, p);
            let buffer = Buffer.from(data);
            fs.writeFileSync(_path, buffer);
            return true;
        }
        catch (e) {
            console.error("file_writetext error." + e);
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
function window_open(evt, _path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let curpath = GetRootPath();
            if ((_path.indexOf("file://") == 0) ||
                (_path.indexOf("http://") == 0) ||
                (_path.indexOf("https://") == 0)) {
            }
            else {
                _path = "file://" + path.join(curpath, _path);
            }
            StartLocalWin(_path);
            return true;
        }
        catch (e) {
            console.error("window_open error:" + e);
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
    electron.ipcMain.handle("window_open", window_open);
    console.log("reg event ok.");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw2REFBNkQ7QUFDN0QsT0FBTyxLQUFLLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUE7QUFDeEIsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUE7QUFFNUIsTUFBTSxVQUFVLFdBQVc7SUFDdkIsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXJDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMxQixRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQztBQUNELE1BQU0sVUFBVSxhQUFhLENBQUMsR0FBVztJQUNyQyxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU07SUFDMUMsTUFBTTtJQUNOLElBQUksR0FBRyxHQUFHLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQztRQUNqQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUN2QztZQUNJLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUM7WUFDMUMsa0NBQWtDO1NBQ3JDO1FBQ0QsZUFBZSxFQUFFLElBQUk7UUFDckIsYUFBYSxFQUFFLHNCQUFzQixFQUFDLHdCQUF3QjtLQUVqRSxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQy9CLEdBQUcsQ0FBQyxP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