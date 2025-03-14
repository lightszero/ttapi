import { app, BrowserWindow, globalShortcut } from "electron";
import * as path from "path"
import * as fs from "fs";
import { GetRootPath, MainWinConfig, RegEvent, SetMainWinConfig, StartLocalWin } from "./event.js";

class Config extends MainWinConfig {
    sync: boolean;
    syncurl: string;
    openurl: string;
}
function ParseConfig(json: string): Config {
    let config = JSON.parse(json) as Config;
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
async function Main() {
    await app.whenReady();
    console.log("electron start.");

    //注册事件
    RegEvent();

    app.on("window-all-closed", () => {
        app.exit();
    })


    //加载配置
    let curpath = GetRootPath();//资源路径
    let cfgpath = path.join(curpath, "data/config.json");
    let config: Config;
    try {
        let configstr = fs.readFileSync(cfgpath, { encoding: "utf-8" });
        let config = ParseConfig(configstr);

    }
    catch {
        console.log("config wrong.");
        let curpathm = import.meta.dirname; //模块路径
        let win = new BrowserWindow({
            width: 800, height: 600, webPreferences:
            {
                preload: path.join(curpathm, "preload.js")
                , nodeIntegration: true
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
            width: 800, height: 600, webPreferences:
            {
                preload: path.join(curpathm, "preload.js")
                , nodeIntegration: true
            },
            frame: false,
            roundedCorners: false,
        });

        //win.webContents.openDevTools();

        win.loadFile("winloading/index.html", { query: { "syncurl": config.syncurl } });
        //loading win 下载资源后 通过 StartLocalWin 启动
    }

    //通过全局快捷键可以屏蔽掉窗口快捷键
    let bindkey: string[] = ["ctrl+r", "ctrl+shift+i"]
    for (var i = 0; i < bindkey.length; i++) {
        let key = bindkey[i];
        globalShortcut.register(key, () => {
            console.log(key);
        });
    }


}
Main();
