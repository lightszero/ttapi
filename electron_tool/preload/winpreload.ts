
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
async function msgbox(title: string, message: string) {
    console.log("msgbox(" + title + "," + message + ")");
    return rpccall("rpc_msgbox", title, message);
    //dialog.showMessageBox(BrowserWindow.getFocusedWindow(),{title:title,message:message});
}

interface FileFilter {

    // Docs: https://electronjs.org/docs/api/structures/file-filter

    extensions: string[];
    name: string;
}
async function openfile(filter: FileFilter[]) {

    return rpccall("rpc_openfile", filter);
    //dialog.showMessageBox(BrowserWindow.getFocusedWindow(),{title:title,message:message});
}

contextBridge.exposeInMainWorld("MyAPI", { "cool": 1 });
contextBridge.exposeInMainWorld("msgbox", msgbox);
contextBridge.exposeInMainWorld("openfile", openfile); 