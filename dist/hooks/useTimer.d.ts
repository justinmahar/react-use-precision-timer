interface TimerOptions {
    delay: number;
    callback: () => void;
    runOnce?: boolean;
    fireImmediately?: boolean;
    startImmediately?: boolean;
}
/**
 * Fires the callback after the specified delay in milliseconds has passed.
 *
 * Can specify an option to run only once, and can specify an option to fire immediately.
 */
export declare const useTimer: (options: TimerOptions) => Timer;
interface Timer {
    start: () => void;
    stop: () => void;
}
export {};
