

import { tt } from "../../ttapi/ttapi.js";
//innerAudioContext 大量使用无法调音量
//webAudioContext wechat 不支持流式播放
//只好把两个合并了 innerAudioContext做BGM
export namespace tt_impl {
    class Sound_Impl implements tt.ISound {
        constructor(audioContext: WechatMinigame.WebAudioContext, url: string | null, array: ArrayBuffer | null) {

            if (url != null && array == null) {
                this.loaded = false;
                this.initByUrlAsync(audioContext, url);
            }

            else if (array != null && url == null) {
                this.initByDataAsync(audioContext, array);
            }
        }
        buffer: WechatMinigame.AudioBuffer | null;
        private async initByUrlAsync(audioContext: WechatMinigame.WebAudioContext, url: string) {
            let buff = await tt.loader.LoadBinaryAsync(url);
            //let req = await fetch(url);
            //let buff = await req.arrayBuffer();
            this.buffer = await (audioContext as any).decodeAudioData(buff);
            this.loaded = true;
        }
        private async initByDataAsync(audioContext: WechatMinigame.WebAudioContext, array: ArrayBuffer) {
            this.buffer = await (audioContext as any).decodeAudioData(array);
            this.loaded = true;
        }


        loaded: boolean;
        onEnd: ((sound: tt.ISound) => void) | null
    }
    class WX_BMG_Impl implements tt.IBGM {
        constructor(audioContext: WechatMinigame.WebAudioContext, url: string) {

            //let bgmaudio = new HTMLAudioElement();
            this.url = url;
            // bgmaudio.loop = true;
            // debugger;//error
            // //this.node = audioContext.createBufferSource(bgmaudio);
            // this.loaded = false;
            // bgmaudio.onload = () => {
            //     this.loaded = true;
            // }
            // bgmaudio.loop = true;
            // bgmaudio.onended = () => {
            //     if (this.onEnd != null)
            //         this.onEnd(this);
            // }
            this.loaded = true;
            this._loop = true;
        }
        //node: MediaElementAudioSourceNode;
        url: string;
        loaded: boolean;
        _loop: boolean;
        setLoop(loop: boolean): void {
            this._loop = true;
            //this.node.mediaElement.loop = loop;
        }
        getLoop(): boolean {
            return this._loop;
            //return this.node.mediaElement.loop;
        }
        onEnd: ((sound: tt.IBGM) => void) | null
    }

    export class Channel_Impl implements tt.IChannel {
        constructor(audioContext: WechatMinigame.WebAudioContext) {
            this.audioContext = audioContext;
            this.vol = this.audioContext.createGain();
            this.vol.connect(this.audioContext.destination);
            this.vol.gain.value = 1.0
        }
        audioContext: WechatMinigame.WebAudioContext;
        vol: WechatMinigame.GainNode;//音量节点
        sourceBGM: WechatMinigame.InnerAudioContext = null;
        inBGM: WX_BMG_Impl = null;

        SetBGM(bgm: tt.IBGM | null): void {
            if (this.sourceBGM != null) {
                this.sourceBGM.stop();
                this.inBGM = null;
            }
            if (bgm != null) {
                this.inBGM = bgm as WX_BMG_Impl;
                if (this.sourceBGM == null) {
                    this.sourceBGM = wx.createInnerAudioContext();
                   
                    this.sourceBGM.onEnded = () => {
                        if (this.inBGM != null && this.inBGM.onEnd != null) {
                            this.inBGM.onEnd(this.inBGM);
                        }
                    }
                }
                this.sourceBGM.loop = this.inBGM.getLoop();
                this.sourceBGM.src = this.inBGM.url;
                this.sourceBGM.seek(0);
                this.sourceBGM.volume = this.getVolume();
                this.sourceBGM.play();
            }


        }

        setVolume(v: number): void {
            this.vol.gain.value = v;
            if (this.sourceBGM != null) {
                this.sourceBGM.volume = v;
            }
        }
        getVolume(): number {
            return this.vol.gain.value;
        }

        PlaySound(sound: tt.ISound): void //Sound播放一次，短小
        {

            let node = this.audioContext.createBufferSource();
            node.buffer = (sound as Sound_Impl).buffer;
            node.connect(this.vol);
            node.loop = false;
            node.start();
            if ((sound as Sound_Impl).onEnd != null) {
                node.onended = () => {
                    (sound as Sound_Impl).onEnd(sound);
                }
            }
        }

    }
    export class AudioImpl implements tt.IAudio {
        constructor() {
            // this.audioBGM = wx.createInnerAudioContext({ "useWebAudioImplement": false });
            try {
                
                //var _AudioContext = window["AudioContext"] || window as any ["webkitAudioContext"] || window["mozAudioContext"] || window["msAudioContext"];
                this.audioContext = wx.createWebAudioContext();// new AudioContext();
                console.log("audio Context inited");
            }
            catch (e) {
                console.error("!Your browser does not support AudioContext");
                throw new Error("!Your browser does not support AudioContext");
            }


            this.Init();
        }

        channels: (tt.IChannel | null)[] = []
        GetChannel(id: number): tt.IChannel | null {
            if (id > 16 || id < 0) {
                throw new Error("error channel id.");
                return null;
            }
            while (this.channels.length <= id) {
                this.channels.push(null);
            }
            if (this.channels[id] == null) {
                this.channels[id] = new Channel_Impl(this.audioContext);
            }
            return this.channels[id];
        }
        audioContext: WechatMinigame.WebAudioContext;

        CreateBGM(url: string): tt.IBGM {
            return new WX_BMG_Impl(this.audioContext, url);
        }
        CreateSound(url: string): tt.ISound {
            return new Sound_Impl(this.audioContext, url, null);
        }
        CreateSoundFromArrayBuffer(array: ArrayBuffer): tt.ISound {
            return new Sound_Impl(this.audioContext, null, array);
        }
        //audioBGM: WechatMinigame.InnerAudioContext;
        private Init(): void {
            // create empty buffer
            if (this.audioContext != null) {
                //产生一个空声音播放一下
                var buffer = this.audioContext.createBuffer(1, 1, 22050);
                var source = this.audioContext.createBufferSource();
                source.buffer = buffer;
                // connect to output (your speakers)
                source.connect(this.audioContext.destination);
                // play the file
                source.start();
            }
        }

        ReInit(): void {
            this.Init();
        }
    }
}