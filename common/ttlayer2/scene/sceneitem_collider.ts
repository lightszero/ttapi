import { b2, Vector2 } from "../ttlayer2.js";
import { ISceneSystem, Scene } from "./scene.js";
import { ISceneComponent, SceneNode } from "./scenenode.js";


// 导出一个名为box2dworkd的类，实现ISceneSystem接口
// 导出box2dworkd类，实现ISceneSystem接口
export enum Box2DSharp {
    Box,
    Circle,
}
export class Box2dWorld extends b2.b2ContactListener implements ISceneSystem {
    // 获取类名
    get type(): string {
        return "box2d"
    }
    b2op: b2.b2StepConfig = { velocityIterations: 0, positionIterations: 0 }
    b2world: b2.b2World;
    OnAdd(scene: Scene): void {
        //重力方向
        this.b2world = b2.b2World.Create({ x: 0, y: 0 });
        //let b2debug = new QUI_Box2dDebuger();
        //b2debug.b2world = this.b2world;
        this.b2world.SetContactListener(this);
    }
    OnRemove(): void {

    }
    // 更新方法，接收delta和tag两个参数
    OnUpdate(delta: number, tag: number): void {
        // console.log("box2dworkd");
        this.b2world.Step(0, this.b2op);
    }


    // 创建一个物体
    CreateBody(sharp: Box2DSharp, size: Vector2, layer: number, mask: number): b2.b2Body {
        // 在世界中创建一个动态物体
        let body = this.b2world.CreateBody(
            { type: b2.b2BodyType.b2_dynamicBody }
        );
        // 定义一个形状变量
        let psharp: b2.b2Shape = null;
        // 如果形状是Box
        if (sharp == Box2DSharp.Box) {
            // 创建一个矩形形状
            let boxs = psharp = new b2.b2PolygonShape();
            // 设置矩形形状的大小
            boxs.SetAsBox(size.X, size.Y);
        }
        else {
            psharp = new b2.b2CircleShape();
            psharp.m_radius = size.X;
        }
        let f = body.CreateFixture({ shape: psharp, isSensor: true });

        // 设置物体的碰撞属性
        // categoryBits 自己属于哪些组
        // maskBits 可以碰撞哪些组
        f.SetFilterData({ categoryBits: layer, maskBits: mask });

        return body;
    }
    //////////////////////////////
    //实现碰撞回调

    public BeginContact(_contact: b2.b2Contact): void {
        let u1 = _contact.m_fixtureA.m_body.m_userData as ColliderComp;
        let u2 = _contact.m_fixtureA.m_body.m_userData as ColliderComp;
        u1?.OnHit?.(u2);
        u2?.OnHit?.(u1);
    }

    /**
     * Called when two fixtures cease to touch.
     */
    public EndContact(_contact: b2.b2Contact): void {
        let u1 = _contact.m_fixtureA.m_body.m_userData as ColliderComp;
        let u2 = _contact.m_fixtureA.m_body.m_userData as ColliderComp;
        u1?.OnUnhit?.(u2);
        u2?.OnUnhit?.(u1);
    }
}
export class ColliderComp implements ISceneComponent {
    get CompType(): string {
        return "collider";
    }
    OnUpdate(delta: number): void {
        this._body.SetTransformXY(this._node.pos.X, this._node.pos.Y, 0);//this._node.rotate);
        //this.body.SetTransformXY(this.elem.pos.X, this.elem.pos.Y, this.elem.rotate);
    }
    private _node: SceneNode;

    get Node(): SceneNode {
        return this._node;
    }
    private _body: b2.b2Body;

    //this 都需要做dirty
    sharptype: Box2DSharp = Box2DSharp.Box;
    sharpsize: Vector2 = new Vector2(8, 8);
    layer: number = 1 << 0;//自己的碰撞层
    touchlayermask: number = 0xffffffff;// 1 << 0 | 1 << 1;//可以接触的碰撞层,32个位

    //box 2d 概念，形状，夹具，刚体
    //每一个碰撞体对应一个body，这个
    OnAdd(node: SceneNode): void {
        this._node = node;
        if (node.scene.GetSystem("box2d") == undefined) {
            node.scene.RegSystem(new Box2dWorld());
        }
        let system = node.scene.GetSystem("box2d") as Box2dWorld;
        this._body = system.CreateBody(this.sharptype, this.sharpsize, this.layer, this.touchlayermask);
        this._body.m_userData = this;
    }
    OnHit: (other: ColliderComp) => void;
    OnUnhit: (other: ColliderComp) => void;

    OnRemove(): void {
        this._node = null;
    }

}