export interface TimerOptions {
    /** Amount of time to wait before firing the timer, in milliseconds. Use `undefined` or `0` if you'd like the timer to behave as a stopwatch, never firing. */
    delay?: number | number[];
    /** Use `true` to only run the timer once, `false` otherwise.  */
    runOnce?: boolean;
    /** Use `true` if the timer should fire immediately, calling the provided callback when starting. Use `false` otherwise. */
    fireOnStart?: boolean;
    /** Use `true` if the timer should start immediately, `false` if you'd like to call `start()` yourself. */
    startImmediately?: boolean;
    /**
     * Provide a multiplier greater than `0` to increase or decrease the speed of the timer delay.
     * Set this to anything greater than `1` to make the timer fire faster, or less than `1` but greater
     * than `0` to fire slower, with `1` being "normal" speed determined by `delay`. Default `1`.
     */
    speedMultiplier?: number;
}
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
export declare const useTimer: (options?: TimerOptions, callback?: ((overdueCallCount: number) => void) | undefined) => Timer;
/**
 * See documentation: [Timer](https://justinmahar.github.io/react-use-precision-timer/?path=/story/docs-usetimer--page#timer)
 */
export interface Timer {
    /**
     * Start the timer. If already started, will restart the timer.
     *
     * @param startTime Optional. The Unix epoch time in milliseconds at which to start the timer. Defaults to the current time in millis.
     */
    start: (startTime?: number) => void;
    /** Stop the timer. */
    stop: () => void;
    /** Pause the timer. */
    pause: () => void;
    /** Resume the timer. */
    resume: () => void;
    /** Returns `true` if the timer is started, `false` otherwise. Will be `true` when the timer is started but paused. Use `isRunning()` to check if the timer is started and not paused. */
    isStarted: () => boolean;
    /** Returns `true` if the timer is stopped, `false` otherwise. Will be `false` when the timer is started but paused. */
    isStopped: () => boolean;
    /** Returns `true` if the timer is started and not paused, `false` otherwise. */
    isRunning: () => boolean;
    /** Returns `true` if the timer is started but paused, `false` otherwise. */
    isPaused: () => boolean;
    /** Returns the effective delay. Useful when using the `speedMultiplier` option. */
    getEffectiveDelay: () => number;
    /** Return the time at which the timer was started, in milliseconds since the [Unix epoch](https://en.wikipedia.org/wiki/Unix_time). Returns `-1` if the timer is stopped. */
    getStartTime: () => number;
    /** The last time the timer fired and the callback was called, in milliseconds since the [Unix epoch](https://en.wikipedia.org/wiki/Unix_time), or `-1` if it hasn't fired yet or there is no `delay`. */
    getLastFireTime: () => number;
    /** The next time the timer will fire and the callback will be called, in milliseconds since the [Unix epoch](https://en.wikipedia.org/wiki/Unix_time), or `-1` if the timer is not running or there is no `delay`. */
    getNextFireTime: () => number;
    /** Return the time at which the timer was paused, in milliseconds since the [Unix epoch](https://en.wikipedia.org/wiki/Unix_time). Returns `-1` if the timer is not paused or is stopped. */
    getPauseTime: () => number;
    /** Return the time at which the timer was last resumed, in milliseconds since the [Unix epoch](https://en.wikipedia.org/wiki/Unix_time). Returns `-1` if the timer is not started. */
    getResumeTime: () => number;
    /** Return the time remaining in milliseconds before the timer fires. Returns `0` if the timer has no `delay`. */
    getRemainingTime: () => number;
    /** Return the total amount of time elapsed in milliseconds since starting the timer, including paused time. Returns `0` if the timer is stopped. */
    getElapsedStartedTime: () => number;
    /** Return the amount of time that has elapsed in milliseconds since starting the timer, minus the time spent paused (if any). Returns `0` if the timer is stopped. */
    getElapsedRunningTime: () => number;
    /** Return the cumulative total amount of time elapsed in milliseconds while paused since starting the timer. It is a total of all time spent paused. Returns `0` if the timer is stopped. */
    getTotalElapsedPausedTime: () => number;
    /** Return the amount of time elapsed in milliseconds while paused for the current pause period. This will be the elapsed time since the timer was last paused (not the cumulative total). Returns `0` if the timer is running. */
    getPeriodElapsedPausedTime: () => number;
    /** Return the total amount of time elapsed in milliseconds since the timer was last resumed, or since it was started if never paused. Returns `0` if the timer is stopped. */
    getElapsedResumedTime: () => number;
}
