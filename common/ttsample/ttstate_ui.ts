
import { tt } from "../ttapi/ttapi.js";
import { Comp_Label } from "../ttlayer2/scene/component/comp_label.js";
import { Comp_Sprite } from "../ttlayer2/scene/component/comp_sprite.js";


import { Font, GameApp, IState, Texture, TextureFormat, Sprite, Color, Border } from "../ttlayer2/ttlayer2.js";
import { DrawLayer_GUI } from "../ttlayer2/pipeline/drawlayer_gui.js";
import { QUI_Image } from "../ttui/qui_image.js";
import { QUI_Label } from "../ttui/qui_label.js";
import { QUI_Button } from "../ttui/qui_button.js";
import { Atlas } from "../ttlayer2/atlas/atlas.js";
import { QUI_Scale9 } from "../ttui/qui_scale9.js";
import { QUI_ImageScale9 } from "../ttui/qui_imagescale9.js";

export class TTState_UI implements IState<any> {
    OnKey(keycode: string, press: boolean): void {

    }
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {

    }
    uiview: DrawLayer_GUI;

    font: Font;

    OnInit(): void {
        let gl = tt.graphic.GetWebGL();

        ///准备一个视图,FlatView 是一个简洁的View,他下面可以放置若干个FlatViewItem
        this.uiview = new DrawLayer_GUI();
        GameApp.GetViewList().AddView(this.uiview);
        this.uiview.canvas.scale=4.0;

        this.font = new Font(gl, "VonwaonBitmap-16px", 24);

        this.asyncinit();
    }

    async asyncinit() {
        //加载一张贴图

        let atlas = new Atlas();
        await atlas.LoadAsync("./ttsample/data/uires_pack0.png.json");

        let grid = atlas.GetSprite("panelback2");
        let uiimg = new QUI_ImageScale9();
        uiimg.scale9 = new QUI_Scale9(grid, new Border(4, 4, 4, 4), 16, 16);
        this.uiview.canvas.addChild(uiimg);

        uiimg.localRect.setHPosFill(0, 0);
        uiimg.localRect.setVPosByTopBorder(100, 0);


        let label = new QUI_Label(this.font, "Hello world");
        this.uiview.canvas.addChild(label);
        label.localRect.setHPosByLeftBorder(300, 64);
        label.localRect.setVPosByTopBorder(30, 128);

        let btn = new QUI_Button();

        let btnNormal = new QUI_Image();
        btnNormal.sprite = atlas.GetSprite("grid");
        btnNormal.color = new Color(1, 0, 0, 1);
        btnNormal.localRect.setAsFill();
        btn.ElemNormal = btnNormal;

        let btnClick = new QUI_Image();
        btnClick.sprite = atlas.GetSprite("grid");
        btnClick.color = new Color(0, 0, 1, 1);
        btnClick.localRect.setAsFill();
        btn.ElemPress = btnClick;

        btn.localRect.setHPosByLeftBorder(300, 64);
        btn.localRect.setVPosByTopBorder(30, 164);
        this.uiview.canvas.addChild(btn);

    }
    OnUpdate(delta: number): void {

    }
    OnExit(): void {

    }
    OnResize(width: number, height: number): void {

    }
}