"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerStory = void 0;
const react_1 = __importDefault(require("react"));
const useStopwatch_1 = require("../hooks/useStopwatch");
// The named exports define the stories
// Needed to wrap the hook and give it visual representation.
exports.default = {};
const HookComponent = () => {
    const [renderTime, setRenderTime] = react_1.default.useState(new Date().getTime());
    const stopwatch = (0, useStopwatch_1.useStopwatch)();
    react_1.default.useEffect(() => {
        const timeout = setTimeout(() => setRenderTime(new Date().getTime()), 1);
        return () => {
            clearTimeout(timeout);
        };
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null, "Stopwatch"),
        react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: () => {
                    stopwatch.start();
                } }, "Start"),
            react_1.default.createElement("button", { onClick: () => {
                    stopwatch.stop();
                } }, "Stop"),
            react_1.default.createElement("button", { onClick: () => {
                    stopwatch.pause();
                } }, "Pause"),
            react_1.default.createElement("button", { onClick: () => {
                    stopwatch.resume();
                } }, "Resume")),
        react_1.default.createElement("table", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getLastFireTime:"),
                react_1.default.createElement("td", null, stopwatch.getLastFireTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getNextFireTime:"),
                react_1.default.createElement("td", null, stopwatch.getNextFireTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getRemainingTime:"),
                react_1.default.createElement("td", null, stopwatch.getRemainingTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getElapsedStartedTime:"),
                react_1.default.createElement("td", null, stopwatch.getElapsedStartedTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getElapsedRunningTime:"),
                react_1.default.createElement("td", null, stopwatch.getElapsedRunningTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getStartTime:"),
                react_1.default.createElement("td", null, stopwatch.getStartTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getPauseTime:"),
                react_1.default.createElement("td", null, stopwatch.getPauseTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getResumeTime:"),
                react_1.default.createElement("td", null, stopwatch.getResumeTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getPeriodElapsedPausedTime:"),
                react_1.default.createElement("td", null, stopwatch.getPeriodElapsedPausedTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getTotalElapsedPausedTime:"),
                react_1.default.createElement("td", null, stopwatch.getTotalElapsedPausedTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "getElapsedResumedTime:"),
                react_1.default.createElement("td", null, stopwatch.getElapsedResumedTime())),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "isStarted:"),
                react_1.default.createElement("td", null, stopwatch.isStarted() + '')),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "isStopped:"),
                react_1.default.createElement("td", null, stopwatch.isStopped() + '')),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "isRunning:"),
                react_1.default.createElement("td", null, stopwatch.isRunning() + '')),
            react_1.default.createElement("tr", null,
                react_1.default.createElement("td", null, "isPaused:"),
                react_1.default.createElement("td", null, stopwatch.isPaused() + '')))));
};
const TimerStory = () => react_1.default.createElement(HookComponent, null);
exports.TimerStory = TimerStory;
exports.TimerStory.story = {
    name: 'Hook Visual',
};
