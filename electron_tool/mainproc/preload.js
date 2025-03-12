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
class fileInfo {
}
function dialog_openfile(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        return rpccall("dialog_openfile", filter);
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
contextBridge.exposeInMainWorld("MyAPI", { "cool": 1, "type": "electron", "tag": 7788 });
contextBridge.exposeInMainWorld("dialog_msgbox", dialog_msgbox);
contextBridge.exposeInMainWorld("dialog_openfile", dialog_openfile);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByZWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHdCQUF3QjtBQUN4QixxQkFBcUI7QUFDckIsTUFBTSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7QUFFMUQseUNBQXlDO0FBR3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUMvQixNQUFNO0FBQ04sU0FBZSxPQUFPLENBQUMsSUFBWSxFQUFFLEdBQUcsSUFBVzs7UUFDL0MsT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FBQTtBQUNELFNBQVM7QUFDVCxTQUFTLElBQUksQ0FBQyxJQUFZLEVBQUUsR0FBRyxJQUFXO0lBQ3RDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFDbkMsQ0FBQztBQUVELFlBQVk7QUFHWixlQUFlO0FBQ2YsZ0NBQWdDO0FBQ2hDLFNBQWUsYUFBYSxDQUFDLEtBQWEsRUFBRSxPQUFlLEVBQUUsT0FBd0I7O1FBQ2pGLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUQsT0FBTyxPQUFPLENBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDekQsd0ZBQXdGO0lBQzVGLENBQUM7Q0FBQTtBQVNELE1BQU0sUUFBUTtDQUtiO0FBQ0QsU0FBZSxlQUFlLENBQUMsTUFBb0I7O1FBRS9DLE9BQU8sT0FBTyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRTlDLENBQUM7Q0FBQTtBQUNELFNBQWUsZUFBZSxDQUFDLE9BQXFCOztRQUNo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