export interface TimerOptions {
    /** Amount of time to wait before firing the timer, in milliseconds. Use `undefined` or `0` if you'd like the timer to behave as a stopwatch, never firing. */
    delay?: number;
    /** The callback to call when the timer fires. Must provide a `delay` for the timer to fire. */
    callback?: () => void;
    /** Use `true` to only run the timer once, `false` otherwise.  */
    runOnce?: boolean;
    /** Use `true` if the timer should fire immediately, calling the provided callback when starting. Use `false` otherwise. */
    fireImmediately?: boolean;
    /** Use `true` if the timer should start immediately, `false` if you'd like to call `start()` yourself. */
    startImmediately?: boolean;
    /** There is a failsafe built in for very low delays (less than 10ms) and expensive callback operations, which sometimes cause the timer to not fire fast enough. You can use `true` to disable the failsafe. With no failsafe, the callback will always be called the exact number of times expected, even when calls are overdue. Be aware that if the callback is expensive (takes longer than the delay), this may lead to a crash. When `false` (default), the failsafe is enabled and calls to the callback will be skipped when the timer can't keep up. Only set this to `true` if your callback isn't expensive. Default `false`. */
    fireOverdueCallbacks?: boolean;
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
 */
export declare const useTimer: (options?: TimerOptions) => Timer;
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
    /** Return the total amount of time elapsed in milliseconds while paused since starting the timer. Returns `0` if the timer is stopped. */
    getTotalElapsedPausedTime: () => number;
    /** Return the amount of time elapsed in milliseconds while paused in the current period. This will be the elapsed time since the timer last fired, or since it started if it hasn't fired yet. Returns `0` if never paused since starting or last firing. */
    getPeriodElapsedPausedTime: () => number;
    /** Return the total amount of time elapsed in milliseconds since the timer was last resumed, or since it was started if never paused. Returns `0` if the timer is stopped. */
    getElapsedResumedTime: () => number;
}
