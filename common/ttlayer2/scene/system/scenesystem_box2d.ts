// 导出一个名为box2dworkd的类，实现ISceneSystem接口

import { b2, SceneComp_Collider, Scene, Vector2, colliderSharp as ColliderSharp } from "../../ttlayer2.js";
//场景应该有机的结合多种渲染器，将渲染器牢牢的隔离在逻辑之外
export interface ISceneSystem {
    get type(): string;
    OnAdd(scene: Scene): void
    OnRemove(): void;
    OnUpdate(delta: number, tag: number): void;
}
// 导出box2dworkd类，实现ISceneSystem接口

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
    CreateBody(sharp: ColliderSharp, size: Vector2, layer: number, mask: number): b2.b2Body {
        // 在世界中创建一个动态物体
        let body = this.b2world.CreateBody(
            { type: b2.b2BodyType.b2_dynamicBody }
        );
        // 定义一个形状变量
        let psharp: b2.b2Shape = null;
        // 如果形状是Box
        if (sharp == ColliderSharp.Box) {
            // 创建一个矩形形状
            let boxs = psharp = new b2.b2PolygonShape();
            // 设置矩形形状的大小
            boxs.SetAsBox(size.X, size.Y);
        }
        else if (sharp == ColliderSharp.Circle) {
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
        let u1 = _contact.m_fixtureA.m_body.m_userData as SceneComp_Collider;
        let u2 = _contact.m_fixtureB.m_body.m_userData as SceneComp_Collider;
        u1?.OnHit?.(u2);
        u2?.OnHit?.(u1);
    }

    /**
     * Called when two fixtures cease to touch.
     */
    public EndContact(_contact: b2.b2Contact): void {
        let u1 = _contact.m_fixtureA.m_body.m_userData as SceneComp_Collider;
        let u2 = _contact.m_fixtureB.m_body.m_userData as SceneComp_Collider;
        u1?.OnUnhit?.(u2);
        u2?.OnUnhit?.(u1);
    }
}