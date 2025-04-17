var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WinMgr_Impl } from "./mainmodel/winmgr_impl.js";
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        window["__tag__"] = "mainwin";
        window["__winmgr__"] = new WinMgr_Impl();
        //初始化多窗口系统
        let btn = document.createElement("button");
        btn.innerText = "点击";
        document.body.appendChild(btn);
        btn.onclick = () => {
            let iframe = document.createElement("iframe");
            document.body.appendChild(iframe);
            iframe.src = "model_project/index.html";
            iframe.onload = () => {
                iframe.contentWindow.window["__tag__"] = "modelwin_" + 123;
                //iframe.contentWindow.window
            };
        };
        //IFrame 在同一个源中可以互相访问
        //现在需要Frame窗口化，  
    });
}
start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR3pELFNBQWUsS0FBSzs7UUFDZixNQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQ3RDLE1BQWMsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRWxELFVBQVU7UUFDVixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRS9CLEdBQUcsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFO1lBQ2YsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM5QyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsR0FBRyxHQUFHLDBCQUEwQixDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO2dCQUNoQixNQUFNLENBQUMsYUFBYSxDQUFDLE1BQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxXQUFXLEdBQUcsR0FBRyxDQUFDO2dCQUNwRSw2QkFBNkI7WUFDakMsQ0FBQyxDQUFBO1FBQ0wsQ0FBQyxDQUFBO1FBRUQscUJBQXFCO1FBQ3JCLGlCQUFpQjtJQUNyQixDQUFDO0NBQUE7QUFDRCxLQUFLLEVBQUUsQ0FBQyJ9