import * as React from 'react';
import { useDelay } from '../hooks/useDelay';

export function UseDelayExample(): JSX.Element {
  const [run, setRun] = React.useState(false);
  const [resetTime, setResetTime] = React.useState(Date.now());
  return (
    <div key={resetTime}>
      {!run && <button onClick={(e) => setRun(true)}>▶️ Run 1 Second Delay</button>}
      {run && <OneSecondDelay />}
      {run && (
        <div style={{ marginTop: 10 }}>
          <button
            onClick={() => {
              setResetTime(Date.now());
              setRun(false);
            }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export function OneSecondDelay(): JSX.Element {
  const [firedAt, setFiredAt] = React.useState(0);
  const callback = React.useCallback(() => setFiredAt(new Date().getTime()), []);
  useDelay(1000, callback);
  return (
    <div>
      <div style={{ marginBottom: 10 }}>Timer fired? {firedAt > 0 ? `Yes ✅ ` : 'No ❌'}</div>
      {firedAt > 0 && (
        <div style={{ fontSize: '80%' }}>
          <>
            At {`${new Date(firedAt)}`}, epoch {firedAt}
          </>
        </div>
      )}
    </div>
  );
}
