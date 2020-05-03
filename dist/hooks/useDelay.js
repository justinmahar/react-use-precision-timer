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
var useTimer_1 = require("./useTimer");
/**
 * See documentation: [useDelay](https://devboldly.github.io/react-use-precision-timer/useDelay)
 *
 * Fires the callback after the specified delay has passed.
 *
 * @param delay The amount of time, in milliseconds, before the timer fires.
 * @param callback Called when the timer fires.
 */
exports.useDelay = function (delay, callback) {
    var _a = React.useState(true), firstRun = _a[0], setFirstRun = _a[1];
    var timer = useTimer_1.useTimer({ delay: delay, callback: callback, runOnce: true, fireImmediately: false });
    React.useEffect(function () {
        // Ensures the delay only ever runs once
        if (firstRun) {
            setFirstRun(false);
            timer.start();
        }
    }, [firstRun, timer]);
    return timer;
};
