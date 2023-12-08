import classNames from 'classnames';
import React from 'react';
import { DivProps } from 'react-html-props';
import { Timer, useTimer } from '../hooks/useTimer';

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
export const TimerRenderer = ({
  timer,
  render = (timer) => <>{timer.getElapsedRunningTime()}</>,
  renderRate = 10,
}: TimerRendererProps) => {
  const [, setRenderTime] = React.useState(Date.now());
  useTimer({ delay: Math.max(0, renderRate) }, () => setRenderTime(Date.now()));
  return render(timer);
};
