import { renderHook } from '@testing-library/react-hooks';
import { useStopwatch } from '../hooks/useStopwatch';

describe('useStopwatch Hook', () => {
  test('should run without crashing', () => {
    const { result } = renderHook(() => useStopwatch());
    expect(result.error).toBe(undefined);
  });
});
