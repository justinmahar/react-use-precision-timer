"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
/**
 * Fires the callback after the specified delay in milliseconds has passed.
 *
 * Can specify an option to run only once, and can specify an option to fire immediately.
 */
exports.useTimer = function (options) {
    var now = new Date().getTime();
    var fireImmediately = !!options.fireImmediately;
    var runOnce = !!options.runOnce;
    var callback = options.callback;
    var delay = options.delay;
    var _a = React.useState(true), firstRun = _a[0], setFirstRun = _a[1];
    var _b = React.useState(now), setCheckTime = _b[1];
    var _c = React.useState(Number.MAX_SAFE_INTEGER), fireTime = _c[0], setFireTime = _c[1];
    React.useEffect(function () {
        var timeout;
        if (now >= fireTime) {
            var newFireTime = fireTime + delay;
            if (!runOnce) {
                setFireTime(newFireTime);
            }
            callback();
            if (!runOnce) {
                timeout = setTimeout(function () {
                    setCheckTime(new Date().getTime());
                }, Math.max(0, newFireTime - new Date().getTime()));
            }
        }
        else if (fireTime < Number.MAX_SAFE_INTEGER) {
            timeout = setTimeout(function () {
                setCheckTime(new Date().getTime());
            }, fireTime - now);
        }
        return function () {
            clearTimeout(timeout);
        };
    }, [now, fireTime, runOnce, callback, delay]);
    var timer = {
        start: function () {
            var now = new Date().getTime();
            var newFireTime = fireImmediately ? now : now + delay;
            setFireTime(newFireTime);
        },
        stop: function () {
            setFireTime(Number.MAX_SAFE_INTEGER);
        },
    };
    React.useEffect(function () {
        if (firstRun && !!options.startImmediately) {
            setFirstRun(false);
            timer.start();
        }
    }, [firstRun, options.startImmediately, timer]);
    return timer;
};
