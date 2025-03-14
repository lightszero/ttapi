import { MyLogic } from "./editormain.js";
import { tt_impl } from "./ttimpl_web/ttimpl_web.js";
import { GameApp, ResourceOption } from "./ttlayer2/ttlayer2.js";
window.onload = () => {
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
    let op = new ResourceOption();
    GameApp.Start(op, new MyLogic());
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO0lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFNUIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDbkMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUM1QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVsQyxJQUFJO0lBQ0osc0JBQXNCO0lBQ3RCLCtDQUErQztJQUMvQyx1Q0FBdUM7SUFDdkMsOEJBQThCO0lBQzlCLDZCQUE2QjtJQUM3Qiw4QkFBOEI7SUFDOUIsaUNBQWlDO0lBQ2pDLDJDQUEyQztJQUMzQywwQ0FBMEM7SUFDMUMseURBQXlEO0lBQ3pELHNDQUFzQztJQUN0QyxJQUFJO0lBQ0osMkJBQTJCO0lBQzNCLElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztJQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUE7QUFFcEMsQ0FBQyxDQUFBIn0=