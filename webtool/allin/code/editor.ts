///<refrence path ="../jsoneditor/jsoneditor.d.ts"/>


import { ttwin } from "./ttwin.js";
window.onload = async () => {
    let b = await ttwin.Init(true);
    console.log("ttwin has init.");

    let div =document.createElement("div");
    document.body.appendChild(div);
    
    let e =new  JSONEditor(div,{mode:"code",modes:["code","tree"]},{});
}