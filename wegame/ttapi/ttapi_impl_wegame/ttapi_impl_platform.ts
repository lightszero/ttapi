/// <reference path="./lib/index.d.ts" />
import { tt } from "../ttapi_interface/ttapi.js";
export namespace tt_impl {
    export class Platform implements tt.IPlatform {
        getPlatformName(): string {
            let info = wx.getSystemInfoSync();
            return "wx_"+info.platform;
        }

    }
}