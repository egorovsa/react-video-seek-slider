import { TimeCode } from '../components/timeCodeItem';
import { getEndTimeByIndex } from './getEndTimeByIndex';
import { isInRange } from './isInRange';

export const findTimeCode = (
  timeCodes: TimeCode[] | undefined,
  time: number,
  max: number
): TimeCode | undefined =>
  timeCodes?.find(({ fromMs }, index) =>
    isInRange(time, fromMs, getEndTimeByIndex(timeCodes, index, max))
  );
