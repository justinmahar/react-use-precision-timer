"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerRenderer = void 0;
const react_1 = __importDefault(require("react"));
const useTimer_1 = require("../hooks/useTimer");
/**
 * Renders a timer or stopwatch at regular intervals.
 */
const TimerRenderer = ({ timer, render = (timer) => react_1.default.createElement(react_1.default.Fragment, null, timer.getElapsedRunningTime()), renderRate = 10, }) => {
    const [, setRenderTime] = react_1.default.useState(Date.now());
    (0, useTimer_1.useTimer)({ delay: Math.max(0, renderRate) }, () => setRenderTime(Date.now()));
    return render(timer);
};
exports.TimerRenderer = TimerRenderer;
