var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { app, BrowserWindow, globalShortcut } from "electron";
import * as path from "path";
import * as fs from "fs";
import { GetRootPath, RegEvent, StartLocalWin } from "./event.js";
class Config {
}
function ParseConfig(json) {
    let config = JSON.parse(json);
    if (config.sync == undefined)
        config.sync = false;
    if (config.fullscreen == undefined)
        config.fullscreen = false;
    if (config.width == undefined)
        config.width = 800;
    if (config.height == undefined)
        config.height = 600;
    return config;
}
//electron 启动程序
function Main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield app.whenReady();
        console.log("electron start.");
        //注册事件
        RegEvent();
        //加载配置
        let curpath = GetRootPath(); //资源路径
        let configstr = fs.readFileSync(path.join(curpath, "data/config.json"), { encoding: "utf-8" });
        let config = ParseConfig(configstr);
        if (config.sync == false) {
            console.log("config_sync==false direct open url");
            if ((config.openurl.indexOf("file://") == 0) ||
                (config.openurl.indexOf("http://") == 0) ||
                (config.openurl.indexOf("https://") == 0)) {
            }
            else {
                config.openurl = "file://" + path.join(curpath, config.openurl);
            }
            StartLocalWin(config.openurl);
        }
        else {
            //先通过loading窗口
            //启动窗口
            let curpathm = import.meta.dirname; //模块路径
            let win = new BrowserWindow({
                width: 800, height: 600, webPreferences: {
                    preload: path.join(curpathm, "preload.js"),
                    nodeIntegration: true
                }
            });
            win.webContents.openDevTools();
            win.loadFile("winloading/index.html", { query: { "syncurl": config.syncurl } });
            //loading win 下载资源后 通过 StartLocalWin 启动
        }
        //通过全局快捷键可以屏蔽掉窗口快捷键
        let bindkey = ["ctrl+r", "ctrl+shift+i"];
        for (var i = 0; i < bindkey.length; i++) {
            let key = bindkey[i];
            globalShortcut.register(key, () => {
                console.log(key);
            });
        }
        app.on("window-all-closed", () => {
            app.exit();
        });
    });
}
Main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzlELE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFBO0FBQzVCLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUVsRSxNQUFNLE1BQU07Q0FTWDtBQUNELFNBQVMsV0FBVyxDQUFDLElBQVk7SUFDN0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQVcsQ0FBQztJQUN4QyxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksU0FBUztRQUN4QixNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUN4QixJQUFJLE1BQU0sQ0FBQyxVQUFVLElBQUksU0FBUztRQUM5QixNQUFNLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUM5QixJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksU0FBUztRQUN6QixNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUN2QixJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksU0FBUztRQUMxQixNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUN4QixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBQ0QsZUFBZTtBQUNmLFNBQWUsSUFBSTs7UUFDZixNQUFNLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFL0IsTUFBTTtRQUNOLFFBQVEsRUFBRSxDQUFDO1FBRVgsTUFBTTtRQUNOLElBQUksT0FBTyxHQUFHLFdBQVcsRUFBRSxDQUFDLENBQUEs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