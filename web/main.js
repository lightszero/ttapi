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
import { TTState_All } from "./ttsample/ttstate_all.js";
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
        let font = yield tt.loader.LoadCustomFont("VonwaonBitmap-16px", "./VonwaonBitmap-16px.ttf");
        console.log("add font:" + font);
        //初始化layer2
        //GameApp.Start(new TTState_UI());
        GameApp.Start(new TTState_All());
        //GameApp.ChangeState();
    });
}
start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFJakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBR3hELFNBQWUsS0FBSzs7UUFDaEIsT0FBTztRQUNQLElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRzFDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRTVCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUUzQixjQUFjO1FBQ2Qsb0JBQW9CO1FBRXBCLFNBQVM7UUFFVCxJQUFJLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLG9CQUFvQixFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFFNUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDaEMsV0FBVztRQUNYLGtDQUFrQztRQUNsQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNqQyx3QkFBd0I7SUFFNUIsQ0FBQztDQUFBO0FBQ0QsS0FBSyxFQUFFLENBQUMifQ==