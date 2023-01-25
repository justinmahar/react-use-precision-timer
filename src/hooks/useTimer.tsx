import * as React from 'react';
import { Subs } from 'react-sub-unsub';

export interface TimerOptions {
  /** Amount of time to wait before firing the timer, in milliseconds. Use `undefined` or `0` if you'd like the timer to behave as a stopwatch, never firing. */
  delay?: number;
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
export const useTimer = (options: TimerOptions = {}, callback?: (overdueCallCount: number) => void): Timer => {
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

  // Memoized options
  const delay = React.useMemo(() => {
    const s = options.speedMultiplier ?? 1;
    const d = options.delay ?? 0;
    return s === 0 ? 0 : s > 0 && d > 0 ? Math.max(1, Math.round(d * (1 / s))) : d;
  }, [options.delay, options.speedMultiplier]);
  const runOnce = React.useMemo(() => options.runOnce, [options.runOnce]);
  const fireOnStart = React.useMemo(() => options.fireOnStart, [options.fireOnStart]);
  const startImmediately = React.useMemo(() => options.startImmediately, [options.startImmediately]);

  const isStarted = React.useCallback((): boolean => {
    return startedRef.current;
  }, []);

  const isStopped = React.useCallback((): boolean => {
    return !isStarted();
  }, [isStarted]);

  const isPaused = React.useCallback((): boolean => {
    return isStarted() && pauseTimeRef.current !== never;
  }, [isStarted]);

  const isRunning = React.useCallback((): boolean => {
    return isStarted() && !isPaused();
  }, [isPaused, isStarted]);

  const getEffectiveDelay = React.useCallback((): number => {
    return delay;
  }, [delay]);

  const getStartTime = React.useCallback((): number => {
    if (isStarted()) {
      return startTimeRef.current;
    }
    return -1;
  }, [isStarted]);

  const getLastFireTime = React.useCallback((): number => {
    return lastFireTimeRef.current < never && !!delay ? lastFireTimeRef.current : -1;
  }, [delay]);

  const getNextFireTime = React.useCallback((): number => {
    if (isRunning() && !!delay) {
      return nextFireTimeRef.current;
    }
    return -1;
  }, [isRunning, delay]);

  const getPauseTime = React.useCallback((): number => {
    if (isPaused()) {
      return pauseTimeRef.current;
    }
    return -1;
  }, [isPaused]);

  const getResumeTime = React.useCallback((): number => {
    if (isStarted() && resumeTimeRef.current < never) {
      return resumeTimeRef.current;
    }
    return -1;
  }, [isStarted]);

  const getElapsedStartedTime = React.useCallback((): number => {
    if (isStarted()) {
      return Date.now() - startTimeRef.current;
    }
    return 0;
  }, [isStarted]);

  const getElapsedRunningTime = React.useCallback((): number => {
    if (isStarted()) {
      if (isPaused()) {
        return pauseTimeRef.current - startTimeRef.current - totalElapsedPauseTimeRef.current;
      } else {
        return Date.now() - startTimeRef.current - totalElapsedPauseTimeRef.current;
      }
    }
    return 0;
  }, [isPaused, isStarted]);

  const getPeriodElapsedPausedTime = React.useCallback((): number => {
    let additionalElapsedPauseTime = 0;
    if (isPaused()) {
      additionalElapsedPauseTime = Date.now() - pauseTimeRef.current;
    }
    return periodElapsedPauseTimeRef.current + additionalElapsedPauseTime;
  }, [isPaused]);

  const getTotalElapsedPausedTime = React.useCallback((): number => {
    let additionalElapsedPauseTime = 0;
    if (isPaused()) {
      additionalElapsedPauseTime = Date.now() - pauseTimeRef.current;
    }
    return totalElapsedPauseTimeRef.current + additionalElapsedPauseTime;
  }, [isPaused]);

  const getElapsedResumedTime = React.useCallback((): number => {
    if (isRunning()) {
      return Date.now() - resumeTimeRef.current;
    }
    return 0;
  }, [isRunning]);

  const getRemainingTime = React.useCallback((): number => {
    const currentTime = Date.now();
    if (isStarted() && !!delay) {
      if (isRunning()) {
        return Math.max(0, nextFireTimeRef.current - currentTime);
      } else if (isPaused()) {
        const edgeTime = lastFireTimeRef.current !== never ? lastFireTimeRef.current : startTimeRef.current;
        return Math.max(0, delay - (pauseTimeRef.current - edgeTime - periodElapsedPauseTimeRef.current));
      }
    }
    return 0;
  }, [isPaused, isRunning, isStarted, delay]);

  const start = React.useCallback(
    (startTimeMillis = Date.now()) => {
      const newNextFireTime = delay
        ? Math.max(startTimeMillis, fireOnStart ? startTimeMillis : startTimeMillis + delay)
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
    },
    [delay, fireOnStart],
  );

  const stop = React.useCallback((): void => {
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

  const pause = React.useCallback((): void => {
    if (isRunning()) {
      pauseTimeRef.current = Date.now();
      resumeTimeRef.current = never;
      setRenderTime(Date.now());
    }
  }, [isRunning]);

  const resume = React.useCallback((): void => {
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
    const subs = new Subs();
    const checkTimer = () => {
      // If it's a timer and it isn't paused...
      if (delay && !isPaused()) {
        const now = Date.now();
        // If the timer is up...
        if (now >= nextFireTimeRef.current) {
          // Check if we're overdue on any events being fired (super low delay or expensive callback).
          // To do this, we divide the time elapsed beyond the next expected fire time by the delay,
          // and floor the result. In other words, find how overdue we are, then divide by the delay.
          const overdueCalls =
            lastFireTimeRef.current !== never ? Math.max(0, Math.floor((now - nextFireTimeRef.current) / delay)) : 0;
          lastFireTimeRef.current = now;
          periodElapsedPauseTimeRef.current = 0;
          // Calculate and set the next time the timer should fire, accounting for overdue calls (if any)
          const overdueElapsedTime = overdueCalls * delay;
          const newFireTime = Math.max(now, nextFireTimeRef.current + delay + overdueElapsedTime);
          nextFireTimeRef.current = newFireTime;

          // Call the callback
          if (typeof callback === 'function') {
            try {
              callback(overdueCalls);
            } catch (e) {
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
          } else {
            // If it doesn't repeat, stop the timer.
            stop();
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
  }, [callback, delay, isPaused, renderTime, runOnce, stop]);

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
