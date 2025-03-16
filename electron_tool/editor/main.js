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
import { tt_impl } from "./ttimpl_web/ttimpl_web.js";
import { GameApp, ResourceOption, tt } from "./ttlayer2/ttlayer2.js";
window.onload = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hello world.");
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
    var fontname = yield tt.loader.LoadCustomFont("VonwaonBitmap", "./data/VonwaonBitmap-16px.ttf");
    let op = new ResourceOption();
    op.defFontName = fontname;
    GameApp.Start(op, new MyLogic());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRSxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQVMsRUFBRTtJQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRTVCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztJQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDNUIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFbEMsSUFBSTtJQUNKLHNCQUFzQjtJQUN0QiwrQ0FBK0M7SUFDL0MsdUNBQXVDO0lBQ3ZDLDhCQUE4QjtJQUM5Qiw2QkFBNkI7SUFDN0IsOEJBQThCO0lBQzlCLGlDQUFpQztJQUNqQywyQ0FBMkM7SUFDM0MsMENBQTBDO0lBQzFDLHlEQUF5RDtJQUN6RCxzQ0FBc0M7SUFDdEMsSUFBSTtJQUNKLDJCQUEyQjtJQUMzQixJQUFJLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLElBQUksUUFBUSxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsZUFBZSxFQUFFLCtCQUErQixDQUFDLENBQUM7SUFDaEcsSUFBSSxFQUFFLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztJQUM5QixFQUFFLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztJQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUE7QUFFcEMsQ0FBQyxDQUFBLENBQUEifQ==