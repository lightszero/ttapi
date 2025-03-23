import { b2Color } from "../../ttlayer2/box2d_core/src/index.js";
import { b2Drawer, b2, QUI_BaseElement, QUI_Canvas, QUI_ElementType, QUI_Image, ElementInst, DrawLayerList, DrawLayer, DrawLayerTag, GameApp, Render_Element_Tbo, Resources, Vector3, Vector2, Color, Camera } from "../../ttlayer2/ttlayer2.js";
import { TTState_All } from "../ttstate_all.js";
import { Test_Base } from "./test_base.js";

//面向对象 不适合js
export class b2obj {
    static g_id: number = 0;
    id: number;
    toString(): string {
        return "b2obj:" + this.id;
    }
    constructor() {
        b2obj.g_id++;
        this.id = b2obj.g_id;
    }
    body: b2.b2Body;
    elem: ElementInst;//想用tbo
    dir: Vector2 = Vector2.Zero;
    target: Vector2 = undefined;

    hitcount: number = 0;
    color: b2.b2Color = new b2.b2Color(0, 0, 1, 1);
    OnHit(b2obj: b2obj) {
        this.hitcount++;

        this.color = new b2.b2Color(1, 0, 0, 1);
    }
    OnUnHit(b2obj: b2obj) {
        this.hitcount--;
        if (this.hitcount == 0)
            this.color = new b2.b2Color(0, 0, 1, 1);
    }
    Update(delta: number) {
        let movedist = 30 * delta;
        if (this.target == null || Vector2.Dist(this.elem.pos, this.target) < movedist) {
            if (this.target == null) {
                this.target = Vector2.Zero;
            }
            this.target.X = Math.random() * 500;
            this.target.Y = Math.random() * 400;
        }
        this.dir = Vector2.Dir(this.elem.pos, this.target);
        let dist = Vector2.Dir(this.elem.pos, this.target);


        this.elem.pos.X += this.dir.X * movedist;
        this.elem.pos.Y += this.dir.Y * movedist;
        this.elem.rotate += delta * Math.PI;

        this.body.SetTransformXY(this.elem.pos.X, this.elem.pos.Y, this.elem.rotate);
    }
}
export class QUI_Box2dDebuger extends QUI_BaseElement {
    GetElementType(): QUI_ElementType {
        return QUI_ElementType.Element_Bar;
    }
    b2world: b2.b2World;
    b2debug: b2Drawer = new b2Drawer(null, 1);
    OnRender(canvas: QUI_Canvas): void {
        this.b2debug.batcher = canvas.batcherUI;

        //b2.DrawShapes(this.b2debug, this.b2world);
        //b2.DrawAABBs(this.b2debug, this.b2world);


        for (let b = this.b2world.GetBodyList(); b; b = b.m_next) {
            const xf = b.m_xf;

            this.b2debug.PushTransform(xf);

            for (let f: b2.b2Fixture | null = b.GetFixtureList(); f; f = f.m_next) {
                //if (within && !testOverlap(f, within)) continue;

                f.GetShape().Draw(this.b2debug, f.GetUserData().color);
            }

            this.b2debug.PopTransform(xf);
        }

        canvas.batcherUI.ApplyBatch();
    }
}
class box2dcallback extends b2.b2ContactListener {
    BeginContact(_contact: b2.b2Contact): void {

        let u1 = _contact.m_fixtureB.GetUserData();
        let u2 = _contact.m_fixtureA.GetUserData();
        u1.OnHit(u2);
        u2.OnHit(u1);

    }
    EndContact(_contact: b2.b2Contact): void {
        let u1 = _contact.m_fixtureB.GetUserData();
        let u2 = _contact.m_fixtureA.GetUserData();
        u1.OnUnHit(u2);
        u2.OnUnHit(u1);

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


        let target = GameApp.GetMainScreen();

        //QUI 的 drawlayer 没有套用这个

        //;        this.batcherUI.LookAt.Y = target.getHeight() / 2;




        //重力方向
        this.b2world = b2.b2World.Create({ x: 0, y: 0 });
        let b2debug = new QUI_Box2dDebuger();
        b2debug.b2world = this.b2world;
        this.b2world.SetContactListener(new box2dcallback());
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
            f.SetUserData(obj);
            obj.body = b;
            b.m_userData = obj;
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
        let camera: Camera = this.guilayer?.GetCanvas()?.camera;
        if (camera == null)
            return;
        if (this.drawlayer == null && camera != null) {
            this.drawlayer = new DrawLayer(DrawLayerTag.Main);
            this.render = new Render_Element_Tbo();
            this.render.SetPackElement(Resources.GetPackElement());

            this.drawlayer.AddRender(this.render);

            GameApp.GetViewList().AddDrawLayer(this.drawlayer);
        }
        let rect = this.guilayer.GetCanvas().GetWorldRect();
        console.log("canvas size(" + rect.Width + "," + rect.Height + ")");
        //同步camera 设置
        if (camera != null) {
            this.drawlayer.GetCamera().LookAt = camera.LookAt;
            this.drawlayer.GetCamera().Scale = camera.Scale;
        }
        //b2debug.scale = this.guilayer.GetCamera().Scale;

        this.b2world.Step(delta, this.b2op);
        this.render.ClearElementInst();
        for (var i = 0; i < this.objs.length; i++) {
            this.objs[i].Update(delta);
            this.render.AddElementInst(this.objs[i].elem);
        }
    }



}