var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MainLogic } from "./mainlogic.js";
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
    var ttimpl = new tt_impl.ttimpl_browser();
    ttimpl.Init(canvas);
    var fontname = yield tt.loaderex.LoadCustomFont("VonwaonBitmap", "./resource/VonwaonBitmap-16px.ttf");
    let op = new ResourceOption();
    op.defFontName = fontname;
    GameApp.Start(op, new MainLogic());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0MsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFTLEVBQUU7SUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUU1QixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7SUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQzVCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBR2xDLElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsSUFBSSxRQUFRLEdBQUcsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztJQUN0RyxJQUFJLEVBQUUsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO0lBQzlCLEVBQUUsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO0lBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQTtBQUV0QyxDQUFDLENBQUEsQ0FBQSJ9