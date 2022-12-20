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
/** Milliseconds representing forever in the future. */
const never = Number.MAX_SAFE_INTEGER;
/**
 * See documentation: [useTimer](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usetimer--page)
 *
 * A versatile precision timer hook for React. Doubles as a stopwatch.
 *
 * IMPORTANT: Provided `options` should be memoized using `React.useMemo()` to prevent excessive rendering.
 *
 * - Based on `setTimeout()` and timestamps, not `setInterval()` or ticks.
 * - Features perfect mean interval accuracy, meaning it doesn't wander.
 * - Resilient to expensive callback operations and low timer delays.
 * - Can be used as a timer or a stopwatch.
 * - Supports starting, stopping, pausing, and resuming.
 * - Includes accessors for everything under the sun.
 */
const useTimer = (options = {}) => {
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
    const getStartTime = React.useCallback(() => {
        if (isStarted()) {
            return startTimeRef.current;
        }
        return -1;
    }, [isStarted]);
    const getLastFireTime = React.useCallback(() => {
        return lastFireTimeRef.current < never && !!options.delay ? lastFireTimeRef.current : -1;
    }, [options.delay]);
    const getNextFireTime = React.useCallback(() => {
        if (isRunning() && !!options.delay) {
            return nextFireTimeRef.current;
        }
        return -1;
    }, [isRunning, options.delay]);
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
        if (isStarted() && !!options.delay) {
            if (isRunning()) {
                return Math.max(0, nextFireTimeRef.current - currentTime);
            }
            else if (isPaused()) {
                const edgeTime = lastFireTimeRef.current !== never ? lastFireTimeRef.current : startTimeRef.current;
                return Math.max(0, options.delay - (pauseTimeRef.current - edgeTime - periodElapsedPauseTimeRef.current));
            }
        }
        return 0;
    }, [isPaused, isRunning, isStarted, options.delay]);
    const start = React.useCallback((startTimeMillis = Date.now()) => {
        const newNextFireTime = options.delay
            ? Math.max(startTimeMillis, options.fireImmediately ? startTimeMillis : startTimeMillis + options.delay)
            : never;
        startTimeRef.current = startTimeMillis;
        lastFireTimeRef.current = never;
        nextFireTimeRef.current = newNextFireTime;
        pauseTimeRef.current = never;
        resumeTimeRef.current = startTimeMillis;
        periodElapsedPauseTimeRef.current = 0;
        totalElapsedPauseTimeRef.current = 0;
        startedRef.current = true;
        setRenderTime(Date.now());
    }, [options.delay, options.fireImmediately]);
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
            totalElapsedPauseTimeRef.current = totalElapsedPauseTimeRef.current + (currentTime - pauseTimeRef.current);
            periodElapsedPauseTimeRef.current = periodElapsedPauseTimeRef.current + (currentTime - pauseTimeRef.current);
            pauseTimeRef.current = never;
            resumeTimeRef.current = currentTime;
            setRenderTime(Date.now());
        }
    }, [isStarted, isPaused, getRemainingTime]);
    React.useEffect(() => {
        let timeout;
        const checkTimer = () => {
            clearTimeout(timeout);
            // If it's a timer and it isn't paused...
            if (options.delay && !isPaused()) {
                const now = Date.now();
                // If the timer is up...
                if (now >= nextFireTimeRef.current) {
                    // Check if we're overdue on any events being fired (super low delay or expensive callback).
                    // To do this, we divide the time elapsed beyond the next expected fire time by the delay,
                    // and floor the result. In other words, find how overdue we are, then divide by the delay.
                    const overdueCalls = lastFireTimeRef.current !== never
                        ? Math.max(0, Math.floor((now - nextFireTimeRef.current) / options.delay))
                        : 0;
                    lastFireTimeRef.current = now;
                    periodElapsedPauseTimeRef.current = 0;
                    // Call the callback
                    if (typeof options.callback === 'function') {
                        try {
                            options.callback(overdueCalls);
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                    // If it repeats
                    if (!options.runOnce) {
                        // Calculate and set the next time the timer should fire, accounting for overdue calls (if any)
                        const overdueElapsedTime = overdueCalls * options.delay;
                        const newFireTime = Math.max(now, nextFireTimeRef.current + options.delay + overdueElapsedTime);
                        nextFireTimeRef.current = newFireTime;
                        // Set a timeout to check and fire the timer when time's up
                        timeout = setTimeout(() => {
                            // Check if the timer can fire
                            checkTimer();
                        }, Math.max(newFireTime - Date.now(), 1));
                    }
                    else {
                        // If it doesn't repeat, stop the timer.
                        stop();
                    }
                }
                // Time is not up yet. Set a timeout to check and fire when time's up
                else if (nextFireTimeRef.current < never) {
                    timeout = setTimeout(() => {
                        // Check if the timer can fire
                        checkTimer();
                        // Home in on the exact time to fire.
                    }, Math.max(nextFireTimeRef.current - Date.now(), 1));
                }
            }
        };
        // Check if the timer can fire
        checkTimer();
        return () => {
            clearTimeout(timeout);
        };
    }, [isPaused, options, renderTime, stop]);
    // Start immediately if this is our first run.
    React.useEffect(() => {
        if (firstRun) {
            setFirstRun(false);
            if (options.startImmediately) {
                start();
            }
        }
    }, [firstRun, options.startImmediately, start]);
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
