export namespace tt {
    export var graphic: IGraphic;
    export var platform: IPlatform;
    export var store: IStore
    // export var rootPack:IPackGroup;
    export var input: IInput;
    export var audio: IAudio;
    export var loader: ILoader;

    export async function sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    export interface IStore {
        Init(): Promise<boolean>;
        GetText(name: string): Promise<string | null>;
        GetBinary(name: string): Promise<Uint8Array | null>;
        SaveText(name: string, data: string): Promise<void>;
        SaveBinary(name: string, data: Uint8Array): Promise<void>;
        SaveDataToLocal(key: string, data: string | ArrayBuffer): Promise<boolean>
    }

    export interface IPlatform {
        getPlatformName(): string;
    }


    export class InputPoint {
        id: number = 0;
        x: number = 0;
        y: number = 0;
        press: boolean = false;
        move: boolean = false;
        Clone(): InputPoint {
            let p = new InputPoint();
            p.id = this.id;
            p.x = this.x;
            p.y = this.y;
            p.press = this.press;
            return p

        }
    }
    export interface IInput {
        //触摸点或者鼠标
        //对鼠标的有限支持,id=0，inputpoint[0]是鼠标，触摸从1开始

        GetInputPoints(): InputPoint[];
        OnPoint: null | ((id: number, x: number, y: number, press: boolean, move: boolean) => void);

        //键盘
        IsKeyDown(keycode: string): boolean
        GetPressKeys(): string[];
        OnKey: null | ((keycode: string, press: boolean) => void);



        //弹出输入文本框
        Prompt(message: string, deftxt: string, maxlen: number, font: string): Promise<string>
    }
    export class ImageBuffer {
        width: number = 0;
        height: number = 0;
        gray: boolean = false;
        data: Uint8Array = null;
    }
    export interface ILoader {
        GetPathSplitChar(): string;
        LoadStringAsync(name: string): Promise<string>;
        LoadBinaryAsync(name: string): Promise<ArrayBuffer>;
        LoadImageAsync(name: string): Promise<HTMLImageElement>;
        LoadImageDataAsync(name: string): Promise<ImageData>;
        LoadCustomFont(name: string, url: string): Promise<string>
    }

    export interface IGraphic {
        GetWebGL(): WebGL2RenderingContext;

        GetBackGroundC2D(): CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

        getDeviceScreenWidth(): number;
        getDeviceScreenHeight(): number;
        getDevicePixelRadio(): number;
        getMainScreenScale(): number;
        setMainScreenScale(v: number): void;
        getFinalScale(): number;

        OnUpdate: ((delta: number) => void) | null;
        OnResize: ((width: number, height: number) => void) | null;
        OnRender: (() => void) | null;
    }


    export interface IBGM {
        url: string;
        setLoop(loop: boolean): void;
        getLoop(): boolean;
        loaded: boolean;
        onEnd: ((bgm: IBGM) => void) | null;
    }
    export interface ISound {
        loaded: boolean;
        onEnd: ((sound: ISound) => void) | null
    }
    export interface IChannel {
        setVolume(v: number): void
        getVolume(): number;

        SetBGM(bgm: IBGM | null): void; //直接播放,BGM只有一个

        PlaySound(sound: ISound): void; //Sound播放一次，短小
    }
    export interface IAudio {
        GetChannel(id: number): IChannel
        CreateBGM(url: string): IBGM;
        CreateSound(url: string): ISound;
        CreateSoundFromArrayBuffer(array: ArrayBuffer): ISound;
        ReInit(): void;//在一些平台上Audio必须在onclick事件中初始化，留下这个接口
    }
}