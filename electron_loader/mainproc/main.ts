import { app, BrowserWindow, globalShortcut } from "electron";
import * as path from "path"
import * as fs from "fs";
import { GetRootPath, MainWinConfig, RegEvent, SetMainWinConfig, StartLocalWin } from "./event.js";

class Config extends MainWinConfig {
    sync: boolean;
    syncurl: string;
    openurl: string;
    banhotkey: string[];
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
    if (config.banhotkey == null)
        config.banhotkey = [];
    return config;
}
//electron 启动程序
export async function Main() {
    await app.whenReady();
    console.log("electron start.");

    //注册事件
    RegEvent();



    //加载配置
    let curpath = GetRootPath();//资源路径
    let cfgpath = path.join(curpath, "config.json");
    let config: Config;
    let succload = false;
    try {
        let configstr = fs.readFileSync(cfgpath, { encoding: "utf-8" });
        config = ParseConfig(configstr);
        succload = true;
    }
    catch {
        console.log("config wrong.");
        let apppath = app.getAppPath();

        let win = new BrowserWindow({
            width: 800, height: 600, webPreferences:
            {
                preload: path.join(apppath, "mainproc/preload.js")
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

    if (succload) {
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
            let apppath = app.getAppPath();

            let win = new BrowserWindow({
                width: 800, height: 600, webPreferences:
                {
                    preload: path.join(apppath, "mainproc/preload.js")
                    , nodeIntegration: true
                },
                frame: false,
                roundedCorners: false,
            });

            //win.webContents.openDevTools();

            win.loadFile("winloading/index.html", { query: { "syncurl": config.syncurl } });
            //loading win 下载资源后 通过 StartLocalWin 启动
        }

    }


    //通过全局快捷键可以屏蔽掉窗口快捷键
    {
        let bindkey: string[] = config.banhotkey;
        for (var i = 0; i < bindkey.length; i++) {
            let key = bindkey[i];
            globalShortcut.register(key, () => {
                console.log(key);
            });
        }
    }


    app.on("window-all-closed", () => {
        app.exit();
    })

}

