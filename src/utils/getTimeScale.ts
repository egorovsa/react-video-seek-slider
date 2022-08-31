import { isInRange } from './isInRange';

export function getTimeScale(
  currentTime: number,
  startTime: number,
  endTime: number,
  isTimePassed: boolean
): number {
  const isActiveTime = isInRange(currentTime, startTime, endTime);
  const timeDiff = endTime - startTime;
  const timeDiffWithCurrent = currentTime - startTime;
  const currentScalePercent = isActiveTime ? timeDiffWithCurrent / timeDiff : 0;

  return isTimePassed ? 1 : currentScalePercent;
}
