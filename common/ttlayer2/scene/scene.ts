//场景是节点树

//节点上汇聚属性

//属性通过渲染器和System 完成功能
//但是渲染器和System 不需要暴露

export * from "./scene/sceneimpl.js"
export * from "./scene/scenenode.js"

export * from "./component/scenecomp_collider.js"
export * from "./component/scenecomp_spriteinst.js"
export * from "./component/scenecomp_sprite.js"
export * from "./component/scenecomp_mesh.js"

export * from "./system/scenesystem_box2d.js"
