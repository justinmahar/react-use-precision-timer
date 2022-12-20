import React from 'react';
import { useDelay } from '../useDelay';

export const useMomentaryBool = (initial: boolean, delay: number): [boolean, () => void] => {
  const [state, setState] = React.useState(initial);
  const delayTimer = useDelay(
    delay,
    React.useCallback(() => setState(initial), [initial]),
  );
  const toggle = React.useCallback(() => {
    setState(!initial);
    delayTimer.start();
  }, [delayTimer, initial]);
  return [state, toggle];
};
