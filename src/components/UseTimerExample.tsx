import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { Badge, Button, Card, Form, ProgressBar, Table } from 'react-bootstrap';
import { useTimer } from '../hooks/useTimer';
import { TimerRenderer } from './TimerRenderer';

export function UseTimerExample(): JSX.Element {
  const [delay, setDelay] = React.useState(1000);
  const [speedMultiplier, setSpeedMultiplier] = React.useState(1);
  const [startTimeEnabled, setStartTimeEnabled] = React.useState(false);
  const [startTime, setStartTime] = React.useState(Date.now());
  const [callbackTime, setCallbackTime] = React.useState(-1);
  const [overdueCallCount, setOverdueCallCount] = React.useState(0);
  const [runOnce, setRunOnce] = React.useState(false);
  const [fireOnStart, setFireOnStart] = React.useState(false);
  const [startImmediately, setStartImmediately] = React.useState(true);
  const [delayChanged, setDelayChanged] = React.useState(false);
  const [renderRate, setRenderRate] = React.useState(10);
  const callback = React.useCallback((overdueCount: number) => {
    setCallbackTime(new Date().getTime());
    setOverdueCallCount(overdueCount);
  }, []);
  const timer = useTimer(
    {
      delay: isNaN(delay) ? 0 : delay,
      runOnce,
      fireOnStart,
      startImmediately,
      speedMultiplier,
    },
    callback,
  );

  const effectiveDelay = React.useMemo(() => timer.getEffectiveDelay(), [timer]);

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
  }, [delay, delayChanged, startImmediately, startTime, startTimeEnabled, timer]);

  return (
    <div className="d-flex">
      <Card>
        <Card.Body className="d-flex flex-column align-items-center gap-2">
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <Card style={{ minWidth: 300, maxWidth: 600 }}>
              <Card.Header>Timer Options</Card.Header>
              <Card.Body>
                <div className="d-flex align-items-center gap-2 mb-3">
                  Delay:{' '}
                  <Form.Range
                    min="0"
                    max="5000"
                    value={isNaN(delay) ? 0 : delay}
                    onChange={(e) => {
                      const newDelay = parseInt(e.target.value);
                      setDelay(newDelay);
                      setDelayChanged(true);
                      if (newDelay === 0) {
                        setCallbackTime(-1);
                        setOverdueCallCount(0);
                      }
                    }}
                  />{' '}
                  <Form.Control
                    type="number"
                    min={0}
                    value={delay}
                    onChange={(e) => {
                      const newDelay = parseInt(e.target.value);
                      setDelay(newDelay);
                      setDelayChanged(true);
                      if (newDelay === 0) {
                        setCallbackTime(-1);
                        setOverdueCallCount(0);
                      }
                    }}
                    style={{ width: 80 }}
                  />
                  ms
                </div>
                <div className="d-flex flex-wrap align-items-start gap-1 mb-3">
                  <Form.Check
                    inline
                    label="Use start time:"
                    id="start-time-checkbox"
                    name="startTimeEnabled"
                    checked={startTimeEnabled}
                    onChange={(e) => {
                      setStartTimeEnabled(e.target.checked);
                    }}
                  />
                  <div>
                    <Form.Control
                      type="number"
                      min="0"
                      value={startTime}
                      onChange={(e) => {
                        const newVal = parseInt(e.target.value);
                        setStartTime(newVal);
                      }}
                      style={{ width: 180 }}
                    />
                    <div>
                      <Form.Text className="text-muted">(Unix timestamp in millis)</Form.Text>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-wrap justify-content-center gap-1 mb-3">
                  <Form.Check
                    inline
                    label="runOnce"
                    id="runOnce"
                    name="runOnce"
                    checked={runOnce}
                    onChange={(e) => setRunOnce(e.target.checked)}
                  />
                  <Form.Check
                    inline
                    label="fireOnStart"
                    id="fireOnStart"
                    name="fireOnStart"
                    checked={fireOnStart}
                    onChange={(e) => setFireOnStart(e.target.checked)}
                  />
                  <Form.Check
                    inline
                    label="startImmediately"
                    id="startImmediately"
                    name="startImmediately"
                    checked={startImmediately}
                    onChange={(e) => setStartImmediately(e.target.checked)}
                  />
                </div>
                <div className="d-flex flex-column">
                  <div>Speed multiplier:</div>
                  <div className="d-flex align-items-center gap-2">
                    <Form.Range
                      min={0}
                      max={5}
                      step={0.25}
                      value={isNaN(speedMultiplier) ? 1 : speedMultiplier}
                      onChange={(e) => {
                        const newSpeed = parseFloat(e.target.value);
                        setSpeedMultiplier(newSpeed);
                        setDelayChanged(true);
                      }}
                    />{' '}
                    <div className="d-flex align-items-center gap-1">
                      &times;
                      <Form.Control
                        type="number"
                        min={0}
                        step={0.25}
                        value={isNaN(speedMultiplier) ? 1 : speedMultiplier}
                        onChange={(e) => {
                          const newSpeed = parseFloat(e.target.value);
                          setSpeedMultiplier(newSpeed);
                          setDelayChanged(true);
                        }}
                        style={{ width: 80 }}
                      />
                    </div>
                  </div>
                  {speedMultiplier !== 1 && (
                    <div>
                      <Form.Text className="text-muted">Effective delay: {effectiveDelay} ms</Form.Text>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <div className="text-center">
                  Render every:
                  <br />
                  {renderRate} ms
                </div>
                <div>
                  <Form.Range
                    min="1"
                    max="5000"
                    value={renderRate}
                    onChange={(e) => {
                      setRenderRate(parseInt(e.target.value));
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          </div>
          <Card style={{ minWidth: 300, maxWidth: 600 }}>
            <Card.Body>
              <div className="d-flex gap-1 justify-content-center">
                <Button
                  variant={timer.isStopped() ? 'primary' : 'outline-dark'}
                  onClick={() => {
                    timer.start(startTimeEnabled ? startTime : undefined);
                  }}
                >
                  Start
                </Button>
                <Button
                  variant={timer.isStarted() ? 'primary' : 'outline-dark'}
                  onClick={() => {
                    timer.stop();
                  }}
                >
                  Stop
                </Button>
                <Button
                  variant={timer.isRunning() ? 'primary' : 'outline-dark'}
                  onClick={() => {
                    timer.pause();
                  }}
                >
                  Pause
                </Button>
                <Button
                  variant={timer.isPaused() ? 'primary' : 'outline-dark'}
                  onClick={() => {
                    timer.resume();
                  }}
                >
                  Resume
                </Button>
              </div>
            </Card.Body>
          </Card>
          <div className="d-flex justify-content-center" style={{ minWidth: 300, maxWidth: 600 }}>
            <Table striped bordered responsive className="w-100">
              <tbody>
                <tr>
                  <td className="text-break">Callback time:</td>
                  <td style={{ minWidth: 200 }}>
                    <TimerRenderer
                      timer={timer}
                      renderRate={renderRate}
                      render={(t) => (
                        <div className="mb-2">
                          <style>
                            {`.progress-bar {
                            -webkit-transition: none !important;
                            -moz-transition: none !important;
                            -ms-transition: none !important;
                            -o-transition: none !important;
                            transition: none !important;
                          }`}
                          </style>
                          {effectiveDelay > 0 && (
                            <ProgressBar
                              variant="primary"
                              now={t.isStopped() ? 0 : effectiveDelay - t.getRemainingTime()}
                              max={effectiveDelay}
                              label={`${effectiveDelay - t.getRemainingTime()} ms`}
                              style={{ transition: 'none' }}
                            />
                          )}
                          {(isNaN(effectiveDelay) || effectiveDelay === 0) && (
                            <Badge className="fw-bold m-0">Stopwatch</Badge>
                          )}
                        </div>
                      )}
                    />
                    <div>
                      <Badge bg="warning" className="text-black">
                        {callbackTime}
                      </Badge>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-break">isStarted():</td>
                  <td className="text-break">
                    <TimerRenderer
                      timer={timer}
                      renderRate={renderRate}
                      render={(t) => (
                        <Badge bg={t.isStarted() ? 'success' : 'danger'} className="font-monospace">
                          {t.isStarted() + ''}
                        </Badge>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-break">isStopped():</td>
                  <td className="text-break">
                    <TimerRenderer
                      timer={timer}
                      renderRate={renderRate}
                      render={(t) => (
                        <Badge bg={t.isStopped() ? 'success' : 'danger'} className="font-monospace">
                          {t.isStopped() + ''}
                        </Badge>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-break">isPaused():</td>
                  <td className="text-break">
                    <TimerRenderer
                      timer={timer}
                      renderRate={renderRate}
                      render={(t) => (
                        <Badge bg={t.isPaused() ? 'success' : 'danger'} className="font-monospace">
                          {t.isPaused() + ''}
                        </Badge>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-break">isRunning():</td>
                  <td className="text-break">
                    <TimerRenderer
                      timer={timer}
                      renderRate={renderRate}
                      render={(t) => (
                        <Badge bg={t.isRunning() ? 'success' : 'danger'} className="font-monospace">
                          {t.isRunning() + ''}
                        </Badge>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-break">getEffectiveDelay():</td>
                  <td className="text-break">
                    <TimerRenderer
                      timer={timer}
                      renderRate={renderRate}
                      render={(t) => (
                        <Badge pill bg="primary">
                          {t.getEffectiveDelay()} ms
                        </Badge>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-break">getStartTime():</td>
                  <td className="text-break">
                    <TimerRenderer
                      timer={timer}
                      renderRate={renderRate}
                      render={(t) => (
                        <Badge bg="warning" className="text-black">
                          {t.getStartTime()}
                        </Badge>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-break">getLastFireTime():</td>
                  <td className="text-break">
                    <TimerRenderer
                      timer={timer}
                      renderRate={renderRate}
                      render={(t) => (
                        <Badge bg="warning" className="text-black">
                          {t.getLastFireTime()}
                        </Badge>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-break">getNextFireTime():</td>
                  <td className="text-break">
                    <TimerRenderer
                      timer={timer}
                      renderRate={renderRate}
                      render={(t) => (
                        <Badge bg="warning" className="text-black">
                          {t.getNextFireTime()}
                        </Badge>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-break">getPauseTime():</td>
                  <td className="text-break">
                    <TimerRenderer
                      timer={timer}
                      renderRate={renderRate}
                      render={(t) => (
                        <Badge bg="warning" className="text-black">
                          {t.getPauseTime()}
                        </Badge>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-break">getResumeTime():</td>
                  <td className="text-break">
                    <TimerRenderer
                      timer={timer}
                      renderRate={renderRate}
                      render={(t) => (
                        <Badge bg="warning" className="text-black">
                          {t.getResumeTime()}
                        </Badge>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-break">getRemainingTime():</td>
                  <td className="text-break">
                    <TimerRenderer
                      timer={timer}
                      renderRate={renderRate}
                      render={(t) => (
                        <Badge pill bg="primary">
                          {t.getRemainingTime()} ms
                        </Badge>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-break">getElapsedStartedTime():</td>
                  <td className="text-break">
                    <TimerRenderer
                      timer={timer}
                      renderRate={renderRate}
                      render={(t) => (
                        <Badge pill bg="primary">
                          {t.getElapsedStartedTime()} ms
                        </Badge>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-break">getElapsedRunningTime():</td>
                  <td className="text-break">
                    <TimerRenderer
                      timer={timer}
                      renderRate={renderRate}
                      render={(t) => (
                        <Badge pill bg="primary">
                          {t.getElapsedRunningTime()} ms
                        </Badge>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-break">getTotalElapsedPausedTime():</td>
                  <td className="text-break">
                    <TimerRenderer
                      timer={timer}
                      renderRate={renderRate}
                      render={(t) => (
                        <Badge pill bg="primary">
                          {t.getTotalElapsedPausedTime()} ms
                        </Badge>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-break">getPeriodElapsedPausedTime():</td>
                  <td className="text-break">
                    <TimerRenderer
                      timer={timer}
                      renderRate={renderRate}
                      render={(t) => (
                        <Badge pill bg="primary">
                          {t.getPeriodElapsedPausedTime()} ms
                        </Badge>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-break">getElapsedResumedTime():</td>
                  <td className="text-break">
                    <TimerRenderer
                      timer={timer}
                      renderRate={renderRate}
                      render={(t) => (
                        <Badge pill bg="primary">
                          {t.getElapsedResumedTime()} ms
                        </Badge>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-break">Overdue call count (for delays under 10ms):</td>
                  <td className="text-break">
                    <Badge pill bg="dark">
                      {overdueCallCount}
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td className="text-break">Render time:</td>
                  <td className="text-break">
                    <TimerRenderer
                      timer={timer}
                      renderRate={renderRate}
                      render={(t) => (
                        <Badge bg="warning" className="text-black">
                          {Date.now()}
                        </Badge>
                      )}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
