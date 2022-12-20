"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerStory = void 0;
const react_1 = __importDefault(require("react"));
const useDelay_1 = require("../hooks/useDelay");
// Needed to wrap the hook and give it visual representation.
const HookComponent = (props) => {
    const [delay, setDelay] = react_1.default.useState(2000);
    const [callbackTime, setCallbackTime] = react_1.default.useState(-1);
    const [renderTime, setRenderTime] = react_1.default.useState(new Date().getTime());
    const callback = react_1.default.useCallback(() => {
        setCallbackTime(new Date().getTime());
    }, []);
    const timer = (0, useDelay_1.useDelay)(delay, callback);
    react_1.default.useEffect(() => {
        const timeout = setTimeout(() => setRenderTime(new Date().getTime()), 1);
        return () => {
            clearTimeout(timeout);
        };
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", null,
                react_1.default.createElement("input", { type: "range", id: "points", name: "points", min: "10", max: "5000", value: delay, onChange: (e) => {
                        setDelay(parseInt(e.target.value));
                        timer.start();
                    } }),
                ' ',
                delay,
                " milliseconds")),
        react_1.default.createElement("div", null,
            react_1.default.createElement("progress", { value: timer.isStopped() ? 0 : delay - timer.getRemainingTime(), max: delay }, timer.getRemainingTime())),
        react_1.default.createElement("table", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "callback time:"),
                react_1.default.createElement("td", null, callbackTime)),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "delay:"),
                react_1.default.createElement("td", null, delay)),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getLastFireTime:"),
                react_1.default.createElement("td", null, timer.getLastFireTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getNextFireTime:"),
                react_1.default.createElement("td", null, timer.getNextFireTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getRemainingTime:"),
                react_1.default.createElement("td", null, timer.getRemainingTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getElapsedStartedTime:"),
                react_1.default.createElement("td", null, timer.getElapsedStartedTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getElapsedRunningTime:"),
                react_1.default.createElement("td", null, timer.getElapsedRunningTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getStartTime:"),
                react_1.default.createElement("td", null, timer.getStartTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getPauseTime:"),
                react_1.default.createElement("td", null, timer.getPauseTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getResumeTime:"),
                react_1.default.createElement("td", null, timer.getResumeTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getPeriodElapsedPausedTime:"),
                react_1.default.createElement("td", null, timer.getPeriodElapsedPausedTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getTotalElapsedPausedTime:"),
                react_1.default.createElement("td", null, timer.getTotalElapsedPausedTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getElapsedResumedTime:"),
                react_1.default.createElement("td", null, timer.getElapsedResumedTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "isStarted:"),
                react_1.default.createElement("td", null, timer.isStarted() + '')),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "isStopped:"),
                react_1.default.createElement("td", null, timer.isStopped() + '')),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "isRunning:"),
                react_1.default.createElement("td", null, timer.isRunning() + '')),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "isPaused:"),
                react_1.default.createElement("td", null, timer.isPaused() + '')))));
};
const TimerStory = () => react_1.default.createElement(HookComponent, null);
exports.TimerStory = TimerStory;
exports.TimerStory.story = {
    name: 'Hook Visual',
};
exports.default = {};
