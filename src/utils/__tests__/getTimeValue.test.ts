import { hoverPositionToTimeString } from '../hoverPositionToTimeString';

describe('getHoverPositionToTimeValue', () => {
  it('should convert to time string properly', () => {
    expect(hoverPositionToTimeString(100000, 100000)).toBe('01:40');
  });

  it('should be 00:00 in case hover position is 0', () => {
    expect(hoverPositionToTimeString(100000, 0)).toBe('00:00');
  });

  it('should be to seconds  like "02"', () => {
    expect(hoverPositionToTimeString(10000, 2000)).toBe('02');
  });

  it('should return seconds with seconds prefix ', () => {
    expect(hoverPositionToTimeString(10000, 2000, 0, '', '--:')).toBe('--:02');
  });

  it('should return seconds with minutes prefix ', () => {
    expect(hoverPositionToTimeString(100000, 20000, 0, '00:')).toBe('00:00:20');
  });
});
