'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.useTimer = void 0;
const React = __importStar(require('react'));
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
 */
const useTimer = (options = {}) => {
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
  const isStarted = React.useCallback(() => {
    return started;
  }, [started]);
  const isStopped = React.useCallback(() => {
    return !isStarted();
  }, [isStarted]);
  const isPaused = React.useCallback(() => {
    return isStarted() && pauseTime !== never;
  }, [isStarted, pauseTime]);
  const isRunning = React.useCallback(() => {
    return isStarted() && !isPaused();
  }, [isPaused, isStarted]);
  const getStartTime = React.useCallback(() => {
    if (isStarted()) {
      return startTime;
    }
    return -1;
  }, [isStarted, startTime]);
  const getLastFireTime = React.useCallback(() => {
    return lastFireTime < never && !!options.delay ? lastFireTime : -1;
  }, [lastFireTime, options.delay]);
  const getNextFireTime = React.useCallback(() => {
    if (isRunning() && !!options.delay) {
      return nextFireTime;
    }
    return -1;
  }, [isRunning, nextFireTime, options.delay]);
  const getPauseTime = React.useCallback(() => {
    if (isPaused()) {
      return pauseTime;
    }
    return -1;
  }, [isPaused, pauseTime]);
  const getResumeTime = React.useCallback(() => {
    if (isStarted() && resumeTime < never) {
      return resumeTime;
    }
    return -1;
  }, [isStarted, resumeTime]);
  const getElapsedStartedTime = React.useCallback(() => {
    if (isStarted()) {
      return new Date().getTime() - startTime;
    }
    return 0;
  }, [isStarted, startTime]);
  const getElapsedRunningTime = React.useCallback(() => {
    if (isStarted()) {
      if (isPaused()) {
        return pauseTime - startTime - totalElapsedPauseTime;
      } else {
        return new Date().getTime() - startTime - totalElapsedPauseTime;
      }
    }
    return 0;
  }, [totalElapsedPauseTime, isPaused, isStarted, pauseTime, startTime]);
  const getPeriodElapsedPausedTime = React.useCallback(() => {
    let additionalElapsedPauseTime = 0;
    if (isPaused()) {
      additionalElapsedPauseTime = new Date().getTime() - pauseTime;
    }
    return periodElapsedPauseTime + additionalElapsedPauseTime;
  }, [isPaused, periodElapsedPauseTime, pauseTime]);
  const getTotalElapsedPausedTime = React.useCallback(() => {
    let additionalElapsedPauseTime = 0;
    if (isPaused()) {
      additionalElapsedPauseTime = new Date().getTime() - pauseTime;
    }
    return totalElapsedPauseTime + additionalElapsedPauseTime;
  }, [totalElapsedPauseTime, isPaused, pauseTime]);
  const getElapsedResumedTime = React.useCallback(() => {
    if (isRunning()) {
      return new Date().getTime() - resumeTime;
    }
    return 0;
  }, [isRunning, resumeTime]);
  const getRemainingTime = React.useCallback(() => {
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
  const stop = React.useCallback(() => {
    setStartTime(never);
    setLastFireTime(never);
    setNextFireTime(never);
    setPauseTime(never);
    setResumeTime(never);
    setPeriodElapsedPauseTime(0);
    setTotalElapsedPauseTime(0);
    setStarted(false);
  }, []);
  const pause = React.useCallback(() => {
    if (isRunning()) {
      setPauseTime(new Date().getTime());
      setResumeTime(never);
    }
  }, [isRunning]);
  const resume = React.useCallback(() => {
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
    let timeout;
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
exports.useTimer = useTimer;
