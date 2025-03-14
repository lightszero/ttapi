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
import { GetRootPath, MainWinConfig, RegEvent, SetMainWinConfig, StartLocalWin } from "./event.js";
class Config extends MainWinConfig {
}
function ParseConfig(json) {
    let config = JSON.parse(json);
    if (config.sync == undefined)
        config.sync = false;
    //MainWinConfig
    if (config.devtool == undefined)
        config.devtool = false;
    if (config.fullscreen == undefined)
        config.fullscreen = false;
    if (config.noborder == undefined)
        config.noborder = false;
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
        app.on("window-all-closed", () => {
            app.exit();
        });
        //加载配置
        let curpath = GetRootPath(); //资源路径
        let cfgpath = path.join(curpath, "data/config.json");
        let config;
        try {
            let configstr = fs.readFileSync(cfgpath, { encoding: "utf-8" });
            let config = ParseConfig(configstr);
        }
        catch (_a) {
            console.log("config wrong.");
            let curpathm = import.meta.dirname; //模块路径
            let win = new BrowserWindow({
                width: 800, height: 600, webPreferences: {
                    preload: path.join(curpathm, "preload.js"),
                    nodeIntegration: true
                },
                frame: true,
                roundedCorners: false,
                autoHideMenuBar: true,
            });
            //win.webContents.openDevTools();
            win.loadFile("winerror/index.html");
            return;
        }
        SetMainWinConfig(config);
        //打开业务窗口
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
                },
                frame: false,
                roundedCorners: false,
            });
            //win.webContents.openDevTools();
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
    });
}
Main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzlELE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFBO0FBQzVCLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFbkcsTUFBTSxNQUFPLFNBQVEsYUFBYTtDQUlqQztBQUNELFNBQVMsV0FBVyxDQUFDLElBQVk7SUFDN0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQVcsQ0FBQztJQUN4QyxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksU0FBUztRQUN4QixNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUN4QixlQUFlO0lBQ2YsSUFBSSxNQUFNLENBQUMsT0FBTyxJQUFJLFNBQVM7UUFDM0IsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDM0IsSUFBSSxNQUFNLENBQUMsVUFBVSxJQUFJLFNBQVM7UUFDOUIsTUFBTSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDOUIsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLFNBQVM7UUFDNUIsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDNUIsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLFNBQVM7UUFDekIsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDdkIsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLFNBQVM7UUFDMUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDeEIsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FB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