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
// import { tt } from "./ttapi/ttapi.js";
// import { GameApp, ResourceOption } from "./ttlayer2/ttlayer2.js";
// import { TTState_All } from "./ttsample/ttstate_all.js";
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
        // ttimpl.Init(canvas);
        console.log("hello world");
        // //web 音效需要按钮激活
        // //tt.audio.ReInit();
        // //加载自定义字体
        // let font = await tt.loader.LoadCustomFont("VonwaonBitmap-16px", "./data/VonwaonBitmap-16px.ttf");
        // console.log("add font:" + font);
        // let op = new ResourceOption();
        // op.defFontName = "VonwaonBitmap-16px";
        // op.defFontSize = 32;
        // GameApp.Start(op, new TTState_All());
    });
}
start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3JELHlDQUF5QztBQUN6QyxvRUFBb0U7QUFDcEUsMkRBQTJEO0FBRzNELFNBQWUsS0FBSzs7UUFFaEIsT0FBTztRQUNOLElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRzNDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRTVCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLHVCQUF1QjtRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTNCLGlCQUFpQjtRQUNqQix1QkFBdUI7UUFFdkIsWUFBWTtRQUVaLG9HQUFvRztRQUVwRyxtQ0FBbUM7UUFDbkMsaUNBQWlDO1FBQ2pDLHlDQUF5QztRQUN6Qyx1QkFBdUI7UUFDdkIsd0NBQXdDO0lBRzVDLENBQUM7Q0FBQTtBQUNELEtBQUssRUFBRSxDQUFDIn0=