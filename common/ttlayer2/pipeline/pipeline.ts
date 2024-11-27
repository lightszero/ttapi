
import { Color, GameApp, IRenderTarget } from "../ttlayer2.js";
import { IDrawLayer, IViewRenderItem, DrawLayerList, DrawLayerTag } from "./drawlayer.js";



//梳理一下管线的逻辑

//管线操作View 进行绘制。
//一个View 可以有多个绘制遍

//比如，shadow ，main
//view 不需要暴露ViewItem概念

export interface IPileLine {
    Render(views: DrawLayerList): void;
}
export class PipeLine_Default implements IPileLine {

    private maintarget: IRenderTarget = null;
    Render(viewlist: DrawLayerList): void {
        if (this.maintarget == null)
            this.maintarget = GameApp.GetMainScreen();
        //默认管线,后期把这玩意儿搞成容易配置的

        this.maintarget.Begin();
        this.maintarget.Clear(new Color( 1,0.5,0.5,1));
       
        viewlist.RenderViews(DrawLayerTag.Main,this.maintarget,0);
        viewlist.RenderViews(DrawLayerTag.GUI,this.maintarget,0);
  
        

        this.maintarget.End();
     

    }
}