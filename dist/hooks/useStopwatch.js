"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useTimer_1 = require("./useTimer");
/**
 * See documentation: https://devboldly.github.io/react-use-precision-timer/useStopwatch
 *
 * Runs indefinitely, counting elapsed time, until paused or stopped.
 */
exports.useStopwatch = function () {
    return useTimer_1.useTimer();
};
