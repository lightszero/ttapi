var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { tt_impl } from "./ttimpl_web/ttimpl_web.js";
import { tt } from "./ttapi/ttapi.js";
import { GameApp } from "./ttlayer2/ttlayer2.js";
import { TTState_Draw } from "./ttsample/ttstate_draw.js";
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        //初始化图像
        var ttimpl = new tt_impl.ttimpl_browser();
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.border = "0px";
        canvas.style.margin = "0px";
        document.body.appendChild(canvas);
        ttimpl.Init(canvas);
        console.log("hello world");
        //web 音效需要按钮激活
        //tt.audio.ReInit();
        //加载自定义字体
        let font = yield tt.loader.LoadCustomFont("v16", "./VonwaonBitmap-16px.ttf");
        console.log("add font:" + font);
        //初始化layer2
        GameApp.Start(new TTState_Draw());
        //GameApp.ChangeState();
    });
}
start();
//# sourceMappingURL=main.js.map