import { millisecondsToTime } from './secondsToTime';

export function timeToTimeString(
  max: number,
  seekHoverTime: number,
  offset = 0,
  minutesPrefix = '',
  secondsPrefix = ''
): string {
  const times = millisecondsToTime(seekHoverTime, offset);

  if (max + offset < 60 * 1000) {
    return secondsPrefix + times.ss;
  }

  if (max + offset < 3600 * 1000) {
    return `${minutesPrefix + times.mm}:${times.ss}`;
  }

  return `${times.hh}:${times.mm}:${times.ss}`;
}
