import { TimeCode } from '..';

export const getEndTimeByIndex = (
  timeCodes: TimeCode[],
  index: number,
  max: number
): number => (index + 1 < timeCodes.length ? timeCodes[index + 1].fromMs : max);
