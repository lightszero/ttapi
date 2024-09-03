export var tt_impl;
(function (tt_impl) {
    class Platform {
        getPlatformName() {
            return "browser_" + window.navigator.userAgent;
        }
    }
    tt_impl.Platform = Platform;
})(tt_impl || (tt_impl = {}));
