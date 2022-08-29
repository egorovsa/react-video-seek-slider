import { getHoverPositionToTimeValue } from '../getHoverPositionToTimeValue';

describe('getHoverPositionToTimeValue', () => {
  it('should convert to time string properly', () => {
    expect(getHoverPositionToTimeValue(100000, 500, 500)).toBe('01:40');
  });

  it('should be 00:00 in case hover position is 0', () => {
    expect(getHoverPositionToTimeValue(100000, 0, 500)).toBe('00:00');
  });

  it('should be to seconds  like "02"', () => {
    expect(getHoverPositionToTimeValue(10000, 100, 500)).toBe('02');
  });

  it('should return seconds with seconds prefix ', () => {
    expect(getHoverPositionToTimeValue(10000, 100, 500, 0, '', '--:')).toBe(
      '--:02'
    );
  });

  it('should return seconds with minutes prefix ', () => {
    expect(getHoverPositionToTimeValue(100000, 100, 500, 0, '00:')).toBe(
      '00:00:20'
    );
  });
});
