import * as React from 'react';
import { useDelay } from '../../hooks/useDelay';

export function UseDelayExample(): JSX.Element {
  const [run, setRun] = React.useState(false);
  return (
    <div>
      {!run && <button onClick={e => setRun(true)}>▶️ Run 1 Second Delay</button>}
      {run && <OneSecondDelay />}
    </div>
  );
}

export function OneSecondDelay(): JSX.Element {
  const [firedAt, setFiredAt] = React.useState(0);
  useDelay(1000, () => setFiredAt(new Date().getTime()));
  return <>Timer fired? {firedAt > 0 ? `✔️ (at ${firedAt})` : '❌'}</>;
}
