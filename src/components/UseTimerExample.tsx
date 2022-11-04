import * as React from 'react';
import { useTimer } from '../hooks/useTimer';

export function UseTimerExample(): JSX.Element {
  const [delay, setDelay] = React.useState(1000);
  const [startTimeEnabled, setStartTimeEnabled] = React.useState(false);
  const [startTime, setStartTime] = React.useState(0);
  const [callbackTime, setCallbackTime] = React.useState(-1);
  const [runOnce, setRunOnce] = React.useState(false);
  const [fireImmediately, setFireImmediately] = React.useState(false);
  const [startImmediately, setStartImmediately] = React.useState(true);
  const [delayChanged, setDelayChanged] = React.useState(false);
  const [renderTime, setRenderTime] = React.useState(new Date().getTime());
  const [frameRate, setFrameRate] = React.useState(10);
  const callback = () => {
    setCallbackTime(new Date().getTime());
  };
  const timer = useTimer({
    delay,
    callback,
    runOnce,
    fireImmediately,
    startImmediately,
    fireOverdueCallbacks: true,
  });

  React.useEffect(() => {
    const timeout = setTimeout(() => setRenderTime(new Date().getTime()), frameRate);
    return () => {
      clearTimeout(timeout);
    };
  });

  // Automatically start or stop when the delay changes.
  React.useEffect(() => {
    if (delayChanged) {
      setDelayChanged(false);
      if (startImmediately) {
        timer.start(startTimeEnabled ? startTime : undefined);
      } else {
        timer.stop();
      }
    }
  }, [delay, delayChanged, startImmediately, startTime, timer]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div>
          <div>
            <div style={{ marginBottom: 10 }}>
              Delay:{' '}
              <input
                type="range"
                min="0"
                max="5000"
                value={delay}
                onChange={(e) => {
                  const newDelay = parseInt(e.target.value);
                  setDelay(newDelay);
                  setDelayChanged(true);
                  if (newDelay === 0) {
                    setCallbackTime(-1);
                  }
                }}
              />{' '}
              {delay > 0 ? `${delay} ms` : 'Stopwatch'}
            </div>
            <div style={{ marginBottom: 10 }}>
              <input
                type="checkbox"
                id="startTimeEnabled"
                name="startTimeEnabled"
                checked={startTimeEnabled}
                onChange={(e) => {
                  setStartTimeEnabled(e.target.checked);
                  if (e.target.checked) {
                    setStartTime(Date.now());
                  }
                }}
              />
              Use start time:{' '}
              <input
                type="number"
                min="0"
                value={startTime}
                onChange={(e) => {
                  const newVal = parseInt(e.target.value);
                  setStartTime(newVal);
                }}
              />{' '}
              (Unix timestamp in millis)
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <input
              type="checkbox"
              id="runOnce"
              name="runOnce"
              checked={runOnce}
              onChange={(e) => setRunOnce(e.target.checked)}
            />
            <label htmlFor="runOnce"> runOnce</label>
            <input
              type="checkbox"
              id="fireImmediately"
              name="fireImmediately"
              checked={fireImmediately}
              onChange={(e) => setFireImmediately(e.target.checked)}
            />
            <label htmlFor="fireImmediately"> fireImmediately</label>
            <input
              type="checkbox"
              id="startImmediately"
              name="startImmediately"
              checked={startImmediately}
              onChange={(e) => setStartImmediately(e.target.checked)}
            />
            <label htmlFor="startImmediately"> startImmediately</label>
            <br />
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <button
            onClick={() => {
              timer.start(startTimeEnabled ? startTime : undefined);
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
        <div style={{ marginBottom: 10 }}>
          {delay > 0 && (
            <progress value={timer.isStopped() ? 0 : delay - timer.getRemainingTime()} max={delay}>
              {timer.getRemainingTime()}
            </progress>
          )}
        </div>
        <table>
          <tbody>
            <tr>
              <td>Callback time:</td>
              <td>{callbackTime}</td>
            </tr>
            <tr>
              <td>isStarted():</td>
              <td>{timer.isStarted() + ''}</td>
            </tr>
            <tr>
              <td>isStopped():</td>
              <td>{timer.isStopped() + ''}</td>
            </tr>
            <tr>
              <td>isPaused():</td>
              <td>{timer.isPaused() + ''}</td>
            </tr>
            <tr>
              <td>isRunning():</td>
              <td>{timer.isRunning() + ''}</td>
            </tr>
            <tr>
              <td>getStartTime():</td>
              <td>{timer.getStartTime()}</td>
            </tr>
            <tr>
              <td>getLastFireTime():</td>
              <td>{timer.getLastFireTime()}</td>
            </tr>
            <tr>
              <td>getNextFireTime():</td>
              <td>{timer.getNextFireTime()}</td>
            </tr>
            <tr>
              <td>getPauseTime():</td>
              <td>{timer.getPauseTime()}</td>
            </tr>
            <tr>
              <td>getResumeTime():</td>
              <td>{timer.getResumeTime()}</td>
            </tr>
            <tr>
              <td>getRemainingTime():</td>
              <td>{timer.getRemainingTime()}</td>
            </tr>
            <tr>
              <td>getElapsedStartedTime():</td>
              <td>{timer.getElapsedStartedTime()}</td>
            </tr>
            <tr>
              <td>getElapsedRunningTime():</td>
              <td>{timer.getElapsedRunningTime()}</td>
            </tr>
            <tr>
              <td>getTotalElapsedPausedTime():</td>
              <td>{timer.getTotalElapsedPausedTime()}</td>
            </tr>
            <tr>
              <td>getPeriodElapsedPausedTime():</td>
              <td>{timer.getPeriodElapsedPausedTime()}</td>
            </tr>
            <tr>
              <td>getElapsedResumedTime():</td>
              <td>{timer.getElapsedResumedTime()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ textAlign: 'center', border: 'solid 2px lightgray', padding: '10px' }}>
        <div>
          Render every:
          <br />
          {frameRate} ms
        </div>
        <div>
          <input
            type="range"
            min="1"
            max="5000"
            value={frameRate}
            onChange={(e) => {
              setFrameRate(parseInt(e.target.value));
            }}
          />
        </div>
      </div>
    </div>
  );
}
