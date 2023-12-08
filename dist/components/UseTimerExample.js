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
require("bootstrap/dist/css/bootstrap.css");
const React = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const react_sub_unsub_1 = require("react-sub-unsub");
const useTimer_1 = require("../hooks/useTimer");
function UseTimerExample() {
    const [delay, setDelay] = React.useState(1000);
    const [speedMultiplier, setSpeedMultiplier] = React.useState(1);
    const [startTimeEnabled, setStartTimeEnabled] = React.useState(false);
    const [startTime, setStartTime] = React.useState(Date.now());
    const [callbackTime, setCallbackTime] = React.useState(-1);
    const [overdueCallCount, setOverdueCallCount] = React.useState(0);
    const [runOnce, setRunOnce] = React.useState(false);
    const [fireOnStart, setFireOnStart] = React.useState(false);
    const [startImmediately, setStartImmediately] = React.useState(true);
    const [delayChanged, setDelayChanged] = React.useState(false);
    const [, setRenderTime] = React.useState(new Date().getTime());
    const [renderRate, setRenderRate] = React.useState(10);
    const callback = React.useCallback((overdueCount) => {
        setCallbackTime(new Date().getTime());
        setOverdueCallCount(overdueCount);
    }, []);
    const timer = (0, useTimer_1.useTimer)({
        delay: isNaN(delay) ? 0 : delay,
        runOnce,
        fireOnStart,
        startImmediately,
        speedMultiplier,
    }, callback);
    const effectiveDelay = React.useMemo(() => timer.getEffectiveDelay(), [timer]);
    React.useEffect(() => {
        const subs = new react_sub_unsub_1.Subs();
        subs.setTimeout(() => setRenderTime(new Date().getTime()), renderRate);
        return subs.createCleanup();
    });
    // Automatically start or stop when the delay changes.
    React.useEffect(() => {
        if (delayChanged) {
            setDelayChanged(false);
            if (startImmediately) {
                timer.start(startTimeEnabled ? startTime : undefined);
            }
            else {
                timer.stop();
            }
        }
    }, [delay, delayChanged, startImmediately, startTime, startTimeEnabled, timer]);
    return (React.createElement("div", { className: "d-flex" },
        React.createElement(react_bootstrap_1.Card, null,
            React.createElement(react_bootstrap_1.Card.Body, { className: "d-flex flex-column align-items-center gap-2" },
                React.createElement("div", { className: "d-flex flex-wrap justify-content-center gap-2" },
                    React.createElement(react_bootstrap_1.Card, { style: { minWidth: 300, maxWidth: 600 } },
                        React.createElement(react_bootstrap_1.Card.Header, null, "Timer Options"),
                        React.createElement(react_bootstrap_1.Card.Body, null,
                            React.createElement("div", { className: "d-flex align-items-center gap-2 mb-3" },
                                "Delay:",
                                ' ',
                                React.createElement(react_bootstrap_1.Form.Range, { min: "0", max: "5000", value: isNaN(delay) ? 0 : delay, onChange: (e) => {
                                        const newDelay = parseInt(e.target.value);
                                        setDelay(newDelay);
                                        setDelayChanged(true);
                                        if (newDelay === 0) {
                                            setCallbackTime(-1);
                                            setOverdueCallCount(0);
                                        }
                                    } }),
                                ' ',
                                React.createElement(react_bootstrap_1.Form.Control, { type: "number", min: 0, value: delay, onChange: (e) => {
                                        const newDelay = parseInt(e.target.value);
                                        setDelay(newDelay);
                                        setDelayChanged(true);
                                        if (newDelay === 0) {
                                            setCallbackTime(-1);
                                            setOverdueCallCount(0);
                                        }
                                    }, style: { width: 80 } }),
                                "ms"),
                            React.createElement("div", { className: "d-flex flex-wrap align-items-start gap-1 mb-3" },
                                React.createElement(react_bootstrap_1.Form.Check, { inline: true, label: "Use start time:", id: "start-time-checkbox", name: "startTimeEnabled", checked: startTimeEnabled, onChange: (e) => {
                                        setStartTimeEnabled(e.target.checked);
                                    } }),
                                React.createElement("div", null,
                                    React.createElement(react_bootstrap_1.Form.Control, { type: "number", min: "0", value: startTime, onChange: (e) => {
                                            const newVal = parseInt(e.target.value);
                                            setStartTime(newVal);
                                        }, style: { width: 180 } }),
                                    React.createElement("div", null,
                                        React.createElement(react_bootstrap_1.Form.Text, { className: "text-muted" }, "(Unix timestamp in millis)")))),
                            React.createElement("div", { className: "d-flex flex-wrap justify-content-center gap-1 mb-3" },
                                React.createElement(react_bootstrap_1.Form.Check, { inline: true, label: "runOnce", id: "runOnce", name: "runOnce", checked: runOnce, onChange: (e) => setRunOnce(e.target.checked) }),
                                React.createElement(react_bootstrap_1.Form.Check, { inline: true, label: "fireOnStart", id: "fireOnStart", name: "fireOnStart", checked: fireOnStart, onChange: (e) => setFireOnStart(e.target.checked) }),
                                React.createElement(react_bootstrap_1.Form.Check, { inline: true, label: "startImmediately", id: "startImmediately", name: "startImmediately", checked: startImmediately, onChange: (e) => setStartImmediately(e.target.checked) })),
                            React.createElement("div", { className: "d-flex flex-column" },
                                React.createElement("div", null, "Speed multiplier:"),
                                React.createElement("div", { className: "d-flex align-items-center gap-2" },
                                    React.createElement(react_bootstrap_1.Form.Range, { min: 0, max: 5, step: 0.25, value: isNaN(speedMultiplier) ? 1 : speedMultiplier, onChange: (e) => {
                                            const newSpeed = parseFloat(e.target.value);
                                            setSpeedMultiplier(newSpeed);
                                            setDelayChanged(true);
                                        } }),
                                    ' ',
                                    React.createElement("div", { className: "d-flex align-items-center gap-1" },
                                        "\u00D7",
                                        React.createElement(react_bootstrap_1.Form.Control, { type: "number", min: 0, step: 0.25, value: isNaN(speedMultiplier) ? 1 : speedMultiplier, onChange: (e) => {
                                                const newSpeed = parseFloat(e.target.value);
                                                setSpeedMultiplier(newSpeed);
                                                setDelayChanged(true);
                                            }, style: { width: 80 } }))),
                                speedMultiplier !== 1 && (React.createElement("div", null,
                                    React.createElement(react_bootstrap_1.Form.Text, { className: "text-muted" },
                                        "Effective delay: ",
                                        effectiveDelay,
                                        " ms")))))),
                    React.createElement(react_bootstrap_1.Card, null,
                        React.createElement(react_bootstrap_1.Card.Body, { className: "d-flex flex-column justify-content-center align-items-center" },
                            React.createElement("div", { className: "text-center" },
                                "Render every:",
                                React.createElement("br", null),
                                renderRate,
                                " ms"),
                            React.createElement("div", null,
                                React.createElement(react_bootstrap_1.Form.Range, { min: "1", max: "5000", value: renderRate, onChange: (e) => {
                                        setRenderRate(parseInt(e.target.value));
                                    } }))))),
                React.createElement(react_bootstrap_1.Card, { style: { minWidth: 300, maxWidth: 600 } },
                    React.createElement(react_bootstrap_1.Card.Body, null,
                        React.createElement("div", { className: "d-flex gap-1 justify-content-center" },
                            React.createElement(react_bootstrap_1.Button, { variant: timer.isStopped() ? 'primary' : 'outline-dark', onClick: () => {
                                    timer.start(startTimeEnabled ? startTime : undefined);
                                } }, "Start"),
                            React.createElement(react_bootstrap_1.Button, { variant: timer.isStarted() ? 'primary' : 'outline-dark', onClick: () => {
                                    timer.stop();
                                } }, "Stop"),
                            React.createElement(react_bootstrap_1.Button, { variant: timer.isRunning() ? 'primary' : 'outline-dark', onClick: () => {
                                    timer.pause();
                                } }, "Pause"),
                            React.createElement(react_bootstrap_1.Button, { variant: timer.isPaused() ? 'primary' : 'outline-dark', onClick: () => {
                                    timer.resume();
                                } }, "Resume")))),
                React.createElement("div", { className: "d-flex justify-content-center", style: { minWidth: 300, maxWidth: 600 } },
                    React.createElement(react_bootstrap_1.Table, { striped: true, bordered: true, responsive: true, className: "w-100" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "Callback time:"),
                                React.createElement("td", { style: { minWidth: 200 } },
                                    React.createElement("div", { className: "mb-2" },
                                        React.createElement("style", null, `.progress-bar {
                            -webkit-transition: none !important;
                            -moz-transition: none !important;
                            -ms-transition: none !important;
                            -o-transition: none !important;
                            transition: none !important;
                          }`),
                                        effectiveDelay > 0 && (React.createElement(react_bootstrap_1.ProgressBar, { variant: "primary", now: timer.isStopped() ? 0 : effectiveDelay - timer.getRemainingTime(), max: effectiveDelay, label: `${effectiveDelay - timer.getRemainingTime()} ms`, style: { transition: 'none' } })),
                                        (isNaN(effectiveDelay) || effectiveDelay === 0) && (React.createElement(react_bootstrap_1.Badge, { className: "fw-bold m-0" }, "Stopwatch"))),
                                    React.createElement("div", null,
                                        React.createElement(react_bootstrap_1.Badge, { bg: "warning", className: "text-black" }, callbackTime)))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "isStarted():"),
                                React.createElement("td", { className: "text-break" },
                                    React.createElement(react_bootstrap_1.Badge, { bg: timer.isStarted() ? 'success' : 'danger', className: "font-monospace" }, timer.isStarted() + ''))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "isStopped():"),
                                React.createElement("td", { className: "text-break" },
                                    React.createElement(react_bootstrap_1.Badge, { bg: timer.isStopped() ? 'success' : 'danger', className: "font-monospace" }, timer.isStopped() + ''))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "isPaused():"),
                                React.createElement("td", { className: "text-break" },
                                    React.createElement(react_bootstrap_1.Badge, { bg: timer.isPaused() ? 'success' : 'danger', className: "font-monospace" }, timer.isPaused() + ''))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "isRunning():"),
                                React.createElement("td", { className: "text-break" },
                                    React.createElement(react_bootstrap_1.Badge, { bg: timer.isRunning() ? 'success' : 'danger', className: "font-monospace" }, timer.isRunning() + ''))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "getEffectiveDelay():"),
                                React.createElement("td", { className: "text-break" },
                                    React.createElement(react_bootstrap_1.Badge, { pill: true, bg: "primary" },
                                        timer.getEffectiveDelay(),
                                        " ms"))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "getStartTime():"),
                                React.createElement("td", { className: "text-break" },
                                    React.createElement(react_bootstrap_1.Badge, { bg: "warning", className: "text-black" }, timer.getStartTime()))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "getLastFireTime():"),
                                React.createElement("td", { className: "text-break" },
                                    React.createElement(react_bootstrap_1.Badge, { bg: "warning", className: "text-black" }, timer.getLastFireTime()))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "getNextFireTime():"),
                                React.createElement("td", { className: "text-break" },
                                    React.createElement(react_bootstrap_1.Badge, { bg: "warning", className: "text-black" }, timer.getNextFireTime()))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "getPauseTime():"),
                                React.createElement("td", { className: "text-break" },
                                    React.createElement(react_bootstrap_1.Badge, { bg: "warning", className: "text-black" }, timer.getPauseTime()))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "getResumeTime():"),
                                React.createElement("td", { className: "text-break" },
                                    React.createElement(react_bootstrap_1.Badge, { bg: "warning", className: "text-black" }, timer.getResumeTime()))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "getRemainingTime():"),
                                React.createElement("td", { className: "text-break" },
                                    React.createElement(react_bootstrap_1.Badge, { pill: true, bg: "primary" },
                                        timer.getRemainingTime(),
                                        " ms"))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "getElapsedStartedTime():"),
                                React.createElement("td", { className: "text-break" },
                                    React.createElement(react_bootstrap_1.Badge, { pill: true, bg: "primary" },
                                        timer.getElapsedStartedTime(),
                                        " ms"))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "getElapsedRunningTime():"),
                                React.createElement("td", { className: "text-break" },
                                    React.createElement(react_bootstrap_1.Badge, { pill: true, bg: "primary" },
                                        timer.getElapsedRunningTime(),
                                        " ms"))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "getTotalElapsedPausedTime():"),
                                React.createElement("td", { className: "text-break" },
                                    React.createElement(react_bootstrap_1.Badge, { pill: true, bg: "primary" },
                                        timer.getTotalElapsedPausedTime(),
                                        " ms"))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "getPeriodElapsedPausedTime():"),
                                React.createElement("td", { className: "text-break" },
                                    React.createElement(react_bootstrap_1.Badge, { pill: true, bg: "primary" },
                                        timer.getPeriodElapsedPausedTime(),
                                        " ms"))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "getElapsedResumedTime():"),
                                React.createElement("td", { className: "text-break" },
                                    React.createElement(react_bootstrap_1.Badge, { pill: true, bg: "primary" },
                                        timer.getElapsedResumedTime(),
                                        " ms"))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "Overdue call count (for delays under 10ms):"),
                                React.createElement("td", { className: "text-break" },
                                    React.createElement(react_bootstrap_1.Badge, { pill: true, bg: "dark" }, overdueCallCount))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "text-break" }, "Render time:"),
                                React.createElement("td", { className: "text-break" },
                                    React.createElement(react_bootstrap_1.Badge, { bg: "warning", className: "text-black" }, Date.now()))))))))));
}
exports.UseTimerExample = UseTimerExample;
