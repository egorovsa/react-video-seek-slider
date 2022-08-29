import { getPositionStyle } from '../getPositionStyle';

describe('getPositionStyle', () => {
  it('should calculate percent of current time to max and return 50%', () => {
    expect(getPositionStyle(100, 50)).toEqual({ transform: 'scaleX(0.5)' });
  });

  it('should calculate percent of current time to max and return 20%', () => {
    expect(getPositionStyle(100, 20)).toEqual({ transform: 'scaleX(0.2)' });
  });

  it('should return zero ', () => {
    expect(getPositionStyle(100, 0)).toEqual({ transform: 'scaleX(0)' });
  });
});
