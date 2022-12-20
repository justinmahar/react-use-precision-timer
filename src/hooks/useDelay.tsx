import * as React from 'react';
import { useTimer, Timer, TimerOptions } from './useTimer';

/**
 * See documentation: [useDelay](https://justinmahar.github.io/react-use-precision-timer/useDelay)
 *
 * Fires the callback after the specified delay has passed.
 *
 * @param delay The amount of time, in milliseconds, before the timer fires.
 * @param callback Called when the timer fires.
 */
export const useDelay = (delay: number, callback: () => void): Timer => {
  const [firstRun, setFirstRun] = React.useState(true);
  const timerOptions: TimerOptions = React.useMemo(() => {
    return {
      delay,
      callback,
      runOnce: true,
      fireImmediately: false,
    };
  }, [callback, delay]);
  const timer = useTimer(timerOptions);
  React.useEffect(() => {
    // Ensures the delay only ever runs once
    if (firstRun) {
      setFirstRun(false);
      timer.start();
    }
  }, [firstRun, timer]);
  return timer;
};
