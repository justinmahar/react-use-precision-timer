/// <reference types="react" />
import { Timer } from '../hooks/useTimer';
export interface TimerRendererProps {
    /** The timer or stopwatch to render. */
    timer: Timer;
    /**
     * Renders the timer, returning a JSX element.
     * @param timer The timer to render.
     */
    render?: (timer: Timer) => JSX.Element;
    /** Render rate in milliseconds. */
    renderRate?: number;
}
/**
 * Renders a timer or stopwatch at regular intervals.
 */
export declare const TimerRenderer: ({ timer, render, renderRate, }: TimerRendererProps) => JSX.Element;
