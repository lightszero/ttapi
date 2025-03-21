import { b2Drawer, b2, QUI_BaseElement, QUI_Canvas, QUI_ElementType, QUI_Image } from "../../ttlayer2/ttlayer2.js";
import { TTState_All } from "../ttstate_all.js";
import { Test_Base } from "./test_base.js";

export class QUI_Box2dDebuger extends QUI_BaseElement {
    GetElementType(): QUI_ElementType {
        return QUI_ElementType.Element_Bar;
    }
    b2world: b2.b2World;
    b2debug: b2Drawer = new b2Drawer(null);
    OnRender(canvas: QUI_Canvas): void {
        this.b2debug.batcher = canvas.batcherUI;
        b2.DrawShapes(this.b2debug, this.b2world);
        b2.DrawAABBs(this.b2debug, this.b2world);
        canvas.batcherUI.ApplyBatch();

    }
}
export class Test_Box2D extends Test_Base {
    b2world: b2.b2World

    //我们只算碰撞用不着这些
    b2op: b2.b2StepConfig = { velocityIterations: 0, positionIterations: 0 }

    bodys: b2.b2Body[] = [];
    OnInit(nav: TTState_All): void {
        super.OnInit(nav);
        //重力方向
        this.b2world = b2.b2World.Create({ x: 0, y: 0 });
        let b2debug = new QUI_Box2dDebuger();
        b2debug.b2world = this.b2world;
        this.guilayer.GetCanvas().AddChild(b2debug)

        for (let i = 0; i < 30; i++) {
            let b = this.b2world.CreateBody(
                { type: b2.b2BodyType.b2_dynamicBody }
            );

            let psharp: b2.b2Shape = null;
            if (i % 2 == 0) {
                psharp = new b2.b2CircleShape();
                psharp.m_radius = 25;
            }
            else {
                let boxs = psharp = new b2.b2PolygonShape();
                boxs.SetAsBox(25, 25);
            }

            let f = b.CreateFixture({ shape: psharp, isSensor: true });
            f.SetUserData("body:" + i);
            if (i % 2 == 0) {
                //属于第1组，可以碰到第二组
                f.SetFilterData({ categoryBits: 1 << 0, maskBits: 1 << 1 });
            }
            else {
                //属于第2组，可以碰到第1组
                f.SetFilterData({ categoryBits: 1 << 1, maskBits: 1 << 0 });
            }
            b.SetTransformXY(i * 10, i * 10, 0);
            //b.SetUserData("body:" + i);
            this.bodys.push(b);
            let s = new QUI_Image();
            s.localRect.setByPosAndSize(i * 10, i * 10, 8, 8);
            this.guilayer.GetCanvas().AddChild(s);
        }

    }
    OnExit(): void {
        super.OnExit();
    }
    OnUpdate(delta: number): void {
        this.b2world.Step(delta, this.b2op);
    }



}