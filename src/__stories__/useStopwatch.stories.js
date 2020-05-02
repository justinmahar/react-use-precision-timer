import React from 'react';
import { useStopwatch } from '../hooks/useStopwatch';

// A Storybook is a collection of stories. Each story represents a single visual state of a component.
// Technically, a story is a function that returns something that can be rendered to screen.

// The default export defines metadata that applies to the group.
export default {
  title: 'useStopwatch Hook',
};

// The named exports define the stories

// Needed to wrap the hook and give it visual representation.
const HookComponent = () => {
  const [renderTime, setRenderTime] = React.useState(new Date().getTime());
  const stopwatch = useStopwatch();

  React.useEffect(() => {
    const timeout = setTimeout(() => setRenderTime(new Date().getTime()), 1);
    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div>
      <div>Stopwatch</div>
      <div>
        <button
          onClick={() => {
            stopwatch.start();
          }}
        >
          Start
        </button>
        <button
          onClick={() => {
            stopwatch.stop();
          }}
        >
          Stop
        </button>
        <button
          onClick={() => {
            stopwatch.pause();
          }}
        >
          Pause
        </button>
        <button
          onClick={() => {
            stopwatch.resume();
          }}
        >
          Resume
        </button>
      </div>
      <table>
        <tr>
          <td>getLastFireTime:</td>
          <td>{stopwatch.getLastFireTime()}</td>
        </tr>
        <tr>
          <td>getNextFireTime:</td>
          <td>{stopwatch.getNextFireTime()}</td>
        </tr>
        <tr>
          <td>getRemainingTime:</td>
          <td>{stopwatch.getRemainingTime()}</td>
        </tr>
        <tr>
          <td>getElapsedStartedTime:</td>
          <td>{stopwatch.getElapsedStartedTime()}</td>
        </tr>
        <tr>
          <td>getElapsedRunningTime:</td>
          <td>{stopwatch.getElapsedRunningTime()}</td>
        </tr>
        <tr>
          <td>getStartTime:</td>
          <td>{stopwatch.getStartTime()}</td>
        </tr>
        <tr>
          <td>getPauseTime:</td>
          <td>{stopwatch.getPauseTime()}</td>
        </tr>
        <tr>
          <td>getResumeTime:</td>
          <td>{stopwatch.getResumeTime()}</td>
        </tr>
        <tr>
          <td>getPeriodElapsedPausedTime:</td>
          <td>{stopwatch.getPeriodElapsedPausedTime()}</td>
        </tr>
        <tr>
          <td>getTotalElapsedPausedTime:</td>
          <td>{stopwatch.getTotalElapsedPausedTime()}</td>
        </tr>
        <tr>
          <td>getElapsedResumedTime:</td>
          <td>{stopwatch.getElapsedResumedTime()}</td>
        </tr>
        <tr>
          <td>isStarted:</td>
          <td>{stopwatch.isStarted() + ''}</td>
        </tr>
        <tr>
          <td>isStopped:</td>
          <td>{stopwatch.isStopped() + ''}</td>
        </tr>
        <tr>
          <td>isRunning:</td>
          <td>{stopwatch.isRunning() + ''}</td>
        </tr>
        <tr>
          <td>isPaused:</td>
          <td>{stopwatch.isPaused() + ''}</td>
        </tr>
      </table>
    </div>
  );
};

export const TimerStory = () => <HookComponent />;
TimerStory.story = {
  name: 'Hook Visual',
};
