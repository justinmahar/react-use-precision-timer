import React from 'react';
import { useTimer } from '../hooks/useTimer';

// A Storybook is a collection of stories. Each story represents a single visual state of a component.
// Technically, a story is a function that returns something that can be rendered to screen.

// The default export defines metadata that applies to the group.
export default {
  title: 'useTimer Hook',
};

// The named exports define the stories

// Needed to wrap the hook and give it visual representation.
const HookComponent = () => {
  const [delay, setDelay] = React.useState(1000);
  const [callbackTime, setCallbackTime] = React.useState(-1);
  const [renderTime, setRenderTime] = React.useState(new Date().getTime());
  const [runOnce, setRunOnce] = React.useState(false);
  const [fireImmediately, setFireImmediately] = React.useState(false);
  const [startImmediately, setStartImmediately] = React.useState(true);
  const callback = () => {
    setCallbackTime(new Date().getTime());
  };
  const timer = useTimer({ delay: delay, callback, runOnce, fireImmediately, startImmediately });

  React.useEffect(() => {
    const timeout = setTimeout(() => setRenderTime(new Date().getTime()), 1);
    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div>
      <div>
        <div>
          <input
            type="range"
            id="points"
            name="points"
            min="10"
            max="5000"
            value={delay}
            onChange={e => {
              setDelay(parseInt(e.target.value));
              timer.start();
            }}
          />{' '}
          {delay} milliseconds
        </div>
        <div>
          <input
            type="checkbox"
            id="runOnce"
            name="runOnce"
            checked={runOnce}
            onChange={e => setRunOnce(e.target.checked)}
          />
          <label htmlFor="runOnce"> runOnce</label>
          <input
            type="checkbox"
            id="fireImmediately"
            name="fireImmediately"
            checked={fireImmediately}
            onChange={e => setFireImmediately(e.target.checked)}
          />
          <label htmlFor="fireImmediately"> fireImmediately</label>
          <input
            type="checkbox"
            id="startImmediately"
            name="startImmediately"
            checked={startImmediately}
            onChange={e => setStartImmediately(e.target.checked)}
          />
          <label htmlFor="startImmediately"> startImmediately</label>
          <br />
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            timer.start();
          }}
        >
          Start
        </button>
        <button
          onClick={() => {
            timer.stop();
          }}
        >
          Stop
        </button>
        <button
          onClick={() => {
            timer.pause();
          }}
        >
          Pause
        </button>
        <button
          onClick={() => {
            timer.resume();
          }}
        >
          Resume
        </button>
      </div>
      <div>
        <progress value={timer.isStopped() ? 0 : delay - timer.getRemainingTime()} max={delay}>
          {timer.getRemainingTime()}
        </progress>
      </div>
      <table>
        <tr>
          <td>callback time:</td>
          <td>{callbackTime}</td>
        </tr>
        <tr>
          <td>delay:</td>
          <td>{delay}</td>
        </tr>
        <tr>
          <td>getLastFireTime:</td>
          <td>{timer.getLastFireTime()}</td>
        </tr>
        <tr>
          <td>getNextFireTime:</td>
          <td>{timer.getNextFireTime()}</td>
        </tr>
        <tr>
          <td>getRemainingTime:</td>
          <td>{timer.getRemainingTime()}</td>
        </tr>
        <tr>
          <td>getElapsedStartedTime:</td>
          <td>{timer.getElapsedStartedTime()}</td>
        </tr>
        <tr>
          <td>getElapsedRunningTime:</td>
          <td>{timer.getElapsedRunningTime()}</td>
        </tr>
        <tr>
          <td>getStartTime:</td>
          <td>{timer.getStartTime()}</td>
        </tr>
        <tr>
          <td>getPauseTime:</td>
          <td>{timer.getPauseTime()}</td>
        </tr>
        <tr>
          <td>getResumeTime:</td>
          <td>{timer.getResumeTime()}</td>
        </tr>
        <tr>
          <td>getPeriodElapsedPausedTime:</td>
          <td>{timer.getPeriodElapsedPausedTime()}</td>
        </tr>
        <tr>
          <td>getTotalElapsedPausedTime:</td>
          <td>{timer.getTotalElapsedPausedTime()}</td>
        </tr>
        <tr>
          <td>getElapsedResumedTime:</td>
          <td>{timer.getElapsedResumedTime()}</td>
        </tr>
        <tr>
          <td>isStarted:</td>
          <td>{timer.isStarted() + ''}</td>
        </tr>
        <tr>
          <td>isStopped:</td>
          <td>{timer.isStopped() + ''}</td>
        </tr>
        <tr>
          <td>isRunning:</td>
          <td>{timer.isRunning() + ''}</td>
        </tr>
        <tr>
          <td>isPaused:</td>
          <td>{timer.isPaused() + ''}</td>
        </tr>
      </table>
    </div>
  );
};

export const TimerStory = () => <HookComponent />;
TimerStory.story = {
  name: 'Hook Visual',
};
