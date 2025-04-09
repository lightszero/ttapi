import { Camera, IRenderTarget } from "../ttlayer2.js";
import { ISceneComponent, ISceneRender, ISceneRenderItem, SceneNode, SceneRenderType } from "./scene.js";

export class SceneRender_ElementInst implements ISceneRender {
    constructor(noorder: boolean = false) {

    }
    Render(camera: Camera, renderTarget: IRenderTarget, tag: number, renderItems: ISceneRenderItem[]): void {

    }
    RenderOrdered(camera: Camera, renderTarget: IRenderTarget, tag: number, renderItems: ISceneRenderItem): void {

    }

}
export class SceneComp_Element implements ISceneComponent, ISceneRenderItem {
    get type(): SceneRenderType {
        throw new Error("Method not implemented.");
    }
    get sort(): boolean {
        throw new Error("Method not implemented.");
    }
    get sortz(): number {
        throw new Error("Method not implemented.");
    }
    OnUpdate(delta: number): void {
        throw new Error("Method not implemented.");
    }
    OnAdd(node: SceneNode): void {
        throw new Error("Method not implemented.");
    }
    OnRemove(): void {
        throw new Error("Method not implemented.");
    }

}