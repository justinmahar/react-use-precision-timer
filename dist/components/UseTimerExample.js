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
exports.UseTimerExample = void 0;
const React = __importStar(require("react"));
const useTimer_1 = require("../hooks/useTimer");
function UseTimerExample() {
    const [delay, setDelay] = React.useState(1000);
    const [callbackTime, setCallbackTime] = React.useState(-1);
    const [runOnce, setRunOnce] = React.useState(false);
    const [fireImmediately, setFireImmediately] = React.useState(false);
    const [startImmediately, setStartImmediately] = React.useState(true);
    const [delayChanged, setDelayChanged] = React.useState(false);
    const [renderTime, setRenderTime] = React.useState(new Date().getTime());
    const [frameRate, setFrameRate] = React.useState(10);
    const callback = () => {
        setCallbackTime(new Date().getTime());
    };
    const timer = (0, useTimer_1.useTimer)({
        delay,
        callback,
        runOnce,
        fireImmediately,
        startImmediately,
        fireOverdueCallbacks: true,
    });
    React.useEffect(() => {
        const timeout = setTimeout(() => setRenderTime(new Date().getTime()), frameRate);
        return () => {
            clearTimeout(timeout);
        };
    });
    // Automatically start or stop when the delay changes.
    React.useEffect(() => {
        if (delayChanged) {
            setDelayChanged(false);
            if (startImmediately) {
                timer.start();
            }
            else {
                timer.stop();
            }
        }
    }, [delay, delayChanged, startImmediately, timer]);
    return (React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start' } },
        React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement("div", null,
                        "Delay:",
                        ' ',
                        React.createElement("input", { type: "range", min: "0", max: "5000", value: delay, onChange: (e) => {
                                const newDelay = parseInt(e.target.value);
                                setDelay(newDelay);
                                setDelayChanged(true);
                                if (newDelay === 0) {
                                    setCallbackTime(-1);
                                }
                            } }),
                        ' ',
                        delay > 0 ? `${delay} ms` : 'Stopwatch')),
                React.createElement("div", null,
                    React.createElement("input", { type: "checkbox", id: "runOnce", name: "runOnce", checked: runOnce, onChange: (e) => setRunOnce(e.target.checked) }),
                    React.createElement("label", { htmlFor: "runOnce" }, " runOnce"),
                    React.createElement("input", { type: "checkbox", id: "fireImmediately", name: "fireImmediately", checked: fireImmediately, onChange: (e) => setFireImmediately(e.target.checked) }),
                    React.createElement("label", { htmlFor: "fireImmediately" }, " fireImmediately"),
                    React.createElement("input", { type: "checkbox", id: "startImmediately", name: "startImmediately", checked: startImmediately, onChange: (e) => setStartImmediately(e.target.checked) }),
                    React.createElement("label", { htmlFor: "startImmediately" }, " startImmediately"),
                    React.createElement("br", null))),
            React.createElement("div", null,
                React.createElement("button", { onClick: () => {
                        timer.start();
                    } }, "Start"),
                React.createElement("button", { onClick: () => {
                        timer.stop();
                    } }, "Stop"),
                React.createElement("button", { onClick: () => {
                        timer.pause();
                    } }, "Pause"),
                React.createElement("button", { onClick: () => {
                        timer.resume();
                    } }, "Resume")),
            React.createElement("div", null, delay > 0 && (React.createElement("progress", { value: timer.isStopped() ? 0 : delay - timer.getRemainingTime(), max: delay }, timer.getRemainingTime()))),
            React.createElement("table", null,
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", null, "Callback time:"),
                        React.createElement("td", null, callbackTime)),
                    React.createElement("tr", null,
                        React.createElement("td", null, "isStarted():"),
                        React.createElement("td", null, timer.isStarted() + '')),
                    React.createElement("tr", null,
                        React.createElement("td", null, "isStopped():"),
                        React.createElement("td", null, timer.isStopped() + '')),
                    React.createElement("tr", null,
                        React.createElement("td", null, "isPaused():"),
                        React.createElement("td", null, timer.isPaused() + '')),
                    React.createElement("tr", null,
                        React.createElement("td", null, "isRunning():"),
                        React.createElement("td", null, timer.isRunning() + '')),
                    React.createElement("tr", null,
                        React.createElement("td", null, "getStartTime():"),
                        React.createElement("td", null, timer.getStartTime())),
                    React.createElement("tr", null,
                        React.createElement("td", null, "getLastFireTime():"),
                        React.createElement("td", null, timer.getLastFireTime())),
                    React.createElement("tr", null,
                        React.createElement("td", null, "getNextFireTime():"),
                        React.createElement("td", null, timer.getNextFireTime())),
                    React.createElement("tr", null,
                        React.createElement("td", null, "getPauseTime():"),
                        React.createElement("td", null, timer.getPauseTime())),
                    React.createElement("tr", null,
                        React.createElement("td", null, "getResumeTime():"),
                        React.createElement("td", null, timer.getResumeTime())),
                    React.createElement("tr", null,
                        React.createElement("td", null, "getRemainingTime():"),
                        React.createElement("td", null, timer.getRemainingTime())),
                    React.createElement("tr", null,
                        React.createElement("td", null, "getElapsedStartedTime():"),
                        React.createElement("td", null, timer.getElapsedStartedTime())),
                    React.createElement("tr", null,
                        React.createElement("td", null, "getElapsedRunningTime():"),
                        React.createElement("td", null, timer.getElapsedRunningTime())),
                    React.createElement("tr", null,
                        React.createElement("td", null, "getTotalElapsedPausedTime():"),
                        React.createElement("td", null, timer.getTotalElapsedPausedTime())),
                    React.createElement("tr", null,
                        React.createElement("td", null, "getPeriodElapsedPausedTime():"),
                        React.createElement("td", null, timer.getPeriodElapsedPausedTime())),
                    React.createElement("tr", null,
                        React.createElement("td", null, "getElapsedResumedTime():"),
                        React.createElement("td", null, timer.getElapsedResumedTime()))))),
        React.createElement("div", { style: { textAlign: 'center', border: 'solid 2px lightgray', padding: '10px' } },
            React.createElement("div", null,
                "Render every:",
                React.createElement("br", null),
                frameRate,
                " ms"),
            React.createElement("div", null,
                React.createElement("input", { type: "range", min: "1", max: "5000", value: frameRate, onChange: (e) => {
                        setFrameRate(parseInt(e.target.value));
                    } })))));
}
exports.UseTimerExample = UseTimerExample;
