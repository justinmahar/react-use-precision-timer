"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDelay = void 0;
const React = __importStar(require("react"));
const useTimer_1 = require("./useTimer");
/**
 * See documentation: [useDelay](https://justinmahar.github.io/react-use-precision-timer/useDelay)
 *
 * Fires the callback after the specified delay has passed.
 *
 * @param delay The amount of time, in milliseconds, before the timer fires.
 * @param callback Called when the timer fires.
 */
const useDelay = (delay, callback) => {
    const [firstRun, setFirstRun] = React.useState(true);
    const timerOptions = React.useMemo(() => {
        return {
            delay,
            callback,
            runOnce: true,
            fireImmediately: false,
        };
    }, [callback, delay]);
    const timer = (0, useTimer_1.useTimer)(timerOptions);
    React.useEffect(() => {
        // Ensures the delay only ever runs once
        if (firstRun) {
            setFirstRun(false);
            timer.start();
        }
    }, [firstRun, timer]);
    return timer;
};
exports.useDelay = useDelay;
