import { Timer, useTimer } from './useTimer';

/**
 * See documentation: [useDelay](https://justinmahar.github.io/react-use-precision-timer/useDelay)
 *
 * Fires the callback after the specified delay has passed. Call start() on the returned Timer to execute.
 *
 * @param delay The amount of time, in milliseconds, before the timer fires.
 * @param callback Called when the timer fires. Use React.useCallback() for this.
 */
export const useDelay = (delay: number, callback: () => void): Timer => {
  return useTimer({ delay, runOnce: true }, callback);
};
