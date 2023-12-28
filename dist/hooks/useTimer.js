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
exports.useTimer = void 0;
const React = __importStar(require("react"));
const react_sub_unsub_1 = require("react-sub-unsub");
/** Milliseconds representing forever in the future. */
const never = Number.MAX_SAFE_INTEGER;
/**
 * See documentation: [useTimer](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usetimer--page)
 *
 * A versatile precision timer hook for React. Doubles as a stopwatch.
 *
 * - Based on `setTimeout()` and timestamps, not `setInterval()` or ticks.
 * - Features perfect mean interval accuracy, meaning it doesn't wander.
 * - Resilient to expensive callback operations and low timer delays.
 * - Can be used as a timer or a stopwatch.
 * - Supports starting, stopping, pausing, and resuming.
 * - Includes accessors for everything under the sun.
 *
 * @param options The TimerOptions for the timer.
 * @param callback The callback to call when the timer fires. Use React.useCallback() for this. Must provide a `delay` for the timer to fire. If you'd like, you can determine if any calls were missed by checking the `overdueCallCount` argument. This value will indicate how many calls were missed due to a very short timer delay or time-consuming callback.
 */
const useTimer = (options = {}, callback) => {
    const [firstRun, setFirstRun] = React.useState(true);
    const [renderTime, setRenderTime] = React.useState(Date.now());
    const startedRef = React.useRef(false);
    const startTimeRef = React.useRef(never);
    const lastFireTimeRef = React.useRef(never);
    const nextFireTimeRef = React.useRef(never);
    const pauseTimeRef = React.useRef(never);
    const resumeTimeRef = React.useRef(never);
    const periodElapsedPauseTimeRef = React.useRef(0);
    const totalElapsedPauseTimeRef = React.useRef(0);
    const delayIndexRef = React.useRef(0);
    // Memoized options
    const delay = React.useMemo(() => {
        var _a;
        const s = (_a = options.speedMultiplier) !== null && _a !== void 0 ? _a : 1;
        const d = options.delay ? (Array.isArray(options.delay) ? options.delay[delayIndexRef.current] : options.delay) : 0;
        return s === 0 ? 0 : s > 0 && d > 0 ? Math.max(1, Math.round(d * (1 / s))) : d;
    }, [options.delay, options.speedMultiplier]);
    const runOnce = React.useMemo(() => options.runOnce, [options.runOnce]);
    const fireOnStart = React.useMemo(() => options.fireOnStart, [options.fireOnStart]);
    const startImmediately = React.useMemo(() => options.startImmediately, [options.startImmediately]);
    const isStarted = React.useCallback(() => {
        return startedRef.current;
    }, []);
    const isStopped = React.useCallback(() => {
        return !isStarted();
    }, [isStarted]);
    const isPaused = React.useCallback(() => {
        return isStarted() && pauseTimeRef.current !== never;
    }, [isStarted]);
    const isRunning = React.useCallback(() => {
        return isStarted() && !isPaused();
    }, [isPaused, isStarted]);
    const getEffectiveDelay = React.useCallback(() => {
        return delay;
    }, [delay]);
    const getStartTime = React.useCallback(() => {
        if (isStarted()) {
            return startTimeRef.current;
        }
        return -1;
    }, [isStarted]);
    const getLastFireTime = React.useCallback(() => {
        return lastFireTimeRef.current < never && !!delay ? lastFireTimeRef.current : -1;
    }, [delay]);
    const getNextFireTime = React.useCallback(() => {
        if (isRunning() && !!delay) {
            return nextFireTimeRef.current;
        }
        return -1;
    }, [isRunning, delay]);
    const getPauseTime = React.useCallback(() => {
        if (isPaused()) {
            return pauseTimeRef.current;
        }
        return -1;
    }, [isPaused]);
    const getResumeTime = React.useCallback(() => {
        if (isStarted() && resumeTimeRef.current < never) {
            return resumeTimeRef.current;
        }
        return -1;
    }, [isStarted]);
    const getElapsedStartedTime = React.useCallback(() => {
        if (isStarted()) {
            return Date.now() - startTimeRef.current;
        }
        return 0;
    }, [isStarted]);
    const getElapsedRunningTime = React.useCallback(() => {
        if (isStarted()) {
            if (isPaused()) {
                return pauseTimeRef.current - startTimeRef.current - totalElapsedPauseTimeRef.current;
            }
            else {
                return Date.now() - startTimeRef.current - totalElapsedPauseTimeRef.current;
            }
        }
        return 0;
    }, [isPaused, isStarted]);
    const getPeriodElapsedPausedTime = React.useCallback(() => {
        let additionalElapsedPauseTime = 0;
        if (isPaused()) {
            additionalElapsedPauseTime = Date.now() - pauseTimeRef.current;
        }
        return periodElapsedPauseTimeRef.current + additionalElapsedPauseTime;
    }, [isPaused]);
    const getTotalElapsedPausedTime = React.useCallback(() => {
        let additionalElapsedPauseTime = 0;
        if (isPaused()) {
            additionalElapsedPauseTime = Date.now() - pauseTimeRef.current;
        }
        return totalElapsedPauseTimeRef.current + additionalElapsedPauseTime;
    }, [isPaused]);
    const getElapsedResumedTime = React.useCallback(() => {
        if (isRunning()) {
            return Date.now() - resumeTimeRef.current;
        }
        return 0;
    }, [isRunning]);
    const getRemainingTime = React.useCallback(() => {
        const currentTime = Date.now();
        if (isStarted() && !!delay) {
            if (isRunning()) {
                return Math.max(0, nextFireTimeRef.current - currentTime);
            }
            else if (isPaused()) {
                const edgeTime = lastFireTimeRef.current !== never ? lastFireTimeRef.current : startTimeRef.current;
                return Math.max(0, delay - (pauseTimeRef.current - edgeTime - periodElapsedPauseTimeRef.current));
            }
        }
        return 0;
    }, [isPaused, isRunning, isStarted, delay]);
    // The start callback has been changed to accept a delayIndex parameter.
    // This allows for starting the timer at a specific index in the delay array.
    const start = React.useCallback((startTimeMillis = Date.now(), delayIndex = delayIndexRef.current) => {
        const newNextFireTime = () => {
            if (Array.isArray(options.delay) && options.delay.length > delayIndex && delayIndexRef.current != delayIndex) {
                delayIndexRef.current = delayIndex;
                return options.delay[delayIndex] ? Math.max(startTimeMillis, fireOnStart ? startTimeMillis : startTimeMillis + options.delay[delayIndex]) : never;
            }
            else {
                return delay ? Math.max(startTimeMillis, fireOnStart ? startTimeMillis : startTimeMillis + delay) : never;
            }
        };
        startTimeRef.current = startTimeMillis;
        lastFireTimeRef.current = never;
        nextFireTimeRef.current = newNextFireTime();
        pauseTimeRef.current = never;
        resumeTimeRef.current = startTimeMillis;
        periodElapsedPauseTimeRef.current = 0;
        totalElapsedPauseTimeRef.current = 0;
        startedRef.current = true;
        setRenderTime(Date.now());
    }, [delay, fireOnStart, options.delay]);
    const stop = React.useCallback(() => {
        startTimeRef.current = never;
        lastFireTimeRef.current = never;
        nextFireTimeRef.current = never;
        pauseTimeRef.current = never;
        resumeTimeRef.current = never;
        periodElapsedPauseTimeRef.current = 0;
        totalElapsedPauseTimeRef.current = 0;
        startedRef.current = false;
        setRenderTime(Date.now());
    }, []);
    const pause = React.useCallback(() => {
        if (isRunning()) {
            pauseTimeRef.current = Date.now();
            resumeTimeRef.current = never;
            setRenderTime(Date.now());
        }
    }, [isRunning]);
    const resume = React.useCallback(() => {
        if (isStarted() && isPaused()) {
            const currentTime = Date.now();
            nextFireTimeRef.current = currentTime + getRemainingTime();
            periodElapsedPauseTimeRef.current = 0;
            totalElapsedPauseTimeRef.current = totalElapsedPauseTimeRef.current + (currentTime - pauseTimeRef.current);
            pauseTimeRef.current = never;
            resumeTimeRef.current = currentTime;
            setRenderTime(Date.now());
        }
    }, [isStarted, isPaused, getRemainingTime]);
    React.useEffect(() => {
        const subs = new react_sub_unsub_1.Subs();
        const checkTimer = () => {
            // If it's a timer and it isn't paused...
            if (delay && !isPaused()) {
                const now = Date.now();
                // If the timer is up...
                if (now >= nextFireTimeRef.current) {
                    // Check if we're overdue on any events being fired (super low delay or expensive callback).
                    // To do this, we divide the time elapsed beyond the next expected fire time by the delay,
                    // and floor the result. In other words, find how overdue we are, then divide by the delay.console.log("now: " + now);
                    const timeOverdue = now - nextFireTimeRef.current;
                    const overdueCallsArray = [0];
                    // - Check if an array is given to the delay option
                    // - If so, we need to check if we're overdue on any events being fired.
                    // - If we are, we need to find out how many events we missed, and adjust
                    //   the next fire time accordingly.
                    // - We also need to increase the delayIndexRef value by the number of events we missed
                    //   so that we can keep track of where we are in the delay array. This is important 
                    //   because future fire times are calculated based on the values in the delay array.
                    // - If an array is not given to the delay option, we execute the old original code.
                    // ------------------------------------------------------------
                    // The change in the structure of the code is intentional, and meant to make it easier
                    // to track the logic and reduce the number of if statements and ternary conditional operators.
                    // The downside is that there are more lines of code.
                    // Possible performance improvement: Move `delayIndexRef.current = delayIndex + overdueCalls;`
                    // up so that we can avoid repeating the `delayIndex + overdueCalls` calculation. This has 
                    // not been done because it would need to be tested to make sure it doesn't break anything. 
                    const delayIndex = Array.isArray(options.delay) ? delayIndexRef.current + 1 : 0;
                    if (Array.isArray(options.delay) && delayIndex < options.delay.length) {
                        // In the following loop, we start from current position in the delay array and count how 
                        // many of the next delay values fit into the timeOverdue value. We then obtain the number
                        // of overdue calls directly from the result.
                        const total = [0];
                        options.delay.slice(delayIndex, options.delay.length).every((d, i) => {
                            total[0] = total[0] + d;
                            if (timeOverdue < total[0]) {
                                overdueCallsArray[0] = i;
                                return false;
                            }
                            return true;
                        });
                        const overdueCalls = lastFireTimeRef.current !== never ? Math.max(0, overdueCallsArray[0]) : 0;
                        lastFireTimeRef.current = now;
                        periodElapsedPauseTimeRef.current = 0;
                        const overdueElapsedTime = options.delay
                            .slice(delayIndex, delayIndex + overdueCalls)
                            .reduce((a, b) => a + b, 0);
                        const newFireTime = Math.max(now, nextFireTimeRef.current +
                            (delayIndex + overdueCalls < options.delay.length ? options.delay[delayIndex + overdueCalls] : 0) +
                            overdueElapsedTime);
                        // Calculate and set the next time the timer should fire, accounting for overdue calls (if any)
                        nextFireTimeRef.current = newFireTime;
                        delayIndexRef.current = delayIndex + overdueCalls;
                        // Call the callback
                        if (typeof callback === 'function') {
                            try {
                                callback(overdueCalls);
                            }
                            catch (e) {
                                console.error(e);
                            }
                        }
                        // If it repeats
                        if (!runOnce) {
                            // Set a timeout to check and fire the timer when time's up
                            subs.setTimeout(() => {
                                // Check if the timer can fire
                                checkTimer();
                            }, Math.max(newFireTime - Date.now(), 1));
                        }
                        else {
                            // If it doesn't repeat, stop the timer.
                            stop();
                        }
                    }
                    else if (Array.isArray(options.delay)) {
                        stop();
                    }
                    else {
                        // Calculate and set the next time the timer should fire, accounting for overdue calls (if any)
                        overdueCallsArray[0] = Math.floor(timeOverdue / delay);
                        const overdueCalls = lastFireTimeRef.current !== never ? Math.max(0, overdueCallsArray[0]) : 0;
                        lastFireTimeRef.current = now;
                        periodElapsedPauseTimeRef.current = 0;
                        const overdueElapsedTime = delay * overdueCalls;
                        const newFireTime = Math.max(now, nextFireTimeRef.current + delay + overdueElapsedTime);
                        nextFireTimeRef.current = newFireTime;
                        // Call the callback
                        if (typeof callback === 'function') {
                            try {
                                callback(overdueCalls);
                            }
                            catch (e) {
                                console.error(e);
                            }
                        }
                        // If it repeats
                        if (!runOnce) {
                            // Set a timeout to check and fire the timer when time's up
                            subs.setTimeout(() => {
                                // Check if the timer can fire
                                checkTimer();
                            }, Math.max(newFireTime - Date.now(), 1));
                        }
                        else {
                            // If it doesn't repeat, stop the timer.
                            stop();
                        }
                    }
                }
                // Time is not up yet. Set a timeout to check and fire when time's up
                else if (nextFireTimeRef.current < never) {
                    subs.setTimeout(() => {
                        // Check if the timer can fire
                        checkTimer();
                        // Home in on the exact time to fire.
                    }, Math.max(nextFireTimeRef.current - Date.now(), 1));
                }
            }
        };
        // Check if the timer can fire
        checkTimer();
        return subs.createCleanup();
    }, [callback, delay, isPaused, renderTime, runOnce, stop, options.delay]);
    // Start immediately if this is our first run.
    React.useEffect(() => {
        if (firstRun) {
            setFirstRun(false);
            if (startImmediately) {
                start();
            }
        }
    }, [firstRun, startImmediately, start]);
    return React.useMemo(() => {
        return {
            start,
            stop,
            pause,
            resume,
            isStarted,
            isStopped,
            isRunning,
            isPaused,
            getEffectiveDelay,
            getStartTime,
            getLastFireTime,
            getNextFireTime,
            getPauseTime,
            getResumeTime,
            getRemainingTime,
            getElapsedStartedTime,
            getElapsedRunningTime,
            getTotalElapsedPausedTime,
            getPeriodElapsedPausedTime,
            getElapsedResumedTime,
        };
    }, [
        getEffectiveDelay,
        getElapsedResumedTime,
        getElapsedRunningTime,
        getElapsedStartedTime,
        getLastFireTime,
        getNextFireTime,
        getPauseTime,
        getPeriodElapsedPausedTime,
        getRemainingTime,
        getResumeTime,
        getStartTime,
        getTotalElapsedPausedTime,
        isPaused,
        isRunning,
        isStarted,
        isStopped,
        pause,
        resume,
        start,
        stop,
    ]);
};
exports.useTimer = useTimer;
