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
import { GameApp, ResourceOption } from "./ttlayer2/ttlayer2.js";
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
        let op = new ResourceOption();
        op.defFontName = "VonwaonBitmap-16px";
        op.defFontSize = 32;
        op.packedGrayHeight = 128;
        op.packedGrayWidth = 128;
        GameApp.Start(op, new TTState_All());
    });
}
start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUd4RCxTQUFlLEtBQUs7O1FBQ2hCLE9BQU87UUFDUCxJQUFJLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUcxQyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUU1QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFM0IsY0FBYztRQUNkLG9CQUFvQjtRQUVwQixTQUFTO1FBRVQsSUFBSSxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1FBRTVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksRUFBRSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDOUIsRUFBRSxDQUFDLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQztRQUN0QyxFQUFFLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNwQixFQUFFLENBQUMsZ0JBQWdCLEdBQUMsR0FBRyxDQUFDO1FBQ3hCLEVBQUUsQ0FBQyxlQUFlLEdBQUUsR0FBRyxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQztJQUd6QyxDQUFDO0NBQUE7QUFDRCxLQUFLLEVBQUUsQ0FBQyJ9