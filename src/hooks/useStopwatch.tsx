import { Timer, useTimer } from "./useTimer";

/**
 * See documentation: [useStopwatch](https://justinmahar.github.io/react-use-precision-timer/useStopwatch)
 *
 * Runs indefinitely, counting elapsed time, until paused or stopped.
 */
export const useStopwatch = (): Timer => {
  return useTimer();
};
