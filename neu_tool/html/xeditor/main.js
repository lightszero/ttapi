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
import { IOExt } from "../xioext/ioext.js";
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
    var fontname = yield tt.loaderex.LoadCustomFont("VonwaonBitmap", "./resource/VonwaonBitmap-16px.ttf");
    let op = new ResourceOption();
    op.defFontName = fontname;
    GameApp.Start(op, new MyLogic());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0MsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFTLEVBQUU7SUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUU1QixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7SUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQzVCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRWxDLElBQUk7SUFDSixzQkFBc0I7SUFDdEIsK0NBQStDO0lBQy9DLHVDQUF1QztJQUN2Qyw4QkFBOEI7SUFDOUIsNkJBQTZCO0lBQzdCLDhCQUE4QjtJQUM5QixpQ0FBaUM7SUFDakMsMkNBQTJDO0lBQzNDLDBDQUEwQztJQUMxQyx5REFBeUQ7SUFDekQsc0NBQXNDO0lBQ3RDLElBQUk7SUFDSiwyQkFBMkI7SUFDM0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQixJQUFJLFFBQVEsR0FBRyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO0lBQ3RHLElBQUksRUFBRSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7SUFDOUIsRUFBRSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7SUFDMUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFBO0FBRXBDLENBQUMsQ0FBQSxDQUFBIn0=