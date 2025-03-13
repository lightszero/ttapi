///<reference path="../node_modules/electron/electron.d.ts"/>
import * as electron from "electron";
import * as fs from "fs"
import * as path from "path"

export function GetRootPath(): string {
    let apppath = electron.app.getAppPath();
    let apppath2 = path.resolve(apppath);

    if (electron.app.isPackaged) {
        apppath2 = path.dirname(apppath2);
    }
    return apppath2;
}
export function StartLocalWin(url: string) {
    let curpathm = import.meta.dirname; //模块路径
    //启动窗口
    let win = new electron.BrowserWindow({
        width: 800, height: 600, webPreferences:
        {
            preload: path.join(curpathm, "preload.js"),
            //devTools: false,这会禁止开发工具，快捷键也打不开
        },
        autoHideMenuBar: true,
        titleBarStyle: "customButtonsOnHover",// hidden 会禁用菜单，alt  也没用

    });

    win.webContents.openDevTools();
    win.loadURL(url);
}


//本地能力，对话框
async function dialog_msgbox(evt: electron.IpcMainInvokeEvent, title: string, message: string, buttons: string[] | null) {

    let win = electron.BrowserWindow.getFocusedWindow();

    let rd = await electron.dialog.showMessageBox(win, { title: title as string, message: message, buttons: buttons });

    return rd.response;
}
async function dialog_savefile(evt: electron.IpcMainInvokeEvent, filters: electron.FileFilter[]) {

    let win = electron.BrowserWindow.getFocusedWindow();

    var d = await electron.dialog.showSaveDialog(win, { "filters": filters });
    return d.filePath;
}
async function dialog_openfile(evt: electron.IpcMainInvokeEvent, filters: electron.FileFilter[]) {
    let win = electron.BrowserWindow.getFocusedWindow();

    var d = await electron.dialog.showOpenDialog(win, { "filters": filters, });
    return d.filePaths;
}


async function path_getcurrent(evt: electron.IpcMainInvokeEvent) {
    let curpath = GetRootPath();
    return curpath;
}

class fileInfo {
    isdir: boolean;
    name: string;
    size: number;
    time: number;
}

async function path_list(evt: electron.IpcMainInvokeEvent, _path: string) {
    try {
        let dir = fs.readdirSync(_path);
        let result: fileInfo[] = [];

        for (var i = 0; i < dir.length; i++) {
            let stat = fs.statSync(dir[i]);
            let isdir = stat.isDirectory()

            result.push({ "isdir": isdir, "name": dir[i], 'size': stat.size, "time": stat.atimeMs });
        }
        return result;
    }
    catch {
        return null;
    }
}
async function path_stat(evt: electron.IpcMainInvokeEvent, _path: string): Promise<fileInfo> {
    try {
        let stat = fs.statSync(_path);
        let r: fileInfo = new fileInfo();
        r.isdir = stat.isDirectory();
        r.size = stat.size;
        r.time = stat.atimeMs;
        return r;
    }
    catch {
        return null;
    }
}
async function path_delete(evt: electron.IpcMainInvokeEvent, _path: string, recursive: boolean | null) {
    try {
        fs.rmdirSync(_path, { recursive: recursive });
        return true;
    }
    catch {
        return false;
    }
}
async function path_create(evt: electron.IpcMainInvokeEvent, _path: string) {
    try {
        fs.mkdirSync(_path);
        return true;
    }
    catch (e) {
        console.error("path_create error:" + e)
        return false;
    }
}
async function file_readtext(evt: electron.IpcMainInvokeEvent, _path: string) {
    try {
        let txt = fs.readFileSync(_path, { encoding: "utf-8" })
        return txt;
    }
    catch {
        return null;
    }
}
async function file_readbin(evt: electron.IpcMainInvokeEvent, _path: string) {
    try {
        let bin = fs.readFileSync(_path)
        return bin.buffer;
    }
    catch {
        return null;
    }
}

async function file_writetext(evt: electron.IpcMainInvokeEvent, _path: string, text: string) {
    try {

        var p = path.dirname(_path);
        await path_create(null, p);
        //let buffer =Buffer.from(text,"utf-8")
        fs.writeFileSync(_path, text, { "encoding": "utf-8" });
        return true;
    }
    catch (e) {
        console.error("file_writetext error." + e);
        return false;
    }
}
async function file_appendtext(evt: electron.IpcMainInvokeEvent, _path: string, text: string) {
    try {
        //let buffer =Buffer.from(text,"utf-8")
        fs.appendFileSync(_path, text, { "encoding": "utf-8" });
        return true;
    }
    catch {
        return false;
    }
}
async function file_writebin(evt: electron.IpcMainInvokeEvent, _path: string, data: ArrayBufferLike) {
    try {
        console.log("file_writebin path=" + _path);
        var p = path.dirname(_path);
        await path_create(null, p);
        let buffer = Buffer.from(data);
        fs.writeFileSync(_path, buffer);
        return true;
    }
    catch (e) {
        console.error("file_writetext error." + e);
        return false;
    }
}
async function file_delete(evt: electron.IpcMainInvokeEvent, _path: string) {
    try {
        fs.rmSync(_path);
        return true;
    }
    catch {
        return false;
    }
}
async function window_open(evt: electron.IpcMainInvokeEvent, _path: string) {
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
        console.error("window_open error:" + e)
        return false;
    }
}

export function RegEvent() {
    electron.ipcMain.handle("msgbox", (evt, args) => {
        console.log("recv evt.");
        let win = electron.BrowserWindow.getFocusedWindow();
        let txt_t = args[0] as string;
        let msg = args[1] as string;
        electron.dialog.showMessageBox(win, { title: txt_t as string, message: msg });
    });

    electron.ipcMain.handle("dialog_msgbox", dialog_msgbox);
    electron.ipcMain.handle("dialog_openfile", dialog_openfile);
    electron.ipcMain.handle("dialog_savefile", dialog_savefile);

    electron.ipcMain.handle("path_getcurrent", path_getcurrent);
    electron.ipcMain.handle("path_list", path_list);
    electron.ipcMain.handle("path_stat", path_stat);//同样可查文件
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