import React from 'react';
import { DivProps } from 'react-html-props';
import { useMomentaryBool } from '../hooks/useMomentaryBool';

export interface UseMomentaryBoolExampleProps extends DivProps {}

export const UseMomentaryBoolExample = () => {
  const [delay, setDelay] = React.useState(1000);
  const [value, toggle] = useMomentaryBool(false, delay);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 10 }}>
      <div>
        <input
          type="range"
          id="delay"
          name="delay"
          min="10"
          max="5000"
          value={delay}
          onChange={(e) => {
            setDelay(parseInt(e.target.value));
          }}
        />{' '}
        {delay} milliseconds
      </div>
      <div>
        <button onClick={toggle}>{value ? '✅ Clicked!' : 'Click Me!'}</button>
      </div>
      <div>
        Value: <code>{`${value}`}</code>
      </div>
    </div>
  );
};
