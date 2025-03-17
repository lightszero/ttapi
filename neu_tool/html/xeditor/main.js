var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MyLogic } from "./editormain.js";
import { tt_impl } from "../ttimpl_web/ttimpl_web.js";
import { GameApp, ResourceOption, tt } from "../ttlayer2/ttlayer2.js";
import { IOExt } from "./twoenv.js";
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hello world.");
    IOExt.Init();
    let canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    document.body.appendChild(canvas);
    // {
    //     //创建拖动条，这个方法并不好
    //     let div = document.createElement("div");
    //     div.style.position = "absolute";
    //     div.style.left = "5px";
    //     div.style.top = "5px";
    //     div.style.width = "25%"
    //     div.style.height = "24px";
    //     div.style.border = "solid 3px,#fff";
    //     div.style.backgroundColor = "#53f";
    //     (div.style as any)["-webkit-app-region"] = "drag";
    //     document.body.appendChild(div);
    // }
    //初始化ttimpl，这样就可以正常使用ttapi了
    var ttimpl = new tt_impl.ttimpl_browser();
    ttimpl.Init(canvas);
    var fontname = yield tt.loader.LoadCustomFont("VonwaonBitmap", "./resource/VonwaonBitmap-16px.ttf");
    let op = new ResourceOption();
    op.defFontName = fontname;
    GameApp.Start(op, new MyLogic());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBUyxFQUFFO0lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFNUIsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2IsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDbkMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUM1QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVsQyxJQUFJO0lBQ0osc0JBQXNCO0lBQ3RCLCtDQUErQztJQUMvQyx1Q0FBdUM7SUFDdkMsOEJBQThCO0lBQzlCLDZCQUE2QjtJQUM3Qiw4QkFBOEI7SUFDOUIsaUNBQWlDO0lBQ2pDLDJDQUEyQztJQUMzQywwQ0FBMEM7SUFDMUMseURBQXlEO0lBQ3pELHNDQUFzQztJQUN0QyxJQUFJO0lBQ0osMkJBQTJCO0lBQzNCLElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsSUFBSSxRQUFRLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztJQUNwRyxJQUFJLEVBQUUsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO0lBQzlCLEVBQUUsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO0lBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksT0FBTyxFQUFFLENBQUMsQ0FBQTtBQUVwQyxDQUFDLENBQUEsQ0FBQSJ9