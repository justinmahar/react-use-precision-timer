"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
/** Milliseconds representing forever in the future. */
var never = Number.MAX_SAFE_INTEGER;
/**
 * See documentation: [useTimer](https://devboldly.github.io/react-use-precision-timer/useTimer)
 *
 * A versatile precision timer hook for React. Doubles as a stopwatch.
 *
 * - Based on `setTimeout()` and timestamps, not `setInterval()` or ticks.
 * - Features perfect mean interval accuracy, meaning it doesn't wander.
 * - Resilient to expensive callback operations and low timer delays.
 * - Can be used as a timer or a stopwatch.
 * - Supports starting, stopping, pausing, and resuming.
 * - Includes accessors for everything under the sun.
 */
exports.useTimer = function (options) {
    if (options === void 0) { options = {}; }
    var now = new Date().getTime();
    var _a = React.useState(true), firstRun = _a[0], setFirstRun = _a[1];
    // This is used to trigger a render that checks to fire the timer
    var _b = React.useState(now), setCheckTime = _b[1];
    var _c = React.useState(false), started = _c[0], setStarted = _c[1];
    var _d = React.useState(never), startTime = _d[0], setStartTime = _d[1];
    var _e = React.useState(never), lastFireTime = _e[0], setLastFireTime = _e[1];
    var _f = React.useState(never), nextFireTime = _f[0], setNextFireTime = _f[1];
    var _g = React.useState(never), pauseTime = _g[0], setPauseTime = _g[1];
    var _h = React.useState(never), resumeTime = _h[0], setResumeTime = _h[1];
    var _j = React.useState(0), periodElapsedPauseTime = _j[0], setPeriodElapsedPauseTime = _j[1];
    var _k = React.useState(0), totalElapsedPauseTime = _k[0], setTotalElapsedPauseTime = _k[1];
    var isStarted = React.useCallback(function () {
        return started;
    }, [started]);
    var isStopped = React.useCallback(function () {
        return !isStarted();
    }, [isStarted]);
    var isPaused = React.useCallback(function () {
        return isStarted() && pauseTime !== never;
    }, [isStarted, pauseTime]);
    var isRunning = React.useCallback(function () {
        return isStarted() && !isPaused();
    }, [isPaused, isStarted]);
    var getStartTime = React.useCallback(function () {
        if (isStarted()) {
            return startTime;
        }
        return -1;
    }, [isStarted, startTime]);
    var getLastFireTime = React.useCallback(function () {
        return lastFireTime < never && !!options.delay ? lastFireTime : -1;
    }, [lastFireTime, options.delay]);
    var getNextFireTime = React.useCallback(function () {
        if (isRunning() && !!options.delay) {
            return nextFireTime;
        }
        return -1;
    }, [isRunning, nextFireTime, options.delay]);
    var getPauseTime = React.useCallback(function () {
        if (isPaused()) {
            return pauseTime;
        }
        return -1;
    }, [isPaused, pauseTime]);
    var getResumeTime = React.useCallback(function () {
        if (isStarted() && resumeTime < never) {
            return resumeTime;
        }
        return -1;
    }, [isStarted, resumeTime]);
    var getElapsedStartedTime = React.useCallback(function () {
        if (isStarted()) {
            return new Date().getTime() - startTime;
        }
        return 0;
    }, [isStarted, startTime]);
    var getElapsedRunningTime = React.useCallback(function () {
        if (isStarted()) {
            if (isPaused()) {
                return pauseTime - startTime - totalElapsedPauseTime;
            }
            else {
                return new Date().getTime() - startTime - totalElapsedPauseTime;
            }
        }
        return 0;
    }, [totalElapsedPauseTime, isPaused, isStarted, pauseTime, startTime]);
    var getPeriodElapsedPausedTime = React.useCallback(function () {
        var additionalElapsedPauseTime = 0;
        if (isPaused()) {
            additionalElapsedPauseTime = new Date().getTime() - pauseTime;
        }
        return periodElapsedPauseTime + additionalElapsedPauseTime;
    }, [isPaused, periodElapsedPauseTime, pauseTime]);
    var getTotalElapsedPausedTime = React.useCallback(function () {
        var additionalElapsedPauseTime = 0;
        if (isPaused()) {
            additionalElapsedPauseTime = new Date().getTime() - pauseTime;
        }
        return totalElapsedPauseTime + additionalElapsedPauseTime;
    }, [totalElapsedPauseTime, isPaused, pauseTime]);
    var getElapsedResumedTime = React.useCallback(function () {
        if (isRunning()) {
            return new Date().getTime() - resumeTime;
        }
        return 0;
    }, [isRunning, resumeTime]);
    var getRemainingTime = React.useCallback(function () {
        var currentTime = new Date().getTime();
        if (isStarted() && !!options.delay) {
            if (isRunning()) {
                return Math.max(0, nextFireTime - currentTime);
            }
            else if (isPaused()) {
                var edgeTime = lastFireTime !== never ? lastFireTime : startTime;
                return Math.max(0, options.delay - (pauseTime - edgeTime - periodElapsedPauseTime));
            }
        }
        return 0;
    }, [
        periodElapsedPauseTime,
        nextFireTime,
        isPaused,
        isRunning,
        isStarted,
        lastFireTime,
        options.delay,
        pauseTime,
        startTime,
    ]);
    var start = React.useCallback(function () {
        var currentTime = new Date().getTime();
        var newNextFireTime = options.delay
            ? Math.max(currentTime, options.fireImmediately ? currentTime : currentTime + options.delay)
            : never;
        setStartTime(currentTime);
        setLastFireTime(never);
        setNextFireTime(newNextFireTime);
        setPauseTime(never);
        setResumeTime(currentTime);
        setPeriodElapsedPauseTime(0);
        setTotalElapsedPauseTime(0);
        setStarted(true);
    }, [options.delay, options.fireImmediately]);
    var stop = React.useCallback(function () {
        setStartTime(never);
        setLastFireTime(never);
        setNextFireTime(never);
        setPauseTime(never);
        setResumeTime(never);
        setPeriodElapsedPauseTime(0);
        setTotalElapsedPauseTime(0);
        setStarted(false);
    }, []);
    var pause = React.useCallback(function () {
        if (isRunning()) {
            setPauseTime(new Date().getTime());
            setResumeTime(never);
        }
    }, [isRunning]);
    var resume = React.useCallback(function () {
        if (isStarted() && isPaused()) {
            var currentTime = new Date().getTime();
            setTotalElapsedPauseTime(totalElapsedPauseTime + (currentTime - pauseTime));
            setPeriodElapsedPauseTime(periodElapsedPauseTime + (currentTime - pauseTime));
            setNextFireTime(currentTime + getRemainingTime());
            setPauseTime(never);
            setResumeTime(currentTime);
        }
    }, [isStarted, isPaused, getRemainingTime, totalElapsedPauseTime, pauseTime, periodElapsedPauseTime]);
    React.useEffect(function () {
        var timeout;
        // If it's a timer and it isn't paused...
        if (options.delay && !isPaused()) {
            // Check if we're overdue on any events being fired (super low delay or expensive callback)
            var overdueCalls = Math.max(0, Math.floor((now - nextFireTime) / options.delay));
            // If we're overdue, this means we're not firing callbacks fast enough and need to prevent
            // exceeding the maximum update depth.
            // To do this, we only fire the callback on an even number of overdues (including 0, no overdues).
            // Else, we wait a little, then try again.
            if (overdueCalls % 2 !== 1) {
                // If the timer is up...
                if (now >= nextFireTime) {
                    // Call the callback
                    if (typeof options.callback === 'function') {
                        try {
                            // Only fire overdue callbacks if we're told to, otherwise skip them
                            for (var i = 0; i < (options.fireOverdueCallbacks ? overdueCalls + 1 : 1); i++) {
                                options.callback();
                            }
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                    setLastFireTime(now);
                    setPeriodElapsedPauseTime(0);
                    // If it repeats
                    if (!options.runOnce) {
                        // Calculate and set the next time the timer should fire
                        var overdueElapsedTime = overdueCalls * options.delay;
                        var newFireTime = Math.max(now, nextFireTime + options.delay + overdueElapsedTime);
                        setNextFireTime(newFireTime);
                        // Set a timeout to check and fire the timer when time's up
                        timeout = setTimeout(function () {
                            // This merely triggers a rerender to check if the timer can fire.
                            setCheckTime(new Date().getTime());
                        }, Math.max(newFireTime - new Date().getTime(), 1));
                    }
                    else {
                        // If it doesn't repeat, stop the timer.
                        stop();
                    }
                }
                // Time is not up yet. Set a timeout to check and fire when time's up
                else if (nextFireTime < never) {
                    timeout = setTimeout(function () {
                        // This merely triggers a rerender to check if the timer can fire.
                        setCheckTime(new Date().getTime());
                        // Home in on the exact time to fire.
                    }, Math.max(nextFireTime - new Date().getTime(), 1));
                }
            }
            else {
                // Relief valve to avoid maximum update depth exceeded errors.
                // When calls become overdue, there's too expensive of a callback or too low of a delay to keep up.
                // In both cases, the React max update stack will be exceeded due to repeated firings.
                // To relieve this, don't check to fire this time around, but check again in a short time.
                timeout = setTimeout(function () {
                    setCheckTime(new Date().getTime());
                }, 20);
            }
        }
        return function () {
            clearTimeout(timeout);
        };
    }, [now, nextFireTime, options.runOnce, options.delay, pauseTime, stop, isPaused, options]);
    // Start immediately if this is our first run.
    React.useEffect(function () {
        if (firstRun) {
            setFirstRun(false);
            if (options.startImmediately) {
                start();
            }
        }
    }, [firstRun, options.startImmediately, start]);
    return {
        start: start,
        stop: stop,
        pause: pause,
        resume: resume,
        isStarted: isStarted,
        isStopped: isStopped,
        isRunning: isRunning,
        isPaused: isPaused,
        getStartTime: getStartTime,
        getLastFireTime: getLastFireTime,
        getNextFireTime: getNextFireTime,
        getPauseTime: getPauseTime,
        getResumeTime: getResumeTime,
        getRemainingTime: getRemainingTime,
        getElapsedStartedTime: getElapsedStartedTime,
        getElapsedRunningTime: getElapsedRunningTime,
        getTotalElapsedPausedTime: getTotalElapsedPausedTime,
        getPeriodElapsedPausedTime: getPeriodElapsedPausedTime,
        getElapsedResumedTime: getElapsedResumedTime,
    };
};
