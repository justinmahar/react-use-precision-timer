import * as React from 'react';

// Learn how to write hooks:
// https://reactjs.org/docs/hooks-intro.html

/**
 * See documentation: https://devboldly.github.io/react-library-starter/useExample
 *
 *
 */
export const useExample = (defaultValue: string): ExampleHook => {
  const [value, setValue] = React.useState<string>(defaultValue);
  return [value, setValue];
};

export type ExampleHook = [string, (value: string) => void];
