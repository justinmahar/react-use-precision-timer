import * as React from 'react';
import { useExample } from '../../hooks/useExample';

export function UseExampleExample(): JSX.Element {
  const [example] = useExample('blue');
  return <div>Hook example - Color: {example}</div>;
}
