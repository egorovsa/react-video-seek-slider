import { millisecondsToTime } from './secondsToTime';

export function getHoverPositionToTimeValue(
  max: number,
  seekHoverPosition: number,
  trackWidth: number,
  offset = 0,
  minutesPrefix = '',
  secondsPrefix = ''
): string {
  const percent = (seekHoverPosition * 100) / trackWidth;
  const seconds = Math.floor(+(percent * (max / 100)));
  const times = millisecondsToTime(seconds, offset);

  if (max + offset < 60 * 1000) {
    return secondsPrefix + times.ss;
  }

  if (max + offset < 3600 * 1000) {
    return `${minutesPrefix + times.mm}:${times.ss}`;
  }

  return `${times.hh}:${times.mm}:${times.ss}`;
}
