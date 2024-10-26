

// /// <reference path="../../lib/index.d.ts" />
// import { tt } from "../../ttapi/ttapi";

// export namespace tt_impl {
//     class WxSound implements tt.ISound {
//         audioContext: WxAudio;
//         url: string;
//         freeAudios: WechatMinigame.InnerAudioContext[];
//         //playedaudio: WechatMinigame.InnerAudioContext[];
//         constructor(a: WxAudio, url: string) {
//             this.audioContext = a;
//             this.url = url;
//             //this.playedaudio = [];
//             this.freeAudios = [];
//             //先缓存至少一个
//             let free = this.GetFree();

//             this.freeAudios.push(free);
//         }
//         loaded: boolean;
//         onEnd: ((sound: tt.ISound) => void) | null


//         GetFree(): WechatMinigame.InnerAudioContext {
//             //console.log("--audio get free.");
//             if (this.freeAudios.length > 0) {
//                 let a = this.freeAudios.pop();
//                 a.seek(0);
//                 return a;
//             }
//             else {
//                 var na = wx.createInnerAudioContext();
//                 na.src = this.url;
//                 na.loop = false;
//                 na.onEnded(() => {
//                     if (this.onEnd != null) {
//                         this.onEnd(this);
//                     }
//                     this.SetFree(na);
//                     let c = (na as any)._channel as WxChannel;
//                     c.playedaudio.splice(c.playedaudio.indexOf(na), 1);
//                     //this.playedaudio.splice(this.playedaudio.indexOf(na), 1);
//                     //console.log("this.playedaudio conut=" + this.playedaudio.length);
//                 });
//                 return na;
//             }
//         }
//         SetFree(a: WechatMinigame.InnerAudioContext) {
//             //console.log("--audio set free.");
//             this.freeAudios.push(a);
//         }
//     }
//     class WxBGM implements tt.IBGM {
//         constructor(url: string) {
//             this.audioBGM = wx.createInnerAudioContext();
//             this.audioBGM.onEnded = () => {
//                 if (this.onEnd != null) {
//                     this.onEnd(this);
//                 }
//             }
//             this.audioBGM.loop = true;
//             this.url = this.audioBGM.src = url;
//             this.loaded = true;
//         }
//         url: string;

//         loaded: boolean;
//         onEnd: ((bgm: tt.IBGM) => void) | null;
//         audioBGM: WechatMinigame.InnerAudioContext;
//         setLoop(loop: boolean): void {
//             this.audioBGM.loop = loop;
//         }
//         getLoop(): boolean {
//             return this.audioBGM.loop;
//         }
//     }
//     export class WxChannel implements tt.IChannel {
//         constructor(a: WxAudio) {
//             this.audioContext = a;
//             this.volume = 1.0;
//             this.playedaudio = [];
//         }
//         audioContext: WxAudio;
//         bgmaudio: WechatMinigame.InnerAudioContext;
//         playedaudio: WechatMinigame.InnerAudioContext[];
//         volume: number;
//         setVolume(v: number): void {
//             this.volume = v;
//             for (var i = 0; i < this.playedaudio.length; i++) {
//                 this.playedaudio[i].volume = v;
//             }
//             if (this.bgmaudio != null) {
//                 this.bgmaudio.volume = v;
//             }
//         }
//         getVolume(): number {
//             return this.volume;
//         }


//         SetBGM(bgm: tt.IBGM | null): void //直接播放,BGM只有一个
//         {
//             if (this.bgmaudio != null) {
//                 this.bgmaudio.stop();
//                 this.bgmaudio = null;
//             }
//             if (bgm != null) {
//                 this.bgmaudio = (bgm as WxBGM).audioBGM;

//                 this.bgmaudio.volume = this.volume;
//                 this.bgmaudio.seek(0);
//                 this.bgmaudio.play();
//             }
//         }

//         PlaySound(sound: tt.ISound): void //Sound播放一次，短小
//         {
//             let s = (sound as WxSound).GetFree();
//             (s as any)._channel = this;
//             this.playedaudio.push(s);
//             s.volume = this.volume;
//             s.play();

//         }
//     }
//     export class WxAudio implements tt.IAudio {
//         constructor() {


//         }
//         private _channels: tt.IChannel[] = []

//         GetChannel(id: number): tt.IChannel {
//             if (id < 0 || id > 16) throw new Error("error audio channel count.");
//             while (id >= this._channels.length) {
//                 this._channels.push(null);
//             }
//             let c = this._channels[id] = new WxChannel(this);
//             return c;
//         }
//         CreateBGM(url: string): tt.IBGM {
//             return new WxBGM(url);
//         }
//         CreateSound(url: string): tt.ISound {
//             return new WxSound(this, url);
//         }
//         CreateSoundFromArrayBuffer(array: ArrayBuffer): tt.ISound {
//             let blob = new Blob([array]);
//             let url = URL.createObjectURL(blob);
//             return new WxSound(this, url);
//         }
//         ReInit(): void//在一些平台上Audio必须在onclick事件中初始化，留下这个接口
//         {
//             console.log("no need reinit audio on wx.")
//         }
//     }
// }