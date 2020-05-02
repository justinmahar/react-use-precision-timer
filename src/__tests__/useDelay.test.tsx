import { act, renderHook } from '@testing-library/react-hooks';
import { useDelay } from '../hooks/useDelay';

describe('useDelay Hook', () => {
  test('should run without crashing', () => {
    const { result } = renderHook(() => useDelay(1000, () => console.log('Delay callback!')));
    expect(result.error).toBe(undefined);
  });
});
