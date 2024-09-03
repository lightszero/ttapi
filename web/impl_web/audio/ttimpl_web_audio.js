var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export var tt_impl;
(function (tt_impl) {
    class Sound_Impl {
        constructor(audioContext, url, array) {
            if (url != null && array == null) {
                this.loaded = false;
                this.initByUrlAsync(audioContext, url);
            }
            else if (array != null && url == null) {
                this.initByDataAsync(audioContext, array);
            }
        }
        initByUrlAsync(audioContext, url) {
            return __awaiter(this, void 0, void 0, function* () {
                let req = yield fetch(url);
                let buff = yield req.arrayBuffer();
                this.buffer = yield audioContext.decodeAudioData(buff);
            });
        }
        initByDataAsync(audioContext, array) {
            return __awaiter(this, void 0, void 0, function* () {
                this.buffer = yield audioContext.decodeAudioData(array);
                this.loaded = true;
            });
        }
    }
    class BMG_Impl {
        constructor(audioContext, url) {
            let bgmaudio = new HTMLAudioElement();
            this.url = bgmaudio.src = url;
            bgmaudio.loop = true;
            this.node = audioContext.createMediaElementSource(bgmaudio);
            this.loaded = false;
            bgmaudio.onload = () => {
                this.loaded = true;
            };
            bgmaudio.loop = true;
            bgmaudio.onended = () => {
                if (this.onEnd != null)
                    this.onEnd(this);
            };
        }
        setLoop(loop) {
            this.node.mediaElement.loop = loop;
        }
        getLoop() {
            return this.node.mediaElement.loop;
        }
    }
    class Channel_Impl {
        constructor(audioContext) {
            this.sourceBGM = null;
            this.inBGM = false;
            this.audioContext = audioContext;
            this.vol = this.audioContext.createGain();
            this.vol.gain.value = 1.0;
            this.vol.connect(this.audioContext.destination);
        }
        SetBGM(bgm) {
            if (this.inBGM) {
                this.inBGM = false;
                this.sourceBGM.disconnect();
                this.sourceBGM = null;
            }
            if (bgm != null) {
                this.sourceBGM = bgm.node;
                this.sourceBGM.connect(this.vol);
            }
        }
        setVolume(v) {
            this.vol.gain.value = v;
        }
        getVolume() {
            return this.vol.gain.value;
        }
        PlaySound(sound) {
            let node = this.audioContext.createBufferSource();
            node.buffer = sound.buffer;
            node.connect(this.vol);
            node.loop = false;
            node.start();
            if (sound.onEnd != null) {
                node.onended = () => {
                    sound.onEnd(sound);
                };
            }
        }
    }
    tt_impl.Channel_Impl = Channel_Impl;
    class AudioImpl {
        constructor() {
            this.channels = [];
            // this.audioBGM = wx.createInnerAudioContext({ "useWebAudioImplement": false });
            try {
                //var _AudioContext = window["AudioContext"] || window as any ["webkitAudioContext"] || window["mozAudioContext"] || window["msAudioContext"];
                this.audioContext = new AudioContext();
                console.log("audio Context inited");
            }
            catch (e) {
                console.error("!Your browser does not support AudioContext");
                throw new Error("!Your browser does not support AudioContext");
            }
            this.Init();
        }
        GetChannel(id) {
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
        CreateBGM(url) {
            return new BMG_Impl(this.audioContext, url);
        }
        CreateSound(url) {
            return new Sound_Impl(this.audioContext, url, null);
        }
        CreateSoundFromArrayBuffer(array) {
            return new Sound_Impl(this.audioContext, null, array);
        }
        //audioBGM: WechatMinigame.InnerAudioContext;
        Init() {
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
        ReInit() {
            this.Init();
        }
    }
    tt_impl.AudioImpl = AudioImpl;
})(tt_impl || (tt_impl = {}));
