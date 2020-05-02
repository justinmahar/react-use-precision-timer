import { Timer } from './useTimer';
/**
 * See documentation: https://devboldly.github.io/react-use-precision-timer/useDelay
 *
 * Fires the callback after the specified delay has passed.
 *
 * @param delay The amount of time, in milliseconds, before the timer fires.
 * @param callback Called when the timer fires.
 */
export declare const useDelay: (delay: number, callback: () => void) => Timer;
