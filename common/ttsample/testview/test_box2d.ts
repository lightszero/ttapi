import { b2Drawer, b2, QUI_BaseElement, QUI_Canvas, QUI_ElementType, QUI_Image, ElementInst, DrawLayerList, DrawLayer, DrawLayerTag, GameApp, Render_Element_Tbo, Resources, Vector3, Vector2, Color } from "../../ttlayer2/ttlayer2.js";
import { TTState_All } from "../ttstate_all.js";
import { Test_Base } from "./test_base.js";

//面向对象 不适合js
export class b2obj {
    body: b2.b2Body;
    elem: ElementInst;//想用tbo
}
export class QUI_Box2dDebuger extends QUI_BaseElement {
    GetElementType(): QUI_ElementType {
        return QUI_ElementType.Element_Bar;
    }
    b2world: b2.b2World;
    b2debug: b2Drawer = new b2Drawer(null, 1);
    OnRender(canvas: QUI_Canvas): void {
        this.b2debug.batcher = canvas.batcherUI;
        b2.DrawShapes(this.b2debug, this.b2world);
        //b2.DrawAABBs(this.b2debug, this.b2world);
        canvas.batcherUI.ApplyBatch();

    }
}
export class Test_Box2D extends Test_Base {
    b2world: b2.b2World

    //我们只算碰撞用不着这些
    b2op: b2.b2StepConfig = { velocityIterations: 0, positionIterations: 0 }

    bodys: b2.b2Body[] = [];
    drawlayer: DrawLayer;
    render: Render_Element_Tbo;
    objs: b2obj[] = []
    OnInit(nav: TTState_All): void {
        super.OnInit(nav);

        this.drawlayer = new DrawLayer(DrawLayerTag.Main);
        let target = GameApp.GetMainScreen();

        //QUI 的 drawlayer 没有套用这个

        //;        this.batcherUI.LookAt.Y = target.getHeight() / 2;



        this.render = new Render_Element_Tbo();
        this.render.SetPackElement(Resources.GetPackElement());

        this.drawlayer.AddRender(this.render);

        GameApp.GetViewList().AddDrawLayer(this.drawlayer);

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
                psharp.m_radius = 12;
            }
            else {
                let boxs = psharp = new b2.b2PolygonShape();

                boxs.SetAsBox(10, 10);
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
            let sprite = Resources.GetBlock("border2");
            let obj = new b2obj();
            obj.body = b;
            obj.elem = new ElementInst();
            obj.elem.instid = sprite.index;
            obj.elem.color = Color.White;
            let pos = b.GetPosition();
            obj.elem.pos = new Vector3(pos.x, pos.y, 0);
            obj.elem.rotate = b.GetAngle();
            obj.elem.scale = new Vector2(1.0, 1.0);

            this.objs.push(obj);
            // let s = new QUI_Image();
            // s.localRect.setByPosAndSize(i * 10 - 4, i * 10 - 4, 8, 8);
            // this.guilayer.GetCanvas().AddChild(s);
        }

    }
    OnExit(): void {
        super.OnExit();
        GameApp.GetViewList().RemoveDrawLayers(this.drawlayer);
    }
    OnUpdate(delta: number): void {
        //同步camera 设置
        this.drawlayer.GetCamera().LookAt = this.guilayer.GetCamera().LookAt;
        this.drawlayer.GetCamera().Scale = this.guilayer.GetCamera().Scale;
        //b2debug.scale = this.guilayer.GetCamera().Scale;

        this.b2world.Step(delta, this.b2op);
        this.render.ClearElementInst();
        for (var i = 0; i < this.objs.length; i++) {
            this.render.AddElementInst(this.objs[i].elem);
        }
    }



}