
import { EditState } from "./editor.js";
import { tt } from "../ttapi/ttapi.js"
import { tt_impl } from "../ttimpl_web/ttimpl_web.js"

import { GameApp } from "../ttlayer2/ttlayer2.js"
import { QUI_Canvas } from "../ttui/ttui.js"
async function Init() {
    let impl = new tt_impl.ttimpl_browser()
    let c = document.createElement("canvas");
    c.style.width = "100%";
    c.style.height = "100%";

    document.body.appendChild(c);
    impl.Init(c);
    console.log("Hello World.");
    
    GameApp.Start(new EditState());
    
}
window.onload = () => {
    Init();
}