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
export class MainWinConfig {
}
let g_mainwincfg;
export function SetMainWinConfig(mainwincfg) {
    g_mainwincfg = mainwincfg;
}
export function StartLocalWin(url) {
    let apppath = electron.app.getAppPath();
    //启动窗口
    let option = {
        width: g_mainwincfg.width,
        height: g_mainwincfg.height,
        webPreferences: {
            preload: path.join(apppath, "mainproc/preload.js"),
            devTools: g_mainwincfg.devtool //这会禁止开发工具，快捷键也打不开
        },
        frame: !g_mainwincfg.noborder,
        roundedCorners: !g_mainwincfg.noborder,
        fullscreen: g_mainwincfg.fullscreen,
        autoHideMenuBar: true,
    };
    let win = new electron.BrowserWindow(option);
    win.webContents.openDevTools();
    win.loadURL(url);
    console.log("openwin:" + url);
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
