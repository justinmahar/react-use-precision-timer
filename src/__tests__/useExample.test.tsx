import { renderHook } from '@testing-library/react-hooks';
import { useExample } from '../hooks/useExample';

// Learn how to test React hooks:
// https://react-hooks-testing-library.com/

describe('useExample Hook', () => {
  test('should run without crashing', () => {
    const { result } = renderHook(() => useExample('Example text'));
    expect(result.error).toBe(undefined);
  });
});
