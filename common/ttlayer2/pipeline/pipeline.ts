
import { Color, GameApp, IRenderTarget } from "../ttlayer2.js";
import { IView, IViewRenderItem, ViewList } from "./viewlist.js";

export interface IPileLine {
    Render(views: ViewList): void;
}
export class PipeLine_Default implements IPileLine {

    private maintarget: IRenderTarget = null;
    Render(viewlist: ViewList): void {
        if (this.maintarget == null)
            this.maintarget = GameApp.GetMainScreen();
        //默认管线,后期把这玩意儿搞成容易配置的

        //绘制BackBuffer
        let lasttarget: IRenderTarget = null;
        for (var i = 0; i < viewlist.views.length; i++) {
            let v = viewlist.views[i];
            let target = v.GetTarget();
            if (target == null)
                continue;//

            if (!target.IsMainOutput()) {
                if (lasttarget != target) {
                    if (lasttarget != null)
                        lasttarget.End();

                    lasttarget = target;
                    lasttarget.Begin();
                }
                let renders: IViewRenderItem[] = [];
                v.CollRenderItem(renders);
                viewlist.RenderList(v, renders, 0);
            }


        }

        if (lasttarget != null) {
            lasttarget.End();
        }

        //绘制上屏View

        this.maintarget.Begin();
        this.maintarget.Clear(new Color(1, 0, 1, 1));
        for (var i = 0; i < viewlist.views.length; i++) {
            let v = viewlist.views[i];
            let target = v.GetTarget();
            if (target == null)
                target = this.maintarget;
            if (target.IsMainOutput()) {
                let renders: IViewRenderItem[] = [];
                v.CollRenderItem(renders);
                viewlist.RenderList(v, renders, 0);
            }
        }
        GameApp.GetMainScreen().End();

    }
}