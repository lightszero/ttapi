
import { tt } from "../ttapi/ttapi.js";
export namespace tt_impl {
    export class Platform implements tt.IPlatform {
        getPlatformName(): string {
            return "browser_"+window.navigator.userAgent;
        }

    }
}