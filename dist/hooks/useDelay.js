"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDelay = void 0;
const useTimer_1 = require("./useTimer");
/**
 * See documentation: [useDelay](https://justinmahar.github.io/react-use-precision-timer/useDelay)
 *
 * Fires the callback after the specified delay has passed. Call start() on the returned Timer to execute.
 *
 * @param delay The amount of time, in milliseconds, before the timer fires.
 * @param callback Called when the timer fires. Use React.useCallback() for this.
 */
const useDelay = (delay, callback) => {
    return (0, useTimer_1.useTimer)({ delay, runOnce: true }, callback);
};
exports.useDelay = useDelay;
