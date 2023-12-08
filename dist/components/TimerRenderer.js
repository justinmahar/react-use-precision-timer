"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerRenderer = void 0;
const react_1 = __importDefault(require("react"));
const react_sub_unsub_1 = require("react-sub-unsub");
/**
 * Renders a timer or stopwatch at regular intervals.
 */
const TimerRenderer = ({ timer, render = (timer) => react_1.default.createElement(react_1.default.Fragment, null, timer.getElapsedRunningTime()), renderRate = 10, }) => {
    const [, setRenderTime] = react_1.default.useState(Date.now());
    react_1.default.useEffect(() => {
        const subs = new react_sub_unsub_1.Subs();
        subs.setInterval(() => setRenderTime(new Date().getTime()), renderRate);
        return subs.createCleanup();
    }, [renderRate]);
    return render(timer);
};
exports.TimerRenderer = TimerRenderer;
