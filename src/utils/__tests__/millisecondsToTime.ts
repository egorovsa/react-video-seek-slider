import { millisecondsToTime } from '../secondsToTime';

describe('millisecondsToTime', () => {
  it('convert seconds to time properly in one second', () => {
    expect(millisecondsToTime(1000)).toEqual({
      hh: '0',
      mm: '00',
      ss: '01',
    });
  });

  it('convert seconds to time properly with one minute', () => {
    expect(millisecondsToTime(60000)).toEqual({
      hh: '0',
      mm: '01',
      ss: '00',
    });
  });

  it('convert seconds to time properly with one hour', () => {
    expect(millisecondsToTime(3600000)).toEqual({
      hh: '1',
      mm: '00',
      ss: '00',
    });
  });
});
