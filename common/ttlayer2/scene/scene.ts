import { IViewItem } from "../pipeline/viewlist";

//节点也必须继承这个,不过不想让用户可以随时访问当
export interface ISceneItemSetParent {
    SetParent(parent: ISceneItemNode): void
}
export interface ISceneItemNode extends ISceneItem {

    AddChild(item: ISceneItem): void;
    RemoveChild(item: ISceneItem): void;
    GetItems(): ISceneItem[];
    SetItems(items: ISceneItem[]): void
}
export interface ISceneItem extends IViewItem {
    GetParent(): ISceneItemNode;
    IsGroup(): boolean;
}