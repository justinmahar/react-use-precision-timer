import React from 'react';
import { useDelay } from './useDelay';

export const useMomentaryBool = (initial: boolean, delay: number): [boolean, () => void] => {
  const [state, setState] = React.useState(initial);
  const callback = React.useCallback(() => setState(initial), [initial]);
  const delayTimer = useDelay(delay, callback);
  const toggle = React.useCallback(() => {
    setState(!initial);
    delayTimer.start();
  }, [delayTimer, initial]);
  return [state, toggle];
};
