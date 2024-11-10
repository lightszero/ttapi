
import { tt } from "../ttapi/ttapi.js";
import { Comp_Label } from "../ttlayer2/pipeline/component/comp_label.js";
import { Comp_Sprite } from "../ttlayer2/pipeline/component/comp_sprite.js";

import { Font, GameApp, IState, FlatView, FlatViewItem } from "../ttlayer2/ttlayer2.js";

export class TTState_UI implements IState {
    OnInit(): void {
        let gl = tt.graphic.GetWebGL();

        ///准备一个视图,FlatView 是一个简洁的View,他下面可以放置若干个FlatViewItem
        let view1 = new FlatView();//View 代表一个试图
        GameApp.GetViewList().views.push(view1);


        let font = new Font(gl, "VonwaonBitmap-16px", 24);

        {
            let viewItem = new FlatViewItem();//视图对象是视图里面可以排序的内容,可以可见,也可以不可见
            view1.items.push(viewItem);

            //一个viewItem 上只能添加一个渲染组件
            let canvas = new Comp_Label();
            canvas.font = font;
            canvas.text = "Hello Label.";
            viewItem.AddComponment(canvas);
        }
        {
            let viewItem = new FlatViewItem();//视图对象是视图里面可以排序的内容,可以可见,也可以不可见
            view1.items.push(viewItem);
            let sprite =new Comp_Sprite();
          
            viewItem.AddComponment(sprite);
        }

    }

    OnUpdate(delta: number): void {

    }
    OnExit(): void {

    }
    OnResize(width: number, height: number): void {

    }
}