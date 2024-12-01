import { Color, Vector2, Vector3 } from "../../../ttlayer2.js";

export class ElementSprite {
    index: number = -1;//未分配索引
    //pos 来自Attr
    sizeTL: Vector2; //最常见的值 (-8,-8)
    sizeRB: Vector2; //最常见的值 (8,8) //这样就能构成一个 中心定位的16x16的元素
    uvCenter: Vector2;//UV中心
    uvHalfSize: Vector2;//UV半径
    uvLayer: number;
    eff: number;
}
//directdraw pos3+uv+color+eff 4  *6 noebo = 42 float 最小
//ElementAttr = 8 float 1/5
export class ElementInst {
    pos: Vector3; //32
    rotate: number;
    scale: Vector2;
    color: Color;

    elem: ElementSprite;
    //instid: number;//忘了一个
}
