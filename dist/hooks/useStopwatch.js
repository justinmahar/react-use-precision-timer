"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStopwatch = void 0;
const react_1 = __importDefault(require("react"));
const useTimer_1 = require("./useTimer");
/**
 * See documentation: [useStopwatch](https://justinmahar.github.io/react-use-precision-timer/useStopwatch)
 *
 * Runs indefinitely, counting elapsed time, until paused or stopped.
 */
const useStopwatch = () => {
    return (0, useTimer_1.useTimer)(react_1.default.useMemo(() => {
        return {};
    }, []));
};
exports.useStopwatch = useStopwatch;
