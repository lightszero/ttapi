/// <reference path="./lib/index.d.ts" />
import { tt } from "../ttapi/ttapi.js";
export namespace tt_impl {
    export class Platform implements tt.IPlatform {
        getPlatformName(): string {
            let info = wx.getDeviceInfo();
            return "wx_"+info.platform;
        }

    }
}