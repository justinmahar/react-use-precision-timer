import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { Badge, Button, Card, Form, ProgressBar, Table } from 'react-bootstrap';
import { useTimer } from '../hooks/useTimer';

export function UseTimerExample(): JSX.Element {
  const [delay, setDelay] = React.useState(1000);
  const [startTimeEnabled, setStartTimeEnabled] = React.useState(false);
  const [startTime, setStartTime] = React.useState(Date.now());
  const [callbackTime, setCallbackTime] = React.useState(-1);
  const [overdueCallCount, setOverdueCallCount] = React.useState(0);
  const [runOnce, setRunOnce] = React.useState(false);
  const [fireImmediately, setFireImmediately] = React.useState(false);
  const [startImmediately, setStartImmediately] = React.useState(true);
  const [delayChanged, setDelayChanged] = React.useState(false);
  const [, setRenderTime] = React.useState(new Date().getTime());
  const [frameRate, setFrameRate] = React.useState(10);
  const timerOptions = React.useMemo(() => {
    return {
      delay: isNaN(delay) ? 0 : delay,
      callback: (overdueCount: number) => {
        setCallbackTime(new Date().getTime());
        setOverdueCallCount(overdueCount);
      },
      runOnce,
      fireImmediately,
      startImmediately,
      fireOverdueCallbacks: true,
    };
  }, [delay, fireImmediately, runOnce, startImmediately]);
  const timer = useTimer(timerOptions);

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
  }, [delay, delayChanged, startImmediately, startTime, startTimeEnabled, timer]);

  return (
    <Card style={{ maxWidth: 650 }}>
      <Card.Body className="d-flex flex-column gap-2">
        <div className="d-flex justify-between gap-2">
          <Card className="w-100">
            <Card.Header>Timer Options</Card.Header>
            <Card.Body>
              <div className="d-flex align-items-center gap-2 mb-2">
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
              <div className="d-flex align-items-start gap-1 mb-3">
                <Form.Check
                  inline
                  label="Use start time:"
                  id="start-time-checkbox"
                  name="startTimeEnabled"
                  checked={startTimeEnabled}
                  onChange={(e) => {
                    setStartTimeEnabled(e.target.checked);
                  }}
                  className="my-2"
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
                    style={{ width: 200 }}
                  />
                  <div>
                    <Form.Text className="text-muted">(Unix timestamp in millis)</Form.Text>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-wrap gap-1">
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
                  label="fireImmediately"
                  id="fireImmediately"
                  name="fireImmediately"
                  checked={fireImmediately}
                  onChange={(e) => setFireImmediately(e.target.checked)}
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
            </Card.Body>
          </Card>
          <Card>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <div className="text-center">
                Render every:
                <br />
                {frameRate} ms
              </div>
              <div>
                <Form.Range
                  min="1"
                  max="5000"
                  value={frameRate}
                  onChange={(e) => {
                    setFrameRate(parseInt(e.target.value));
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </div>
        <Card>
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
        <div className="d-flex justify-content-center">
          <Table striped bordered responsive>
            <tbody>
              <tr>
                <td>Callback time:</td>
                <td style={{ minWidth: 200 }}>
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
                    {delay > 0 && (
                      <ProgressBar
                        variant="primary"
                        now={timer.isStopped() ? 0 : delay - timer.getRemainingTime()}
                        max={delay}
                        label={`${delay - timer.getRemainingTime()}ms`}
                        style={{ transition: 'none' }}
                      />
                    )}
                    {(isNaN(delay) || delay === 0) && <Badge className="fw-bold m-0">Stopwatch</Badge>}
                  </div>
                  <div>
                    <Badge bg="warning" className="text-black">
                      {callbackTime}
                    </Badge>
                  </div>
                </td>
              </tr>
              <tr>
                <td>isStarted():</td>
                <td>
                  <Badge bg={timer.isStarted() ? 'success' : 'danger'} className="font-monospace">
                    {timer.isStarted() + ''}
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>isStopped():</td>
                <td>
                  <Badge bg={timer.isStopped() ? 'success' : 'danger'} className="font-monospace">
                    {timer.isStopped() + ''}
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>isPaused():</td>
                <td>
                  <Badge bg={timer.isPaused() ? 'success' : 'danger'} className="font-monospace">
                    {timer.isPaused() + ''}
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>isRunning():</td>
                <td>
                  <Badge bg={timer.isRunning() ? 'success' : 'danger'} className="font-monospace">
                    {timer.isRunning() + ''}
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>getStartTime():</td>
                <td>
                  <Badge bg="warning" className="text-black">
                    {timer.getStartTime()}
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>getLastFireTime():</td>
                <td>
                  <Badge bg="warning" className="text-black">
                    {timer.getLastFireTime()}
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>getNextFireTime():</td>
                <td>
                  <Badge bg="warning" className="text-black">
                    {timer.getNextFireTime()}
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>getPauseTime():</td>
                <td>
                  <Badge bg="warning" className="text-black">
                    {timer.getPauseTime()}
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>getResumeTime():</td>
                <td>
                  <Badge bg="warning" className="text-black">
                    {timer.getResumeTime()}
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>getRemainingTime():</td>
                <td>
                  <Badge pill bg="primary">
                    {timer.getRemainingTime()}
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>getElapsedStartedTime():</td>
                <td>
                  <Badge pill bg="primary">
                    {timer.getElapsedStartedTime()}
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>getElapsedRunningTime():</td>
                <td>
                  <Badge pill bg="primary">
                    {timer.getElapsedRunningTime()}
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>getTotalElapsedPausedTime():</td>
                <td>
                  <Badge pill bg="primary">
                    {timer.getTotalElapsedPausedTime()}
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>getPeriodElapsedPausedTime():</td>
                <td>
                  <Badge pill bg="primary">
                    {timer.getPeriodElapsedPausedTime()}
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>getElapsedResumedTime():</td>
                <td>
                  <Badge pill bg="primary">
                    {timer.getElapsedResumedTime()}
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>Overdue call count (for delays under 10ms):</td>
                <td>
                  <Badge pill bg="dark">
                    {overdueCallCount}
                  </Badge>
                </td>
              </tr>
              <tr>
                <td>Render time:</td>
                <td>
                  <Badge bg="warning" className="text-black">
                    {Date.now()}
                  </Badge>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}
