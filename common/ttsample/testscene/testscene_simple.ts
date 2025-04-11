import { colliderSharp, SceneComp_Collider, Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, QUI_Button, QUI_Label, QUI_ScreenFixer, Scene, DrawLayer_Scene, SceneNode, SceneComp_Mesh, SceneComp_Sprite, ISceneComponent } from "../../ttlayer2/ttlayer2.js";
import { GContext, TTState_All } from "../ttstate_all.js";
import { Test_Base } from "../test_base.js";

class mycomp implements ISceneComponent {
    get CompType(): string {
        return "mycomp";
    }
    target: Vector2;
    constructor() {
        this.target = new Vector2(Math.random() * 1000 - 500, Math.random() * 1000 - 500);
    }
    OnUpdate(delta: number): void {
        let dir = Vector2.Dir(this._node.poslocal, this.target);
        let dist = Vector2.Dist(this._node.poslocal, this.target);
        var movedist = 400 * delta;
        if (dist * 0.5 <= movedist) {
            movedist = dist * 0.5;

            this.target = new Vector2(Math.random() * 1000 - 500, Math.random() * 1000 - 500);

        }
        dir.X *= movedist;
        dir.Y *= movedist;
        let npos = Vector2.Add(this._node.poslocal, dir);

        this._node.poslocal = new Vector3(npos.X, npos.Y, 0);

    }
    private _node: SceneNode;
    get Node(): SceneNode {
        return this._node;
    }
    OnAdd(node: SceneNode): void {
        this._node = node;
    }
    OnRemove(): void {
        this._node = null;
    }

}
export class Test_Scene_Simple extends Test_Base {

    scene: Scene;
    scenelayer: DrawLayer_Scene;
    OnInit(nav: TTState_All): void {
        //添加一个场景到DrawLayer，这个是纯粹的显示能力
        this.scene = new Scene();
        this.scenelayer = new DrawLayer_Scene(this.scene);
        GameApp.GetViewList().AddDrawLayer(this.scenelayer);

        super.OnInit(nav);




        //竖屏比例限制
        this.container.setAsp(2 / 3, 1 / 2);
        //限制只针对GUI

        //还需要对场景也施加显示限制

        //默认的node 不传递父子pos关系
        let node = new SceneNode();
        //node.passOffset=true;
        //仅当passOffset 打开时才传递。

        node.name = "rectgroup";
        //console.log("node" + node.name + " is inscene" + node.InScene());

        this.scene.GetRoot().Node_Add(node);

        //console.log("node" + node.name + " is inscene" + node.InScene());

        for (var i = 0; i < 1000; i++) {
            let node2 = new SceneNode();

            node2.name = "mynode_" + i;

            //console.log("node2" + node2.name + " is inscene" + node2.InScene());
            node.Node_Add(node2);
            //console.log("node2" + node2.name + " is inscene" + node2.InScene());
            node2.poslocal = new Vector3(i * 15, 0, 0);
            let sprite = new SceneComp_Sprite();
            node2.Comp_Add(sprite);
            node2.Comp_Add(new mycomp());

            let collider = new SceneComp_Collider();
            collider.sharptype = colliderSharp.Box;
            collider.sharpsize = new Vector2(10, 10);
            //默认设置是和32个层碰撞
            //collider.touchlayermask = 0;//不和任何东西碰撞
            collider.OnHit = (other) => {
                console.log("hit from:" + other.Node.id + " to:" + collider.Node.id);
            }
            node2.Comp_Add(collider);
        }
    }
    OnUpdate(delta: number): void {
        let camera = this.scenelayer.GetCamera();//注意相机在drawlayer之上，如果你要从场景外访问相机就是现在了
        let canvas = this.container.GetCanvas();
        if (camera == null || canvas.camera == null)
            return;
        //限制场景层的显示区域，以免漏到UI外面去
        camera.limitRect = this.container.getWorldRectScale(canvas.camera.Scale);


    }
    OnExit(): void {
        GameApp.GetViewList().RemoveDrawLayer(this.scenelayer);
    }

    //把事件也交给场景
    OnKey(keycode: string, press: boolean): void {
        this.scene.OnKey?.(keycode, press);
    }
    OnPointAfterGUI(id: number, x: number, y: number, press: boolean, move: boolean): void {
        this.scene.OnPoint?.(id, x, y, press, move);
    }
}