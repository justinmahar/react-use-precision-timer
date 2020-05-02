import { act, renderHook } from '@testing-library/react-hooks';
import { useDelay } from '../hooks/useDelay';

// Learn how to test React hooks:
// https://react-hooks-testing-library.com/

describe('useDelay Hook', () => {
  test('should run without crashing', () => {
    const { result } = renderHook(() => useDelay(1000, () => console.log('Delay callback!')));
    expect(result.error).toBe(undefined);
  });
});
