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
function msgbox(title, message) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("msgbox(" + title + "," + message + ")");
        return rpccall("rpc_msgbox", title, message);
        //dialog.showMessageBox(BrowserWindow.getFocusedWindow(),{title:title,message:message});
    });
}
function openfile(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        return rpccall("rpc_openfile", filter);
        //dialog.showMessageBox(BrowserWindow.getFocusedWindow(),{title:title,message:message});
    });
}
contextBridge.exposeInMainWorld("MyAPI", { "cool": 1 });
contextBridge.exposeInMainWorld("msgbox", msgbox);
contextBridge.exposeInMainWorld("openfile", openfile);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lucHJlbG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndpbnByZWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHdCQUF3QjtBQUN4QixxQkFBcUI7QUFDckIsTUFBTSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7QUFFMUQseUNBQXlDO0FBR3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUMvQixNQUFNO0FBQ04sU0FBZSxPQUFPLENBQUMsSUFBWSxFQUFFLEdBQUcsSUFBVzs7UUFDL0MsT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FBQTtBQUNELFNBQVM7QUFDVCxTQUFTLElBQUksQ0FBQyxJQUFZLEVBQUUsR0FBRyxJQUFXO0lBQ3RDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFDbkMsQ0FBQztBQUVELFlBQVk7QUFHWixlQUFlO0FBQ2YsZ0NBQWdDO0FBQ2hDLFNBQWUsTUFBTSxDQUFDLEtBQWEsRUFBRSxPQUFlOztRQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNyRCxPQUFPLE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLHdGQUF3RjtJQUM1RixDQUFDO0NBQUE7QUFTRCxTQUFlLFFBQVEsQ0FBQyxNQUFvQjs7UUFFeEMsT0FBTyxPQUFPLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLHdGQUF3RjtJQUM1RixDQUFDO0NBQUE7QUFFRCxhQUFhLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDeEQsYUFBYSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNsRCxhQUFhLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDIn0=