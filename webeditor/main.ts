import { WinMgr_Impl } from "./mainmodel/winmgr_impl.js";


async function start() {
    (window as any)["__tag__"] = "mainwin";
    (window as any)["__winmgr__"] = new WinMgr_Impl();

    //初始化多窗口系统
    let btn = document.createElement("button");
    btn.innerText = "点击";
    document.body.appendChild(btn);

    btn.onclick = () => {
        let iframe = document.createElement("iframe");
        document.body.appendChild(iframe);
        iframe.src = "model_project/index.html";
        iframe.onload = () => {
            (iframe.contentWindow.window as any)["__tag__"] = "modelwin_" + 123;
            //iframe.contentWindow.window
        }
    }

    //IFrame 在同一个源中可以互相访问
    //现在需要Frame窗口化，  
}
start();
