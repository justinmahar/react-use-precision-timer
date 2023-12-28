"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStopwatch = void 0;
const useTimer_1 = require("./useTimer");
/**
 * See documentation: [useStopwatch](https://justinmahar.github.io/react-use-precision-timer/useStopwatch)
 *
 * Runs indefinitely, counting elapsed time, until paused or stopped.
 */
const useStopwatch = () => {
    return (0, useTimer_1.useTimer)();
};
exports.useStopwatch = useStopwatch;
