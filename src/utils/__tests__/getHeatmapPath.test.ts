import { describe, it, expect } from 'vitest';
import { getHeatmapPath } from '../getHeatmapPath';

describe('getHeatmapPath', () => {
  it('returns an empty path for empty or all-zero data', () => {
    expect(getHeatmapPath([])).toBe('');
    expect(getHeatmapPath([0, 0])).toBe('');
    expect(getHeatmapPath([NaN, -1])).toBe('');
  });

  it('normalizes by the maximum and spans the whole width', () => {
    expect(getHeatmapPath([50, 100])).toBe(
      'M0 100L0 50L250 50C500 50 500 0 750 0L1000 0L1000 100Z'
    );
  });

  it('gives the same shape for any scale', () => {
    expect(getHeatmapPath([1, 3, 2])).toBe(getHeatmapPath([100, 300, 200]));
  });
});
