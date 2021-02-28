"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStopwatch = void 0;
var useTimer_1 = require("./useTimer");
/**
 * See documentation: [useStopwatch](https://justinmahar.github.io/react-use-precision-timer/useStopwatch)
 *
 * Runs indefinitely, counting elapsed time, until paused or stopped.
 */
exports.useStopwatch = function () {
    return useTimer_1.useTimer();
};
