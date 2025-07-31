import { describe, it, expect } from 'vitest';
import { getHoverTimePosition } from '../getHoverTimePosition';

describe('getHoverTimePosition', () => {
  it('should return translate X 0 in case hover position is 0', () => {
    expect(
      getHoverTimePosition(0, { offsetWidth: 56 } as HTMLDivElement, 800, true)
    ).toEqual({ transform: `translateX(0px)` });
  });

  it('should return translate X 28 ', () => {
    expect(
      getHoverTimePosition(56, { offsetWidth: 56 } as HTMLDivElement, 800, true)
    ).toEqual({ transform: `translateX(28px)` });
  });

  it('should return translate X 0 in case offsetWidth 2 times more than seek position ', () => {
    expect(
      getHoverTimePosition(
        56,
        { offsetWidth: 112 } as HTMLDivElement,
        800,
        true
      )
    ).toEqual({ transform: `translateX(0px)` });
  });
});
