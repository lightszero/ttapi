import { colliderSharp, SceneComp_Collider, Navigator, IState, Resources, Color, QUI_Panel, GameApp, DrawLayer_GUI, DrawLayer, DrawLayerTag, Vector2, Vector3, QUI_HAlign, QUI_Button, QUI_Label, QUI_ScreenFixer, Scene, DrawLayer_Scene, SceneNode, SceneComp_Mesh, SceneComp_Sprite, ISceneComponent, Rectangle } from "../../ttlayer2/ttlayer2.js";
import { GContext, TTState_All } from "../ttstate_all.js";
import { Test_Base } from "../test_base.js";

//小球组件
class ball implements ISceneComponent {
    get CompType(): string {
        return "mycomp";
    }
    rect: Rectangle = new Rectangle(-200, -400, 400, 800);

    dir: Vector2;
    constructor() {
        this.dir = Vector2.Normal(new Vector2(Math.random() * 1000 - 500, Math.random() * 1000 - 500));
    }
    OnUpdate(delta: number): void {
        let dir = this.dir.Clone();
        var movedist = 400 * delta;

        dir.X *= movedist;
        dir.Y *= movedist;

        let npos = Vector2.Add(this._node.poslocal, dir);
        //左右反弹
        if (npos.X < this.rect.X || npos.X > this.rect.X + this.rect.Width) {
            this.dir.X *= -1;
            dir.X *= -1;
            npos = Vector2.Add(this._node.poslocal, dir);
        }
        //超出上下范围，重置小球
        if (npos.Y < this.rect.Y || npos.Y > this.rect.Height + this.rect.Height) {
            this.dir.Y *= -1;
            dir.Y *= -1;
            npos = Vector2.Add(this._node.poslocal, dir);
            npos.X = 0;
            npos.Y = 0;
            this.dir = Vector2.Normal(new Vector2(Math.random() * 1000 - 500, Math.random() * 1000 - 500));
        }
        this._node.poslocal = new Vector3(npos.X, npos.Y, 0);

    }
    OnHitBoard(board: SceneComp_Collider) {
        this.dir.Y *= -1;
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
export class Test_Scene_BallGame extends Test_Base {

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
        {
            let board1 = new SceneNode("board1");
            this.scene.GetRoot().Node_Add(board1);
            let sprite = new SceneComp_Sprite();
            board1.Comp_Add(sprite);
            sprite.scale.X = 32;
            sprite.scale.Y = 4;
            board1.poslocal = new Vector3(0, -300, 0);

            let collider = new SceneComp_Collider();
            collider.sharptype = colliderSharp.Box;
            collider.sharphalfsize = new Vector2(sprite.scale.X * 4, sprite.scale.Y * 4);
            collider.layer = 1 << 1;
            collider.touchlayermask = 1 << 0;
            board1.Comp_Add(collider);

        }
        {
            let board2 = new SceneNode("board2");
            this.scene.GetRoot().Node_Add(board2);
            let sprite = new SceneComp_Sprite();
            board2.Comp_Add(sprite);
            sprite.scale.X = 32;
            sprite.scale.Y = 4;
            board2.poslocal = new Vector3(0, 300, 0);

            let collider = new SceneComp_Collider();
            collider.sharptype = colliderSharp.Box;
            collider.sharphalfsize = new Vector2(sprite.scale.X * 4, sprite.scale.Y * 4);
            collider.layer = 1 << 1;
            collider.touchlayermask = 1 << 0;

            board2.Comp_Add(collider);
        }


        //添加好多小球
        for (var i = 0; i < 1000; i++) {
            let node2 = new SceneNode();

            node2.name = "ball_" + i;

            //console.log("node2" + node2.name + " is inscene" + node2.InScene());
            node.Node_Add(node2);
            //console.log("node2" + node2.name + " is inscene" + node2.InScene());
            node2.poslocal = new Vector3(0, 0, 0);
            let sprite = new SceneComp_Sprite();
            node2.Comp_Add(sprite);
            let _ball = new ball();
            node2.Comp_Add(_ball);

            let collider = new SceneComp_Collider();
            collider.sharptype = colliderSharp.Box;
            collider.sharphalfsize = new Vector2(5, 5);
            collider.layer = 1 << 0;
            collider.touchlayermask = 1 << 1;

            //默认设置是和32个层碰撞
            //collider.touchlayermask = 0;//不和任何东西碰撞
            collider.OnHit = (other) => {
                //球碰到板
                _ball.OnHitBoard(other);

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