//Json 格式描述
export class TTJson {
    refs: string[];//引用
    pics: { [id: string]: string };
    anis: { [id: string]: TTJsonAni };
}
export class TTJsonAni {
    fps: number;
    framecount: number;
    loop: boolean;
    frames: TTJsonFrame[];
    import: string;
}
export class TTJsonFrame {
    frameid: number;
    pics: string[];
}