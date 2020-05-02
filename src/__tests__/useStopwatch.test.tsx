import { renderHook } from '@testing-library/react-hooks';
import { useStopwatch } from '../hooks/useStopwatch';

// Learn how to test React hooks:
// https://react-hooks-testing-library.com/

describe('useStopwatch Hook', () => {
  test('should run without crashing', () => {
    const { result } = renderHook(() => useStopwatch());
    expect(result.error).toBe(undefined);
  });
});
