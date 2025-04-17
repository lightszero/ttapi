import { GetWinTag } from "../modelfunc/winmgr.js";



window.onload = async () => {
    document.body.style.backgroundColor = "black";

    //这个必须要等
    let tag = await GetWinTag();
    console.log("wintag=" + tag);

}