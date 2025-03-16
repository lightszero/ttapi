"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//preload 在沙盒中，只能调用有限的接口
//不能用import 只能require
const { contextBridge, ipcRenderer } = require('electron');
//import { ipcRenderer } from "electron";
console.log("window preload.");
//等待返回
function rpccall(name, ...args) {
    return __awaiter(this, void 0, void 0, function* () {
        return ipcRenderer.invoke(name, ...args);
    });
}
//单纯发送无返回
function send(name, ...args) {
    ipcRenderer.send(name, ...args);
}
//还可以接收主窗口返回
//这里负责给html增加能力
//declare var contextBridge:any;
function dialog_msgbox(title, message, buttons) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("dialog_msgbox(" + title + "," + message + ")");
        return rpccall("dialog_msgbox", title, message, buttons);
        //dialog.showMessageBox(BrowserWindow.getFocusedWindow(),{title:title,message:message});
    });
}
function dialog_openfile(option) {
    return __awaiter(this, void 0, void 0, function* () {
        return rpccall("dialog_openfile", option);
    });
}
function dialog_savefile(filters) {
    return __awaiter(this, void 0, void 0, function* () {
        return rpccall("dialog_savefile", filters);
    });
}
function path_getcurrent() {
    return __awaiter(this, void 0, void 0, function* () {
        return rpccall("path_getcurrent");
    });
}
function path_list(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return rpccall("path_list", path);
    });
}
function path_delete(path, recursive) {
    return __awaiter(this, void 0, void 0, function* () {
        return rpccall("path_delete", path, recursive);
    });
}
function path_stat(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return rpccall("path_stat", path);
    });
}
function file_readtext(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return rpccall("file_readtext", path);
    });
}
function file_readbin(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return rpccall("file_readbin", path);
    });
}
function file_writetext(_path, text) {
    return __awaiter(this, void 0, void 0, function* () {
        return rpccall("file_writetext", _path, text);
    });
}
function file_appendtext(_path, text) {
    return __awaiter(this, void 0, void 0, function* () {
        return rpccall("file_appendtext", _path, text);
    });
}
function file_writebin(_path, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return rpccall("file_writebin", _path, data);
    });
}
function file_delete(_path) {
    return __awaiter(this, void 0, void 0, function* () {
        return rpccall("file_delete", _path);
    });
}
function window_open(_path) {
    return __awaiter(this, void 0, void 0, function* () {
        return rpccall("window_open", _path);
    });
}
contextBridge.exposeInMainWorld("MyAPI", { "cool": 1, "type": "electron", "tag": 7788 });
contextBridge.exposeInMainWorld("dialog_msgbox", dialog_msgbox);
contextBridge.exposeInMainWorld("dialog_openfile", dialog_openfile);
contextBridge.exposeInMainWorld("dialog_savefile", dialog_savefile);
contextBridge.exposeInMainWorld("path_getcurrent", path_getcurrent);
contextBridge.exposeInMainWorld("path_list", path_list);
contextBridge.exposeInMainWorld("path_stat", path_stat);
contextBridge.exposeInMainWorld("path_delete", path_delete);
contextBridge.exposeInMainWorld("file_readtext", file_readtext);
contextBridge.exposeInMainWorld("file_readbin", file_readbin);
contextBridge.exposeInMainWorld("file_appendtext", file_appendtext);
contextBridge.exposeInMainWorld("file_writetext", file_writetext);
contextBridge.exposeInMainWorld("file_writebin", file_writebin);
contextBridge.exposeInMainWorld("file_delete", file_delete);
contextBridge.exposeInMainWorld("window_open", window_open);
