import { act, renderHook } from '@testing-library/react-hooks';
import { useTimer } from '../hooks/useTimer';

// Learn how to test React hooks:
// https://react-hooks-testing-library.com/

describe('useTimer Hook', () => {
  test('should run without crashing', () => {
    const { result } = renderHook(() => useTimer({ delay: 1000, callback: () => console.log('Timer fired!') }));
    expect(result.error).toBe(undefined);
  });
});
