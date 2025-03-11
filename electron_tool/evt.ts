///<reference path="node_modules/electron/electron.d.ts"/>
import * as electron from "electron";


async function rpc_msgbox(evt: electron.IpcMainInvokeEvent, title: string, message: string) {
    console.log("callm1d");
    let win = electron.BrowserWindow.getFocusedWindow();

    await electron.dialog.showMessageBox(win, { title: title as string, message: message });
    return 1;
}
async function rpc_openfile(evt: electron.IpcMainInvokeEvent, filters: electron.FileFilter[]) {
    let win = electron.BrowserWindow.getFocusedWindow();

    var d = await electron.dialog.showOpenDialog(win, { "filters": filters ,});
    return d.filePaths;
}
export function RegEvent() {
    electron.ipcMain.handle("msgbox", (evt, args) => {
        console.log("recv evt.");
        let win = electron.BrowserWindow.getFocusedWindow();
        let txt_t = args[0] as string;
        let msg = args[1] as string;
        electron.dialog.showMessageBox(win, { title: txt_t as string, message: msg });
    });

    electron.ipcMain.handle("rpc_msgbox", rpc_msgbox);
    electron.ipcMain.handle("rpc_openfile", rpc_openfile);

    console.log("reg event ok.");
}