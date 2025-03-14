
//preload 在沙盒中，只能调用有限的接口
//不能用import 只能require
const { contextBridge, ipcRenderer } = require('electron')

//import { ipcRenderer } from "electron";


console.log("window preload.");
//等待返回
async function rpccall(name: string, ...args: any[]) {
    return ipcRenderer.invoke(name, ...args);
}
//单纯发送无返回
function send(name: string, ...args: any[]) {
    ipcRenderer.send(name, ...args)
}

//还可以接收主窗口返回


//这里负责给html增加能力
//declare var contextBridge:any;
async function dialog_msgbox(title: string, message: string, buttons: string[] | null) {
    console.log("dialog_msgbox(" + title + "," + message + ")");
    return rpccall("dialog_msgbox", title, message, buttons);
    //dialog.showMessageBox(BrowserWindow.getFocusedWindow(),{title:title,message:message});
}

interface FileFilter {

    // Docs: https://electronjs.org/docs/api/structures/file-filter

    extensions: string[];
    name: string;
}
class fileInfo {
    isdir: boolean;
    name: string;
    size: number;
    time: number;
}
async function dialog_openfile(filter: FileFilter[]) {

    return rpccall("dialog_openfile", filter);

}
async function dialog_savefile(filters: FileFilter[]) {
    return rpccall("dialog_savefile", filters);
}
async function path_getcurrent() {

    return rpccall("path_getcurrent");

}
async function path_list(path: string) {
    return rpccall("path_list", path);
}
async function path_delete(path: string, recursive: boolean | null) {
    return rpccall("path_delete", path, recursive);
}
async function path_stat(path: string) {
    return rpccall("path_stat", path);
}
async function file_readtext(path: string) {
    return rpccall("file_readtext", path);
}
async function file_readbin(path: string) {
    return rpccall("file_readbin", path);
}

async function file_writetext(_path: string, text: string) {
    return rpccall("file_writetext", _path, text);

}
async function file_appendtext(_path: string, text: string) {
    return rpccall("file_appendtext", _path, text);

}
async function file_writebin(_path: string, data: ArrayBufferLike) {
    return rpccall("file_writebin", _path, data);
}
async function file_delete(_path: string) {
    return rpccall("file_delete", _path);
}
async function window_open(_path: string) {
    return rpccall("window_open", _path);
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

contextBridge.exposeInMainWorld("window_open", window_open); 
