import { b2, Vector2 } from "../../ttlayer2.js";
import { ISceneComponent, SceneNode } from "../scene/scenenode.js";
import { Box2dWorld } from "../system/scenesystem_box2d.js";


export enum colliderSharp {
    Box,
    Circle,
}
export class SceneComp_Collider implements ISceneComponent {
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
    sharptype: colliderSharp = colliderSharp.Box;
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
    OnHit: (other: SceneComp_Collider) => void;
    OnUnhit: (other: SceneComp_Collider) => void;

    OnRemove(): void {
        this._node = null;
    }

}