"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDelay = void 0;
var React = __importStar(require("react"));
var useTimer_1 = require("./useTimer");
/**
 * See documentation: [useDelay](https://justinmahar.github.io/react-use-precision-timer/useDelay)
 *
 * Fires the callback after the specified delay has passed.
 *
 * @param delay The amount of time, in milliseconds, before the timer fires.
 * @param callback Called when the timer fires.
 */
exports.useDelay = function (delay, callback) {
    var _a = React.useState(true), firstRun = _a[0], setFirstRun = _a[1];
    var timer = useTimer_1.useTimer({
        delay: delay,
        callback: callback,
        runOnce: true,
        fireImmediately: false,
    });
    React.useEffect(function () {
        // Ensures the delay only ever runs once
        if (firstRun) {
            setFirstRun(false);
            timer.start();
        }
    }, [firstRun, timer]);
    return timer;
};
