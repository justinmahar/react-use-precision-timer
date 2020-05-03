import * as React from 'react';

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

/** Milliseconds representing forever in the future. */
const never = Number.MAX_SAFE_INTEGER;

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
export const useTimer = (options: TimerOptions = {}): Timer => {
  const now = new Date().getTime();
  const [firstRun, setFirstRun] = React.useState(true);
  // This is used to trigger a render that checks to fire the timer
  const [, setCheckTime] = React.useState(now);
  const [started, setStarted] = React.useState(false);
  const [startTime, setStartTime] = React.useState(never);
  const [lastFireTime, setLastFireTime] = React.useState(never);
  const [nextFireTime, setNextFireTime] = React.useState(never);
  const [pauseTime, setPauseTime] = React.useState(never);
  const [resumeTime, setResumeTime] = React.useState(never);
  const [periodElapsedPauseTime, setPeriodElapsedPauseTime] = React.useState(0);
  const [totalElapsedPauseTime, setTotalElapsedPauseTime] = React.useState(0);

  const isStarted = React.useCallback((): boolean => {
    return started;
  }, [started]);

  const isStopped = React.useCallback((): boolean => {
    return !isStarted();
  }, [isStarted]);

  const isPaused = React.useCallback((): boolean => {
    return isStarted() && pauseTime !== never;
  }, [isStarted, pauseTime]);

  const isRunning = React.useCallback((): boolean => {
    return isStarted() && !isPaused();
  }, [isPaused, isStarted]);

  const getStartTime = React.useCallback((): number => {
    if (isStarted()) {
      return startTime;
    }
    return -1;
  }, [isStarted, startTime]);

  const getLastFireTime = React.useCallback((): number => {
    return lastFireTime < never && !!options.delay ? lastFireTime : -1;
  }, [lastFireTime, options.delay]);

  const getNextFireTime = React.useCallback((): number => {
    if (isRunning() && !!options.delay) {
      return nextFireTime;
    }
    return -1;
  }, [isRunning, nextFireTime, options.delay]);

  const getPauseTime = React.useCallback((): number => {
    if (isPaused()) {
      return pauseTime;
    }
    return -1;
  }, [isPaused, pauseTime]);

  const getResumeTime = React.useCallback((): number => {
    if (isStarted() && resumeTime < never) {
      return resumeTime;
    }
    return -1;
  }, [isStarted, resumeTime]);

  const getElapsedStartedTime = React.useCallback((): number => {
    if (isStarted()) {
      return new Date().getTime() - startTime;
    }
    return 0;
  }, [isStarted, startTime]);

  const getElapsedRunningTime = React.useCallback((): number => {
    if (isStarted()) {
      if (isPaused()) {
        return pauseTime - startTime - totalElapsedPauseTime;
      } else {
        return new Date().getTime() - startTime - totalElapsedPauseTime;
      }
    }
    return 0;
  }, [totalElapsedPauseTime, isPaused, isStarted, pauseTime, startTime]);

  const getPeriodElapsedPausedTime = React.useCallback((): number => {
    let additionalElapsedPauseTime = 0;
    if (isPaused()) {
      additionalElapsedPauseTime = new Date().getTime() - pauseTime;
    }
    return periodElapsedPauseTime + additionalElapsedPauseTime;
  }, [isPaused, periodElapsedPauseTime, pauseTime]);

  const getTotalElapsedPausedTime = React.useCallback((): number => {
    let additionalElapsedPauseTime = 0;
    if (isPaused()) {
      additionalElapsedPauseTime = new Date().getTime() - pauseTime;
    }
    return totalElapsedPauseTime + additionalElapsedPauseTime;
  }, [totalElapsedPauseTime, isPaused, pauseTime]);

  const getElapsedResumedTime = React.useCallback((): number => {
    if (isRunning()) {
      return new Date().getTime() - resumeTime;
    }
    return 0;
  }, [isRunning, resumeTime]);

  const getRemainingTime = React.useCallback((): number => {
    const currentTime = new Date().getTime();
    if (isStarted() && !!options.delay) {
      if (isRunning()) {
        return Math.max(0, nextFireTime - currentTime);
      } else if (isPaused()) {
        const edgeTime = lastFireTime !== never ? lastFireTime : startTime;
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

  const start = React.useCallback(() => {
    const currentTime = new Date().getTime();
    const newNextFireTime = options.delay
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

  const stop = React.useCallback((): void => {
    setStartTime(never);
    setLastFireTime(never);
    setNextFireTime(never);
    setPauseTime(never);
    setResumeTime(never);
    setPeriodElapsedPauseTime(0);
    setTotalElapsedPauseTime(0);
    setStarted(false);
  }, []);

  const pause = React.useCallback((): void => {
    if (isRunning()) {
      setPauseTime(new Date().getTime());
      setResumeTime(never);
    }
  }, [isRunning]);

  const resume = React.useCallback((): void => {
    if (isStarted() && isPaused()) {
      const currentTime = new Date().getTime();
      setTotalElapsedPauseTime(totalElapsedPauseTime + (currentTime - pauseTime));
      setPeriodElapsedPauseTime(periodElapsedPauseTime + (currentTime - pauseTime));
      setNextFireTime(currentTime + getRemainingTime());
      setPauseTime(never);
      setResumeTime(currentTime);
    }
  }, [isStarted, isPaused, getRemainingTime, totalElapsedPauseTime, pauseTime, periodElapsedPauseTime]);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    // If it's a timer and it isn't paused...
    if (options.delay && !isPaused()) {
      // Check if we're overdue on any events being fired (super low delay or expensive callback)
      const overdueCalls = Math.max(0, Math.floor((now - nextFireTime) / options.delay));
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
              for (let i = 0; i < (options.fireOverdueCallbacks ? overdueCalls + 1 : 1); i++) {
                options.callback();
              }
            } catch (e) {
              console.error(e);
            }
          }
          setLastFireTime(now);
          setPeriodElapsedPauseTime(0);
          // If it repeats
          if (!options.runOnce) {
            // Calculate and set the next time the timer should fire
            const overdueElapsedTime = overdueCalls * options.delay;
            const newFireTime = Math.max(now, nextFireTime + options.delay + overdueElapsedTime);
            setNextFireTime(newFireTime);
            // Set a timeout to check and fire the timer when time's up
            timeout = setTimeout(() => {
              // This merely triggers a rerender to check if the timer can fire.
              setCheckTime(new Date().getTime());
            }, Math.max(newFireTime - new Date().getTime(), 1));
          } else {
            // If it doesn't repeat, stop the timer.
            stop();
          }
        }
        // Time is not up yet. Set a timeout to check and fire when time's up
        else if (nextFireTime < never) {
          timeout = setTimeout(() => {
            // This merely triggers a rerender to check if the timer can fire.
            setCheckTime(new Date().getTime());
            // Home in on the exact time to fire.
          }, Math.max(nextFireTime - new Date().getTime(), 1));
        }
      } else {
        // Relief valve to avoid maximum update depth exceeded errors.
        // When calls become overdue, there's too expensive of a callback or too low of a delay to keep up.
        // In both cases, the React max update stack will be exceeded due to repeated firings.
        // To relieve this, don't check to fire this time around, but check again in a short time.
        timeout = setTimeout(() => {
          setCheckTime(new Date().getTime());
        }, 20);
      }
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [now, nextFireTime, options.runOnce, options.delay, pauseTime, stop, isPaused, options]);

  // Start immediately if this is our first run.
  React.useEffect(() => {
    if (firstRun) {
      setFirstRun(false);
      if (options.startImmediately) {
        start();
      }
    }
  }, [firstRun, options.startImmediately, start]);

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
};

/**
 * See documentation: [Timer](https://devboldly.github.io/react-use-precision-timer/useTimer#timer)
 */
export interface Timer {
  /** Start the timer. If already started, will restart the timer. */
  start: () => void;
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
