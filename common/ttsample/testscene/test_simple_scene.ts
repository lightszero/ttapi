import { tt } from "../../ttapi/ttapi.js";
import { ElementInst, ElementSprite } from "../../ttlayer2/graphics/pipeline/render/elem.js";
import { Render_Element_Tbo } from "../../ttlayer2/graphics/pipeline/render/render_elem_tbo.js";
import { Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, QUI_Button, QUI_Label, QUI_ScreenFixer, Scene, DrawLayer_Scene } from "../../ttlayer2/ttlayer2.js";
import { GContext, TTState_All } from "../ttstate_all.js";
import { Test_Base } from "../test_base.js";


export class Test_Scene_Simple extends Test_Base {

    scene: Scene;

    OnInit(nav: TTState_All): void {
        super.OnInit(nav);

        //添加一个场景到DrawLayer，这个是纯粹的显示能力
        this.scene = new Scene();
        let drawlayer =new DrawLayer_Scene(this.scene);
        GameApp.GetViewList().AddDrawLayer(drawlayer);
        let camera= drawlayer.GetCamera();//注意相机在drawlayer之上，如果你要从场景外访问相机就是现在了
        
        //竖屏比例限制
        this.container.setAsp(2 / 3, 1 / 2);
        //限制只针对GUI
        
        //还需要对场景也施加显示限制
    }

    //把事件也交给场景
    OnKey(keycode: string, press: boolean): void {
        this.scene.OnKey(keycode,press);
    }
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {
        this.scene.OnPoint(id,x,y,press,move);
    }
}