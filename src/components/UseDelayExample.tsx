import * as React from 'react';
import { useDelay } from '../hooks/useDelay';

export function UseDelayExample(): JSX.Element {
  const [run, setRun] = React.useState(false);
  const [firedAt, setFiredAt] = React.useState(0);
  const callback = React.useCallback(() => setFiredAt(new Date().getTime()), []);
  const onceTimer = useDelay(1000, callback);

  return (
    <div>
      {!run && (
        <button
          onClick={(e) => {
            setRun(true);
            onceTimer.start();
          }}
        >
          ▶️ Run 1 Second Delay
        </button>
      )}
      {run && (
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
      )}
      {run && (
        <div style={{ marginTop: 10 }}>
          <button
            onClick={() => {
              setFiredAt(0);
              onceTimer.stop();
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
